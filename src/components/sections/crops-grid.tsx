"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { Reveal } from "@/components/sections/reveal";
import { CropCard } from "@/components/sections/crop-card";

type Crop = { name: string; images: string[] };

// Columns per row at each breakpoint — must match the grid classes below.
function colsForWidth(w: number) {
  return w >= 1024 ? 4 : w >= 640 ? 3 : 2;
}

const INTERVAL = 850;

export function CropsGrid({ crops }: { crops: Crop[] }) {
  const [indices, setIndices] = useState<number[]>(() => crops.map(() => 0));
  const colsRef = useRef(4);
  const colRef = useRef(-1); // the column currently being advanced

  // Track how many columns are on screen (responsive).
  useEffect(() => {
    const update = () => { colsRef.current = colsForWidth(window.innerWidth); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Every tick, advance the next column's cards together (a11+a21, then a12+a22, ...).
  useEffect(() => {
    if (!isVisible) return;

    const id = setInterval(() => {
      const cols = colsRef.current;
      const nextCol = (colRef.current + 1) % cols;
      colRef.current = nextCol;
      setIndices((prev) =>
        prev.map((idx, i) => {
          if (i % cols !== nextCol) return idx;
          const n = crops[i].images.length;
          return n > 1 ? (idx + 1) % n : idx;
        })
      );
    }, INTERVAL);
    return () => clearInterval(id);
  }, [crops]);

  return (
    <div ref={containerRef}>
      <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {crops.map((c, i) => (
        <StaggerItem key={c.name}>
          <CropCard name={c.name} images={c.images} index={indices[i]} />
        </StaggerItem>
      ))}
      </Stagger>
    </div>
  );
}

const BUBBLE_ROW_SIZE = 3;
const BUBBLE_BASE = 96;
const BUBBLE_INTERVAL = 1100;

function CropBubble({ name, images, index, size }: { name: string; images: string[]; index: number; size: number }) {
  const active = images.length ? ((index % images.length) + images.length) % images.length : 0;
  const px = `clamp(60px, 20vw, ${size}px)`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="group relative shrink-0 overflow-hidden rounded-full shadow-lift ring-1 ring-black/5 transition-transform duration-300 hover:scale-105"
        style={{ width: px, height: px }}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={name}
            fill
            sizes={`${size}px`}
            unoptimized
            className="object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" aria-hidden="true" />
      </div>
      <span className="text-xs font-semibold text-foreground/80 sm:text-sm">{name}</span>
    </div>
  );
}

/** Apple-Watch-style honeycomb cluster — for a small, fixed set of crops (homepage). */
export function CropsHoneycomb({ crops }: { crops: Crop[] }) {
  const [indices, setIndices] = useState<number[]>(() => crops.map(() => 0));
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(() => {
      setIndices((prev) => prev.map((idx, i) => {
        const n = crops[i]?.images.length ?? 0;
        return n > 1 ? (idx + 1) % n : idx;
      }));
    }, BUBBLE_INTERVAL);
    return () => clearInterval(id);
  }, [isVisible, crops]);

  const rows: { crop: Crop; idx: number }[][] = [];
  for (let cursor = 0, idx = 0; cursor < crops.length; cursor += BUBBLE_ROW_SIZE) {
    rows.push(crops.slice(cursor, cursor + BUBBLE_ROW_SIZE).map((crop) => ({ crop, idx: idx++ })));
  }
  const midRow = (rows.length - 1) / 2;

  return (
    <div ref={containerRef} className="mx-auto mt-10 flex max-w-2xl flex-col items-center">
      {rows.map((row, r) => {
        const dist = Math.abs(r - midRow);
        const scale = Math.max(0.72, 1 - dist * 0.14);
        const offsetPx = r % 2 === 1 ? 34 : 0;
        return (
          <div
            key={r}
            className="flex justify-center gap-3 sm:gap-5"
            style={{ marginTop: r === 0 ? 0 : -16, transform: `translateX(${offsetPx}px)` }}
          >
            {row.map(({ crop, idx }) => (
              <Reveal key={crop.name} delay={idx * 60}>
                <CropBubble name={crop.name} images={crop.images} index={indices[idx]} size={Math.round(BUBBLE_BASE * scale)} />
              </Reveal>
            ))}
          </div>
        );
      })}
    </div>
  );
}
