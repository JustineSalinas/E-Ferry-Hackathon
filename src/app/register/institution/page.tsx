'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Anchor, Landmark, Lock, Shield, ArrowRight } from 'lucide-react';

export default function InstitutionRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: '',
    bspLicense: '',
    officerName: '',
    division: '',
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
    targetPortfolio: '',
    maxTicket: '',
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Please agree to the terms.");
      return;
    }
    // Simulate registration
    alert('Registration successful! Please sign in.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex font-sans bg-[var(--color-bg)] animate-in fade-in duration-700 transition-colors">
      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] bg-[var(--color-surface-2)] flex-col justify-between p-12 relative overflow-hidden transition-colors border-r border-[var(--color-border-custom)]">
        {/* Soft radial glow */}
        <div 
          className="absolute inset-0" 
          style={{ background: 'radial-gradient(circle at 40% 60%, var(--color-accent-light), transparent 65%)' }} 
        />

        {/* Anchor watermark */}
        <Anchor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] text-[var(--color-accent-custom)] opacity-5" />

        {/* Branding */}
        <div className="relative z-10 animate-in slide-in-from-left-8 fade-in duration-1000">
          <Link href="/" className="flex items-center gap-3 mb-2 w-fit group">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-custom)] flex items-center justify-center shadow-sm group-hover:border-[var(--color-accent-custom)] transition-colors">
              <Anchor className="w-6 h-6 text-[var(--color-accent-custom)]" />
            </div>
            <span className="text-[var(--color-text)] text-2xl font-bold tracking-tight">
              MarineSync
            </span>
          </Link>
          <p className="text-[var(--color-muted-custom)] text-sm tracking-widest uppercase font-medium ml-1">
            Institutional Onboarding
          </p>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6 animate-in slide-in-from-left-8 fade-in duration-1000 delay-150">
          <div className="w-10 h-1 bg-[var(--color-accent-custom)]/20 rounded-full" />
          <blockquote className="font-display italic text-[1.4rem] leading-[1.7] text-[var(--color-text)] max-w-[400px]">
            &quot;Power the transition to a sustainable blue economy through data-driven maritime finance.&quot;
          </blockquote>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-custom)]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
                <span className="font-semibold text-[var(--color-text)]">De-risked Portfolios.</span> Access pre-vetted loan packages backed by verified telemetry and bankability scores.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-custom)]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
                <span className="font-semibold text-[var(--color-text)]">ESG Tracking.</span> Automatically calculate and report CO₂ reduction metrics for your green finance portfolio.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-custom)]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
                <span className="font-semibold text-[var(--color-text)]">Live DSCR Metrics.</span> Debt service coverage ratios are continuously updated with real revenue and fuel savings data.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
          <p className="text-[var(--color-muted-custom)]/60 text-xs font-medium">
            © 2026 MarineSync · Republic of the Philippines
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────── */}
      <div className="flex-1 bg-[var(--color-surface)] flex flex-col min-h-screen relative transition-colors overflow-y-auto">
        {/* Top nav */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4 sticky top-0 bg-[var(--color-surface)]/80 backdrop-blur z-20 border-b border-[var(--color-border-custom)]">
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm text-[var(--color-muted-custom)] hover:text-[var(--color-accent-custom)] transition-colors group font-medium"
          >
            <span className="text-base group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            <span>Back to login</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex lg:hidden items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-custom)] flex items-center justify-center">
                <Anchor className="w-4 h-4 text-[var(--color-surface)]" />
              </div>
              <span className="text-[var(--color-text)] font-bold text-sm">MarineSync</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-custom)]">
              <Landmark className="w-3.5 h-3.5" />
              Institution Registration
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-6 py-10 md:px-12">
          <div className="w-full space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700 max-w-[540px]">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="font-display text-[2.2rem] font-bold text-[var(--color-text)] tracking-tight leading-tight">
                Register your Institution
              </h1>
              <p className="text-[0.95rem] text-[var(--color-muted-custom)]">
                Create an institutional account to access the Kanban Credit Portal and review E-Ferry loan packages.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-8">
              {/* Section: Institution Info */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-[var(--color-border-custom)] pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-custom)] text-white text-xs font-bold">1</span>
                  <h2 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">Institution Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="institutionName" className="text-sm font-semibold text-[var(--color-text)]">Institution Name</Label>
                    <Input id="institutionName" placeholder="e.g. LandBank of the Philippines" value={formData.institutionName} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="institutionType" className="text-sm font-semibold text-[var(--color-text)]">Institution Type</Label>
                    <Input id="institutionType" placeholder="Bank / LGU / Dev Finance" value={formData.institutionType} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bspLicense" className="text-sm font-semibold text-[var(--color-text)]">BSP License No.</Label>
                    <Input id="bspLicense" placeholder="If applicable" value={formData.bspLicense} onChange={handleChange} className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                </div>
              </div>

              {/* Section: Primary Officer */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-[var(--color-border-custom)] pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-custom)] text-white text-xs font-bold">2</span>
                  <h2 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">Primary Officer</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="officerName" className="text-sm font-semibold text-[var(--color-text)]">Officer Name</Label>
                    <Input id="officerName" placeholder="Full Name" value={formData.officerName} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="division" className="text-sm font-semibold text-[var(--color-text)]">Division / Department</Label>
                    <Input id="division" placeholder="e.g. Risk Management" value={formData.division} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="position" className="text-sm font-semibold text-[var(--color-text)]">Designation</Label>
                    <Input id="position" placeholder="e.g. Credit Officer" value={formData.position} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                </div>
              </div>

              {/* Section: Account Setup */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-[var(--color-border-custom)] pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-custom)] text-white text-xs font-bold">3</span>
                  <h2 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">Account Setup</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-semibold text-[var(--color-text)]">Official Email Address</Label>
                    <Input id="email" type="email" placeholder="officer@bank.ph" value={formData.email} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-sm font-semibold text-[var(--color-text)]">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••••••" value={formData.password} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-[var(--color-text)]">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••••••" value={formData.confirmPassword} onChange={handleChange} required className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Lending Profile */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-[var(--color-border-custom)] pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-custom)] text-white text-xs font-bold">4</span>
                  <h2 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">Lending Profile</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="targetPortfolio" className="text-sm font-semibold text-[var(--color-text)]">Green Portfolio Target (%)</Label>
                    <Input id="targetPortfolio" type="number" placeholder="e.g. 15" value={formData.targetPortfolio} onChange={handleChange} className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="maxTicket" className="text-sm font-semibold text-[var(--color-text)]">Max Loan Ticket Size (PHP)</Label>
                    <Input id="maxTicket" type="number" placeholder="e.g. 5000000" value={formData.maxTicket} onChange={handleChange} className="h-11 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-lg text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)] focus:ring-1 text-sm placeholder:text-[var(--color-muted-custom)]" />
                  </div>
                </div>
              </div>

              {/* Section: Agreement & Submit */}
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-3 p-4 bg-[var(--color-surface-2)] border border-[var(--color-border-custom)] rounded-xl">
                  <div className="flex items-center h-5 mt-0.5">
                    <input id="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[var(--color-accent-custom)] focus:ring-[var(--color-accent-custom)]" />
                  </div>
                  <div className="text-sm">
                    <Label htmlFor="agreeTerms" className="font-semibold text-[var(--color-text)] cursor-pointer">
                      I agree to the MarineSync Institutional Terms and Data Processing Agreement
                    </Label>
                    <p className="text-[var(--color-muted-custom)] mt-1">
                      By checking this box, I confirm that I am authorized to register on behalf of my institution and agree to adhere to BSP guidelines regarding data privacy and credit underwriting via the MarineSync platform.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white font-semibold rounded-lg text-sm tracking-wide transition-all duration-300 border-none shadow-md group">
                  Register Institution
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-center text-sm text-[var(--color-muted-custom)] font-medium">
                  Already have an account?{' '}
                  <Link href="/login" className="text-[var(--color-accent-custom)] hover:underline font-bold transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>

            </form>
            
            {/* Trust Section */}
            <div className="flex flex-col items-center gap-2 pt-6 border-t border-[var(--color-border-custom)]">
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
