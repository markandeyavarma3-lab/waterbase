# Hidden State — What's Not in the Repo

This document covers everything that exists but isn't visible from GitHub alone. It's the gap between what the code shows and what actually runs.

---

## 🔐 Secrets & Config (Never in Repo)

### Vercel Environment Variables

| Variable | What it is | Where set | Status |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Vercel Settings | ✓ Must exist |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key (public) | Vercel Settings | ✓ Must exist |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (secret) | Vercel Settings | ✓ Must exist |
| `RESEND_API_KEY` | Email sending (Resend) | Vercel Settings | Optional |
| `LEAD_NOTIFICATION_EMAIL` | Where lead emails go | Vercel Settings | Optional |
| `LEAD_FROM_EMAIL` | From: address for lead emails | Vercel Settings | Optional |
| `ADMIN_EMAILS` | Allowlist for /admin access | Vercel Settings | **⚠️ CRITICAL** — must set before merge |
| `NEXT_PUBLIC_ADS_CALL_LABEL` | Google Ads phone conversion | Vercel Settings | **Pending** — you provide |
| `NEXT_PUBLIC_ADS_CALL_EVENT` | Google Ads phone conversion | Vercel Settings | **Pending** — you provide |
| `NEXT_PUBLIC_ADS_CONTACT_LABEL` | Google Ads WhatsApp conversion | Vercel Settings | **Pending** — you provide |
| `NEXT_PUBLIC_ADS_CONTACT_EVENT` | Google Ads WhatsApp conversion | Vercel Settings | **Pending** — you provide |
| `NEXT_PUBLIC_ADS_FORM_LABEL` | Google Ads form conversion | Vercel Settings | **Pending** — you provide |
| `NEXT_PUBLIC_ADS_FORM_EVENT` | Google Ads form conversion | Vercel Settings | **Pending** — you provide |

**Rule:** Everything starting with `NEXT_PUBLIC_*` is baked into the client bundle at build time. Changing them requires a redeploy.

---

## 🗄️ Supabase Database Schema

The database structure is inferred from the code; there are no migration files in the repo.

### `public.leads` table

```sql
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  requirement TEXT NOT NULL,  -- enum-like: one of the REQUIREMENT_OPTIONS
  status TEXT NOT NULL DEFAULT 'new',  -- CHECK constraint: new|contacted|follow_up|converted|closed
  source TEXT NOT NULL DEFAULT 'website',
  admin_notes TEXT,
  location TEXT,
  land_size TEXT
);

-- Row-level security: enabled, deny-all (no policies)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
```

**Current state:**
- RLS is ON but has no policies → behaves as "deny all unless service role"
- Service role key is used by `/admin` and server actions, which bypass RLS entirely
- No migrations file to recreate this — if the table is dropped, the schema is gone

**To backup/restore:** Use Supabase dashboard → Backups, or pg_dump against the live database.

---

## 🎯 Google Ads Setup

Documented in README and `docs/google-ads-conversions.md`, but not in code (except for the placeholder event names).

### Account & Campaigns

- **Account ID:** `AW-874230546` (in `src/lib/site-config.ts`)
- **Monthly budget:** ₹5,000 (~₹166/day), one shared pool
- **Strategy:** ~65% phone calls / 35% form fills, Search only, ~50km radius around Eluru/Vijayawada

### Existing Campaigns

| Campaign | Status | Landing page |
|---|---|---|
| Jain Systems | Active | `/jain-systems` |
| Heavy Pipes | Active | `/heavy-pipes` |
| APMIP Subsidy | Active | `/apmip-subsidy` |
| Farm Shop | Active | `/farm-shop` |
| Commercial Irrigation | Active | `/commercial-irrigation` |
| KSB Pumps | Built, not yet in Ads | `/ksb-pumps` |

### Conversion Actions

| Conversion | Status | Value location |
|---|---|---|
| Phone calls | **Not created yet** | Google Ads → Goals → Conversions → + New |
| WhatsApp clicks | Already exists | Google Ads → Goals → Conversions → [existing action] |
| Callback form | Already exists | Google Ads → Goals → Conversions → [existing action] |

**Important:** WhatsApp and form conversions already exist and are already being tracked. Creating new ones would split history. Only the phone call one needs to be created.

---

## 🚀 Runtime Behavior (Vercel)

### How the Site Deploys

1. Push to `main` → GitHub webhook → Vercel builds → Vercel deploys
2. Push to any other branch → Vercel builds a preview, no production deploy
3. Environment variables are substituted at build time (for `NEXT_PUBLIC_*`)
4. Each Vercel deployment is immutable and gets a unique URL

### Current Deployments

| Branch | Commit | Environment | Status | URL |
|---|---|---|---|---|
| `main` | `547a8b1` | Production | Live | `waterbasetechnologies.com` |
| `audit-fixes` | `131364e` | Preview | Built, live | Vercel preview URL |

**Key fact:** The preview uses the same Vercel environment variables as production (if set for Preview). To test with different Ads values without affecting production, create a new Preview variable set or edit the branch-specific Vercel settings.

### Analytics Live on Production

| Service | ID | What it tracks | Access |
|---|---|---|---|
| Google Analytics 4 | `G-RP33RYTKFF` | Traffic, conversions | analytics.google.com |
| Google Analytics 4 | `G-DH17D92KBV` | Traffic, conversions (duplicate) | analytics.google.com |
| Google Ads | `AW-874230546` | Conversions (once wired) | ads.google.com |
| Vercel Analytics | (automatic) | Performance, errors | Vercel dashboard |

---

## 📋 Small In-Repo Gaps

### 1. `src/proxy.ts` (admin gate)

In Next.js 16 this file **is** the network proxy (the old `middleware.ts`). It
redirects unsigned visitors away from `/admin` and refreshes the Supabase
session cookie. Allowlist checks still run in `src/lib/admin-auth.ts` —
signed in ≠ admin.

**Status:** Wired. Keep both layers.

### 2. Testimonials are empty

`src/components/sections/testimonials.tsx` has full styling and animation but no data. It renders an empty state on every page that includes it.

**Status:** Waiting for quotes from clients. File is ready, just needs the content.

### 3. Phone call conversion event name is a placeholder

`src/lib/analytics.ts` has the structure built but falls back to `ads_conversion_Call_1` when no env var is set. This is by design — the real value comes from Google Ads, not the code.

**Status:** You provide the value in step 2 of the merge checklist.

---

## 🔍 What You Can't Know Without Access

- Whether Supabase automatic backups are enabled
- The exact SQL of any triggers or functions (if they exist)
- How much database storage is being used
- Supabase API rate limits (could matter if traffic spikes)
- Vercel's actual edge cache behavior on your routes
- Whether there are GitHub branch protection rules set
- What's in the Supabase email templates (for password reset, etc.)

---

## 📝 To Remember

**The repo is the source of truth for code, not for state.**

Next developer should:
1. Check this file first to know what's hidden
2. Know that `ADMIN_EMAILS` must be set or `/admin` fails closed
3. Know that `.env.local` is gitignored — they'll need to set their own copy to run locally
4. Know that Supabase schema can only be seen live or from backups, not from git history
