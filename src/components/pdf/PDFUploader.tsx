// ============================================
// PDF UPLOADER COMPONENT
// Upload PDF files to Supabase Storage
// For use in admin panel
// ============================================

"use client";

import { useState, useRef, ChangeEvent } from "react";
import { supabase } from "@/services/supabase/client";

interface PDFUploaderProps {
  currentPdfUrl?: string;
  onUploadComplete: (url: string) => void;
  onRemove: () => void;
}

export function PDFUploader({ currentPdfUrl, onUploadComplete, onRemove }: PDFUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Please select a PDF file");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError("File size must be less than 10MB");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);
    setFileName(file.name);

    try {
      // Check if Supabase is configured
      if (!supabase) {
        throw new Error("Storage is not configured. Please set up Supabase.");
      }

      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueFileName = `${timestamp}-${sanitizedName}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("case-study-pdfs")
        .upload(uniqueFileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("case-study-pdfs")
        .getPublicUrl(data.path);

      setUploadProgress(100);
      onUploadComplete(urlData.publicUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onRemove();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // If PDF is already attached
  if (currentPdfUrl) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          PDF Document
        </label>
        <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13h1.25L11 15.5 12.25 13h1.25l-1.875 3L13.5 19h-1.25L11 16.5 9.75 19H8.5l1.875-3L8.5 13z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  PDF Uploaded Successfully
                </p>
                <p className="text-xs text-slate-400 truncate max-w-[250px]">{currentPdfUrl.split("/").pop()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={currentPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors"
              >
                Preview
              </a>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Remove PDF"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          This PDF will be displayed as the case study content
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        PDF Document <span className="text-slate-500 font-normal">(Upload as content)</span>
      </label>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Area */}
      {!isUploading ? (
        <button
          type="button"
          onClick={triggerFileInput}
          className="w-full p-6 border-2 border-dashed border-slate-600/50 hover:border-cyan-500/50 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all group"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-700/50 group-hover:bg-cyan-500/10 flex items-center justify-center transition-colors">
              <svg className="w-7 h-7 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Click to upload PDF
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF up to 10MB • Will be displayed as page content
              </p>
            </div>
          </div>
        </button>
      ) : (
        /* Uploading State */
        <div className="p-6 border border-slate-600/50 rounded-xl bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{fileName}</p>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Uploading...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Upload a PDF document to use as the case study content. The PDF pages will be displayed directly on the page.
      </p>
    </div>
  );
}

