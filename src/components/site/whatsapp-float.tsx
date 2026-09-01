"use client";

import { whatsappLink } from "@/lib/site-config";
import { trackWhatsAppFloatClick } from "@/lib/analytics";

const WA_MESSAGE =
  "Hello Waterbase Technologies, I want to connect on WhatsApp.\n\nMy requirement is: \n\nPlease contact me.";

/** Floating WhatsApp button — official brand SVG (green disc + white glyph). */
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
        className="wa-float-btn group relative block h-16 w-16 overflow-hidden rounded-full shadow-[0_10px_28px_rgba(37,211,102,0.38)] transition-[filter,transform] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        <span className="wa-float-ring pointer-events-none absolute inset-0 rounded-full" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element -- brand asset must render exactly */}
        <img
          src="/whatsapp.svg"
          alt=""
          width={64}
          height={64}
          className="relative h-16 w-16"
          draggable={false}
        />
      </a>
    </div>
  );
}
