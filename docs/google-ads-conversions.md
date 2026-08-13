# Setting up the three Google Ads conversions

**The code is finished.** Every conversion event is wired and tested — the site just doesn't know
what to call them yet. This guide is the remaining half: creating the three conversion actions in
Google Ads and pasting their values into Vercel.

Until this is done, **phone calls are not counted**, and phone calls are roughly 65% of the intended
conversion mix. Google Ads has been optimising your bids against about a third of your real results.

Budget about 25 minutes. You need access to the Google Ads account (`AW-874230546`) and to the
Vercel project.

---

## What you're creating

| # | Conversion action | What it measures | Feeds env var |
|---|-------------------|------------------|---------------|
| 1 | **Phone calls** | Clicks on any "Call Now" button | `NEXT_PUBLIC_ADS_CALL_*` |
| 2 | **WhatsApp clicks** | Clicks on any WhatsApp link, site-wide | `NEXT_PUBLIC_ADS_CONTACT_*` |
| 3 | **Callback form** | A completed form submission | `NEXT_PUBLIC_ADS_FORM_*` |

Do **#1 first**. If you run out of time, it's the one that matters.

---

## Step 1 — Create the phone call conversion

1. Google Ads → **Goals** → **Conversions** → **Summary**.
2. Click **+ New conversion action**.
3. Choose **Website**.
4. Enter `waterbasetechnologies.com` and click **Scan**.
   Ignore whatever it auto-detects — click **+ Add a conversion action manually** at the bottom.
5. Fill in:
   - **Goal category** → *Contact* → **Phone call leads**
   - **Conversion name** → `Call Now click` (any name is fine; you'll recognise it later)
   - **Value** → *Don't use a value* (or set one if you know a call's worth to you)
   - **Count** → **One** — one person clicking Call three times is one lead, not three
   - **Click-through conversion window** → 30 days
   - **Attribution** → Data-driven (the default)
6. Click **Done**, then **Save and continue**.

## Step 2 — Copy the value (this is the important bit)

Google now shows you a tag setup screen. Choose **Install the tag yourself** (not Google Tag Manager,
not email — you want to see the code).

You'll see a snippet. **Look carefully at which of these two shapes it has:**

**Shape A — an event snippet:**
```js
gtag('event', 'ads_conversion_Call_Now_1', { ... });
```
→ Copy `ads_conversion_Call_Now_1`. This is an **EVENT**.

**Shape B — a conversion label:**
```js
gtag('event', 'conversion', {'send_to': 'AW-874230546/AbC-D_efGhIjKlMnOp'});
```
→ Copy `AbC-D_efGhIjKlMnOp` (or the whole `AW-874230546/AbC-D_efGhIjKlMnOp` — both work).
This is a **LABEL**.

You will get one shape or the other. You do **not** need to paste the snippet anywhere — the tag is
already installed sitewide. You only need this one string.

> **Don't skip this screen.** Once you leave it, getting back to the value takes a few extra clicks:
> Conversions → click the action → **Tag setup** → **Install the tag yourself**.

## Step 3 — Repeat for WhatsApp and the form

Same flow, twice more:

- **WhatsApp** — goal category *Contact* → **Chat/message leads**. Count: **One**.
- **Callback form** — goal category *Submit lead form*. Count: **One**.

Collect all three values before moving on.

---

## Step 4 — Put the values into Vercel

Vercel → **waterbase** project → **Settings** → **Environment Variables**.

For each conversion, add **one** variable — whichever shape you got in Step 2:

| If you got a… | Add this variable | Example value |
|---------------|-------------------|---------------|
| LABEL | `NEXT_PUBLIC_ADS_CALL_LABEL` | `AbC-D_efGhIjKlMnOp` |
| EVENT | `NEXT_PUBLIC_ADS_CALL_EVENT` | `ads_conversion_Call_Now_1` |

…and the same for `NEXT_PUBLIC_ADS_CONTACT_*` and `NEXT_PUBLIC_ADS_FORM_*`.

**Rules:**
- Set **one** of LABEL/EVENT per conversion, not both. If both are set, LABEL wins.
- Apply each to **all three** environments (Production, Preview, Development).
- Add the same lines to your local `.env.local` so local testing matches.

Then **redeploy**. These are `NEXT_PUBLIC_*` variables — they're baked into the JavaScript at build
time, so an existing deployment will not pick them up. Vercel → **Deployments** → ⋯ → **Redeploy**.

---

## Step 5 — Verify it actually works

Don't trust it until you've seen it fire.

**Immediate check (2 minutes):**
1. Install the **Google Tag Assistant** browser extension.
2. Open `waterbasetechnologies.com/jain-systems` with Tag Assistant recording.
3. Click **Call Now**.
4. Tag Assistant should show a `conversion` event (or your event name) going to `AW-874230546`.

**Real check (24–48 hours):**
Google Ads → Goals → Conversions. The status column should move from
**"No recent conversions"** to **"Recording conversions"**. This lags — don't panic on day one.

**A quick sanity test without touching your phone:** open the site on a desktop browser, where
`tel:` links do nothing visible. The conversion still fires on the click.

---

## Troubleshooting

**Status stays "No recent conversions" after 48 hours**
- Confirm the variable is set for the **Production** environment specifically.
- Confirm you **redeployed** after adding it. This is the most common cause by far.
- View source on a landing page and search for your label/event string. If it isn't in the
  JavaScript, the build didn't pick up the variable.

**Conversions are double-counting**
- Check the conversion action's **Count** setting is **One**, not **Every**.
- The form conversion is already deduplicated in code — one count per submission, and reloading
  `/thank-you` will not re-fire it.

**Calls count but seem too high**
- Every "Call Now" click counts, including misclicks and people who don't complete the call.
  That's normal and it's what a click-based phone conversion measures. If you want true call
  duration data, that needs a Google forwarding number, which is a different setup.

---

## What this does not cover

Calls made by someone reading the number off your Google Business Profile, or typing it in, are
invisible to this — they never touch the website. That's expected, and it's a real reason your
true call volume runs higher than what Ads reports.
