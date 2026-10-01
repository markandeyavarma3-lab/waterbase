import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Google Consent Mode v2 defaults.
 *
 * MUST be the first thing in <head> — ahead of the GTM snippet and ahead of
 * gtag.js. Both read the consent state that exists at the moment they
 * initialise; anything they boot before this line runs is treated as
 * consented. When main gained an inline GTM snippet in <head> while these
 * defaults sat at the end of <body>, GTM was initialising first and every tag
 * it fired ignored consent entirely.
 *
 * Defaults are `denied`, so nothing is written to the visitor's device until
 * they accept. A returning visitor who already accepted is upgraded here,
 * synchronously, so their first page view is measured too. `url_passthrough`
 * keeps Google Ads click attribution working while denied (the gclid travels
 * in the URL instead of a cookie).
 *
 * A raw inline <script>, not next/script: it has to execute in document order,
 * during HTML parse, and nothing else guarantees that.
 */
export function ConsentDefaults() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
try {
  if (localStorage.getItem('wb:consent') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
`,
      }}
    />
  );
}

/**
 * GA4 + Google Ads, in ONE gtag.js load.
 *
 * This replaced two `<GoogleAnalytics>` components plus a hand-rolled Ads tag,
 * each of which injected its own copy of gtag.js — three downloads of the same
 * library to configure three IDs. `gtag('config', …)` is per property; the
 * loader is not.
 *
 * One GA4 property. The second (`G-DH17D92KBV`) was dropped at the owner's
 * request: two properties on one site never reconcile and doubled the tag
 * cost. If a GA4 config tag for it also exists inside GTM (GTM-NSS2B9BN), it
 * must be removed there too — this file cannot reach it.
 *
 * GTM itself loads separately, from the <head> in app/layout.tsx; the CTA
 * events it receives are pushed by lib/analytics.ts. See docs/gtm-cta-events.md
 * for why Ads conversions are fired here and NOT also as GTM tags.
 */
export function AnalyticsTags() {
  const ids = [
    "G-RP33RYTKFF", // GA4
    siteConfig.googleAdsId, // Google Ads conversions
  ];

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          ${ids.map((id) => `gtag('config', '${id}');`).join("\n          ")}
        `}
      </Script>
    </>
  );
}
