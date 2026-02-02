// ============================================
// GET USE CASES - SERVER UTILITY
// Fetches use cases from Supabase for industry pages
// ============================================

import { getUseCasesServer } from "@/services/supabase";
import { Insight } from "../types";

/**
 * Fetches use cases from Supabase for a given industry
 * Use this in Server Components (page.tsx files)
 *
 * Supabase is the ONLY data source for insights.
 *
 * @param industry - Industry slug (e.g., "healthcare")
 * @returns Array of insights formatted for display
 */
export async function getIndustryInsights(industry: string): Promise<Insight[]> {
  try {
    const useCases = await getUseCasesServer(industry);

    // Convert database format to Insight format
    return useCases.map((uc) => ({
      category: uc.category,
      title: uc.title,
      slug: uc.slug || undefined,
      summary: uc.summary || undefined,
      date: formatDate(uc.date),
      image: uc.image || undefined,
      // Link to case study page if slug exists
      href: uc.slug ? `/case-studies/${uc.slug}` : undefined,
    }));
  } catch (error) {
    console.error("[getUseCases] Error fetching from Supabase:", error);
    return [];
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

