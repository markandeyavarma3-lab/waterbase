"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, PhoneCall } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

export function StickyMobileCTA() {
  return (
    <motion.div
      initial={{ y: 64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background/95 shadow-[0_-2px_16px_rgba(13,26,18,0.08)] backdrop-blur md:hidden"
    >
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 border-r border-border py-2.5 text-xs font-medium transition-colors active:bg-brand-green-soft">
        <MessageCircle className="h-5 w-5 text-brand-green" /> WhatsApp
      </a>
      <Link href="/contact" className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium transition-colors active:bg-brand-green-soft">
        <PhoneCall className="h-5 w-5 text-brand-green" /> Request callback
      </Link>
    </motion.div>
  );
}