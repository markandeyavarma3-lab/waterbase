import { Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { ProductCategories } from "@/components/sections/product-categories";
import { Brands } from "@/components/sections/brands";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Reveal } from "@/components/sections/reveal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Products",
  description: "Drip irrigation, sprinklers, filters, pumps, valves, PVC & HDPE pipes, fertigation systems and accessories from 20+ leading brands including Jain Irrigation, KSB and Netafim.",
  path: "/products",
});

const reach = ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"];

export default function ProductsPage() {
  return (
    <main>
      <PageHero eyebrow="Products" title="Irrigation products & supplies" description="A complete range of irrigation and water-management products from 20+ trusted brands, supplied across South India and pan-India for bulk orders." />

      <ProductCategories />

      <Section tone="muted">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="Supply reach" title="Where we supply" lead="Genuine, warranty-backed products delivered across South India — and pan-India for bulk and project orders." />
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-wrap gap-2.5">
                {reach.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/20 bg-brand-green-soft px-4 py-2 text-sm font-medium text-brand-green-dark"><Check className="h-4 w-4" /> {r}</span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/20 bg-brand-blue-soft px-4 py-2 text-sm font-medium text-brand-blue-dark"><Check className="h-4 w-4" /> Pan-India (bulk orders)</span>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Brands />
      <ContactCTA />
    </main>
  );
}