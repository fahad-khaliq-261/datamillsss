// ============================================
// CENTRAL TYPE DEFINITIONS
// All shared types are defined here
// ============================================

/**
 * Use Case - Represents an article, case study, or report
 * stored in Supabase for a specific industry
 */
export interface UseCase {
  id: string;
  industry: string;
  category: UseCaseCategory;
  title: string;
  slug: string;
  summary: string | null;
  content_html: string | null;
  date: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Form data for creating/updating use cases
 */
export interface UseCaseFormData {
  category: UseCaseCategory;
  title: string;
  slug: string;
  summary?: string;
  content_html?: string;
  date: string;
  image?: string;
}

/**
 * Available categories for use cases
 */
export type UseCaseCategory =
  | "Article"
  | "Case Study"
  | "Report"
  | "Whitepaper"
  | "Webinar";

export const USE_CASE_CATEGORIES: UseCaseCategory[] = [
  "Article",
  "Case Study",
  "Report",
  "Whitepaper",
  "Webinar",
];

/**
 * Industry configuration
 */
export interface Industry {
  slug: string;
  title: string;
}

/**
 * Notification state for UI feedback
 */
export interface Notification {
  type: "success" | "error";
  message: string;
}

