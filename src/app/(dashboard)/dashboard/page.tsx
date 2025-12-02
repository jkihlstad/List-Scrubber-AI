// ===========================================
// DASHBOARD PAGE
// ===========================================

'use client';

import { MetricsCards, DataTable, AIChat } from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your data cleaning pipeline with AI.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
          <span className="text-xs font-medium text-slate-400 px-3">Status:</span>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-auto lg:h-[600px]">
        {/* Data Table */}
        <div className="lg:col-span-2 h-[400px] lg:h-full">
          <DataTable />
        </div>

        {/* AI Chat */}
        <div className="h-[500px] lg:h-full">
          <AIChat />
        </div>
      </div>
    </div>
  );
}
