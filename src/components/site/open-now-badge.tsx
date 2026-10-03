"use client";

import { useEffect, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function toMinutes(t: string) {
  const [, h, m, ap] = t.match(/(\d+):(\d+)\s*(AM|PM)/i) ?? [];
  let hh = Number(h) % 12;
  if (/pm/i.test(ap ?? "")) hh += 12;
  return hh * 60 + Number(m);
}

function shortTime(t: string) {
  return t.replace(":00", "").replace(/\s+/, " ");
}

/** Shop status in Eluru time (IST), computed from siteConfig.hours. */
export function shopStatus(now: Date = new Date()) {
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay();
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const today = siteConfig.hours.find((h) => h.day === DAYS[day]);

  if (today?.open && today.close && mins >= toMinutes(today.open) && mins < toMinutes(today.close)) {
    return { open: true as const, label: `Open now · until ${shortTime(today.close)}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const h = siteConfig.hours.find((x) => x.day === DAYS[d]);
    if (!h?.open) continue;
    if (i === 0 && mins >= toMinutes(h.open)) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : DAYS[d];
    return { open: false as const, label: `Closed now · opens ${shortTime(h.open)} ${when}` };
  }
  return { open: false as const, label: "Closed now" };
}

/**
 * "Open now" with a live dot during shop hours; outside them, "Closed now"
 * plus a nudge to WhatsApp. Renders nothing until mounted, so the server HTML
 * (built once, at deploy time) never shows a stale status.
 */
export function OpenNowBadge({ className, onDark = false }: { className?: string; onDark?: boolean }) {
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

  if (!status) return <span className={cn("inline-block h-7", className)} aria-hidden="true" />;

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold",
          status.open ? "bg-brand-green-soft text-brand-green-dark" : onDark ? "bg-white/15 text-white" : "bg-water-deep/[0.06] text-water-deep/80"
        )}
      >
        <span className="relative flex h-2 w-2">
          {status.open ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-60" /> : null}
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", status.open ? "bg-brand-green" : "bg-water-deep/40")} />
        </span>
        {status.label}
      </span>
      {!status.open ? (
        <a
          href={whatsappLink(`Hello ${siteConfig.name}, I visited your website after hours. Please call me back.\n\nMy requirement is: `)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-green underline-offset-4 hover:underline"
        >
          WhatsApp us — we reply first thing
        </a>
      ) : null}
    </span>
  );
}
