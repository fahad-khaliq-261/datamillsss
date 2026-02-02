// ============================================
// USE CASE LIST COMPONENT
// Displays list of use cases with loading/empty states
// ============================================

import { UseCase } from "@/types";
import { UseCaseCard } from "./UseCaseCard";
import { Button } from "./ui";

interface UseCaseListProps {
  useCases: UseCase[];
  isLoading: boolean;
  onEdit: (useCase: UseCase) => void;
  onDelete: (id: string) => void;
  onAddFirst: () => void;
}

export function UseCaseList({
  useCases,
  isLoading,
  onEdit,
  onDelete,
  onAddFirst,
}: UseCaseListProps) {
  // Loading state
  if (isLoading && useCases.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-12 h-12 animate-spin mx-auto text-cyan-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="mt-4 text-slate-400">Loading use cases...</p>
      </div>
    );
  }

  // Empty state
  if (useCases.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/50">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          No use cases yet
        </h3>
        <p className="text-slate-500 mb-6">
          Start by adding your first use case for this industry
        </p>
        <Button
          onClick={onAddFirst}
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
          Add First Use Case
        </Button>
      </div>
    );
  }

  // List of use cases
  return (
    <div className="space-y-4">
      {useCases.map((useCase) => (
        <UseCaseCard
          key={useCase.id}
          useCase={useCase}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

