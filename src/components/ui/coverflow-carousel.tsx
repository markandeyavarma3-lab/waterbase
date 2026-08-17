"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/lib/logos";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3500;
/** Horizontal gap between card centres in the 3-up spotlight layout. */
const SPREAD_PX = 240;

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
        className="relative mx-auto h-[17rem] w-full overflow-visible sm:h-[18rem]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-4xl -translate-x-1/2">
          {items.map((item, index) => {
          let diff = index - activeIndex;
          const half = items.length / 2;
          if (diff < -half) diff += items.length;
          if (diff > half) diff -= items.length;

          const isCenter = diff === 0;
          const isSide = Math.abs(diff) === 1;
          const isVisible = isCenter || isSide;

          return (
            <motion.div
              key={item.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}: ${item.name}`}
              aria-hidden={!isCenter}
              className={cn(
                "pointer-events-auto absolute left-1/2 top-1/2 flex flex-col items-center justify-center gap-3 rounded-2xl border px-5",
                isCenter
                  ? "z-30 h-44 w-64 border-water-deep/10 bg-white/92 shadow-lift backdrop-blur-sm sm:h-48 sm:w-72"
                  : "z-10 h-32 w-44 border-water-deep/6 bg-white/45 backdrop-blur-[3px] sm:h-36 sm:w-48"
              )}
              initial={false}
              animate={{
                x: `calc(-50% + ${diff * SPREAD_PX}px)`,
                y: "-50%",
                scale: isCenter ? 1.1 : isSide ? 0.78 : 0.65,
                opacity: isCenter ? 1 : isSide ? 0.5 : 0,
                filter: isCenter ? "blur(0px)" : isSide ? "blur(5px)" : "blur(12px)",
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 220, damping: 26, mass: 0.85 }
              }
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
            >
              <div className={cn("relative w-full", isCenter ? "h-20 sm:h-24" : "h-14 sm:h-16")}>
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes={isCenter ? "288px" : "208px"}
                  className="object-contain"
                />
              </div>
              <span
                className={cn(
                  "text-center font-semibold text-water-deep/80",
                  isCenter ? "text-sm sm:text-base" : "text-xs"
                )}
              >
                {item.name}
              </span>
            </motion.div>
          );
        })}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous company"
            className="tap-target flex h-9 w-9 items-center justify-center rounded-full border border-water-deep/10 bg-white/60 text-water-deep/70 shadow-soft backdrop-blur-sm transition-colors hover:border-brand-green/40 hover:text-brand-green"
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
                    i === activeIndex ? "w-6 bg-brand-green" : "w-1.5 bg-water-deep/20 group-hover/dot:bg-brand-green/40"
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next company"
            className="tap-target flex h-9 w-9 items-center justify-center rounded-full border border-water-deep/10 bg-white/60 text-water-deep/70 shadow-soft backdrop-blur-sm transition-colors hover:border-brand-green/40 hover:text-brand-green"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
