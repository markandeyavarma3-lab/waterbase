"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, LayoutGrid, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { ProductCompass, type CompassBatch } from "@/components/sections/product-compass";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

/**
 * The compass shows the catalogue in four batches of four. The categories come
 * from lib/products.ts — the same list /products renders — so a title or
 * description can only ever be edited in one place. Batches are picked by
 * folder rather than by array position, so reordering the catalogue can never
 * silently move a product into the wrong batch.
 */
function pick(...folders: string[]): ProductCategory[] {
  return folders.map((folder) => {
    const c = PRODUCT_CATEGORIES.find((x) => x.folder === folder);
    if (!c) throw new Error(`supply.tsx: unknown product folder "${folder}"`);
    return c;
  });
}

const batches: CompassBatch[] = [
  {
    label: "Irrigation",
    items: pick("drip-irrigation", "micro-mini-sprinklers", "sprinkler-irrigation", "rainguns"),
  },
  {
    label: "Pipes & fittings",
    items: pick("pvc-pipes", "pe-pipes", "hose-pipes", "column-pipes"),
  },
  {
    label: "Pumps & control",
    items: pick("casing-pipes", "motors-pumps", "filters-dosing-injectors", "starters-others"),
  },
  {
    label: "Farm essentials",
    items: [
      ...pick("mulching-sheets", "planting-material"),
      { icon: Package, title: "Bulk & project supply", desc: "Volume orders for estates, contractors and commercial sites." },
      { icon: LayoutGrid, title: "Full product catalogue", desc: "Every line we stock — open the products page." },
    ],
  },
];

// Both already live in site-config; they were hand-copied here.
const reach = siteConfig.areasServed;
const brands = siteConfig.brandPartners;

export function Supply() {
  return (
    <Section tone="soil" className="overflow-visible">
      <Container>
        <SectionHeading eyebrow="What we supply" title="The complete agricultural range" lead="Every component for your farm — from drip and sprinkler systems to pumps, pipes, and planting materials." action={<Button asChild variant="outline"><Link href="/products">Browse all products <ArrowRight /></Link></Button>} />

        <Reveal delay={40}>
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-border shadow-lift">
            <Image
              src="/images/irrigation-product-range.jpg"
              alt="Complete irrigation product range — borewell motor and pump, casing and HDPE pipe, starters and electrical equipment, filters and dosing pumps, PVC pipes, drip, sprinkler, raingun, foggers and landscape irrigation"
              width={1672}
              height={941}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 1152px, 100vw"
              priority={false}
            />
          </div>
        </Reveal>
      </Container>

      <ProductCompass batches={batches} />

      <Container>
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
