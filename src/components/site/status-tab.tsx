"use client";

import { useEffect, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { shopStatus } from "@/components/site/open-now-badge";
import { cn } from "@/lib/utils";

/**
 * A small tab hanging from the homepage navbar with the live shop status.
 * Closed hours turn the whole tab into a WhatsApp link. Renders after mount
 * only, so the statically built HTML never carries a stale status.
 */
export function StatusTab() {
  const [status, setStatus] = useState<ReturnType<typeof shopStatus> | null>(null);

  useEffect(() => {
    const update = () => setStatus(shopStatus());
    const first = requestAnimationFrame(update);
    const id = window.setInterval(update, 60_000);
    return () => {
      cancelAnimationFrame(first);
      window.clearInterval(id);
    };
  }, []);

  if (!status) return null;

  const wa = whatsappLink(
    status.open
      ? `Hello ${siteConfig.name}, I want to connect on WhatsApp.\n\nMy requirement is: `
      : `Hello ${siteConfig.name}, I visited your website after hours. Please call me back.\n\nMy requirement is: `
  );
  const shell =
    "status-tab inline-flex items-center gap-2 rounded-b-2xl border border-t-0 border-white/80 bg-white/90 px-4 py-1.5 text-xs font-semibold shadow-soft backdrop-blur-md sm:text-[0.8rem]";

  const dot = (
    <span className="relative flex h-2 w-2 shrink-0">
      {status.open ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-60" /> : null}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", status.open ? "bg-brand-green" : "bg-water-deep/40")} />
    </span>
  );

  if (!status.open) {
    return (
      <a href={wa} target="_blank" rel="noopener noreferrer" className={cn(shell, "text-water-deep hover:bg-white")}>
        {dot}
        <span>Closed now ·</span>
        <span className="text-[#1EBE5D]">Click to connect on WhatsApp</span>
        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
      </a>
    );
  }

  return (
    <span className={cn(shell, "text-brand-green-dark")}>
      {dot}
      <span>{status.label}</span>
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="ml-1 rounded-full p-0.5 text-[#25D366] hover:bg-brand-green-soft">
        <WhatsAppIcon className="h-4 w-4" />
      </a>
    </span>
  );
}
