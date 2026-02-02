// ============================================
// ADMIN PAGE
// Main entry point for the admin panel
// ============================================

"use client";

import { useState } from "react";
import { industryConfigs } from "@/features/industries";
import { useUseCases } from "@/hooks";
import { UseCase, UseCaseFormData, Industry } from "@/types";
import {
  AdminHeader,
  EmptyState,
  IndustrySelector,
  UseCaseForm,
  UseCaseList,
  Notification,
  Button,
} from "@/features/admin";

// Convert industry configs to simple array
const industries: Industry[] = Object.entries(industryConfigs).map(
  ([slug, config]) => ({
    slug,
    title: config.title,
  })
);

export default function AdminPage() {
  // ============================================
  // STATE
  // ============================================
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editingUseCase, setEditingUseCase] = useState<UseCase | null>(null);

  // ============================================
  // HOOK - Use Cases Data
  // ============================================
  const {
    useCases,
    isLoading,
    notification,
    addUseCase,
    editUseCase,
    removeUseCase,
  } = useUseCases(selectedIndustry);

  // ============================================
  // HANDLERS
  // ============================================

  // Handle industry selection
  const handleSelectIndustry = (slug: string) => {
    setSelectedIndustry(slug);
    setShowForm(false);
    setEditingUseCase(null);
  };

  // Handle form submission (create or update)
  const handleSubmit = async (formData: UseCaseFormData): Promise<boolean> => {
    if (editingUseCase) {
      return await editUseCase(editingUseCase.id, formData);
    }
    return await addUseCase(formData);
  };

  // Handle edit button click
  const handleEdit = (useCase: UseCase) => {
    setEditingUseCase(useCase);
    setShowForm(true);
  };

  // Handle form close
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUseCase(null);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0d1f3c] to-[#0a192f] pt-24 pb-16">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <AdminHeader />

        {/* Notification */}
        <Notification notification={notification} />

        {/* Industry Selector */}
        <IndustrySelector
          industries={industries}
          selectedIndustry={selectedIndustry}
          onSelect={handleSelectIndustry}
        />

        {/* Main Content */}
        {selectedIndustry ? (
          <>
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <span className="text-cyan-400">
                  {industryConfigs[selectedIndustry]?.title}
                </span>
                <span className="text-slate-500">Use Cases</span>
                <span className="ml-2 px-2 py-1 text-xs bg-slate-700/50 rounded-full text-slate-400">
                  {useCases.length} items
                </span>
              </h2>

              <Button
                onClick={() => setShowForm(true)}
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
              >
                Add Use Case
              </Button>
            </div>

            {/* Use Case List */}
            <UseCaseList
              useCases={useCases}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={removeUseCase}
              onAddFirst={() => setShowForm(true)}
            />

            {/* Use Case Form Modal */}
            <UseCaseForm
              isOpen={showForm}
              onClose={handleCloseForm}
              onSubmit={handleSubmit}
              editingUseCase={editingUseCase}
              isLoading={isLoading}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

