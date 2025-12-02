// ===========================================
// CARD COMPONENT
// ===========================================

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden relative group ${className}`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      {children}
    </div>
  );
}
