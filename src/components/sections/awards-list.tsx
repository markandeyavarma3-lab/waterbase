import fs from "fs";
import path from "path";
import Image from "next/image";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";

function getAwards(): string[] {
  try {
    const dir = path.join(process.cwd(), "public/awards");
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    const validExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
    return files
      .filter((file) => validExts.has(path.extname(file).toLowerCase()))
      .map((file) => `/awards/${file}`);
  } catch {
    return [];
  }
}

export function AwardsList() {
  const awards = getAwards();
  if (awards.length === 0) return null;

  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          eyebrow="Excellence"
          title="Our Achievements"
          lead="Recognitions and certifications earned over 25 years in the field."
        />

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((src, i) => (
            <StaggerItem key={src}>
              <InteractiveCard className="group relative flex aspect-square w-full items-center justify-center overflow-hidden p-0">
                <Image
                  src={src}
                  alt={`Award ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
