"use client";

import { Star } from "lucide-react";

const testimonials = [
  { quote: "They surveyed our 50-acre banana farm, designed the entire drip layout and installed it on time. Water use dropped and yield improved noticeably in the first season.", name: "Ravi Kumar", role: "Banana farmer · West Godavari" },
  { quote: "Handled our APMIP subsidy application end to end — documents, field visit coordination, everything. Very professional and saved us weeks of effort.", name: "Srinivasa Rao", role: "Micro-irrigation beneficiary · Eluru" },
  { quote: "We needed sprinklers for a 3-acre corporate lawn at our campus. The Waterbase team designed, installed and handed it over fully working within a week.", name: "Prasad Reddy", role: "Facility manager · Hyderabad" },
  { quote: "Genuine Jain products, competitive pricing. The installation team was disciplined and the drip system has been running without issues for two years.", name: "Venkata Rao", role: "Sugarcane grower · Krishna District" },
  { quote: "My nursery at Kadiyam needed a precise misting and drip setup. The design they gave fits our plant density perfectly. Excellent technical knowledge.", name: "Lakshmi Devi", role: "Nursery owner · Kadiyam" },
  { quote: "They advised us on the right filter setup for our borewell water quality. No emitter clogging since installation. Worth every rupee.", name: "Suresh Babu", role: "Horticulture farmer · Vijayawada" },
  { quote: "The APMIP process seemed complicated but their team knew every step. We got the sanction order in 45 days and installation was done within a week after that.", name: "Chandra Sekhar", role: "Paddy & horticulture farmer · Narsapur" },
  { quote: "Waterbase supplied us pipes and fittings for a large borewell project. Genuine ISI-marked material, delivered fast, contractor pricing on bulk. Highly recommended.", name: "Kishore Varma", role: "Civil contractor · Eluru" },
];

const row1 = [...testimonials.slice(0, 5), ...testimonials.slice(0, 5)];
const row2 = [...testimonials.slice(3), ...testimonials.slice(3)];

function Card({ t }: { t: typeof testimonials[number] }) {
  return (
    <figure className="w-80 shrink-0 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-foreground/85 line-clamp-4">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 border-t border-border pt-3">
        <p className="text-sm font-semibold">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.role}</p>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="overflow-hidden border-y border-border bg-brand-green-soft/30 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Testimonials</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Trusted by farmers &amp; businesses</h2>
        <p className="mt-3 text-muted-foreground">From smallholder farms to corporate campuses across South India.</p>
      </div>

      <div className="relative mt-12 space-y-4">
        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f0f7f3] to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f0f7f3] to-transparent" aria-hidden="true" />

        {/* Row 1 — scrolls left */}
        <div className="group flex gap-4 overflow-hidden">
          <div
            className="flex gap-4 group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee-left 40s linear infinite" }}
          >
            {row1.map((t, i) => <Card key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="group flex gap-4 overflow-hidden">
          <div
            className="flex gap-4 group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee-right 36s linear infinite" }}
          >
            {row2.map((t, i) => <Card key={i} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
