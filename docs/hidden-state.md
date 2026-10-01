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

### Campaigns

**One campaign, one ad**, covering every product line → `https://www.waterbasetechnologies.com/get-quote`.

The six per-product campaigns (Jain Systems, Heavy Pipes, APMIP Subsidy, Farm Shop, Commercial
Irrigation, KSB Pumps) were retired in favour of it. Their pages remain as SEO pages and are the
natural sitelinks for the one ad. Pause old campaigns rather than deleting them — deletion loses
their reporting history.

### Conversion Actions

**One action: "Contact Us"** → event `ads_conversion_Contact_Us_1`, fired by the site on a
completed form, any call click and any WhatsApp click (`src/lib/analytics.ts`). No Vercel variables
are involved. In Google Ads it must be **Count: One** and **Primary**; any older Call / WhatsApp /
Form actions should be **Secondary** so nothing is counted twice. See `docs/owner-setup-guide.md`.

---|---|---|
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

### Domains

Vercel's primary domain is **`www.waterbasetechnologies.com`**; the bare apex 308-redirects to it.
`siteConfig.url` must match the primary domain — every canonical, the sitemap, robots.txt and the
JSON-LD derive from it. It pointed at the apex until October 2026, which left Google with no stable
URL to index (see the commit "Canonical host is www").

Deployment state is not tracked in this file — it goes stale the moment it is written. Check the
Vercel dashboard, or `curl -sI https://www.waterbasetechnologies.com/ | grep -i age`.

### Analytics Live on Production

| Service | ID | What it tracks | Access |
|---|---|---|---|
| Google Analytics 4 | `G-RP33RYTKFF` | Traffic, conversions | analytics.google.com |
| Google Tag Manager | `GTM-NSS2B9BN` | CTA events (`cta_call_now`, …) | tagmanager.google.com |
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

### 3. Phone calls are counted (resolved)

Calls used to fall back to `ads_conversion_Call_1`, an action that never existed, so no call was
ever counted. Every contact path — calls included — now fires the real "Contact Us" action.

**Status:** Done in code. Only the Google Ads settings remain (Count: One).

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
