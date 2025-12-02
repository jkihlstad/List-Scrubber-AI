'use client';

import { Upload, Brain, CheckCircle, Download } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Upload Your Data',
    description: 'Drag and drop your CSV files or paste data directly',
    icon: Upload,
  },
  {
    number: 2,
    title: 'AI Analyzes',
    description: 'Our AI scans for errors, duplicates, and inconsistencies',
    icon: Brain,
  },
  {
    number: 3,
    title: 'Review & Clean',
    description: 'See suggestions and apply fixes with one click',
    icon: CheckCircle,
  },
  {
    number: 4,
    title: 'Export Clean Data',
    description: 'Download your pristine dataset ready to use',
    icon: Download,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative bg-[#0f172a] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Transform messy data into clean, actionable insights in just four simple steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Horizontal Timeline - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/50 via-indigo-600/50 to-violet-600/50 animate-pulse-slow" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Mobile Vertical Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute left-10 top-24 bottom-0 w-0.5 bg-slate-700">
                      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/50 to-indigo-600/50 animate-shimmer" />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="relative bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 group">
                    {/* Number Badge */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/50 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>

                      {/* Animated ring */}
                      <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500 blur-md" />
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 group-hover:border-violet-500/50 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-center text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/5 group-hover:to-indigo-600/5 transition-all duration-300 pointer-events-none" />
                  </div>

                  {/* Desktop Horizontal Connector Dots */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-3 w-6 h-6 z-10">
                      <div className="w-3 h-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full animate-ping absolute opacity-75" />
                      <div className="w-3 h-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full relative" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm">
            Join thousands of teams already cleaning their data with AI
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
