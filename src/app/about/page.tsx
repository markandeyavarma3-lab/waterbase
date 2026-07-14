import { PageHero } from "@/components/site/page-hero";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Credentials } from "@/components/sections/credentials";
import { Brands } from "@/components/sections/brands";
import { AwardsList } from "@/components/sections/awards-list";
import { ServiceAreas } from "@/components/sections/service-areas";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description: "Waterbase Technologies has delivered complete irrigation and water-management solutions across South India for over 25 years — product supply, design, installation, project execution and APMIP subsidy assistance.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Complete irrigation partners for over 25 years" description="Product supply, survey & design, installation and full project execution — for farmers, nurseries, industries and large developments across South India." />
      <Stats />
      <WhyChooseUs />
      <Credentials />
      <Brands />
      <AwardsList />
      <ServiceAreas />
      <ContactCTA />
    </>
  );
}