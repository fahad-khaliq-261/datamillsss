// ============================================
// INDUSTRY SELECTOR COMPONENT
// Grid of industry cards for selection
// ============================================

import { Industry } from "@/types";

interface IndustrySelectorProps {
  industries: Industry[];
  selectedIndustry: string;
  onSelect: (slug: string) => void;
}

export function IndustrySelector({
  industries,
  selectedIndustry,
  onSelect,
}: IndustrySelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-slate-300 mb-3">
        Select Industry
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {industries.map((industry) => {
          const isSelected = selectedIndustry === industry.slug;

          return (
            <button
              key={industry.slug}
              onClick={() => onSelect(industry.slug)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left group
                ${
                  isSelected
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-800/30 border-slate-700/50 hover:border-slate-500 hover:bg-slate-800/50"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-3 h-3 rounded-full transition-colors
                    ${
                      isSelected
                        ? "bg-cyan-400"
                        : "bg-slate-500 group-hover:bg-slate-400"
                    }
                  `}
                />
                <span
                  className={`font-medium ${
                    isSelected ? "text-white" : "text-slate-300"
                  }`}
                >
                  {industry.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

