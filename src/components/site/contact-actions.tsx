"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall, Phone } from "lucide-react";
import { MotionPress } from "@/components/ui/motion-press";
import { whatsappLink, telLink, siteConfig } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function ContactActions({
  onDark = false,
  size = "lg",
  waMessage,
  showCall = false,
  className,
}: {
  onDark?: boolean;
  size?: "lg" | "xl";
  waMessage?: string;
  showCall?: boolean;
  className?: string;
}) {
  const pad = size === "xl" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm";

  // onDark kept for call-site compatibility; buttons now sink with the living
  // mesh on light grounds, so dark-section variants are no longer needed.
  void onDark;

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      {showCall ? (
        <>
          <MotionPress>
            <a
              href={telLink(siteConfig.phones.sales.primary)}
              onClick={trackCallClick}
              className={cn("cta-sink-primary inline-flex items-center justify-center gap-2 rounded-full font-semibold", pad)}
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </MotionPress>
          <MotionPress>
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("cta-sink-secondary inline-flex items-center justify-center gap-2 rounded-full font-semibold", pad)}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </MotionPress>
        </>
      ) : (
        <>
          <MotionPress>
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("cta-sink-primary inline-flex items-center justify-center gap-2 rounded-full font-semibold", pad)}
            >
              <MessageCircle className="h-4 w-4" /> Message on WhatsApp
            </a>
          </MotionPress>
          <MotionPress>
            <Link
              href="/contact"
              className={cn("cta-sink-secondary inline-flex items-center justify-center gap-2 rounded-full font-semibold", pad)}
            >
              <PhoneCall className="h-4 w-4" /> Request a callback
            </Link>
          </MotionPress>
        </>
      )}
    </div>
  );
}
