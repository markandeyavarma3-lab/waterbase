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
All conversion events live in `src/lib/analytics.ts` and fire through the Google Ads tag:

| Conversion | Event name | Fires when | Status |
|------------|-----------|-----------|--------|
| WhatsApp click | `ads_conversion_Contact_Us_1` | Any WhatsApp link clicked (tracked site-wide) | ✅ Working |
| Form submit | `ads_conversion_Form_1` | `/thank-you` page loads after a form submit | ✅ Working |
| Phone call (Call Now) | `ads_conversion_Call_1` | Any "Call Now" button clicked on a landing page | ⚠️ **Placeholder name — needs real value** |

The "Call Now" buttons are **already wired** to fire `trackCallClick()` everywhere they appear
(both CTAs on all 5 landing pages + the mobile sticky call bar). The code is complete.

### ⚠️ PENDING TASK — finish phone-call conversion tracking
Right now `trackCallClick()` in `src/lib/analytics.ts` fires a **placeholder** event name
(`ads_conversion_Call_1`). Google Ads will only count phone-call conversions if this name **exactly
matches** the event name Google generates for the real conversion action. Until this is fixed,
roughly **65% of conversions (phone calls) are invisible to Google Ads.**

**To finish:**
1. In Google Ads → **Goals → Conversions → + New conversion action → Website**.
2. Create one for **"Calls to a phone number on your website"** (tracks `tel:` Call Now clicks).
3. Copy the **exact event name** from the tag snippet it gives you (looks like
   `gtag('event', 'ads_conversion_Call_Now_1', ...)`).
4. Paste that name into `trackCallClick()` in `src/lib/analytics.ts`, replacing `ads_conversion_Call_1`.
5. `npm run build`, then commit & push.

---

## Key files

| File | Purpose |
|------|---------|
| `src/lib/site-config.ts` | All business data — phone, email, addresses, WhatsApp. **Never hardcode these elsewhere.** |
| `src/lib/analytics.ts` | Google Ads conversion events (call / form / WhatsApp) |
| `src/lib/leads.ts` | Lead form schema (validation) + admin status list |
| `src/lib/notify.ts` | Resend email notification for new leads |
| `src/app/admin/` | Leads dashboard (Supabase auth) |
| `src/app/layout.tsx` | Analytics tags (GA4 ×2, Google Ads, Vercel) |
| `src/components/site/contact-actions.tsx` | Call Now / WhatsApp / callback buttons |
| `src/components/site/sticky-call-bar.tsx` | Mobile sticky Call/WhatsApp bar on landing pages |

## Environment variables (set in Vercel → Project → Settings → Environment Variables)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client (lead form, admin) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin dashboard reads all leads |
| `RESEND_API_KEY` | Lead email alerts (optional — leads still save without it) |
| `LEAD_NOTIFICATION_EMAIL` | Where lead alert emails go (falls back to business email) |
| `LEAD_FROM_EMAIL` | "From" address for lead alert emails |

---

## Conventions
- **One image format across the site: JPG.** Avoid spaces in filenames (they break image URLs).
- **No public phone numbers** anywhere except WhatsApp — *except* ad landing pages, which get a
  `tel:` "Call Now" button (the hybrid rule, to maximise call conversions on paid traffic).
- All business data lives in `src/lib/site-config.ts`.
