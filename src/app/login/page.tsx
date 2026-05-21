'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Anchor, Ship, Landmark, Lock, Shield } from 'lucide-react';


type Role = 'operator' | 'institution' | null;

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (selectedRole === 'operator') {
      router.push('/operator');
    } else if (selectedRole === 'institution') {
      router.push('/portal');
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[var(--color-bg)] animate-in fade-in duration-700 transition-colors">
      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-surface-2)] flex-col justify-between p-12 relative overflow-hidden transition-colors">
        {/* Soft radial glow */}
        <div 
          className="absolute inset-0" 
          style={{ background: 'radial-gradient(circle at 40% 60%, var(--color-accent-light), transparent 65%)' }} 
        />

        {/* Anchor watermark */}
        <Anchor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] text-[var(--color-accent-custom)] opacity-5" />

        {/* Branding */}
        <div className="relative z-10 animate-in slide-in-from-left-8 fade-in duration-1000">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-custom)] flex items-center justify-center shadow-sm">
              <Anchor className="w-6 h-6 text-[var(--color-accent-custom)]" />
            </div>
            <span className="text-[var(--color-text)] text-2xl font-bold tracking-tight">
              MarineSync
            </span>
          </div>
          <p className="text-[var(--color-muted-custom)] text-sm tracking-widest uppercase font-medium ml-1">
            E-Ferry Finance Platform
          </p>
        </div>

        {/* Content: Partners first, then Mission Quote */}
        <div className="relative z-10 space-y-6 animate-in slide-in-from-left-8 fade-in duration-1000 delay-150">
          {/* Partner Institutions */}
          <div className="space-y-3">
            <p className="text-[var(--color-muted-custom)] text-xs uppercase tracking-widest font-medium">
              Institutional Partners
            </p>
            <div className="flex flex-wrap gap-2">
              {['LandBank', 'DBP', 'PCFC', 'PhilGuarantee'].map((partner) => (
                <span
                  key={partner}
                  className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg px-3.5 py-1.5 text-[var(--color-text)] text-xs font-semibold shadow-sm transition-colors"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>

          {/* Mission Quote */}
          <div className="w-10 h-1 bg-[var(--color-accent-custom)]/20 rounded-full" />
          <blockquote className="font-display italic text-[1.4rem] leading-[1.7] text-[var(--color-text)] max-w-[380px]">
            &quot;Connecting island communities through{' '}
            <span className="text-[var(--color-accent-custom)] font-bold not-italic">
              transparent financing
            </span>{' '}
            and sustainable maritime infrastructure.&quot;
          </blockquote>
          <p className="text-[var(--color-muted-custom)] text-sm leading-relaxed max-w-sm">
            MarineSync bridges ferry cooperatives and financial institutions,
            enabling data-driven lending decisions that power the blue economy
            across the Philippine archipelago.
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
          <p className="text-[var(--color-muted-custom)]/60 text-xs font-medium">
            © 2026 MarineSync · Republic of the Philippines
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────── */}
      <div className="flex-1 bg-[var(--color-surface)] border-l border-[var(--color-border-custom)] flex flex-col min-h-screen relative transition-colors">
        {/* Top nav */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--color-muted-custom)] hover:text-[var(--color-accent-custom)] transition-colors group font-medium"
          >
            <span className="text-base group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            <span>Back to home</span>
          </Link>
          <div className="flex items-center gap-4">

            {/* Mobile brand mark */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-custom)] flex items-center justify-center">
                <Anchor className="w-4 h-4 text-[var(--color-surface)]" />
              </div>
              <span className="text-[var(--color-text)] font-bold text-sm">MarineSync</span>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-8">
          <div className="w-full max-w-md bg-transparent border-none shadow-none p-8 rounded-2xl space-y-7 animate-in slide-in-from-bottom-8 fade-in duration-700">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="font-display text-[2rem] font-bold text-[var(--color-text)] tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-[var(--color-muted-custom)]">
                Sign in to your MarineSync account to continue.
              </p>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-custom)]">
                Select your role
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Ferry Operator Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('operator')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-custom)] focus-visible:ring-offset-2 ${
                    selectedRole === 'operator'
                      ? 'border-[var(--color-accent-custom)] bg-[var(--color-accent-light)] shadow-sm'
                      : 'border-[var(--color-border-custom)] bg-[var(--color-surface)] hover:border-[var(--color-accent-custom)] hover:shadow-sm'
                  }`}
                >
                  {selectedRole === 'operator' && (
                    <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent-custom)] animate-in zoom-in duration-200">
                      <svg
                        className="h-2.5 w-2.5 text-[var(--color-surface)]"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <Ship className={`w-8 h-8 ${selectedRole === 'operator' ? 'text-[var(--color-accent-custom)]' : 'text-[var(--color-muted-custom)]'}`} />
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        selectedRole === 'operator'
                          ? 'text-[var(--color-accent-custom)]'
                          : 'text-[var(--color-text)]'
                      }`}
                    >
                      Ferry Operator
                    </p>
                    <p className="text-xs text-[var(--color-muted-custom)] mt-0.5 leading-tight font-medium">
                      / Cooperative
                    </p>
                  </div>
                </button>

                {/* Financial Institution Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('institution')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-custom)] focus-visible:ring-offset-2 ${
                    selectedRole === 'institution'
                      ? 'border-[var(--color-accent-custom)] bg-[var(--color-accent-light)] shadow-sm'
                      : 'border-[var(--color-border-custom)] bg-[var(--color-surface)] hover:border-[var(--color-accent-custom)] hover:shadow-sm'
                  }`}
                >
                  {selectedRole === 'institution' && (
                    <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent-custom)] animate-in zoom-in duration-200">
                      <svg
                        className="h-2.5 w-2.5 text-[var(--color-surface)]"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <Landmark className={`w-8 h-8 ${selectedRole === 'institution' ? 'text-[var(--color-accent-custom)]' : 'text-[var(--color-muted-custom)]'}`} />
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        selectedRole === 'institution'
                          ? 'text-[var(--color-accent-custom)]'
                          : 'text-[var(--color-text)]'
                      }`}
                    >
                      Financial Inst.
                    </p>
                    <p className="text-xs text-[var(--color-muted-custom)] mt-0.5 leading-tight font-medium">
                      / LGU
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-1 h-px bg-[var(--color-border-custom)]" />
              <span className="px-3 text-xs text-[var(--color-muted-custom)] uppercase tracking-widest font-semibold">
                credentials
              </span>
              <div className="flex-1 h-px bg-[var(--color-border-custom)]" />
            </div>

            {/* Email & Password */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-[var(--color-text)]"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@institution.gov.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)] transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-[var(--color-text)]"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[var(--color-accent-custom)] hover:underline font-semibold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)] transition-all duration-300"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleSignIn}
              disabled={!selectedRole}
              className="w-full h-11 bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white font-semibold rounded-lg text-sm tracking-wide transition-all duration-300 border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedRole === null
                ? 'Select a role to continue'
                : 'Sign In →'}
            </Button>

            {/* Register link */}
            <p className="text-center text-sm text-[var(--color-muted-custom)] font-medium">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-[var(--color-accent-custom)] hover:underline font-bold transition-colors"
              >
                Register your cooperative
              </Link>
            </p>

            {/* Trust Section */}
            <div className="flex flex-col items-center gap-2 pt-4 border-t border-[var(--color-border-custom)]">
              <p className="text-xs text-[var(--color-muted-custom)] flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-[var(--color-teal)]" />
                <span>Secured by 256-bit TLS encryption</span>
              </p>
              <div className="flex items-center gap-3 text-[var(--color-muted-custom)] text-[0.7rem] font-bold">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[var(--color-teal)]" /> SOC 2 Type II</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[var(--color-teal)]" /> BSP Registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
