"use client";

import { useEffect, useRef, useState } from "react";
import { BadgePercent, ChevronRight, IndianRupee, MapPin, MessageCircle, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { trackWhatsAppFloatClick } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

const REPLIES: { icon: LucideIcon; label: string; message: string }[] = [
  {
    icon: IndianRupee,
    label: "Price list",
    message: "Hello Waterbase Technologies, please share the price list for drip / sprinkler / pipes / pumps.\n\nMy requirement is: ",
  },
  {
    icon: BadgePercent,
    label: "APMIP subsidy help",
    message: "Hello Waterbase Technologies, I want help with the APMIP drip / sprinkler subsidy.\n\nMy land size and crop: ",
  },
  {
    icon: MapPin,
    label: "Book a site visit",
    message: "Hello Waterbase Technologies, I would like a free site visit.\n\nMy village / location: ",
  },
  {
    icon: MessageCircle,
    label: "Something else",
    message: "Hello Waterbase Technologies, I want to connect on WhatsApp.\n\nMy requirement is: ",
  },
];

/**
 * Floating WhatsApp button that opens a small menu of quick replies, each a
 * wa.me link with a pre-filled message. The conversion fires when a reply is
 * chosen (it is the link that opens WhatsApp), not when the menu opens.
 */
export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="wa-float fixed z-[70] flex flex-col items-end">
      {open ? (
        <div
          id="wa-menu"
          role="menu"
          aria-label="Chat on WhatsApp about"
          className="wa-menu mb-3 w-[min(17rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-white/80 bg-white shadow-lift"
        >
          <div className="flex items-center gap-2.5 bg-[#25D366] px-4 py-3 text-white">
            <WhatsAppIcon className="h-5 w-5" />
            <div>
              <p className="text-sm font-bold leading-tight">Chat with Waterbase</p>
              <p className="text-xs opacity-90">We usually reply within minutes</p>
            </div>
          </div>
          <ul className="p-2">
            {REPLIES.map((r, i) => (
              <li key={r.label} className="wa-menu-item" style={{ ["--i" as string]: i }}>
                <a
                  role="menuitem"
                  href={whatsappLink(r.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-gtm="whatsapp_float"
                  onClick={() => {
                    trackWhatsAppFloatClick();
                    setOpen(false);
                  }}
                  className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-water-deep transition-colors hover:bg-brand-green-soft"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                    <r.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">{r.label}</span>
                  <ChevronRight className="h-4 w-4 text-water-deep/40 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="wa-menu"
        aria-label={open ? "Close WhatsApp menu" : "Chat on WhatsApp"}
        className="wa-float-btn group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.38)] transition-[filter,background-color] duration-300 hover:bg-[#1EBE5D] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 sm:h-16 sm:w-16"
      >
        {!open ? <span className="wa-float-ring pointer-events-none absolute inset-0 rounded-full" aria-hidden="true" /> : null}
        {open ? (
          <X className="relative h-7 w-7" aria-hidden="true" />
        ) : (
          <WhatsAppIcon className="relative h-8 w-8 sm:h-9 sm:w-9" />
        )}
      </button>
    </div>
  );
}
