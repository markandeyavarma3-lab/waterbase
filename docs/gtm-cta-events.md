# GTM + Google Ads — Call, Callback, WhatsApp

The website already fires **both**:

1. **GTM / GA4 events** on the three CTAs (and the form thank-you)
2. **Google Ads conversions** via `gtag` (account `AW-874230546`)

Do **not** also add Google Ads Conversion tags in GTM for the same clicks — that would **double-count**.

| Button | GTM / GA4 event | Ads conversion in code |
|--------|-----------------|------------------------|
| Call now | `cta_call_now` | `call` (`NEXT_PUBLIC_ADS_CALL_LABEL` or `_EVENT`) |
| Request a callback | `cta_request_callback` | counted when the form succeeds → `cta_form_submit` + `form` Ads |
| WhatsApp (float + mobile sticky) | `cta_whatsapp_float` | `contact` (`NEXT_PUBLIC_ADS_CONTACT_LABEL` or `_EVENT`) |

---

## What you still do in GTM (10 minutes)

Optional but useful: three **GA4 Event** tags so the events show cleanly in GA4 reports.

1. GTM (`GTM-NSS2B9BN`) → **Triggers** → **New** → **Custom Event**
2. Event name (exact): `cta_call_now` — save
3. Repeat for `cta_request_callback` and `cta_whatsapp_float`
4. **Tags** → **New** → **GA4 Event**
   - Configuration tag: your existing GA4 config (`G-RP33RYTKFF` / `G-DH17D92KBV`)
   - Event name: same as the trigger
5. **Submit** → **Publish**

The site also sends these as `gtag('event', …)` already, so GA4 may show them even before you publish GTM tags.

---

## Google Ads mapping (required for Ads to count)

Follow `docs/google-ads-conversions.md`:

1. Create 3 conversion actions in Ads: **Call Now click**, **WhatsApp click**, **Callback form**
2. Copy each **label** (or event name)
3. Paste into Vercel env, then **redeploy**:

```
NEXT_PUBLIC_ADS_CALL_LABEL=…
NEXT_PUBLIC_ADS_CONTACT_LABEL=…
NEXT_PUBLIC_ADS_FORM_LABEL=…
```

Until those env vars are set, Ads will **not** count conversions (placeholders fire in development only as a warning).

---

## Test

1. GTM Preview → `https://www.waterbasetechnologies.com`
2. Click **Call now** → `cta_call_now`
3. Click **Request a callback** → `cta_request_callback`
4. Click WhatsApp (float or mobile bar) → `cta_whatsapp_float`
5. Submit the contact form → `/thank-you` → `cta_form_submit` then auto-return after 5 seconds
