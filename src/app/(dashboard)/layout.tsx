// ===========================================
// DASHBOARD LAYOUT
// ===========================================

'use client';

import { useEffect } from 'react';
import { Sidebar, MobileHeader } from '@/components/layout';
import { SupportChat } from '@/components/SupportChat';
import { useStore } from '@/hooks/useStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useStore();

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  return (
    <div className={`flex h-screen font-sans overflow-hidden relative transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-[#0f172a] text-slate-200 selection:bg-violet-500/30 selection:text-violet-200'
        : 'bg-gradient-to-br from-slate-50 via-white to-violet-50/30 text-slate-800 selection:bg-violet-500/20 selection:text-violet-900'
    }`}>
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-300 ${
          theme === 'dark' ? 'bg-violet-900/20' : 'bg-violet-400/10'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-300 ${
          theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-400/10'
        }`} />
        {theme === 'light' && (
          <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full blur-[100px] bg-pink-300/10" />
        )}
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col relative z-10 custom-scrollbar">
        <MobileHeader />
        {children}
      </main>

      {/* Support Chat Widget */}
      <SupportChat />
    </div>
  );
}
