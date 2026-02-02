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
