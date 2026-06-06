import { PageHero } from "@/components/site/page-hero";
import { ProductCategories } from "@/components/sections/product-categories";
import { Brands } from "@/components/sections/brands";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Products",
  description: "Drip irrigation, sprinklers, filters, pumps, valves, PVC & HDPE pipes, fertigation systems and accessories from 20+ leading brands including Jain Irrigation, KSB and Netafim.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main>
      <PageHero eyebrow="Products" title="Irrigation products & supplies" description="A complete range of irrigation and water-management products from 20+ trusted brands, supplied across South India." />
      <ProductCategories />
      <Brands />
      <ContactCTA />
    </main>
  );
}