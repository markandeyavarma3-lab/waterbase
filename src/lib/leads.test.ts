import { describe, it, expect } from "vitest";
import { leadSchema, LEAD_STATUSES, REQUIREMENT_OPTIONS } from "./leads";

/**
 * These cover the pure logic that stands between a public form and the
 * database. There were no tests at all before; the schema was rewritten from
 * classic `zod` to `zod/mini` to get 62.8 KB of library off the client bundle,
 * and these are what make that swap something other than a leap of faith.
 */

describe("leadSchema — mobile normalisation", () => {
  const base = { name: "Ravi Kumar", requirement: "product_supply" as const };
  const parse = (mobile: string) => leadSchema.safeParse({ ...base, mobile });

  it.each([
    ["plain 10-digit", "9440018418", "9440018418"],
    ["+91 with spaces", "+91 94400 18418", "9440018418"],
    ["91 prefix, no plus", "919440018418", "9440018418"],
    ["hyphenated", "944-001-8418", "9440018418"],
    ["parenthesised", "(94400) 18418", "9440018418"],
    ["surrounding whitespace", "  9440018418  ", "9440018418"],
  ])("accepts %s", (_label, input, expected) => {
    const r = parse(input);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.mobile).toBe(expected);
  });

  it.each([
    ["starts with 5 (not an Indian mobile)", "5440018418"],
    ["only 9 digits", "944001841"],
    ["11 digits, not a 91 prefix", "12440018418"],
    ["empty", ""],
    ["letters only", "call me maybe"],
  ])("rejects %s", (_label, input) => {
    expect(parse(input).success).toBe(false);
  });

  it("strips a leading 91 only when exactly 10 digits remain", () => {
    // 91 followed by 10 digits → country code, strip it.
    const stripped = parse("919440018418");
    expect(stripped.success && stripped.data.mobile).toBe("9440018418");
    // A genuine number that merely begins 91 must survive intact.
    const kept = parse("9144001841");
    expect(kept.success && kept.data.mobile).toBe("9144001841");
  });
});

describe("leadSchema — name", () => {
  const base = { mobile: "9440018418", requirement: "other" as const };

  it("trims surrounding whitespace", () => {
    const r = leadSchema.safeParse({ ...base, name: "  Ravi Kumar  " });
    expect(r.success && r.data.name).toBe("Ravi Kumar");
  });

  it("rejects a single character", () => {
    expect(leadSchema.safeParse({ ...base, name: "R" }).success).toBe(false);
  });

  it("rejects whitespace that trims to nothing", () => {
    expect(leadSchema.safeParse({ ...base, name: "   " }).success).toBe(false);
  });

  it("rejects names over 80 characters", () => {
    expect(leadSchema.safeParse({ ...base, name: "a".repeat(81) }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, name: "a".repeat(80) }).success).toBe(true);
  });

  it("accepts non-Latin scripts (Telugu is the local language)", () => {
    const r = leadSchema.safeParse({ ...base, name: "రవి కుమార్" });
    expect(r.success).toBe(true);
  });
});

describe("leadSchema — requirement", () => {
  it.each(REQUIREMENT_OPTIONS.map((o) => o.value))("accepts %s", (value) => {
    expect(
      leadSchema.safeParse({ name: "Ravi Kumar", mobile: "9440018418", requirement: value }).success
    ).toBe(true);
  });

  it("rejects a value outside the option list", () => {
    const r = leadSchema.safeParse({
      name: "Ravi Kumar",
      mobile: "9440018418",
      requirement: "'; DROP TABLE leads; --",
    });
    expect(r.success).toBe(false);
  });

  it("rejects an empty-string requirement (the form sends undefined instead)", () => {
    expect(
      leadSchema.safeParse({ name: "Ravi Kumar", mobile: "9440018418", requirement: "" }).success
    ).toBe(false);
  });

  it("accepts a lead with no requirement — only name and mobile are mandatory", () => {
    expect(leadSchema.safeParse({ name: "Ravi Kumar", mobile: "9440018418" }).success).toBe(true);
  });
});

describe("leadSchema — optional fields and unknown keys", () => {
  const base = { name: "Ravi Kumar", mobile: "9440018418", requirement: "other" as const };

  it("allows location and landSize to be absent", () => {
    const r = leadSchema.safeParse(base);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.location).toBeUndefined();
      expect(r.data.landSize).toBeUndefined();
    }
  });

  it("enforces the length caps on optional fields", () => {
    expect(leadSchema.safeParse({ ...base, location: "a".repeat(121) }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, landSize: "a".repeat(61) }).success).toBe(false);
  });

  it("STRIPS unknown keys — this is what makes the honeypot safe", () => {
    // submitLead spreads the hidden "company" field into the payload. If the
    // schema passed unknown keys through, that value would reach the INSERT and
    // Postgres would reject the whole row on a column that does not exist.
    const r = leadSchema.safeParse({ ...base, company: "spam-bot", is_admin: true });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data).not.toHaveProperty("company");
      expect(r.data).not.toHaveProperty("is_admin");
    }
  });
});

describe("LEAD_STATUSES", () => {
  it("matches the DB CHECK constraint in the baseline migration", () => {
    // If these drift, updateLeadStatus starts writing values Postgres rejects.
    expect(LEAD_STATUSES.map((s) => s.value)).toEqual([
      "new",
      "contacted",
      "follow_up",
      "converted",
      "closed",
    ]);
  });

  it("has no duplicate values", () => {
    const values = LEAD_STATUSES.map((s) => s.value);
    expect(new Set(values).size).toBe(values.length);
  });
});

describe("REQUIREMENT_OPTIONS", () => {
  it("has no duplicate values", () => {
    const values = REQUIREMENT_OPTIONS.map((o) => o.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("uses snake_case values, matching the DB CHECK constraint", () => {
    for (const o of REQUIREMENT_OPTIONS) expect(o.value).toMatch(/^[a-z]+(_[a-z]+)*$/);
  });
});
