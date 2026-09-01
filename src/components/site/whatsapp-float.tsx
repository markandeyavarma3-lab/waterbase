"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { trackWhatsAppFloatClick } from "@/lib/analytics";

const WA_MESSAGE =
  "Hello Waterbase Technologies, I want to connect on WhatsApp.\n\nMy requirement is: \n\nPlease contact me.";

/**
 * Fixed bottom-right WhatsApp launcher. Opens wa.me for the primary number
 * and fires GTM Custom Event `cta_whatsapp_float` (plus Ads contact conversion).
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      data-gtm="whatsapp_float"
      onClick={trackWhatsAppFloatClick}
      aria-label="Connect on WhatsApp"
      className="wa-float group fixed z-[70] flex items-center gap-2.5 rounded-2xl border border-white/25 bg-[#1FAF5A] py-3 pl-3.5 pr-4 text-white shadow-[0_10px_28px_rgba(22,56,68,0.22)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#18964C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="wa-float-pulse absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#B8F5D0] ring-2 ring-[#1FAF5A]" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="font-display text-sm font-semibold tracking-tight">Connect on WhatsApp</span>
        <span className="text-[11px] font-medium text-white/80">Usually replies fast</span>
      </span>
    </a>
  );
}
