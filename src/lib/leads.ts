import { z } from "zod";

export const REQUIREMENT_OPTIONS = [
  { value: "product_supply", label: "Product Supply (drip, sprinkler, pumps, pipes)" },
  { value: "survey_design", label: "Survey & System Design" },
  { value: "installation", label: "Installation" },
  { value: "project_execution", label: "Turnkey Project Execution" },
  { value: "landscaping", label: "Corporate / Nursery Landscaping" },
  { value: "apmip_subsidy", label: "APMIP Subsidy Assistance" },
  { value: "other", label: "Something else" },
] as const;

export type RequirementValue = (typeof REQUIREMENT_OPTIONS)[number]["value"];

const REQUIREMENT_VALUES = REQUIREMENT_OPTIONS.map((o) => o.value) as [string, ...string[]];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")),
  requirement: z.string().refine((v) => REQUIREMENT_VALUES.includes(v), { message: "Please select what you need" }),
  // Optional qualifying details
  location: z.string().trim().max(120, "Location is too long").optional(),
  landSize: z.string().trim().max(60, "Please keep it short").optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Admin lead pipeline — must match the DB CHECK constraint on leads.status.
export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "follow_up", label: "Follow Up" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  mobile: string;
  requirement: string;
  location: string | null;
  land_size: string | null;
  status: string;
  source: string | null;
  admin_notes: string | null;
};