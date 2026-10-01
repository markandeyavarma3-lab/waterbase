# Waterbase Technologies — Website

Marketing + lead-generation site for **Waterbase Technologies** (irrigation company, Eluru, Andhra Pradesh).
Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**. Hosted on **Vercel**.

---

## Getting Started (local development)

```bash
npm install      # first time only (Node 22+ — Supabase's client warns below that)
npm run dev      # start dev server → http://localhost:3000
npm run test     # unit tests (vitest)
npm run build    # production build
npm run check    # lint + test + build — what CI runs. Do this before pushing.
```

CI runs `lint → test → build` on every pull request (`.github/workflows/ci.yml`),
so a broken build cannot reach `main` unnoticed.

Deployment is automatic: **push to `main` → Vercel builds & deploys**.

---

## Where the leads go (callback requests)

When a visitor submits the "Request a callback" form, the lead is saved and sent in **3 ways**:

1. **Admin dashboard** — `/admin` (log in at `/admin/login` with your Supabase email + password).
   Shows every lead with name, mobile, requirement, location, land size, date, and a status pipeline
   (New → Contacted → Follow Up → Converted → Closed).
2. **Supabase database** — stored in the `leads` table (the dashboard reads from here).
3. **Email alert** — an instant email via Resend with "Call back" + "WhatsApp" buttons.
   Only sent if `RESEND_API_KEY` is set; if not, the lead still saves to the dashboard.

---

## Analytics & traffic

The site has **three** separate tracking systems wired up in `src/app/layout.tsx`:

