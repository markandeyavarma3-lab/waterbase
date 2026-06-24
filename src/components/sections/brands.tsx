import { Reveal } from "@/components/sections/reveal";
import { Eyebrow } from "@/components/site/section";

const brands = ["Jain Irrigation Systems", "KSB Pumps & Motors", "Netafim FlexNet"];

export function Brands() {
  return (
    <section className="border-y border-border bg-brand-green-soft/40">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <Reveal>
          <Eyebrow align="center">Authorized Dealer &amp; Distributor</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">Trusted, genuine brands</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {brands.map((b, i) => (
            <Reveal key={b} delay={i * 80}>
              <div className="rounded-lg border border-border bg-card px-6 py-4 font-display text-base font-bold text-foreground/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/40 hover:text-brand-green hover:shadow-md">
                {b}
              </div>
            </Reveal>
          ))}
          <Reveal delay={brands.length * 80}>
            <div className="rounded-lg border border-dashed border-brand-green/40 bg-card px-6 py-4 text-base font-semibold text-brand-green transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-soft">
              + 20 more leading brands
            </div>
          </Reveal>
        </div>
        <Reveal delay={(brands.length + 1) * 80}>
          <p className="mt-6 text-sm text-muted-foreground">Genuine products, full warranty support, and expert guidance on the right system for your needs.</p>
        </Reveal>
      </div>
    </section>
  );
}