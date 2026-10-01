# Owner setup guide — everything that has to be done outside the code

Everything in the code is done and live. These are the steps only the account owner can do,
because they happen inside Google Ads, Search Console, Business Profile, Tag Manager, Supabase and
Vercel. Do them in this order — the earlier ones matter most.

**Always use the `www` address:** `https://www.waterbasetechnologies.com`
(the plain `waterbasetechnologies.com` just redirects to it).

| # | Task | Time | Why it matters |
|---|---|---|---|
| 1 | Finish the "Contact Us" conversion settings | 5 min | The ad can only optimise for what it can count |
| 2 | Retire the six old campaigns, create the one new campaign | 45 min | The single-ad plan |
| 3 | Verify conversions with Tag Assistant | 10 min | Proves it works before money is spent |
| 4 | Google Search Console | 15 min | Fixes "the website doesn't show when I search my name" |
| 5 | Google Business Profile website link | 2 min | Same — and the map listing |
| 6 | Google Tag Manager cleanup | 10 min | Stops double-counting |
| 7 | Supabase leaked-password protection | 2 min | Protects the leads dashboard |
| 8 | Vercel checks | 5 min | Node version, admin access |
| 9 | Turn the security policy (CSP) on | 10 min | Optional hardening |
| 10 | Testimonials | — | When you have them |

---

## 1. Finish the "Contact Us" conversion — 5 min

The website side is **already done**. Google gave you the event `ads_conversion_Contact_Us_1`
and the site now fires it, exactly once per action, when a visitor:

- completes the callback form (when `/thank-you` loads — the "Page load" option you chose),
- clicks any **Call** button or phone number, anywhere on the site,
- clicks any **WhatsApp** button or link, anywhere on the site.

You do **not** need to paste either code snippet anywhere, and you do **not** need to set anything
in Vercel. (The second snippet, the "delayed navigation helper", is replaced by a better method in
the code that sends the signal without making the visitor wait two seconds.)

What's left is the action's settings, in Google Ads:

1. Click **Continue to your account** on the screen you screenshotted.
2. Go to **Goals → Conversions → Summary**.
3. Click **Contact Us** → **Edit settings**, and set:
   - **Count:** **One** ← most important. A visitor who WhatsApps *and* fills the form is one
     lead, not two.
   - **Click-through conversion window:** 30 days.
   - **Attribution:** Data-driven (the default).
   - **Action optimisation / goal:** **Primary**.
4. **Save**, then **Done**.
5. Still on the Summary page, look for any **older** conversion actions (for example "Call",
   "WhatsApp", "Form", "Submit lead form") or ones set up *automatically from Google Analytics*.
   For each one: open it → **Edit settings** → set it to **Secondary**. Don't delete them; that
   keeps their history. (If two actions are both Primary for the same lead, Google counts it twice
   and optimises badly.)

> Status will show **"Unverified"** or **"No recent conversions"** until a real ad click turns into
> a contact. That's normal. Step 3 below proves the tag works without waiting.

---

## 2. Retire the six campaigns, create the one campaign — 45 min

### 2a. Pause the old campaigns (don't remove)

1. Google Ads → **Campaigns**.
2. Tick every old campaign (Jain Systems, Heavy Pipes, APMIP Subsidy, Farm Shop, Commercial
   Irrigation, KSB…).
3. **Edit → Pause**.

Pausing keeps their reporting history. Removing deletes it and can't be undone.

### 2b. Create the new campaign

1. **Campaigns → + (New campaign)**.
2. **Objective:** **Leads**.
3. **Conversion goals:** keep only **Contact** (the goal "Contact Us" belongs to). Remove any other
   goal it pre-selects.
4. **Campaign type:** **Search**.
5. **Ways to reach your goal:** tick **Website visits** →
   `https://www.waterbasetechnologies.com/get-quote`. Also tick **Phone calls** →
   India, `9440018418`.
6. **Campaign name:** e.g. `Waterbase — All products — Search`.

**Bidding**
- Start with **Clicks** (Maximise clicks) and set a **maximum cost-per-click bid limit**, so a
  few expensive clicks can't eat the day's budget.
- After the campaign has about **15–30 conversions in 30 days**, switch to **Conversions**
  (Maximise conversions). Smart bidding needs that much data to work; on day one it has none.

