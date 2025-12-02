// ===========================================
// METRICS CARDS COMPONENT
// ===========================================

'use client';

import React from 'react';
import { Database, Wand2, CreditCard, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui';
import { useStore } from '@/hooks/useStore';
import { useSubscription } from '@/hooks/useSubscription';
import { useRouter } from 'next/navigation';

export function MetricsCards() {
  const router = useRouter();
  const { dataset, theme } = useStore();
  const { getRemainingRows, getUsagePercentage, isPro } = useSubscription();

  const remainingRows = getRemainingRows();
  const usagePercentage = getUsagePercentage();
  const dataHealth = dataset.length > 0 ? 85 : 0; // Simplified calculation

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Total Rows Card */}
      <Card className="p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Database size={80} className={theme === 'dark' ? 'text-violet-400' : 'text-violet-500'} />
        </div>
        <div className="relative z-10">
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Total Rows</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              {dataset.length}
            </h3>
            {dataset.length > 0 && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                theme === 'dark'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-emerald-600 bg-emerald-50 border border-emerald-200'
              }`}>
                Active
              </span>
            )}
          </div>
          <div className={`mt-4 flex items-center text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <CheckCircle2 size={16} className={`mr-1 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-500'}`} />
            <span>Ready for analysis</span>
          </div>
        </div>
      </Card>

      {/* Data Health Card */}
      <Card className="p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wand2 size={80} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'} />
        </div>
        <div className="relative z-10">
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Data Health</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              {dataHealth}%
            </h3>
          </div>
          <div className={`w-full h-1.5 rounded-full mt-5 overflow-hidden ${
            theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-200'
          }`}>
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500"
              style={{ width: `${dataHealth}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Credits/Usage Card */}
      <Card className="p-4 md:p-6 relative overflow-hidden">
        <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-400/20'
        }`} />
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {isPro ? 'Plan' : 'Rows Left'}
              </p>
              <h3 className={`text-2xl md:text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                {isPro ? 'Pro' : typeof remainingRows === 'number' ? remainingRows : remainingRows}
              </h3>
            </div>
            <div className={`p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-amber-50 text-amber-600 border-amber-200'
            }`}>
              <CreditCard size={24} />
            </div>
          </div>
          {!isPro && (
            <div className={`w-full h-1.5 rounded-full mt-4 overflow-hidden ${
              theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-200'
            }`}>
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          )}
          <button
            onClick={() => router.push('/billing')}
            className={`mt-4 text-sm font-medium transition-colors flex items-center gap-1 group ${
              theme === 'dark'
                ? 'text-violet-400 hover:text-violet-300'
                : 'text-violet-600 hover:text-violet-500'
            }`}
          >
            {isPro ? 'Manage subscription' : 'Upgrade to Pro'}
            <ChevronRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </Card>
    </div>
  );
}
