import { describe, it, expect } from "vitest";
import { allowedEmails, isEmailAllowed } from "./admin-auth";

/**
 * This is the single boolean standing between an arbitrary Supabase account and
 * every customer's name and mobile number: the /admin surfaces read through the
 * service-role key, which bypasses row-level security entirely.
 *
 * The fail-closed behaviour in particular is a deliberate design decision — an
 * empty ADMIN_EMAILS is far more likely to mean "misconfigured deploy" than
 * "let everyone in" — so it is pinned here rather than left to be re-derived.
 */

describe("allowedEmails — parsing", () => {
  it("splits on commas and lowercases", () => {
    expect(allowedEmails("Owner@Example.com,Manager@Example.COM")).toEqual([
      "owner@example.com",
      "manager@example.com",
    ]);
  });

  it("tolerates the whitespace people actually paste into Vercel", () => {
    expect(allowedEmails("  owner@example.com ,  manager@example.com  ")).toEqual([
      "owner@example.com",
      "manager@example.com",
    ]);
  });

  it("drops empty entries from trailing or doubled commas", () => {
    expect(allowedEmails("owner@example.com,,manager@example.com,")).toEqual([
      "owner@example.com",
      "manager@example.com",
    ]);
  });

  it.each([
    ["unset", undefined],
    ["empty string", ""],
    ["only whitespace", "   "],
    ["only commas", ",,,"],
  ])("returns an empty list when %s", (_label, raw) => {
    expect(allowedEmails(raw)).toEqual([]);
  });
});

describe("isEmailAllowed — fails CLOSED", () => {
  it.each([
    ["unset", undefined],
    ["empty", ""],
    ["whitespace only", "   "],
    ["commas only", ",,"],
  ])("admits NOBODY when ADMIN_EMAILS is %s", (_label, raw) => {
    const allowed = allowedEmails(raw);
    expect(isEmailAllowed("owner@example.com", allowed)).toBe(false);
    expect(isEmailAllowed("anyone@example.com", allowed)).toBe(false);
  });
});

describe("isEmailAllowed — matching", () => {
  const allowed = allowedEmails("owner@example.com,manager@example.com");

  it("admits a listed address", () => {
    expect(isEmailAllowed("owner@example.com", allowed)).toBe(true);
    expect(isEmailAllowed("manager@example.com", allowed)).toBe(true);
  });

  it("is case-insensitive, because Supabase preserves the signup casing", () => {
    expect(isEmailAllowed("Owner@Example.COM", allowed)).toBe(true);
  });

  it("ignores surrounding whitespace on the incoming address", () => {
    expect(isEmailAllowed("  owner@example.com  ", allowed)).toBe(true);
  });

  it("rejects an unlisted address", () => {
    expect(isEmailAllowed("attacker@example.com", allowed)).toBe(false);
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["empty string", ""],
  ])("rejects a %s email", (_label, email) => {
    expect(isEmailAllowed(email, allowed)).toBe(false);
  });

  it("does not match on a substring or a lookalike domain", () => {
    // The check must be exact equality, never `includes`.
    expect(isEmailAllowed("owner@example.com.evil.test", allowed)).toBe(false);
    expect(isEmailAllowed("notowner@example.com", allowed)).toBe(false);
    expect(isEmailAllowed("owner@example.co", allowed)).toBe(false);
  });
});
