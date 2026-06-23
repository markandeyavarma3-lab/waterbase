"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Crops", href: "/crops" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={cn(
      "sticky top-0 z-50 border-b backdrop-blur transition-all duration-300 ease-out-expo",
      scrolled ? "border-border/70 bg-background/90 shadow-soft" : "border-border/40 bg-background/70"
    )}>
      <div className={cn(
        "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 ease-out-expo md:px-6",
        scrolled ? "h-14" : "h-16"
      )}>
        <Link href="/" className={cn(
          "whitespace-nowrap font-[family-name:var(--font-logo)] font-extrabold tracking-tight text-foreground transition-all duration-300",
          scrolled ? "text-base md:text-lg" : "text-lg"
        )}>
          Waterbase Technologies
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(l.href)
                  ? "text-brand-green"
                  : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-green" aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent",
                      isActive(l.href) && "bg-accent text-brand-green"
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 px-2">
                <Button asChild className="w-full bg-brand-green text-white hover:bg-brand-green-dark">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> Message on WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
