import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";

const crops = [
  { name: "Banana", emoji: "🍌" },
  { name: "Coconut", emoji: "🥥" },
  { name: "Oil Palm", emoji: "🌴" },
  { name: "Cocoa", emoji: "🍫" },
  { name: "Lemon", emoji: "🍋" },
  { name: "Guava", emoji: "🍈" },
  { name: "Papaya", emoji: "🫐" },
  { name: "Dragon Fruit", emoji: "🐉" },
  { name: "Maize", emoji: "🌽" },
  { name: "Vegetables", emoji: "🥦" },
  { name: "Flowers", emoji: "🌸" },
  { name: "Plantations", emoji: "🌳" },
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
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {crops.map((c, i) => (
            <Reveal key={c.name} delay={i * 50}>
              <Link
                href="/crops"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-lift"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-soft text-2xl transition-transform duration-300 ease-out-expo group-hover:scale-110">
                  {c.emoji}
                </span>
                <span className="text-sm font-semibold transition-colors group-hover:text-brand-green">{c.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
