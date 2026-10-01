"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackCallClick, trackContactClick } from "@/lib/analytics";

const WHATSAPP_HOSTS = /(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i;

/**
 * Site-wide safety net for contact conversions: any WhatsApp or phone (`tel:`)
 * link that does not track itself is tracked here, so a number added anywhere
 * later — footer, contact page, a new section — counts without anyone having to
 * remember an onClick.
 *
 * Links that DO track themselves carry a `data-gtm` marker and are skipped,
 * otherwise one click would be counted twice:
 *   - data-gtm="whatsapp_float"  → trackWhatsAppFloatClick (float, sticky bar)
 *   - data-gtm="call_now…"       → trackCallClick (hero, header, CTAs, sticky bar)
 *
 * Never on /admin. The leads dashboard has WhatsApp and call links to
 * CUSTOMERS; the owner following up on a lead is not a new lead, and used to be
 * counted as one.
 */
export function ConversionTracker() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdmin) return;

    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;

      const marker = link.getAttribute("data-gtm") ?? "";
      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        if (!marker.startsWith("call_now")) trackCallClick();
        return;
      }
      if (WHATSAPP_HOSTS.test(href) && marker !== "whatsapp_float") {
        trackContactClick();
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isAdmin]);

  return null;
}
