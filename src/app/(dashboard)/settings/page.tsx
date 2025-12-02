// ===========================================
// SETTINGS PAGE
// ===========================================

'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Mail,
  Calendar,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { createClient } from '@/lib/supabase/client';
import { PLANS } from '@/lib/config';

export default function SettingsPage() {
  const { user, authUser } = useAuth();
  const {
    subscription,
    plan,
    isPro,
    loading: subLoading,
    rowsProcessed,
    getRemainingRows,
    openCustomerPortal,
    cancelSubscription,
    resumeSubscription,
  } = useSubscription();

  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (user?.full_name) {
      setFullName(user.full_name);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!authUser) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      await supabase
        .from('profiles')
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq('id', authUser.id);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    setCanceling(true);
    try {
      await cancelSubscription();
      window.location.reload();
    } catch (error) {
      console.error('Cancel error:', error);
    } finally {
      setCanceling(false);
    }
  };

  const handleResumeSubscription = async () => {
    setCanceling(true);
    try {
      await resumeSubscription();
      window.location.reload();
    } catch (error) {
      console.error('Resume error:', error);
    } finally {
      setCanceling(false);
    }
  };

  const remainingRows = getRemainingRows();
  const planDetails = PLANS[plan];

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
      <div className="max-w-3xl mx-auto py-4 md:py-8 animate-in slide-in-from-right-10 duration-500">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Settings</h1>

        {/* User Profile Section */}
        <Card className="p-6 md:p-8 mb-6 md:mb-8 border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
              <User size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Profile Settings
              </h3>
              <p className="text-sm text-slate-400">
                Manage your account information
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                icon={User}
              />
              <Input
                label="Email"
                value={authUser?.email || ''}
                disabled
                icon={Mail}
                className="opacity-60"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Member Since
                </label>
                <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-600 rounded-xl text-slate-400">
                  <Calendar size={18} />
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : 'N/A'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Account Status
                </label>
                <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-600 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-700/50">
              {saveSuccess && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle2 size={16} />
                  Profile saved successfully
                </div>
              )}
              <Button
                variant="primary"
                onClick={handleSaveProfile}
                loading={saving}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Subscription Section */}
        <Card className="p-6 md:p-8 mb-6 md:mb-8 border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <CreditCard size={24} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Subscription & Billing
              </h3>
              <p className="text-sm text-slate-400">
                Manage your plan and payment details
              </p>
            </div>
          </div>

          {/* Current Plan Info */}
          <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 mb-6 border border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-semibold text-white">
                    {planDetails.name} Plan
                  </h4>
                  <Badge type={isPro ? 'purple' : 'neutral'}>
                    {isPro ? 'Pro' : 'Free'}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm">
                  ${planDetails.price}/month
                </p>
              </div>
              {subscription?.cancel_at_period_end && (
                <Badge type="warning">Cancels at period end</Badge>
              )}
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Rows Used</p>
                <p className="text-lg font-semibold text-white">
                  {rowsProcessed}
                  {!isPro && <span className="text-slate-500"> / 1,000</span>}
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Rows Remaining</p>
                <p className="text-lg font-semibold text-white">
                  {typeof remainingRows === 'number'
                    ? remainingRows.toLocaleString()
                    : 'Unlimited'}
                </p>
              </div>
            </div>

            {/* Next Billing Date */}
            {subscription && (
              <div className="text-sm text-slate-400">
                {subscription.cancel_at_period_end ? (
                  <span className="text-amber-400">
                    Access ends:{' '}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </span>
                ) : (
                  <>
                    Next billing date:{' '}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              onClick={openCustomerPortal}
              loading={subLoading}
              className="flex-1"
            >
              <ExternalLink size={16} className="mr-2" />
              Manage in Stripe
            </Button>
            {subscription && (
              subscription.cancel_at_period_end ? (
                <Button
                  variant="primary"
                  onClick={handleResumeSubscription}
                  loading={canceling}
                  className="flex-1"
                >
                  Resume Subscription
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={handleCancelSubscription}
                  loading={canceling}
                  className="flex-1"
                >
                  Cancel Subscription
                </Button>
              )
            )}
          </div>
        </Card>

        {/* Notifications Section */}
        <Card className="p-6 md:p-8 mb-6 md:mb-8 border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <Bell size={24} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Notifications
              </h3>
              <p className="text-sm text-slate-400">
                Configure email preferences
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Product updates', desc: 'Get notified about new features' },
              { label: 'Usage alerts', desc: 'When approaching usage limits' },
              { label: 'Billing notifications', desc: 'Payment receipts and reminders' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl"
              >
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600" />
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 md:p-8 border-red-500/20 bg-red-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
              <Shield size={24} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Danger Zone
              </h3>
              <p className="text-sm text-slate-400">
                Irreversible account actions
              </p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-200/80">
              These actions cannot be undone. Please proceed with caution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="flex-1">
              <Download size={16} className="mr-2" />
              Export All Data
            </Button>
            <Button variant="danger" className="flex-1">
              <Trash2 size={16} className="mr-2" />
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
