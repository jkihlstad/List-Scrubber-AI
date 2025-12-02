// ===========================================
// CARD COMPONENT
// ===========================================

'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  const { theme } = useStore();

  return (
    <div
      className={`backdrop-blur-md border rounded-2xl overflow-hidden relative group transition-colors ${
        theme === 'dark'
          ? 'bg-slate-900/60 border-slate-700/50 shadow-xl'
          : 'bg-white/90 border-slate-200/80 shadow-lg shadow-slate-200/50'
      } ${className}`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        theme === 'dark' ? 'from-violet-500/5 to-transparent' : 'from-violet-500/10 to-indigo-500/5'
      }`}></div>
      {children}
    </div>
  );
}
