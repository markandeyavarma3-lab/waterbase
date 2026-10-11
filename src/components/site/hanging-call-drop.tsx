"use client";

import { Phone } from "lucide-react";
import { callNowTelLink, formatPhone, siteConfig } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";

/**
 * Desktop call button: a water drop sitting just beside the navbar, swinging
 * gently from a short line. It lives inside the header row, so it never
 * covers page content. Phones use the bottom Call/WhatsApp bar instead.
 */
export function HangingCallDrop() {
  return (
    <div className="call-drop relative hidden shrink-0 flex-col items-center self-start lg:flex">
      <span className="h-3 w-px bg-gradient-to-b from-brand-blue/0 to-brand-blue/60" aria-hidden="true" />
      <a
        href={callNowTelLink()}
        onClick={trackCallClick}
        data-gtm="call_now_header"
        aria-label={`Call now ${formatPhone(siteConfig.callNowNumber)}`}
        className="group relative -mt-px flex h-[3.25rem] w-[3.25rem] items-center justify-center"
      >
        <span className="call-drop-ring absolute inset-1 rounded-full bg-brand-blue-light/60" aria-hidden="true" />
        {/* Drop: a rounded square turned -45° with its one sharp corner pointing up. */}
        <span
          className="call-drop-body absolute inset-1 -rotate-45 rounded-[50%_0_50%_50%] border border-white shadow-[0_12px_26px_-8px_rgba(42,124,172,0.55)] transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
        <Phone className="relative mt-1 h-5 w-5 text-brand-blue-dark" aria-hidden="true" />
        <span className="call-drop-label pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-water-deep px-3.5 py-1.5 text-sm font-semibold text-white shadow-lift">
          Call {formatPhone(siteConfig.callNowNumber)}
        </span>
      </a>
    </div>
  );
}
