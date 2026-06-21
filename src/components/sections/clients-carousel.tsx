"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section, Container, SectionHeading } from "@/components/site/section";
import type { Logo } from "@/lib/logos";

const CARD_W = 224; // card width in px
const STEP = 256; // card width + gap
const DURATION = 560; // transition ms
const INTERVAL = 1800; // ms between advances

export function ClientsCarousel({ clients }: { clients: Logo[] }) {
  const n = clients.length;
  // Tripled so we can loop infinitely without a visible rewind.
  const items = n > 0 ? [...clients, ...clients, ...clients] : [];

  const [active, setActive] = useState(n); // start inside the middle copy
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);

  // Measure container width so we can centre the active card precisely.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setCw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-advance.
  useEffect(() => {
    if (n <= 1 || paused) return;
    const id = setInterval(() => setActive((a) => a + 1), INTERVAL);
    return () => clearInterval(id);
  }, [n, paused]);

  // When we slide past the middle copy, jump back by one copy with no transition.
  useEffect(() => {
    if (n <= 1) return;
    if (active >= 2 * n) {
      const t = setTimeout(() => {
        setAnimate(false);
        setActive((a) => a - n);
      }, DURATION + 20);
      return () => clearTimeout(t);
    }
  }, [active, n]);

  // Re-enable the transition the frame after a silent jump.
  useEffect(() => {
    if (!animate) {
      const r = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(r);
    }
  }, [animate]);

  if (n === 0) return null;

  const offset = cw / 2 - (active * STEP + CARD_W / 2);

  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our work"
          title="Companies we've delivered for"
          lead="Irrigation and water-management projects completed on time — and backed by years of after-sales support, with not a single complaint to date."
        />
      </Container>

      <div
        ref={wrapRef}
        className="relative mt-12 overflow-hidden py-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-40" aria-hidden="true" />

        <div
          className="flex"
          style={{
            transform: `translateX(${offset}px)`,
            transition: animate ? `transform ${DURATION}ms cubic-bezier(0.16,1,0.3,1)` : "none",
            opacity: cw ? 1 : 0,
          }}
        >
          {items.map((c, i) => {
            const isActive = i === active;
            return (
              <div key={i} className="shrink-0" style={{ width: CARD_W, marginRight: STEP - CARD_W }}>
                <div
                  className={
                    "flex flex-col items-center rounded-2xl border bg-card px-6 py-7 transition-all duration-500 ease-out-expo " +
                    (isActive
                      ? "scale-100 border-brand-green/30 opacity-100 shadow-lift"
                      : "scale-[0.82] border-border opacity-40 shadow-soft grayscale")
                  }
                >
                  <div className="relative h-16 w-full">
                    <Image src={c.src} alt={c.name} fill sizes="200px" unoptimized className="object-contain" />
                  </div>
                  <p className={"mt-4 text-center text-sm font-semibold transition-colors " + (isActive ? "text-foreground" : "text-muted-foreground")}>
                    {c.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
