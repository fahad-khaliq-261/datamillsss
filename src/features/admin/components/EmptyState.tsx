// ============================================
// EMPTY STATE COMPONENT
// Shown when no industry is selected
// ============================================

export function EmptyState() {
  return (
    <div className="text-center py-20 bg-slate-800/20 rounded-2xl border border-slate-700/30">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">
        Select an Industry
      </h3>
      <p className="text-slate-400 max-w-md mx-auto">
        Choose an industry from the options above to start managing use cases
        and insights
      </p>
    </div>
  );
}

