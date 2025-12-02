// ===========================================
// BILLING PAGE
// ===========================================

'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useSubscription } from '@/hooks/useSubscription';
import { useStore } from '@/hooks/useStore';
import { PLANS } from '@/lib/config';

export default function BillingPage() {
  const { theme } = useStore();
  const {
    subscription,
    plan,
    isPro,
    loading,
    createCheckoutSession,
    openCustomerPortal,
  } = useSubscription();
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    setUpgrading(true);
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Upgrade error:', error);
    } finally {
      setUpgrading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
    } catch (error) {
      console.error('Portal error:', error);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
      <div className="max-w-5xl mx-auto py-6 md:py-12 animate-in fade-in zoom-in-95 duration-500">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 relative">
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] -z-10 ${
            theme === 'dark' ? 'bg-violet-500/20' : 'bg-violet-400/20'
          }`} />
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            Simple, transparent pricing
          </h1>
          <p className={`text-base md:text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Scale your data operations without breaking the bank.
          </p>
        </div>

        {/* Current Plan Banner */}
        {subscription && (
          <Card className="p-4 md:p-6 mb-8 border-violet-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge type="purple">Current Plan</Badge>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    {PLANS[plan].name}
                  </span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {subscription.cancel_at_period_end
                    ? `Your subscription will end on ${new Date(
                        subscription.current_period_end
                      ).toLocaleDateString()}`
                    : `Next billing date: ${new Date(
                        subscription.current_period_end
                      ).toLocaleDateString()}`}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={handleManageSubscription}
                loading={loading}
              >
                Manage Subscription
              </Button>
            </div>
          </Card>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Free Plan */}
          <Card
            className={`p-6 md:p-8 transition-colors ${
              plan === 'free'
                ? 'border-violet-500/50'
                : theme === 'dark'
                  ? 'border-slate-700 hover:border-slate-500'
                  : 'border-slate-200 hover:border-violet-300'
            }`}
          >
            <h3 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Free</h3>
            <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Get started with basic features.
            </p>
            <div className={`mt-6 md:mt-8 flex items-baseline ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                $0
              </span>
              <span className={`ml-2 text-lg md:text-xl ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>/mo</span>
            </div>
            <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              {PLANS.free.features.map((feat, i) => (
                <li key={i} className={`flex items-center text-sm md:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  <CheckCircle2 size={20} className="text-emerald-500 mr-3 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
            <Button
              variant="secondary"
              className="w-full mt-6 md:mt-8 py-3 cursor-pointer"
              disabled={plan === 'free'}
            >
              {plan === 'free' ? 'Current Plan' : 'Downgrade'}
            </Button>
          </Card>

          {/* Standard Plan - Most Popular */}
          <Card
            className={`p-6 md:p-8 relative overflow-visible transform hover:-translate-y-1 transition-transform duration-300 ${
              plan === 'standard'
                ? 'border-violet-500/50'
                : 'border-violet-500/50'
            }`}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-violet-500/40 tracking-wide uppercase">
              Most Popular
            </div>
            <div className={`absolute inset-0 blur-xl -z-10 ${theme === 'dark' ? 'bg-violet-500/5' : 'bg-violet-400/10'}`} />

            <h3 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Standard</h3>
            <p className={`mt-2 ${theme === 'dark' ? 'text-violet-200/70' : 'text-violet-600/70'}`}>For growing businesses.</p>
            <div className={`mt-6 md:mt-8 flex items-baseline ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                ${PLANS.standard.price}
              </span>
              <span className={`ml-2 text-lg md:text-xl ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>/mo</span>
            </div>
            <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              {PLANS.standard.features.map((feat, i) => (
                <li key={i} className={`flex items-center text-sm md:text-base ${theme === 'dark' ? 'text-slate-200' : 'text-slate-600'}`}>
                  <div className="p-1 bg-violet-500 rounded-full mr-3 shadow-lg shadow-violet-500/50 flex-shrink-0">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              className="w-full mt-6 md:mt-8 py-3 shadow-violet-500/25 cursor-pointer"
              onClick={() => handleUpgrade(PLANS.standard.priceId)}
              disabled={plan === 'standard' || plan === 'pro' || upgrading}
              loading={upgrading}
            >
              {plan === 'standard' ? (
                'Current Plan'
              ) : plan === 'pro' ? (
                'Downgrade'
              ) : upgrading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Redirecting...
                </>
              ) : (
                'Upgrade to Standard'
              )}
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card
            className={`p-6 md:p-8 transition-colors ${
              plan === 'pro'
                ? 'border-violet-500/50'
                : theme === 'dark'
                  ? 'border-slate-700 hover:border-slate-500'
                  : 'border-slate-200 hover:border-violet-300'
            }`}
          >
            <h3 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Pro</h3>
            <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>For serious data teams.</p>
            <div className={`mt-6 md:mt-8 flex items-baseline ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                ${PLANS.pro.price}
              </span>
              <span className={`ml-2 text-lg md:text-xl ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>/mo</span>
            </div>
            <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              {PLANS.pro.features.map((feat, i) => (
                <li key={i} className={`flex items-center text-sm md:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  <CheckCircle2 size={20} className="text-emerald-500 mr-3 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              className="w-full mt-6 md:mt-8 py-3 cursor-pointer"
              onClick={() => handleUpgrade(PLANS.pro.priceId)}
              disabled={plan === 'pro' || upgrading}
              loading={upgrading}
            >
              {plan === 'pro' ? (
                'Current Plan'
              ) : upgrading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Redirecting...
                </>
              ) : (
                'Upgrade to Pro'
              )}
            </Button>
          </Card>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-12 md:mt-16 text-center">
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
            Questions about pricing?{' '}
            <button className={`font-medium ${
              theme === 'dark' ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-500'
            }`}>
              Contact our sales team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
