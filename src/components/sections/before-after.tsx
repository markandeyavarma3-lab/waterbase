"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaSlot } from "@/components/site/media-slot";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
}

export function BeforeAfter({ beforeSrc, afterSrc, beforeLabel = "Before", afterLabel = "After", alt }: BeforeAfterProps) {
  const [pct, setPct] = useState(48);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPct(Math.min(95, Math.max(5, ((clientX - left) / width) * 100)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) move(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [move]);

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after image comparison slider"
      tabIndex={0}
      // touch-pan-y hands the browser the vertical axis (so the page still
      // scrolls normally over the image) while we take the horizontal one —
      // without it, dragging the handle on a phone fought the page scroll.
      className="relative aspect-video w-full touch-pan-y select-none overflow-hidden rounded-2xl border border-border shadow-lift cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPct((p) => Math.max(5, p - 5));
        else if (e.key === "ArrowRight") setPct((p) => Math.min(95, p + 5));
      }}
    >
      {/* After image (full width, base layer) */}
      <div className="absolute inset-0">
        <MediaSlot src={afterSrc} alt={`${alt} — after`} ratio="video" className="rounded-none border-0 h-full w-full" />
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{afterLabel}</span>
      </div>

      {/* Before image (clipped to left side) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        <MediaSlot src={beforeSrc} alt={`${alt} — before`} ratio="video" className="rounded-none border-0 h-full w-full" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{beforeLabel}</span>
      </div>

      {/* Divider */}
      <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg" style={{ left: `${pct}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lift">
          <ChevronsLeftRight className="h-5 w-5 text-brand-green-dark" />
        </div>
      </div>
    </div>
  );
}
