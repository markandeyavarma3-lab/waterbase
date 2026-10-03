"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { leadSchema, LEAD_STATUSES, LeadStatus } from "@/lib/leads";
import { isAdmin } from "@/lib/admin-auth";
import { sendLeadNotification } from "@/lib/notify";

export type LeadResult = { ok: true } | { ok: false; message: string };

type AdminClient = ReturnType<typeof createAdminClient>;

// How many times one mobile number may submit before we start turning it away,
// and the window that applies over.
const MAX_PER_MOBILE = 3;
const WINDOW_MINUTES = 10;

// The same idea keyed on the network address instead. Higher, because one rural
// broadband connection or a mobile carrier NAT can legitimately be several
// different farmers in an afternoon — this is a flood stop, not a queue.
const MAX_PER_IP = 12;
const IP_WINDOW_MINUTES = 60;

/**
 * Hashes the caller's IP.
 *
 * Only ever compared for equality, so the plaintext has no use here — and an IP
 * address is personal data under the DPDP Act, so storing it in the clear to
 * count form posts would be collecting more than the job needs. Salted with the
 * Supabase key so the digests are not reversible from a rainbow table of the
 * IPv4 space, which is small enough to enumerate.
 */
async function callerIpHash(): Promise<string | null> {
  const h = await headers();
  // Vercel sets x-forwarded-for; the left-most entry is the client.
  const raw =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "";
  if (!raw) return null;
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY ?? "";
  return createHash("sha256").update(`${salt}:${raw}`).digest("hex");
}

/**
 * Throttles repeat submissions from the same mobile number.
 *
 * This replaced a module-level counter that could not work: on Vercel each
 * serverless instance holds its own copy of module state and instances are
 * recycled constantly, so the count never accumulated across the instances an
 * abuser would actually reach. It also capped submissions globally rather than
 * per visitor, so had it ever held state it would have locked out every genuine
 * visitor once one bot hit the limit.
 *
 * Counting prior rows in `leads` keeps the state where it is already shared,
 * with no new table.
 *
 * Fails OPEN: if the count query errors we accept the lead. Losing a real
 * customer enquiry is a worse outcome than accepting a duplicate.
 */
async function isMobileRateLimited(supabase: AdminClient, mobile: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const { count, error } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("mobile", mobile)
    .gte("created_at", since);

  if (error) {
    console.error("Mobile rate limit check failed (allowing submission):", error);
    return false;
  }

  return (count ?? 0) >= MAX_PER_MOBILE;
}

/**
 * Throttles by network address — the key the submitter does not choose.
 *
 * The mobile-number throttle above is trivially defeated by incrementing the
 * number, and every accepted submission both writes a row and sends an email.
 * This is the backstop against one script filling the table overnight.
 *
 * Fails OPEN for the same reason as above, including when the throttle table
 * has not been migrated yet — a missing table must never block real enquiries.
 */
async function isIpRateLimited(supabase: AdminClient, ipHash: string): Promise<boolean> {
  const since = new Date(Date.now() - IP_WINDOW_MINUTES * 60_000).toISOString();

  const { count, error } = await supabase
    .from("lead_throttle")
    .select("ip_hash", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) {
    console.error("IP rate limit check failed (allowing submission):", error);
    return false;
  }

  return (count ?? 0) >= MAX_PER_IP;
}

export async function submitLead(input: unknown): Promise<LeadResult> {
  // Honeypot: real users never see the hidden "company" field. A bot that fills
  // it gets a fake success and nothing is saved.
  if (input && typeof input === "object" && (input as { company?: unknown }).company) {
    return { ok: true };
  }

  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please check the form and try again." };
  }

  const { name, mobile, location, landSize } = parsed.data;
  const requirement = parsed.data.requirement ?? "other";

  try {
    const supabase = createAdminClient();
    const ipHash = await callerIpHash();

    // Both throttles run before anything is written or emailed.
    const [mobileLimited, ipLimited] = await Promise.all([
      isMobileRateLimited(supabase, mobile),
      ipHash ? isIpRateLimited(supabase, ipHash) : Promise.resolve(false),
    ]);

    if (mobileLimited || ipLimited) {
      // Deliberately the same message either way — telling a script which limit
      // it hit tells it which key to rotate.
      return {
        ok: false,
        message: "We've already got your request — our team will call you back shortly.",
      };
    }

    const { error } = await supabase.from("leads").insert({
      name,
      mobile,
      requirement,
      location: location || null,
      land_size: landSize || null,
      source: "website",
    });
    if (error) {
      console.error("Lead insert failed:", error);
      return { ok: false, message: "Couldn't save your request. Please call us directly." };
    }

    // Record the attempt only after a successful save, and never let a throttle
    // bookkeeping failure fail a lead that is already stored.
    if (ipHash) {
      void supabase
        .from("lead_throttle")
        .insert({ ip_hash: ipHash })
        .then(({ error: throttleError }) => {
          if (throttleError) console.error("Throttle record failed (ignored):", throttleError);
        });
      // Opportunistic housekeeping instead of a scheduled job.
      if (Math.random() < 0.02) {
        void supabase.rpc("prune_lead_throttle");
      }
    }
  } catch (err) {
    console.error("Lead insert threw:", err);
    return { ok: false, message: "Something went wrong. Please call us directly." };
  }

  try {
    await sendLeadNotification({ name, mobile, requirement, location, landSize });
  } catch (err) {
    console.error("Lead notification failed (lead still saved):", err);
  }

  return { ok: true };
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<{ ok: boolean }> {
  if (!UUID_RE.test(id)) return { ok: false };

  // Server actions are public endpoints. Being signed in is not enough — the
  // client below bypasses RLS, so the caller must be an allowlisted admin.
  if (!(await isAdmin())) return { ok: false };

  // Only allow known pipeline values.
  const allowed = LEAD_STATUSES.map((s) => s.value) as string[];
  if (!allowed.includes(status)) return { ok: false };

  const supabase = createAdminClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) {
    console.error("updateLeadStatus failed:", error);
    return { ok: false };
  }
  return { ok: true };
}

const MAX_NOTE_LENGTH = 2000;

export async function updateLeadNotes(id: string, notes: string): Promise<{ ok: boolean }> {
  if (!UUID_RE.test(id)) return { ok: false };
  if (!(await isAdmin())) return { ok: false };

  const trimmed = notes.trim().slice(0, MAX_NOTE_LENGTH);

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ admin_notes: trimmed || null })
    .eq("id", id);
  if (error) {
    console.error("updateLeadNotes failed:", error);
    return { ok: false };
  }
  return { ok: true };
}