**Campaign settings**
- **Networks:** **untick** "Include Google search partners" and **untick** "Include Google
  Display Network". With ₹5,000/month, keep every rupee on Google Search.
- **Locations:** **Enter another location → Advanced search → Radius** → Eluru, **50 km**. Add
  Vijayawada if you also serve there.
  Under **Location options**, choose **"Presence: People in or regularly in your included
  locations"**. The other option shows ads to people anywhere who just *search about* Eluru.
- **Languages:** English **and** Telugu.
- **Ad schedule:** leave at all days/all hours for now. Calls outside business hours are handled
  in the call asset below.

**Keywords** (the ad group). Paste these, one per line. Quotes mean *phrase match*, brackets mean
*exact match*:

```
"drip irrigation"
"drip irrigation dealer"
"jain drip irrigation"
"jain irrigation dealer"
"sprinkler irrigation"
"rain gun irrigation"
"ksb pump dealer"
"ksb submersible pump"
"borewell pump"
"hdpe pipes"
"pvc pipes dealer"
"casing pipes"
"mulching sheet"
"apmip subsidy"
"drip irrigation subsidy"
"irrigation shop eluru"
"drip irrigation eluru"
[waterbase technologies]
```

**Negative keywords.** Add these at campaign level (**Keywords → Negative keywords**). They stop
paying for searches that will never become customers:

```
jobs
job
salary
course
training
pdf
project report
diagram
definition
wikipedia
second hand
used
shrimp
feed
aqua
share price
waterbase limited
waterbase ltd
```

The last six matter: **The Waterbase Ltd** is an unrelated shrimp-feed company in Chennai, and
people searching for it would otherwise click your ad.

### 2c. The ad (Responsive Search Ad)

- **Final URL:** `https://www.waterbasetechnologies.com/get-quote`
- **Display path:** `get-quote` / `irrigation`

**Headlines.** All 15 fit the 30-character limit. Pin #1 to position 1 if you want your name
always first.

```
Waterbase Technologies Eluru
Jain Drip Irrigation Dealer
Authorised Jain & KSB Dealer
KSB Pumps & Motors Dealer
HDPE & PVC Pipes In Stock
APMIP Subsidy Up To 90%
Free Site Survey & Quote
Drip & Sprinkler Systems
Survey, Supply & Install
25+ Years Of Experience
15,400+ Customers Served
Call Now For Best Price
WhatsApp Us For A Quote
Farm & Nursery Irrigation
Campus & Lawn Irrigation
```

**Descriptions** (90-character limit):

```
Authorised Jain Irrigation & KSB dealer in Eluru. Drip, sprinklers, pumps, pipes & more.
Free site survey. We design, supply and install the complete system — one local team.
APMIP subsidy help: eligible farmers pay as little as 10%. We handle the paperwork.
Farms, nurseries, campuses & factories across AP & Telangana. Call or WhatsApp today.
```

Every claim above already appears on the website. Keep it that way. An ad that promises
something the landing page doesn't say gets a lower Quality Score, and so a higher cost per click.

### 2d. Assets (extensions)

**Sitelinks** (Assets → + → Sitelink). These are your six detailed pages:

| Sitelink text | Line 1 | Line 2 | Final URL |
|---|---|---|---|
| Jain Drip Systems | Drip, sprinklers & rain guns | Survey, supply & installation | `https://www.waterbasetechnologies.com/jain-systems` |
| KSB Pumps & Motors | Submersible & openwell pumps | Sized to your borewell | `https://www.waterbasetechnologies.com/ksb-pumps` |
| HDPE & PVC Pipes | ISI-marked, all sizes | Retail and bulk orders | `https://www.waterbasetechnologies.com/heavy-pipes` |
| APMIP Subsidy Help | Pay as little as 10% | We handle the paperwork | `https://www.waterbasetechnologies.com/apmip-subsidy` |
| Farm Shop | Mulching, drip tape, valves | In stock at our Eluru store | `https://www.waterbasetechnologies.com/farm-shop` |
| Commercial Irrigation | Campuses, nurseries, factories | Design to handover | `https://www.waterbasetechnologies.com/commercial-irrigation` |

**Call asset:** `+91 9440018418`. Under **Advanced options**, set its schedule to
**Mon–Sat, 10:00 AM – 7:00 PM**. That way nobody is shown a call button when nobody can answer.
Turn on **call reporting**.

**Location asset:** link your Google Business Profile, which shows the address and map pin.

