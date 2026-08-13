import { Section, Container, SectionHeading, Eyebrow } from "@/components/site/section";
import { MediaSlot } from "@/components/site/media-slot";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Process } from "@/components/sections/process";
import { ContactActions } from "@/components/site/contact-actions";

// Drop real photos at /public/images/work/<file>.jpg (landscape ~1200x675).
const serve = [
  { title: "Fields & farms", desc: "Drip and sprinkler systems for every crop and acreage — from a single plot to large estates.", label: "Field installation photo", img: "/images/work/fields.jpg" },
  { title: "Lawns & landscapes", desc: "Clean, efficient irrigation for corporate campuses, resorts and public green spaces.", label: "Landscape photo", img: "/images/work/lawns.jpg" },
  { title: "Nurseries & greenhouses", desc: "Precise water and fertigation for high-value, controlled growing environments.", label: "Nursery photo", img: "/images/work/nurseries.jpg" },
];

export function EndToEnd() {
  return (
    <Section tone="sky">
      <Container>
        <SectionHeading eyebrow="What we do" title="Complete irrigation, handled from start to finish" lead="Whether it's a farm field, a corporate lawn or a commercial nursery — and whether you're an individual farmer or a large company — we own the entire journey, so you work with one accountable team from the first call to after-sales." />

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {serve.map((s) => (
            <StaggerItem key={s.title}>
              <InteractiveCard glow={false}>
                <MediaSlot src={s.img} alt={s.title} ratio="video" label={s.label} sizes="(min-width: 768px) 33vw, 100vw" className="rounded-none border-0" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>How we work</Eyebrow>
              <h3 className="mt-3 font-display text-[clamp(1.375rem,3.6vw,1.875rem)] font-bold tracking-tight">Nine steps, one accountable team</h3>
              <p className="mt-3 text-muted-foreground">No hand-offs, no finger-pointing. Every stage — from understanding your land to servicing it years later — is handled in-house.</p>
            </div>
          </Reveal>
          <Process />
        </div>

        <Reveal>
          {/* Same gradient colours as before, now in slow motion. The gradient
              moved onto an oversized child so it can be driven by transform;
              the panel itself just clips it. Content sits above on z-10. */}
          <div className="relative isolate mt-16 overflow-hidden rounded-3xl sink-panel living-mesh-c">
            <div className="flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-brand-green-dark">Planning an irrigation project?</h3>
                <p className="mt-1 text-sm text-brand-green-dark/80">Tell us about your land and we&apos;ll recommend the right system.</p>
              </div>
              <ContactActions className="shrink-0" />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}