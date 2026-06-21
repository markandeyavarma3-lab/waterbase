"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { MediaSlot } from "@/components/site/media-slot";
import { Reveal } from "@/components/sections/reveal";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Farm", "APMIP", "Corporate", "Nursery"];

const projects = [
  { category: "Farm", title: "50-acre banana drip system", location: "West Godavari, AP", area: "50 acres", img: "/images/projects/banana-drip.jpg" },
  { category: "APMIP", title: "Subsidy-assisted micro irrigation", location: "Eluru District, AP", area: "120 acres", img: "/images/projects/apmip-micro.jpg" },
  { category: "Corporate", title: "Campus landscape irrigation", location: "Hyderabad, Telangana", area: "8 acres", img: "/images/projects/campus-landscape.jpg" },
  { category: "Nursery", title: "Poly-house mist & drip system", location: "Kadiyam, AP", area: "3 acres", img: "/images/projects/nursery-drip.jpg" },
  { category: "Farm", title: "Chilli crop drip installation", location: "Bhimavaram, AP", area: "35 acres", img: "/images/projects/chilli-drip.jpg" },
  { category: "APMIP", title: "Paddy sprinkler project", location: "Narsapur, AP", area: "85 acres", img: "/images/projects/paddy-sprinkler.jpg" },
];

export function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <Section tone="default">
      <Container>
        <SectionHeading eyebrow="Portfolio" title="Work we're proud of" lead="From smallholder farms to large commercial developments across South India — 25+ years of irrigation projects." />

        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                active === cat
                  ? "border-brand-green bg-brand-green text-white shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-brand-green/40 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift">
                <div className="relative overflow-hidden">
                  <div className="transition-transform duration-500 ease-out-expo group-hover:scale-105">
                    <MediaSlot src={p.img} alt={p.title} ratio="video" label="Project photo" sizes="(min-width: 1200px) 33vw, (min-width: 640px) 50vw, 100vw" className="rounded-none border-0" />
                  </div>
                  <span className="absolute bottom-3 left-3 rounded-full bg-brand-green-deep/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{p.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-brand-green">{p.title}</h3>
                  <div className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {p.location}</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">{p.area}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
