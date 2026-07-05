"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/site-config";
import { trackContactClick } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

export function WhatsAppBubble() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackContactClick}
      aria-label="Click to connect on WhatsApp"
      className="group fixed bottom-4 right-3 z-50 hidden flex-col items-center gap-1.5 md:flex"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" aria-hidden="true" />
        <WhatsAppIcon className="relative h-8 w-8" />
      </span>
      <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand-green-dark shadow-soft ring-1 ring-black/5">
        Click to connect on WhatsApp
      </span>
    </motion.a>
  );
}
