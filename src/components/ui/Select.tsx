// ===========================================
// SELECT COMPONENT
// ===========================================

'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  className = '',
  error,
}: SelectProps) {
  const { theme } = useStore();

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          block w-full rounded-xl p-3
          focus:ring-2 focus:ring-violet-500 focus:border-transparent
          appearance-none cursor-pointer
          ${theme === 'dark'
            ? 'bg-slate-900 border border-slate-600 text-white'
            : 'bg-white border border-slate-200 text-slate-800'
          }
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${theme === 'dark' ? '%236b7280' : '%2394a3b8'}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
