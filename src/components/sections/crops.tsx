import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";

const crops = [
  "Banana", "Coconut", "Oil Palm", "Cocoa", "Lemon", "Guava",
  "Papaya", "Dragon Fruit", "Maize", "Vegetables", "Flowers", "Plantations",
];

export function Crops() {
  return (
    <section className="border-y border-border bg-brand-green-soft/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Crop solutions</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Irrigation tailored to your crop</h2>
              <p className="mt-3 text-muted-foreground">Every crop has different water needs. We design systems matched to what you grow — for higher yield and lower water use.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/crops">View all crops <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {crops.map((c, i) => (
            <Reveal key={c} delay={i * 50}>
              <Link href="/crops" className="group flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/50 hover:text-brand-green hover:shadow-md">
                <Leaf className="h-4 w-4 shrink-0 text-brand-green transition-transform duration-300 group-hover:scale-110" />
                {c}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}