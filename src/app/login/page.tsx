'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen flex font-sans">
      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#002D40] flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative background rings */}
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full border border-[#005E7A]/20" />
        <div className="absolute -bottom-16 -left-16 w-[280px] h-[280px] rounded-full border border-[#005E7A]/30" />
        <div className="absolute top-24 -right-20 w-[200px] h-[200px] rounded-full border border-[#005E7A]/15" />

        {/* Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#005E7A] flex items-center justify-center">
              <span className="text-white text-xl">⚓</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">
              MarineSync
            </span>
          </div>
          <p className="text-[#7DB8C8] text-sm tracking-widest uppercase font-medium ml-1">
            E-Ferry Finance Platform
          </p>
        </div>

        {/* Mission Quote */}
        <div className="relative z-10 space-y-6">
          <div className="w-10 h-1 bg-[#005E7A] rounded-full" />
          <blockquote className="text-white text-2xl font-light leading-relaxed">
            "Connecting island communities through{' '}
            <span className="text-[#4CB8D4] font-semibold">
              transparent financing
            </span>{' '}
            and sustainable maritime infrastructure."
          </blockquote>
          <p className="text-[#7DB8C8] text-sm leading-relaxed max-w-sm">
            MarineSync bridges ferry cooperatives and financial institutions,
            enabling data-driven lending decisions that power the blue economy
            across the Philippine archipelago.
          </p>

          {/* Partner Institutions */}
          <div className="space-y-3 pt-2">
            <p className="text-[#7DB8C8] text-xs uppercase tracking-widest font-medium">
              Institutional Partners
            </p>
            <div className="flex flex-wrap gap-2">
              {['LandBank', 'DBP', 'PCFC', 'PhilGuarantee'].map((partner) => (
                <span
                  key={partner}
                  className="px-3 py-1.5 rounded-full border border-[#005E7A]/60 text-[#4CB8D4] text-xs font-semibold bg-[#005E7A]/10 tracking-wide"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-[#4a7a8a] text-xs">
            © 2026 MarineSync · Republic of the Philippines
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────── */}
      <div className="flex-1 bg-white flex flex-col min-h-screen">
        {/* Top nav */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#005E7A] transition-colors group"
          >
            <span className="text-base group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            <span>Back to home</span>
          </Link>
          {/* Mobile brand mark */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#002D40] flex items-center justify-center">
              <span className="text-white text-sm">⚓</span>
            </div>
            <span className="text-[#002D40] font-bold text-sm">MarineSync</span>
          </div>
          <div className="hidden lg:block" />
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
          <div className="w-full max-w-md space-y-7">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500">
                Sign in to your MarineSync account to continue.
              </p>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Select your role
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Ferry Operator Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('operator')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E7A] focus-visible:ring-offset-2 ${
                    selectedRole === 'operator'
                      ? 'border-[#005E7A] bg-[#005E7A]/5 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {selectedRole === 'operator' && (
                    <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#005E7A]">
                      <svg
                        className="h-2.5 w-2.5 text-white"
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
                  <span className="text-2xl">⛵</span>
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        selectedRole === 'operator'
                          ? 'text-[#005E7A]'
                          : 'text-slate-800'
                      }`}
                    >
                      Ferry Operator
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                      / Cooperative
                    </p>
                  </div>
                </button>

                {/* Financial Institution Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('institution')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005E7A] focus-visible:ring-offset-2 ${
                    selectedRole === 'institution'
                      ? 'border-[#005E7A] bg-[#005E7A]/5 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {selectedRole === 'institution' && (
                    <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#005E7A]">
                      <svg
                        className="h-2.5 w-2.5 text-white"
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
                  <span className="text-2xl">🏦</span>
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        selectedRole === 'institution'
                          ? 'text-[#005E7A]'
                          : 'text-slate-800'
                      }`}
                    >
                      Financial Inst.
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                      / LGU
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="px-3 text-xs text-slate-400 uppercase tracking-widest">
                credentials
              </span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Email & Password */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@institution.gov.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-slate-200 focus:border-[#005E7A] focus:ring-[#005E7A] rounded-lg text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#005E7A] hover:text-[#004d62] font-medium transition-colors"
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
                  className="h-11 border-slate-200 focus:border-[#005E7A] focus:ring-[#005E7A] rounded-lg text-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleSignIn}
              disabled={!selectedRole}
              className="w-full h-11 bg-[#002D40] hover:bg-[#003d57] text-white font-semibold rounded-lg text-sm tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {selectedRole === null
                ? 'Select a role to continue'
                : 'Sign In →'}
            </Button>

            {/* Register link */}
            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-[#005E7A] hover:text-[#004d62] font-semibold transition-colors"
              >
                Register your cooperative
              </Link>
            </p>

            {/* Trust Section */}
            <div className="flex flex-col items-center gap-2 pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>🔒</span>
                <span>Secured by 256-bit TLS encryption</span>
              </p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold text-slate-500 border-slate-200 px-2 py-0.5 rounded-md tracking-wide"
                >
                  SOC 2 Type II Compliant
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold text-slate-500 border-slate-200 px-2 py-0.5 rounded-md tracking-wide"
                >
                  BSP Registered
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
