// ===========================================
// BUTTON COMPONENT
// ===========================================

'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useStore } from '@/hooks/useStore';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  className?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  icon: Icon,
  type = 'button',
  loading = false,
}: ButtonProps) {
  const { theme } = useStore();

  const baseStyle =
    'flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform active:scale-95';

  const getVariantStyles = () => {
    const variants = {
      primary:
        'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/30 border border-transparent',
      secondary: theme === 'dark'
        ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 border border-slate-700 backdrop-blur-sm shadow-sm'
        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm hover:shadow',
      ghost: theme === 'dark'
        ? 'bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white'
        : 'bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-800',
      danger:
        'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
    };
    return variants[variant];
  };

  const focusOffset = theme === 'dark' ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-white';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${focusOffset} ${getVariantStyles()} ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon ? (
        <Icon size={18} className="mr-2" />
      ) : null}
      {children}
    </button>
  );
}
