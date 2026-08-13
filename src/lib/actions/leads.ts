"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { leadSchema, LEAD_STATUSES, LeadStatus } from "@/lib/leads";
import { isAdmin } from "@/lib/admin-auth";
import { sendLeadNotification } from "@/lib/notify";

export type LeadResult = { ok: true } | { ok: false; message: string };

// How many times one mobile number may submit before we start turning it away,
// and the window that applies over.
const MAX_PER_MOBILE = 3;
const WINDOW_MINUTES = 10;

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
 * with no new table. It throttles per number rather than per IP because the
 * number is the thing we already store — a determined abuser can rotate numbers,
 * but the honeypot in submitLead is the defence against automated flooding and
 * this is the defence against one number being submitted over and over.
 *
 * Fails OPEN: if the count query errors we accept the lead. Losing a real
 * customer enquiry is a worse outcome than accepting a duplicate.
 */
async function isRateLimited(
  supabase: ReturnType<typeof createAdminClient>,
  mobile: string
): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const { count, error } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("mobile", mobile)
    .gte("created_at", since);

  if (error) {
    console.error("Rate limit check failed (allowing submission):", error);
    return false;
  }

  return (count ?? 0) >= MAX_PER_MOBILE;
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

  const { name, mobile, requirement, location, landSize } = parsed.data;

  try {
    const supabase = createAdminClient();

    if (await isRateLimited(supabase, mobile)) {
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
