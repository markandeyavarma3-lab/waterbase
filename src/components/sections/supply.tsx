import fs from "fs";
import path from "path";
import Link from "next/link";
import { 
  Droplets, CloudRain, Filter, Gauge, Cpu, Workflow, 
  ArrowRight, Check, Waves, Layers, Leaf, Route, Box, Cable, CircleDashed 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { ProductCard } from "@/components/ui/product-card";

// Helper function to get images dynamically from the folder
function getProductImages(folderName: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public/products", folderName);
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir);
    const validExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
    return files
      .filter((file) => validExts.has(path.extname(file).toLowerCase()))
      .map((file) => `/products/${folderName}/${file}`);
  } catch (error) {
    return [];
  }
}

const categories = [
  { folder: "drip-irrigation", icon: Droplets, title: "Drip Irrigation Systems", desc: "Inline & online drippers, laterals, and complete drip systems." },
  { folder: "micro-mini-sprinklers", icon: CloudRain, title: "Micro & Mini Sprinklers", desc: "Low-volume sprinklers for nurseries and horticulture." },
  { folder: "sprinkler-irrigation", icon: CloudRain, title: "Sprinkler Irrigation", desc: "Overhead sprinkler systems for field crops." },
  { folder: "rainguns", icon: Waves, title: "Rainguns", desc: "High-discharge rainguns for large coverage areas." },
  { folder: "pvc-pipes", icon: Workflow, title: "PVC Pipes & Fittings", desc: "Durable PVC mains, sub-mains, and matching fittings." },
  { folder: "pe-pipes", icon: Route, title: "PE Pipes & Fittings", desc: "Flexible polyethylene pipes and compression fittings." },
  { folder: "hose-pipes", icon: Cable, title: "Hose Pipes & Fittings", desc: "Flexible hoses for portable and auxiliary watering." },
  { folder: "column-pipes", icon: CircleDashed, title: "Column Pipes & Fittings", desc: "High-strength pipes for submersible borewell pumps." },
  { folder: "casing-pipes", icon: Box, title: "Casing Pipes", desc: "Reliable casing pipes to protect borewells." },
  { folder: "motors-pumps", icon: Gauge, title: "Motors & Pumps", desc: "Submersible, monoblock, and open-well pumps." },
  { folder: "filters-dosing-injectors", icon: Filter, title: "Filters, Dosing Pump & Injectors", desc: "Screen, disc, sand filters and fertigation tools." },
  { folder: "starters-others", icon: Cpu, title: "Starters & Others", desc: "Pump starters, electrical panels, and automation." },
  { folder: "mulching-sheets", icon: Layers, title: "Mulching Sheets", desc: "Agricultural mulching films for weed control and moisture." },
  { folder: "planting-material", icon: Leaf, title: "Planting Material", desc: "High-quality seeds and saplings for optimal yield." },
];

const reach = ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"];
const brands = ["Jain Irrigation Systems", "KSB Pumps & Motors", "Netafim FlexNet"];

export function Supply() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading eyebrow="What we supply" title="The complete agricultural range" lead="Every component for your farm — from drip and sprinkler systems to pumps, pipes, and planting materials." action={<Button asChild variant="outline"><Link href="/products">Browse all products <ArrowRight /></Link></Button>} />

        <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const images = getProductImages(c.folder);
            return (
              <StaggerItem key={c.title}>
                <Link href="/products" className="block h-full">
                  <ProductCard
                    title={c.title}
                    description={c.desc}
                    iconSmall={<c.icon className="h-5 w-5" />}
                    images={images}
                  />
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <InteractiveCard className="h-full p-6">
              <h3 className="relative font-display text-lg font-semibold">Supplied across South India</h3>
              <p className="relative mt-1 text-sm text-muted-foreground">…and pan-India for bulk and project orders.</p>
              <div className="relative mt-4 flex flex-wrap gap-2">
                {reach.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/20 bg-brand-green-soft px-3 py-1.5 text-sm font-medium text-brand-green-dark"><Check className="h-3.5 w-3.5" /> {r}</span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-sun bg-brand-sun px-3 py-1.5 text-sm font-medium text-white"><Check className="h-3.5 w-3.5" /> Pan-India (bulk orders)</span>
              </div>
            </InteractiveCard>
          </Reveal>
          <Reveal delay={90} className="h-full">
            <InteractiveCard className="h-full p-6">
              <p className="relative text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Authorized dealer &amp; distributor</p>
              <h3 className="relative mt-2 font-display text-lg font-semibold">Genuine, warranty-backed brands</h3>
              <div className="relative mt-4 flex flex-wrap items-center gap-2">
                {brands.map((b) => (
                  <span key={b} className="rounded-lg border border-border bg-background px-3 py-2 font-display text-sm font-semibold text-foreground/80">{b}</span>
                ))}
                <span className="rounded-lg border border-dashed border-brand-green/40 px-3 py-2 text-sm font-semibold text-brand-green">+20 more</span>
              </div>
            </InteractiveCard>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
