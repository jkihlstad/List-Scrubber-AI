# CleanData - AI-Powered Data Cleaning Platform

A production-ready SaaS application for cleaning and transforming data using AI. Built with Next.js 15, Supabase, Stripe, and OpenRouter.

## Features

- **AI-Powered Data Cleaning**: Use GPT-4, Claude 3, and other models to clean and transform your data
- **Two-Tier Subscription**: Standard (free) and Pro ($29/month) plans
- **Responsive Design**: Works seamlessly on desktop and mobile
- **User Authentication**: Secure signup, login, and password reset via Supabase
- **Stripe Integration**: Complete billing, subscription management, and customer portal
- **Real-time Chat Interface**: Interactive AI assistant for data transformations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **AI**: OpenRouter (GPT-4, Claude 3, Mixtral, etc.)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account
- OpenRouter account

### 1. Clone and Install

```bash
cd list-scrubber-ai
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema from `supabase/schema.sql`
3. Go to **Project Settings > API** to find your keys:

   ![Supabase API Settings](https://supabase.com/dashboard/project/_/settings/api)

   You'll need:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Publishable Key** (anon/public): Starts with `eyJ...` - Safe to use in browser
   - **Secret Key** (service_role): Starts with `eyJ...` - Server-side only, bypasses RLS

4. Enable Email auth in **Authentication > Providers**

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Go to **Developers > API keys** and get:
   - **Publishable Key**: Starts with `pk_test_` or `pk_live_`

3. Create a **Restricted Key** (more secure than secret key):
   - Go to **Developers > API keys > Create restricted key**
   - Name it something like "CleanData App"
   - Set these permissions:
     - **Checkout Sessions**: Write
     - **Customers**: Write
     - **Customer portal**: Write
     - **Subscriptions**: Write
     - **Invoices**: Read
     - **Payment Methods**: Read
     - **Webhook Endpoints**: Read
   - The key will start with `rk_test_` or `rk_live_`

4. Go to **Products** and create two products:
   - **Standard**: Free tier (create a $0 price)
   - **Pro**: $29/month recurring

5. Copy the Price IDs (starts with `price_`)

6. Set up webhooks at **Developers > Webhooks**:
   - Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`
   - Copy the **Webhook Secret** (starts with `whsec_`)

### 4. Set Up OpenRouter

1. Create an account at [openrouter.ai](https://openrouter.ai)
2. Go to **Keys** and create an API key
3. Add credits to your account

### 5. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
# ===========================================
# SUPABASE CONFIGURATION
# ===========================================
# Find these in: Supabase Dashboard > Project Settings > API

# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Publishable Key (anon/public) - Safe for client-side
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Secret Key (service_role) - Server-side only, bypasses RLS
SUPABASE_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===========================================
# STRIPE CONFIGURATION
# ===========================================
# Find these in: Stripe Dashboard > Developers > API keys

# Restricted Key - Server-side only (more secure than secret key)
STRIPE_RESTRICTED_KEY=rk_test_...

# Publishable Key - Safe for client-side
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Webhook Secret - From Webhooks settings
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs - From your created products
STRIPE_STANDARD_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# ===========================================
# OPENROUTER CONFIGURATION
# ===========================================
OPENROUTER_API_KEY=sk-or-...

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Test Stripe Webhooks Locally

Install the Stripe CLI and forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## API Keys Explained

### Supabase Keys

| Key | Environment Variable | Exposed to Browser? | Purpose |
|-----|---------------------|---------------------|---------|
| **Publishable (anon)** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Client-side operations, respects Row Level Security (RLS) |
| **Secret (service_role)** | `SUPABASE_SECRET_KEY` | No | Server-side admin operations, bypasses RLS |

### Stripe Keys

| Key | Environment Variable | Exposed to Browser? | Purpose |
|-----|---------------------|---------------------|---------|
| **Publishable** | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Client-side Stripe.js, checkout |
| **Restricted** | `STRIPE_RESTRICTED_KEY` | No | Server-side API calls with limited permissions (more secure than secret key) |

> **Why Restricted Key?** A restricted key only has the permissions your app needs, following the principle of least privilege. If compromised, the damage is limited compared to a full secret key.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel settings
4. Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
5. Update Stripe webhook URL to your production domain

## Subscription Plans

### Standard (Free)
- 1,000 rows per month
- Standard AI models (GPT-3.5, Mixtral)
- CSV export
- Email support

### Pro ($29/month)
- Unlimited rows
- All AI models (GPT-4, Claude 3)
- Priority support
- API access
- Auto-scheduling
- Advanced analytics

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── auth/              # Auth callbacks
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   └── supabase/          # Supabase client setup
└── types/                 # TypeScript types
```

## Security

- All API keys are stored in environment variables
- Users cannot modify API keys through the UI
- `NEXT_PUBLIC_` prefixed vars are safe for browser exposure
- Non-prefixed vars are server-side only
- Row-level security (RLS) enabled on all Supabase tables
- Webhook signature verification for Stripe

## License

MIT
