import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only admin client. Uses the Supabase secret/service-role key, which
// BYPASSES RLS. NEVER import this into a Client Component — the "server-only"
// guard above will throw at build time if you accidentally do.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Supabase renamed service_role -> secret. Accept BOTH names: reading only one
  // of them is what silently broke lead capture after the project was migrated to
  // the new key naming (createAdminClient threw, submitLead swallowed it, and the
  // visitor just saw "Something went wrong").
  const secretKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Supabase admin client missing env vars: NEXT_PUBLIC_SUPABASE_URL and one of SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY"
    );
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}