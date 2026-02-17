// ============================================
// PDF CONTENT VIEWER COMPONENT
// Renders PDF pages as inline content
// Looks like regular HTML content on the page
// ============================================

"use client";

import { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker on client side only
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PDFContentViewerProps {
  pdfUrl: string;
  className?: string;
}

export function PDFContentViewer({ pdfUrl, className = "" }: PDFContentViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setLoadError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
    setLoadError("Failed to load PDF document");
    setIsLoading(false);
  }, []);

  if (loadError) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-400">{loadError}</p>
      </div>
    );
  }

  return (
    <div className={`pdf-content-viewer ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4" />
          <p className="text-slate-400">Loading document...</p>
        </div>
      )}

      {/* PDF Document */}
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={null}
        className="pdf-document"
      >
        {/* Render all pages */}
        {numPages && Array.from({ length: numPages }, (_, index) => (
          <div
            key={`page-${index + 1}`}
            className="pdf-page-wrapper mb-8 last:mb-0"
          >
            <Page
              pageNumber={index + 1}
              className="pdf-page mx-auto"
              width={800}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              loading={
                <div className="w-full h-[600px] bg-slate-800/30 rounded-lg animate-pulse flex items-center justify-center">
                  <span className="text-slate-500">Loading page {index + 1}...</span>
                </div>
              }
            />
            {/* Page number indicator */}
            {numPages > 1 && (
              <div className="text-center mt-4 text-sm text-slate-500">
                Page {index + 1} of {numPages}
              </div>
            )}
          </div>
        ))}
      </Document>

      {/* PDF Styles */}
      <style jsx global>{`
        .pdf-content-viewer .pdf-document {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .pdf-content-viewer .pdf-page-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .pdf-content-viewer .pdf-page {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        
        .pdf-content-viewer .pdf-page canvas {
          max-width: 100%;
          height: auto !important;
        }
        
        .pdf-content-viewer .react-pdf__Page__textContent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          line-height: 1;
          pointer-events: all;
        }
        
        .pdf-content-viewer .react-pdf__Page__textContent span {
          color: transparent;
          position: absolute;
          white-space: pre;
          transform-origin: 0 0;
          cursor: text;
        }
        
        .pdf-content-viewer .react-pdf__Page__textContent span::selection {
          background: rgba(6, 182, 212, 0.3);
        }
        
        @media (max-width: 768px) {
          .pdf-content-viewer .pdf-page {
            border-radius: 4px;
          }
        }
      `}</style>
    </div>
  );
}

