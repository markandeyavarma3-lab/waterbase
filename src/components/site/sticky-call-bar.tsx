"use client";

import { Phone, MessageCircle } from "lucide-react";
import { telLink, whatsappLink, siteConfig } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";

/** Mobile-only sticky bar for ad landing pages — overrides the default sticky CTA. */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 bg-brand-green-deep text-white shadow-[0_-2px_16px_rgba(8,43,26,0.25)] md:hidden">
      <a href={telLink(siteConfig.phones.sales.primary)} onClick={trackCallClick} className="flex items-center justify-center gap-2 border-r border-white/20 py-4 text-sm font-bold active:bg-white/10">
        <Phone className="h-5 w-5" /> Call Now
      </a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-4 text-sm font-bold active:bg-white/10">
        <MessageCircle className="h-5 w-5" /> WhatsApp
      </a>
    </div>
  );
}
