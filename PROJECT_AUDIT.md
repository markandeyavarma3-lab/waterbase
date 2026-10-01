# Waterbase Technologies — Codebase Audit

> ## ✅ REMEDIATION APPLIED — 2026-09-08
>
> Everything in this report that could be fixed in code has been fixed on branch
> `audit-fixes`. Verification after the work: **ESLint 0 errors / 0 warnings ·
> 85 unit tests passing · `next build` clean · `npm audit` 0 vulnerabilities**.
>
> Findings are annotated inline below: **[FIXED]**, **[PARTLY FIXED]**, or
> **[NEEDS YOU]** where the fix is not a code change (a Google Ads account, a
> camera, real testimonials).
>
> See **§7 Remediation Log** at the end for what changed and what is measured.


**Audited:** 2026-09-08 · branch `audit-fixes` @ `7941890`
**Scope:** every file in `src/`, `public/`, `docs/`, config, CI, and build output.
**Method:** read the source, then verified the claims against a real `next build`, the emitted
static HTML, the compiled bundles, `eslint`, `tsc`, `npm audit`, and git history. Where this
report says something is broken, it was reproduced, not inferred.

---

## 1. Project Overview

### What it is

A marketing + lead-generation site for an irrigation company in Eluru, Andhra Pradesh. It has
two jobs:

1. **Rank and convert** — organic pages (home, products, services, crops, projects, about,
   contact) plus six paid-ad landing pages behind a ₹5,000/month Google Ads budget.
2. **Capture and manage leads** — a two-step callback form that writes to Supabase, emails the
   owner via Resend, and surfaces in a password-protected `/admin` dashboard with a status
   pipeline and CSV export.

### Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6, App Router, Turbopack, React 19.2.4 |
| Language | TypeScript 5, `strict: true` |
| Styling | Tailwind CSS v4 (CSS-first `@theme`), shadcn/radix-vega, ~1,010-line `globals.css` |
| Motion | framer-motion 12 (20 of 86 components) |
| Data | Supabase (Postgres + Auth), `@supabase/ssr` |
| Email | Resend |
| Validation | Zod 4 + react-hook-form |
| Analytics | GA4 ×2, Google Ads, Vercel Analytics |
| Hosting | Vercel (push to `main` → deploy) |
| CI | One GitHub Action: a daily Supabase keep-alive ping |

### Architecture

```
                          ┌──────────────────────────────────────┐
  Visitor ───────────────▶│  Vercel Edge                         │
                          │  src/proxy.ts  (Next 16 "middleware")│
                          │  matcher: /admin/:path*              │
                          │  no session → redirect /admin/login   │
                          └──────────────┬───────────────────────┘
                                         │
              ┌──────────────────────────┴──────────────────────────┐
              │                                                      │
    ┌─────────▼──────────┐                              ┌───────────▼────────────┐
    │  PUBLIC (static)   │                              │  ADMIN (force-dynamic) │
    │  22 prerendered    │                              │  /admin, /admin/login  │
    │  routes            │                              └───────────┬────────────┘
    │                    │                                          │
    │  layout.tsx        │                              checkAdmin()  ← lib/admin-auth
    │   ├ LocalBizJsonLd │                                 1. supabase.auth.getUser()
    │   ├ ConversionTrckr│  (doc-level click listener      2. ADMIN_EMAILS allowlist
    │   ├ RouteProgress  │   → WhatsApp conversions)          (fails CLOSED)
    │   └ SiteChrome     │                                          │
    │      ├ Header      │                              ┌───────────▼────────────┐
    │      ├ {children}  │                              │ createAdminClient()    │
    │      ├ Footer      │                              │ SERVICE ROLE — bypasses│
    │      └ StickyCTA   │                              │ RLS entirely           │
    └─────────┬──────────┘                              └───────────┬────────────┘
              │                                                     │
      ┌───────▼────────┐                                            │
      │  <LeadForm/>   │                                            │
      │  zod validate  │                                            │
      └───────┬────────┘                                            │
              │ server action: submitLead()                         │
              │   ├ honeypot ("company" field) → fake success       │
              │   ├ leadSchema.safeParse                            │
              │   ├ isRateLimited: ≤3 per mobile / 10 min           │
              │   ├ INSERT leads ────────────────────────┐          │
              │   └ sendLeadNotification (Resend)        │          │
              │                                          ▼          ▼
              │                                   ┌──────────────────────────┐
              ▼                                   │  Supabase `public.leads` │
   router.push(/thank-you?ref=lead&s=<token>)     │  RLS on, zero policies   │
              │                                   │  (no migrations in repo) │
              └─▶ trackFormSubmit() once per token└──────────────────────────┘
                  (sessionStorage dedupe)
```

**Build-time content pipeline.** Three separate server-side functions read `/public` at build
time and turn folders into content: `lib/logos.ts::listLogos` (brands, clients, crops),
`sections/awards-list.tsx::getAwards`, `sections/product-categories.tsx::getProductImages`.
Dropping a JPG in a folder publishes it. Clever — but see §5.7 for the duplication and §5.1 for
what happens when the folders are empty.

### Entry points

| Entry | File |
|---|---|
| Root layout, fonts, all analytics tags | `src/app/layout.tsx` |
| Edge middleware (admin gate) | `src/proxy.ts` |
| Public form → DB | `src/lib/actions/leads.ts::submitLead` |
| Admin mutations | `src/lib/actions/leads.ts::updateLeadStatus/updateLeadNotes` |
| Auth | `src/app/admin/login/actions.ts`, `src/lib/actions/auth.ts` |
| Single source of business data | `src/lib/site-config.ts` |
| Design tokens | `src/app/globals.css` |

---

## 2. File-by-File Breakdown

### `src/lib/` — the core

