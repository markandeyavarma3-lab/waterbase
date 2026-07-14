"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { CropCard } from "@/components/sections/crop-card";
import { EASE_OUT_EXPO } from "@/lib/motion";

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

const SHOWCASE_INTERVAL = 1000;

function CropTile({ name, images, index, delay }: { name: string; images: string[]; index: number; delay: number }) {
  const active = images.length ? ((index % images.length) + images.length) % images.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT_EXPO }}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-graphite-50 shadow-soft"
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
          unoptimized
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          style={{ opacity: i === active ? 1 : 0, transitionProperty: "opacity, transform" }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" aria-hidden="true" />
      <span className="absolute bottom-3 left-4 right-4 font-display text-base font-semibold text-white drop-shadow">{name}</span>
    </motion.div>
  );
}

/** A bigger, cleaner photo-tile grid — each tile animates in as it's scrolled to. */
export function CropsShowcase({ crops }: { crops: Crop[] }) {
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
    }, SHOWCASE_INTERVAL);
    return () => clearInterval(id);
  }, [isVisible, crops]);

  return (
    <div ref={containerRef} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {crops.map((c, i) => (
        <CropTile key={c.name} name={c.name} images={c.images} index={indices[i]} delay={(i % 4) * 0.08} />
      ))}
    </div>
  );
}
