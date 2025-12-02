// ===========================================
// STRIPE CUSTOMER PORTAL API ROUTE
// ===========================================

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCustomerPortalUrl } from '@/lib/stripe';

export async function POST() {
  try {
    // Verify authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's Stripe customer ID
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create portal session
    const url = await getCustomerPortalUrl(
      subscription.stripe_customer_id,
      `${appUrl}/settings`
    );

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Portal Error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
