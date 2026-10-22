import Image from "next/image";
import {
  ArrowUpFromLine, Waves, Gauge, Sun, Tractor, Cable,
  Home, Droplet, Building2, ShowerHead, Car, ArrowDownToLine, Sprout, Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { PumpIcon } from "@/components/icons/irrigation-icons";
import { whatsappLink } from "@/lib/site-config";

type Series = { icon: LucideIcon; name: string; type: string; spec?: string; bestFor: string };

/**
 * KSB pump series grouped by use, from KSB India's published product range
 * (ksbindia.in). Copy is our own; specs are the headline figures KSB lists.
 * Availability and pricing are confirmed per enquiry, so every card asks on WhatsApp.
 */
const AGRICULTURAL: Series[] = [
  { icon: ArrowUpFromLine, name: "Borewell Submersible Pumps", type: "Multistage borewell submersible", bestFor: "Irrigation and horticulture from borewells, sized to your depth and water yield." },
  { icon: Waves, name: "Monosub R (S)", type: "Openwell submersible · single-phase", spec: "Up to 5 HP", bestFor: "Open wells and farm ponds on small farms, where only single-phase power is available." },
  { icon: Waves, name: "Monosub R (MR)", type: "Openwell submersible · three-phase", spec: "Up to 30 HP", bestFor: "Larger farms drawing from open wells, tanks or ponds." },
  { icon: Gauge, name: "Ultra+", type: "Surface monobloc · single / three-phase", spec: "Up to 20 HP", bestFor: "Lifting water from canals, ponds and sumps into your field lines." },
  { icon: Sprout, name: "Agribloc", type: "Single-stage monobloc · single-phase", bestFor: "Everyday farm and garden watering at low running cost." },
  { icon: Sun, name: "Solar Pumping Systems", type: "Agri Monosol monobloc · solar submersibles", spec: "2 – 20 HP", bestFor: "Fields without reliable power. Daytime irrigation with no electricity bill." },
  { icon: Cable, name: "Starters & Cables", type: "DStart Plus starter · Conti flat cables", bestFor: "Safe starting and wiring matched to your pump, supplied with the pump set." },
];

const DOMESTIC: Series[] = [
  { icon: Home, name: "AQUA Series & CUTE+", type: "Self-priming mini monobloc", bestFor: "Filling overhead tanks in houses and bungalows." },
  { icon: Droplet, name: "Peristar V / GS", type: "Self-priming monobloc", spec: "Suction up to 6 m / 8 m", bestFor: "Overhead tanks, garden sprinklers and car washing." },
  { icon: Car, name: "Peristar ZDX", type: "High-torque self-priming monobloc", bestFor: "Booster duty, car washing and solar water-heater circulation." },
  { icon: Building2, name: "Peristar SZX", type: "Compact stainless-steel booster", bestFor: "Boosting water pressure in apartments and flats." },
  { icon: Wrench, name: "Perijet & TSJI", type: "Self-priming jet pumps", bestFor: "Shallow wells and sumps for homes, hotels and small farms." },
  { icon: ShowerHead, name: "Multiboost & Autoboost", type: "Pressure booster systems", bestFor: "Steady pressure for taps and showers across every floor." },
  { icon: Waves, name: "Opal i & Multisub", type: "Openwell submersible", bestFor: "Pumping from open wells to overhead tanks, including high-head lifts." },
  { icon: ArrowDownToLine, name: "Drainage & Sewage Pumps", type: "Ama Drainer · KSTP", bestFor: "Draining sumps, cellars and construction sites; sewage transfer." },
];

function SeriesCard({ s, use }: { s: Series; use: "agricultural" | "domestic" }) {
  const message = `Hello Waterbase Technologies, I'd like the price and availability of the KSB ${s.name} (${use} use).\n\nMy requirement is: `;
  return (
    <div className="surface-card card-lift group flex h-full flex-col rounded-3xl p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
          <s.icon className="h-6 w-6" aria-hidden="true" />
        </span>
        {s.spec ? (
          <span className="rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green-dark">{s.spec}</span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{s.name}</h3>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-brand-green">{s.type}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.bestFor}</p>
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

function UseSection({
  id, tone, eyebrow, title, lead, image, imageAlt, items, use,
}: {
  id: string; tone: "sky" | "field"; eyebrow: string; title: string; lead: string;
  image: string; imageAlt: string; items: Series[]; use: "agricultural" | "domestic";
}) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-24">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lift">
              <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <SeriesCard s={s} use={use} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Two use-based sections for /ksb-pumps, with a jump bar between them. */
export function KsbRanges() {
  return (
    <>
      <div className="relative z-10 -mb-6 flex justify-center px-4 pt-10">
        <nav aria-label="KSB pump ranges" className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-white/80 bg-white/90 p-1.5 shadow-soft">
          <a href="#agricultural" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark">
            <Tractor className="h-4 w-4" aria-hidden="true" /> For Agricultural Use
          </a>
          <a href="#domestic" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-water-deep transition-colors hover:bg-brand-blue-soft">
            <PumpIcon className="h-4 w-4" aria-hidden="true" /> For Domestic Use
          </a>
        </nav>
      </div>

      <UseSection
        id="agricultural"
        tone="sky"
        eyebrow="KSB · For agricultural use"
        title="Pumps for borewells, open wells and fields"
        lead="From a single-phase openwell pump for a small farm to 30 HP sets and solar pumping for large holdings. We size every pump to your water source before you buy."
        image="/products/motors-pumps/pumps-on-pallets.jpg"
        imageAlt="KSB pumps ready for dispatch"
        items={AGRICULTURAL}
        use="agricultural"
      />

      <UseSection
        id="domestic"
        tone="field"
        eyebrow="KSB · For domestic use"
        title="Pumps for homes, apartments and buildings"
        lead="Tank filling, pressure boosting, shallow wells and drainage. Quiet, efficient KSB pumps for houses, bungalows, flats and small businesses."
        image="/products/motors-pumps/motors-stock-aisle.jpg"
        imageAlt="Pumps and motors in stock"
        items={DOMESTIC}
        use="domestic"
      />

      <p className="mx-auto max-w-3xl px-4 pb-4 text-center text-xs text-muted-foreground">
        Series names and ratings as published by KSB. Ask us for the exact model, current stock and price for your requirement.
      </p>
    </>
  );
}
