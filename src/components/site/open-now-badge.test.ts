import { describe, it, expect } from "vitest";
import { shopStatus } from "./open-now-badge";

// Times given in UTC; IST is UTC+5:30.
const at = (iso: string) => new Date(iso);

describe("shopStatus (Mon–Sat 10 AM–7 PM IST)", () => {
  it("open on a weekday afternoon", () => {
    expect(shopStatus(at("2026-10-05T08:30:00Z"))).toEqual({ open: true, label: "Open now · until 7 PM" }); // Mon 2 PM
  });
  it("closed before opening, opens today", () => {
    expect(shopStatus(at("2026-10-05T03:00:00Z")).label).toBe("Closed now · opens 10 AM today"); // Mon 8:30 AM
  });
  it("closed after closing, opens tomorrow", () => {
    expect(shopStatus(at("2026-10-05T14:00:00Z")).label).toBe("Closed now · opens 10 AM tomorrow"); // Mon 7:30 PM
  });
  it("Sunday is closed, opens tomorrow (Monday)", () => {
    expect(shopStatus(at("2026-10-04T06:00:00Z")).label).toBe("Closed now · opens 10 AM tomorrow"); // Sun 11:30 AM
  });
  it("Saturday evening skips Sunday", () => {
    expect(shopStatus(at("2026-10-10T15:00:00Z")).label).toBe("Closed now · opens 10 AM Monday"); // Sat 8:30 PM
  });
  it("closes exactly at 7 PM", () => {
    expect(shopStatus(at("2026-10-05T13:30:00Z")).open).toBe(false); // Mon 7:00 PM
  });
});
