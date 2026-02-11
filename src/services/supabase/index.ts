// ============================================
// SUPABASE SERVICES - PUBLIC API
// Export all Supabase-related functionality
// ============================================

// Client
export { supabase, createServerSupabaseClient, isSupabaseConfigured } from "./client";

// Use Cases Service
export {
  getUseCasesByIndustry,
  getUseCaseById,
  getUseCaseBySlug,
  getUseCaseBySlugServer,
  getAllUseCasesServer,
  createUseCase,
  updateUseCase,
  deleteUseCase,
  getUseCasesServer,
} from "./use-cases.service";

