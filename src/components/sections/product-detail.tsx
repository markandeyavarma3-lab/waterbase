import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/site-config";

export type Variant = { icon: LucideIcon; name: string; type: string; spec?: string; bestFor: string };

/** One product type with an "Ask price on WhatsApp" link pre-filled with its name. */
export function AskPriceCard({ v, context }: { v: Variant; context: string }) {
  const message = `Hello Waterbase Technologies, I'd like the price and availability of ${v.name} (${context}).\n\nMy requirement is: `;
  return (
    <div className="surface-card card-lift group flex h-full flex-col rounded-3xl p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
          <v.icon className="h-6 w-6" aria-hidden="true" />
        </span>
        {v.spec ? (
          <span className="rounded-full bg-brand-green-soft px-3 py-1 text-right text-xs font-semibold text-brand-green-dark">{v.spec}</span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{v.name}</h3>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-brand-green">{v.type}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{v.bestFor}</p>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-brand-green/30 bg-white px-4 py-2 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-brand-green hover:text-white"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Ask price on WhatsApp
      </a>
    </div>
  );
}

export type ProductDetailData = {
  parent: { href: string; label: string };
  image: string;
  imageAlt: string;
  specsTitle: string;
  specsLead: string;
  specs: [string, string][];
  variantsTitle: string;
  variantsLead: string;
  variants: Variant[];
  context: string;
  usesTitle: string;
  uses: string[];
  source: string;
};

/** Specs, product types and uses for a product sub-page (fills LandingPageTemplate's productsSlot). */
export function ProductDetail({ d }: { d: ProductDetailData }) {
  return (
    <>
      <Section tone="sky">
        <Container>
          <Link href={d.parent.href} className="tap-target-y inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {d.parent.label}
          </Link>
          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading eyebrow="Key specifications" title={d.specsTitle} lead={d.specsLead} />
              <Reveal>
                <dl className="mt-8 divide-y divide-water-deep/8 overflow-hidden rounded-3xl border border-white/80 bg-white shadow-soft">
                  {d.specs.map(([k, v]) => (
                    <div key={k} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                      <dt className="text-sm font-semibold text-water-deep">{k}</dt>
                      <dd className="text-sm text-muted-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift lg:mt-24">
                <Image src={d.image} alt={d.imageAlt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="field">
        <Container>
          <SectionHeading eyebrow="What we supply" title={d.variantsTitle} lead={d.variantsLead} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.variants.map((v, i) => (
              <Reveal key={v.name} delay={i * 50}>
                <AskPriceCard v={v} context={d.context} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-lg font-bold">{d.usesTitle}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.uses.map((u) => (
                  <li key={u} className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/20 bg-brand-green-soft px-3.5 py-1.5 text-sm font-medium text-brand-green-dark">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> {u}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <p className="mt-6 text-center text-xs text-muted-foreground">{d.source}</p>
        </Container>
      </Section>
    </>
  );
}
