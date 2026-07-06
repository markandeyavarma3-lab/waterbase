import { Section, Container } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";
import { AuroraGlow } from "@/components/site/aurora-glow";

export function ContactCTA() {
  return (
    <Section tone="brand-deep" id="contact" className="relative overflow-hidden">
      <AuroraGlow variant="dark-converge" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-white md:text-[2.5rem]">Let&apos;s plan your irrigation</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">Products, design, installation or APMIP subsidy — message us on WhatsApp, or request a callback and our team will reach out.</p>
          </Reveal>
          <Reveal delay={120}>
            <ContactActions onDark size="xl" className="mt-8 justify-center sm:inline-flex" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}