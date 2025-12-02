// ===========================================
// INPUT COMPONENT
// ===========================================

'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
}

export function Input({
  label,
  error,
  icon: Icon,
  rightElement,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`
            block w-full bg-slate-900 border border-slate-600 rounded-xl
            p-3 text-white placeholder-slate-500
            focus:ring-2 focus:ring-violet-500 focus:border-transparent
            transition-all shadow-inner
            ${Icon ? 'pl-10' : ''}
            ${rightElement ? 'pr-20' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
