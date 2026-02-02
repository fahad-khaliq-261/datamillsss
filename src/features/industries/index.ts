// ============================================
// INDUSTRIES FEATURE - PUBLIC API
// Export all industries feature components
// ============================================

// Components
export {
  IndustryHero,
  IndustryStats,
  HelpAreasSection,
  InsightsSection,
  CTASection,
  RelatedIndustries,
  IndustryPageTemplate,
} from "./components";

// Data
export {
  industryConfigs,
  getIndustryConfig,
  getAllIndustrySlugs,
  healthcareConfig,
  aerospaceDefenseConfig,
} from "./data";

// Lib
export { getIndustryInsights } from "./lib/getUseCases";

// Types
export type {
  IndustryConfig,
  HelpArea,
  Insight,
  Stat,
  RelatedIndustry,
} from "./types";

export { accentColorClasses } from "./types";

