// ============================================
// USE CASES SERVICE
// All database operations for use cases
// ============================================

import { supabase, createServerSupabaseClient } from "./client";
import { UseCase, UseCaseFormData } from "@/types";

/**
 * UseCasesService - Handles all CRUD operations for use cases
 *
 * USAGE:
 * - Client-side: Use the exported functions directly
 * - Server-side: Use the Server functions (getUseCasesServer)
 */

// ============================================
// READ OPERATIONS
// ============================================

/**
 * Fetch all use cases for a specific industry
 * @param industry - Industry slug (e.g., "healthcare")
 * @returns Array of use cases sorted by date (newest first)
 */
export async function getUseCasesByIndustry(
  industry: string
): Promise<UseCase[]> {
  const { data, error } = await supabase
    .from("use_cases")
    .select("*")
    .eq("industry", industry)
    .order("date", { ascending: false });

  if (error) {
    console.error("[UseCasesService] Error fetching use cases:", error);
    throw new Error(`Failed to fetch use cases: ${error.message}`);
  }

  return data || [];
}

/**
 * Fetch a single use case by ID
 * @param id - Use case UUID
 * @returns Use case or null if not found
 */
export async function getUseCaseById(id: string): Promise<UseCase | null> {
  const { data, error } = await supabase
    .from("use_cases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[UseCasesService] Error fetching use case:", error);
    return null;
  }

  return data;
}

/**
 * Fetch a single use case by slug
 * @param slug - Use case slug (URL-friendly identifier)
 * @returns Use case or null if not found
 */
export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  const { data, error } = await supabase
    .from("use_cases")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[UseCasesService] Error fetching use case by slug:", error);
    return null;
  }

  return data;
}

/**
 * Server-side: Fetch a single use case by slug
 * Use this in Server Components (page.tsx files)
 */
export async function getUseCaseBySlugServer(slug: string): Promise<UseCase | null> {
  const serverClient = createServerSupabaseClient();

  const { data, error } = await serverClient
    .from("use_cases")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[UseCasesService] Server error fetching use case by slug:", error);
    return null;
  }

  return data;
}

/**
 * Server-side: Fetch all use cases (for static generation)
 */
export async function getAllUseCasesServer(): Promise<UseCase[]> {
  const serverClient = createServerSupabaseClient();

  const { data, error } = await serverClient
    .from("use_cases")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("[UseCasesService] Server error fetching all use cases:", error);
    return [];
  }

  return data || [];
}

// ============================================
// CREATE OPERATIONS
// ============================================

/**
 * Create a new use case
 * @param industry - Industry slug
 * @param formData - Form data for the new use case
 * @returns Created use case
 */
export async function createUseCase(
  industry: string,
  formData: UseCaseFormData
): Promise<UseCase> {
  const { data, error } = await supabase
    .from("use_cases")
    .insert({
      industry,
      category: formData.category,
      title: formData.title,
      slug: formData.slug,
      summary: formData.summary || null,
      content_html: formData.content_html || null,
      date: formData.date,
      image: formData.image || null,
    })
    .select()
    .single();

  if (error) {
    console.error("[UseCasesService] Error creating use case:", error);
    throw new Error(`Failed to create use case: ${error.message}`);
  }

  return data;
}

// ============================================
// UPDATE OPERATIONS
// ============================================

/**
 * Update an existing use case
 * @param id - Use case UUID
 * @param formData - Updated form data
 * @returns Updated use case
 */
export async function updateUseCase(
  id: string,
  formData: Partial<UseCaseFormData>
): Promise<UseCase> {
  const { data, error } = await supabase
    .from("use_cases")
    .update({
      category: formData.category,
      title: formData.title,
      slug: formData.slug,
      summary: formData.summary || null,
      content_html: formData.content_html || null,
      date: formData.date,
      image: formData.image || null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[UseCasesService] Error updating use case:", error);
    throw new Error(`Failed to update use case: ${error.message}`);
  }

  return data;
}

// ============================================
// DELETE OPERATIONS
// ============================================

/**
 * Delete a use case
 * @param id - Use case UUID
 */
export async function deleteUseCase(id: string): Promise<void> {
  const { error } = await supabase.from("use_cases").delete().eq("id", id);

  if (error) {
    console.error("[UseCasesService] Error deleting use case:", error);
    throw new Error(`Failed to delete use case: ${error.message}`);
  }
}

// ============================================
// SERVER-SIDE OPERATIONS
// For use in Server Components and API routes
// ============================================

/**
 * Server-side: Fetch use cases for an industry
 * Use this in Server Components (page.tsx files)
 */
export async function getUseCasesServer(industry: string): Promise<UseCase[]> {
  const serverClient = createServerSupabaseClient();

  const { data, error } = await serverClient
    .from("use_cases")
    .select("*")
    .eq("industry", industry)
    .order("date", { ascending: false });

  if (error) {
    console.error("[UseCasesService] Server error fetching use cases:", error);
    return [];
  }

  return data || [];
}

