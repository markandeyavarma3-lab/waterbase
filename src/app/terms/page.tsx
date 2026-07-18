import { PageHero } from "@/components/site/page-hero";
import { Section, Container } from "@/components/site/section";
import { pageMeta } from "@/lib/seo";
import { siteConfig, fullAddress, whatsappLink } from "@/lib/site-config";

export const metadata = pageMeta({
  title: "Terms of Use",
  description: "The terms that apply when you use the Waterbase Technologies website.",
  path: "/terms",
});

const LAST_UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <div className="theme-warm">
      <PageHero eyebrow="Legal" title="Terms of Use" description={`The terms that apply when you use this website. Last updated: ${LAST_UPDATED}.`} />

      <Section tone="default">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-2 [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand-green [&_a]:underline">
            <section>
              <p>
                Welcome to the {siteConfig.legalName} website. By accessing or using this site, you
                agree to these Terms of Use. If you do not agree, please do not use the site.
              </p>
            </section>

            <section>
              <h2>About the information on this site</h2>
              <p>
                We aim to keep the information on this website accurate and up to date, but it is
                provided for general information only. Product specifications, availability, pricing,
                subsidy details (including APMIP) and service scope can change without notice. Nothing
                on this site is a binding offer — final details are confirmed directly with our team.
              </p>
            </section>

            <section>
              <h2>Enquiries &amp; quotations</h2>
              <p>
                Submitting an enquiry or callback request does not create a contract. Any quotation,
                timeline or subsidy eligibility is confirmed by us in writing or directly after we
                understand your site and requirement.
              </p>
            </section>

            <section>
              <h2>Intellectual property</h2>
              <p>
                The content, layout, branding and graphics on this site are owned by us or used with
                permission, and may not be copied or reused without our written consent. Brand names and
                logos of manufacturers we deal in remain the property of their respective owners.
              </p>
            </section>

            <section>
              <h2>Third-party links</h2>
              <p>
                This site may link to third-party websites (such as WhatsApp, Google Maps or
                manufacturer sites). We are not responsible for the content or privacy practices of
                those external sites.
              </p>
            </section>

            <section>
              <h2>Limitation of liability</h2>
              <p>
                To the extent permitted by law, we are not liable for any loss arising from reliance on
                information presented on this website. Use of the site is at your own discretion.
              </p>
            </section>

            <section>
              <h2>Governing law</h2>
              <p>
                These terms are governed by the laws of India, and any disputes are subject to the
                jurisdiction of the courts at Eluru, Andhra Pradesh.
              </p>
            </section>

            <section>
              <h2>Contact us</h2>
              <ul>
                <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
                <li>WhatsApp: <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Message us</a></li>
                <li>Address: {fullAddress}</li>
              </ul>
            </section>
          </div>
        </Container>
      </Section>
    </div>
  );
}
