"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { trackContactClick } from "@/lib/analytics";

export function WhatsAppBubble() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackContactClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-110 active:scale-95 md:flex"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" aria-hidden="true" />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  );
}
