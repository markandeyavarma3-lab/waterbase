import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  CloudRain,
  Filter,
  Gauge,
  Cpu,
  Workflow,
  Waves,
  Layers,
  Leaf,
  Route,
  Box,
  Cable,
  CircleDashed,
} from "lucide-react";

/**
 * The product catalogue — one list, one place.
 *
 * The same fourteen categories, with identical titles, descriptions and icons,
 * used to be written out by hand in BOTH `sections/supply.tsx` (the homepage
 * band) and `sections/product-categories.tsx` (the /products page). Two copies
 * of the same marketing copy is a guarantee that one of them eventually goes
 * stale; `folder` is the extra field /products needs, and the homepage simply
 * ignores it.
 *
 * `folder` maps to /public/products/<folder>/ — drop photos in and they appear.
 */
export type ProductCategory = {
  folder: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Which group this belongs to on the /products page. */
  group: "micro-irrigation" | "pipes" | "pumps" | "farm";
};

export const PRODUCT_GROUPS = [
  { id: "micro-irrigation", title: "Micro Irrigation & Watering" },
  { id: "pipes", title: "Pipes & Fittings" },
  { id: "pumps", title: "Pumps & Automation" },
  { id: "farm", title: "Farm Essentials" },
] as const;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  // Micro irrigation & watering
  { group: "micro-irrigation", folder: "drip-irrigation", icon: Droplets, title: "Drip Irrigation Systems", desc: "Inline & online drippers, laterals, and complete drip systems." },
  { group: "micro-irrigation", folder: "micro-mini-sprinklers", icon: CloudRain, title: "Micro & Mini Sprinklers", desc: "Low-volume sprinklers for nurseries and horticulture." },
  { group: "micro-irrigation", folder: "sprinkler-irrigation", icon: CloudRain, title: "Sprinkler Irrigation", desc: "Overhead sprinkler systems for field crops." },
  { group: "micro-irrigation", folder: "rainguns", icon: Waves, title: "Rainguns", desc: "High-discharge rainguns for large coverage areas." },
  { group: "micro-irrigation", folder: "filters-dosing-injectors", icon: Filter, title: "Filters, Dosing Pump & Injectors", desc: "Screen, disc, sand filters and fertigation tools." },

  // Pipes & fittings
  { group: "pipes", folder: "pvc-pipes", icon: Workflow, title: "PVC Pipes & Fittings", desc: "Durable PVC mains, sub-mains, and matching fittings." },
  { group: "pipes", folder: "pe-pipes", icon: Route, title: "PE Pipes & Fittings", desc: "Flexible polyethylene pipes and compression fittings." },
  { group: "pipes", folder: "hose-pipes", icon: Cable, title: "Hose Pipes & Fittings", desc: "Flexible hoses for portable and auxiliary watering." },
  { group: "pipes", folder: "column-pipes", icon: CircleDashed, title: "Column Pipes & Fittings", desc: "High-strength pipes for submersible borewell pumps." },
  { group: "pipes", folder: "casing-pipes", icon: Box, title: "Casing Pipes", desc: "Reliable casing pipes to protect borewells." },

  // Pumps & automation
  { group: "pumps", folder: "motors-pumps", icon: Gauge, title: "Motors & Pumps", desc: "Submersible, monoblock, and open-well pumps." },
  { group: "pumps", folder: "starters-others", icon: Cpu, title: "Starters & Others", desc: "Pump starters, electrical panels, and automation." },

  // Farm essentials
  { group: "farm", folder: "mulching-sheets", icon: Layers, title: "Mulching Sheets & Weed Mats", desc: "Agricultural mulching films for weed control and moisture." },
  { group: "farm", folder: "planting-material", icon: Leaf, title: "Planting Material", desc: "High-quality seeds and saplings for optimal yield." },
];

export function categoriesInGroup(group: ProductCategory["group"]): ProductCategory[] {
  return PRODUCT_CATEGORIES.filter((c) => c.group === group);
}
