// ===========================================
// FORGOT PASSWORD PAGE
// ===========================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Database, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/20">
            <Database className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CleanData
          </span>
        </div>

        <Card className="p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <CheckCircle2 className="text-emerald-400" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
              <p className="text-slate-400 mb-6">
                We&apos;ve sent a password reset link to <strong className="text-white">{email}</strong>.
              </p>
              <Link href="/login">
                <Button variant="secondary" className="w-full">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-2 text-center">
                Reset password
              </h1>
              <p className="text-slate-400 text-center mb-8">
                Enter your email and we&apos;ll send you a reset link
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required
                />

                <Button
                  type="submit"
                  className="w-full py-3"
                  disabled={loading}
                  loading={loading}
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </Button>
              </form>

              <p className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-violet-400 hover:text-violet-300 font-medium flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to login
                </Link>
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
