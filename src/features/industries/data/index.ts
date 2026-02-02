// Central registry of all industry configurations
// Add new industries here as you create them

import { IndustryConfig } from "../types";
import { aerospaceDefenseConfig } from "./aerospace-and-defense";
import { healthcareConfig } from "./healthcare";

// Registry of all industry configs by slug
export const industryConfigs: Record<string, IndustryConfig> = {
  "aerospace-and-defense": aerospaceDefenseConfig,
  "healthcare": healthcareConfig,
};

// Helper to get config by slug
export function getIndustryConfig(slug: string): IndustryConfig | undefined {
  return industryConfigs[slug];
}

// Get all industry slugs (useful for generating static paths)
export function getAllIndustrySlugs(): string[] {
  return Object.keys(industryConfigs);
}

// Export individual configs for direct imports
export { aerospaceDefenseConfig } from "./aerospace-and-defense";
export { healthcareConfig } from "./healthcare";

