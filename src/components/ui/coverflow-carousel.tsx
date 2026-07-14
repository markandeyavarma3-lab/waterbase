"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Logo } from "@/lib/logos";

export function CoverflowCarousel({ items }: { items: Logo[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2000); // 2 seconds as requested
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative mx-auto flex h-72 w-full max-w-5xl items-center justify-center overflow-hidden px-4">
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
            className="absolute flex h-40 w-52 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card px-6 shadow-soft sm:h-44 sm:w-64"
            initial={false}
            animate={{
              x,
              scale,
              opacity,
              filter: `blur(${blur})`,
              zIndex,
            }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="relative h-16 w-full sm:h-20">
              <Image src={item.src} alt={item.name} fill sizes="256px" className="object-contain" />
            </div>
            <span className="text-center text-xs font-semibold text-foreground/80 sm:text-sm">{item.name}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
