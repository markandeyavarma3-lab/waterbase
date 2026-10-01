"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { leadSchema, type LeadFormValues, type RequirementValue, REQUIREMENT_OPTIONS } from "@/lib/leads";
import { submitLead } from "@/lib/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STEP_FIELDS = [["name", "mobile"], ["requirement", "location", "landSize"]] as const;
const TOTAL_STEPS = STEP_FIELDS.length;

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
 * (This and the step slide below were the form's only reasons to load
 * framer-motion, and the form sits above the fold on every paid landing page.)
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
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  // No slide on first render — only once the visitor actually moves between
  // steps, as the previous implementation also did.
  const [moved, setMoved] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // LeadFormValues, not LeadInput: the requirement select legitimately starts
  // empty, and "" is not a RequirementValue. Typing it honestly here is what
  // lets leadSchema keep the strict literal union (it used to be silently
  // widened to `string`, which is what made `requirement: ""` type-check).
  const form = useForm<LeadFormValues>({
    resolver: standardSchemaResolver(leadSchema) as unknown as Resolver<LeadFormValues>,
    defaultValues: { name: "", mobile: "", requirement: defaultRequirement ?? "", location: "", landSize: "" },
  });

  const { errors } = form.formState;

  async function goNext() {
    const valid = await form.trigger(STEP_FIELDS[step] as unknown as (keyof LeadFormValues)[]);
    if (!valid) return;
    setDirection(1);
    setMoved(true);
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  }

  function goBack() {
    setDirection(-1);
    setMoved(true);
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(values: LeadFormValues) {
    setServerError(null);
    const result = await submitLead({ ...values, company: honeypotRef.current?.value ?? "" });
    if (result.ok) {
      form.reset();
      // The token makes /thank-you able to tell a fresh submission from a reload
      // or a shared link, so the Google Ads form conversion is counted exactly
      // once per submission. A second genuine submission gets a new token and is
      // counted again, which a plain "already fired" flag would have swallowed.
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

        {/* Step progress */}
        <div className="flex items-center justify-center gap-2" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-out-expo",
                i === step ? "w-8 bg-brand-green" : i < step ? "w-1.5 bg-brand-green/50" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>

        <div className="relative overflow-hidden">
          {step === 0 ? (
              <div key="step-0" className="lead-step space-y-5" data-animate={moved || undefined} data-dir={direction}>
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <ShakeField error={errors.name?.message}>
                      <FormControl>
                        <Input placeholder="Your full name" autoComplete="name" {...field} />
                      </FormControl>
                    </ShakeField>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="mobile" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <ShakeField error={errors.mobile?.message}>
                      <FormControl>
                        <Input type="tel" inputMode="numeric" placeholder="10-digit mobile number" autoComplete="tel" {...field} />
                      </FormControl>
                    </ShakeField>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            ) : (
              <div key="step-1" className="lead-step space-y-5" data-animate={moved || undefined} data-dir={direction}>
                <FormField control={form.control} name="requirement" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirement</FormLabel>
                    <ShakeField error={errors.requirement?.message}>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="What do you need help with?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {REQUIREMENT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </ShakeField>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Village / Town <span className="font-normal text-muted-foreground">(optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Bhimavaram" autoComplete="address-level2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="landSize" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land size <span className="font-normal text-muted-foreground">(optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5 acres" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            )}
        </div>

        {serverError ? (
          <p className="text-sm font-medium text-destructive">{serverError}</p>
        ) : null}

        <div className="flex gap-3">
          {step > 0 ? (
            <Button type="button" variant="outline" size="lg" onClick={goBack} aria-label="Back" className="shrink-0 px-3">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : null}

          {step < TOTAL_STEPS - 1 ? (
            <Button type="button" size="lg" className="w-full" onClick={goNext}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <span key="sending" className="lead-swap inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </span>
              ) : (
                <span key="idle" className="lead-swap">
                  Request a Callback
                </span>
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
