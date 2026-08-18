"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
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

const CORNERS = [
  { key: "tl", className: "left-0 top-0 origin-bottom-right" },
  { key: "tr", className: "right-0 top-0 origin-bottom-left" },
  { key: "bl", className: "bottom-0 left-0 origin-top-right" },
  { key: "br", className: "bottom-0 right-0 origin-top-left" },
] as const;

function smoothstep(t: number, a: number, b: number) {
  if (t <= a) return 0;
  if (t >= b) return 1;
  const x = (t - a) / (b - a);
  return x * x * (3 - 2 * x);
}

function PageFace({
  item,
  incoming,
  turn,
}: {
  item: CompassItem;
  incoming: boolean;
  turn: number;
}) {
  const Icon = item.icon;
  const rotateX = incoming ? (1 - turn) * 58 : turn * -62;
  const y = incoming ? (1 - turn) * 20 : turn * -16;
  const z = incoming ? (1 - turn) * -90 : turn * -70;
  const opacity = incoming ? turn : 1 - turn;
  const scale = incoming ? 0.93 + turn * 0.07 : 1 - turn * 0.07;

  return (
    <Link href="/products" className={cn("block h-full", incoming && "absolute inset-0")}>
      <div
        className="surface-card flex h-full flex-col justify-between rounded-2xl border border-water-deep/10 p-4 shadow-soft sm:p-5"
        style={{
          transform: `perspective(1100px) translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg) scale(${scale})`,
          opacity,
          backfaceVisibility: "hidden",
          pointerEvents: opacity < 0.12 ? "none" : "auto",
        }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-sm font-semibold leading-tight text-water-deep sm:text-base">{item.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
        </div>
      </div>
    </Link>
  );
}

function useMotionNumber(source: MotionValue<number>, initial = 0) {
  const [value, setValue] = useState(initial);
  useMotionValueEvent(source, "change", setValue);
  return value;
}

export function ProductCompass({ batches }: { batches: CompassBatch[] }) {
  const pin = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: pin,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 52, damping: 30, mass: 0.6 });
  const n = Math.max(1, batches.length);
  const idxFloat = useTransform(smooth, [0, 1], [0, n - 0.001]);
  const raw = useMotionNumber(idxFloat, 0);
  const current = Math.min(n - 1, Math.floor(raw));
  const local = raw - Math.floor(raw);
  const turnBase = smoothstep(local, 0.2, 0.88);

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

  const next = Math.min(n - 1, current + 1);
  const outgoing = batches[current];
  const incoming = batches[next];

  return (
    <div ref={pin} className="relative mt-4 h-[400vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-3 sm:px-6">
        <div className="relative mx-auto aspect-[1.05] w-full max-w-4xl">
          {CORNERS.map((corner, slot) => {
            const delay = slot * 0.08;
            const turn = Math.max(0, Math.min(1, (turnBase - delay) / 0.76));
            const outItem = outgoing.items[slot];
            const inItem = incoming.items[slot];
            if (!outItem) return null;
            return (
              <div key={corner.key} className={cn("absolute z-10 h-[38%] w-[42%]", corner.className)}>
                <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
                  <PageFace item={outItem} incoming={false} turn={current === next ? 0 : turn} />
                  {inItem && current !== next ? (
                    <PageFace item={inItem} incoming turn={current === next ? 0 : turn} />
                  ) : null}
                </div>
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 z-20 flex h-[8.75rem] w-[8.75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-water-deep/12 bg-white/82 px-3 text-center shadow-lift backdrop-blur-md sm:h-[11.5rem] sm:w-[11.5rem] sm:px-5">
            <p className="font-display text-[0.85rem] font-bold leading-tight tracking-tight text-water-deep sm:text-[1.05rem]">
              Products we sell
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-green sm:text-xs">
              {outgoing.label}
            </p>
            <div className="mt-2.5 flex items-center gap-1">
              {batches.map((b, i) => (
                <span
                  key={b.label}
                  className={cn(
                    "h-1.5 rounded-full bg-brand-green transition-[width,opacity] duration-500",
                    i === current ? "w-3.5 opacity-100" : "w-1.5 opacity-30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
