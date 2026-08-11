"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  motion, useScroll, useSpring, useTransform, useMotionTemplate, AnimatePresence,
} from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { Wordmark } from "@/components/site/wordmark";

import { NAV_LINKS } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoRun, setLogoRun] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  // Drives the wordmark loop. Separate from `scrolled` (which fires at 8px):
  // the logo should keep running through small scroll jitter and only settle
  // once the visitor has genuinely moved down the page.
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.3 });

  // The bar responds to scroll CONTINUOUSLY rather than flipping between two
  // states at a threshold. Everything below is driven off the same 0-120px
  // range, so height, weight and depth all resolve together — that
  // simultaneity is what reads as engineered rather than switched.
  // A light spring smooths the raw scroll value without adding lag.
  const settle = useSpring(scrollY, { stiffness: 260, damping: 40, mass: 0.35 });
  const barHeight = useTransform(settle, [0, 120], [64, 54], { clamp: true });
  const blurPx = useTransform(settle, [0, 120], [0, 14], { clamp: true });
  const shadeAlpha = useTransform(settle, [0, 120], [0, 0.35], { clamp: true });
  const edgeAlpha = useTransform(settle, [0, 120], [0.1, 0.28], { clamp: true });
  const backdrop = useMotionTemplate`blur(${blurPx}px)`;
  const shade = useMotionTemplate`rgba(12, 20, 12, ${shadeAlpha})`;
  const edge = useMotionTemplate`rgba(255, 255, 255, ${edgeAlpha})`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 8);
      setAtTop(y < 90);
      if (!open) {
        if (y <= 140) setHidden(false);
        else if (delta > 10) setHidden(true);
        else if (delta < -10) setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 bg-olive-deep transition-transform duration-300 ease-out-expo",
        scrolled && "shadow-lift",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
    >
      {/* Darkens continuously as you scroll, so the bar gains weight over the
          content beneath it instead of switching to a solid state. */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: shade }}
        aria-hidden="true"
      />
      {/* Bottom edge: a 1px water current in place of a static border. The
          scroll-progress bar sits above it. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: edge }}
        aria-hidden="true"
      />
      <div className="header-water pointer-events-none absolute inset-x-0 bottom-0 h-px" aria-hidden="true" />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-green to-brand-blue"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <motion.div
        className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4 md:px-6"
        style={{ height: barHeight }}
      >
        {/* Logo — left */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              {/* Ghost, not the light `outline` variant — on the dark header that
                  rendered as a solid white box, which read as a stray UI chip
                  rather than part of the bar. */}
              <Button
                variant="ghost"
                size="icon"
                className="size-11 shrink-0 border border-white/15 bg-white/[0.06] text-white hover:bg-white/15 hover:text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            {/* Never wider than the screen — w-72 alone overflowed a 320px phone */}
            <SheetContent side="left" className="w-[min(18rem,85vw)]">
              <SheetHeader>
                <SheetTitle className="font-display">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <AnimatePresence>
                {open && (
                  <motion.nav
                    aria-label="Mobile navigation"
                    className="mt-2 flex flex-col gap-1 px-2"
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                  >
                    {NAV_LINKS.map((l) => (
                      <motion.div
                        key={l.href}
                        variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex min-h-11 items-center rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent",
                            isActive(l.href) && "bg-accent text-brand-green"
                          )}
                        >
                          {l.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </SheetContent>
          </Sheet>

          {/* Bumping `logoRun` remounts the span below, which is what restarts
              the CSS fill animation — a CSS animation will not replay just
              because an element is hovered. */}
          <Link
            href="/"
            className="tap-target-y group/logo flex min-w-0 items-center"
            onMouseEnter={() => setLogoRun((n) => n + 1)}
          >
            {/* Wordmark: all caps, uniform size, heavier weight.
                Caps need POSITIVE tracking — the negative tracking that suits
                lowercase jams capitals into each other, which is what makes a
                caps wordmark look amateur. Cap-height also reads larger than
                lowercase at the same px, so the size is pulled back slightly to
                keep the same optical weight against the 14px nav. */}
            <Wordmark
              key={logoRun}
              animate={atTop}
              className={cn(
                "font-[family-name:var(--font-logo)] font-bold uppercase tracking-[0.042em] text-white",
                "transition-[font-size] duration-300 ease-out-expo",
                scrolled
                  ? "text-[clamp(1.05rem,4.4vw,1.4rem)]"
                  : "text-[clamp(1.15rem,4.9vw,1.6rem)]"
              )}
            />
          </Link>
        </div>

        {/* Desktop nav — center */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                // tap-target-y: an iPad Pro is wide enough to get the desktop nav
                // but is still a finger-driven device, so these need the 44px height.
                "tap-target-y relative flex items-center rounded-md px-2.5 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors xl:px-3",
                isActive(l.href)
                  ? "text-brand-sun"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-brand-sun xl:inset-x-3"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
