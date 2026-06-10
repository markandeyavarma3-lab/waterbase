import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { SiteChrome } from "@/components/site/site-chrome";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
import { ConversionTracker } from "@/components/site/conversion-tracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
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
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="antialiased">
        <LocalBusinessJsonLd />
        <ConversionTracker />
        <SiteChrome>{children}</SiteChrome>
      </body>
      <GoogleAnalytics gaId="G-RP33RYTKFF" />
      <GoogleAnalytics gaId="AW-874230546" />
    </html>
  );
}