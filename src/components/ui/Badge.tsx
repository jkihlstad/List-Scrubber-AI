// ===========================================
// BADGE COMPONENT
// ===========================================

'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'neutral' | 'success' | 'warning' | 'purple';
}

export function Badge({ children, type = 'neutral' }: BadgeProps) {
  const { theme } = useStore();

  const getTypeStyles = () => {
    if (theme === 'dark') {
      return {
        neutral: 'bg-slate-800 text-slate-400 border-slate-700',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        purple: 'bg-violet-500/10 text-violet-300 border-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]',
      };
    }
    return {
      neutral: 'bg-slate-100 text-slate-600 border-slate-200',
      success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      warning: 'bg-amber-50 text-amber-600 border-amber-200',
      purple: 'bg-violet-50 text-violet-600 border-violet-200',
    };
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeStyles()[type]} backdrop-blur-sm`}
    >
      {children}
    </span>
  );
}
