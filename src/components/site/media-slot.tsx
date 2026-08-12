"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
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

const BLUEPRINT_GRID = {
  backgroundImage:
    "linear-gradient(to right, rgba(31,99,118,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,99,118,0.07) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

const SHIMMER = {
  backgroundImage: "linear-gradient(105deg, transparent 40%, rgba(31,99,118,0.06) 50%, transparent 60%)",
  animation: "shimmer-sweep 3.4s ease-in-out infinite",
};

/**
 * The "no photo yet" state, shared by MediaSlot, ProductCard and AwardsList —
 * a blueprint plate rather than an apologetic "coming soon" empty-state.
 */
export function PlaceholderPlate({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-tint-sky", className)}>
      <div className="absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />
      <span className="motion-shimmer pointer-events-none absolute inset-0 opacity-60" style={SHIMMER} aria-hidden="true" />

      {/* register-mark corners */}
      <span className="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-water-mid/25" aria-hidden="true" />
      <span className="absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-water-mid/25" aria-hidden="true" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-water-mid/25" aria-hidden="true" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-water-mid/25" aria-hidden="true" />

      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon className="h-5 w-5 text-water-mid/35" aria-hidden="true" />
      </div>
      {/* 11px floor with a slightly tighter track — 10px uppercase is below the
          legible minimum on a phone, especially at this contrast. */}
      <span className="absolute left-3 top-3 pr-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-water-mid/60 sm:tracking-[0.14em]">
        {label ?? "Image pending"}
      </span>
    </div>
  );
}

export function MediaSlot({
  src,
  fallbackSrc,
  alt,
  ratio = "video",
  label,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
}: {
  src?: string;
  fallbackSrc?: string | string[];
  alt: string;
  ratio?: Ratio;
  label?: string;
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

  return (
    <div className={cn("group/media relative overflow-hidden rounded-2xl border border-water-mid/10 bg-tint-sky", ratioClass[ratio], className)}>
      {current ? (
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
      ) : (
        <PlaceholderPlate label={label} />
      )}
    </div>
  );
}
