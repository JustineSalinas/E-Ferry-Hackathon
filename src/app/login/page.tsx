'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Anchor, Ship, Landmark, Lock, Shield } from 'lucide-react';


type Role = 'operator' | 'institution' | 'admin' | null;

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!selectedRole) return;
    
    // Create temporary hackathon session
    if (typeof window !== 'undefined') {
      const session = {
        role: selectedRole,
        name: selectedRole === 'operator' ? 'Iloilo Ferry Co.' : selectedRole === 'institution' ? 'BDO Green Finance' : 'System Administrator',
        loginTime: new Date().toISOString()
      };
      window.localStorage.setItem('solmate_session', JSON.stringify(session));
    }

    if (selectedRole === 'operator') {
      router.push('/operator');
    } else if (selectedRole === 'institution') {
      router.push('/portal');
    } else if (selectedRole === 'admin') {
      router.push('/admin');
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
        <img src="/solmate.png" alt="Solmate Watermark" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-5 pointer-events-none" />

        {/* Branding */}
        <div className="relative z-10 animate-in slide-in-from-left-8 fade-in duration-1000">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center">
              <img src="/solmate.png" alt="Solmate Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
          <p className="text-[var(--color-muted-custom)] text-sm tracking-widest uppercase font-medium ml-1">
            E-Ferry Finance Platform
          </p>
        </div>

        {/* Decorative Route Map with Animated Ferries */}
        <div className="absolute top-[20%] left-[-10%] right-[-10%] h-[40%] pointer-events-none opacity-25 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Route paths */}
            <path id="loginRoute1" d="M-100,200 Q200,50 500,250 T1100,100" stroke="var(--color-accent-custom)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <path id="loginRoute2" d="M0,350 Q300,400 600,200 T1200,250" stroke="var(--color-teal)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />

            {/* Ferry 1 — sailing along route 1 */}
            <g>
              <animateMotion dur="30s" repeatCount="indefinite" path="M-100,200 Q200,50 500,250 T1100,100" />
              <g transform="scale(0.8) translate(-16,-12)">
                <path d="M 2,18 L 28,18 L 32,12 L 0,12 Z" fill="var(--color-accent-custom)" />
                <rect x="4" y="6" width="22" height="6" fill="var(--color-accent-custom)" opacity="0.9" />
                <rect x="8" y="2" width="10" height="4" fill="var(--color-accent-custom)" opacity="0.8" />
                <rect x="6" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="10" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="14" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="18" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="22" y="8" width="2" height="2" fill="var(--color-bg)" />
              </g>
            </g>

            {/* Ferry 2 — sailing along route 2 */}
            <g>
              <animateMotion dur="45s" repeatCount="indefinite" path="M0,350 Q300,400 600,200 T1200,250" />
              <g transform="scale(0.5) translate(-16,-12)">
                <path d="M 2,18 L 28,18 L 32,12 L 0,12 Z" fill="var(--color-teal)" />
                <rect x="4" y="6" width="22" height="6" fill="var(--color-teal)" opacity="0.9" />
                <rect x="8" y="2" width="10" height="4" fill="var(--color-teal)" opacity="0.8" />
                <rect x="6" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="10" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="14" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="18" y="8" width="2" height="2" fill="var(--color-bg)" />
                <rect x="22" y="8" width="2" height="2" fill="var(--color-bg)" />
              </g>
            </g>
          </svg>
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
            Solmate bridges ferry cooperatives and financial institutions,
            enabling data-driven lending decisions that power the blue economy
            across the Philippine archipelago.
          </p>

          {/* Dashboard Preview Graphic */}
          <div className="mt-8 relative overflow-hidden rounded-xl border border-[var(--color-border-custom)] bg-[var(--color-surface)]/50 p-5 shadow-sm backdrop-blur-sm animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 max-w-[380px]">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">Live Network Status</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-teal-600 uppercase tracking-widest">Online</span>
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse shadow-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-[var(--color-muted-custom)] uppercase font-bold tracking-wider mb-1">Active Vessels</p>
                <p className="text-3xl font-black text-[var(--color-accent-custom)]">1,492</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--color-muted-custom)] uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                  CO₂ Reduced
                  <svg className="w-3 h-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </p>
                <p className="text-3xl font-black text-teal-600">4.2M <span className="text-sm font-semibold text-[var(--color-muted-custom)]">tons</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
          <p className="text-[var(--color-muted-custom)]/60 text-xs font-medium">
            © 2026 Solmate · Republic of the Philippines
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────── */}
      <div className="flex-1 bg-[var(--color-surface)] border-l border-[var(--color-border-custom)] flex flex-col min-h-screen relative transition-colors overflow-y-auto">
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
            <div className="flex lg:hidden items-center">
              <div className="flex items-center justify-center">
                <img src="/solmate.png" alt="Solmate Logo" className="h-10 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Form area — truly centered */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-6 py-8 md:px-12" style={{ paddingBottom: '5vh' }}>
          <div className="w-full space-y-7 animate-in slide-in-from-bottom-8 fade-in duration-700 max-w-[540px]">
            {/* Header */}
            <div className="space-y-1 text-center">
              <h1 className="font-display text-[2rem] font-bold text-[var(--color-text)] tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-[var(--color-muted-custom)]">
                Sign in to your Solmate account to continue.
              </p>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <Label className="block text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-custom)]">
                {selectedRole === null ? 'Select your role' : selectedRole === 'operator' ? 'Role: Ferry Operator' : selectedRole === 'institution' ? 'Role: Bank / LGU' : 'Role: System Admin'}
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Ferry Operator Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('operator')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-custom)] focus-visible:ring-offset-2 ${
                    selectedRole === 'operator'
                      ? 'border-2 border-[var(--color-accent-custom)] bg-[var(--color-accent-custom)]/5 shadow-md scale-[1.02] p-[15px]'
                      : 'border border-[var(--color-border-custom)] bg-[var(--color-surface)] hover:border-[var(--color-accent-custom)]/50 hover:bg-[var(--color-accent-custom)]/5 hover:-translate-y-1 hover:shadow-sm p-4'
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
                  className={`relative flex flex-col items-start gap-2 rounded-xl text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-custom)] focus-visible:ring-offset-2 ${
                    selectedRole === 'institution'
                      ? 'border-2 border-[var(--color-accent-custom)] bg-[var(--color-accent-custom)]/5 shadow-md scale-[1.02] p-[15px]'
                      : 'border border-[var(--color-border-custom)] bg-[var(--color-surface)] hover:border-[var(--color-accent-custom)]/50 hover:bg-[var(--color-accent-custom)]/5 hover:-translate-y-1 hover:shadow-sm p-4'
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
                      Bank
                    </p>
                    <p className="text-xs text-[var(--color-muted-custom)] mt-0.5 leading-tight font-medium">
                      / LGU
                    </p>
                  </div>
                </button>

                {/* System Admin Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`relative flex flex-col items-start gap-2 rounded-xl text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-custom)] focus-visible:ring-offset-2 ${
                    selectedRole === 'admin'
                      ? 'border-2 border-[var(--color-accent-custom)] bg-[var(--color-accent-custom)]/5 shadow-md scale-[1.02] p-[15px]'
                      : 'border border-[var(--color-border-custom)] bg-[var(--color-surface)] hover:border-[var(--color-accent-custom)]/50 hover:bg-[var(--color-accent-custom)]/5 hover:-translate-y-1 hover:shadow-sm p-4'
                  }`}
                >
                  {selectedRole === 'admin' && (
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
                  <Shield className={`w-8 h-8 ${selectedRole === 'admin' ? 'text-[var(--color-accent-custom)]' : 'text-[var(--color-muted-custom)]'}`} />
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        selectedRole === 'admin'
                          ? 'text-[var(--color-accent-custom)]'
                          : 'text-[var(--color-text)]'
                      }`}
                    >
                      System Admin
                    </p>
                    <p className="text-xs text-[var(--color-muted-custom)] mt-0.5 leading-tight font-medium">
                      / Oversight
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
                  placeholder="Email address"
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
              className="w-full h-11 bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white font-semibold rounded-lg text-sm tracking-wide transition-all duration-300 border-none"
            >
              {selectedRole === null
                ? 'Select a role to continue'
                : selectedRole === 'operator'
                ? 'Continue as Ferry Operator →'
                : selectedRole === 'institution'
                ? 'Continue as Bank / LGU →'
                : 'Continue as System Admin →'}
            </Button>

            {/* Register link */}
            <div className="text-center text-sm text-[var(--color-muted-custom)] font-medium">
              {selectedRole === 'admin' ? (
                <span>Internal system access only</span>
              ) : (
                <>
                  Don&apos;t have an account?{' '}
                  {selectedRole === 'operator' ? (
                    <Link
                      href="/register/cooperative"
                      className="text-[var(--color-accent-custom)] hover:underline font-bold transition-colors"
                    >
                      Register your cooperative
                    </Link>
                  ) : selectedRole === 'institution' ? (
                    <Link
                      href="/register/institution"
                      className="text-[var(--color-accent-custom)] hover:underline font-bold transition-colors"
                    >
                      Register your institution
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-2 mt-2 sm:mt-0">
                      <Link
                        href="/register/cooperative"
                        className="text-[var(--color-accent-custom)] hover:underline font-bold transition-colors"
                      >
                        Ferry Operator
                      </Link>
                      <span className="text-muted-foreground/50">|</span>
                      <Link
                        href="/register/institution"
                        className="text-[var(--color-accent-custom)] hover:underline font-bold transition-colors"
                      >
                        Bank / LGU
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

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
