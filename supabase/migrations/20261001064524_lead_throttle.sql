-- ─────────────────────────────────────────────────────────────────────────────
-- Per-IP throttling for the public callback form.
--
-- submitLead() previously had two defences: a honeypot field, and a limit of 3
-- submissions per MOBILE NUMBER per 10 minutes. A script that increments the
-- phone number defeats both — the honeypot is a fixed field name, and the
-- throttle keys on a value the submitter controls. Every accepted submission
-- writes a row AND sends a Resend email, so the cost of the gap is a poisoned
-- lead table, a flooded inbox and burnt email quota.
--
-- This adds a second key the submitter does not control as freely.
--
-- The IP is stored as a SHA-256 hash, never in the clear: it is only ever
-- compared for equality, so the raw value has no use here, and an IP address is
-- personal data under the DPDP Act. Rows expire after an hour.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.lead_throttle (
  -- A surrogate key, not (ip_hash, created_at): two submissions from one
  -- address in the same microsecond would otherwise collide on the primary key
  -- and the second record would be silently dropped.
  id          bigint generated always as identity primary key,
  ip_hash     text        not null,
  created_at  timestamptz not null default now()
);

-- Serves the throttle query exactly:
--   select count(*) … where ip_hash = $1 and created_at >= $2
create index if not exists lead_throttle_lookup_idx
  on public.lead_throttle (ip_hash, created_at desc);

-- Reached only via the service-role key, exactly like public.leads. Enabled
-- with no policies, which denies the anon and authenticated roles outright.
alter table public.lead_throttle enable row level security;

-- Housekeeping. Called opportunistically from the server action rather than
-- scheduled, so the table stays small without needing pg_cron.
--
-- SECURITY INVOKER, and EXECUTE revoked from everyone but service_role. A
-- function in `public` is callable over PostgREST by default — as security
-- definer it would have let any anonymous visitor run it with the owner's
-- rights via /rest/v1/rpc/prune_lead_throttle.
create or replace function public.prune_lead_throttle()
returns void
language sql
security invoker
set search_path = public
as $$
  delete from public.lead_throttle where created_at < now() - interval '1 hour';
$$;

revoke execute on function public.prune_lead_throttle() from public, anon, authenticated;
grant execute on function public.prune_lead_throttle() to service_role;
