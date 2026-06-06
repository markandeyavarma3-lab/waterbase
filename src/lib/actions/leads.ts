"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { leadSchema, LEAD_STATUSES } from "@/lib/leads";
import { sendLeadNotification } from "@/lib/notify";

export type LeadResult = { ok: true } | { ok: false; message: string };

export async function submitLead(input: unknown): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please check the form and try again." };
  }

  const { name, mobile, requirement } = parsed.data;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert({ name, mobile, requirement, source: "website" });
    if (error) {
      console.error("Lead insert failed:", error);
      return { ok: false, message: "Couldn't save your request. Please call us directly." };
    }
  } catch (err) {
    console.error("Lead insert threw:", err);
    return { ok: false, message: "Something went wrong. Please call us directly." };
  }

  try {
    await sendLeadNotification({ name, mobile, requirement });
  } catch (err) {
    console.error("Lead notification failed (lead still saved):", err);
  }

  return { ok: true };
}

export async function updateLeadStatus(id: string, status: string): Promise<{ ok: boolean }> {
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