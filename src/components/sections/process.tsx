"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Handshake, MapPin, Ruler, PencilRuler, FileText, Truck, Wrench, Settings, LifeBuoy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const steps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Handshake, title: "Client interaction", desc: "We learn your crop, land and goals." },
  { icon: MapPin, title: "Site visit", desc: "Our team assesses the land on-site." },
  { icon: Ruler, title: "Survey", desc: "Soil, water source and layout measured." },
  { icon: PencilRuler, title: "Design", desc: "A system designed for your land." },
  { icon: FileText, title: "Estimation", desc: "Clear, itemised quotation." },
  { icon: Truck, title: "Supply", desc: "Genuine products, delivered on time." },
  { icon: Wrench, title: "Installation", desc: "Installed and commissioned by experts." },
  { icon: Settings, title: "Maintenance", desc: "Scheduled servicing keeps it running." },
  { icon: LifeBuoy, title: "After-sales", desc: "Ongoing support, whenever you need it." },
];

/**
 * Card centres in % of the stage — a snake through three rows (1→3, 6←4, 7→9),
 * deliberately uneven so it reads as a path through a story rather than a grid.
 */
const POINTS: [number, number][] = [
  [17, 14], [50, 20], [83, 12],
  [82, 48], [50, 54], [18, 46],
  [18, 80], [51, 88], [84, 80],
];

/** Smooth curve through every point (Catmull-Rom → cubic Bézier), in a 1000×1000 box. */
function snakePath(pts: [number, number][]) {
  const p = pts.map(([x, y]) => [x * 10, y * 10]);
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/**
 * The nine steps as a story: cards float along a curved water pipe that
 * snakes through three rows. As you scroll, water fills the pipe, a drop rides
 * its leading edge, and each card rises in when the drop reaches it.
 *
 * One passive scroll listener, throttled to a frame. The fill and the drop are
 * written straight to the DOM; React re-renders only when another card is
 * reached (at most nine times).
 */
export function Process() {
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(0);
  const d = useMemo(() => snakePath(POINTS), []);

  useEffect(() => {
    const stage = stageRef.current;
    const fill = fillRef.current;
    const track = trackRef.current;
    const drop = dropRef.current;
    if (!stage || !fill || !track || !drop) return;

    // Measure on the track, which has no pathLength attribute: browsers disagree on
    // whether getPointAtLength honours pathLength, and Safari historically did.
    const total = track.getTotalLength();
    // Where along the pipe (0..1) each card sits.
    const SAMPLES = 600;
    const marks = POINTS.map(([x, y]) => {
      let best = 0;
      let bestDist = Infinity;
      for (let s = 0; s <= SAMPLES; s++) {
        const pt = track.getPointAtLength((s / SAMPLES) * total);
        const dist = (pt.x - x * 10) ** 2 + (pt.y - y * 10) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          best = s / SAMPLES;
        }
      }
      return best;
    });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paint = (p: number) => {
      fill.style.strokeDashoffset = String(1 - p);
      const pt = track.getPointAtLength(p * total);
      drop.style.left = `${pt.x / 10}%`;
      drop.style.top = `${pt.y / 10}%`;
      drop.style.opacity = p > 0.002 && p < 0.998 ? "1" : "0";
      const n = marks.filter((m) => p >= m - 0.015).length;
      setReached((prev) => (prev === n ? prev : n));
    };

    if (reduced) {
      const id = requestAnimationFrame(() => paint(1));
      return () => cancelAnimationFrame(id);
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts as the stage top passes 80% of the screen, finishes as its
      // bottom reaches 70% — the water keeps pace with the reader.
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.1)));
      paint(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stageRef} className="story-stage relative mx-auto mt-12 h-[42rem] max-w-5xl sm:h-[50rem] lg:h-[56rem]">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        {/* The empty pipe */}
        <path ref={trackRef} d={d} fill="none" stroke="#D3EBF8" strokeWidth={14} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {/* The water, revealed by scroll (pathLength=1 → dash offset is 0..1) */}
        <path
          ref={fillRef}
          d={d}
          pathLength={1}
          fill="none"
          stroke="url(#story-water)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray="1 1"
          strokeDashoffset={1}
          vectorEffect="non-scaling-stroke"
          className="story-water"
        />
        <defs>
          <linearGradient id="story-water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5BB8E8" />
            <stop offset="55%" stopColor="#3FA3DA" />
            <stop offset="100%" stopColor="#2E9466" />
          </linearGradient>
        </defs>
      </svg>

      {/* The drop riding the water's leading edge */}
      <span
        ref={dropRef}
        className="story-drop pointer-events-none absolute z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-0"
        aria-hidden="true"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-blue/40" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-brand-blue-light shadow-[0_0_14px_4px_rgba(63,163,218,0.55)] ring-2 ring-white" />
      </span>

      <ol>
        {steps.map((s, i) => {
          const Icon = s.icon;
          const on = i < reached;
          const current = i === reached - 1;
          return (
            <li
              key={s.title}
              className="story-card absolute z-10 w-[30%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${POINTS[i][0]}%`, top: `${POINTS[i][1]}%`, ["--i" as string]: i }}
              data-on={on || undefined}
            >
              <div
                className={cn(
                  "story-float rounded-2xl border bg-white p-3 text-center shadow-soft transition-[box-shadow,border-color] duration-500 sm:rounded-3xl sm:p-5",
                  current ? "border-brand-blue/50 shadow-[0_18px_40px_-14px_rgba(42,124,172,0.45)]" : "border-white/80"
                )}
              >
                <span
                  className={cn(
                    "relative mx-auto flex h-10 w-10 items-center justify-center rounded-full text-white ring-4 ring-white transition-colors duration-500 sm:h-12 sm:w-12",
                    on ? "bg-gradient-to-br from-brand-blue to-brand-green" : "bg-brand-blue-light"
                  )}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-water-deep text-[0.65rem] font-bold ring-2 ring-white sm:h-6 sm:w-6 sm:text-xs">
                    {i + 1}
                  </span>
                </span>
                <h4 className="mt-2.5 font-display text-[0.8rem] font-bold leading-tight text-heading sm:mt-3 sm:text-base">{s.title}</h4>
                <p className="mt-1 hidden text-sm leading-snug text-muted-foreground sm:block">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
