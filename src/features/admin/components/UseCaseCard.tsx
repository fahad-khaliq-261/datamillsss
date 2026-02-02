// ============================================
// USE CASE CARD COMPONENT
// Displays a single use case with actions
// ============================================

import { UseCase, UseCaseCategory } from "@/types";

interface UseCaseCardProps {
  useCase: UseCase;
  onEdit: (useCase: UseCase) => void;
  onDelete: (id: string) => void;
}

// Category badge colors
const categoryColors: Record<UseCaseCategory, string> = {
  "Case Study": "bg-cyan-500/20 text-cyan-400",
  Article: "bg-blue-500/20 text-blue-400",
  Report: "bg-purple-500/20 text-purple-400",
  Whitepaper: "bg-emerald-500/20 text-emerald-400",
  Webinar: "bg-amber-500/20 text-amber-400",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function UseCaseCard({ useCase, onEdit, onDelete }: UseCaseCardProps) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this use case?")) {
      onDelete(useCase.id);
    }
  };

  return (
    <div className="group bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 overflow-hidden">
      <div className="p-6 flex items-start gap-6">
        {/* Image Preview */}
        {useCase.image && (
          <div className="w-24 h-24 rounded-lg bg-slate-700/50 overflow-hidden flex-shrink-0">
            <img
              src={useCase.image}
              alt={useCase.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                categoryColors[useCase.category]
              }`}
            >
              {useCase.category}
            </span>
            <span className="text-slate-500 text-sm">
              {formatDate(useCase.date)}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {useCase.title}
          </h4>

          {/* Summary */}
          {useCase.summary && (
            <p className="text-slate-400 text-sm line-clamp-2">
              {useCase.summary}
            </p>
          )}

          {/* Case Study Link */}
          {useCase.slug && (
            <a
              href={`/case-studies/${useCase.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 text-sm hover:text-cyan-300 inline-flex items-center gap-1 mt-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              /case-studies/{useCase.slug}
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(useCase)}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-colors"
            title="Edit"
          >
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
            title="Delete"
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

