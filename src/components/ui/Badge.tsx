// ===========================================
// BADGE COMPONENT
// ===========================================

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'neutral' | 'success' | 'warning' | 'purple';
}

export function Badge({ children, type = 'neutral' }: BadgeProps) {
  const types = {
    neutral: 'bg-slate-800 text-slate-400 border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple:
      'bg-violet-500/10 text-violet-300 border-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]',
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${types[type]} backdrop-blur-sm`}
    >
      {children}
    </span>
  );
}
