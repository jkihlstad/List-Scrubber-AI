// ===========================================
// MOBILE HEADER COMPONENT
// ===========================================

'use client';

import React from 'react';
import { Database, Menu } from 'lucide-react';
import { useStore } from '@/hooks/useStore';

export function MobileHeader() {
  const { setSidebarOpen } = useStore();

  return (
    <header className="md:hidden bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2 font-bold text-white">
        <Database size={24} className="text-violet-500" />
        CleanData
      </div>
      <button onClick={() => setSidebarOpen(true)}>
        <Menu size={24} className="text-slate-400" />
      </button>
    </header>
  );
}
