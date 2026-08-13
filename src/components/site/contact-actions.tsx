"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  // No `magnetic` prop on MotionPress below — Button itself pulls toward the
  // cursor now, on every button site-wide, so setting it here too would
  // double the pull. MotionPress still earns its keep for the ripple and
  // hover-scale it adds on top.
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      {showCall ? (
        <>
          <MotionPress>
            <Button asChild size={size} className={onDark ? "bg-white text-brand-green-dark shadow-lift hover:bg-white/90" : "rounded-full border border-brand-green/25 bg-brand-green/15 text-brand-green-dark shadow-soft backdrop-blur-sm hover:bg-brand-green/25"}>
              <a href={telLink(siteConfig.phones.sales.primary)} onClick={trackCallClick}><Phone /> Call Now</a>
            </Button>
          </MotionPress>
          <MotionPress>
            <Button asChild size={size} variant="outline" className={onDark ? "border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white" : "rounded-full border border-brand-blue/25 bg-brand-blue/15 text-brand-blue-dark backdrop-blur-sm hover:bg-brand-blue/25"}>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a>
            </Button>
          </MotionPress>
        </>
      ) : (
        <>
          <MotionPress>
            <Button asChild size={size} className={onDark ? "bg-white text-brand-green-dark shadow-lift hover:bg-white/90" : "rounded-full border border-brand-green/25 bg-brand-green/15 text-brand-green-dark shadow-soft backdrop-blur-sm hover:bg-brand-green/25"}>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Message on WhatsApp</a>
            </Button>
          </MotionPress>
          <MotionPress>
            <Button asChild size={size} variant="outline" className={onDark ? "border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white" : "rounded-full border border-brand-blue/25 bg-brand-blue/15 text-brand-blue-dark backdrop-blur-sm hover:bg-brand-blue/25"}>
              <Link href="/contact"><PhoneCall /> Request a callback</Link>
            </Button>
          </MotionPress>
        </>
      )}
    </div>
  );
}