| File | Purpose | Verdict |
|---|---|---|
| `site-config.ts` | All business data: phones, address, hours, stats, Ads ID, WhatsApp/tel helpers. | Genuinely the right idea. Undermined by hardcoded duplicates elsewhere (§5.5). |
| `leads.ts` | Requirement options, Zod schema, status pipeline, `Lead` row type. | Good shape. One real type hole (§5.3). |
| `admin-auth.ts` | `checkAdmin()` — session + `ADMIN_EMAILS` allowlist, fails closed. | **Best file in the repo.** Correct threat model, documented, returns a typed reason instead of a bare boolean. |
| `analytics.ts` | Google Ads conversions, LABEL-or-EVENT via env vars. | Well-designed. The comment explaining why the table is longhand (Next inlines `NEXT_PUBLIC_*` by literal text substitution, so `process.env[key]` silently yields `undefined`) is the kind of note that saves the next person an afternoon. |
| `notify.ts` | Resend lead email, HTML-escaped, with Call/WhatsApp buttons. | Solid. Escapes correctly. Fails soft. |
| `seo.ts` | `localBusinessJsonLd()` + `pageMeta()` factory. | Clean. Every page uses it. |
| `logos.ts` | Reads `/public/<dir>` → `{src, name}` at build time. Has a path-traversal guard. | Good. Duplicated twice elsewhere without the guard. |
| `motion.ts` | Shared easings/durations/stagger. | Right instinct — one rhythm instead of twelve. `EASE_OUT_SOFT` is unused. |
| `nav.ts` | `NAV_LINKS` (header) + `SOLUTION_LINKS`. | `SOLUTION_LINKS` is never rendered as navigation — only used to *detect* landing pages. See §5.2. |
| `supabase/{client,server,admin}.ts` | Browser / SSR-cookie / service-role clients. | Correct separation. `server-only` guard on the admin client is exactly right. Dual key-name support (`ANON`/`PUBLISHABLE`, `SERVICE_ROLE`/`SECRET`) is defensive and well-commented. |
| `actions/leads.ts` | `submitLead`, `updateLeadStatus`, `updateLeadNotes`. | Every mutation re-authorizes. UUID-validates. Whitelists status values. Correct. |

### `src/app/` — routes

- `layout.tsx` — fonts (3 families, `display: swap`), metadata, viewport with `viewportFit: cover`, and four analytics systems. Deliberately leaves pinch-zoom enabled — good a11y call, explicitly commented.
- `page.tsx` — homepage: a clean ordered composition of 11 section components. Reads well.
- The six landing pages (`jain-systems`, `heavy-pipes`, `apmip-subsidy`, `farm-shop`, `commercial-irrigation`, `ksb-pumps`) — each ~59 lines of pure data + one `<LandingPageTemplate>` call. **This is the best structural decision in the project.** Adding a seventh campaign is a 60-line file.
- `admin/page.tsx` — status tallies come from separate `count`/`head: true` queries rather than filtering the fetched page. The comment explains why (filtering only saw the first 500 rows, so the pipeline numbers silently stopped adding up). That's a real bug someone found and fixed properly.
- `sitemap.ts` — per-route `updated` dates, undated routes fall back to build date. Honest.
- `not-found.tsx`, `opengraph-image.tsx`, `robots.ts` — all present and correct.

### `src/components/`

- `sections/landing-page-template.tsx` — the template all six ad pages share. Hero + form, stats, products grid, why grid, CTA, sticky call bar.
- `sections/lead-form.tsx` — two-step form, honeypot, per-field shake on error, submission token for conversion dedupe. The most carefully-built component here.
- `admin/leads-table.tsx` — search, status filter, pagination, inline notes with blur-save, CSV export. **The CSV escaping neutralises formula injection** (`=`/`+`/`-`/`@` prefixes) — that is a genuinely non-obvious attack on a self-service export, and it's handled with a comment explaining why.
- `site/header.tsx` — 231 lines of scroll-driven motion: continuous spring-interpolated height/padding/opacity rather than a threshold flip. Impressive; also §5.9.
- `site/media-slot.tsx` — image with ordered fallbacks → `PlaceholderPlate` (an animated blueprint plate, not an apologetic empty state). Nice.
- `ui/*` — shadcn primitives, lightly customised. `button.tsx` has been rewritten into a framer-motion component with magnetic cursor pull.

### `docs/`

`google-ads-conversions.md` is an unusually good piece of operational writing — it tells the
reader which of two snippet shapes Google might show, warns that leaving the screen costs extra
clicks, and lists the actual troubleshooting order. `hidden-state.md` is the right idea and
contains one factual error (§5.6).

---

## 3. Strengths

These are real, and several are above the level I'd expect from a small business site.

1. **The security model on `/admin` is correct and correctly reasoned.** The dashboard reads with
   the service-role key, which bypasses RLS — so the code does not treat "signed in" as
   "authorized". `ADMIN_EMAILS` fails *closed*, with the reasoning written down: being locked out
   is recoverable, a leaked customer list is not. Defence in depth: `proxy.ts` bounces
   unauthenticated users, `checkAdmin()` gates the page, and *every* server action re-checks.
   Server actions are treated as the public endpoints they are.

2. **Server actions are properly hardened.** UUID regex on IDs, status values whitelisted against
   `LEAD_STATUSES`, notes truncated to 2,000 chars, admin re-checked per call. No trust in the
   client.

3. **CSV formula injection is handled.** Untrusted names from a public form get a leading
   apostrophe if they start with `= + - @ \t \r`. Most teams ship this hole.

4. **Rate limiting is stateless and honest about it.** The comment records that this *replaced* a
   module-level counter which couldn't work on serverless (per-instance state, recycled
   constantly) and which throttled globally rather than per-visitor. It now counts prior rows and
   **fails open**, with the reasoning stated: losing a real enquiry is worse than a duplicate.

5. **Conversion dedupe is designed, not bolted on.** A per-submission token in the URL plus
   `sessionStorage` means a reload or a shared `/thank-you` link doesn't re-fire the Ads form
   conversion — but a *second genuine* submission gets a new token and does count. A plain
   "already fired" flag would have swallowed it. The `try/catch` around storage falls through to
   counting rather than losing a real conversion.

6. **`prefers-reduced-motion` is handled thoroughly, not decoratively.** A single CSS block kills
   every ambient animation (`.motion-aurora`, `.motion-caustic`, `.motion-marquee`, all the
   `tint-wash-*` drifts), the logo loop has its own guard, and every framer-motion component calls
   `useReducedMotion()` and passes `initial={false}` so nothing gets stranded mid-animation.

7. **Comments explain *why*, not *what*.** `isolate` on sections (decorative `-z-10` layers were
   painting behind the section fill and were invisible sitewide). `minmax(0,1fr)` instead of `1fr`
   (a bare `1fr` has `min-width:auto`, so the form pushed the grid past the viewport). The mobile
   CTA spacer placed *after* the footer. `useSpring(source)` staying subscribed to its source, so
   `.set()` on the spring's output is silently overridden within a frame. These read like a log of
   real debugging.

8. **The landing-page template.** Six paid pages, one component, ~59 lines of data each.

9. **Build-time folder-as-CMS.** Drop a JPG in `public/brands/row-1/`, commit, it's live. The
   right amount of CMS for this business.

10. **Clean build.** `next build` passes, `tsc` passes under `strict`, ESLint reports **0 errors**
    (8 warnings). No secrets in git history — checked across all refs.

---

## 4. Weaknesses & Risks — ranked

### 🔴 Critical

---

#### 4.1 [FIXED] Every headline statistic renders as `0+` in the HTML

`CountUp` is a client component that starts at `0` and animates only after an IntersectionObserver
fires. The server-rendered HTML therefore contains:

