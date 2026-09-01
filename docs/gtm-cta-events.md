# GTM — three CTA Custom Events

The site pushes these `dataLayer` events when each CTA is clicked. Create **3 tags**
in Google Tag Manager using **Custom Event** triggers.

| # | Button | Custom Event name | `data-gtm` attribute |
|---|--------|-------------------|----------------------|
| 1 | **Call now** | `cta_call_now` | `call_now` |
| 2 | **Request a callback** | `cta_request_callback` | `request_callback` |
| 3 | **WhatsApp** (floating button) | `cta_whatsapp_float` | `whatsapp_float` |

- **Call now** dials **9440018418**
- **WhatsApp** opens **7793938418**

---

## Create each tag (repeat ×3)

1. GTM → **Triggers** → **New**
2. Trigger type → **Custom Event**
3. Event name → paste one name from the table (exact match, case-sensitive)
4. Save (e.g. `Trigger — Call now`)
5. **Tags** → **New**
6. Tag type → Google Ads Conversion / GA4 Event / whatever you need
7. Triggering → select the trigger you just made
8. Save

When all three tags exist → **Submit** → **Publish**.

---

## Test in Preview

1. GTM → **Preview** → `https://www.waterbasetechnologies.com`
2. Click **Call now** → look for event `cta_call_now`
3. Click **Request a callback** → `cta_request_callback`
4. Click the floating **Connect on WhatsApp** → `cta_whatsapp_float`