**Callout assets:** `Free Site Survey` · `Authorised Dealer` · `APMIP Subsidy Help` ·
`Genuine Products & Warranty`.

**Budget:** ₹166/day (≈ ₹5,000/month). Then **Publish**. New ads usually show **"Under review"**
for up to a day.

> Don't click your own ad to check it — every click costs money. Use **Tools → Ad preview and
> diagnosis** instead.

---

## 3. Verify the conversion with Tag Assistant — 10 min

1. Open **https://tagassistant.google.com** in Chrome.
2. **Add domain** → `https://www.waterbasetechnologies.com/get-quote` → **Connect**. A new tab
   opens with the site.
3. In that tab, click **Accept** on the cookie banner.
4. Click **WhatsApp**. Go back to the Tag Assistant tab and select the tag **AW-874230546** in the
   list. Under the latest event you should see **`ads_conversion_Contact_Us_1`**.
5. Repeat with **Call Now** (on a laptop nothing will dial — that's fine; the event still shows).
6. Optional: submit the form with your own name and number. `/thank-you` should show another
   **`ads_conversion_Contact_Us_1`**. Then mark that test lead **Closed** in `/admin`.

If the event shows, the website side is proven. It won't add a conversion to the Ads report,
because those are only counted when someone came *from an ad click*.

---

## 4. Google Search Console — 15 min

This fixes "searching *waterbase technologies* shows Justdial, not our website". The code fix is
live: every page now points Google at the correct `www` address, and all 18 sitemap pages load
directly. Search Console tells Google to come and look *now*, instead of whenever it gets round to
it.

### 4a. Add the property

1. Open **https://search.google.com/search-console**, signed in with the business Google account.
2. **Add property** (top-left dropdown) → choose **URL prefix** →
   `https://www.waterbasetechnologies.com` → **Continue**.

### 4b. Prove you own it — use whichever is easiest

- **Option A — Google Analytics (one click).** If your Google account can *edit* the GA4
  property `G-RP33RYTKFF`, pick **Google Analytics** in the list → **Verify**. Done.
- **Option B — HTML tag.** Pick **HTML tag**. Google shows something like
  `<meta name="google-site-verification" content="AbC123xyz…" />`. Copy **only the part inside
  `content="…"`**. Then:
  1. Vercel → project **waterbase** → **Settings → Environment Variables**.
  2. **Key:** `GOOGLE_SITE_VERIFICATION` · **Value:** the copied code · Environment:
     **Production** → **Save**.
  3. **Deployments** → on the top (latest) deployment click **⋯ → Redeploy**. Wait until it
     says **Ready**, about 2 minutes.
  4. Back in Search Console, click **Verify**.

  The website already supports this variable; nothing else needs changing. Leave the variable in
  place afterwards — Google re-checks it.
- **Option C — Domain property (most complete).** Choose **Domain** instead of URL prefix, enter
  `waterbasetechnologies.com`, and add the TXT record it gives you at your domain registrar (where
  you bought the domain). It covers `www` and the plain domain together, but DNS changes can take
  hours.

### 4c. Submit the sitemap

1. Left menu → **Sitemaps**.
2. Under "Add a new sitemap", type `sitemap.xml` → **Submit**.
3. Status should become **Success**, with about **18 discovered pages**.

### 4d. Ask Google to index the key pages now

1. Paste `https://www.waterbasetechnologies.com/` into the **search bar at the very top** of
   Search Console (URL Inspection) → **Request indexing**.
2. Repeat for `/products`, `/services`, `/contact`, `/jain-systems`, `/apmip-subsidy`.
   There's a daily limit (around 10), so the rest can wait — the sitemap covers them.

### 4e. What to expect

Results usually appear within **a few days to a couple of weeks**. Check **Indexing → Pages**
weekly; "Indexed" should climb towards 18. Don't request indexing for `/get-quote` — it is
deliberately hidden from search (it's the ad page).

**Bonus (5 min):** **https://www.bing.com/webmasters** → **Import from Google Search Console**.
That covers Bing and Yahoo with no extra work.

---

## 5. Google Business Profile — 2 min

1. On Google, search **Waterbase Technologies Eluru** while signed in, or open
   **https://business.google.com**.
2. **Edit profile → Contact → Website** → `https://www.waterbasetechnologies.com` → **Save**.
3. While you're there, check the phone numbers and opening hours (Mon–Sat, 10:00 AM – 7:00 PM;
   Sunday closed) match the website. Google trusts a business more when its details agree
   everywhere.
4. Do the same **website** update on your **Justdial** listing if you can log in to it.

---

## 6. Google Tag Manager cleanup — 10 min

The website now sends Google Analytics and the Ads conversion itself. If Tag Manager *also* sends
them, everything is counted twice.

1. Open **https://tagmanager.google.com** → container **GTM-NSS2B9BN**.
2. Left menu → **Tags**. Open each tag and check its **Tag type** and **ID**:
   - Any tag with **`G-DH17D92KBV`** (the retired second Analytics property) → **delete it**
     (⋮ → Delete).
   - Any **Google tag** or **GA4 Configuration** tag for **`G-RP33RYTKFF`** → delete it. The
     website already loads it, and keeping it in GTM double-counts every page view.
   - Any **Google Ads Conversion Tracking** tag → delete it. The website fires the conversion; a
     GTM copy double-counts every lead.
   - **GA4 Event** tags for `cta_call_now`, `cta_whatsapp_float`, `cta_request_callback` are fine
     to keep — see `docs/gtm-cta-events.md`.
3. Top-right → **Submit** → version name `Remove duplicate GA4 and Ads tags` → **Publish**.

If you're unsure about any tag, **pause** it instead of deleting it (open it → ⋮ → Pause). That's
reversible.

---

## 7. Supabase — leaked-password protection — 2 min

This stops anyone setting an admin password that has already appeared in a public data breach.
That matters because `/admin` shows every customer's name and phone number.

1. Open **https://supabase.com/dashboard** → project **waterbase web**.
2. Left menu → **Authentication**. Then look for **Attack Protection**; in some dashboard
   versions it's under **Sign In / Providers → Email**, in the password settings.
3. Turn on **Prevent use of leaked passwords** → **Save**.
4. While you're there, set the **minimum password length** to at least **12**.

If the switch is greyed out, it needs a paid Supabase plan. In that case, make sure your own
admin password is long and not used anywhere else. Nothing else in the database needs doing: the
migrations are applied and verified.

---

## 8. Vercel checks — 5 min

1. **https://vercel.com** → project **waterbase** → **Settings → Environment Variables**. Check
   **`ADMIN_EMAILS`** exists for **Production** and contains your email. (It does, or `/admin`
   would already be locked — this is just to confirm.)
2. **Settings → Build and Deployment → Node.js Version** should be **22.x**. The project file
   already requests Node 22, so Vercel normally follows it automatically.
3. Optional: connect the Vercel integration in your claude.ai connector settings. That lets me
   check deployments directly next time.

---

## 9. Turn the security policy (CSP) on — 10 min, optional

The site sends a Content-Security-Policy in **report-only** mode: it logs problems but blocks
nothing. I've tested it in a real browser and fixed everything it reported. Turning it on adds
protection against injected scripts.

1. Open `https://www.waterbasetechnologies.com/get-quote` in Chrome → right-click → **Inspect** →
   **Console** tab.
2. Reload, accept cookies, click **Call Now** and **WhatsApp**, and visit `/products` and
   `/contact`.
3. If **nothing** in the Console mentions **"Content Security Policy"**: Vercel → Settings →
   Environment Variables → **Key** `CSP_ENFORCE`, **Value** `true`, Production → Save →
   **Redeploy**.
4. After it's live, repeat the Tag Assistant check (step 3). The conversion must still appear.
5. If anything breaks, delete `CSP_ENFORCE` and redeploy — that fully undoes it.

---

## 10. Testimonials — when you have them

Collect 4–6 short quotes from real customers, **with their permission**. For each: name,
village/town, crop or site, and one or two sentences. Send them over and they go straight into
the testimonials section, which stays hidden until it has real content. Never use invented
reviews: they break Google's rules and Indian consumer-protection rules.

---

## After one week — 5 min check

- **Google Ads → Campaigns:** the new campaign is **Eligible** (not "Under review" or
  "Limited"), and has impressions and clicks.
- **Goals → Conversions:** Contact Us shows **Recording conversions**, or at least "No recent
  conversions" rather than "Unverified".
- **Search terms report** (Campaign → Insights and reports → Search terms): add any irrelevant
  searches you paid for as negative keywords.
- **Search Console → Pages:** indexed count rising.
- **`/admin`:** new leads arriving.
