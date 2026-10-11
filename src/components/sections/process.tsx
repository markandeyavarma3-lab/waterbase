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
 * Card centres in % of the stage: four rows of 2 · 3 · 2 · 2, snaking
 * left→right, right→left, and so on. Slightly uneven heights so it reads as a
 * story path, not a grid. `wide` cards sit in two-card rows and get more room.
 */
const LAYOUT: { x: number; y: number; wide: boolean }[] = [
  { x: 27, y: 9, wide: true }, { x: 73, y: 12, wide: true },
  { x: 84, y: 35, wide: false }, { x: 50, y: 39, wide: false }, { x: 16, y: 34, wide: false },
  { x: 28, y: 61, wide: true }, { x: 72, y: 64, wide: true },
  { x: 71, y: 88, wide: true }, { x: 29, y: 91, wide: true },
];

/** Smooth curve through every point (Catmull-Rom → cubic Bézier), in a 1000×1000 box. */
function snakePath(pts: { x: number; y: number }[]) {
  const p = pts.map(({ x, y }) => [x * 10, y * 10]);
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
 * The nine steps as a story. Water fills a curved pipe as you scroll, eased so
 * it glides rather than jumping with the wheel; a light shimmer runs through
 * the water, a glowing drop rides its front, and each card springs in with a
 * ripple when the drop reaches it.
 *
 * Scroll only sets a target. A short rAF loop eases the shown value toward it
 * and stops once it arrives, so nothing runs while the page is still. The fill,
 * mask and drop are written straight to the DOM; React re-renders only when
 * another card is reached (at most nine times).
 */
export function Process() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(0);
  const d = useMemo(() => snakePath(LAYOUT), []);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const mask = maskRef.current;
    const drop = dropRef.current;
    if (!stage || !track || !fill || !mask || !drop) return;

    // Measured on the track, which has no pathLength attribute: browsers
    // disagree on whether getPointAtLength honours pathLength.
    const total = track.getTotalLength();
    const SAMPLES = 600;
    const marks = LAYOUT.map(({ x, y }) => {
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

    let W = stage.offsetWidth;
    let H = stage.offsetHeight;
    const paint = (p: number) => {
      const off = String(1 - p);
      fill.style.strokeDashoffset = off;
      mask.style.strokeDashoffset = off;
      const pt = track.getPointAtLength(p * total);
      drop.style.transform = `translate3d(${(pt.x / 1000) * W}px, ${(pt.y / 1000) * H}px, 0) translate(-50%, -50%)`;
      drop.style.opacity = p > 0.003 && p < 0.997 ? "1" : "0";
      const n = marks.filter((m) => p >= m - 0.012).length;
      setReached((prev) => (prev === n ? prev : n));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => paint(1));
      return () => cancelAnimationFrame(id);
    }

    let target = 0;
    let shown = 0;
    let frame = 0;

    const readTarget = () => {
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts as the stage top passes 85% of the screen; done as its bottom reaches 70%.
      target = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.15)));
    };

    const tick = () => {
      shown += (target - shown) * 0.1;
      if (Math.abs(target - shown) < 0.0008) shown = target;
      paint(shown);
      frame = shown === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      W = stage.offsetWidth;
      H = stage.offsetHeight;
      readTarget();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="story-stage relative mx-auto mt-12 h-[52rem] max-w-5xl sm:h-[60rem] lg:h-[66rem]"
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="story-water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7BC8EC" />
            <stop offset="50%" stopColor="#3FA3DA" />
            <stop offset="100%" stopColor="#2E9466" />
          </linearGradient>
          {/* Only the filled part of the pipe may shimmer. */}
          <mask id="story-mask" maskUnits="userSpaceOnUse" x="-50" y="-50" width="1100" height="1100">
            <path
              ref={maskRef}
              d={d}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth={12}
              strokeLinecap="round"
              strokeDasharray="1 1"
              strokeDashoffset={1}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
        </defs>

        {/* The empty pipe, with a soft outer glow */}
        <path d={d} fill="none" stroke="#E3F2FA" strokeWidth={22} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path ref={trackRef} d={d} fill="none" stroke="#C9E5F5" strokeWidth={12} strokeLinecap="round" vectorEffect="non-scaling-stroke" />

        {/* The water, revealed by scroll (pathLength=1 → dash offset runs 1..0) */}
        <path
          ref={fillRef}
          d={d}
          pathLength={1}
          fill="none"
          stroke="url(#story-water)"
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray="1 1"
          strokeDashoffset={1}
          vectorEffect="non-scaling-stroke"
        />
        {/* Light running through the water */}
        <path
          d={d}
          pathLength={1}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.75}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="0.01 0.035"
          vectorEffect="non-scaling-stroke"
          mask="url(#story-mask)"
          className="story-shimmer"
        />
      </svg>

      {/* The drop riding the water's leading edge, moved by transform only. It sits
          under the cards, so it slips behind them like water through a pipe. */}
      <span
        ref={dropRef}
        className="story-drop pointer-events-none absolute left-0 top-0 z-[5] h-6 w-6 opacity-0"
        aria-hidden="true"
      >
        <span className="absolute -inset-2 animate-ping rounded-full bg-brand-blue/30" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-brand-blue-light shadow-[0_0_18px_6px_rgba(63,163,218,0.5)] ring-2 ring-white" />
      </span>

      <ol>
        {steps.map((s, i) => {
          const Icon = s.icon;
          const { x, y, wide } = LAYOUT[i];
          const on = i < reached;
          const current = i === reached - 1;
          return (
            <li
              key={s.title}
              className={cn(
                "story-card absolute z-10 -translate-x-1/2 -translate-y-1/2",
                wide ? "w-[40%] max-w-[18rem]" : "w-[30%] max-w-[15rem]"
              )}
              style={{ left: `${x}%`, top: `${y}%`, ["--i" as string]: i, ["--tilt" as string]: i % 2 ? "3deg" : "-3deg" }}
              data-on={on || undefined}
              data-current={current || undefined}
            >
              <span className="story-ripple pointer-events-none absolute inset-0 rounded-3xl" aria-hidden="true" />
              <div className="story-float relative rounded-2xl border border-white/80 bg-white p-3 text-center shadow-soft sm:rounded-3xl sm:p-5">
                <span className="story-icon relative mx-auto flex h-10 w-10 items-center justify-center rounded-full text-white ring-4 ring-white sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  <span className="story-num absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] font-bold text-white ring-2 ring-white sm:h-6 sm:w-6 sm:text-xs">
                    {i + 1}
                  </span>
                </span>
                <h4 className="mt-2.5 font-display text-[0.8rem] font-bold leading-tight text-heading sm:mt-3 sm:text-base">{s.title}</h4>
                <p className={cn("mt-1 text-muted-foreground", wide ? "text-[0.7rem] leading-snug sm:text-sm" : "hidden text-sm leading-snug sm:block")}>{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
