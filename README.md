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

| Tool | ID | Where to view |
|------|----|----|
| Google Analytics 4 | `G-RP33RYTKFF` | [analytics.google.com](https://analytics.google.com) |
| Google Ads (conversions) | `AW-874230546` | [ads.google.com](https://ads.google.com) → Goals → Conversions |
| Google Tag Manager | `GTM-NSS2B9BN` | [tagmanager.google.com](https://tagmanager.google.com) — receives the CTA events (`docs/gtm-cta-events.md`) |
| Vercel Analytics | (automatic) | vercel.com → **waterbase** project → **Analytics** tab |

GA4 and Ads are configured through **one** `gtag.js` load in
`src/components/site/analytics-tags.tsx`; GTM loads from `<head>` in `src/app/layout.tsx`.

> **One GA4 property.** A second one (`G-DH17D92KBV`) used to run alongside; it was removed
> because two properties on one site never reconcile and doubled the tag cost. If GTM still has a
> GA4 configuration tag for `G-DH17D92KBV`, remove it there too — the code cannot reach it.

## Google Ads — one campaign, one landing page

**Budget:** ₹5,000/month (~₹166/day). Search-only, ~50km radius around Eluru/Vijayawada.
**Strategy split:** ~65% phone calls / 35% form fills.

The account runs **a single ad covering every product line**, landing on:

> **`https://www.waterbasetechnologies.com/get-quote`** — always the `www` host.

`/get-quote` names every line (Jain drip & sprinkler, KSB pumps, pipes, farm shop, commercial,
APMIP), puts Call Now + WhatsApp + the callback form above the fold, and links each line on to its
detailed page. It is `noindex` and not in the sitemap — it deliberately repeats what the detailed
pages cover, and Google Ads does not need its landing page indexed.

The six pages that used to be separate campaign destinations are now **SEO pages** (linked from the
footer and mobile menu). In Google Ads they make good **sitelinks** on the one ad:
`/jain-systems` · `/ksb-pumps` · `/heavy-pipes` · `/farm-shop` · `/commercial-irrigation` · `/apmip-subsidy`

**Account-side steps (done in Google Ads, not in code):** pause — don't delete, so the history
stays — the old per-product campaigns; create the one Search campaign with the final URL above;
add the six pages as sitelinks; keep the conversion actions below.

### Conversion tracking — ONE action: "Contact Us"

The single ad optimises for one Google Ads conversion action, **Contact Us**, whose event is
`ads_conversion_Contact_Us_1`. It is built into `src/lib/analytics.ts` as the default — **no
environment variable is needed**. It fires, once per action, on:

| Visitor does | Where it is wired |
|---|---|
| Completes the callback form | `/thank-you?ref=lead` load, once per submission (`FormConversionTracker`) |
| Clicks any Call / phone link | Call buttons (`trackCallClick`) + every other `tel:` link via `ConversionTracker` |
| Clicks any WhatsApp link | Float + sticky bar (`trackWhatsAppFloatClick`) + every other link via `ConversionTracker` |

Not counted: "Request a callback" clicks (only the *completed* form counts), and anything on
`/admin` — the owner messaging a lead is not a new lead.

Hits are sent with `transport_type: "beacon"`, which is why the site does not use Google's
"delayed navigation helper" (`gtagSendEvent`) snippet: that holds the visitor for up to 2 s before
the dialer opens; beacon delivers the hit without the wait.

**In Google Ads, set this action's *Count* to "One"** — a visitor who WhatsApps and then fills the
form is one lead, not two. Step-by-step: `docs/google-ads-conversions.md`.

<details><summary>Overrides (only if separate Call / WhatsApp / Form actions are created later)</summary>

Each path can be pointed at its own action with `NEXT_PUBLIC_ADS_{CALL,CONTACT,FORM}_LABEL` (a
label like `AbC-D_efG`, fired via `send_to`) or `…_EVENT` (an event name). Label wins if both are
set; unset paths keep firing Contact Us. These are inlined at **build time** — set them in Vercel
and redeploy.
</details>

---

## Key files

| File | Purpose |
|------|---------|
| `src/lib/site-config.ts` | All business data — phone, email, addresses, WhatsApp, stats, Ads ID. **Never hardcode these elsewhere.** |
| `src/lib/analytics.ts` | Google Ads conversion — every contact path fires the "Contact Us" action |
| `src/lib/leads.ts` | Lead form schema (validation) + admin status list. Uses `zod/mini` — see the note in the file for why |
| `src/lib/products.ts` | The 14 product categories, shared by the homepage band and `/products` |
| `src/lib/csv.ts` | CSV escaping for the lead export, including formula-injection defence |
| `supabase/migrations/` | The `leads` schema, its indexes, and the throttle table |
| `src/lib/admin-auth.ts` | Who may access `/admin` — email allowlist, **fails closed** |
| `src/lib/notify.ts` | Resend email notification for new leads |
| `src/app/admin/` | Leads dashboard (Supabase auth + allowlist) |
| `src/app/layout.tsx` | Consent defaults, GTM, GA4 + Ads tags, Search Console verification |
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
| `GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag code (only the `content` value). Optional; redeploy after setting |
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
- **Public numbers:** Call Now is `siteConfig.callNowNumber`, WhatsApp is `siteConfig.whatsappNumber`.
  Calling is the primary action (~two-thirds of conversions), so a `tel:` Call Now button appears in
  the header (desktop), the hero, every landing page and the mobile sticky bar. Every one fires the
  same tracking — use `trackCallClick` from `src/lib/analytics.ts` for any new one.
- **Canonical host is `www`.** `siteConfig.url` must match the domain Vercel serves as primary
  (the apex redirects to it). Pinned by a test — see `site-config.ts` for why it matters.
- All business data lives in `src/lib/site-config.ts`.
