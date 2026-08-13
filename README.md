# Waterbase Technologies — Website

Marketing + lead-generation site for **Waterbase Technologies** (irrigation company, Eluru, Andhra Pradesh).
Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**. Hosted on **Vercel**.

---

## Getting Started (local development)

```bash
npm install      # first time only
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build (run this before pushing to catch errors)
```

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
| `src/lib/leads.ts` | Lead form schema (validation) + admin status list |
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

> ⚠️ `ADMIN_EMAILS` **must be set in Vercel before this branch is merged**, or the live
> dashboard will lock you out. Being signed in is no longer sufficient on its own: the dashboard
> reads leads with the service-role key, which bypasses row-level security, so the allowlist is
> the only thing protecting customer names and phone numbers.

---

## Conventions
- **One image format across the site: JPG.** Avoid spaces in filenames (they break image URLs).
- **No public phone numbers** anywhere except WhatsApp — *except* ad landing pages, which get a
  `tel:` "Call Now" button (the hybrid rule, to maximise call conversions on paid traffic).
- All business data lives in `src/lib/site-config.ts`.
