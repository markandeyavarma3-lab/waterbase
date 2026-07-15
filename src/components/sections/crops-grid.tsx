"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
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

const HONEYCOMB_ROW_SIZE = 3;
const HONEYCOMB_BASE = 128;
const HONEYCOMB_INTERVAL = 1100;

// The name is overlaid *inside* the circle (not a caption below it) so rows
// can safely overlap for the honeycomb effect without colliding with text.
function CropBubble({ name, images, index, size, delay }: { name: string; images: string[]; index: number; size: number; delay: number }) {
  const active = images.length ? ((index % images.length) + images.length) % images.length : 0;
  const px = `clamp(64px, 20vw, ${size}px)`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 240, damping: 20, delay }}
      className="group relative shrink-0 overflow-hidden rounded-full shadow-lift ring-1 ring-black/5 transition-transform duration-300 hover:z-10 hover:scale-110"
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
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 px-1 pb-2 text-center text-[10px] font-semibold leading-tight text-white drop-shadow sm:text-xs">{name}</span>
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" aria-hidden="true" />
    </motion.div>
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
    }, HONEYCOMB_INTERVAL);
    return () => clearInterval(id);
  }, [isVisible, crops]);

  const rows: { crop: Crop; idx: number }[][] = [];
  for (let cursor = 0, idx = 0; cursor < crops.length; cursor += HONEYCOMB_ROW_SIZE) {
    rows.push(crops.slice(cursor, cursor + HONEYCOMB_ROW_SIZE).map((crop) => ({ crop, idx: idx++ })));
  }
  const midRow = (rows.length - 1) / 2;

  return (
    <div ref={containerRef} className="mx-auto mt-10 flex max-w-2xl flex-col items-center">
      {rows.map((row, r) => {
        const dist = Math.abs(r - midRow);
        const scale = Math.max(0.68, 1 - dist * 0.16);
        const rowSize = Math.round(HONEYCOMB_BASE * scale);
        const offsetPx = r % 2 === 1 ? rowSize * 0.42 : 0;
        return (
          <div
            key={r}
            className="flex justify-center gap-3 sm:gap-4"
            style={{ marginTop: r === 0 ? 0 : -rowSize * 0.32, transform: `translateX(${offsetPx}px)` }}
          >
            {row.map(({ crop, idx }) => (
              <CropBubble key={crop.name} name={crop.name} images={crop.images} index={indices[idx]} size={rowSize} delay={(idx % HONEYCOMB_ROW_SIZE) * 0.08} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
