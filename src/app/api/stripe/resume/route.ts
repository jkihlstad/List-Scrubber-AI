// ===========================================
// RESUME SUBSCRIPTION API ROUTE
// ===========================================

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resumeSubscription } from '@/lib/stripe';

export async function POST() {
  try {
    // Verify authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .single();

    if (!subscription?.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    // Resume subscription
    await resumeSubscription(subscription.stripe_subscription_id);

    // Update database
    await supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: false })
      .eq('stripe_subscription_id', subscription.stripe_subscription_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resume Error:', error);
    return NextResponse.json(
      { error: 'Failed to resume subscription' },
      { status: 500 }
    );
  }
}
