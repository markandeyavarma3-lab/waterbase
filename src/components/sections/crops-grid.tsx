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

// Tapering row pattern — narrow at top and bottom, widest in the middle — so
// the cluster's overall silhouette reads as a circle/sphere, not a rectangle.
// Each step differs by exactly 1, which is what keeps the hex-nesting math
// (below) exact regardless of row length.
const HONEYCOMB_PATTERN = [2, 3, 4, 3, 2];
const HONEYCOMB_SIZE = 176; // uniform circle diameter — kept uniform so the hex-packing math is exact
const HONEYCOMB_GAP = 6;
// Correct hex packing: circles in adjacent rows sit exactly (SIZE + GAP) apart
// center-to-center — touching with a consistent gap, never overlapping. Rows
// differing by exactly 1 item, each independently centered, land each
// shorter row's circles exactly between the longer row's circles above/below
// — true honeycomb nesting with no manual horizontal offset needed.
const HONEYCOMB_PITCH = (HONEYCOMB_SIZE + HONEYCOMB_GAP) * (Math.sqrt(3) / 2);
const HONEYCOMB_STEP_MS = 350; // how often ONE bubble (in row-major order) advances to its next photo

function CropBubble({ name, images, index, delay }: { name: string; images: string[]; index: number; delay: number }) {
  const active = images.length ? ((index % images.length) + images.length) % images.length : 0;
  const px = `clamp(88px, 26vw, ${HONEYCOMB_SIZE}px)`;

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
          sizes={`${HONEYCOMB_SIZE}px`}
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
  const turnRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Advance exactly one bubble's photo per tick, in row-major order (row 1 left-to-right,
  // then row 2, ...) — a cascading wave across the cluster instead of everything at once.
  useEffect(() => {
    if (!isVisible || crops.length === 0) return;
    const id = setInterval(() => {
      const turn = turnRef.current % crops.length;
      turnRef.current += 1;
      setIndices((prev) => prev.map((idx, i) => {
        if (i !== turn) return idx;
        const n = crops[i]?.images.length ?? 0;
        return n > 1 ? (idx + 1) % n : idx;
      }));
    }, HONEYCOMB_STEP_MS);
    return () => clearInterval(id);
  }, [isVisible, crops]);

  const rows: { crop: Crop; idx: number }[][] = [];
  for (let cursor = 0, idx = 0, r = 0; cursor < crops.length; r++) {
    // Once the curated taper is used up, keep alternating by 1 (still nests correctly).
    const target = r < HONEYCOMB_PATTERN.length ? HONEYCOMB_PATTERN[r] : HONEYCOMB_PATTERN[HONEYCOMB_PATTERN.length - 2];
    const take = Math.min(target, crops.length - cursor);
    rows.push(crops.slice(cursor, cursor + take).map((crop) => ({ crop, idx: idx++ })));
    cursor += take;
  }

  return (
    <div ref={containerRef} className="mx-auto mt-10 flex max-w-4xl flex-col items-center">
      {rows.map((row, r) => (
        <div
          key={r}
          className="flex justify-center"
          style={{
            gap: HONEYCOMB_GAP,
            marginTop: r === 0 ? 0 : HONEYCOMB_PITCH - HONEYCOMB_SIZE,
          }}
        >
          {row.map(({ crop, idx }) => (
            <CropBubble key={crop.name} name={crop.name} images={crop.images} index={indices[idx]} delay={idx * 0.06} />
          ))}
        </div>
      ))}
    </div>
  );
}
