"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { trackRequestCallbackClick } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function StickyMobileCTA() {
  return (
    <motion.div
      initial={{ y: 64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 sink-panel living-mesh-c px-safe pb-safe md:hidden"
    >
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-14 flex-col items-center justify-center gap-0.5 border-r border-border px-2 py-2 text-center text-xs font-medium leading-tight transition-colors active:bg-brand-green-soft">
        <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp
      </a>
      <Link
        href="/contact"
        onClick={trackRequestCallbackClick}
        data-gtm="request_callback"
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 px-2 py-2 text-center text-xs font-medium leading-tight transition-colors active:bg-brand-green-soft"
      >
        <PhoneCall className="h-5 w-5 shrink-0 text-brand-green" /> Request callback
      </Link>
    </motion.div>
  );
}