```html
<span>0<!-- -->+</span></p><p …>Customers served
```

Verified in `.next/server/app/index.html`. `15,400` and `52,800` appear **nowhere** in the shipped
HTML of the homepage, `/about`, or any of the six landing pages.

Consequences: your primary trust signals are invisible to any crawler that doesn't execute JS,
absent for the ~1–2 seconds before hydration on a slow phone, and permanently absent with JS
disabled. Someone lands on `/jain-systems` from a paid click and, for the first moment, reads
"0+ Customers served, 0+ Acres irrigated". That is worse than showing nothing.

**Fix:** render the final value server-side and let `CountUp` animate *from* it, or take the value
as the initial state:

```tsx
export function CountUp({ end, suffix = "", duration = 1800 }) {
  const [value, setValue] = useState(end);   // was: useState(0)
  const [armed, setArmed] = useState(false);
  useEffect(() => { setValue(0); setArmed(true); }, []);  // only after hydration
  // …observer starts the animation once armed
}
```
The HTML ships `15,400+`; JS-capable browsers still get the count-up. ~10 lines.

---

#### 4.2 [PARTLY FIXED] The paid landing pages ship 368 KB of gzipped JavaScript

Measured from the actual build, summing every `<script src>` in the prerendered HTML:

| Route | Scripts | Raw JS | **Gzipped** | HTML |
|---|---|---|---|---|
| `/jain-systems` (paid) | 18 | 1,259 KB | **368 KB** | 92 KB |
| `/` | 15 | 928 KB | **287 KB** | 326 KB |
| `/products` | 16 | 902 KB | **279 KB** | 204 KB |

For context: a good marketing-site budget is 100–150 KB gzipped. The pages you *pay for* are the
heaviest. Your audience is farmers in West Godavari on mid-range Android over 4G. Every second of
LCP costs conversions you are literally paying ₹166/day for.

Contributors, in order:
- **`framer-motion` in 20 of 86 components**, including `ui/button.tsx` — so *every button on the
  site* is a motion component with two springs and pointer handlers.
- **35 of 86 components are `"use client"`**, several of which don't need to be.
- **Three separate `gtag.js` downloads per page** (§4.5).
- The homepage's 326 KB HTML includes ~100 KB of RSC flight payload and 740 `_next/image`
  references (the brands marquee duplicates every logo, ×2 rows, each with a full srcset).

**Fix, in order of payoff:**
1. Drop the magnetic pull from `ui/button.tsx` and make `Button` a plain server-compatible
   component again. Keep `MotionPress` for the two or three places that genuinely want a ripple.
   This alone removes framer-motion from the critical path of every page.
2. Consolidate the three `gtag.js` loads into one (§4.5).
3. Reduce the brands marquee to a CSS-only duplicate (render logos once, duplicate with a
   pseudo-element or a single cloned list) rather than doubling `<Image>` nodes with srcsets.
4. Lazy-load `Testimonials`, `CoverflowCarousel`, `BeforeAfter` with `next/dynamic`.

---

#### 4.3 [FIXED] Five of six ad landing pages have zero internal inbound links

Verified by grepping every `href` in `src/`:

| Page | Linked from |
|---|---|
| `/apmip-subsidy` | `/services`, homepage APMIP section ✅ |
| `/jain-systems` | **nothing** |
| `/ksb-pumps` | **nothing** |
| `/heavy-pipes` | **nothing** |
| `/farm-shop` | **nothing** |
| `/commercial-irrigation` | **nothing** |

`SOLUTION_LINKS` in `lib/nav.ts` looks like a navigation menu, but its only consumer is
`site-chrome.tsx`, which uses it to *detect* landing pages so it can suppress the generic sticky
CTA. It is never rendered as links. The `Footer` contains only Privacy and Terms — no site
navigation at all.

These pages are orphans: reachable only from the sitemap and paid ads. They accumulate no internal
PageRank, and organic traffic can never find them. You built six pages and are paying to send
traffic to all of them; five of them are invisible to Google's crawl graph.

**Fix:** render `SOLUTION_LINKS` in the footer as a "Solutions" column, and add them to the mobile
sheet menu. It's the same array that already exists. ~20 lines.

---

#### 4.4 [FIXED] No consent mechanism for analytics or advertising cookies

Grep for `consent`/`gdpr`/`dpdp` across `src/` returns nothing but an unrelated word in the Terms
page. GA4 ×2 and the Google Ads tag load unconditionally on first paint and set cookies before any
interaction.

- India's **DPDP Act 2023** requires notice and consent before processing personal data.
- The site is served globally; an EU visitor triggers GDPR/ePrivacy.
- Your own Privacy Policy's remedy is "you can disable cookies in your browser settings" — which is
  not consent.

Risk is commercial, not technical: enforcement is unlikely for a regional business, but a
lightweight consent gate is cheap insurance and Google Consent Mode v2 is now the expected default
for Ads accounts.

**Fix:** add Google Consent Mode v2 defaults (`ad_storage: denied`, `analytics_storage: denied`) in
the inline script *before* the tags load, plus a small banner that calls `gtag('consent','update',…)`.
~60 lines. Note that this will reduce measured conversions until users accept.

---

### 🟠 High

---

#### 4.5 [FIXED] Three redundant `gtag.js` downloads on every page

Confirmed in the built HTML:

```
2× googletagmanager.com/gtag/js?id=AW-874230546
1× googletagmanager.com/gtag/js?id=G-DH17D92KBV
1× googletagmanager.com/gtag/js?id=G-RP33RYTKFF
```

`layout.tsx` mounts `<GoogleAnalytics>` twice (each injecting its own `gtag.js`) and then loads a
third copy manually for Google Ads. One `gtag.js` serves all three IDs:

```tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAdsId}`} strategy="afterInteractive" />
<Script id="gtag-init" strategy="afterInteractive">{`
  window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
  gtag('js',new Date());
  gtag('config','G-RP33RYTKFF');
  gtag('config','G-DH17D92KBV');
  gtag('config','${siteConfig.googleAdsId}');
`}</Script>
```

Drops `@next/third-parties` from the dependency list and removes two script downloads and two
duplicate gtag runtimes from every page load.

Separately: two GA4 properties on one site is documented as intentional, but it's worth confirming
this is still wanted — it doubles the tag weight to produce two datasets that will never agree.

---

#### 4.6 [FIXED] `submitLead` has no per-IP throttle and no CAPTCHA

Defences today: a honeypot field, and ≤3 submissions per *mobile number* per 10 minutes.

A script that increments the mobile number defeats both — the honeypot is a static field name, and
the throttle keys on a value the attacker controls. Every accepted submission writes a row **and
sends a Resend email**. Consequences: a poisoned lead table, a flooded inbox, and Resend quota
burn on your account.

Also worth noting: `isRateLimited` runs `SELECT count(*) FROM leads WHERE mobile=$1 AND created_at>=$2`
on **every** submission. There is no migration file in the repo, so I can't confirm an index exists.
Without one on `(mobile, created_at)` this is a sequential scan that grows with the table.

**Fix (in order):**
1. Add an index: `CREATE INDEX leads_mobile_created_idx ON public.leads (mobile, created_at DESC);`
2. Add IP-based throttling. `@upstash/ratelimit` on the action, or Vercel's WAF rate-limit rules —
   both are ~15 lines and free at this volume.
3. If abuse actually appears, add Cloudflare Turnstile (invisible, no user friction).

---

#### 4.7 [FIXED] Phantom dependencies — the build depends on packages that aren't declared

`src/components/ui/form.tsx` imports:

```ts
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
```

Neither is in `package.json`. Confirmed against `package-lock.json`: the only Radix entry in root
dependencies is `radix-ui`; `@radix-ui/react-label@2.1.11` and `@radix-ui/react-slot@1.3.0` exist
in `node_modules` **only because npm hoists them as transitive dependencies**.

This works today and breaks silently the moment `radix-ui` restructures its dependency tree, or
anyone runs `pnpm install` (strict `node_modules`), or a fresh install resolves a different
hoisting layout.

It's also inconsistent: `ui/label.tsx`, `ui/select.tsx`, `ui/sheet.tsx` and `ui/button.tsx` all use
the unified `radix-ui` package. Only `form.tsx` reaches for the standalone ones — which risks
shipping two copies of the same Radix primitive.

**Fix:** one line each.
```ts
import { Label as LabelPrimitive, Slot } from "radix-ui";
```

---

#### 4.8 [FIXED] 13 npm vulnerabilities, 10 rated high

```
sharp   <0.35.0   HIGH   libvips CVEs (CVE-2026-33327/33328/35590/35591)
undici  7.0.0–7.28.0  HIGH  response desync, cache poisoning, CRLF injection, cookie injection
```

Both arrive transitively through `next@16.2.6`. Fixed by `next@16.3.4`. `npm audit fix --force`
flags it as "outside the stated dependency range" — it's a patch bump within Next 16 and should be
routine, but test the build.

`lucide-react` is 19 minors behind (1.24.0 → 1.43.0); `framer-motion` has a major available.

---

#### 4.9 [NEEDS YOU] A large fraction of the site renders as "Image pending"

Verified on disk:

| Location | Expected | Actual |
|---|---|---|
| `public/products/*/` (14 folders) | Product photos | **All 14 contain only `.gitkeep`** |
| `public/awards/` | Award certificates | **Directory does not exist** |
| `public/images/work/` | 3 homepage photos | Only `README.txt` |
| `public/images/projects/` | 6 project photos + before/after | Only `README.txt` |

So today: `/products` — a top-level nav page — is **14 placeholder cards**. `/projects` is 6
placeholders plus a before/after slider with no before and no after. The homepage "what we do"
band is 3 placeholders. `/about` shows "Our Achievements" above an empty plate.

`sections/testimonials.tsx` has 102 lines of marquee, drag physics, and partial-star rendering
for an array that is `[]`, so the component returns `null` — the "Trusted by farmers & businesses"
section renders on zero pages.

The code isn't wrong; the empty-state handling is good. But the *site* is largely unfinished, and
a code audit that didn't say so plainly would be useless to you. This is the single highest-value
thing you could do this week, and it needs a camera, not a keyboard.

---

### 🟡 Medium

---

#### 4.10 [FIXED] `CropsGrid`'s off-screen pause silently doesn't work

`src/components/sections/crops-grid.tsx:46-62`

```ts
useEffect(() => {
  if (!isVisible || prefersReducedMotion()) return;
  const id = setInterval(() => { … }, INTERVAL);
  return () => clearInterval(id);
}, [crops]);          // ← isVisible is read but not a dependency
```

The effect only re-runs when `crops` changes — which it never does. It captures `isVisible` from
the first render (`true`) and the interval runs every 850 ms forever, regardless of whether the
grid is on screen. The IntersectionObserver above it does real work whose result is ignored.

Confirmed by ESLint (`react-hooks/exhaustive-deps`). `CropsHoneycomb` in the *same file* gets it
right (`}, [isVisible, crops]`) — so this is a copy-paste divergence, not a considered choice.

**Fix:** add `isVisible` to the dependency array.

---

#### 4.11 [FIXED] The Zod schema silently widens `requirement` to `string`

`src/lib/leads.ts:15`

```ts
const REQUIREMENT_VALUES = REQUIREMENT_OPTIONS.map(o => o.value) as [string, ...string[]];
export const leadSchema = z.object({ requirement: z.enum(REQUIREMENT_VALUES), … });
```

The `as [string, ...string[]]` cast destroys the literal union, so `z.enum` is instantiated with
`string` and `LeadInput["requirement"]` is `string` — not `"product_supply" | "survey_design" | …`.

Verified: a probe file assigning `"totally_not_a_valid_requirement"` to that type **compiles
cleanly** under `strict`. Runtime validation still works; compile-time safety is gone. This is why
`lead-form.tsx:64` can pass `requirement: ""` as a default value without a type error.

Meanwhile `Lead.requirement` (the DB row type) *is* correctly typed as `RequirementValue`, so the
two halves of the same field disagree.

**Fix:**
```ts
const REQUIREMENT_VALUES = REQUIREMENT_OPTIONS.map(o => o.value) as unknown as
  [RequirementValue, ...RequirementValue[]];
```
Then handle the empty-default explicitly in the form (`z.union([leadSchema.shape.requirement, z.literal("")])`
for the form's own type, or initialise to `undefined`).

---

#### 4.12 [FIXED] `docs/hidden-state.md` states something that is false

> ### 1. `src/proxy.ts` is not wired
> File exists but middleware.ts doesn't import it. […] **Status:** Not a bug

This is wrong, and it's the kind of wrong that causes someone to delete working security code.

Next.js 16 **renamed `middleware.ts` to `proxy.ts`**. Verified in
`node_modules/next/dist/lib/constants.js`:

```js
const PROXY_FILENAME = 'proxy';
const PROXY_LOCATION_REGEXP = `(?:src/)?${PROXY_FILENAME}`;
```

and in the entrypoint template, which resolves `mod.proxy` for a file at `/src/proxy` — matching
your named `export async function proxy`. A fresh `next build` prints:

```
ƒ Proxy (Middleware)
```

`src/proxy.ts` **is live** and is actively redirecting unauthenticated `/admin/*` traffic. Correct
the doc. (`.next/server/middleware-manifest.json` shows `{}` under Turbopack, which is presumably
what caused the confusion — it's not where Turbopack records this.)

---

#### 4.13 [FIXED] The site contradicts itself about how old the business is

`site-config.ts` computes `experienceYears = currentYear - 2000` → **"26+"** in 2026. But:

- `heroBadge`: `"Serving farmers for 25+ years"` (hardcoded)
- `opengraph-image.tsx`: `"… Netafim · 25+ years"` (hardcoded)
- `about/page.tsx`: `"Complete irrigation partners for over 25 years"` (hardcoded)
- `awards-list.tsx`: `"…earned over 25 years in the field"` (hardcoded)
- `services/page.tsx:70`: title `` `${siteConfig.experienceYears} years of experience` `` with the
  description `"Serving farmers and businesses for over 25 years"`

So `/services` currently renders, in one card: **"26+ years of experience — Serving farmers and
businesses for over 25 years."**

Same pattern with the stats. `site-config.ts` is the declared source of truth
(README: *"Never hardcode these elsewhere"*), yet:

| `site-config.ts` | Hardcoded in landing pages |
|---|---|
| `15400+ Customers served` | `"15,000+ farmers served"` (×3 pages) |
| `128+ Corporate projects` | `"100+ corporate and industrial projects"`, `"100+ Projects Delivered"` |

**Fix:** derive the badge and all copy from `siteConfig`, or set `since` such that the computed
value matches what you want to claim, and interpolate everywhere.

---

#### 4.14 [FIXED] `/thank-you` renders as an empty shell server-side

Zero `<h1>` in the prerendered HTML (every other page has exactly one). `ThankYou` calls
`useSearchParams()`, forcing the whole subtree client-side inside `<Suspense fallback={null}>`.
The page is `noindex`, so SEO is unaffected — but a visitor who just converted sees a blank white
page until JS loads. That's the worst possible moment for a blank page.

**Fix:** give the Suspense boundary a real static fallback (the confirmation heading and WhatsApp
button don't depend on search params), or split the tracking effect into a small client component
and render the rest on the server.

---

### 🟢 Low — dead code, inconsistency, hygiene

| # | Finding | Location |
|---|---|---|
| 4.15 | **4 components never imported anywhere.** `ui/card.tsx` (27 lines), `sections/services.tsx`, `sections/solutions.tsx`, `sections/animated-word.tsx`. `AnimatedWord` cycles a `WORDS` array of length 1 — it fades a word out and back to itself every 2.8 s. | `src/components/` |
| 4.16 | **4 unused `@keyframes`:** `float-y`, `marquee-right`, `pill-pop`, `scroll-cue`. `marquee-right` is referenced only by `Testimonials`, which renders nothing. | `globals.css` |
| 4.17 | **`why-choose-us.tsx` is a one-line re-export alias** of `why-waterbase.tsx`. Two names for one component; `/about` imports the alias. Pointless indirection. | `sections/` |
| 4.18 | **`src/project-tree.txt`** — 114 lines of Windows `tree` output, with mojibake box-drawing characters (`�`), committed inside `src/`. Stale build artifact. | `src/` |
| 4.19 | **Three near-identical directory readers.** `listLogos` (has a path-traversal guard), `getAwards`, `getProductImages` (neither does). Different extension whitelists — `logos.ts` accepts `.svg`/`.avif`, the others accept `.gif`. | `lib/logos.ts`, `awards-list.tsx`, `product-categories.tsx` |
| 4.20 | **`supply.tsx` and `product-categories.tsx` duplicate the same 14 product categories** with identical titles, descriptions and icons, in two hand-maintained arrays. They will drift. | `sections/` |
| 4.21 | **New client logos violate the project's own stated conventions.** `Godrej Agrovet.png`, `Reliance Industries.png` — README says *"One image format across the site: JPG. Avoid spaces in filenames (they break image URLs)."* Both are PNG with spaces. Also still untracked in git. | `public/clients/` |
| 4.22 | **8 ESLint warnings:** 4 unused lucide imports in `services/page.tsx`, 2 unused `catch (error)` bindings, 1 unused `Section` import, 1 exhaustive-deps (that's §4.10). | various |
| 4.23 | **`EASE_OUT_SOFT`** exported from `motion.ts`, never used. `contentType` exported from `opengraph-image.tsx` (Next reads it by convention — fine, ignore). | `lib/motion.ts` |
| 4.24 | **Dead dark-mode theme.** `globals.css` carries the full shadcn `.dark` block (oklch neutrals) that has nothing to do with the custom water/soil palette, with no toggle and only 6 `dark:` utilities in the codebase. If ever enabled it would render broken. | `globals.css` |
| 4.25 | **`useFormField` checks `if (!fieldContext)` after already dereferencing `fieldContext.name`.** Inherited shadcn bug; the guard can never fire. | `ui/form.tsx:27-38` |
| 4.26 | **`shadcn` (a CLI) sits in `dependencies`.** It *is* needed at build time by `@import "shadcn/tailwind.css"`, so it can't simply move — but a 4.x CLI package in production dependencies is worth a second look. | `package.json` |
| 4.27 | **No migrations, no tests, no CI beyond a keep-alive ping.** The Supabase schema exists only in the live project. `docs/hidden-state.md` says it plainly: *"if the table is dropped, the schema is gone."* No test files exist. The single GitHub Action pings the DB; nothing runs `build` or `lint` on a PR. | repo-wide |
| 4.28 | **`/thank-you?ref=lead&s=anything` fires an Ads conversion.** Anyone can inflate your form conversions by visiting a URL. Low impact (you're not running an affiliate program) but it means the number isn't trustworthy if it's ever disputed. | `sections/thank-you.tsx` |
| 4.29 | **Ambient motion cost.** Every `<Section>` mounts an `AuroraGlow` with 2 permanently-animating `blur-3xl` layers. `/services` has 5 sections → 10 large blurred compositor layers, plus `backdrop-blur-xl` on the header and `mix-blend-mode: soft-light` on the hero caustics. Reduced-motion is respected, but the *default* path is expensive on the mid-range Android your ads target. | `site/section.tsx`, `aurora-glow.tsx` |
| 4.30 | **Crop images bypass Next's image optimizer.** `crop-card.tsx` and `crops-grid.tsx` both set `unoptimized`, so 47 source JPEGs are served as-is — directly contradicting `next.config.ts`'s `formats: ["image/avif","image/webp"]`. Worse, each card/bubble renders **every** image in its set stacked with `opacity` toggles rather than swapping `src`, so the homepage honeycomb requests ~40 full images to display 14. | `sections/` |

---

## 5. Refactoring Roadmap

Ordered by (business impact ÷ effort). Each block is independently shippable.

### Sprint 1 — half a day, unblocks revenue

| # | Task | Effort | Why now |
|---|---|---|---|
| 1 | **Fill in the Google Ads conversion values.** `docs/google-ads-conversions.md` is ready; the code is done. Phone calls are ~65% of your intended conversion mix and are currently **not counted at all** — Google Ads has been optimising your ₹5,000/month against roughly a third of your real results. | 25 min | Highest ROI action in this document. |
| 2 | **Fix `CountUp` to render its real value server-side.** (§4.1) | 10 min | Your trust signals currently say `0+`. |
| 3 | **Link the five orphan landing pages from the footer + mobile menu.** (§4.3) | 20 min | You already have the array. |
| 4 | **Add `isVisible` to the `CropsGrid` dependency array.** (§4.10) | 1 min | One-word fix for a confirmed bug. |
| 5 | **Fix the two phantom Radix imports.** (§4.7) | 2 min | Removes a silent build-breaker. |
| 6 | **Correct the `proxy.ts` claim in `docs/hidden-state.md`.** (§4.12) | 5 min | Prevents someone deleting live auth code. |

### Sprint 2 — two days, performance and integrity

| # | Task | Effort |
|---|---|---|
| 7 | **Consolidate the three `gtag.js` loads into one.** Drop `@next/third-parties`. (§4.5) | 30 min |
| 8 | **De-motion `ui/button.tsx`.** Remove the magnetic pull; make `Button` a plain component. Keep `MotionPress` where a ripple is actually wanted. Re-measure the bundle. (§4.2) | 2 h |
| 9 | **Add `next/dynamic` to `Testimonials`, `CoverflowCarousel`, `BeforeAfter`.** | 45 min |
| 10 | **Drop `unoptimized` from crop images; swap `src` instead of stacking all images.** (§4.30) | 1 h |
| 11 | **Upgrade to `next@16.3.4`** to clear the sharp/undici CVEs; bump `lucide-react`. Verify the build. (§4.8) | 1 h |
| 12 | **Add the `(mobile, created_at)` index and check it into a `supabase/migrations/` folder** — along with the full `leads` DDL, so the schema stops living only in production. (§4.6, §4.27) | 1 h |
| 13 | **Single-source the stats and the "years" claim.** Derive every occurrence from `siteConfig`. (§4.13) | 45 min |

### Sprint 3 — one week, content and correctness

| # | Task |
|---|---|
| 14 | **Photograph and upload the missing content.** 14 product folders, `public/images/work/`, `public/images/projects/` (including a genuine before/after pair), `public/awards/`. This is the largest visible improvement available and needs no code. (§4.9) |
| 15 | **Collect 4–6 real customer testimonials** (with written permission) and populate `testimonials.tsx`. |
| 16 | **Add IP rate-limiting to `submitLead`** — Upstash or Vercel WAF. (§4.6) |
| 17 | **Fix the Zod enum widening.** (§4.11) |
| 18 | **Give `/thank-you` a real static Suspense fallback.** (§4.14) |
| 19 | **Delete the dead code:** `ui/card.tsx`, `sections/services.tsx`, `sections/solutions.tsx`, `sections/animated-word.tsx`, `src/project-tree.txt`, the 4 unused keyframes, `EASE_OUT_SOFT`, the `.dark` block. Clear all 8 ESLint warnings. Inline `why-choose-us.tsx`. |
| 20 | **Consolidate the three directory readers** into `lib/logos.ts::listLogos` and delete the two duplicates. Merge the duplicated product-category arrays. (§4.19, §4.20) |
| 21 | **Rename the two new client logos** to lowercase-hyphenated JPG per your own convention, and commit them. (§4.21) |

### Sprint 4 — engineering maturity

| # | Task |
|---|---|
| 22 | **Add CI.** A GitHub Action running `npm ci && npm run lint && npm run build` on every PR. You have a working `.github/workflows/` directory already. |
| 23 | **Add tests** — even a thin layer. `leadSchema` (mobile normalisation: `+91`-stripping, the `[6-9]` prefix rule), `csvCell` (formula injection), `allowedEmails` (fails closed on empty/whitespace), `to24h`. Vitest, ~2 hours, and it makes the repo interview-credible. |
| 24 | **Add Consent Mode v2 + a consent banner.** (§4.4) |
| 25 | **Reconsider the double GA4.** Two properties doubles tag weight to produce two datasets that will never reconcile. |
| 26 | **Add a Content-Security-Policy.** `next.config.ts` explains honestly why it was deferred; with the tags consolidated to one `gtag.js` origin (§7), the allowlist becomes small enough to be worth writing. |

---

## 6. Final Verdict

### Honest assessment

**This is good code attached to an unfinished website, and the gap between those two things is the
whole story.**

The engineering is genuinely above the bar for a small-business marketing site. The `/admin`
authorization model is correct and — more unusually — correctly *reasoned about*, with the threat
written down and a deliberate fail-closed choice. CSV formula injection is handled. Server actions
are treated as public endpoints and re-authorize on every call. The rate limiter's comment records
why the previous implementation couldn't work on serverless. The conversion dedupe distinguishes a
reload from a second genuine submission. `prefers-reduced-motion` is handled everywhere, not
sprinkled. And the comments explain *why* — `isolate` on sections, `minmax(0,1fr)` over `1fr`,
`useSpring` staying subscribed to its source. That's a real debugging log, not decoration.

Then you look at what actually renders. `/products` is fourteen placeholder cards. `/projects` is
six placeholders and a before/after slider with neither. The testimonials section returns `null` on
every page. Every headline statistic ships as `0+`. Five of your six paid landing pages are
unreachable from anywhere on your own site. The Google Ads conversion for phone calls — 65% of your
intended mix — has never fired.

Meanwhile the last ~30 commits are: header wash gradients, nav pill colours, wordmark droplet
animations, magnetic button pull, aurora glows. That's the honest criticism you asked for: **the
craft went into the parts nobody is blocked on, while the parts that determine whether the ₹5,000/month
converts sat untouched.** The four audit commits before this one started correcting that — they're
the best commits in the log.

Nothing here is architecturally broken. There is no rewrite. The bones are good enough that every
problem in this report is a bounded, well-scoped fix.

### Scorecard

| Dimension | Score | Reasoning |
|---|---|---|
| **Architecture** | 8/10 | Clean App Router layering, disciplined server/client split, `site-config` as a single source, the landing-page template. Loses points for phantom deps and duplicated directory readers. |
| **Security** | 8/10 | Above expectation. Correct RLS/service-role reasoning, allowlist fails closed, actions re-authorize, CSV injection handled, no secrets in history. Loses points for no IP throttle and no consent. |
| **Performance** | 4/10 | 368 KB gzipped on the pages you pay for, three `gtag.js` loads, framer-motion on every button, unoptimized crop images, 10 animated blur layers per page. The weakest dimension, and it's the one that costs money. |
| **SEO** | 5/10 | Solid metadata, JSON-LD, honest sitemap, per-page canonicals. Then: stats render as `0+`, five orphan landing pages, and most content is placeholders. Good plumbing, little water. |
| **Maintainability** | 7/10 | Excellent comments, consistent patterns, strict TS. Loses points for 4 dead components, 2 duplicated data arrays, 3 duplicated readers, no tests, no migrations. |
| **Content completeness** | 3/10 | Two full nav pages are placeholders. |
| **Production readiness** | 6/10 | It is live and it works. It is not *finished*, and it is not measuring the conversions it was built to measure. |

**Overall: 6/10 — a well-built machine that is running with several gauges disconnected.**

### For interviews / portfolio

The bones of a strong story are already here. Lead with the `/admin` authorization model — the
service-role/RLS reasoning and the deliberate fail-closed choice is a *senior* answer to
"tell me about a security decision you made". The conversion-dedupe token and the serverless
rate-limiter post-mortem are both good "why doesn't the obvious solution work?" stories.

Three things stand between this and portfolio-ready:

1. **Tests.** Their total absence is the first thing a reviewer will notice, and it's a 2-hour fix
   for the four pure functions that matter (`leadSchema`, `csvCell`, `allowedEmails`, `to24h`).
2. **Content.** A reviewer clicking "Products" and seeing fourteen grey placeholders forms an
   opinion before reading a line of code.
3. **The performance numbers.** 368 KB gzipped on a landing page is the finding an interviewer
   will press on. Fixing it — and being able to say "I measured 368 KB, removed framer-motion from
   the button primitive, got it to X" — turns your weakest dimension into your best story.

### The single highest-value action

Not a refactor. **Spend 25 minutes creating the phone-call conversion action in Google Ads and
pasting the value into Vercel.** The code has been finished and waiting for months; until it's
done, you are paying for clicks and optimising against a third of your results.

Then take a camera to a job site.

---

*Every defect in this report was reproduced against `next build`, the emitted static HTML, the
compiled bundles, `tsc`, `eslint`, `npm audit`, or the filesystem. Claims I could not verify —
the Supabase schema and its indexes, live Google Ads state, Vercel environment variables — are
marked as unverifiable rather than asserted.*

---

## 7. Remediation Log — 2026-09-08

Applied on branch `audit-fixes`. Verified after every change.

### Verification

| Gate | Before | After |
|---|---|---|
| `npm audit` | 13 vulnerabilities (10 high) | **0 vulnerabilities** |
| ESLint | 8 warnings | **0 errors, 0 warnings** |
| Tests | none existed | **85 passing** (4 files) |
| `next build` | clean | clean, on Next 16.3.4 |
| CI | keep-alive ping only | lint + test + build on every PR |

### Measured outcomes

| Metric | Before | After |
|---|---|---|
| `/jain-systems` first-load JS (gzip) | 367.5 KB | **307.3 KB** (−16%) |
| `/` first-load JS (gzip) | 286.7 KB | 279.3 KB (−3%) |
| `/products` first-load JS (gzip) | 279.3 KB | 269.0 KB (−4%) |
| `gtag.js` loads per page | 3 | **1** |
| Stats in server HTML | `0+` | **`15,400+`, `52,800+`** |
| Landing pages with internal inbound links | 1 of 6 | **6 of 6** |
| Images requested by homepage crop cluster | ~40 | **14** |
| `CountUp` re-renders per second (5 stats) | ~300 | **0** |
| Contradictory "25 / 26 years" claims | 5 hardcoded vs 1 computed | **all derived from `since`** |

### What changed

**Correctness**
- `count-up.tsx` — renders the real figure server-side and animates via a DOM ref. Fixes `0+` in HTML *and* removes ~60 re-renders/sec per stat.
- `crops-grid.tsx` — added the missing `isVisible` dependency; the off-screen pause now actually pauses. Added an empty-image-set guard.
- `thank-you` — `useSearchParams` extracted into `FormConversionTracker`, so the confirmation page prerenders instead of being an empty shell.
- `leads.ts` — enum no longer widened to `string`; new `LeadFormValues` type models the legitimately-empty select honestly.
- `form.tsx` — `useFormField`'s guard moved *before* the dereference it was supposed to protect.

**Security**
- Consent Mode v2 + a non-blocking consent banner. Defaults `denied`, set inline before `gtag.js`. `url_passthrough` keeps Ads attribution working when declined.
- Per-IP throttle on `submitLead` (12/hour), keyed on a salted SHA-256 of the IP — never stored in the clear. Fails open, including when the table is unmigrated.
- CSP added in **Report-Only** mode with a `CSP_ENFORCE` switch. Report-only on purpose: the original decision to defer a CSP was correct, and this preserves it while making the origin allowlist real and reviewable.
- `next@16.3.4` + `npm audit fix` → 0 vulnerabilities (clears the `sharp`/libvips and `undici` CVEs).
- Two phantom Radix imports replaced with the declared `radix-ui` package.

**Performance**
- `zod` → `zod/mini` in the shared schema: **−62.8 KB gzipped** off every page carrying the form. Behaviour pinned by 30 tests before the swap.
- `ui/button.tsx` de-motioned back to a server component — framer-motion no longer rides along with every button on the site. Press feedback is now CSS.
- Crop cards/bubbles mount one image instead of the whole set, and no longer pass `unoptimized` (they were bypassing the AVIF/WebP config in `next.config.ts`).
- Three `gtag.js` loads collapsed to one; `@next/third-parties` removed.
- `CoverflowCarousel` and `BeforeAfter` moved behind `next/dynamic`.

**Maintainability**
- Deleted: `ui/card.tsx`, `sections/services.tsx`, `sections/solutions.tsx`, `sections/animated-word.tsx`, `why-choose-us.tsx` (alias), `src/project-tree.txt`, 3 unused keyframes, `EASE_OUT_SOFT`, the dead `.dark` block.
- Three duplicate directory readers → one `listLogos`/`listImages` in `lib/logos.ts` (the only one that had a traversal guard).
- The 14 product categories, duplicated by hand in two files, → `lib/products.ts`.
- `csvCell` extracted to `lib/csv.ts` so the formula-injection defence is testable.
- `isEmailAllowed` extracted from `admin-auth.ts` for the same reason.
- Stats and the business age now derive from `site-config.ts` everywhere.
- `supabase/migrations/` — the `leads` schema now exists in the repo, with the missing `(mobile, created_at)` index the throttle query needs. Idempotent; safe against production.
- `SOLUTION_LINKS` rendered as real navigation in a rebuilt footer and the mobile menu.
- `docs/hidden-state.md` — the false "proxy.ts is not wired" claim replaced with the evidence that it *is*.
- **`.gitattributes` added and the tree normalised to LF.** Found during remediation, not in the original audit: 33 of 117 text files were CRLF and the rest LF — a split left by the project moving between Windows and macOS. It turns one-line edits into whole-file diffs and hides real changes in the noise. Normalising it is why some diffs in this branch look larger than the change they carry.

### Second pass — verified against production and a running browser

After the code work, the site was **built, served and rendered** (Chrome headless, 1280px), and
the live Supabase project was inspected read-only. That surfaced four things the static audit
could not.

#### NEW 🟠 Supabase: leaked-password protection is DISABLED

`get_advisors(security)` reports `auth_leaked_password_protection` as **WARN**. Supabase Auth can
check new/changed passwords against HaveIBeenPwned; it is currently off. The accounts it protects
are the ones that open `/admin`, which renders every customer's name and mobile number. A reused,
already-breached password on an allowlisted address defeats the whole allowlist.

**Fix (2 minutes, dashboard):** Supabase → Authentication → Policies → enable *Leaked password
protection*. Consider raising the minimum password length while you are there.

> The other advisor finding, `rls_enabled_no_policy` on `public.leads`, is **INFO and intentional** —
> deny-all is the design. No action.

#### NEW — the reconstructed migration was verified against the live database

`supabase/migrations/20260908000000_leads_baseline.sql` was written by inferring the schema from the
code. Checked against production, it matches **exactly**: same 10 columns, types, nullability and
defaults; RLS on with 0 policies; `leads_status_check` present and identical.

Confirmed differences, all of which the migration corrects:

| | Production today | Migration |
|---|---|---|
| `leads_mobile_created_idx` | **missing** | added — this is the index the form's throttle query needs on *every* submission |
| `leads_requirement_check` | **missing** (only `status` has one) | added; all 9 existing rows use valid values, so it applies cleanly |
| `lead_throttle` table | absent | created |

The table holds 9 rows, so the missing index costs nothing *today* — it is correctness for later,
not an emergency. Note that `docs/hidden-state.md` claimed a CHECK constraint on `requirement`
existed; it did not.

#### NEW — the CSP would have broken Vercel Analytics

Enumerating every external origin in the built output against the policy caught
`va.vercel-scripts.com` (the Vercel Analytics loader) missing from `script-src`. It is now allowed.
This is precisely the silent-breakage failure mode the original decision to defer a CSP was
guarding against — found by checking rather than by shipping.

> That check cannot see origins `gtag.js` fetches at *runtime*. The Google Ads pixel hosts come from
> Google's documented set, not from observation, which is why the policy stays Report-Only until
> someone watches a preview deploy in a real browser.

#### NEW — a copy bug the rendered page caught, and static review would not have

Interpolating `experienceText` ("26+ years") into prose that already said "for over …" produced
**"Complete irrigation partners for over 26+ years"** on `/about`. `site-config.ts` now exports both
forms — `experienceText` for standalone claims, `yearsInBusiness` (a number) for prose — and the
three "over …" call sites use the latter. Worth stating plainly: this was introduced by the
remediation and only found by looking at the page.

**Also fixed this pass:** `Reveal` and `Stagger` converted from framer-motion to CSS + one
IntersectionObserver (they are imported by ~25 components, so this removes dozens of motion
instances per page even though the library still loads for other components); `hero.jpg`
recompressed 326 KB → 157 KB (it was ~1.8 bytes/pixel at 480×370 — grossly under-compressed);
`irrigation-product-range.jpg` 674 KB → 550 KB.

> Separately, `hero.jpg` is only 480×370 but is displayed in a ~360px-wide `ratio="tall"` slot, so it
> is being cropped *and* upscaled. It needs re-shooting at a larger size, not re-compressing.

### Still open — these need you, not code

1. **Create the Google Ads phone-call conversion** and paste the value into Vercel (`docs/google-ads-conversions.md`, ~25 min). Still the single highest-value action available. Phone calls remain uncounted.
2. **Photograph the missing content** — 14 product folders, `public/images/work/`, `public/images/projects/`, `public/awards/`. `/products` is still 14 placeholder cards.
3. **Collect real testimonials.** The component is ready and renders nothing until its array is filled.
4. **Apply the migrations** (`supabase db push`). Until `lead_throttle` exists, the IP limiter fails open by design.
5. **Verify and enforce the CSP** — preview deploy, Tag Assistant, then `CSP_ENFORCE=true`.
6. **Decide on the double GA4.** Still two properties producing two datasets that will never reconcile.
7. **Node 22** — `@supabase/supabase-js` now warns below it. `package.json` pins `engines.node >=22`; confirm Vercel's project setting matches.
8. **Enable Supabase leaked-password protection** (2 min, dashboard) — see the second-pass section above.

### Not done, deliberately

**The Header was left on framer-motion.** It is the largest remaining contributor to first-load JS, because it renders in the root layout and uses scroll-linked springs (`useScroll`/`useSpring`/`useTransform`/`useMotionTemplate`) that have no cheap CSS equivalent with reliable support on the low-end Android this site targets. Rewriting it would take the landing pages meaningfully below 300 KB, but it would also rebuild the site's signature piece of design. That is your call, not a defect to be silently "fixed" — so the bundle work stopped at the point where it stopped being reversible.

---

## 8. October 2026 update

Shipped on top of `main` after it had moved 52 commits (another agent's work: GTM, new public
numbers, all photos, nav redesign, product compass, WhatsApp float).

- **Search visibility — root cause fixed.** Vercel serves `www`; the apex redirects to it; the code
  declared the apex canonical. Every canonical, sitemap URL, robots line and JSON-LD URL pointed at
  a redirect, and `site:waterbasetechnologies.com` returned nothing. `siteConfig.url` is now `www`,
  pinned by a test.
- **One ad, one landing page** — `/get-quote` (noindex). The six product pages are SEO pages now.
- **Supabase** — both migrations applied and verified; `prune_lead_throttle` locked to service_role
  (as first written it was callable anonymously over `/rest/v1/rpc`); repo/remote history in sync.
- **Header, route progress, MotionPress and the lead form off framer-motion** — `/get-quote` and
  the six product pages ship none: 367.5 KB → 256.3 KB gzip (−30%). Homepage, products, contact and
  about still load it through other components (product compass, falling cards, InteractiveCard).
- **Consent defaults now precede GTM** — GTM had been initialising before consent existed.
- **Second GA4 property removed.**
- **CSP** — a real-browser run caught `pagead2.googlesyndication.com` missing; added.

Still the owner's: leaked-password protection in Supabase Auth; Google Ads campaign restructure
and the phone-call conversion; Search Console sitemap submission; GTM cleanup of `G-DH17D92KBV`;
`CSP_ENFORCE=true` after a live console check.
