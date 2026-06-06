import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only admin client. Uses SUPABASE_SECRET_KEY, which BYPASSES RLS.
// NEVER import this into a Client Component — the "server-only" guard above
// will throw at build time if you accidentally do.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Supabase admin client missing env vars: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY"
    );
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}