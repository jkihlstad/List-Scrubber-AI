// ===========================================
// APPLICATION CONFIGURATION
// ===========================================
// All environment variables are managed here
// Users cannot modify these settings - only developers

import { Plans, AIModelOption } from '@/types';

// Validate required environment variables (server-side only)
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

// Check for missing env vars in development - only on server to avoid false positives
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
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
      free: '', // No Stripe price for free plan
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

// All available AI models (available on all paid plans)
const ALL_AI_MODELS = [
  // OpenAI Models
  'openai/gpt-4o',
  'openai/gpt-4o-mini',
  'openai/gpt-4-turbo',
  'openai/o1-preview',
  'openai/o1-mini',
  // Anthropic Models
  'anthropic/claude-sonnet-4',
  'anthropic/claude-3.5-sonnet',
  'anthropic/claude-3-opus',
  'anthropic/claude-3-haiku',
  // Google Gemini Models
  'google/gemini-2.0-flash-exp',
  'google/gemini-pro-1.5',
  'google/gemini-flash-1.5',
];

// Subscription Plans Configuration
export const PLANS: Plans = {
  free: {
    name: 'Free',
    price: 0,
    priceId: config.stripe.prices.free,
    rowLimit: 300,
    aiModels: ALL_AI_MODELS,
    features: [
      '300 rows per month',
      'All AI Models (GPT-4o, Claude, Gemini)',
      'CSV Export',
      'Community Support',
    ],
  },
  standard: {
    name: 'Standard',
    price: 19,
    priceId: config.stripe.prices.standard,
    rowLimit: 5000,
    aiModels: ALL_AI_MODELS,
    features: [
      '5,000 rows per month',
      'All AI Models (GPT-4o, Claude, Gemini)',
      'CSV Export',
      'Email Support',
      'Basic Analytics',
    ],
    isPopular: true,
  },
  pro: {
    name: 'Pro',
    price: 49,
    priceId: config.stripe.prices.pro,
    rowLimit: 20000,
    aiModels: ALL_AI_MODELS,
    features: [
      '20,000 rows per month',
      'All AI Models (GPT-4o, Claude, Gemini)',
      'Priority Support',
      'API Access',
      'Auto-scheduling',
      'Advanced Analytics',
      'Team Collaboration',
    ],
  },
};

// Available AI Models
export const AI_MODELS: AIModelOption[] = [
  // OpenAI Models
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    description: 'Most capable OpenAI model, multimodal',
    tier: 'free',
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast and cost-effective',
    tier: 'free',
  },
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Powerful with large context window',
    tier: 'free',
  },
  {
    id: 'openai/o1-preview',
    name: 'o1 Preview',
    description: 'Advanced reasoning capabilities',
    tier: 'free',
  },
  {
    id: 'openai/o1-mini',
    name: 'o1 Mini',
    description: 'Fast reasoning model',
    tier: 'free',
  },
  // Anthropic Models
  {
    id: 'anthropic/claude-sonnet-4',
    name: 'Claude Sonnet 4',
    description: 'Latest Claude model, best performance',
    tier: 'free',
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    description: 'Excellent balance of speed and capability',
    tier: 'free',
  },
  {
    id: 'anthropic/claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Best for complex, nuanced tasks',
    tier: 'free',
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    description: 'Fastest Claude model',
    tier: 'free',
  },
  // Google Gemini Models
  {
    id: 'google/gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    description: 'Latest Gemini, experimental features',
    tier: 'free',
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini Pro 1.5',
    description: 'Advanced reasoning and long context',
    tier: 'free',
  },
  {
    id: 'google/gemini-flash-1.5',
    name: 'Gemini Flash 1.5',
    description: 'Fast and efficient',
    tier: 'free',
  },
];

// Usage Limits
export const USAGE_LIMITS = {
  free: {
    monthlyRows: 300,
    maxFileSize: 2 * 1024 * 1024, // 2MB
    maxColumns: 10,
  },
  standard: {
    monthlyRows: 5000,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxColumns: 30,
  },
  pro: {
    monthlyRows: 20000,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxColumns: 100,
  },
} as const;
