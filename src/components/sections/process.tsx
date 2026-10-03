"use client";

import { useEffect, useRef, useState } from "react";
import { Handshake, MapPin, Ruler, PencilRuler, FileText, Truck, Wrench, Settings, LifeBuoy, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
 * Nine steps on one horizontal water line. When the row scrolls into view the
 * line fills left to right and the nodes pop in one after another (CSS, driven
 * by a single `data-shown` flag). On phones the row swipes sideways.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative mt-12">
      <div
        ref={ref}
        data-shown={shown || undefined}
        onScroll={() => !swiped && setSwiped(true)}
        className="timeline scroll-touch -mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-4 lg:mx-0 lg:overflow-visible lg:px-0"
      >
        <ol className="relative grid w-max grid-cols-[repeat(9,9.5rem)] gap-x-2 lg:w-full lg:grid-cols-9">
          {/* The water line, behind the nodes at their centre height. */}
          <span className="timeline-track absolute left-[4.75rem] right-[4.75rem] top-7 h-1.5 rounded-full bg-brand-blue-soft lg:left-[5.5%] lg:right-[5.5%]" aria-hidden="true">
            <span className="timeline-fill process-canal-water absolute inset-0 rounded-full" />
          </span>

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="timeline-step relative snap-start text-center" style={{ ["--i" as string]: i }}>
                <span className="process-node relative mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lift ring-4 ring-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="process-node-badge absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-[0.7rem] font-bold ring-2 ring-white">
                    {i + 1}
                  </span>
                </span>
                <h4 className="mt-4 px-1 font-display text-sm font-bold leading-snug text-heading sm:text-base">{s.title}</h4>
                <p className="mt-1.5 px-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{s.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <p
        className="timeline-hint mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-green transition-opacity duration-500 lg:hidden"
        style={{ opacity: swiped ? 0 : 1 }}
        aria-hidden="true"
      >
        Swipe to see all 9 steps <ArrowRight className="h-3.5 w-3.5" />
      </p>
    </div>
  );
}
