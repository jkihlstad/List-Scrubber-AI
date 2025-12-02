// ===========================================
// STRIPE CONFIGURATION
// ===========================================

import Stripe from 'stripe';

// Initialize Stripe only when the key is available
// Uses restricted key for better security (limited permissions)
const getStripe = () => {
  const key = process.env.STRIPE_RESTRICTED_KEY;
  if (!key) {
    throw new Error('STRIPE_RESTRICTED_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2025-11-17.clover',
    typescript: true,
  });
};

// Lazy initialization to avoid build-time errors
let _stripe: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) {
      _stripe = getStripe();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_stripe as any)[prop];
  },
});

// Helper function to get customer portal URL
export async function getCustomerPortalUrl(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
}

// Helper function to create checkout session
export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  userId,
}: {
  customerId?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  userId: string;
}) {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
  };

  if (customerId) {
    sessionParams.customer = customerId;
  } else {
    sessionParams.customer_creation = 'always';
  }

  return stripe.checkout.sessions.create(sessionParams);
}

// Get subscription details
export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method', 'items.data.price.product'],
  });
}

// Get customer invoices
export async function getCustomerInvoices(customerId: string, limit = 10) {
  return stripe.invoices.list({
    customer: customerId,
    limit,
  });
}

// Get payment methods
export async function getPaymentMethods(customerId: string) {
  return stripe.paymentMethods.list({
    customer: customerId,
    type: 'card',
  });
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

// Resume subscription
export async function resumeSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}
