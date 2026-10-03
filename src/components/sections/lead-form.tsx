"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Loader2, Check } from "lucide-react";
import { leadSchema, type LeadFormValues, type RequirementValue, REQUIREMENT_OPTIONS } from "@/lib/leads";
import { submitLead } from "@/lib/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

/**
 * A throwaway id identifying one submission. Only needs to be unique within a
 * browser session, not unguessable — randomUUID is used when available purely
 * because it is there, with a plain random string for older/insecure contexts
 * where it is not exposed.
 */
function submissionToken(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Wraps a field so it gently shakes whenever a new validation error appears.
 *
 * Restarting a CSS animation means removing the class, forcing a reflow, and
 * adding it back — a DOM write in an effect, which is what effects are for.
 */
function ShakeField({ error, children }: { error?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prevError = useRef<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (el && error && error !== prevError.current) {
      el.classList.remove("lead-shake");
      void el.offsetWidth; // reflow, so re-adding the class restarts the animation
      el.classList.add("lead-shake");
    }
    prevError.current = error;
  }, [error]);

  return <div ref={ref}>{children}</div>;
}

export function LeadForm({ defaultRequirement }: { defaultRequirement?: RequirementValue } = {}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // LeadFormValues, not LeadInput: no reason picked is "" in the form, which
  // is sent as undefined (the schema rejects "" but accepts a missing value).
  const form = useForm<LeadFormValues>({
    resolver: standardSchemaResolver(leadSchema) as unknown as Resolver<LeadFormValues>,
    defaultValues: { name: "", mobile: "", requirement: defaultRequirement ?? "" },
  });

  const { errors } = form.formState;

  async function onSubmit(values: LeadFormValues) {
    setServerError(null);
    const result = await submitLead({
      name: values.name,
      mobile: values.mobile,
      requirement: values.requirement || undefined,
      company: honeypotRef.current?.value ?? "",
    });
    if (result.ok) {
      form.reset();
      // The token makes /thank-you able to tell a fresh submission from a reload
      // or a shared link, so the Google Ads form conversion is counted exactly
      // once per submission.
      try {
        const from = `${window.location.pathname}${window.location.search}`;
        sessionStorage.setItem("wb:return-after-thanks", from);
      } catch {
        // Private browsing — thank-you will fall back to history or home.
      }
      router.push(`/thank-you?ref=lead&s=${submissionToken()}`);
    } else {
      setServerError(result.message);
    }
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line react-hooks/refs -- honeypotRef.current is only read inside onSubmit, which react-hook-form invokes as an event handler after submit, never during render */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <ShakeField error={errors.name?.message}>
                <FormControl>
                  <Input placeholder="Your full name" autoComplete="name" required aria-required="true" {...field} />
                </FormControl>
              </ShakeField>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="mobile" render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile number <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <ShakeField error={errors.mobile?.message}>
                <FormControl>
                  <Input type="tel" inputMode="numeric" placeholder="10-digit mobile" autoComplete="tel" required aria-required="true" {...field} />
                </FormControl>
              </ShakeField>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="requirement" render={({ field }) => (
          <FormItem>
            <FormLabel>
              Reason for callback <span className="font-normal text-muted-foreground">(optional)</span>
            </FormLabel>
            <div role="radiogroup" aria-label="Reason for callback" className="flex flex-wrap gap-2">
              {REQUIREMENT_OPTIONS.map((opt) => {
                const selected = field.value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => field.onChange(selected ? "" : opt.value)}
                    className={cn(
                      "tap-target-y inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-left text-sm font-medium transition-colors",
                      selected
                        ? "border-brand-green bg-brand-green text-white"
                        : "border-brand-blue-light/60 bg-white text-water-deep hover:border-brand-green/50 hover:bg-brand-green-soft"
                    )}
                  >
                    {selected ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </FormItem>
        )} />

        {serverError ? (
          <p className="text-sm font-medium text-destructive">{serverError}</p>
        ) : null}

        <Button type="submit" size="xl" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <span key="sending" className="lead-swap inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </span>
          ) : (
            <span key="idle" className="lead-swap">Request a callback</span>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">We usually call back within a few working hours.</p>
      </form>
    </Form>
  );
}
