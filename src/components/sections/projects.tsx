import { MapPin } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { MediaSlot } from "@/components/site/media-slot";
import { Reveal } from "@/components/sections/reveal";

// Drop real photos at /public/images/projects/<file>.jpg (landscape ~1200x675).
const projects = [
  { category: "Farm project", title: "50-acre banana drip irrigation", location: "West Godavari, AP", area: "50 acres", img: "/images/projects/banana-drip.jpg" },
  { category: "APMIP project", title: "Subsidy-assisted micro irrigation", location: "Eluru District, AP", area: "120 acres", img: "/images/projects/apmip-micro.jpg" },
  { category: "Corporate", title: "Campus landscape irrigation", location: "Hyderabad, Telangana", area: "8 acres", img: "/images/projects/campus-landscape.jpg" },
];

export function Projects() {
  return (
    <Section tone="default">
      <Container>
        <SectionHeading eyebrow="Projects" title="Work we're proud of" lead="From smallholder farms to large commercial developments across South India." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift">
                <div className="relative">
                  <MediaSlot src={p.img} alt={p.title} ratio="video" label="Project photo" sizes="(min-width: 768px) 33vw, 100vw" className="rounded-none border-0" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-green-dark backdrop-blur">{p.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-brand-green">{p.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {p.location}</span>
                    <span className="font-medium text-foreground">{p.area}</span>
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