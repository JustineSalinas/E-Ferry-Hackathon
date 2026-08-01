"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Ship,
  Zap,
  Landmark,
  Cpu,
  Leaf,
  ShieldCheck,
  BarChart2,
  ArrowRight,
  ChevronDown,
  Award,
  CheckCircle2,
  Compass,
  DollarSign,
  Layers,
  Sparkles,
  Send,
  Radio,
  ExternalLink,
  Lock,
  Globe
} from "lucide-react";

import { AnimatedBackground } from "@/components/animated-background";
import { RetrofitSimulator } from "@/components/retrofit-simulator";
import { FintechCalculator } from "@/components/fintech-calculator";
import { MarineAiConsole } from "@/components/marine-ai-console";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactRole, setContactRole] = useState("operator");

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased relative overflow-hidden transition-colors duration-300">
      {/* ─────────────────────────── NAVIGATION ─────────────────────────── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-bg)]/95 backdrop-blur-[16px] border-b border-[var(--color-border-custom)] shadow-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo only (Clean corporate logo) */}
          <a href="#" className="flex items-center group cursor-pointer">
            <img
              src="/solmate.png"
              alt="Solmate Logo"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#products"
              className="text-[var(--color-text)] font-medium text-sm transition-colors relative group pb-1 hover:text-[var(--color-accent-custom)]"
            >
              Products Showcase
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-accent-custom)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            <a
              href="#retrofit"
              className="text-[var(--color-text)] font-medium text-sm transition-colors relative group pb-1 hover:text-[var(--color-accent-custom)]"
            >
              E-Ferry Retrofit
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-accent-custom)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            <a
              href="#fintech"
              className="text-[var(--color-text)] font-medium text-sm transition-colors relative group pb-1 hover:text-[var(--color-accent-custom)]"
            >
              Green Fintech
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-accent-custom)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            <a
              href="#marine-ai"
              className="text-[var(--color-text)] font-medium text-sm transition-colors relative group pb-1 hover:text-[var(--color-accent-custom)]"
            >
              Marine-AI Platform
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-accent-custom)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            <a
              href="#architecture"
              className="text-[var(--color-text)] font-medium text-sm transition-colors relative group pb-1 hover:text-[var(--color-accent-custom)]"
            >
              System Architecture
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[var(--color-accent-custom)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Request Feasibility Audit
            </a>
          </div>
        </div>
      </header>

      {/* ─────────────────────────── HERO SECTION ─────────────────────────── */}
      <section className="relative pt-36 pb-20 px-6 text-center fade-in-section opacity-0 translate-y-8 transition-all duration-1000 ease-out z-10">
        <AnimatedBackground />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            <Badge className="bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Ready, Spark, Charge 2026 1st Runner-Up (Products 1 & 2)
            </Badge>

            <Badge className="bg-blue-500/10 text-blue-700 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              National AI Hackathon (Product 3)
            </Badge>

            <Badge className="bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] border border-[var(--color-accent-custom)]/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-custom)] animate-pulse" />
              Zero-Emission Maritime Ecosystem
            </Badge>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold text-[var(--color-text)] leading-[1.08] tracking-[-0.03em] mb-6 drop-shadow-sm max-w-4xl mx-auto">
            Pioneering Zero-Emission & <br className="hidden md:block" />
            <span className="text-[var(--color-accent-custom)]">
              Intelligent Maritime Solutions
            </span>
          </h1>

          <p className="font-body text-lg md:text-xl leading-relaxed text-[var(--color-muted-custom)] max-w-3xl mx-auto mb-10">
            Solmate unifies modular electric ferry retrofits, institutional green finance, and real-time AI bridge intelligence into a single transformative platform for passenger fleets.
          </p>

          {/* Product Quick-Switch Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <a
              href="#retrofit"
              className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-custom)] hover:border-[var(--color-accent-custom)] transition-all group text-left flex items-center gap-3 shadow-sm hover:shadow-md"
            >
              <div className="p-2.5 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] group-hover:scale-105 transition-transform">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[var(--color-muted-custom)] uppercase font-mono block">Product 1</span>
                <span className="font-bold text-sm text-[var(--color-text)]">E-Ferry Retrofit Service</span>
              </div>
            </a>

            <a
              href="#fintech"
              className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-custom)] hover:border-[var(--color-teal)] transition-all group text-left flex items-center gap-3 shadow-sm hover:shadow-md"
            >
              <div className="p-2.5 rounded-lg bg-[var(--color-teal)]/10 text-[var(--color-teal)] group-hover:scale-105 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[var(--color-muted-custom)] uppercase font-mono block">Product 2</span>
                <span className="font-bold text-sm text-[var(--color-text)]">Solmate Green Fintech</span>
              </div>
            </a>

            <a
              href="#marine-ai"
              className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-custom)] hover:border-[var(--color-blue)] transition-all group text-left flex items-center gap-3 shadow-sm hover:shadow-md"
            >
              <div className="p-2.5 rounded-lg bg-[var(--color-blue)]/10 text-[var(--color-blue)] group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[var(--color-muted-custom)] uppercase font-mono block">Product 3</span>
                <span className="font-bold text-sm text-[var(--color-text)]">Marine-AI Advisory System</span>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#products"
              className="bg-[var(--color-accent-custom)] text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-[var(--color-accent-mid)] transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Explore All 3 Products Below
            </a>

            <a
              href="#marine-ai"
              className="bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border-custom)] px-8 py-4 rounded-xl text-base font-semibold hover:border-[var(--color-accent-custom)] transition-all flex items-center gap-2"
            >
              <Radio className="w-5 h-5 text-[var(--color-accent-custom)] animate-pulse" />
              Launch Live AI Bridge Simulator
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── PRODUCT 1: E-FERRY RETROFIT ─────────────────────────── */}
      <section id="retrofit" className="py-20 px-6 max-w-7xl mx-auto fade-in-section opacity-0 translate-y-8 transition-all duration-1000">
        <div className="mb-10 text-center md:text-left">
          <Badge className="bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] border border-[var(--color-accent-custom)]/30 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
            Product 1 Showcase • Ready, Spark, Charge 2026 1st Runner-Up
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight mb-4">
            Solmate E-Ferry Retrofit Service
          </h2>
          <p className="text-base md:text-lg text-[var(--color-muted-custom)] max-w-3xl">
            Convert existing diesel passenger boats into 100% zero-emission electric ferries. Zero vessel hull reconstruction needed. Installs directly onto fiberglass bangkas, catamarans, and monohulls in service.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] w-fit rounded-xl mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Up to 85% OpEx Savings</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              Replacing expensive diesel fuel with high-efficiency electric propulsion drops daily operating costs dramatically from day one.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-teal)]/10 text-[var(--color-teal)] w-fit rounded-xl mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Zero Direct Carbon Emissions</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              Eliminates thousands of tons of local CO2, oil spills, and diesel smoke in pristine coastal waters and island ports.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-blue)]/10 text-[var(--color-blue)] w-fit rounded-xl mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Modular Pack & Drive Kit</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              Liquid-cooled IP68 LFP sub-packs, high-torque brushless electric outboards/inboards, and digital throttle control units.
            </p>
          </div>
        </div>

        {/* Interactive Retrofit Simulator */}
        <RetrofitSimulator />
      </section>

      {/* ─────────────────────────── PRODUCT 2: GREEN FINTECH ─────────────────────────── */}
      <section id="fintech" className="py-20 px-6 max-w-7xl mx-auto fade-in-section opacity-0 translate-y-8 transition-all duration-1000">
        <div className="mb-10 text-center md:text-left">
          <Badge className="bg-emerald-500/10 text-[var(--color-teal)] border border-[var(--color-teal)]/30 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
            Product 2 Showcase • Ready, Spark, Charge 2026 1st Runner-Up
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight mb-4">
            Solmate Green Fintech Platform
          </h2>
          <p className="text-base md:text-lg text-[var(--color-muted-custom)] max-w-3xl">
            Unlocking institutional ESG capital for maritime vessel electrification. Converts tamper-proof IoT telemetry into bankable loan structures, tokenized green bonds, and automated carbon credit monetization.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-teal)]/10 text-[var(--color-teal)] w-fit rounded-xl mb-4">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Pay-As-You-Save (PAYS)</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              Vessel owners and cooperatives require $0 upfront capital. Concessionary financing is repaid directly out of monthly fuel cost savings.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] w-fit rounded-xl mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Carbon Credit Yield</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              Every zero-emission nautical mile logged by IoT hardware is cryptographically verified to generate audited carbon offset credits.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-blue)]/10 text-[var(--color-blue)] w-fit rounded-xl mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Bankable IoT Risk Verification</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              Lenders receive real-time visibility into vessel health, energy consumption, and route compliance, de-risking default probabilities.
            </p>
          </div>
        </div>

        {/* Interactive Fintech Calculator */}
        <FintechCalculator />
      </section>

      {/* ─────────────────────────── PRODUCT 3: MARINE-AI ─────────────────────────── */}
      <section id="marine-ai" className="py-20 px-6 max-w-7xl mx-auto fade-in-section opacity-0 translate-y-8 transition-all duration-1000">
        <div className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-3 mb-3 justify-center md:justify-start">
            <Badge className="bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              National AI Hackathon 2026
            </Badge>
            <Badge className="bg-[var(--color-blue)]/10 text-[var(--color-blue)] border border-[var(--color-blue)]/20 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
              Product 3 Showcase
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight mb-4">
            Marine-AI Advisory System
          </h2>
          <p className="text-base md:text-lg text-[var(--color-muted-custom)] max-w-3xl">
            A retrofittable IoT sensor gateway and AI bridge display. Three parallel AI modules converge on a single captain display showing live waypoint routes, optimal throttle settings, and predictive maintenance alerts.
          </p>
        </div>

        {/* 3 AI Engines Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] w-fit rounded-xl mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">1. Speed & Throttle Optimizer</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              XGBoost hydrodynamic model maps hull resistance against real-time sea conditions to advise captains on the exact throttle setting for maximum range.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-blue)]/10 text-[var(--color-blue)] w-fit rounded-xl mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">2. Geodesic Route Planner</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              Combines geodesy navigation with gradient-boosted sea-state, wind, wave, and current forecasting to compute optimal waypoint tracks.
            </p>
          </div>

          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border-custom)] shadow-sm">
            <div className="p-3 bg-[var(--color-teal)]/10 text-[var(--color-teal)] w-fit rounded-xl mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">3. PCA Anomaly Maintenance</h3>
            <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
              PCA linear autoencoder and robust z-score anomaly detector flags motor bearing wear, vibration spikes, and thermal degradation before failures occur.
            </p>
          </div>
        </div>

        {/* Live Marine-AI Telemetry Console */}
        <MarineAiConsole />
      </section>

      {/* ─────────────────────────── REDESIGNED DYNAMIC SYSTEM ARCHITECTURE ─────────────────────────── */}
      <section id="architecture" className="py-24 px-6 max-w-7xl mx-auto fade-in-section opacity-0 translate-y-8 transition-all duration-1000">
        <div className="text-center mb-16">
          <Badge className="bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] border border-[var(--color-accent-custom)]/30 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
            Interactive Workflow Architecture
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight mb-4">
            How The 3 Products Work Together
          </h2>
          <p className="text-base md:text-lg text-[var(--color-muted-custom)] max-w-2xl mx-auto">
            Explore the synchronized data and capital pipeline connecting vessel hardware, bridge AI, and ESG green finance.
          </p>
        </div>

        {/* Interactive Step Switcher Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 max-w-4xl mx-auto">
          {[
            { step: 1, title: "1. E-Ferry Retrofit", subtitle: "Hardware Installation", color: "var(--color-accent-custom)" },
            { step: 2, title: "2. Marine-AI Bridge", subtitle: "Telemetry & Advisory", color: "var(--color-teal)" },
            { step: 3, title: "3. Solmate Fintech", subtitle: "PAYS & Carbon Yield", color: "var(--color-blue)" }
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step as any)}
              className={cn(
                "w-full sm:w-1/3 p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex items-center justify-between",
                activeStep === item.step
                  ? "bg-[var(--color-surface)] border-[var(--color-accent-custom)] shadow-lg"
                  : "bg-[var(--color-surface-2)]/60 border-[var(--color-border-custom)] hover:bg-[var(--color-surface)]"
              )}
            >
              <div>
                <span className="font-extrabold text-sm text-[var(--color-text)] block">{item.title}</span>
                <span className="text-xs text-[var(--color-muted-custom)]">{item.subtitle}</span>
              </div>
              <div
                className={cn(
                  "w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all",
                  activeStep === item.step
                    ? "bg-[var(--color-accent-custom)] text-white shadow-md"
                    : "bg-[var(--color-surface-2)] text-[var(--color-muted-custom)] border border-[var(--color-border-custom)]"
                )}
              >
                {item.step}
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Pipeline Diagram Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {activeStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-500">
              <div className="space-y-4">
                <Badge className="bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] font-mono text-xs uppercase px-3 py-1">
                  Step 1 • Vessel Electrification Hardware
                </Badge>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)]">
                  Modular Battery & Electric Motor Retrofit
                </h3>
                <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
                  Traditional passenger bangkas and ferries receive modular IP68 liquid-cooled LFP battery packs and brushless electric outboard or inboard drives. Zero hull rebuilding required.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-custom)]" />
                    Installs in under 7 days per vessel
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-custom)]" />
                    Integrated Marine IoT sensor gateway pre-wired
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-custom)]" />
                    Dual CCS2 fast charging port connection
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-surface-2)] p-6 rounded-2xl border border-[var(--color-border-custom)] space-y-4">
                <span className="text-xs font-mono uppercase text-[var(--color-muted-custom)] block">Hardware Telemetry Stream</span>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>Battery Cell Voltage Delta:</span>
                  <span className="text-[var(--color-teal)] font-bold">12 mV (Normal)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>Motor Temp / Inverter Current:</span>
                  <span className="text-[var(--color-teal)] font-bold">38°C / 140A</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>GPS / IMU Telemetry Frame:</span>
                  <span className="text-[var(--color-accent-custom)] font-bold">2.5 Hz Encrypted Log</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-500">
              <div className="space-y-4">
                <Badge className="bg-[var(--color-teal)]/10 text-[var(--color-teal)] font-mono text-xs uppercase px-3 py-1">
                  Step 2 • Bridge Intelligence & Captain Advisory
                </Badge>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)]">
                  3 Parallel AI Engines In Command
                </h3>
                <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
                  The Marine-AI IoT gateway processes speed hydrodynamics, sea-state weather forecasting, and PCA autoencoder anomaly detection to give captains optimal speed and route advisories.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-teal)]" />
                    Deterministic rule-based safety cutoffs enforce captain authority
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-teal)]" />
                    XGBoost speed engine saves 18.4% battery power per trip
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-teal)]" />
                    Claude API natural-language captain advisory phrasing
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-surface-2)] p-6 rounded-2xl border border-[var(--color-border-custom)] space-y-4">
                <span className="text-xs font-mono uppercase text-[var(--color-muted-custom)] block">Bridge AI Output Frame</span>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>Recommended Throttle:</span>
                  <span className="text-[var(--color-accent-custom)] font-bold">72% (Optimal Range)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>Sea State Climatology:</span>
                  <span className="text-[var(--color-teal)] font-bold">Wave 0.8m / Wind 14 Kts</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>Anomaly Status:</span>
                  <span className="text-[var(--color-teal)] font-bold">PASS (Score 0.04)</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-500">
              <div className="space-y-4">
                <Badge className="bg-[var(--color-blue)]/10 text-[var(--color-blue)] font-mono text-xs uppercase px-3 py-1">
                  Step 3 • Capital Structuring & ESG Monetization
                </Badge>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)]">
                  Pay-As-You-Save & Bankable Carbon Credits
                </h3>
                <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
                  Cryptographically signed telemetry logs feed bank and ESG fund portals. Fuel savings automatically service concessionary debt, while zero-emission miles yield audited carbon offset credits.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-blue)]" />
                    $0 upfront capital required for fleet operators
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-blue)]" />
                    AAA bankable credit rating backed by IoT telemetry
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text)] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-blue)]" />
                    Net positive monthly cashflow from Day 1
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-surface-2)] p-6 rounded-2xl border border-[var(--color-border-custom)] space-y-4">
                <span className="text-xs font-mono uppercase text-[var(--color-muted-custom)] block">Fintech Settlement Summary</span>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>Monthly Fuel Cost Savings:</span>
                  <span className="text-[var(--color-teal)] font-bold font-mono">+$19,000 / mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>PAYS Loan Debt Repayment:</span>
                  <span className="text-[var(--color-warning)] font-bold font-mono">-$10,180 / mo</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-custom)] font-mono text-xs">
                  <span>Verified Carbon Offset Yield:</span>
                  <span className="text-[var(--color-teal)] font-bold font-mono">+$3,600 / mo</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────── INTERACTIVE CONTACT / DEMO REQUEST ─────────────────────────── */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto fade-in-section opacity-0 translate-y-8 transition-all duration-1000">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden backdrop-blur-2xl">
          <div className="text-center mb-8">
            <Badge className="bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] border border-[var(--color-accent-custom)]/30 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
              Request Platform Access
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] tracking-tight mb-3">
              Schedule A Vessel Feasibility Audit
            </h2>
            <p className="text-sm md:text-base text-[var(--color-muted-custom)] max-w-xl mx-auto">
              Whether you operate a ferry fleet, manage a municipality port, or deploy ESG capital, connect with our marine technology team.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-custom)] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Capt. Juan Dela Cruz"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-custom)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-custom)] mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="juan@maritime-coop.ph"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-custom)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-custom)] mb-2">
                  Organization / Fleet
                </label>
                <input
                  type="text"
                  required
                  placeholder="Batangas Ferry Transport Coop"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-custom)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-custom)] mb-2">
                  Interest Category
                </label>
                <select
                  value={contactRole}
                  onChange={(e) => setContactRole(e.target.value)}
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-custom)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:outline-none transition-colors"
                >
                  <option value="operator">Product 1: Vessel Retrofit Audit</option>
                  <option value="institution">Product 2: ESG Green Financing & Bonds</option>
                  <option value="marineai">Product 3: Marine-AI Gateway Demo</option>
                  <option value="full">Full Ecosystem Integration</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-custom)] mb-2">
                Project Details & Vessel Specs
              </label>
              <textarea
                rows={3}
                placeholder="Details on vessel count, current daily fuel consumption, and route length..."
                className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-custom)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:border-[var(--color-accent-custom)] focus:outline-none transition-colors"
              />
            </div>

            {contactSubmitted && (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-600 text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Thank you! Your feasibility audit request has been sent. Our marine engineering team will respond within 24 hours.
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white font-extrabold text-base py-4 rounded-xl transition-all shadow-md border-none flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Request
            </Button>
          </form>
        </div>
      </section>

      {/* ─────────────────────────── REDESIGNED CORPORATE FOOTER ─────────────────────────── */}
      <footer className="border-t border-[var(--color-border-custom)] bg-[var(--color-surface)] pt-16 pb-12 px-6 text-sm text-[var(--color-muted-custom)]">
        <div className="max-w-7xl mx-auto">
          {/* Top Footer 4 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[var(--color-border-custom)]">
            {/* Col 1: Corporate Brand & Overview */}
            <div className="space-y-4">
              <img src="/solmate.png" alt="Solmate Logo" className="h-10 w-auto object-contain" />
              <p className="text-xs leading-relaxed text-[var(--color-muted-custom)]">
                Pioneering zero-emission maritime technologies for inter-island transportation, vessel retrofitting, and institutional ESG finance.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20 w-fit">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  Ready, Spark, Charge 2026 1st Runner-Up (P1 & P2)
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/20 w-fit">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  National AI Hackathon (Product 3)
                </div>
              </div>
            </div>

            {/* Col 2: Product Portfolio */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--color-text)] font-mono">
                Product Portfolio
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#retrofit" className="hover:text-[var(--color-accent-custom)] transition-colors">
                    Product 1: E-Ferry Retrofit Service
                  </a>
                </li>
                <li>
                  <a href="#fintech" className="hover:text-[var(--color-accent-custom)] transition-colors">
                    Product 2: Green Fintech & PAYS Financing
                  </a>
                </li>
                <li>
                  <a href="#marine-ai" className="hover:text-[var(--color-accent-custom)] transition-colors">
                    Product 3: Marine-AI Advisory System
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[var(--color-accent-custom)] transition-colors">
                    Vessel Feasibility Audit
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Technology & AI Architecture */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--color-text)] font-mono">
                Technology & Architecture
              </h4>
              <ul className="space-y-2 text-xs">
                <li>XGBoost Speed Hydrodynamics Engine</li>
                <li>Geodesic Climatology Route Planner</li>
                <li>PCA Autoencoder Anomaly Detection</li>
                <li>Captain Safety Guardrails</li>
              </ul>
            </div>

            {/* Col 4: Open Source & Contact */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--color-text)] font-mono">
                Open Source & Resources
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="https://github.com/JustineSalinas/MARINE-AI---National-AI-Hackathon---AI-Fest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent-custom)] font-semibold hover:underline flex items-center gap-1"
                  >
                    GitHub Hackathon Repo <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>MIT Open Source License</li>
                <li>Clean Energy & Blue Economy Track</li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-[var(--color-muted-custom)]">
              © {new Date().getFullYear()} Solmate Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-[var(--color-muted-custom)]">
              <span className="hover:text-[var(--color-text)] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[var(--color-text)] cursor-pointer">Terms of Service</span>
              <span className="hover:text-[var(--color-text)] cursor-pointer">ESG Compliance Statement</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
