"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE_OUT_EXPO } from "@/lib/motion";

type Ratio = "video" | "square" | "portrait" | "wide" | "tall";

const ratioClass: Record<Ratio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/7]",
  tall: "aspect-[4/5]",
};

export function MediaSlot({
  src,
  fallbackSrc,
  alt,
  ratio = "video",
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
}: {
  src?: string;
  fallbackSrc?: string | string[];
  alt: string;
  ratio?: Ratio;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  // Try src first, then each fallback in order, then the placeholder.
  const fallbacks = Array.isArray(fallbackSrc) ? fallbackSrc : fallbackSrc ? [fallbackSrc] : [];
  const sources = [src, ...fallbacks].filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);
  const current = idx < sources.length ? sources[idx] : undefined;
  const prefersReducedMotion = useReducedMotion();

  // No photo (missing, or every source failed to load) → the slot disappears.
  // This used to draw a blueprint "Image pending" plate, which is fine while a
  // site is being built and reads as unfinished once it is live.
  if (!current) return null;

  return (
    <div className={cn("group/media relative overflow-hidden rounded-2xl border border-water-mid/10 bg-tint-sky", ratioClass[ratio], className)}>
      {(
        // Images used to appear flat, the instant they decoded. They now settle:
        // a slight over-scale relaxing to 1:1 with a fade, which reads as the
        // photo coming to rest rather than being pasted in. The container already
        // clips, so the over-scale never shows an edge. Cropping is unaffected
        // because object-cover fills the box at every scale.
        <motion.div
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: DUR.settle, ease: EASE_OUT_EXPO }}
        >
          {/* The zoom lives on the <Image>, not the motion wrapper above, so it
              cannot fight the inline transform framer-motion writes there. */}
          <Image
            key={current}
            src={current}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[600ms] ease-out-expo group-hover/media:scale-[1.045]"
            onError={() => setIdx((i) => i + 1)}
          />
        </motion.div>
      )}
    </div>
  );
}
