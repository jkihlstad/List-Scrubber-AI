// ===========================================
// APPLICATION CONFIGURATION
// ===========================================
// All environment variables are managed here
// Users cannot modify these settings - only developers

import { Plans, AIModelOption } from '@/types';

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

// Check for missing env vars in development
if (process.env.NODE_ENV === 'development') {
  const missing = requiredEnvVars.filter(
    (key) => !process.env[key]
  );
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
}

export const config = {
  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Publishable key (anon) - safe for client-side, respects RLS
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // Secret key - server-side only, bypasses RLS
    secretKey: process.env.SUPABASE_SECRET_KEY,
  },

  // Stripe
  stripe: {
    // Restricted key - server-side only, limited permissions for security
    restrictedKey: process.env.STRIPE_RESTRICTED_KEY!,
    // Publishable key - safe for client-side
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    prices: {
      standard: process.env.STRIPE_STANDARD_PRICE_ID!,
      pro: process.env.STRIPE_PRO_PRICE_ID!,
    },
  },

  // OpenRouter
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY!,
    baseUrl: 'https://openrouter.ai/api/v1',
  },

  // App
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    name: 'CleanData',
    description: 'AI-Powered Data Cleaning Platform',
  },
} as const;

// Subscription Plans Configuration
export const PLANS: Plans = {
  standard: {
    name: 'Standard',
    price: 0,
    priceId: config.stripe.prices.standard,
    rowLimit: 1000,
    aiModels: ['openai/gpt-3.5-turbo', 'mistralai/mixtral-8x7b-instruct'],
    features: [
      '1,000 rows per month',
      'Standard AI Models',
      'CSV Export',
      'Email Support',
      'Basic Analytics',
    ],
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: config.stripe.prices.pro,
    rowLimit: -1, // Unlimited
    aiModels: [
      'openai/gpt-3.5-turbo',
      'openai/gpt-4',
      'openai/gpt-4-turbo',
      'anthropic/claude-3-opus',
      'anthropic/claude-3-sonnet',
      'mistralai/mixtral-8x7b-instruct',
    ],
    features: [
      'Unlimited rows',
      'GPT-4 & Claude 3',
      'Priority Support',
      'API Access',
      'Auto-scheduling',
      'Advanced Analytics',
      'Team Collaboration',
    ],
    isPopular: true,
  },
};

// Available AI Models
export const AI_MODELS: AIModelOption[] = [
  {
    id: 'openai/gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most tasks',
    tier: 'standard',
  },
  {
    id: 'mistralai/mixtral-8x7b-instruct',
    name: 'Mixtral 8x7B',
    description: 'Open source, great for general tasks',
    tier: 'standard',
  },
  {
    id: 'openai/gpt-4',
    name: 'GPT-4',
    description: 'Most capable, best for complex transformations',
    tier: 'pro',
  },
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Latest GPT-4 with improved speed',
    tier: 'pro',
  },
  {
    id: 'anthropic/claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Best for nuanced understanding',
    tier: 'pro',
  },
  {
    id: 'anthropic/claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balanced performance and speed',
    tier: 'pro',
  },
];

// Usage Limits
export const USAGE_LIMITS = {
  standard: {
    monthlyRows: 1000,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxColumns: 20,
  },
  pro: {
    monthlyRows: -1, // Unlimited
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxColumns: 100,
  },
} as const;
