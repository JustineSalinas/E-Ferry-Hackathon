"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Anchor, Sun, Radio, BarChart2, Layers, Activity, Leaf, ArrowRight, ArrowDown, Ship, Users, Target, ShieldCheck, Landmark } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import { StatsBar } from "@/components/stats-bar";
import { HeroSlideshow } from "@/components/hero-slideshow";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".fade-in-section");
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased relative overflow-hidden transition-colors duration-300">
      {/* ─────────────────────────── NAVIGATION ─────────────────────────── */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[var(--color-bg)]/90 backdrop-blur-[12px] border-b border-[var(--color-border-custom)] shadow-sm" 
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <Anchor className="w-6 h-6 text-[var(--color-accent-custom)] transition-transform duration-600 group-hover:rotate-[360deg]" />
            <span className="text-[var(--color-text)] font-bold text-xl tracking-tight">
              MarineSync
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a href="#how-it-works" className="text-[var(--color-text)] font-medium text-sm transition-colors duration-150 relative group pb-1 whitespace-nowrap hover:text-[var(--color-accent-custom)]">
              How It Works
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-teal)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            
            <div className="relative group pb-1">
              <button className="text-[var(--color-text)] font-medium text-sm transition-colors duration-150 whitespace-nowrap hover:text-[var(--color-accent-custom)] flex items-center gap-1">
                Solutions <span className="text-[0.6rem] opacity-70">▼</span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden flex flex-col z-50">
                <a href="#for-operators" className="px-4 py-3 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-accent-custom)] transition-colors border-b border-[var(--color-border-custom)]/50">For Ferry Operators</a>
                <a href="#for-banks" className="px-4 py-3 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-accent-custom)] transition-colors">For Financial Institutions</a>
              </div>
            </div>

            <a href="#product" className="text-[var(--color-text)] font-medium text-sm transition-colors duration-150 relative group pb-1 whitespace-nowrap hover:text-[var(--color-accent-custom)]">
              Product
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-teal)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            <a href="#about-us" className="text-[var(--color-text)] font-medium text-sm transition-colors duration-150 relative group pb-1 whitespace-nowrap hover:text-[var(--color-accent-custom)]">
              About Us
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-teal)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">

            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline" }), "border-[1.5px] border-[var(--color-border-custom)] text-[var(--color-text)] bg-[var(--color-surface)] hover:text-[var(--color-accent-custom)] hover:border-[var(--color-accent-custom)] hover:bg-[var(--color-surface)] shadow-sm text-sm hidden sm:inline-flex")}
            >
              Operator Login
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants(), "bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white font-semibold text-sm transition-all border-none")}
            >
              Bank Portal
            </Link>
          </div>
        </div>
      </header>

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="impact"
        className="relative pt-28 pb-4 px-6 text-center fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out z-10"
      >
        <AnimatedBackground />

        <div className="max-w-4xl mx-auto relative z-10">
          <Badge className="mb-8 bg-[var(--color-surface)] text-[var(--color-accent-custom)] border border-[var(--color-border-custom)] rounded-full text-[0.7rem] font-bold tracking-[0.12em] uppercase px-4 py-1.5 flex items-center gap-2 w-fit mx-auto shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)] animate-blink-pulse inline-block" />
            Institutional-Grade Maritime Finance
          </Badge>
          
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-extrabold text-[var(--color-text)] leading-[1.1] tracking-[-0.02em] mb-6 drop-shadow-sm max-w-[900px] mx-auto">
            De-risking Electric Propulsion for <br className="hidden md:block" />
            <span className="text-[var(--color-teal)] italic whitespace-nowrap">Inter-Island Ferries</span>
          </h1>
          
          <p className="font-body text-[1.1rem] leading-[1.75] text-[var(--color-muted-custom)] max-w-2xl mx-auto mb-3">
            The platform connecting maritime cooperatives with institutional capital.
          </p>
          <p className="font-body text-[0.95rem] leading-[1.6] text-[var(--color-muted-custom)]/80 max-w-xl mx-auto mb-10">
            MarineSync converts real-time vessel telemetry into bankable, ESG-compliant loan packages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/login"
              className={cn(buttonVariants(), "bg-[var(--color-accent-custom)] text-white h-auto px-[32px] py-[14px] rounded-[10px] text-base font-semibold border-none hover:bg-[var(--color-accent-mid)] hover:shadow-[0_8px_24px_rgba(12,74,110,0.25)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2")}
            >
              <Ship className="w-5 h-5 opacity-80" />
              I&apos;m a Ferry Operator
            </Link>
            
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline" }), "bg-[var(--color-surface)] border-[1.5px] border-[var(--color-border-custom)] text-[var(--color-text)] hover:text-[var(--color-accent-custom)] hover:border-[var(--color-accent-custom)] h-auto px-[32px] py-[14px] rounded-[10px] text-base font-semibold hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2")}
            >
              <Landmark className="w-5 h-5 opacity-80" />
              I&apos;m a Financial Institution
            </Link>
          </div>

          {/* Social Proof / Trusted By */}
          <div className="mt-12 flex flex-col items-center justify-center animate-in fade-in duration-1000 delay-500">
            <p className="text-[0.65rem] uppercase tracking-widest font-semibold text-[var(--color-muted-custom)] mb-4">
              Trusted by leading institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-display font-bold text-xl text-[var(--color-text)] flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-[var(--color-teal)]" /> LandBank</span>
              <span className="font-display font-bold text-xl text-[var(--color-text)] flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-[var(--color-accent-custom)]" /> DBP</span>
              <span className="font-display font-bold text-xl text-[var(--color-text)] flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-[var(--color-text)]" /> PCFC</span>
              <span className="font-display font-bold text-xl text-[var(--color-text)] flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-[var(--color-teal)]" /> PhilGuarantee</span>
            </div>
          </div>
          
          <HeroSlideshow />
        </div>

        <StatsBar />
      </section>

      {/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="py-[clamp(80px,10vw,140px)] px-6 relative fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-custom)] mb-2">
              The Platform
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--color-text)]">
              How It Works
            </h2>
            <p className="text-[var(--color-muted-custom)] mt-3 max-w-xl mx-auto font-body">
              Three integrated layers convert raw vessel data into institutional
              financing.
            </p>
          </div>

          <div className="relative">


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: <Sun className="w-8 h-8" />,
                  title: "Hardware Layer",
                  subtitle: "Hybrid Solar-Wind Controller",
                  description:
                    "Each vessel is fitted with our proprietary Hybrid Solar-Wind Controller that harvests renewable energy, manages battery discharge cycles, and logs propulsion metrics at 1-second granularity.",
                },
                {
                  step: "02",
                  icon: <Radio className="w-8 h-8" />,
                  title: "Telemetry Engine",
                  subtitle: "Real-Time Data Ingestion",
                  description:
                    "Onboard IoT nodes stream GPS position, fuel burn, battery state-of-health, and passenger load directly to the MarineSync cloud — processed in real time against route benchmarks.",
                },
                {
                  step: "03",
                  icon: <BarChart2 className="w-8 h-8" />,
                  title: "Marine Bankability Score",
                  subtitle: "Credit Score · 0 – 1,000",
                  description:
                    "Proprietary scoring engine aggregates 90-day telemetry history, operator compliance, DSCR projections, and ESG deltas into a single bankability score used by partner lenders.",
                },
              ].map(({ step, icon, title, subtitle, description }) => (
                <Card
                  key={step}
                  className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] shadow-sm hover:shadow-lg hover:border-[var(--color-accent-custom)]/50 hover:-translate-y-[3px] transition-all duration-300 rounded-2xl group"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] font-display text-sm font-bold transition-colors duration-300">
                        {step}
                      </span>
                      <span className="text-[var(--color-teal)] group-hover:scale-110 transition-transform duration-300">{icon}</span>
                    </div>
                    <CardTitle className="text-[var(--color-text)] text-lg font-bold font-display">
                      {title}
                    </CardTitle>
                    <span className="inline-block mt-1 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-full px-2.5 py-0.5 text-[0.72rem] text-[var(--color-success)] font-medium font-body">
                      {subtitle}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--color-muted-custom)] text-sm leading-relaxed font-body">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOR OPERATORS ─────────────────────────── */}
      <section id="for-operators" className="py-[clamp(80px,10vw,140px)] px-6 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-custom)] mb-2">
              For Operators
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--color-text)]">
              Turn Your Route Data Into Capital
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Feature list with numbered blocks */}
            <div className="space-y-6">
              {[
                {
                  heading: "Bankability Score System",
                  body: "Your 90-day operational track record is continuously scored on a 0–1,000 scale. A score above 700 automatically qualifies your cooperative for pre-approved loan packages from our institutional partners.",
                },
                {
                  heading: "Automated Subsidy Matching",
                  body: "MarineSync cross-references your route geography and vessel class against active national and multilateral green-shipping subsidy programs — surfacing matches you'd otherwise miss.",
                },
                {
                  heading: "Compliance Dashboard",
                  body: "Stay audit-ready. Real-time alerts flag deviations from MARINA and DOE regulatory requirements, protecting your score and your subsidy eligibility.",
                },
                {
                  heading: "Investor-Ready Reports",
                  body: "Generate one-click PDF or JSON data rooms with DSCR projections, CO₂ reduction curves, and route profitability analysis — formatted to bank underwriting standards.",
                },
              ].map(({ heading, body }, index) => (
                <div key={heading} className="flex gap-4 group">
                  <span className="font-display text-[var(--color-accent-custom)] text-sm font-bold flex-shrink-0 mt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="border-l-2 border-[var(--color-border-custom)] pl-5 hover:border-[var(--color-teal)] transition-colors duration-300">
                    <p className="text-[var(--color-text)] font-semibold text-sm mb-1 font-body">
                      {heading}
                    </p>
                    <p className="text-[var(--color-muted-custom)] text-sm leading-relaxed font-body">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Mock Score Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2 border-b border-[var(--color-border-custom)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] text-[var(--color-muted-custom)] uppercase tracking-widest font-medium font-body">
                      Marine Bankability Score
                    </span>
                    <Badge className="bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30 hover:bg-[var(--color-success)]/20 text-[0.65rem] font-semibold px-2 py-0.5 rounded-full">
                      ELIGIBLE
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  {/* SVG Circular Gauge */}
                  <div className="relative w-[180px] h-[180px] mx-auto">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                      <circle cx="90" cy="90" r="80" fill="none" className="stroke-[var(--color-border-custom)]" strokeWidth="8" />
                      <circle cx="90" cy="90" r="80" fill="none" stroke="var(--color-teal)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(780/1000) * 502.65} 502.65`} className="transition-all duration-[1.5s] ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-[3.5rem] font-extrabold text-[var(--color-accent-custom)] leading-none">780</span>
                      <span className="font-body text-sm text-[var(--color-muted-custom)] mt-1">/ 1000</span>
                      <span className="font-body text-[0.65rem] text-[var(--color-muted-custom)] uppercase tracking-widest mt-1">Composite Score</span>
                    </div>
                  </div>

                  {/* Metrics rows with progress bars */}
                  <div className="space-y-2">
                    {[
                      { label: "Operational Uptime", value: "97.2%", progress: 97.2 },
                      { label: "Fuel Efficiency", value: "31%", progress: 69, isReduction: true },
                      { label: "DSCR (Projected)", value: "1.42×", progress: 71 },
                      { label: "ESG Delta", value: "−22 tCO₂", progress: 85 },
                    ].map(({ label, value, progress, isReduction }) => (
                      <div key={label}>
                        <div
                          className="flex justify-between items-center py-1.5 border-b border-transparent hover:bg-[var(--color-surface-2)] px-2 rounded transition-colors"
                        >
                          <span className="text-[var(--color-muted-custom)] text-xs font-body">{label}</span>
                          <span className={`text-xs font-semibold font-body ${isReduction ? "text-[var(--color-teal)]" : "text-[var(--color-text)]"}`}>
                            {isReduction && <ArrowDown className="w-3 h-3 inline" />}
                            {isReduction ? ` ${value}` : value}
                          </span>
                        </div>
                        <div className="mt-1 h-[3px] w-full rounded-full bg-[var(--color-border-custom)]">
                          <div className="h-full rounded-full bg-[var(--color-teal)]" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login"
                    className={cn(buttonVariants(), "w-full bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white text-sm font-semibold shadow-none transition-all border-none")}
                  >
                    View Full Report →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOR INSTITUTIONS ─────────────────────────── */}
      <section id="for-banks" className="py-[clamp(80px,10vw,140px)] px-6 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 bg-[var(--color-surface-2)]/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-custom)] mb-2">
              For Financial Institutions
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--color-text)]">
              Pre-Vetted, De-Risked Loan Packages
            </h2>
            <p className="text-[var(--color-muted-custom)] mt-3 max-w-2xl leading-relaxed font-body">
              Access a curated pipeline of E-Ferry conversion loans — each
              complete with verified telemetry history, DSCR projections, and
              ESG quota contributions — delivered through the MarineSync Kanban
              Credit Portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <Layers className="w-8 h-8" />,
                title: "Kanban Credit Portal",
                body: "Visualise your entire pipeline from Application → In Review → Approved → Disbursed with real-time status synced to operator telemetry.",
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Live DSCR Metrics",
                body: "Debt Service Coverage Ratios are not modelled — they are back-tested against 90 days of actual vessel revenue and fuel-cost data.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "ESG Quota Tracking",
                body: "Each approved loan is tagged with verified CO₂ reduction tonnage, helping institutions meet green-portfolio mandates and regulatory ESG targets.",
              },
            ].map(({ icon, title, body }) => (
              <Card
                key={title}
                className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] shadow-sm hover:shadow-lg hover:-translate-y-[3px] transition-all duration-300 rounded-2xl group"
              >
                <CardHeader className="pb-2 p-8">
                  <span className="text-[var(--color-teal)] mb-2 block group-hover:scale-110 transition-transform duration-300 origin-left">{icon}</span>
                  <CardTitle className="text-[var(--color-text)] text-base font-bold font-display">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-[var(--color-muted-custom)] text-sm leading-relaxed font-body">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mock Pipeline Table */}
          <Card className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-2xl shadow-sm overflow-hidden">
            <CardHeader className="border-b border-[var(--color-border-custom)] bg-[var(--color-bg)] px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--color-text)] text-sm font-bold uppercase tracking-wide font-body">
                  Active Loan Pipeline — Sample View
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-[var(--color-accent-custom)] border-[var(--color-accent-custom)]/20 text-xs bg-[var(--color-accent-light)]"
                >
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="bg-[var(--color-bg)] border-b border-[var(--color-border-custom)]">
                    <th className="text-left px-6 py-4 text-[var(--color-muted-custom)] text-xs font-semibold uppercase tracking-wider">
                      Cooperative
                    </th>
                    <th className="text-left px-6 py-4 text-[var(--color-muted-custom)] text-xs font-semibold uppercase tracking-wider">
                      Route
                    </th>
                    <th className="text-left px-6 py-4 text-[var(--color-muted-custom)] text-xs font-semibold uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left px-6 py-4 text-[var(--color-muted-custom)] text-xs font-semibold uppercase tracking-wider">
                      Loan Amount
                    </th>
                    <th className="text-left px-6 py-4 text-[var(--color-muted-custom)] text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      coop: "Batangas Bay Ferry Coop",
                      route: "Batangas → Calapan",
                      score: 780,
                      amount: "₱12.4M",
                      status: "Approved",
                    },
                    {
                      coop: "Visayas Green Maritime",
                      route: "Cebu → Bohol",
                      score: 714,
                      amount: "₱8.9M",
                      status: "In Review",
                    },
                    {
                      coop: "Mindanao Blue Shipping",
                      route: "Davao → Samal",
                      score: 651,
                      amount: "₱6.2M",
                      status: "Pending",
                    },
                  ].map(({ coop, route, score, amount, status }) => {
                    const statusStyles: Record<string, string> = {
                      "Approved": "bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20",
                      "In Review": "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20",
                      "Pending": "bg-[var(--color-pending)]/10 text-[var(--color-pending)] border border-[var(--color-pending)]/20",
                    };
                    return (
                      <tr
                        key={coop}
                        className="border-b border-[var(--color-border-custom)] last:border-0 hover:bg-[var(--color-surface-2)]/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 font-medium text-[var(--color-text)]">
                          {coop}
                        </td>
                        <td className="px-6 py-4 text-[var(--color-muted-custom)]">{route}</td>
                        <td className="px-6 py-4 font-display text-[1.05rem] text-[var(--color-accent-custom)] font-bold">
                          {score}
                        </td>
                        <td className="px-6 py-4 text-[var(--color-text)] font-medium">
                          {amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`${statusStyles[status]} text-[0.7rem] font-semibold px-3 py-1 rounded-full inline-block`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-end px-6 py-3 border-t border-[var(--color-border-custom)]">
                <a href="#" className="text-[var(--color-accent-custom)] text-sm font-medium hover:underline">View All →</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─────────────────────────── PRODUCT: E-BANGKA ─────────────────────────── */}
      <section id="product" className="py-[clamp(80px,10vw,140px)] px-6 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border-custom)] to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-custom)] mb-2">
              Our Flagship Product
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--color-text)]">
              The E-Bangka System
            </h2>
            <p className="text-[var(--color-muted-custom)] mt-3 max-w-2xl mx-auto leading-relaxed font-body">
              A fully integrated hardware and software ecosystem designed to modernize inter-island transport with zero emissions, real-time telemetry, and uncompromising safety.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1: The Vessel */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden border border-[var(--color-border-custom)] shadow-xl group bg-[var(--color-surface-2)]">
                  <img src="/boat.png" alt="E-Bangka Vessel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-[var(--color-accent-light)] border border-[var(--color-accent-custom)]/20 rounded-xl mb-2">
                  <Ship className="w-6 h-6 text-[var(--color-accent-custom)]" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                  Next-Generation Electric Vessel
                </h3>
                <p className="text-[var(--color-muted-custom)] leading-relaxed font-body">
                  The E-Bangka replaces traditional, heavily polluting diesel engines with a state-of-the-art electric propulsion system. Built with composite materials for weight reduction and hydrodynamically optimized hulls, it delivers a smooth, silent, and zero-emission ride for passengers.
                </p>
                <ul className="space-y-3 font-body">
                  {["Zero carbon emissions during operation", "Significant reduction in noise and vibration", "Lower maintenance costs compared to diesel equivalents"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-teal)]" />
                      </div>
                      <span className="text-sm font-medium text-[var(--color-text)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2: The System */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden border border-[var(--color-border-custom)] shadow-xl group bg-[var(--color-surface-2)]">
                  <img src="/system.png" alt="MarineSync System" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-[var(--color-accent-light)] border border-[var(--color-accent-custom)]/20 rounded-xl mb-2">
                  <Activity className="w-6 h-6 text-[var(--color-accent-custom)]" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                  MarineSync Telemetry & Control
                </h3>
                <p className="text-[var(--color-muted-custom)] leading-relaxed font-body">
                  Every E-Bangka is connected to our centralized MarineSync platform. IoT sensors continuously stream critical data—from battery state-of-charge and motor temperature to GPS location and passenger manifest—ensuring peak operational efficiency and absolute passenger safety.
                </p>
                <ul className="space-y-3 font-body">
                  {["Real-time GPS tracking and geofencing", "Predictive maintenance alerts based on motor telemetry", "Automated compliance reporting for maritime authorities"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-teal)]" />
                      </div>
                      <span className="text-sm font-medium text-[var(--color-text)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── ABOUT US ─────────────────────────── */}
      <section id="about-us" className="py-[clamp(80px,10vw,140px)] px-6 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 bg-[var(--color-surface-2)]/50 border-t border-[var(--color-border-custom)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-custom)] mb-2">
              Our Core Pillars
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--color-text)]">
              Transport, Clean Energy & Finance
            </h2>
            <p className="text-[var(--color-muted-custom)] mt-3 max-w-2xl mx-auto leading-relaxed font-body">
              MarineSync operates at the intersection of three critical sectors. We are a team of maritime engineers, renewable energy experts, and financial technologists dedicated to accelerating the Philippines&apos; transition to a sustainable blue economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Ship className="w-8 h-8" />,
                title: "Transportation Innovation",
                description: "Modernizing inter-island transit by deploying zero-emission E-Bangka vessels that drastically improve passenger mobility, safety, and comfort across the archipelago."
              },
              {
                icon: <Sun className="w-8 h-8" />,
                title: "Renewable Energy Access",
                description: "Harvesting clean power directly on the water. Our vessels utilize proprietary hybrid solar-wind controllers, decentralizing energy generation and eliminating reliance on polluting diesel fuels."
              },
              {
                icon: <Landmark className="w-8 h-8" />,
                title: "Inclusive Financing",
                description: "Bridging the gap between ferry cooperatives and institutional capital. We use verified vessel telemetry to de-risk lending and unlock green subsidies for physical infrastructure."
              }
            ].map(({ icon, title, description }) => (
              <Card key={title} className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] shadow-sm hover:-translate-y-2 transition-transform duration-300">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center mb-4 text-[var(--color-accent-custom)]">
                    {icon}
                  </div>
                  <CardTitle className="text-xl font-display font-bold text-[var(--color-text)]">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-[var(--color-muted-custom)] font-body text-sm leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOOTER ─────────────────────────── */}
      <footer className="bg-[var(--color-bg)] py-14 px-6 border-t border-[var(--color-border-custom)] fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Anchor className="w-5 h-5 text-[var(--color-accent-custom)]" />
              <span className="text-[var(--color-text)] font-bold text-lg tracking-tight">
                MarineSync
              </span>
            </div>
            <p className="text-[var(--color-muted-custom)] text-sm max-w-xs leading-relaxed font-body">
              The digital infrastructure layer for bankable, ESG-compliant
              E-Ferry conversions across the Philippine archipelago.
            </p>
          </div>

          <div className="text-center md:text-right font-body">
            <p className="text-[var(--color-muted-custom)] text-xs">
              © 2026 MarineSync Technologies, Inc. All rights reserved.
            </p>
            <p className="text-[var(--color-muted-custom)]/70 text-xs mt-1">
              Regulated maritime fintech. All data encrypted in transit and at
              rest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
