// ============================================
// USE CASE FORM COMPONENT
// Form for creating/editing use cases
// ============================================

"use client";

import { useState, useEffect, FormEvent, useMemo } from "react";
import { UseCaseFormData, UseCase, USE_CASE_CATEGORIES } from "@/types";
import { Button, Input, Textarea, Modal } from "./ui";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/components/editors").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 bg-slate-700/30 rounded-xl animate-pulse" />
    ),
  }
);

interface UseCaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UseCaseFormData) => Promise<boolean>;
  editingUseCase: UseCase | null;
  isLoading: boolean;
}

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .substring(0, 100); // Limit length
}

const getInitialFormData = (): UseCaseFormData => ({
  category: "Case Study",
  title: "",
  slug: "",
  summary: "",
  content_html: "",
  date: new Date().toISOString().split("T")[0],
  image: "",
  pdf_url: "",
});

export function UseCaseForm({
  isOpen,
  onClose,
  onSubmit,
  editingUseCase,
  isLoading,
}: UseCaseFormProps) {
  const [formData, setFormData] = useState<UseCaseFormData>(getInitialFormData());
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Generate a unique key for CKEditor to force re-mount when switching modes
  const editorKey = useMemo(() => {
    return editingUseCase ? `edit-${editingUseCase.id}` : `create-${Date.now()}`;
  }, [editingUseCase]);

  // Populate form when modal opens or editingUseCase changes
  useEffect(() => {
    if (!isOpen) return; // Don't update when modal is closed
    
    if (editingUseCase) {
      // Editing mode - populate with existing data
      setFormData({
        category: editingUseCase.category,
        title: editingUseCase.title,
        slug: editingUseCase.slug || "",
        summary: editingUseCase.summary || "",
        content_html: editingUseCase.content_html || "",
        date: editingUseCase.date,
        image: editingUseCase.image || "",
        pdf_url: editingUseCase.pdf_url || "",
      });
      setSlugManuallyEdited(true); // Don't auto-generate when editing
    } else {
      // Create mode - reset to initial
      setFormData(getInitialFormData());
      setSlugManuallyEdited(false);
    }
  }, [editingUseCase, isOpen]);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      // Only auto-generate slug if not manually edited
      slug: slugManuallyEdited ? prev.slug : generateSlug(value),
    }));
  };

  // Handle manual slug edit
  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setFormData((prev) => ({
      ...prev,
      slug: generateSlug(value), // Still sanitize the input
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingUseCase ? "Edit Case Study" : "Add New Case Study"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {USE_CASE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFormData({ ...formData, category })}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    formData.category === category
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <Input
          label="Title"
          isRequired
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g., How we reduced costs by 40% using AI"
        />

        {/* Slug (auto-generated) */}
        <div>
          <Input
            label="URL Slug"
            isRequired
            type="text"
            value={formData.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="auto-generated-from-title"
          />
          <p className="mt-1 text-xs text-slate-500">
            URL: /case-studies/{formData.slug || "your-slug-here"}
          </p>
        </div>

        {/* Summary (short description for cards) */}
        <Textarea
          label="Summary"
          value={formData.summary || ""}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          placeholder="Brief summary shown on cards (1-2 sentences)..."
          rows={2}
        />

        {/* Content HTML (CKEditor) */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Content <span className="text-red-400">*</span>
          </label>
          <RichTextEditor
            key={editorKey}
            value={formData.content_html || ""}
            onChange={(value) =>
              setFormData({ ...formData, content_html: value })
            }
            placeholder="Write the full case study content here..."
          />
        </div>

        {/* Date */}
        <Input
          label="Publication Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        {/* Image URL */}
        <Input
          label="Hero Image URL"
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/insights/my-image.jpg or https://..."
        />

        {/* PDF Document URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            PDF Document <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="url"
              value={formData.pdf_url || ""}
              onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
              placeholder="https://your-storage.com/case-study.pdf"
              className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
          </div>
          <p className="text-xs text-slate-500">
            Paste URL from Supabase Storage, Google Drive, Dropbox, or any file hosting service
          </p>
          
          {/* PDF Preview Card */}
          {formData.pdf_url && (
            <div className="mt-3 p-4 bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13h1.25L11 15.5 12.25 13h1.25l-1.875 3L13.5 19h-1.25L11 16.5 9.75 19H8.5l1.875-3L8.5 13z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">PDF Document Attached</p>
                    <p className="text-xs text-slate-400 truncate max-w-[200px]">{formData.pdf_url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={formData.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors"
                  >
                    Preview
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, pdf_url: "" })}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Remove PDF"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="flex-1"
            leftIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          >
            {editingUseCase ? "Update" : "Create"} Case Study
          </Button>
        </div>
      </form>
    </Modal>
  );
}
