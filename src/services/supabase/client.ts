// ============================================
// SUPABASE CLIENT
// Single source of truth for Supabase connection
// ============================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Browser/Client-side Supabase client
 * Use this in React components and hooks
 * Returns null if Supabase is not configured
 */
export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Create a new Supabase client for server-side operations
 * Use this in API routes and Server Components
 * Returns null if Supabase is not configured
 */
export function createServerSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

