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
  const { dataset } = useStore();
  const { getRemainingRows, getUsagePercentage, isPro } = useSubscription();

  const remainingRows = getRemainingRows();
  const usagePercentage = getUsagePercentage();
  const dataHealth = dataset.length > 0 ? 85 : 0; // Simplified calculation

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Total Rows Card */}
      <Card className="p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Database size={80} className="text-violet-400 hidden sm:block" />
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-slate-400">Total Rows</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {dataset.length}
            </h3>
            {dataset.length > 0 && (
              <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-400">
            <CheckCircle2 size={16} className="mr-1 text-violet-400" />
            <span>Ready for analysis</span>
          </div>
        </div>
      </Card>

      {/* Data Health Card */}
      <Card className="p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wand2 size={80} className="text-emerald-400 hidden sm:block" />
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-slate-400">Data Health</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {dataHealth}%
            </h3>
          </div>
          <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500"
              style={{ width: `${dataHealth}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Credits/Usage Card */}
      <Card className="p-4 md:p-6 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">
                {isPro ? 'Plan' : 'Rows Left'}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
                {isPro ? 'Pro' : typeof remainingRows === 'number' ? remainingRows : remainingRows}
              </h3>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <CreditCard size={24} />
            </div>
          </div>
          {!isPro && (
            <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          )}
          <button
            onClick={() => router.push('/billing')}
            className="mt-4 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 group"
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
