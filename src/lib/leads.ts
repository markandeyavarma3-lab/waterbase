import * as z from "zod/mini";

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

/**
 * NOT cast to `[string, ...string[]]`.
 *
 * That cast (the previous implementation) handed `z.enum` a plain `string`
 * element type, which silently collapsed the whole literal union: the inferred
 * `LeadInput["requirement"]` became `string`, so assigning
 * `"totally_not_a_valid_requirement"` to it compiled cleanly under `strict`.
 * Runtime validation still worked; compile-time safety did not. The DB row type
 * `Lead.requirement` was correctly `RequirementValue`, so the two halves of the
 * same field disagreed with each other.
 */
const REQUIREMENT_VALUES = REQUIREMENT_OPTIONS.map((o) => o.value) as unknown as [
  RequirementValue,
  ...RequirementValue[],
];

/**
 * Why `zod/mini` and not `zod`.
 *
 * This schema is shared: the server action parses with it, and the browser form
 * resolves against it. Importing classic `zod` therefore shipped the entire
 * library to the client — every string format (emoji, cuid, nanoid, ulid, jwt,
 * base64url), the locale tables and `toJSONSchema` — which measured 62.8 KB
 * gzipped, the single largest non-React chunk on the paid landing pages. For a
 * form with five fields.
 *
 * `zod/mini` is the same validator with a tree-shakeable functional API: only
 * the checks referenced below are bundled. Behaviour is identical — trimming,
 * the +91 strip, and dropping unknown keys (which is what makes the honeypot
 * safe to spread into the payload) all still hold, and the test suite asserts
 * every one of those cases.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .check(z.trim(), z.minLength(2, "Please enter your name"), z.maxLength(80, "Name is too long")),

  // Accepts "+91 94400 18418", "919440018418", "944-001-8418" → "9440018418".
  mobile: z.pipe(
    z.pipe(
      z.string(),
      z.transform((v) => v.trim().replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))
    ),
    z.string().check(z.regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"))
  ),

  // Optional: the callback form asks only for name and mobile. Omitted means
  // "other" when stored (see submitLead) — the DB column is NOT NULL.
  requirement: z.optional(z.enum(REQUIREMENT_VALUES, { message: "Please select what you need" })),

  // Optional qualifying details
  location: z.optional(z.string().check(z.trim(), z.maxLength(120, "Location is too long"))),
  landSize: z.optional(z.string().check(z.trim(), z.maxLength(60, "Please keep it short"))),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * What the FORM holds, which is not quite what the schema accepts: the
 * requirement select starts empty, and "" is not a valid RequirementValue.
 * Keeping that difference explicit is what lets `leadSchema` stay strict.
 */
export type LeadFormValues = Omit<LeadInput, "requirement"> & {
  requirement: RequirementValue | "";
};

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
  requirement: RequirementValue;
  location: string | null;
  land_size: string | null;
  status: LeadStatus;
  source: string | null;
  admin_notes: string | null;
};
