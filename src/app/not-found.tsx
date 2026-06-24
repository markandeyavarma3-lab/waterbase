import Link from "next/link";
import { Home, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactActions } from "@/components/site/contact-actions";

export const metadata = {
  title: "Page not found",
  description: "The page you’re looking for doesn’t exist or has been moved.",
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-green-deep text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 md:text-[0.8125rem]">
          <Sprout className="h-4 w-4" />
          Waterbase Technologies
        </p>
        <h1 className="mt-4 font-display text-6xl font-extrabold tracking-[-0.04em] sm:text-7xl">404</h1>
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
          <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
            <Link href="/contact">Request a callback</Link>
          </Button>
        </div>

        <div className="mt-10">
          <ContactActions onDark />
        </div>
      </div>
    </section>
  );
}