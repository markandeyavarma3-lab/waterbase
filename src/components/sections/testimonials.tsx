"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { AuroraGlow } from "@/components/site/aurora-glow";

// No fabricated reviews — add real customer testimonials here (with their
// permission) to bring this section back. Until then it renders nothing.
type Testimonial = { quote: string; name: string; role: string; rating: number };
const testimonials: Testimonial[] = [];

const row1 = [...testimonials.slice(0, 5), ...testimonials.slice(0, 5)];
const row2 = [...testimonials.slice(3), ...testimonials.slice(3)];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 text-amber-400/30" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      })}
      <span className="ml-1 text-xs font-semibold text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

function Card({ t }: { t: typeof testimonials[number] }) {
  // min(20rem,85vw): a flat w-80 is exactly a 320px phone's full width, which
  // would leave the card edge-to-edge once real testimonials are added.
  return (
    <figure className="w-[min(20rem,85vw)] shrink-0 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <Stars rating={t.rating} />
      <blockquote className="mt-3 text-sm leading-relaxed text-foreground/85 line-clamp-4">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 border-t border-border pt-3">
        <p className="text-sm font-semibold">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.role}</p>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ items, direction, duration }: { items: typeof testimonials; direction: "left" | "right"; duration: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [minX, setMinX] = useState(-800);

  useEffect(() => {
    if (ref.current) setMinX(-(ref.current.scrollWidth / 2));
  }, []);

  return (
    <div className="group flex gap-4 overflow-hidden">
      <motion.div
        ref={ref}
        className="motion-marquee flex cursor-grab gap-4 group-hover:[animation-play-state:paused] active:cursor-grabbing"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: dragging ? "paused" : undefined,
        }}
        drag="x"
        dragConstraints={{ left: minX, right: 0 }}
        dragElastic={0.15}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        {items.map((t, i) => <Card key={i} t={t} />)}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden border-y border-border tint-wash-brand-soft py-20">
      <AuroraGlow variant="field" />
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Testimonials</p>
        <h2 className="mt-3 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-bold tracking-tight">Trusted by farmers &amp; businesses</h2>
        <p className="mt-3 text-muted-foreground">From smallholder farms to corporate campuses across South India. Drag a row to browse at your own pace.</p>
      </div>

      <div className="relative mt-12 space-y-4">
        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />

        <MarqueeRow items={row1} direction="left" duration={65} />
        <MarqueeRow items={row2} direction="right" duration={58} />
      </div>
    </section>
  );
}
