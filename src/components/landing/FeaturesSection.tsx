'use client';

import { Sparkles, Shield, Zap, FileDown, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Cleaning',
    description: 'Uses GPT-4, Claude, and Gemini to intelligently clean and standardize your data with unmatched accuracy.',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    icon: Shield,
    title: 'Smart Validation',
    description: 'Automatically detects and fixes inconsistencies, duplicates, and errors across your datasets.',
    gradient: 'from-indigo-600 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Bulk Processing',
    description: 'Handle thousands of rows efficiently with lightning-fast processing powered by advanced AI models.',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    icon: FileDown,
    title: 'Multiple Export Formats',
    description: 'Export your cleaned data to CSV and other popular formats with a single click.',
    gradient: 'from-pink-600 to-rose-600',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track your data quality improvements with comprehensive analytics and detailed insights.',
    gradient: 'from-rose-600 to-orange-600',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together on data projects with your team. Share, review, and collaborate seamlessly.',
    gradient: 'from-orange-600 to-amber-600',
    isPro: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 bg-[#0f172a] overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to clean, validate, and transform your data with the power of AI
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Pro Badge */}
                {feature.isPro && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full">
                      Pro
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/5 group-hover:to-indigo-600/5 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
