import { describe, it, expect } from "vitest";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { leadSchema, type LeadInput } from "./leads";

/**
 * Pins the react-hook-form ↔ schema integration.
 *
 * The form used to run `zodResolver` against classic `zod`. Moving the schema to
 * `zod/mini` (to get 62.8 KB of library off the client bundle) meant switching to
 * `standardSchemaResolver`, which reaches the schema through the Standard Schema
 * interface rather than a zod-specific adapter. The schema's own tests would
 * still pass if that wiring were broken — the form would simply stop showing
 * validation messages, silently. Hence these.
 */
/**
 * The cast is deliberate. These cases feed INVALID input on purpose, while the
 * resolver's parameter is typed as the parsed `LeadInput` — literal union and
 * all. Before the enum-widening fix, `requirement` was plain `string` and no
 * cast would have been needed here, so the fact that this is required is itself
 * a small proof that the fix took.
 */
const resolve = (values: Record<string, unknown>) =>
  standardSchemaResolver(leadSchema)(values as unknown as LeadInput, undefined, {
    fields: {},
    shouldUseNativeValidation: false,
  });

describe("standardSchemaResolver + leadSchema", () => {
  it("returns the parsed, normalised values when valid", async () => {
    const result = await resolve({
      name: "  Ravi Kumar  ",
      mobile: "+91 94400 18418",
      requirement: "product_supply",
    });
    expect(result.errors).toEqual({});
    expect(result.values).toMatchObject({
      name: "Ravi Kumar",
      mobile: "9440018418",
      requirement: "product_supply",
    });
  });

  it("surfaces per-field messages react-hook-form can render", async () => {
    const result = await resolve({ name: "R", mobile: "123", requirement: "" });

    // The shape RHF expects: errors keyed by field name, each with a message.
    expect(result.errors.name?.message).toBe("Please enter your name");
    expect(result.errors.mobile?.message).toBe("Enter a valid 10-digit mobile number");
    expect(result.errors.requirement?.message).toBe("Please select what you need");
  });

  it("reports no error for a field that is actually valid", async () => {
    const result = await resolve({
      name: "Ravi Kumar",
      mobile: "not-a-number",
      requirement: "other",
    });
    expect(result.errors.name).toBeUndefined();
    expect(result.errors.requirement).toBeUndefined();
    expect(result.errors.mobile).toBeDefined();
  });

  it("does not error on omitted optional fields", async () => {
    const result = await resolve({
      name: "Ravi Kumar",
      mobile: "9440018418",
      requirement: "other",
    });
    expect(result.errors.location).toBeUndefined();
    expect(result.errors.landSize).toBeUndefined();
  });
});
