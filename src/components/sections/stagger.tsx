"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STAGGER_STEP } from "@/lib/motion";

/**
 * A grid or row whose children enter one after another.
 *
 * Previously framer-motion variants propagating from a parent to `StaggerItem`
 * children. That propagation is the only thing the library was providing, and
 * it cost the library on every page that renders a grid — which is most of them.
 *
 * Delays are assigned once after mount by walking `[data-stagger-item]` in DOM
 * order. Doing it through the DOM rather than through props matters: a
 * `StaggerItem` is not always a direct child (in credentials.tsx they sit inside
 * a wrapper div), so a CSS `:nth-child` rule or a React.Children walk would both
 * miss them. The visual result and the public API are unchanged.
 */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.querySelectorAll<HTMLElement>("[data-stagger-item]").forEach((item, i) => {
      item.style.transitionDelay = `${(0.04 + i * STAGGER_STEP).toFixed(3)}s`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("stagger", className)} data-shown={shown || undefined}>
      {children}
    </div>
  );
}

/** One staggered child. Can sit at any depth inside a `Stagger`. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}
