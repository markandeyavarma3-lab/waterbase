import { Award, MapPin, LifeBuoy, Truck } from "lucide-react";
import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { ProductDetail } from "@/components/sections/product-detail";
import { pageMeta } from "@/lib/seo";
import type { ProductPage } from "@/lib/product-pages";

const WHY = [
  { icon: Award, title: "Authorised & Genuine", desc: "Official dealer for Jain Irrigation and KSB. Manufacturer warranty on every product, no duplicates." },
  { icon: MapPin, title: "Right Size, First Time", desc: "We check your land, water source and use before recommending a size or model." },
  { icon: LifeBuoy, title: "Install & After-Sales", desc: "Our own team installs and services what we sell. No middlemen." },
  { icon: Truck, title: "Stock in Eluru", desc: "Stocked at our Eluru shop and godown, with fast dispatch on bulk orders." },
];

export function productPageMetadata(page: ProductPage, path: string): Metadata {
  return pageMeta({ title: page.metaTitle, description: page.metaDescription, path });
}

export function ProductSubPage({ page }: { page: ProductPage }) {
  return (
    <div className="theme-warm">
      <LandingPageTemplate
        badge={page.badge}
        title={page.title}
        description={page.description}
        trustPoints={page.trustPoints}
        products={[]}
        productsSlot={<ProductDetail d={page.detail} />}
        whyReasons={WHY}
        formTitle={page.formTitle}
        formDesc="Leave your name and number. We'll call back with the right product and today's price."
        formRequirement={page.formRequirement}
        whyEyebrow="Why Waterbase"
        whyTitle="One local partner, from choice to installation"
        ctaSubtitle="Ready to order?"
        ctaTitle="Call now or send a WhatsApp for today's price"
        ctaDesc="Tell us your size and quantity. We reply fast during working hours."
      />
    </div>
  );
}
