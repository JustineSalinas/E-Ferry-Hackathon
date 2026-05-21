"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Anchor, Sun, Radio, BarChart2, Layers, Activity, Leaf } from "lucide-react";

export default function LandingPage() {
  useEffect(() => {
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
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased relative overflow-hidden">
      {/* ─────────────────────────── GLOWING ORB ─────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* ─────────────────────────── NAVIGATION ─────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Anchor className="w-6 h-6 text-primary" />
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
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-150"
                >
                  {label}
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
              className="border-border text-foreground bg-transparent hover:bg-secondary/80 text-sm hidden sm:inline-flex"
            >
              <Link href="/login">Operator Login</Link>
            </Button>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <Link href="/login">Bank Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="impact"
        className="py-28 px-6 text-center fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 text-xs tracking-widest uppercase hover:bg-primary/20 transition-colors">
            Institutional-Grade Maritime Finance
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
            De-risking Electric Propulsion for{" "}
            <span className="text-primary">Inter-Island Ferries</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            MarineSync is the digital brain behind E-Ferry conversions — turning
            real-time vessel telemetry and route performance into bankable,
            ESG-compliant loan packages for cooperatives and financial
            institutions alike.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-semibold shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              <Link href="/login">Get Your Bankability Score</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground bg-background/50 backdrop-blur-sm hover:bg-secondary/50 px-8 py-3 text-base font-semibold hover:-translate-y-1 transition-all duration-300"
            >
              <Link href="/login">View Pre-Vetted Portfolios</Link>
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border/50 pt-14">
          {[
            { value: "50,000+", unit: "Tons CO₂ Saved" },
            { value: "35%", unit: "Fuel Reduction" },
            { value: "12", unit: "Routes Optimized" },
          ].map(({ value, unit }) => (
            <div key={unit} className="flex flex-col items-center gap-1 group">
              <span className="text-4xl md:text-5xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-300">
                {value}
              </span>
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 relative fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              The Platform
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Three integrated layers convert raw vessel data into institutional
              financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-card/60 backdrop-blur-md border border-border/50 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 rounded-2xl group"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {step}
                    </span>
                    <span className="text-primary group-hover:scale-110 transition-transform duration-300">{icon}</span>
                  </div>
                  <CardTitle className="text-foreground text-lg font-bold">
                    {title}
                  </CardTitle>
                  <p className="text-primary text-sm font-semibold">
                    {subtitle}
                  </p>
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
      </section>

      {/* ─────────────────────────── FOR OPERATORS ─────────────────────────── */}
      <section id="for-operators" className="bg-secondary/20 py-24 px-6 border-y border-border/30 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              For Operators
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Turn Your Route Data Into Capital
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Feature list */}
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
              ].map(({ heading, body }) => (
                <div key={heading} className="flex gap-4 group">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
                  <div>
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
                  <div className="text-center group">
                    <span className="text-6xl font-extrabold text-primary inline-block group-hover:scale-105 transition-transform duration-300">
                      780
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground">
                      {" "}
                      / 1000
                    </span>
                    <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wider">
                      Composite Score
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Operational Uptime", value: "97.2%" },
                      { label: "Fuel Efficiency", value: "↓ 31%" },
                      { label: "DSCR (Projected)", value: "1.42×" },
                      { label: "ESG Delta", value: "−22 tCO₂" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0 hover:bg-muted/30 px-2 rounded transition-colors"
                      >
                        <span className="text-muted-foreground text-xs">{label}</span>
                        <span className="text-foreground text-xs font-semibold">
                          {value}
                        </span>
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
      <section id="for-banks" className="py-24 px-6 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              For Financial Institutions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
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
                className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardHeader className="pb-2">
                  <span className="text-primary mb-2 block group-hover:scale-110 transition-transform duration-300 origin-left">{icon}</span>
                  <CardTitle className="text-foreground text-base font-bold">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                  <tr className="border-b border-border/50 bg-muted/20">
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
                      status: "Approved",
                      color: "bg-green-700/90 text-white",
                    },
                    {
                      coop: "Visayas Green Maritime",
                      route: "Cebu → Bohol",
                      score: 714,
                      amount: "₱8.9M",
                      status: "In Review",
                      color: "bg-amber-500/90 text-white",
                    },
                    {
                      coop: "Mindanao Blue Shipping",
                      route: "Davao → Samal",
                      score: 651,
                      amount: "₱6.2M",
                      status: "Pending",
                      color: "bg-slate-500/90 text-white",
                    },
                  ].map(({ coop, route, score, amount, status, color }) => (
                    <tr
                      key={coop}
                      className="border-b border-border/30 last:border-0 hover:bg-muted/40 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {coop}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{route}</td>
                      <td className="px-6 py-4 font-bold text-primary">
                        {score}
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">
                        {amount}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`${color} text-xs font-semibold border-0`}
                        >
                          {status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─────────────────────────── FOOTER ─────────────────────────── */}
      <footer className="bg-background py-14 px-6 border-t border-border/50 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Anchor className="w-5 h-5 text-primary" />
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
