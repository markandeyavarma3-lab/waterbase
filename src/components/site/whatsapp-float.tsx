"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { formatPhone, siteConfig, whatsappLink } from "@/lib/site-config";
import { trackWhatsAppFloatClick } from "@/lib/analytics";

const WA_MESSAGE =
  "Hello Waterbase Technologies, I want to connect on WhatsApp.\n\nMy requirement is: \n\nPlease contact me.";

/**
 * Fixed bottom-right WhatsApp popup card. Opens wa.me for the primary number
 * and fires GTM Custom Event `cta_whatsapp_float`.
 */
export function WhatsAppFloat() {
  return (
    <div className="wa-float fixed z-[70] max-w-[min(100vw-2rem,22rem)]">
      <a
        href={whatsappLink(WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        data-gtm="whatsapp_float"
        onClick={trackWhatsAppFloatClick}
        aria-label="Connect on WhatsApp"
        className="wa-float-card group block overflow-hidden rounded-[2rem] border border-white/70 bg-white/92 text-water-deep shadow-[0_18px_48px_rgba(22,56,68,0.22)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        <div className="relative px-5 pb-5 pt-4">
          <div className="flex items-start gap-3.5">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.15rem] bg-[#1FAF5A] text-white shadow-[0_8px_20px_rgba(31,175,90,0.35)]">
              <MessageCircle className="h-7 w-7" aria-hidden="true" />
              <span className="wa-float-pulse absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-[#B8F5D0] ring-[3px] ring-white" aria-hidden="true" />
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-green">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Online now
              </span>
              <span className="mt-2 block font-display text-lg font-bold leading-tight tracking-tight text-water-deep">
                Connect on WhatsApp
              </span>
              <span className="mt-1 block text-sm leading-snug text-water-deep/65">
                Quick answers on drip, pumps, pipes &amp; project supply.
              </span>
            </span>
          </div>

          <span className="mt-4 flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-[#1FAF5A] px-4 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-colors group-hover:bg-[#18964C]">
            Message us on WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>

          <span className="mt-3 block text-center text-xs font-medium text-water-deep/45">
            {formatPhone(siteConfig.whatsappNumber)}
          </span>
        </div>
      </a>
      <span className="wa-float-tail pointer-events-none absolute -bottom-2 right-8 h-5 w-5 rotate-45 rounded-sm border-r border-b border-white/70 bg-white/92 shadow-[4px_4px_12px_rgba(22,56,68,0.08)]" aria-hidden="true" />
    </div>
  );
}