| Tool | ID | Where to view |
|------|----|----|
| Google Analytics 4 (original) | `G-RP33RYTKFF` | [analytics.google.com](https://analytics.google.com) |
| Google Analytics 4 (second account) | `G-DH17D92KBV` | [analytics.google.com](https://analytics.google.com) |
| Google Ads (conversions) | `AW-874230546` | [ads.google.com](https://ads.google.com) → Goals → Conversions |
| Vercel Analytics | (automatic) | vercel.com → **waterbase** project → **Analytics** tab |

> Note: two GA4 properties are intentionally running at once. Both collect data.

All three Google IDs are configured through **one** `gtag.js` load in
`src/components/site/analytics-tags.tsx`. They used to be three separate script
downloads (two from `@next/third-parties`, one hand-rolled), which meant every
page fetched and ran three copies of the same library.

### Cookie consent

`src/components/site/consent-banner.tsx` gates the Google tags with **Consent
Mode v2**. Defaults are `denied` and are set inline *before* `gtag.js` loads;
accepting calls `gtag('consent','update',…)` and Google replays the queued hits.
`url_passthrough` is on, so Ads click attribution still works while consent is
denied (the `gclid` travels in the URL instead of a cookie).

**This will lower your reported conversion numbers**, because visitors who
decline are no longer measured. That is the trade for DPDP/GDPR compliance — the
previous behaviour dropped analytics and advertising cookies on first paint with
no notice and no way to decline.

---

## Google Ads — campaigns & conversion tracking

**Budget:** ₹5,000/month (~₹166/day), one shared budget pool.
**Strategy split:** ~65% phone calls / 35% form fills. Search-only, ~50km radius around Eluru/Vijayawada.

### Campaigns
1. **Jain Systems** — drip & sprinkler installs (flagship)
2. **Heavy Pipes** — bulk PVC/HDPE/casing pipes
3. **APMIP Subsidy** — 90% govt subsidy hook
4. **Farm Shop** — local accessories, mulching sheets
5. **Commercial Irrigation** — B2B (corporate lawns, nurseries, factories)
6. **KSB Pumps & Motors** — landing page built; campaign not yet launched in Google Ads

### Ad landing pages (built & live)
Each has Call Now + WhatsApp + callback form above the fold, plus a mobile sticky call bar:
- `/jain-systems`
- `/heavy-pipes`
- `/apmip-subsidy`
- `/farm-shop`
- `/commercial-irrigation`
- `/ksb-pumps`

### Conversion tracking — how it works
All conversion events live in `src/lib/analytics.ts` and fire through the Google Ads tag.
The three events are **fully wired in code** and configured entirely through environment variables —
you never need to edit `analytics.ts` to change a conversion.

| Conversion | Fires when | Configured by |
|------------|-----------|---------------|
| Phone call | Any "Call Now" button clicked (all 6 landing pages + mobile sticky bar) | `NEXT_PUBLIC_ADS_CALL_LABEL` / `_EVENT` |
| WhatsApp click | Any WhatsApp link clicked, anywhere on the site | `NEXT_PUBLIC_ADS_CONTACT_LABEL` / `_EVENT` |
| Form submit | `/thank-you` loads after a real form submit (once per submission) | `NEXT_PUBLIC_ADS_FORM_LABEL` / `_EVENT` |

Google gives you **one of two things** per conversion action, depending on the snippet it shows:

- a **label** like `AbC-D_efGhIjKlMnOp` → put it in the `*_LABEL` variable
- an **event name** like `ads_conversion_Call_1` → put it in the `*_EVENT` variable

Set whichever one you were given and leave the other blank. If both are set, the label wins.
If **neither** is set, the code falls back to a placeholder event name that Google Ads will
**not** count — and warns about it in the dev console.

> These are `NEXT_PUBLIC_*` variables, so they are baked in at **build time**. After changing them
> you must redeploy, and they must be set in **Vercel → Settings → Environment Variables**, not just
> in `.env.local`.

### ⚠️ PENDING — create the conversion actions in Google Ads
The code is done; the values are not filled in yet. Until you create the three conversion actions
in Google Ads and paste their values into Vercel, **phone calls (~65% of your conversions) are still
not counted.** See `docs/google-ads-conversions.md` for the click-by-click walkthrough.

---

## Key files

| File | Purpose |
|------|---------|
| `src/lib/site-config.ts` | All business data — phone, email, addresses, WhatsApp, stats, Ads ID. **Never hardcode these elsewhere.** |
| `src/lib/analytics.ts` | Google Ads conversion events (call / form / WhatsApp), driven by env vars |
| `src/lib/leads.ts` | Lead form schema (validation) + admin status list. Uses `zod/mini` — see the note in the file for why |
| `src/lib/products.ts` | The 14 product categories, shared by the homepage band and `/products` |
| `src/lib/csv.ts` | CSV escaping for the lead export, including formula-injection defence |
| `supabase/migrations/` | The `leads` schema, its indexes, and the throttle table |
| `src/lib/admin-auth.ts` | Who may access `/admin` — email allowlist, **fails closed** |
| `src/lib/notify.ts` | Resend email notification for new leads |
| `src/app/admin/` | Leads dashboard (Supabase auth + allowlist) |
| `src/app/layout.tsx` | Analytics tags (GA4 ×2, Google Ads, Vercel) |
| `src/components/site/contact-actions.tsx` | Call Now / WhatsApp / callback buttons |
| `src/components/site/sticky-call-bar.tsx` | Mobile sticky Call/WhatsApp bar on landing pages |

## Environment variables (set in Vercel → Project → Settings → Environment Variables)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client (lead form, admin). The newer `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` name also works |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin dashboard reads all leads. The newer `SUPABASE_SECRET_KEY` name also works |
| **`ADMIN_EMAILS`** | **Required.** Comma-separated emails allowed into `/admin`. Unset = nobody gets in |
| `RESEND_API_KEY` | Lead email alerts (optional — leads still save without it) |
| `LEAD_NOTIFICATION_EMAIL` | Where lead alert emails go (falls back to business email) |
| `LEAD_FROM_EMAIL` | "From" address for lead alert emails |
| `NEXT_PUBLIC_ADS_*_LABEL` / `_EVENT` | Google Ads conversion values — see the conversion tracking section above |
| `CSP_ENFORCE` | `true` switches the Content-Security-Policy from Report-Only to enforcing. Leave unset until verified — see below |

### Content-Security-Policy

`next.config.ts` ships a CSP in **Report-Only** mode. It restricts which origins
may serve scripts, styles, images and connections, and blocks framing outright.

Before setting `CSP_ENFORCE=true`, open a preview deploy, visit a landing page
with the console open and Tag Assistant recording, click **Call Now** and
**WhatsApp**, and submit the form. If nothing is reported, flip it on. Getting
this wrong breaks conversion tracking silently, which is why it does not enforce
by default.

> ⚠️ `ADMIN_EMAILS` **must be set in Vercel before this branch is merged**, or the live
> dashboard will lock you out. Being signed in is no longer sufficient on its own: the dashboard
> reads leads with the service-role key, which bypasses row-level security, so the allowlist is
> the only thing protecting customer names and phone numbers.

---

## Database

The schema lives in `supabase/migrations/`, and the repo's migration history
matches the live project's exactly (checked with `supabase_migrations.schema_migrations`):

| Version | What | State |
|---|---|---|
| `20260621120129` | `leads.location`, `leads.land_size` | applied (originally via dashboard; mirrored here) |
| `20261001064520` | `leads` baseline: status/requirement CHECKs, indexes incl. `(mobile, created_at)`, RLS | **applied** |
| `20261001064524` | `lead_throttle` table for per-IP rate limiting; `prune_lead_throttle()` (service-role only) | **applied** |

All three are idempotent. For a future schema change: add a new file here, then
`supabase db push` (or apply via the dashboard SQL editor **and** commit the same
SQL here with the version Supabase records — otherwise `db push` refuses to run).

RLS is enabled with **no policies** on both tables, on purpose. The site reaches
them only through the service-role key, and the only gate on that path is the
`ADMIN_EMAILS` allowlist. Supabase's advisor flags "RLS enabled, no policy" as
INFO — that is the intended state, not a problem to fix.

---

## Conventions
- **One image format across the site: JPG.** Avoid spaces in filenames (they break image URLs).
- **No public phone numbers** anywhere except WhatsApp — *except* ad landing pages, which get a
  `tel:` "Call Now" button (the hybrid rule, to maximise call conversions on paid traffic).
- All business data lives in `src/lib/site-config.ts`.
