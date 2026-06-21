"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { leadSchema, type LeadInput, REQUIREMENT_OPTIONS } from "@/lib/leads";
import { submitLead } from "@/lib/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LeadForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", mobile: "", requirement: "", location: "", landSize: "" },
  });

  async function onSubmit(values: LeadInput) {
    setServerError(null);
    const result = await submitLead(values);
    if (result.ok) {
      form.reset();
      router.push("/thank-you?ref=lead");
    } else {
      setServerError(result.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Your full name" autoComplete="name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="mobile" render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile Number</FormLabel>
            <FormControl>
              <Input type="tel" inputMode="numeric" placeholder="10-digit mobile number" autoComplete="tel" {...field} />
            </FormControl>
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

        <FormField control={form.control} name="requirement" render={({ field }) => (
          <FormItem>
            <FormLabel>Requirement</FormLabel>
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
            <FormMessage />
          </FormItem>
        )} />

        {serverError ? (
          <p className="text-sm font-medium text-destructive">{serverError}</p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Request a Callback"
          )}
        </Button>
      </form>
    </Form>
  );
}