import { describe, it, expect } from "vitest";
import { csvCell, toCsv } from "./csv";

/**
 * The lead export is generated from names and locations typed into a PUBLIC,
 * unauthenticated form, and it is opened by the business owner in Excel. That
 * makes it a genuine injection sink, so it gets genuine tests.
 */

describe("csvCell — formula injection", () => {
  it.each([
    ["equals", "=HYPERLINK(\"http://evil.test\",\"Click\")"],
    ["plus", "+1+1"],
    ["minus", "-2+3"],
    ["at", "@SUM(A1:A9)"],
    ["tab", "\tcmd"],
    ["carriage return", "\rcmd"],
  ])("prefixes an apostrophe for a leading %s", (_label, payload) => {
    const out = csvCell(payload);
    expect(out.startsWith("\"'")).toBe(true);
  });

  it("neutralises the classic DDE payload", () => {
    const out = csvCell('=cmd|\'/C calc\'!A0');
    // Must not begin with a bare = once the surrounding quote is removed.
    expect(out.slice(1).startsWith("=")).toBe(false);
    expect(out.slice(1).startsWith("'")).toBe(true);
  });

  it("leaves ordinary text alone", () => {
    expect(csvCell("Ravi Kumar")).toBe('"Ravi Kumar"');
    expect(csvCell("Bhimavaram")).toBe('"Bhimavaram"');
  });

  it("does not treat a minus INSIDE the text as a formula", () => {
    expect(csvCell("Guntur-2")).toBe('"Guntur-2"');
  });
});

describe("csvCell — quoting and escaping", () => {
  it("doubles embedded quotes", () => {
    expect(csvCell('He said "hello"')).toBe('"He said ""hello"""');
  });

  it("keeps commas inside the quoted field", () => {
    expect(csvCell("Eluru, West Godavari")).toBe('"Eluru, West Godavari"');
  });

  it("keeps newlines inside the quoted field", () => {
    expect(csvCell("line one\nline two")).toBe('"line one\nline two"');
  });

  it.each([
    [null, '""'],
    [undefined, '""'],
    ["", '""'],
  ])("renders %s as an empty quoted field", (input, expected) => {
    expect(csvCell(input)).toBe(expected);
  });

  it("stringifies non-strings", () => {
    expect(csvCell(42)).toBe('"42"');
    expect(csvCell(true)).toBe('"true"');
  });

  it("preserves Telugu characters unchanged", () => {
    expect(csvCell("రవి కుమార్")).toBe('"రవి కుమార్"');
  });
});

describe("toCsv", () => {
  it("starts with a UTF-8 BOM so Excel does not mangle Telugu or ₹", () => {
    expect(toCsv(["A"], [["రవి"]]).charCodeAt(0)).toBe(0xfeff);
  });

  it("separates rows with CRLF", () => {
    const csv = toCsv(["A", "B"], [["1", "2"]]);
    expect(csv).toBe('﻿"A","B"\r\n"1","2"');
  });

  it("escapes every cell in the body, not just the first", () => {
    const csv = toCsv(["Name", "Notes"], [["Ravi", "=cmd"]]);
    expect(csv).toContain('"\'=cmd"');
  });

  it("handles an empty body", () => {
    expect(toCsv(["A"], [])).toBe('﻿"A"');
  });
});
