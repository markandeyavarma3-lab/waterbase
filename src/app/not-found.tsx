import Link from "next/link";
import { Home, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactActions } from "@/components/site/contact-actions";
import { AuroraGlow } from "@/components/site/aurora-glow";

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you’re looking for doesn’t exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-green-deeper text-white">
      <AuroraGlow variant="hero" />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/70">
          <Sprout className="h-4 w-4" />
          {siteConfig.name}
        </p>
        <h1 className="mt-4 font-display text-6xl font-extrabold tracking-tight sm:text-7xl">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">This field is fallow.</h2>
        <p className="mt-4 max-w-xl text-white/80">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track —
          head home, or reach out and we’ll point you in the right direction.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-brand-green-deep hover:bg-white/90">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <ContactActions onDark />
        </div>
      </div>
    </section>
  );
}