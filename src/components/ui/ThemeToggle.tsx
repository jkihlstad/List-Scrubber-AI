// ===========================================
// THEME TOGGLE COMPONENT
// ===========================================

'use client';

import { Sun, Moon } from 'lucide-react';
import { useStore } from '@/hooks/useStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700'
          : 'bg-white hover:bg-gray-100 text-slate-700 border border-gray-200 shadow-sm'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
}
