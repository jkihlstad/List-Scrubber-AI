// ===========================================
// SUBSCRIPTION HOOK
// ===========================================

'use client';

import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { PLANS, USAGE_LIMITS } from '@/lib/config';
import { useStore } from './useStore';

export function useSubscription() {
  const { subscription, isPro, getPlan } = useAuth();
  const { rowsProcessed, aiCallsMade } = useStore();
  const [loading, setLoading] = useState(false);

  const plan = getPlan();
  const planDetails = PLANS[plan];
  const limits = USAGE_LIMITS[plan];

  const createCheckoutSession = useCallback(async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url, error } = await response.json();

      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const openCustomerPortal = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      const { url, error } = await response.json();

      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Portal error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelSubscription = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/cancel', {
        method: 'POST',
      });

      const { success, error } = await response.json();

      if (error) throw new Error(error);
      return success;
    } catch (error) {
      console.error('Cancel error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const resumeSubscription = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/resume', {
        method: 'POST',
      });

      const { success, error } = await response.json();

      if (error) throw new Error(error);
      return success;
    } catch (error) {
      console.error('Resume error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const canProcessRows = useCallback((rowCount: number): boolean => {
    if (limits.monthlyRows === -1) return true;
    return rowsProcessed + rowCount <= limits.monthlyRows;
  }, [rowsProcessed, limits.monthlyRows]);

  const getRemainingRows = useCallback((): number | 'unlimited' => {
    if (limits.monthlyRows === -1) return 'unlimited';
    return Math.max(0, limits.monthlyRows - rowsProcessed);
  }, [rowsProcessed, limits.monthlyRows]);

  const getUsagePercentage = useCallback((): number => {
    if (limits.monthlyRows === -1) return 0;
    return Math.min(100, (rowsProcessed / limits.monthlyRows) * 100);
  }, [rowsProcessed, limits.monthlyRows]);

  return {
    subscription,
    plan,
    planDetails,
    limits,
    isPro,
    loading,
    rowsProcessed,
    aiCallsMade,
    createCheckoutSession,
    openCustomerPortal,
    cancelSubscription,
    resumeSubscription,
    canProcessRows,
    getRemainingRows,
    getUsagePercentage,
  };
}
