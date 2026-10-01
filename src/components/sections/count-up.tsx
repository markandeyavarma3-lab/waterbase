"use client";

import { useEffect, useRef } from "react";

const format = (n: number, suffix: string) => `${n.toLocaleString("en-IN")}${suffix}`;

/**
 * A number that counts up when it scrolls into view — WITHOUT ever shipping a
 * zero to anything that doesn't run JavaScript, and without re-rendering.
 *
 * Two things were wrong with the obvious implementation:
 *
 * 1. `useState(0)` put `0+` in the server HTML. Every stat on this site —
 *    15,400+ customers, 52,800+ acres — is a trust signal, and every one of
 *    them reached crawlers, no-JS visitors and the pre-hydration paint on a
 *    slow phone as "0+". On a paid landing page that is worse than showing
 *    nothing. So the value is rendered directly, server-side, and is correct
 *    before a single byte of JavaScript arrives.
 *
 * 2. Animating through `setState` re-rendered the component on every frame:
 *    ~60 renders/second per figure, and the homepage shows five at once.
 *    The count is a text node, so it is written straight to the DOM through a
 *    ref instead. React renders this component exactly once.
 *
 * Reduced motion leaves the real figure on screen and animates nothing.
 */
export function CountUp({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let done = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done) return;
        done = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = format(Math.round(eased * end), suffix);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        // Only drop to zero once we know we're about to animate up from it, so
        // the real figure is never blanked for someone who never scrolls here.
        el.textContent = format(0, suffix);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      // A stat unmounting mid-count would otherwise leave a rAF loop running.
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, duration, suffix]);

  return <span ref={ref}>{format(end, suffix)}</span>;
}
