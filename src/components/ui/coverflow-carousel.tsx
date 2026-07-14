"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/lib/logos";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 2000;

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

          // Wrap around logic so the array is circular
          if (diff < -half) diff += items.length;
          if (diff > half) diff -= items.length;

          const isVisible = Math.abs(diff) <= 1;
          const isCenter = diff === 0;

          const scale = isCenter ? 1.15 : 0.85;
          const opacity = isVisible ? (isCenter ? 1 : 0.6) : 0;
          const blur = isVisible ? (isCenter ? "0px" : "4px") : "10px";
          const zIndex = isVisible ? (isCenter ? 20 : 10) : 0;

          // Use percentage of its own width for X translation
          const x = `${diff * 115}%`;

          return (
            <motion.div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}: ${item.name}`}
              aria-hidden={!isCenter}
              className="absolute flex h-40 w-52 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card px-6 shadow-soft sm:h-44 sm:w-64"
              initial={false}
              animate={{
                x,
                scale,
                opacity,
                filter: `blur(${blur})`,
                zIndex,
              }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 shadow-soft transition-colors hover:border-brand-green/40 hover:text-brand-green"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Select company">
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={item.name}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex ? "w-6 bg-brand-green" : "w-1.5 bg-border hover:bg-brand-green/40"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next company"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 shadow-soft transition-colors hover:border-brand-green/40 hover:text-brand-green"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
