// ============================================
// SUPABASE DATABASE TYPES
// Auto-generated types for database tables
// ============================================

import { UseCaseCategory, UseCaseStatus } from "./index";
/**
 * Database schema type for Supabase client
 */
export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          email: string;
          query: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          query: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          query?: string;
          created_at?: string;
        };
        Relationships: [];
      };
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
          status: UseCaseStatus;
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
          status?: UseCaseStatus;
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
          status?: UseCaseStatus;
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
