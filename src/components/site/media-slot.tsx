"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-muted", ratioClass[ratio], className)}>
      {current ? (
        <Image key={current} src={current} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" onError={() => setIdx((i) => i + 1)} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,var(--color-brand-green-soft),var(--color-brand-blue-soft))] text-brand-green-dark">
          <ImageIcon className="h-7 w-7 opacity-50" aria-hidden="true" />
          <span className="px-3 text-center text-xs font-medium text-brand-green-dark/70">{label ?? "Photo coming soon"}</span>
        </div>
      )}
    </div>
  );
}