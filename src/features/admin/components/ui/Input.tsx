// ============================================
// INPUT COMPONENT
// Reusable input field with label
// ============================================

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isRequired?: boolean;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isRequired?: boolean;
}

const baseStyles = `
  w-full px-4 py-3 
  bg-slate-700/30 border border-slate-600/50 rounded-xl 
  text-white placeholder-slate-500 
  focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
  transition-colors
`;

export function Input({
  label,
  isRequired = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
        {isRequired && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input className={`${baseStyles} ${className}`} {...props} />
    </div>
  );
}

export function Textarea({
  label,
  isRequired = false,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
        {isRequired && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        className={`${baseStyles} resize-none ${className}`}
        {...props}
      />
    </div>
  );
}

