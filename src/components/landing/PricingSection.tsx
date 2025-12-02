'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  cta: string;
  mostPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: 0,
    interval: 'mo',
    description: 'Perfect for trying out CleanData',
    features: [
      '300 rows per month',
      'All AI Models (GPT-4o, Claude, Gemini)',
      'CSV Export',
      'Community Support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Standard',
    price: 19,
    interval: 'mo',
    description: 'Best for growing teams',
    features: [
      '5,000 rows per month',
      'All AI Models (GPT-4o, Claude, Gemini)',
      'CSV Export',
      'Email Support',
      'Basic Analytics',
    ],
    cta: 'Start Free Trial',
    mostPopular: true,
  },
  {
    name: 'Pro',
    price: 49,
    interval: 'mo',
    description: 'Advanced features for power users',
    features: [
      '20,000 rows per month',
      'All AI Models (GPT-4o, Claude, Gemini)',
      'Priority Support',
      'API Access',
      'Auto-scheduling',
      'Advanced Analytics',
      'Team Collaboration',
    ],
    cta: 'Start Free Trial',
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              Simple, transparent pricing
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your data cleaning needs. All plans include access to our powerful AI models.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.mostPopular
                  ? 'border-2 border-violet-500/50 shadow-xl shadow-violet-500/20'
                  : 'border border-slate-700/50'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.mostPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-slate-400 ml-2">/{plan.interval}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-violet-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/signup" className="block">
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
                    plan.price > 0
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700 shadow-lg hover:shadow-violet-500/50'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
