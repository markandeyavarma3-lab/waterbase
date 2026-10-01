"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "loading" | "done";

/**
 * A thin top-of-page loading bar for App Router navigations. Next.js doesn't
 * expose a "navigation started" event, so this starts on any same-origin
 * internal link click and finishes once the pathname actually changes.
 *
 * CSS-driven (`.route-progress` in globals.css), not framer-motion: it renders
 * in the root layout, so anything it imports loads on every page. The motion is
 * the same — creep to 85% over 3.5s while loading, then snap full and fade.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const startedAt = useRef(pathname);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      } catch {
        return;
      }
      startedAt.current = pathname;
      setPhase("loading");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // The route changed: finish the bar. Done via a timer callback rather than
  // synchronously in the effect body, and cleared again once it has faded.
  useEffect(() => {
    if (pathname === startedAt.current) return;
    startedAt.current = pathname;
    const finish = window.setTimeout(() => setPhase((p) => (p === "loading" ? "done" : p)), 0);
    const reset = window.setTimeout(() => setPhase("idle"), 320);
    return () => {
      window.clearTimeout(finish);
      window.clearTimeout(reset);
    };
  }, [pathname]);

  return <div className="route-progress" data-phase={phase} aria-hidden="true" />;
}
