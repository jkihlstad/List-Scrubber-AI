// ===========================================
// STRIPE WEBHOOK HANDLER
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/server';

// Disable body parsing for webhooks
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const supabase = await createAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (userId && subscriptionId) {
          // Get subscription details
          const subscriptionData = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscriptionData.items.data[0].price.id;

          // Determine plan based on price ID
          const planId = priceId === process.env.STRIPE_PRO_PRICE_ID ? 'pro' : 'standard';

          // Get period timestamps
          const periodStart = (subscriptionData as unknown as { current_period_start: number }).current_period_start;
          const periodEnd = (subscriptionData as unknown as { current_period_end: number }).current_period_end;
          const cancelAtEnd = (subscriptionData as unknown as { cancel_at_period_end: boolean }).cancel_at_period_end;

          // Upsert subscription in database
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            plan_id: planId,
            status: subscriptionData.status,
            current_period_start: new Date(periodStart * 1000).toISOString(),
            current_period_end: new Date(periodEnd * 1000).toISOString(),
            cancel_at_period_end: cancelAtEnd,
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subEvent = event.data.object as Stripe.Subscription;
        const priceId = subEvent.items.data[0].price.id;
        const planId = priceId === process.env.STRIPE_PRO_PRICE_ID ? 'pro' : 'standard';

        // Get period timestamps with type assertion
        const subPeriodStart = (subEvent as unknown as { current_period_start: number }).current_period_start;
        const subPeriodEnd = (subEvent as unknown as { current_period_end: number }).current_period_end;
        const subCancelAtEnd = (subEvent as unknown as { cancel_at_period_end: boolean }).cancel_at_period_end;

        await supabase
          .from('subscriptions')
          .update({
            plan_id: planId,
            status: subEvent.status,
            current_period_start: new Date(subPeriodStart * 1000).toISOString(),
            current_period_end: new Date(subPeriodEnd * 1000).toISOString(),
            cancel_at_period_end: subCancelAtEnd,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subEvent.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = (invoice as unknown as { subscription: string }).subscription;

        if (subscriptionId) {
          // Reset usage for new billing period
          const { data: subscription } = await supabase
            .from('subscriptions')
            .select('user_id')
            .eq('stripe_subscription_id', subscriptionId)
            .single();

          if (subscription) {
            await supabase.from('usage_records').upsert({
              user_id: subscription.user_id,
              rows_processed: 0,
              ai_calls_made: 0,
              period_start: new Date().toISOString(),
              period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            });
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const failedInvoice = event.data.object;
        const subscriptionId = (failedInvoice as unknown as { subscription: string }).subscription;

        if (subscriptionId) {
          await supabase
            .from('subscriptions')
            .update({
              status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
