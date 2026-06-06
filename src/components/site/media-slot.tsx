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
  alt,
  ratio = "video",
  label,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
}: {
  src?: string;
  alt: string;
  ratio?: Ratio;
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-muted", ratioClass[ratio], className)}>
      {showImage ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" onError={() => setErrored(true)} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,var(--color-brand-green-soft),var(--color-brand-blue-soft))] text-brand-green-dark">
          <ImageIcon className="h-7 w-7 opacity-50" aria-hidden="true" />
          <span className="px-3 text-center text-xs font-medium text-brand-green-dark/70">{label ?? "Photo coming soon"}</span>
        </div>
      )}
    </div>
  );
}