import { Section, Container, SectionHeading, Eyebrow } from "@/components/site/section";
import { MediaSlot } from "@/components/site/media-slot";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Process } from "@/components/sections/process";
import { ContactActions } from "@/components/site/contact-actions";

// Drop real photos at /public/images/work/<file>.jpg (landscape ~1200x675).
const serve = [
  { title: "Fields & farms", desc: "Drip and sprinkler systems sized for large holdings and high-value crops — designed to the land, not a catalogue.", label: "Field installation photo", img: "/images/work/fields.jpg" },
  { title: "Lawns & landscapes", desc: "Quiet, efficient irrigation for corporate campuses, resorts and public landscapes — specified, installed and maintained.", label: "Landscape photo", img: "/images/work/lawns.jpg" },
  { title: "Nurseries & greenhouses", desc: "Precise water and fertigation for controlled growing — where yield and consistency are the brief.", label: "Nursery photo", img: "/images/work/nurseries.jpg" },
];

export function EndToEnd() {
  return (
    <Section tone="sky">
      <Container>
        <SectionHeading eyebrow="What we do" title="Irrigation engineered for scale" lead="Commercial campuses, estates and large farms — one team owns survey, design, supply, installation and after-sales. You deal with Waterbase, not a chain of vendors." />

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
              <h3 className="mt-3 font-display text-[clamp(1.375rem,3.6vw,1.875rem)] font-bold tracking-tight">Nine steps. One contract. One team.</h3>
              <p className="mt-3 text-muted-foreground">No subcontracted hand-offs. From understanding the land to servicing it years later, every stage stays in-house.</p>
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
                <h3 className="font-display text-xl font-bold text-brand-green-dark">Scoping a project?</h3>
                <p className="mt-1 text-sm text-brand-green-dark/80">Share acreage, crop or landscape brief — we&apos;ll return a system recommendation.</p>
              </div>
              <ContactActions className="shrink-0" />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}