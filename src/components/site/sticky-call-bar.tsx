"use client";

import { Phone } from "lucide-react";
import { whatsappLink, callNowTelLink } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

/** Mobile-only sticky bar for ad landing pages — overrides the default sticky CTA. */
export function StickyCallBar() {
  return (
    <div className="sink-panel living-mesh-c fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 px-safe pb-safe md:hidden">
      <a href={callNowTelLink()} onClick={trackCallClick} data-gtm="call_now" className="flex min-h-14 items-center justify-center gap-2 border-r border-water-deep/10 px-2 py-3 text-sm font-bold text-water-deep active:bg-white/40">
        <Phone className="h-5 w-5 shrink-0" /> Call Now
      </a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center gap-2 px-2 py-3 text-sm font-bold text-water-deep active:bg-white/40">
        <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp
      </a>
    </div>
  );
}
