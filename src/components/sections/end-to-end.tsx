import { Section, Container, SectionHeading, Eyebrow } from "@/components/site/section";
import { MediaSlot } from "@/components/site/media-slot";
import { Reveal } from "@/components/sections/reveal";
import { Process } from "@/components/sections/process";
import { ContactActions } from "@/components/site/contact-actions";

const serve = [
  { title: "Fields & farms", desc: "Drip and sprinkler systems for every crop and acreage — from a single plot to large estates.", label: "Field installation photo" },
  { title: "Lawns & landscapes", desc: "Clean, efficient irrigation for corporate campuses, resorts and public green spaces.", label: "Landscape photo" },
  { title: "Nurseries & greenhouses", desc: "Precise water and fertigation for high-value, controlled growing environments.", label: "Nursery photo" },
];

export function EndToEnd() {
  return (
    <Section tone="default">
      <Container>
        <SectionHeading eyebrow="What we do" title="Complete irrigation, handled from start to finish" lead="Whether it's a farm field, a corporate lawn or a commercial nursery — and whether you're an individual farmer or a large company — we own the entire journey, so you work with one accountable team from the first call to after-sales." />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {serve.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift">
                <MediaSlot alt={s.title} ratio="video" label={s.label} sizes="(min-width: 768px) 33vw, 100vw" className="rounded-none border-0" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>How we work</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">Nine steps, one accountable team</h3>
              <p className="mt-3 text-muted-foreground">No hand-offs, no finger-pointing. Every stage — from understanding your land to servicing it years later — is handled in-house.</p>
            </div>
          </Reveal>
          <Process />
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col items-start gap-5 rounded-2xl border border-brand-green/15 bg-brand-green-soft p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-brand-green-dark">Planning an irrigation project?</h3>
              <p className="mt-1 text-sm text-brand-green-dark/80">Tell us about your land and we&apos;ll recommend the right system.</p>
            </div>
            <ContactActions className="shrink-0" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}