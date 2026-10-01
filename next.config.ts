import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * This was previously left out on purpose, and the reasoning was sound: the site
 * loaded Google Analytics twice, the Google Ads tag and Vercel Analytics, each
 * injecting scripts at runtime, and a CSP tight enough to be worth having would
 * have broken conversion tracking *silently* — failing in exactly the way that
 * is hardest to notice.
 *
 * Two things changed. All the Google tags now come through a single gtag.js
 * load (see components/site/analytics-tags.tsx), so the origin list below is
 * short and knowable. And this ships in **Report-Only** mode by default, so a
 * missed origin shows up as a console report instead of a dead conversion.
 *
 * Every external origin referenced by the built output has been checked against
 * this list. That check CANNOT see origins gtag.js fetches at runtime (the Ads
 * conversion pixel hosts below are included from Google's documented set, not
 * from observation) — which is exactly why this stays Report-Only until someone
 * has watched it in a real browser.
 *
 * To turn it on: set CSP_ENFORCE=true in Vercel, having first loaded every page
 * of a preview deploy — especially a landing page with Tag Assistant recording,
 * clicking Call Now and WhatsApp — and confirmed the console reports nothing.
 *
 * `'unsafe-inline'` is present for both scripts and styles and is not an
 * oversight: the Google consent-mode bootstrap must run inline before gtag.js,
 * and framer-motion writes inline style attributes on every animated element.
 * Removing it needs per-request nonces, which needs middleware on every route,
 * which would make 22 currently-static pages dynamic. Not worth it here — the
 * value this delivers is the ORIGIN allowlist (and frame-ancestors), not inline
 * script blocking.
 */
const csp = [
  "default-src 'self'",
  // gtag.js, GA4 collect, and the Google Ads conversion pixel path.
  // va.vercel-scripts.com is Vercel Analytics' loader. Caught by enumerating
  // every external origin in the built output against this list — it would have
  // been silently blocked the moment CSP_ENFORCE was set.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  // next/font self-hosts Google Fonts at build time, so no external font origin.
  "font-src 'self' data:",
  // pagead2.googlesyndication.com: Google Ads' consent-mode measurement ping
  // (/ccm/collect). Observed live in a real browser with the tags running —
  // the static origin scan could not see it, because gtag.js chooses it at runtime.
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.google.co.in https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
  // Supabase (auth + leads), GA4 measurement, Vercel Speed Insights.
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://pagead2.googlesyndication.com https://www.google.com",
  // The Ads tag drops a conversion-linker iframe.
  "frame-src https://td.doubleclick.net https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Ignored by browsers in Report-Only mode (and logged as an error there), so
  // only emitted once the policy is enforcing.
  ...(process.env.CSP_ENFORCE === "true" ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  // /admin renders customer names and mobile numbers — never let it be framed.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the full URL to our own origin, only the bare origin to third parties,
  // and nothing at all when downgrading to http.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing on this site uses these, so decline them up front.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  {
    key: process.env.CSP_ENFORCE === "true"
      ? "Content-Security-Policy"
      : "Content-Security-Policy-Report-Only",
    value: csp,
  },
];

const nextConfig: NextConfig = {
  // Lets you open the dev site on your phone over Wi-Fi.
  // Add your laptop's actual LAN IP here too if it differs.
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    // Serve AVIF/WebP automatically — source images stay JPG, Next.js
    // transcodes on request so mobile ad traffic gets a lighter LCP image.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
