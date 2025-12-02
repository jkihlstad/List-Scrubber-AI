// ===========================================
// TYPE DEFINITIONS
// ===========================================

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan_id: 'free' | 'standard' | 'pro';
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsageRecord {
  id: string;
  user_id: string;
  rows_processed: number;
  ai_calls_made: number;
  period_start: string;
  period_end: string;
  created_at: string;
}

export interface Dataset {
  id: string;
  user_id: string;
  name: string;
  row_count: number;
  columns: string[];
  file_size: number;
  created_at: string;
  updated_at: string;
}

export interface DataRow {
  id: number;
  [key: string]: string | number;
}

export interface PlanFeatures {
  name: string;
  price: number;
  priceId: string;
  rowLimit: number;
  aiModels: string[];
  features: string[];
  isPopular?: boolean;
}

export interface Plans {
  free: PlanFeatures;
  standard: PlanFeatures;
  pro: PlanFeatures;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp?: Date;
}

export interface AIModelOption {
  id: string;
  name: string;
  description: string;
  tier: 'free' | 'standard' | 'pro';
}

export interface BillingInfo {
  subscription: Subscription | null;
  invoices: Invoice[];
  paymentMethod: PaymentMethod | null;
  usage: UsageRecord | null;
}

export interface Invoice {
  id: string;
  amount_due: number;
  amount_paid: number;
  currency: string;
  status: string;
  created: number;
  invoice_pdf: string | null;
  hosted_invoice_url: string | null;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}
