import Link from "next/link";
import Image from "next/image";
import { Insight, accentColorClasses, IndustryConfig } from "../types";

interface InsightsSectionProps {
  insights: Insight[];
  accentColor: IndustryConfig["accentColor"];
}

export default function InsightsSection({
  insights,
  accentColor,
}: InsightsSectionProps) {
  const colors = accentColorClasses[accentColor];

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span
              className={`${colors.text} text-sm font-semibold tracking-[0.15em] uppercase mb-4 block`}
            >
              Insights
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a192f]">
              Featured insights
            </h2>
          </div>
          <Link
            href="/insights"
            className={`mt-6 md:mt-0 ${colors.text} ${colors.textHover} font-medium flex items-center gap-2 group`}
          >
            View all insights
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => {
            // Determine the href - prioritize slug-based case study link
            const href = insight.slug
              ? `/case-studies/${insight.slug}`
              : insight.href || "#";

            return (
              <Link
                key={insight.slug || index}
                href={href}
                className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image or Placeholder */}
                <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  {insight.image ? (
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-xs font-semibold text-slate-700 rounded-sm">
                      {insight.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className={`text-lg font-semibold text-[#0a192f] mb-2 ${colors.groupHover} transition-colors line-clamp-2`}
                  >
                    {insight.title}
                  </h3>
                  {insight.summary && (
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {insight.summary}
                    </p>
                  )}
                  <span className="text-sm text-slate-500">{insight.date}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

