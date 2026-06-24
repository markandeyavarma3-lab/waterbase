"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealFrom = "up" | "down" | "left" | "right" | "scale";

const fromHidden: Record<RevealFrom, string> = {
  up: "translate-y-6 opacity-0",
  down: "-translate-y-6 opacity-0",
  left: "translate-x-6 opacity-0",
  right: "-translate-x-6 opacity-0",
  scale: "scale-[0.97] opacity-0",
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: RevealFrom;
  blur?: boolean;
}) {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: "opacity, transform, filter",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "will-change-[opacity,transform] motion-reduce:transition-none motion-reduce:transform-none",
        shown
          ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
          : cn(fromHidden[from], blur && "blur-[4px]"),
        className
      )}
    >
      {children}
    </div>
  );
}
