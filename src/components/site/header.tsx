"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { NAV_LINKS } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 8);
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
    <header className={cn(
      "sticky top-0 z-50 border-b backdrop-blur transition-all duration-300 ease-out-expo",
      scrolled ? "border-border/70 bg-background/90 shadow-soft" : "border-border/40 bg-background/70",
      hidden ? "-translate-y-full" : "translate-y-0"
    )}>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-green via-brand-blue to-brand-sun"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <div className={cn(
        "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-300 ease-out-expo md:px-6",
        scrolled ? "h-14" : "h-16"
      )}>
        {/* Logo — left */}
        <div className="flex min-w-0 items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
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
                            "block rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent",
                            isActive(l.href) && "bg-accent text-brand-green"
                          )}
                        >
                          {l.label}
                        </Link>
                      </motion.div>
                    ))}
                    {/* Removed APMIP and WhatsApp mobile buttons as requested */}
                  </motion.nav>
                )}
              </AnimatePresence>
            </SheetContent>
          </Sheet>

          <Link href="/" className={cn(
            "min-w-0 truncate font-[family-name:var(--font-logo)] font-extrabold tracking-tight text-brand-blue transition-all duration-300",
            scrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
          )}>
            Waterbase
            <span className="hidden sm:inline"> Technologies</span>
          </Link>
        </div>

        {/* Desktop nav — center */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors xl:px-3",
                isActive(l.href)
                  ? "text-brand-green"
                  : "text-foreground/75 hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-brand-green xl:inset-x-3"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
