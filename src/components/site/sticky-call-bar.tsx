"use client";

import { Phone, MessageCircle } from "lucide-react";
import { telLink, whatsappLink, siteConfig } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";

/** Mobile-only sticky bar for ad landing pages — overrides the default sticky CTA. */
export function StickyCallBar() {
  return (
    <div className="sink-panel living-mesh-c fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 px-safe pb-safe md:hidden">
      <a href={telLink(siteConfig.phones.sales.primary)} onClick={trackCallClick} className="flex min-h-14 items-center justify-center gap-2 border-r border-water-deep/10 px-2 py-3 text-sm font-bold text-water-deep active:bg-white/40">
        <Phone className="h-5 w-5 shrink-0" /> Call Now
      </a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center gap-2 px-2 py-3 text-sm font-bold text-water-deep active:bg-white/40">
        <MessageCircle className="h-5 w-5 shrink-0" /> WhatsApp
      </a>
    </div>
  );
}
