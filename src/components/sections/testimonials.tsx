import { Star } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

// Placeholder testimonials — replace with real, approved customer reviews.
const testimonials = [
  { quote: "They surveyed my land, designed the drip system and installed everything on time. My yield improved and water use dropped.", name: "Banana grower", role: "West Godavari" },
  { quote: "Handled our APMIP subsidy paperwork end to end. Very professional and saved us a lot of effort.", name: "Micro-irrigation customer", role: "Eluru" },
  { quote: "Quality products and genuine brands. The team was responsive and the installation was neat.", name: "Commercial client", role: "Telangana" },
];

export function Testimonials() {
  return (
    <section className="border-y border-border bg-brand-green-soft/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Testimonials</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Trusted by farmers &amp; businesses</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-green-darker/5">
                <div className="flex gap-0.5 text-brand-sun">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}