'use client';

import { Database, Sparkles, Zap, ArrowRight, CheckCircle2, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0f172a] overflow-hidden flex items-center">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] animate-pulse delay-2000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm text-slate-300">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>AI-Powered Data Cleaning Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Clean Your Data
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400">
                with AI Magic
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto lg:mx-0">
              Transform messy data into pristine datasets using GPT-4, Claude, and Gemini.
              <span className="text-violet-300"> 10x faster</span> than manual cleaning.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-slate-300">99.9% accuracy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/dashboard" className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/30 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/50 cursor-pointer">
                <span className="flex items-center gap-2 justify-center">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 border border-slate-700 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/50">
              <div>
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-slate-400">Records Cleaned</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-slate-400">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10x</div>
                <div className="text-sm text-slate-400">Faster Results</div>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Cards Preview */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Main Dashboard Preview Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-violet-500/10 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Data Cleaning</div>
                    <div className="text-xs text-slate-400">In Progress</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Processing records...</span>
                    <span>78%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full w-[78%] animate-pulse" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400">Cleaned</div>
                    <div className="text-lg font-bold text-green-400">3,892</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400">Errors Fixed</div>
                    <div className="text-lg font-bold text-yellow-400">1,247</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI Model Card - Top Right */}
            <div className="absolute top-12 right-0 animate-float">
              <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-xl p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">GPT-4</div>
                    <div className="text-xs text-slate-400">Active</div>
                  </div>
                  <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Floating Speed Card - Top Left */}
            <div className="absolute top-32 -left-8 animate-float-delayed">
              <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-xl p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">10x Faster</div>
                    <div className="text-xs text-slate-400">Processing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Claude Card - Bottom Left */}
            <div className="absolute bottom-24 left-4 animate-float">
              <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-xl p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Claude</div>
                    <div className="text-xs text-slate-400">Ready</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Gemini Card - Bottom Right */}
            <div className="absolute bottom-12 right-12 animate-float-delayed">
              <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-xl p-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Gemini</div>
                    <div className="text-xs text-slate-400">Standby</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-1/4 w-2 h-2 bg-violet-400 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-500" />
            <div className="absolute top-1/3 right-12 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
    </section>
  );
}
