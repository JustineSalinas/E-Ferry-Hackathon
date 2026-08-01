"use client";

import React, { useState } from "react";
import { Landmark, TrendingUp, ShieldCheck, Coins, Award, ArrowUpRight, BarChart3, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FintechCalculator() {
  const [fleetSize, setFleetSize] = useState(6);
  const [loanTermYears, setLoanTermYears] = useState(5);
  const [carbonPricePerTon, setCarbonPricePerTon] = useState(40); // $40 / ton CO2 credit
  const [financingType, setFinancingType] = useState<"paysave" | "greenbond" | "lease">("paysave");

  // Calculations per vessel average:
  // 1 vessel saves ~$38,000/yr diesel and reduces ~180 tCO2/yr
  const totalFleetCost = fleetSize * 85000; // $85k average conversion per vessel
  const annualDieselSavedFleet = fleetSize * 38000;
  const annualCo2TonsFleet = fleetSize * 180;
  const annualCarbonCreditRev = annualCo2TonsFleet * carbonPricePerTon;

  // Monthly loan repayment calculation (approx 7.5% ESG concessionary interest)
  const monthlyInterestRate = 0.075 / 12;
  const totalPaymentsMonths = loanTermYears * 12;
  const monthlyRepayment = Math.round(
    (totalFleetCost * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPaymentsMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalPaymentsMonths) - 1)
  );

  const monthlyFuelSaved = Math.round(annualDieselSavedFleet / 12);
  const monthlyCarbonRevenue = Math.round(annualCarbonCreditRev / 12);
  const netMonthlyCashflow = monthlyFuelSaved + monthlyCarbonRevenue - monthlyRepayment;

  return (
    <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-teal)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Badge className="bg-emerald-500/15 text-[var(--color-teal)] border border-[var(--color-teal)]/30 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-2">
              Product 2 • Maritime Fintech & ESG Capital
            </Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              Pay-As-You-Save & Carbon Credit Calculator
            </h3>
            <p className="text-sm text-[var(--color-muted-custom)] mt-1">
              Structure institutional green financing packages backed by tamper-proof IoT telemetry & carbon monetization.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[var(--color-surface-2)] px-3 py-1.5 rounded-xl border border-[var(--color-border-custom)]">
            <ShieldCheck className="w-4 h-4 text-[var(--color-teal)]" />
            <span className="text-xs font-semibold text-[var(--color-text)]">AAA Bankable Telemetry Rating</span>
          </div>
        </div>

        {/* Financing Model Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { id: "paysave", label: "Pay-As-You-Save (PAYS)", desc: "Zero upfront capital, paid out of monthly diesel savings" },
            { id: "greenbond", label: "Tokenized Green Bonds", desc: "Fractionalized bond issuance for municipal & coop fleets" },
            { id: "lease", label: "Vessel Battery Leasing", desc: "Separate battery asset ownership with performance guarantees" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setFinancingType(mode.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                financingType === mode.id
                  ? "bg-[var(--color-teal)]/15 border-[var(--color-teal)] text-[var(--color-text)] shadow-[0_0_15px_rgba(6,214,160,0.15)]"
                  : "bg-[var(--color-surface-2)]/60 border-[var(--color-border-custom)] text-[var(--color-muted-custom)] hover:bg-[var(--color-surface-2)]"
              }`}
            >
              <div className="font-bold text-sm text-[var(--color-text)] mb-1 flex items-center justify-between">
                <span>{mode.label}</span>
                {financingType === mode.id && <CheckCircle2 className="w-4 h-4 text-[var(--color-teal)]" />}
              </div>
              <p className="text-xs text-[var(--color-muted-custom)]">{mode.desc}</p>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 p-6 bg-[var(--color-surface-2)]/40 border border-[var(--color-border-custom)] rounded-xl">
          {/* Fleet Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-[var(--color-text)]">
              <span>Fleet Size</span>
              <span className="text-[var(--color-teal)] font-mono font-bold bg-[var(--color-surface)] px-2.5 py-0.5 rounded border border-[var(--color-border-custom)]">
                {fleetSize} Vessels
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={fleetSize}
              onChange={(e) => setFleetSize(Number(e.target.value))}
              className="w-full accent-[var(--color-teal)] bg-[var(--color-surface-2)] h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-[var(--color-text)]">
              <span>Financing Term</span>
              <span className="text-[var(--color-blue)] font-mono font-bold bg-[var(--color-surface)] px-2.5 py-0.5 rounded border border-[var(--color-border-custom)]">
                {loanTermYears} Years
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              className="w-full accent-[var(--color-blue)] bg-[var(--color-surface-2)] h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Carbon Credit Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-[var(--color-text)]">
              <span>Carbon Credit Market</span>
              <span className="text-[var(--color-accent-custom)] font-mono font-bold bg-[var(--color-surface)] px-2.5 py-0.5 rounded border border-[var(--color-border-custom)]">
                ${carbonPricePerTon} / tCO₂
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              step="5"
              value={carbonPricePerTon}
              onChange={(e) => setCarbonPricePerTon(Number(e.target.value))}
              className="w-full accent-[var(--color-accent-custom)] bg-[var(--color-surface-2)] h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border-custom)]">
            <div className="text-xs text-[var(--color-muted-custom)] font-semibold uppercase tracking-wider mb-1">
              Total Capital Package
            </div>
            <div className="text-2xl font-extrabold text-[var(--color-text)] font-mono">
              ${(totalFleetCost / 1000).toFixed(0)}k
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted-custom)] mt-1">100% ESG Asset Backed</p>
          </div>

          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border-custom)]">
            <div className="text-xs text-[var(--color-muted-custom)] font-semibold uppercase tracking-wider mb-1">
              Monthly Diesel Savings
            </div>
            <div className="text-2xl font-extrabold text-[var(--color-teal)] font-mono">
              +${monthlyFuelSaved.toLocaleString()}
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted-custom)] mt-1">Direct OpEx reduction</p>
          </div>

          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border-custom)]">
            <div className="text-xs text-[var(--color-muted-custom)] font-semibold uppercase tracking-wider mb-1">
              Monthly Debt Service
            </div>
            <div className="text-2xl font-extrabold text-[var(--color-warning)] font-mono">
              -${monthlyRepayment.toLocaleString()}
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted-custom)] mt-1">Fixed concessionary repayment</p>
          </div>

          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-teal)]/40 bg-[var(--color-teal)]/5">
            <div className="text-xs text-[var(--color-teal)] font-semibold uppercase tracking-wider mb-1">
              Net Day-1 Cashflow
            </div>
            <div className="text-2xl font-extrabold text-[var(--color-teal)] font-mono">
              +${netMonthlyCashflow.toLocaleString()} <span className="text-xs font-sans">/mo</span>
            </div>
            <p className="text-[0.75rem] text-[var(--color-teal)]/80 mt-1">
              Includes ${monthlyCarbonRevenue}/mo Carbon Credits
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-xl gap-4">
          <div className="flex items-center gap-3 text-xs text-[var(--color-muted-custom)]">
            <Coins className="w-5 h-5 text-[var(--color-teal)] shrink-0" />
            <span>
              Solmate converts IoT telemetry into verified carbon credits & bankable ESG loan syndication.
            </span>
          </div>
          <Button className="bg-[var(--color-teal)] hover:opacity-90 text-white font-bold text-xs px-5 py-2.5 rounded-lg whitespace-nowrap border-none transition-all">
            Download Capital Structuring Deck
          </Button>
        </div>
      </div>
    </div>
  );
}
