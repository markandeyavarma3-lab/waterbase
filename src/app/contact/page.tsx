import { PageHero } from "@/components/site/page-hero";
import { Contact } from "@/components/sections/contact";
import { FAQ } from "@/components/sections/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Get in touch with Waterbase Technologies for irrigation product supply, system design, installation, project execution and APMIP subsidy assistance across South India.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact us" title="Let's plan your irrigation project" description="Tell us what you need — product supply, design, installation, or APMIP subsidy help — and our team will call you back." />
      <Contact />
      <FAQ />
    </>
  );
}