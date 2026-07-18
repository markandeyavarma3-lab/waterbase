import type { Metadata } from "next";
import { Inter, Archivo, Poppins } from "next/font/google";
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

// 👇 The wordmark / logo font. Swap "Poppins" for another Google font to change the look.
const logoFont = Poppins({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
  weight: ["600", "700", "800"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${archivo.variable} ${logoFont.variable}`}>
      <body className="antialiased">
        <LocalBusinessJsonLd />
        <ConversionTracker />
        <RouteProgress />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <GoogleAnalytics gaId="G-RP33RYTKFF" />
        <GoogleAnalytics gaId="G-DH17D92KBV" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-874230546"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-874230546');
          `}
        </Script>
      </body>
    </html>
  );
}