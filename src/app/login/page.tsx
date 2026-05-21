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
import { Anchor, Ship, Landmark, Lock } from 'lucide-react';

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
    <div className="min-h-screen flex font-sans bg-background animate-in fade-in duration-700">
      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative background rings */}
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full border border-primary-foreground/10" />
        <div className="absolute -bottom-16 -left-16 w-[280px] h-[280px] rounded-full border border-primary-foreground/20" />
        <div className="absolute top-24 -right-20 w-[200px] h-[200px] rounded-full border border-primary-foreground/10" />

        {/* Branding */}
        <div className="relative z-10 animate-in slide-in-from-left-8 fade-in duration-1000">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <Anchor className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-primary-foreground text-2xl font-bold tracking-tight">
              MarineSync
            </span>
          </div>
          <p className="text-primary-foreground/70 text-sm tracking-widest uppercase font-medium ml-1">
            E-Ferry Finance Platform
          </p>
        </div>

        {/* Mission Quote */}
        <div className="relative z-10 space-y-6 animate-in slide-in-from-left-8 fade-in duration-1000 delay-150">
          <div className="w-10 h-1 bg-primary-foreground/30 rounded-full" />
          <blockquote className="text-primary-foreground text-2xl font-light leading-relaxed">
            "Connecting island communities through{' '}
            <span className="text-primary-foreground font-semibold">
              transparent financing
            </span>{' '}
            and sustainable maritime infrastructure."
          </blockquote>
          <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
            MarineSync bridges ferry cooperatives and financial institutions,
            enabling data-driven lending decisions that power the blue economy
            across the Philippine archipelago.
          </p>

          {/* Partner Institutions */}
          <div className="space-y-3 pt-2">
            <p className="text-primary-foreground/70 text-xs uppercase tracking-widest font-medium">
              Institutional Partners
            </p>
            <div className="flex flex-wrap gap-2">
              {['LandBank', 'DBP', 'PCFC', 'PhilGuarantee'].map((partner) => (
                <span
                  key={partner}
                  className="px-3 py-1.5 rounded-full border border-primary-foreground/20 text-primary-foreground text-xs font-semibold bg-primary-foreground/10 tracking-wide backdrop-blur-sm"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
          <p className="text-primary-foreground/50 text-xs">
            © 2026 MarineSync · Republic of the Philippines
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────── */}
      <div className="flex-1 bg-muted/10 flex flex-col min-h-screen relative">
        {/* Top nav */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-base group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            <span>Back to home</span>
          </Link>
          {/* Mobile brand mark */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Anchor className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-primary font-bold text-sm">MarineSync</span>
          </div>
          <div className="hidden lg:block" />
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-8">
          <div className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl p-8 rounded-2xl space-y-7 animate-in slide-in-from-bottom-8 fade-in duration-700">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your MarineSync account to continue.
              </p>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Select your role
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Ferry Operator Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('operator')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left hover:-translate-y-1 hover:border-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    selectedRole === 'operator'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border bg-card hover:bg-accent/50 hover:shadow-sm'
                  }`}
                >
                  {selectedRole === 'operator' && (
                    <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary animate-in zoom-in duration-200">
                      <svg
                        className="h-2.5 w-2.5 text-primary-foreground"
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
                  <Ship className="w-8 h-8 text-primary" />
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        selectedRole === 'operator'
                          ? 'text-primary'
                          : 'text-foreground'
                      }`}
                    >
                      Ferry Operator
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                      / Cooperative
                    </p>
                  </div>
                </button>

                {/* Financial Institution Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('institution')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left hover:-translate-y-1 hover:border-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    selectedRole === 'institution'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border bg-card hover:bg-accent/50 hover:shadow-sm'
                  }`}
                >
                  {selectedRole === 'institution' && (
                    <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary animate-in zoom-in duration-200">
                      <svg
                        className="h-2.5 w-2.5 text-primary-foreground"
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
                  <Landmark className="w-8 h-8 text-primary" />
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        selectedRole === 'institution'
                          ? 'text-primary'
                          : 'text-foreground'
                      }`}
                    >
                      Financial Inst.
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                      / LGU
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-1 h-px bg-border" />
              <span className="px-3 text-xs text-muted-foreground uppercase tracking-widest">
                credentials
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Email & Password */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@institution.gov.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-background/50 border-input focus:border-primary focus:ring-primary rounded-lg text-sm placeholder:text-muted-foreground transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
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
                  className="h-11 bg-background/50 border-input focus:border-primary focus:ring-primary rounded-lg text-sm placeholder:text-muted-foreground transition-all duration-300"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleSignIn}
              disabled={!selectedRole}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm tracking-wide hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-none"
            >
              {selectedRole === null
                ? 'Select a role to continue'
                : 'Sign In →'}
            </Button>

            {/* Register link */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Register your cooperative
              </Link>
            </p>

            {/* Trust Section */}
            <div className="flex flex-col items-center gap-2 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Secured by 256-bit TLS encryption</span>
              </p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold text-muted-foreground border-border px-2 py-0.5 rounded-md tracking-wide bg-background/50"
                >
                  SOC 2 Type II Compliant
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold text-muted-foreground border-border px-2 py-0.5 rounded-md tracking-wide bg-background/50"
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
