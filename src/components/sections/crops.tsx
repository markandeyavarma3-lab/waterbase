import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";
import { CropsGrid, CropsHoneycomb } from "@/components/sections/crops-grid";
import { listLogos } from "@/lib/logos";
import { whatsappLink } from "@/lib/site-config";

// Crops we have photos for — order matters (first 8 are featured on the homepage).
const cropNames = [
  "Banana", "Coconut", "Oil Palm", "Cocoa", "Lemon", "Sweet Lime", "Guava", "Papaya",
  "Dragon Fruit", "Watermelon", "Muskmelon", "Mango", "Chilli", "Tomato", "Maize", "Groundnut",
  "Sugarcane", "Paddy", "Turmeric", "Cotton", "Oilseeds", "Spices", "Orchards",
];

// Shown as text on the full page — crops we serve but don't have photos for yet.
// Vegetables / flowers / plantations are filled in Phase 4 (separate PR).
const MORE = [
  "All vegetables", "All flowers", "Plantation crops",
];

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export function Crops({ limit }: { limit?: number }) {
  // Only show crops that actually have photos in /public/crops/<slug>/.
  const all = cropNames
    .map((name) => ({ name, images: listLogos(`crops/${slug(name)}`).map((l) => l.src) }))
    .filter((c) => c.images.length > 0);
  const crops = limit ? all.slice(0, limit) : all;

  return (
    <section className="border-y border-border tint-wash-field">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Crop solutions</p>
              <h2 className="mt-2 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-extrabold tracking-tight">Irrigation tailored to your crop</h2>
              <p className="mt-3 text-muted-foreground">Every crop has different water needs. We design systems matched to what you grow — for higher yield and lower water use.</p>
            </div>
            {limit ? (
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/crops">View all crops <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            ) : null}
          </div>
        </Reveal>

        {limit ? <CropsHoneycomb crops={crops} /> : <CropsGrid crops={crops} />}

        {limit ? (
          <Reveal>
            <div className="mt-10 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/crops">View all crops <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
        ) : null}

        {!limit && (
          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card p-7 text-center shadow-soft sm:p-9">
              <h3 className="font-display text-xl font-bold md:text-2xl">…and many more</h3>
              <p className="mt-2 text-sm text-muted-foreground">We design irrigation for far more than the crops above — including:</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {MORE.map((m) => (
                  <span key={m} className="rounded-full border border-brand-green/20 bg-brand-green-soft px-3.5 py-1.5 text-sm font-medium text-brand-green-dark">{m}</span>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Growing something else?{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-green hover:underline">Message us</a>{" "}
                — we&apos;ll design a system for your crop.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
