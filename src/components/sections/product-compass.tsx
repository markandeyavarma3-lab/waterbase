"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CompassItem = { icon: LucideIcon; title: string; desc: string };

export type CompassBatch = {
  label: string;
  items: CompassItem[];
};

const SLOT_POS = [
  "col-start-1 row-start-1",
  "col-start-3 row-start-1",
  "col-start-1 row-start-3",
  "col-start-3 row-start-3",
] as const;

const MESH = ["living-mesh-a", "living-mesh-b", "living-mesh-c"] as const;

const SWAP = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

function ProductWindow({ item, slot }: { item: CompassItem; slot: number }) {
  const Icon = item.icon;
  return (
    <Link
      href="/products"
      className={cn(
        "process-step-card group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl",
        MESH[slot % 3]
      )}
    >
      <div className="relative h-[42%] min-h-[4.5rem] overflow-hidden">
        <Icon
          className="pointer-events-none absolute -right-3 -bottom-4 h-24 w-24 text-water-deep/[0.1] transition-transform duration-700 group-hover:scale-110 sm:h-28 sm:w-28"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 font-display text-2xl font-extrabold tabular-nums text-water-deep/20 sm:text-3xl">
          {String(slot + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/55 text-brand-green shadow-soft">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-3 sm:px-5 sm:py-4">
        <h3 className="font-display text-sm font-semibold leading-snug text-water-deep transition-colors group-hover:text-brand-green sm:text-base">
          {item.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
      </div>
    </Link>
  );
}

export function ProductCompass({ batches }: { batches: CompassBatch[] }) {
  const pin = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const [hoverSlot, setHoverSlot] = useState<number | null>(null);
  const [batchIndex, setBatchIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const n = Math.max(1, batches.length);

  const { scrollYProgress } = useScroll({
    target: pin,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (hovering.current) return;
    const i = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setBatchIndex((prev) => (prev === i ? prev : i));
  });

  if (prefersReducedMotion) {
    return (
      <div className="mt-12 grid gap-8">
        {batches.map((b) => (
          <div key={b.label}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">{b.label}</p>
            <div className="grid grid-cols-2 gap-4">
              {b.items.map((item) => (
                <Link key={item.title} href="/products" className="process-step-card rounded-2xl p-5">
                  <item.icon className="h-5 w-5 text-brand-green" />
                  <h3 className="mt-3 font-display font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const batch = batches[batchIndex];
  const ring = ((batchIndex + 1) / n) * 2 * Math.PI * 54;

  return (
    <div ref={pin} className="relative mt-6 h-[400vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center bg-sunrise living-mesh px-4 sm:px-8">
        <div
          className="mx-auto grid h-[min(36rem,calc(100svh-7rem))] w-full max-w-5xl gap-4 sm:gap-5"
          style={{
            gridTemplateColumns: "1fr minmax(8.5rem, 11rem) 1fr",
            gridTemplateRows: "1fr minmax(8.5rem, 11rem) 1fr",
          }}
        >
          {Array.from({ length: 4 }, (_, slot) => {
            const item = batch.items[slot];
            if (!item) return <div key={slot} className={SLOT_POS[slot]} />;
            return (
              <div key={slot} className={cn("relative min-h-0", SLOT_POS[slot])}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${batchIndex}-${item.title}`}
                    className="absolute inset-0"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ ...SWAP, delay: slot * 0.05 }}
                    onMouseEnter={() => {
                      hovering.current = true;
                      setHoverSlot(slot);
                    }}
                    onMouseLeave={() => {
                      hovering.current = false;
                      setHoverSlot(null);
                    }}
                  >
                    <motion.div
                      className="h-full"
                      animate={{ scale: hoverSlot === slot ? 1.03 : 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 28 }}
                    >
                      <ProductWindow item={item} slot={slot} />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}

          <div className="col-start-2 row-start-2 flex items-center justify-center">
            <div className="relative flex h-full w-full max-h-[11rem] max-w-[11rem] items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(22,56,68,0.1)" strokeWidth="2.5" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#2E9466"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 54}
                  animate={{ strokeDashoffset: 2 * Math.PI * 54 - ring }}
                  transition={SWAP}
                />
              </svg>
              <div className="sink-panel living-mesh-a flex h-[78%] w-[78%] flex-col items-center justify-center rounded-full px-3 text-center">
                <p className="font-display text-[1.05rem] font-bold tabular-nums tracking-tight text-water-deep sm:text-xl">
                  {String(batchIndex + 1).padStart(2, "0")}
                  <span className="text-water-deep/35">/{String(n).padStart(2, "0")}</span>
                </p>
                <p className="mt-1 font-display text-[0.7rem] font-semibold leading-tight text-water-deep sm:text-xs">
                  Products we sell
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-green sm:text-[10px]">
                  {batch?.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
