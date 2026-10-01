-- Mirrors a migration that was applied to the live project through the Supabase
-- dashboard on 2026-06-21 and never committed. It is reproduced here verbatim
-- (from supabase_migrations.schema_migrations) so the repo's migration history
-- matches the remote one — without it, `supabase db push` refuses to run,
-- because the remote has a version the local folder does not know about.
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS land_size text;
