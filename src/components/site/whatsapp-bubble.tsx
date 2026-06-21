"use client";

import { whatsappLink } from "@/lib/site-config";
import { trackContactClick } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

export function WhatsAppBubble() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackContactClick}
      aria-label="Click to connect on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 hidden flex-col items-center gap-1.5 md:flex"
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" aria-hidden="true" />
        <WhatsAppIcon className="relative h-8 w-8" />
      </span>
      <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand-green-dark shadow-soft ring-1 ring-black/5">
        Click to connect on WhatsApp
      </span>
    </a>
  );
}
