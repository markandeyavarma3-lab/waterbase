import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Every Google tag on the site, in ONE gtag.js load.
 *
 * This replaced two `<GoogleAnalytics>` components from @next/third-parties
 * plus a hand-rolled Google Ads tag. Each of those injected its own
 * `googletagmanager.com/gtag/js?id=…`, so every page downloaded and executed
 * THREE copies of the same library to configure three IDs. One script serves
 * all of them — `gtag('config', …)` is per-property, the loader is not.
 *
 * Consent Mode v2 is declared BEFORE the loader, which is the only ordering
 * that works: gtag queues hits against whatever consent state exists at the
 * moment it initialises. Defaults are `denied`, so nothing is written to the
 * visitor's device until they accept. `ConsentBanner` calls
 * `gtag('consent','update',…)` and Google replays the queued hits.
 *
 * `url_passthrough` and `ads_data_redaction` keep Google Ads click attribution
 * working in the denied state (gclid travels in the URL rather than a cookie),
 * so a declined banner costs measurement fidelity, not attribution entirely.
 */
export function AnalyticsTags() {
  const ids = [
    "G-RP33RYTKFF", // GA4 — original property
    "G-DH17D92KBV", // GA4 — second property (intentional; see README)
    siteConfig.googleAdsId,
  ];

  return (
    <>
      {/* A raw inline <script>, not next/script. The consent defaults MUST run
          before gtag.js, and a plain inline script is guaranteed to execute in
          document order — whereas next/script's `beforeInteractive` is only
          valid in a Pages-router _document and warns here. Same technique the
          JSON-LD components already use. */}
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
