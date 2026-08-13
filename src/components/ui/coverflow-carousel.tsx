"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/lib/logos";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3800;

export function CoverflowCarousel({ items }: { items: Logo[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (items.length <= 1 || paused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [items.length, paused, prefersReducedMotion]);

  if (!items || items.length === 0) return null;

  const go = (dir: 1 | -1) => setActiveIndex((prev) => (prev + dir + items.length) % items.length);

  return (
    <div
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Companies we've delivered for"
        className="relative flex h-72 w-full items-center justify-center overflow-hidden px-4"
      >
        {items.map((item, index) => {
          let diff = index - activeIndex;
          const half = items.length / 2;

          // Wrap around so the deck is circular.
          if (diff < -half) diff += items.length;
          if (diff > half) diff -= items.length;

          const isVisible = Math.abs(diff) <= 1;
          const isCenter = diff === 0;

          // Cards are anchored at left:50%. x must include -50% so the center
          // card is truly centered — without that, every card sat on the left
          // edge and the coverflow looked broken.
          const x = `calc(-50% + ${diff * 118}%)`;

          return (
            <motion.div
              key={item.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}: ${item.name}`}
              aria-hidden={!isCenter}
              className="surface-card absolute left-1/2 top-1/2 flex h-40 w-52 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl px-6 sm:h-44 sm:w-64"
              initial={false}
              animate={{
                x,
                y: "-50%",
                scale: isCenter ? 1.12 : 0.88,
                opacity: isVisible ? (isCenter ? 1 : 0.55) : 0,
                filter: isVisible ? (isCenter ? "blur(0px)" : "blur(2px)") : "blur(8px)",
                zIndex: isVisible ? (isCenter ? 20 : 10) : 0,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 28, mass: 0.7 }
              }
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
            >
              <div className="relative h-16 w-full sm:h-20">
                <Image src={item.src} alt={item.name} fill sizes="256px" className="object-contain" />
              </div>
              <span className="text-center text-xs font-semibold text-foreground/80 sm:text-sm">{item.name}</span>
            </motion.div>
          );
        })}
      </div>

      {items.length > 1 ? (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous company"
            className="tap-target flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 shadow-soft transition-colors hover:border-brand-green/40 hover:text-brand-green"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center" role="tablist" aria-label="Select company">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={item.name}
                onClick={() => setActiveIndex(i)}
                className="tap-target-y group/dot flex h-8 items-center justify-center px-1.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "w-6 bg-brand-green" : "w-1.5 bg-border group-hover/dot:bg-brand-green/40"
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next company"
            className="tap-target flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 shadow-soft transition-colors hover:border-brand-green/40 hover:text-brand-green"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
