// ============================================
// ADMIN HEADER COMPONENT
// Page header with title and connection status
// ============================================

export function AdminHeader() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <svg
            className="w-6 h-6 text-white"
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
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-slate-400 text-lg">
            Manage use cases and insights for industries
          </p>
        </div>
      </div>

      {/* Connection Status */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Connected to Supabase
      </div>
    </div>
  );
}

