import type { Metadata, Viewport } from "next";
import { Inter, Archivo, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { SiteChrome } from "@/components/site/site-chrome";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
import { ConversionTracker } from "@/components/site/conversion-tracker";
import { RouteProgress } from "@/components/site/route-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// Wordmark face. Geometric — wider, rounder and more open than the Archivo used
// for headings, which gives the logo its own identity without drifting into the
// generic. Deliberately NOT Poppins: that was the original logo font and it read
// as blobby at heavy weights. Only two weights are pulled, so the extra download
// is small.
const logoFont = Outfit({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  keywords: [
    "Drip Irrigation Dealer Andhra Pradesh",
    "Jain Irrigation Dealer Andhra Pradesh",
    "KSB Pump Dealer Andhra Pradesh",
    "Drip Irrigation Eluru",
    "HDPE Pipes Andhra Pradesh",
    "APMIP Assistance",
    "Netafim FlexNet Dealer",
    "Agricultural Irrigation Solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

// `viewportFit: "cover"` is what makes env(safe-area-inset-*) resolve to real
// values on notched/rounded phones — without it the `pb-safe` padding on the
// sticky mobile CTA is always 0 and the bar sits under the home indicator.
// `maximumScale`/`userScalable` are deliberately left at the defaults so
// visitors can still pinch-zoom (an accessibility requirement).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2E4020" },
    { media: "(prefers-color-scheme: dark)", color: "#2E4020" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${archivo.variable} ${logoFont.variable}`}>
      <head>
        {/* Google Tag Manager — as high in <head> as possible */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${siteConfig.gtmId}');`,
          }}
        />
      </head>
      <body className="living-mesh antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <LocalBusinessJsonLd />
        <ConversionTracker />
        <RouteProgress />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <GoogleAnalytics gaId="G-RP33RYTKFF" />
        <GoogleAnalytics gaId="G-DH17D92KBV" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAdsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.googleAdsId}');
          `}
        </Script>
      </body>
    </html>
  );
}