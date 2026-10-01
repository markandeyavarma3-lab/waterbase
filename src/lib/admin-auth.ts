import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Who is allowed into /admin.
 *
 * Being signed in is NOT sufficient. Every admin surface reads leads through
 * createAdminClient(), which uses the service-role key and bypasses row-level
 * security entirely — so the only thing standing between an account and every
 * customer's name and mobile number is this check. Before it existed, any
 * Supabase account on the project could read the whole leads table.
 *
 * Set ADMIN_EMAILS to a comma-separated list, in .env.local for local work and
 * in Vercel → Settings → Environment Variables for production:
 *
 *     ADMIN_EMAILS="owner@example.com,manager@example.com"
 *
 * It deliberately fails CLOSED: an unset or empty list admits nobody. An empty
 * variable is far more likely to mean "misconfigured deploy" than "let everyone
 * in", and being locked out of a dashboard is recoverable in a way that a
 * leaked customer list is not.
 */
export function allowedEmails(raw: string | undefined = process.env.ADMIN_EMAILS): string[] {
  return (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * The allowlist decision, with no Supabase and no environment in the way.
 *
 * Split out from checkAdmin purely so it can be tested: this single boolean is
 * the whole thing standing between an arbitrary Supabase account and every
 * customer name and mobile number in the database, and it had no test.
 */
export function isEmailAllowed(email: string | null | undefined, allowed: string[]): boolean {
  if (allowed.length === 0) return false; // fails CLOSED — see above
  if (!email) return false;
  return allowed.includes(email.trim().toLowerCase());
}

export type AdminCheck =
  | { ok: true; email: string }
  | { ok: false; reason: "signed-out" | "not-allowed" | "not-configured" };

export async function checkAdmin(): Promise<AdminCheck> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return { ok: false, reason: "signed-out" };

  const allowed = allowedEmails();
  if (allowed.length === 0) {
    console.error(
      "ADMIN_EMAILS is not set — refusing all access to /admin. Set it in .env.local and in Vercel, then redeploy."
    );
    return { ok: false, reason: "not-configured" };
  }

  if (!isEmailAllowed(user.email, allowed)) {
    console.warn(`Blocked /admin access for non-allowlisted account: ${user.email}`);
    return { ok: false, reason: "not-allowed" };
  }

  return { ok: true, email: user.email };
}

/** Convenience wrapper for server actions, which only need a yes/no. */
export async function isAdmin(): Promise<boolean> {
  return (await checkAdmin()).ok;
}
