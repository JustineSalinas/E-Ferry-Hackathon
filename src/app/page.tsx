"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Anchor, Sun, Radio, BarChart2, Layers, Activity, Leaf, ArrowRight, ArrowDown } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import { StatsBar } from "@/components/stats-bar";

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
    <div className="min-h-screen bg-[var(--color-bg)] text-foreground font-sans antialiased relative overflow-hidden">
      {/* ─────────────────────────── NAVIGATION ─────────────────────────── */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[var(--color-bg)]/80 backdrop-blur-[12px] border-b border-white/5" 
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-teal)] to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <Anchor className="w-6 h-6 text-[var(--color-teal)] transition-transform duration-600 group-hover:rotate-[360deg]" />
            <span className="text-foreground font-bold text-xl tracking-tight">
              MarineSync
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {["How It Works", "Impact", "For Operators", "For Banks"].map(
              (label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-muted-foreground hover:text-[var(--color-text)] text-sm font-medium transition-colors duration-150 relative group pb-1"
                >
                  {label}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-teal)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button
              asChild
              variant="outline"
              className="border-border text-[var(--color-text)] bg-transparent hover:bg-secondary/80 text-sm hidden sm:inline-flex"
            >
              <Link href="/login">Operator Login</Link>
            </Button>
            <Button
              asChild
              className="bg-[var(--color-teal)] hover:bg-[var(--color-teal)]/90 text-[var(--color-bg)] font-semibold text-sm transition-all hover:-translate-y-0.5 animate-pulse-glow border-none"
            >
              <Link href="/login">Bank Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="impact"
        className="relative pt-32 pb-8 px-6 text-center fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out z-10"
      >
        <AnimatedBackground />

        {/* Soft teal radial glow behind text */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0" 
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)" }} 
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <Badge className="mb-8 bg-gradient-to-br from-[rgba(8,145,178,0.2)] to-[rgba(45,212,191,0.1)] text-[var(--color-text)] border border-[rgba(45,212,191,0.35)] shadow-[0_0_20px_rgba(45,212,191,0.15)] rounded-full text-[0.7rem] font-semibold tracking-[0.12em] uppercase hover:bg-transparent px-4 py-1.5 flex items-center gap-2 w-fit mx-auto transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)] animate-blink-pulse inline-block" />
            Institutional-Grade Maritime Finance
          </Badge>
          
          <h1 className="font-display text-[clamp(3rem,5.5vw,5rem)] font-extrabold text-[var(--color-text)] leading-tight tracking-[-0.02em] mb-6 drop-shadow-lg max-w-[900px] mx-auto">
            De-risking Electric Propulsion for{" "}
            <span className="text-[var(--color-teal)] italic whitespace-nowrap">Inter-Island Ferries</span>
          </h1>
          
          <p className="font-body text-[1.1rem] leading-[1.75] text-[var(--color-muted)] max-w-2xl mx-auto mb-10 drop-shadow-md">
            MarineSync is the digital brain behind E-Ferry conversions — turning
            real-time vessel telemetry and route performance into bankable,
            ESG-compliant loan packages for cooperatives and financial
            institutions alike.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="bg-gradient-to-br from-[#0891b2] to-[#2dd4bf] text-white h-auto px-[32px] py-[14px] rounded-[10px] text-base font-semibold border-none hover:shadow-[0_8px_30px_rgba(45,212,191,0.4)] hover:-translate-y-1 transition-all duration-300 shimmer-button"
            >
              <Link href="/login">Get Your Bankability Score</Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="group border border-[rgba(45,212,191,0.5)] text-[var(--color-text)] bg-transparent hover:bg-[rgba(45,212,191,0.08)] hover:border-[#2dd4bf] h-auto px-[32px] py-[14px] rounded-[10px] text-base font-semibold hover:-translate-y-1 transition-all duration-300"
            >
              <Link href="/login" className="flex items-center">
                View Pre-Vetted Portfolios
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
          </div>
        </div>

        <StatsBar />
      </section>

      {/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="py-[clamp(80px,10vw,140px)] px-6 relative fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-teal)] mb-2">
              The Platform
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--color-text)]">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Three integrated layers convert raw vessel data into institutional
              financing.
            </p>
          </div>

          {/* Cards with connector line */}
          <div className="relative">
            {/* Horizontal dashed connector line */}
            <div className="absolute top-[20px] left-[calc(16.67%)] right-[calc(16.67%)] h-0 border-t border-dashed border-[rgba(45,212,191,0.2)] hidden md:block z-0" />

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
                  className="bg-card/60 backdrop-blur-md border border-border/50 shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-[rgba(45,212,191,0.4)] transition-all duration-300 rounded-2xl group"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-display text-xs font-bold shadow-[0_0_0_4px_rgba(45,212,191,0.15)] group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        {step}
                      </span>
                      <span className="text-primary group-hover:scale-110 transition-transform duration-300">{icon}</span>
                    </div>
                    <CardTitle className="text-foreground text-lg font-bold">
                      {title}
                    </CardTitle>
                    <span className="inline-block mt-1 bg-[rgba(45,212,191,0.1)] border border-[rgba(45,212,191,0.25)] rounded-full px-2.5 py-0.5 text-[0.72rem] text-[var(--color-teal)] font-medium">
                      {subtitle}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
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
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-teal)] mb-2">
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
                  <span className="font-display text-[var(--color-teal)] text-sm font-bold flex-shrink-0 mt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="border-l-2 border-[rgba(45,212,191,0.2)] pl-5 hover:border-[var(--color-teal)] transition-colors duration-300">
                    <p className="text-foreground font-semibold text-sm mb-1">
                      {heading}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Mock Score Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-sm border border-border/50 bg-card/60 backdrop-blur-md rounded-2xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-2 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                      Marine Bankability Score
                    </span>
                    <Badge className="bg-green-700 hover:bg-green-600 text-white text-xs font-semibold transition-colors">
                      ELIGIBLE
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  {/* SVG Circular Gauge */}
                  <div className="relative w-[180px] h-[180px] mx-auto">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                      <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <circle cx="90" cy="90" r="80" fill="none" stroke="#2dd4bf" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(780/1000) * 502.65} 502.65`} className="transition-all duration-[1.5s] ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-[3.5rem] font-extrabold text-[var(--color-teal)] leading-none">780</span>
                      <span className="font-body text-sm text-[var(--color-muted)] mt-1">/ 1000</span>
                      <span className="font-body text-[0.65rem] text-[var(--color-muted)] uppercase tracking-widest mt-1">Composite Score</span>
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
                          className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0 hover:bg-muted/30 px-2 rounded transition-colors"
                        >
                          <span className="text-muted-foreground text-xs">{label}</span>
                          <span className={`text-xs font-semibold ${isReduction ? "text-[var(--color-teal)]" : "text-foreground"}`}>
                            {isReduction && <ArrowDown className="w-3 h-3 inline" />}
                            {isReduction ? ` ${value}` : value}
                          </span>
                        </div>
                        <div className="mt-1.5 h-[3px] w-full rounded-full bg-[rgba(255,255,255,0.06)]">
                          <div className="h-full rounded-full bg-[var(--color-teal)]" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <Link href="/login">View Full Report →</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOR INSTITUTIONS ─────────────────────────── */}
      <section id="for-banks" className="py-[clamp(80px,10vw,140px)] px-6 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-teal)] mb-2">
              For Financial Institutions
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--color-text)]">
              Pre-Vetted, De-Risked Loan Packages
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              Access a curated pipeline of E-Ferry conversion loans — each
              complete with verified telemetry history, DSCR projections, and
              ESG quota contributions — delivered through the MarineSync Kanban
              Credit Portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <Layers className="w-8 h-8" style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.4))' }} />,
                title: "Kanban Credit Portal",
                body: "Visualise your entire pipeline from Application → In Review → Approved → Disbursed with real-time status synced to operator telemetry.",
              },
              {
                icon: <Activity className="w-8 h-8" style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.4))' }} />,
                title: "Live DSCR Metrics",
                body: "Debt Service Coverage Ratios are not modelled — they are back-tested against 90 days of actual vessel revenue and fuel-cost data.",
              },
              {
                icon: <Leaf className="w-8 h-8" style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.4))' }} />,
                title: "ESG Quota Tracking",
                body: "Each approved loan is tagged with verified CO₂ reduction tonnage, helping institutions meet green-portfolio mandates and regulatory ESG targets.",
              },
            ].map(({ icon, title, body }) => (
              <Card
                key={title}
                className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardHeader className="pb-2 p-8">
                  <span className="text-primary mb-2 block group-hover:scale-110 transition-transform duration-300 origin-left">{icon}</span>
                  <CardTitle className="text-foreground text-base font-bold">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mock Pipeline Table */}
          <Card className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground text-sm font-bold uppercase tracking-wide">
                  Active Loan Pipeline — Sample View
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30 text-xs bg-primary/5"
                >
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.08)]">
                    <th className="text-left px-6 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                      Cooperative
                    </th>
                    <th className="text-left px-6 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                      Route
                    </th>
                    <th className="text-left px-6 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left px-6 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                      Loan Amount
                    </th>
                    <th className="text-left px-6 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
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
                      status: "Approved" as const,
                    },
                    {
                      coop: "Visayas Green Maritime",
                      route: "Cebu → Bohol",
                      score: 714,
                      amount: "₱8.9M",
                      status: "In Review" as const,
                    },
                    {
                      coop: "Mindanao Blue Shipping",
                      route: "Davao → Samal",
                      score: 651,
                      amount: "₱6.2M",
                      status: "Pending" as const,
                    },
                  ].map(({ coop, route, score, amount, status }) => {
                    const statusStyles: Record<string, string> = {
                      "Approved": "bg-[rgba(34,197,94,0.15)] text-[#4ade80] border border-[rgba(34,197,94,0.3)]",
                      "In Review": "bg-[rgba(251,191,36,0.15)] text-[#fbbf24] border border-[rgba(251,191,36,0.3)]",
                      "Pending": "bg-[rgba(148,163,184,0.1)] text-[#94a3b8] border border-[rgba(148,163,184,0.2)]",
                    };
                    return (
                      <tr
                        key={coop}
                        className="border-b border-border/30 last:border-0 hover:bg-[rgba(45,212,191,0.04)] transition-colors duration-200"
                      >
                        <td className="px-6 py-4 font-medium text-foreground">
                          {coop}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{route}</td>
                        <td className="px-6 py-4 font-display text-[1.05rem] text-[var(--color-teal)] font-bold">
                          {score}
                        </td>
                        <td className="px-6 py-4 text-foreground font-medium">
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
              <div className="flex justify-end px-6 py-3 border-t border-[rgba(255,255,255,0.06)]">
                <a href="#" className="text-[var(--color-teal)] text-sm font-medium hover:underline">View All →</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─────────────────────────── FOOTER ─────────────────────────── */}
      <footer className="bg-[var(--color-bg)] py-14 px-6 border-t border-border/50 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Anchor className="w-5 h-5 text-[var(--color-teal)]" />
              <span className="text-foreground font-bold text-lg tracking-tight">
                MarineSync
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              The digital infrastructure layer for bankable, ESG-compliant
              E-Ferry conversions across the Philippine archipelago.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-xs">
              © 2026 MarineSync Technologies, Inc. All rights reserved.
            </p>
            <p className="text-muted-foreground/70 text-xs mt-1">
              Regulated maritime fintech. All data encrypted in transit and at
              rest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
