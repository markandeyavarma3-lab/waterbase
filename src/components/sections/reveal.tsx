"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fade-and-rise as an element scrolls into view.
 *
 * This used to be a framer-motion `whileInView`. It is a one-shot opacity and
 * transform change on a threshold — the single most common effect on the site,
 * imported by ~25 components — so it was the largest reason the animation
 * library sat on the critical path of every page. An IntersectionObserver plus
 * two CSS properties does exactly the same thing for no library cost.
 *
 * The public API is unchanged (`className`, `delay` in ms), so no call site
 * needed touching.
 *
 * Timing and distance still come from globals.css (`--dur-settle`,
 * `--ease-out-expo`, `--reveal-y`), which is where lib/motion.ts mirrors them —
 * so the site keeps one rhythm rather than drifting per-component.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion is handled in CSS (globals.css forces `.reveal` visible
    // with no transition), not here — branching in JS would mean calling
    // setState synchronously in an effect body, which React 19 rightly flags.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect(); // once, like the old viewport={{ once: true }}
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-shown={shown || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
