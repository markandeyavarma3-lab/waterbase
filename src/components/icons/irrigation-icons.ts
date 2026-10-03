import { createLucideIcon } from "lucide-react";

/**
 * Line icons drawn for this business, on lucide's 24px grid and stroke, so
 * they sit anywhere a lucide icon does (including PRODUCT_CATEGORIES).
 */
const drop = (cx: number, y: number) => `M${cx} ${y}c0 0-1.8 2.3-1.8 3.5a1.8 1.8 0 0 0 3.6 0c0-1.2-1.8-3.5-1.8-3.5z`;

export const DripLineIcon = createLucideIcon("drip-line", [
  ["path", { d: "M2 6h20", key: "pipe" }],
  ["path", { d: "M6 6v2.5M12 6v2.5M18 6v2.5", key: "emitters" }],
  ["path", { d: drop(6, 11), key: "d1" }],
  ["path", { d: drop(12, 11), key: "d2" }],
  ["path", { d: drop(18, 11), key: "d3" }],
  ["path", { d: "M3 20.5h18", key: "soil" }],
]);

export const SprinklerIcon = createLucideIcon("sprinkler-head", [
  ["path", { d: "M8 21h8", key: "base" }],
  ["path", { d: "M12 21v-8", key: "riser" }],
  ["rect", { x: "9.5", y: "10", width: "5", height: "3", rx: "1", key: "head" }],
  ["path", { d: "M10 9 6.5 5.5M12 8V3.5M14 9l3.5-3.5", key: "spray" }],
  ["path", { d: "M4 8.5h.01M20 8.5h.01M3 4.5h.01M21 4.5h.01", key: "mist" }],
]);

export const RaingunIcon = createLucideIcon("raingun", [
  ["path", { d: "M5 21l4-8 4 8", key: "stand" }],
  ["path", { d: "M9 13l6-6", key: "barrel" }],
  ["path", { d: "M15 7l2-.8", key: "nozzle" }],
  ["path", { d: "M17.5 6c2.2 1 3.5 3.3 3.5 6.5", key: "jet" }],
  ["path", { d: "M21 15.5h.01M19.5 17.5h.01", key: "drops" }],
  ["path", { d: "M3 21h12", key: "ground" }],
]);

export const BorewellIcon = createLucideIcon("borewell", [
  ["path", { d: "M2 8h20", key: "ground" }],
  ["path", { d: "M10 5v17M14 5v17", key: "casing" }],
  ["path", { d: "M8.5 5h7", key: "cap" }],
  ["path", { d: "M10 17c1 .7 3 .7 4 0", key: "water" }],
  ["path", { d: "M5 12h.01M19 13h.01M6 17h.01M18 18h.01", key: "earth" }],
]);

export const PumpIcon = createLucideIcon("water-pump", [
  ["circle", { cx: "8.5", cy: "13", r: "4.5", key: "volute" }],
  ["circle", { cx: "8.5", cy: "13", r: "1.2", key: "hub" }],
  ["rect", { x: "13", y: "10", width: "8", height: "6", rx: "1", key: "motor" }],
  ["path", { d: "M8.5 8.5V4h4", key: "outlet" }],
  ["path", { d: "M3 21h18M6 17.5V21M18 16v5", key: "base" }],
]);
