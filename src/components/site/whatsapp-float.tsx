"use client";

import { whatsappLink } from "@/lib/site-config";
import { trackWhatsAppFloatClick } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

const WA_MESSAGE =
  "Hello Waterbase Technologies, I want to connect on WhatsApp.\n\nMy requirement is: \n\nPlease contact me.";

/**
 * Floating WhatsApp button — green disc with the official white logo
 * centered inside (not a nested logo-on-logo).
 */
export function WhatsAppFloat() {
  return (
    <div className="wa-float fixed z-[70]">
      <a
        href={whatsappLink(WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        data-gtm="whatsapp_float"
        onClick={trackWhatsAppFloatClick}
        aria-label="Connect on WhatsApp"
        className="wa-float-btn group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.38)] transition-[filter,background-color] duration-300 hover:bg-[#1EBE5D] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 sm:h-16 sm:w-16"
      >
        <span className="wa-float-ring pointer-events-none absolute inset-0 rounded-full" aria-hidden="true" />
        <WhatsAppIcon className="relative h-8 w-8 sm:h-9 sm:w-9" />
      </a>
    </div>
  );
}
