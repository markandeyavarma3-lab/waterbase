"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  motion, useScroll, useSpring, useTransform, useMotionTemplate, AnimatePresence,
} from "framer-motion";
import { Menu, MapPin, Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/site/wordmark";
import { siteConfig, telLink, whatsappLink } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";
import { NAV_LINKS } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoRun, setLogoRun] = useState(0);
  // Drives the wordmark loop. Deliberately a larger threshold than the visual
  // scroll response below, so small jitter at the top does not kill the logo
  // animation mid-drop.
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.3 });

  // The bar responds to scroll CONTINUOUSLY rather than flipping between two
  // states at a threshold. Everything below is driven off one 0-120px range so
  // the changes resolve together, which is what reads as engineered rather than
  // switched. A light spring smooths the raw value without adding lag.
  const settle = useSpring(scrollY, { stiffness: 260, damping: 40, mass: 0.35 });
  const barHeight = useTransform(settle, [0, 120], [62, 54], { clamp: true });
  const stripHeight = useTransform(settle, [0, 70], [36, 0], { clamp: true });
  const stripOpacity = useTransform(settle, [0, 45], [1, 0], { clamp: true });
  const railPad = useTransform(settle, [0, 120], [12, 6], { clamp: true });
  const pillAlpha = useTransform(settle, [0, 120], [0.55, 0.9], { clamp: true });
  const pillShadow = useTransform(settle, [0, 120], [0.12, 0.4], { clamp: true });
  const pillBg = useMotionTemplate`rgba(29, 42, 20, ${pillAlpha})`;
  const pillGlow = useMotionTemplate`0 10px 30px rgba(6, 14, 8, ${pillShadow})`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
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
    <header
      className={cn(
        // FIXED, not sticky. A sticky header still occupies space in the flow,
        // so the pill would float over the page background rather than over the
        // hero. Fixed takes it out of flow and lets the dark hero run up behind
        // it — which is the whole point of a floating bar. The hero and page
        // heroes carry matching top padding so their content clears it.
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out-expo",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* Reading progress — a hairline at the very top edge of the viewport. */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left bg-gradient-to-r from-brand-green to-brand-blue"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* ── INFO STRIP ──────────────────────────────────────────
          Location, hours and the two contact routes the site treats as public.
          Collapses to nothing as you scroll so it costs no room while reading. */}
      <motion.div
        className="overflow-hidden border-b border-white/[0.07] bg-olive-deep/80 backdrop-blur"
        style={{ height: stripHeight, opacity: stripOpacity }}
      >
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-4 text-[0.78rem] text-white/60 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex shrink-0 items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-green-light" aria-hidden="true" />
              {siteConfig.address.city}, {siteConfig.address.state}
            </span>
            <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
              <Clock className="h-3.5 w-3.5 text-brand-green-light" aria-hidden="true" />
              {siteConfig.hoursSummary.days} {siteConfig.hoursSummary.time}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hidden items-center gap-1.5 transition-colors hover:text-white sm:flex"
            >
              <MessageCircle className="h-3.5 w-3.5 text-brand-green-light" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-green-light" aria-hidden="true" />
              <span className="hidden md:inline">{siteConfig.email}</span>
              <span className="md:hidden">Email</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── FLOATING PILL ───────────────────────────────────────
          Detached from the edges with its own translucent surface, so it sits
          over the page rather than dividing it. It gains opacity and shadow as
          you scroll, which is what keeps it legible once light content passes
          beneath it. */}
      <motion.div className="px-3 sm:px-4 md:px-6" style={{ paddingTop: railPad, paddingBottom: railPad }}>
        <motion.div
          className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 overflow-hidden rounded-full border border-white/12 pl-4 pr-2 backdrop-blur-xl sm:gap-4 sm:pl-5"
          style={{ height: barHeight, background: pillBg, boxShadow: pillGlow }}
        >
          {/* water current along the pill's lower edge */}
          <div className="header-water pointer-events-none absolute inset-x-6 bottom-0 h-px" aria-hidden="true" />

          {/* Logo — left */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-1 size-10 shrink-0 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/15 hover:text-white lg:hidden"
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

            {/* Remounting via `logoRun` is what restarts the CSS animation — a
                CSS animation will not replay merely because you hover. */}
            <Link
              href="/"
              className="tap-target-y flex min-w-0 items-center"
              onMouseEnter={() => setLogoRun((n) => n + 1)}
            >
              <Wordmark
                key={logoRun}
                animate={atTop}
                className="font-[family-name:var(--font-logo)] text-[clamp(1rem,4.2vw,1.35rem)] font-bold uppercase tracking-[0.042em] text-white"
              />
            </Link>
          </div>

          {/* Nav — centre */}
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  // tap-target-y: an iPad Pro is wide enough for the desktop nav
                  // but is still finger-driven, so these need the 44px height.
                  "tap-target-y relative flex items-center rounded-full px-3 py-2 font-display text-[0.8rem] font-semibold uppercase tracking-wide transition-colors",
                  isActive(l.href) ? "text-white" : "text-white/55 hover:text-white"
                )}
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.12] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions — right */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15 sm:px-4"
              aria-label="Message us on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-brand-green-light" aria-hidden="true" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <a
              href={telLink(siteConfig.phones.sales.primary)}
              onClick={trackCallClick}
              className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-brand-sun-muted px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-sun-muted-hover sm:px-4"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Call</span>
              <span className="hidden xl:inline">now</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
