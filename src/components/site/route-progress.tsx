"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A thin top-of-page loading bar for App Router navigations. Next.js doesn't
 * expose a "navigation started" event, so this starts on any same-origin
 * internal link click and clears once the pathname actually changes.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
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
      setActive(true);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== startedAt.current) setActive(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-gradient-to-r from-brand-green to-brand-blue"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.85, transition: { duration: 3.5, ease: "easeOut" } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.25 } }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
