import { PageHero } from "@/components/site/page-hero";
import { Section, Container } from "@/components/site/section";
import { pageMeta } from "@/lib/seo";
import { siteConfig, fullAddress, whatsappLink } from "@/lib/site-config";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Waterbase Technologies collects, uses and protects the information you share with us through our website.",
  path: "/privacy",
});

const LAST_UPDATED = "June 2026";

export default function PrivacyPage() {
  return (
    <main>
      <PageHero eyebrow="Legal" title="Privacy Policy" description={`How we handle the information you share with us. Last updated: ${LAST_UPDATED}.`} />

      <Section tone="default">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-2 [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand-green [&_a]:underline">
            <section>
              <p>
                This Privacy Policy explains how {siteConfig.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
                collects, uses and protects the information you provide when you use our website
                or contact us. By using this website, you agree to the practices described below.
              </p>
            </section>

            <section>
              <h2>Information we collect</h2>
              <p>When you submit our callback / enquiry form, we collect:</p>
              <ul>
                <li>Your <strong>name</strong></li>
                <li>Your <strong>mobile number</strong></li>
                <li>Your <strong>requirement</strong> (the type of service or product you need)</li>
                <li>Optionally, your <strong>location</strong> and <strong>land size</strong>, if you choose to share them</li>
              </ul>
              <p>
                We also automatically collect basic, non-identifying usage data (such as pages
                visited and approximate region) through analytics tools to help us improve the site.
              </p>
            </section>

            <section>
              <h2>How we use your information</h2>
              <ul>
                <li>To contact you regarding your enquiry and provide a quotation or callback</li>
                <li>To supply, design, install or service the irrigation solutions you ask about</li>
                <li>To assist with APMIP subsidy applications where requested</li>
                <li>To improve our website and understand which services are most useful</li>
              </ul>
              <p>We do <strong>not</strong> sell, rent or trade your personal information to anyone.</p>
            </section>

            <section>
              <h2>How your information is stored &amp; shared</h2>
              <p>
                Form submissions are stored securely in our database and may be sent to us by email
                so our team can follow up. We use trusted third-party services to run the website and
                handle this data, including hosting, database, email delivery and analytics providers.
                These providers process data only on our behalf. We may also disclose information if
                required by law.
              </p>
            </section>

            <section>
              <h2>Cookies &amp; analytics</h2>
              <p>
                We use analytics (including Google Analytics and Google Ads conversion tracking) to
                understand how visitors use the site and to measure our advertising. These tools may set
                cookies on your device. You can disable cookies in your browser settings; some features
                may then work less smoothly.
              </p>
            </section>

            <section>
              <h2>Data retention</h2>
              <p>
                We keep enquiry details only for as long as needed to serve you and for our legitimate
                business records. You can ask us to delete your information at any time (see below).
              </p>
            </section>

            <section>
              <h2>Your choices</h2>
              <p>
                You may request that we correct or delete the personal information we hold about you.
                To do so, contact us using the details below and we will act on your request within a
                reasonable time.
              </p>
            </section>

            <section>
              <h2>Contact us</h2>
              <p>
                For any questions about this Privacy Policy or your data:
              </p>
              <ul>
                <li>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
                <li>WhatsApp: <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Message us</a></li>
                <li>Address: {fullAddress}</li>
              </ul>
            </section>
          </div>
        </Container>
      </Section>
    </main>
  );
}
