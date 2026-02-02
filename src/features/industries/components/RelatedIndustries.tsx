import Link from "next/link";
import { RelatedIndustry } from "../types";

interface RelatedIndustriesProps {
  industries: RelatedIndustry[];
}

export default function RelatedIndustries({ industries }: RelatedIndustriesProps) {
  if (industries.length === 0) return null;

  return (
    <section className="bg-slate-900 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <h3 className="text-xl font-semibold text-white mb-8">
          Related Industries
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group flex items-center justify-between p-4 border border-slate-700 rounded-sm hover:border-slate-500 transition-colors"
            >
              <span className="text-slate-300 group-hover:text-white transition-colors">
                {industry.name}
              </span>
              <svg
                className="w-4 h-4 text-slate-500 group-hover:text-white transition-all group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

