-- ─────────────────────────────────────────────────────────────────────────────
-- Baseline schema for public.leads
--
-- This table already exists in production. It was created by hand through the
-- Supabase dashboard and had NO migration anywhere in the repo, which meant the
-- schema existed only in the live project — as docs/hidden-state.md put it,
-- "if the table is dropped, the schema is gone".
--
-- This file reconstructs it from the code that reads and writes it
-- (src/lib/leads.ts, src/lib/actions/leads.ts, src/components/admin/*). It is
-- written to be SAFE TO RUN AGAINST THE EXISTING DATABASE: every statement is
-- idempotent, so applying it to production creates nothing that is already
-- there and only adds the missing indexes.
--
-- Apply with:  supabase db push        (or paste into the SQL editor)
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text        not null,
  mobile       text        not null,
  requirement  text        not null,
  status       text        not null default 'new',
  source       text        not null default 'website',
  location     text,
  land_size    text,
  admin_notes  text
);

-- Mirrors LEAD_STATUSES in src/lib/leads.ts. The server action already
-- whitelists against that array; this is the backstop for anything that reaches
-- the table by another route.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'leads_status_check'
  ) then
    alter table public.leads
      add constraint leads_status_check
      check (status in ('new', 'contacted', 'follow_up', 'converted', 'closed'));
  end if;
end $$;

-- Mirrors REQUIREMENT_OPTIONS in src/lib/leads.ts.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'leads_requirement_check'
  ) then
    alter table public.leads
      add constraint leads_requirement_check
      check (requirement in (
        'product_supply', 'survey_design', 'installation', 'project_execution',
        'landscaping', 'apmip_subsidy', 'other'
      ));
  end if;
end $$;

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- The admin dashboard's main query: ORDER BY created_at DESC LIMIT 500.
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- submitLead()'s throttle runs on EVERY public form submission:
--   select count(*) from leads where mobile = $1 and created_at >= $2
-- Without this it is a sequential scan whose cost grows with the table — on the
-- hot path of the one action the whole site exists to perform.
create index if not exists leads_mobile_created_idx
  on public.leads (mobile, created_at desc);

-- Backs the per-status count queries on the dashboard (one per pipeline stage).
create index if not exists leads_status_idx
  on public.leads (status);

-- ── Row-level security ───────────────────────────────────────────────────────
--
-- Enabled with NO policies, which denies everything to the anon and
-- authenticated roles. This is deliberate and load-bearing: the site reaches
-- this table exclusively through the service-role key, which bypasses RLS, and
-- the only thing gating that path is the ADMIN_EMAILS allowlist in
-- src/lib/admin-auth.ts. Adding a permissive policy here would hand every
-- signed-up Supabase account the entire customer list.
alter table public.leads enable row level security;
