# GTM + Google Ads — Call, Callback, WhatsApp

The website already fires **both**:

1. **GTM / GA4 events** on the three CTAs (and the form thank-you)
2. **Google Ads conversions** via `gtag` (account `AW-874230546`)

Do **not** also add Google Ads Conversion tags in GTM for the same clicks — that would **double-count**.

| Button | GTM / GA4 event | Ads conversion in code |
|--------|-----------------|------------------------|
| Call now | `cta_call_now` | `ads_conversion_Contact_Us_1` |
| Request a callback | `cta_request_callback` | none for the click — counted when the form succeeds (`cta_form_submit` + `ads_conversion_Contact_Us_1`) |
| WhatsApp (float + mobile sticky) | `cta_whatsapp_float` | `ads_conversion_Contact_Us_1` |
| Any other phone / WhatsApp link | — | `ads_conversion_Contact_Us_1` (site-wide `ConversionTracker`) |

---

## What you still do in GTM (10 minutes)

Optional but useful: three **GA4 Event** tags so the events show cleanly in GA4 reports.

1. GTM (`GTM-NSS2B9BN`) → **Triggers** → **New** → **Custom Event**
2. Event name (exact): `cta_call_now` — save
3. Repeat for `cta_request_callback` and `cta_whatsapp_float`
4. **Tags** → **New** → **GA4 Event**
   - Configuration tag: your existing GA4 config (`G-RP33RYTKFF`). If a config tag for
     `G-DH17D92KBV` still exists here, delete it — that property was retired.
   - Event name: same as the trigger
5. **Submit** → **Publish**

The site also sends these as `gtag('event', …)` already, so GA4 may show them even before you publish GTM tags.

---

## Google Ads mapping

One conversion action, **Contact Us** (`ads_conversion_Contact_Us_1`), built into the code — no
environment variables needed. Its settings (Count: **One**, Primary) and how to verify it are in
`docs/google-ads-conversions.md`.

---

## Test

1. GTM Preview → `https://www.waterbasetechnologies.com/get-quote`
2. Click **Call now** → `cta_call_now`
3. Click **Request a callback** → `cta_request_callback`
4. Click WhatsApp (float or mobile bar) → `cta_whatsapp_float`
5. Submit the contact form → `/thank-you` → `cta_form_submit` then auto-return after 5 seconds
