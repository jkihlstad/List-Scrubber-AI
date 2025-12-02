// ===========================================
// DASHBOARD LAYOUT
// ===========================================

'use client';

import { Sidebar, MobileHeader } from '@/components/layout';
import { SupportChat } from '@/components/SupportChat';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-violet-500/30 selection:text-violet-200 overflow-hidden relative">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
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
