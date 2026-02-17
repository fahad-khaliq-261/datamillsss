// ============================================
// PDF CONTENT WRAPPER
// Client component wrapper for dynamic PDF loading
// ============================================

"use client";

import dynamic from "next/dynamic";

const PDFContentViewer = dynamic(
  () => import("./PDFContentViewer").then((mod) => mod.PDFContentViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400">Loading document...</p>
      </div>
    ),
  }
);

interface PDFContentWrapperProps {
  pdfUrl: string;
}

export function PDFContentWrapper({ pdfUrl }: PDFContentWrapperProps) {
  return <PDFContentViewer pdfUrl={pdfUrl} />;
}

