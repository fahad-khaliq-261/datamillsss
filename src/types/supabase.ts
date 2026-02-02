// ============================================
// SUPABASE DATABASE TYPES
// Auto-generated types for database tables
// ============================================

import { UseCaseCategory } from "./index";

/**
 * Database schema type for Supabase client
 */
export interface Database {
  public: {
    Tables: {
      use_cases: {
        Row: {
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
        };
        Insert: {
          id?: string;
          industry: string;
          category: UseCaseCategory;
          title: string;
          slug: string;
          summary?: string | null;
          content_html?: string | null;
          date: string;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          industry?: string;
          category?: UseCaseCategory;
          title?: string;
          slug?: string;
          summary?: string | null;
          content_html?: string | null;
          date?: string;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
