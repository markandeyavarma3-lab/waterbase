"use client";

import { Phone } from "lucide-react";
import { callNowTelLink, formatPhone, siteConfig } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";

/**
 * Desktop call button: a water drop hanging on a thin line from the top of the
 * window, gently swinging, aligned with the right edge of the header bar.
 * Phones use the bottom Call/WhatsApp bar instead.
 */
export function HangingCallDrop() {
  return (
    <div
      className="call-drop fixed top-0 z-[55] hidden flex-col items-center lg:flex"
      style={{ right: "max(1.75rem, calc((100vw - 72rem) / 2 + 1.75rem))" }}
    >
      <span className="h-[5.25rem] w-px bg-gradient-to-b from-brand-blue/0 via-brand-blue/50 to-brand-green/70" aria-hidden="true" />
      <a
        href={callNowTelLink()}
        onClick={trackCallClick}
        data-gtm="call_now_header"
        aria-label={`Call now ${formatPhone(siteConfig.callNowNumber)}`}
        className="group relative -mt-px flex h-14 w-14 items-center justify-center"
      >
        <span className="call-drop-ring absolute inset-1 rounded-full bg-brand-green/40" aria-hidden="true" />
        {/* Drop shape: a rounded square turned 45° with one sharp corner pointing up to the line. */}
        <span
          className="absolute inset-1 -rotate-45 rounded-[50%_0_50%_50%] bg-gradient-to-br from-brand-blue to-brand-green shadow-[0_12px_24px_-8px_rgba(46,148,102,0.6)] transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
        <Phone className="relative h-5 w-5 text-white" aria-hidden="true" />
        <span className="call-drop-label pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-water-deep px-3.5 py-1.5 text-sm font-semibold text-white shadow-lift">
          Call {formatPhone(siteConfig.callNowNumber)}
        </span>
      </a>
    </div>
  );
}
