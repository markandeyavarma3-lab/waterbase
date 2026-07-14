"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { StickyMobileCTA } from "@/components/site/sticky-mobile-cta";
import { WhatsAppBubble } from "@/components/site/whatsapp-bubble";
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
      <div aria-hidden className="h-16 pb-safe md:hidden" />
      <Footer />
      {isLandingPage ? null : <StickyMobileCTA />}
      <WhatsAppBubble />
    </>
  );
}
