import fs from "fs";
import path from "path";
import { 
  Droplets, CloudRain, Filter, Gauge, Cpu, Workflow, 
  Waves, Layers, Leaf, Route, Box, Cable, CircleDashed 
} from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
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

const categoryGroups = [
  {
    title: "Micro Irrigation & Watering",
    items: [
      { folder: "drip-irrigation", icon: Droplets, title: "Drip Irrigation Systems", desc: "Inline & online drippers, laterals, and complete drip systems." },
      { folder: "micro-mini-sprinklers", icon: CloudRain, title: "Micro & Mini Sprinklers", desc: "Low-volume sprinklers for nurseries and horticulture." },
      { folder: "sprinkler-irrigation", icon: CloudRain, title: "Sprinkler Irrigation", desc: "Overhead sprinkler systems for field crops." },
      { folder: "rainguns", icon: Waves, title: "Rainguns", desc: "High-discharge rainguns for large coverage areas." },
      { folder: "filters-dosing-injectors", icon: Filter, title: "Filters, Dosing Pump & Injectors", desc: "Screen, disc, sand filters and fertigation tools." },
    ]
  },
  {
    title: "Pipes & Fittings",
    items: [
      { folder: "pvc-pipes", icon: Workflow, title: "PVC Pipes & Fittings", desc: "Durable PVC mains, sub-mains, and matching fittings." },
      { folder: "pe-pipes", icon: Route, title: "PE Pipes & Fittings", desc: "Flexible polyethylene pipes and compression fittings." },
      { folder: "hose-pipes", icon: Cable, title: "Hose Pipes & Fittings", desc: "PE / HDPE hose and coiled pipe for portable and auxiliary watering." },
      { folder: "column-pipes", icon: CircleDashed, title: "Column Pipes & Fittings", desc: "High-strength pipes for submersible borewell pumps." },
      { folder: "casing-pipes", icon: Box, title: "Casing Pipes", desc: "Reliable casing pipes to protect borewells." },
    ]
  },
  {
    title: "Pumps & Automation",
    items: [
      { folder: "motors-pumps", icon: Gauge, title: "Motors & Pumps", desc: "Submersible, monoblock, and open-well pumps." },
      { folder: "starters-others", icon: Cpu, title: "Starters & Others", desc: "Pump starters, electrical panels, and automation." },
    ]
  },
  {
    title: "Farm Essentials",
    items: [
      { folder: "mulching-sheets", icon: Layers, title: "Mulching Sheets & Weed Mats", desc: "Agricultural mulching films for weed control and moisture." },
      { folder: "planting-material", icon: Leaf, title: "Planting Material", desc: "High-quality seeds and saplings for optimal yield." },
    ]
  }
];

export function ProductCategories() {
  return (
    <Section tone="field">
      <Container>
        <SectionHeading
          eyebrow="Micro Irrigation"
          title="Our complete product range"
          lead="From a single dripper to turnkey micro-irrigation projects — everything we supply, design and install, all under one roof from 20+ trusted brands."
        />

        <div className="mt-12 space-y-24">
          {categoryGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-8 font-display text-2xl font-bold text-foreground">{group.title}</h2>
              <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((c) => {
                  const images = getProductImages(c.folder);
                  return (
                    <StaggerItem key={c.title} className="h-full">
                      <ProductCard
                        title={c.title}
                        description={c.desc}
                        iconSmall={<c.icon className="h-5 w-5" />}
                        images={images}
                      />
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
