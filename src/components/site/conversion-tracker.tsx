"use client";

import { useEffect } from "react";
import { trackContactClick } from "@/lib/analytics";

const WHATSAPP_HOSTS = /(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i;

export function ConversionTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;
      // Floating WA widget fires its own conversion + GTM event — skip double count.
      if (link.getAttribute("data-gtm") === "whatsapp_float") return;
      const href = link.getAttribute("href") ?? "";
      if (WHATSAPP_HOSTS.test(href)) {
        trackContactClick();
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}