"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { SOLUTION_LINKS } from "@/lib/nav";

// Ad landing pages render their own StickyCallBar (Call Now + WhatsApp) —
// the generic StickyMobileCTA would otherwise stack on top of it on mobile.
const LANDING_PAGE_HREFS = new Set(SOLUTION_LINKS.map((l) => l.href));

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }
  const isLandingPage = pathname ? LANDING_PAGE_HREFS.has(pathname) : false;
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-green focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lift"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      {/* Spacer that reserves room for the fixed mobile CTA bar. It has to sit
          AFTER the footer — placed before it, the bar still overlapped the
          footer's legal links at the bottom of every page on a phone. */}
      <div aria-hidden className="h-mobile-cta md:hidden" />
      {isLandingPage ? null : <StickyMobileCTA />}
      <WhatsAppFloat />
    </>
  );
}
