'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    // In Phase 3, this will send data to the API to personalize.
    // For now, just forward to the portfolio page with query params.
    const query = new URLSearchParams();
    query.set('company', company);
    if (role) query.set('role', role);

    router.push(`/portfolio?${query.toString()}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">

      {/* Ambient Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-[#6c5ce7]/10 rounded-full blur-[150px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-[#00cec9]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-md animate-fadeInUp">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-[#f0f0f5] mb-2">
            Adaptive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00cec9]">Portfolio</span>
          </h1>
          <p className="text-[#8a8a9a] text-sm font-mono uppercase tracking-widest">
            A portfolio that adapts to you.
          </p>
        </div>

        <GlassCard variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-[#8a8a9a]">
                Company Name <span className="text-[#e17055]">*</span>
              </label>
              <input
                id="company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Stripe, Startup Inc."
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/50 border border-white/[0.08] text-[#f0f0f5] placeholder-[#4a4a5a] focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-[#8a8a9a]">
                Role / Position
              </label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Engineer, Technical Recruiter"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f]/50 border border-white/[0.08] text-[#f0f0f5] placeholder-[#4a4a5a] focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth size="lg" disabled={!company}>
                View Portfolio →
              </Button>
            </div>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => router.push('/portfolio')}
                className="text-xs text-[#4a4a5a] hover:text-[#8a8a9a] underline underline-offset-4 transition-colors font-mono"
              >
                Skip personalization // View static version
              </button>
            </div>

          </form>
        </GlassCard>
      </div>
    </main>
  );
}
