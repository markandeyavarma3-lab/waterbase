import { PageHero } from "@/components/site/page-hero";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Credentials } from "@/components/sections/credentials";
import { Brands } from "@/components/sections/brands";
import { AwardsList } from "@/components/sections/awards-list";
import { ServiceAreas } from "@/components/sections/service-areas";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description: "Waterbase Technologies — irrigation partners in Eluru since 2000. Commercial landscapes, estates and large farms across South India. Authorised Jain, KSB and Netafim dealer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="theme-warm">
      <PageHero eyebrow="About us" title="Irrigation partners since 2000" description="Survey, design, supply and installation for commercial landscapes, estates and large farms — from one accountable team in Eluru." />
      <Stats />
      <WhyChooseUs />
      <Credentials />
      <Brands />
      <AwardsList />
      <ServiceAreas />
      <GoogleReviews />
      <ContactCTA />
    </div>
  );
}