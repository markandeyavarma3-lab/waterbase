"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { leadSchema, LEAD_STATUSES, LeadStatus } from "@/lib/leads";
import { sendLeadNotification } from "@/lib/notify";

export type LeadResult = { ok: true } | { ok: false; message: string };

let submissions = 0;
let lastReset = Date.now();

export async function submitLead(input: unknown): Promise<LeadResult> {
  if (Date.now() - lastReset > 60000) {
    submissions = 0;
    lastReset = Date.now();
  }
  if (submissions >= 30) {
    return { ok: false, message: "Too many requests. Please try again later." };
  }
  submissions++;
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

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<{ ok: boolean }> {
  // UUID check
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return { ok: false };
  
  // Server actions are public endpoints — verify an admin is logged in.
  const authClient = await createServerSupabase();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { ok: false };

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