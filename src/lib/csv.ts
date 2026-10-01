/**
 * Escapes one cell for CSV.
 *
 * Beyond the usual quote-doubling, this neutralises formula injection: Excel and
 * Google Sheets execute any cell whose text begins with = + - @ (or a leading
 * tab/carriage return). `name` and `location` arrive from a public,
 * unauthenticated form, so without this a lead submitted as `=HYPERLINK(...)`
 * would run as a live formula the moment the owner opened their own export. A
 * leading apostrophe forces the spreadsheet to treat the value as literal text.
 *
 * Lives in lib/ rather than inside the table component so it can be tested
 * without pulling React in — this is security-relevant logic, and it was
 * previously unreachable from any test.
 */
export function csvCell(raw: unknown): string {
  const text = String(raw ?? "");
  const guarded = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${guarded.replace(/"/g, '""')}"`;
}

/**
 * Builds a full CSV document from a header row and body rows.
 *
 * The leading BOM makes Excel read the file as UTF-8, so Telugu names and the ₹
 * sign survive the round trip instead of arriving as mojibake. CRLF line
 * endings are what Excel expects.
 */
export function toCsv(header: readonly string[], rows: readonly unknown[][]): string {
  return (
    "﻿" +
    [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n")
  );
}
