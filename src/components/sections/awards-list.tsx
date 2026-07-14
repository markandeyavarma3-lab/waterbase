import fs from "fs";
import path from "path";
import Image from "next/image";
import { Trophy } from "lucide-react";
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
  } catch (error) {
    return [];
  }
}

export function AwardsList() {
  const awards = getAwards();

  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          eyebrow="Excellence"
          title="Our Achievements"
          lead="Drop images of your certificates, trophies, and awards into the public/awards folder to display them here automatically."
        />

        <div className="mt-12">
          {awards.length > 0 ? (
            <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {awards.map((src, i) => (
                <StaggerItem key={i}>
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
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card">
              <Trophy className="h-12 w-12 text-brand-green/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No awards added yet. Drop images into the <code>public/awards/</code> folder!
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
