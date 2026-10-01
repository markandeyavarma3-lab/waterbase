# Google Ads conversion — "Contact Us"

The account (`AW-874230546`) uses **one** conversion action, **Contact Us**, for its single ad.
Google issued it as the event `ads_conversion_Contact_Us_1`.

## What the website does (already live — nothing to paste)

`src/lib/analytics.ts` fires `ads_conversion_Contact_Us_1` once whenever a visitor:

| Action | Trigger |
|---|---|
| Completes the callback form | `/thank-you?ref=lead` loads — once per submission; refreshes and direct visits don't count |
| Clicks a Call button or any phone number | every `tel:` link on the public site |
| Clicks a WhatsApp button or link | every WhatsApp link on the public site |

Not counted: "Request a callback" clicks (only a *completed* form counts) and anything on `/admin`.

Google Ads offers two snippets. Neither is pasted into the site:

- **Page load** (`gtag('event', 'ads_conversion_Contact_Us_1', {})`) — this is exactly what the
  site fires; `analytics.ts` holds the event name.
- **Click / "delayed navigation helper"** (`gtagSendEvent(url)`) — it delays leaving the page by
  up to 2 s so the hit gets out. The site sends hits with `transport_type: "beacon"` instead, which
  survives the page being left with no delay before the dialer or WhatsApp opens.

Verified in a real browser on 2026-10-01: hero Call, header Call, footer phone, footer WhatsApp,
WhatsApp float and form completion each fire the event exactly once; "Request a callback" fires
nothing.

## What has to be set in Google Ads

**Goals → Conversions → Summary → Contact Us → Edit settings:**

- **Count: One** — a visitor who WhatsApps and also submits the form is one lead.
- **Click-through window:** 30 days · **Attribution:** data-driven · **Primary** action.
- Any older actions (Call / WhatsApp / Form / GA4-imported) → **Secondary**, so nothing is counted
  twice.

## Verify

Tag Assistant → connect `https://www.waterbasetechnologies.com/get-quote` → accept cookies →
click WhatsApp → the `AW-874230546` tag shows `ads_conversion_Contact_Us_1`. Full walkthrough:
`docs/owner-setup-guide.md`, step 3.

## If separate actions are ever wanted again

Per-path overrides still exist: `NEXT_PUBLIC_ADS_CALL_LABEL` / `_EVENT`,
`NEXT_PUBLIC_ADS_CONTACT_LABEL` / `_EVENT`, `NEXT_PUBLIC_ADS_FORM_LABEL` / `_EVENT`. A label (e.g.
`AbC-D_efG`) wins over an event; an unset path keeps firing Contact Us. They're inlined at
**build time**, so set them in Vercel and redeploy.

Do **not** also add Google Ads conversion tags in GTM — that double-counts every lead.
