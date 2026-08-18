"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CompassItem = { icon: LucideIcon; title: string; desc: string };

export type CompassBatch = {
  label: string;
  items: CompassItem[];
};

function SlotFace({
  item,
  index,
  batchFloat,
  hovered,
}: {
  item: CompassItem;
  index: number;
  batchFloat: MotionValue<number>;
  hovered: boolean;
}) {
  const Icon = item.icon;
  const y = useTransform(batchFloat, (v) => (v - index) * 42);
  const opacity = useTransform(batchFloat, (v) => Math.max(0, 1 - Math.abs(v - index)));
  const scale = useTransform(batchFloat, (v) => {
    const vis = Math.max(0, 1 - Math.abs(v - index));
    return 0.96 + vis * 0.04;
  });
  const filter = useTransform(batchFloat, (v) => {
    const d = Math.min(1, Math.abs(v - index));
    return `blur(${d * 3.5}px)`;
  });
  const zIndex = useTransform(batchFloat, (v) => Math.round((1 - Math.abs(v - index)) * 8));

  return (
    <motion.div
      className="absolute inset-0"
      style={{ y, opacity, scale, filter, zIndex }}
    >
      <Link
        href="/products"
        className={cn(
          "surface-card flex h-full min-h-0 flex-col gap-3 rounded-2xl border border-water-deep/10 p-5 shadow-soft transition-shadow duration-500 sm:p-6",
          hovered && "shadow-lift"
        )}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-h-0">
          <h3 className="font-display text-sm font-semibold leading-snug text-water-deep sm:text-base">{item.title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function Slot({
  slot,
  batches,
  batchFloat,
  hovered,
  onHover,
}: {
  slot: number;
  batches: CompassBatch[];
  batchFloat: MotionValue<number>;
  hovered: boolean;
  onHover: (on: boolean) => void;
}) {
  return (
    <motion.div
      className="relative min-h-0"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      animate={{ scale: hovered ? 1.045 : 1, zIndex: hovered ? 30 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.7 }}
    >
      {batches.map((batch, i) => {
        const item = batch.items[slot];
        if (!item) return null;
        return (
          <SlotFace
            key={`${batch.label}-${item.title}`}
            item={item}
            index={i}
            batchFloat={batchFloat}
            hovered={hovered}
          />
        );
      })}
    </motion.div>
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
  const target = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!hovering.current) target.set(v);
  });
  const smooth = useSpring(target, {
    stiffness: 38,
    damping: 36,
    mass: 1.05,
    restDelta: 0.0004,
  });
  const batchFloat = useTransform(smooth, [0, 1], [0, n - 1]);
  const ring = useTransform(smooth, [0, 1], [1, 0]);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = useTransform(ring, (p) => p * circ);

  useMotionValueEvent(batchFloat, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(v)));
    setBatchIndex((prev) => (prev === i ? prev : i));
  });

  const onHover = (slot: number, on: boolean) => {
    hovering.current = on;
    setHoverSlot(on ? slot : null);
  };

  if (prefersReducedMotion) {
    return (
      <div className="mt-12 grid gap-8">
        {batches.map((b) => (
          <div key={b.label}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">{b.label}</p>
            <div className="grid grid-cols-2 gap-4">
              {b.items.map((item) => (
                <Link key={item.title} href="/products" className="surface-card rounded-2xl p-5">
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

  const current = batches[batchIndex];

  return (
    <div ref={pin} className="relative mt-6 h-[360vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-4 sm:px-8">
        <div className="relative mx-auto grid h-[min(34rem,calc(100svh-7.5rem))] w-full max-w-4xl grid-cols-2 grid-rows-2 gap-4 sm:gap-5">
          {Array.from({ length: 4 }, (_, slot) => (
            <Slot
              key={slot}
              slot={slot}
              batches={batches}
              batchFloat={batchFloat}
              hovered={hoverSlot === slot}
              onHover={(on) => onHover(slot, on)}
            />
          ))}

          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(22,56,68,0.08)" strokeWidth="2.5" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke="#2E9466"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  style={{ strokeDashoffset: dash }}
                />
              </svg>
              <div className="flex h-[6.75rem] w-[6.75rem] flex-col items-center justify-center rounded-full border border-water-deep/10 bg-white/90 text-center shadow-lift backdrop-blur-md sm:h-[8.25rem] sm:w-[8.25rem]">
                <p className="font-display text-[1.05rem] font-bold tabular-nums tracking-tight text-water-deep sm:text-xl">
                  {String(batchIndex + 1).padStart(2, "0")}
                  <span className="text-water-deep/35">/{String(n).padStart(2, "0")}</span>
                </p>
                <p className="mt-1 px-2 font-display text-[0.7rem] font-semibold leading-tight text-water-deep sm:text-xs">
                  Products we sell
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-green sm:text-[10px]">
                  {current?.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
