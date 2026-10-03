"use client";

import { createContext, useCallback, useContext, useState, type MouseEvent, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import type { RequirementValue } from "@/lib/leads";
import { trackRequestCallbackClick } from "@/lib/analytics";

// The form (react-hook-form + zod) loads only when the pop-up first opens.
const LeadForm = dynamic(() => import("@/components/sections/lead-form").then((m) => m.LeadForm), {
  loading: () => <div className="h-72" aria-hidden="true" />,
});

type Ctx = { open: (reason?: RequirementValue) => void };
const CallbackContext = createContext<Ctx | null>(null);

export function CallbackDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<RequirementValue | undefined>();

  const open = useCallback((r?: RequirementValue) => {
    setReason(r);
    setIsOpen(true);
  }, []);

  return (
    <CallbackContext.Provider value={{ open }}>
      {children}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="callback-overlay fixed inset-0 z-[80] bg-water-deep/30 backdrop-blur-sm" />
          <Dialog.Content
            className="callback-panel fixed inset-x-0 bottom-0 z-[90] max-h-[92svh] overflow-y-auto rounded-t-[2rem] bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-lift outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(36rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:p-8"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-water-deep/15 sm:hidden" aria-hidden="true" />
            <Dialog.Title className="font-display text-2xl font-extrabold tracking-tight text-heading">
              Request a callback
            </Dialog.Title>
            <Dialog.Description className="mt-1.5 text-sm text-muted-foreground">
              Leave your name and number — our team will call you back.
            </Dialog.Description>
            <Dialog.Close
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-water-deep/60 transition-colors hover:bg-brand-blue-soft hover:text-water-deep"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
            <div className="mt-6">
              <LeadForm key={reason ?? "none"} defaultRequirement={reason} />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CallbackContext.Provider>
  );
}

/**
 * "Request a callback" link. With JavaScript it opens the pop-up form; without
 * it (or outside the provider, e.g. /admin) it is a plain link to /contact.
 */
export function CallbackTrigger({
  className,
  children,
  reason,
}: {
  className?: string;
  children: ReactNode;
  reason?: RequirementValue;
}) {
  const ctx = useContext(CallbackContext);

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    trackRequestCallbackClick();
    if (!ctx || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    ctx.open(reason);
  }

  return (
    <Link href="/contact" onClick={onClick} data-gtm="request_callback" className={className}>
      {children}
    </Link>
  );
}
