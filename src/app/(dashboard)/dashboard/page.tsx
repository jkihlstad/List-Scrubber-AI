// ===========================================
// DASHBOARD PAGE
// ===========================================

'use client';

import { MetricsCards, DataTable, AIChat } from '@/components/dashboard';
import { useStore } from '@/hooks/useStore';

export default function DashboardPage() {
  const { theme } = useStore();

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Dashboard
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Manage your data cleaning pipeline with AI.
          </p>
        </div>
        <div className={`flex items-center gap-3 p-1.5 rounded-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-slate-800/50 border-slate-700/50'
            : 'bg-white/90 border-slate-200/80 shadow-sm'
        }`}>
          <span className={`text-xs font-medium px-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Status:</span>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
            theme === 'dark'
              ? 'bg-emerald-500/10 border-emerald-500/20'
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`text-xs font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
              System Operational
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mb-6 md:mb-8">
        <MetricsCards />
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Data Table */}
        <div className="lg:col-span-2 h-[500px] max-h-[500px]">
          <DataTable />
        </div>

        {/* AI Chat */}
        <div className="h-[500px] max-h-[500px]">
          <AIChat />
        </div>
      </div>
    </div>
  );
}
