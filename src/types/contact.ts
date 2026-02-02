// ============================================
// CONTACT FORM TYPES
// ============================================

export interface ContactFormData {
  email: string;
  query: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  created_at: string;
}

export interface ContactFormState {
  success: boolean;
  error: string | null;
}

