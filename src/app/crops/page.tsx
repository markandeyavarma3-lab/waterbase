import { PageHero } from "@/components/site/page-hero";
import { Crops } from "@/components/sections/crops";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Crops",
  description: "Crop-specific irrigation design from Waterbase Technologies — banana, coconut, oil palm, cocoa, vegetables, plantations and more, matched for higher yield and lower water use.",
  path: "/crops",
});

export default function CropsPage() {
  return (
    <div className="theme-warm">
      <PageHero eyebrow="Crops" title="Crops we design for" description="Every crop has different water needs. We design systems matched to what you grow — for higher yield and lower water use." />
      <Crops />
      <ContactCTA />
    </div>
  );
}