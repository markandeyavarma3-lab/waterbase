import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";
import { CropCard } from "@/components/sections/crop-card";
import { listLogos } from "@/lib/logos";

const cropNames = [
  // First 8 are featured on the homepage (these have photos)
  "Banana", "Coconut", "Oil Palm", "Cocoa", "Lemon", "Guava", "Papaya", "Dragon Fruit",
  // The rest appear on the "View all crops" page
  "Watermelon", "Muskmelon", "Chilli", "Maize", "Sugarcane", "Paddy",
  "Tomato", "Mango", "Turmeric", "Vegetables", "Flowers", "Plantations",
];

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export function Crops({ limit }: { limit?: number }) {
  // Each crop's photos live in /public/crops/<slug>/ — drop images there.
  const names = limit ? cropNames.slice(0, limit) : cropNames;
  const crops = names.map((name) => ({
    name,
    images: listLogos(`crops/${slug(name)}`).map((l) => l.src),
  }));

  return (
    <section className="border-y border-border bg-brand-soil-soft/50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Crop solutions</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Irrigation tailored to your crop</h2>
              <p className="mt-3 text-muted-foreground">Every crop has different water needs. We design systems matched to what you grow — for higher yield and lower water use.</p>
            </div>
            {limit ? (
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/crops">View all crops <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            ) : null}
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {crops.map((c, i) => (
            <Reveal key={c.name} delay={i * 50} className="h-full">
              <CropCard name={c.name} images={c.images} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
