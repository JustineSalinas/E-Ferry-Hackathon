"use client";

import React, { useState } from "react";
import { Zap, Fuel, Leaf, DollarSign, Clock, Battery, Ship, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const VESSEL_TYPES = [
  {
    id: "bangka",
    name: "Outrigger / Bangka Ferry",
    baseCost: 35000,
    effPerKm: 1.8, // kWh per NM
    dieselPerNm: 1.4, // Liters per NM
    capacityDefault: 45,
    icon: Ship,
    desc: "Traditional wooden/composite double-outrigger passenger vessels"
  },
  {
    id: "catamaran",
    name: "Fiberglass Catamaran",
    baseCost: 65000,
    effPerKm: 2.5,
    dieselPerNm: 2.2,
    capacityDefault: 90,
    icon: Ship,
    desc: "Modern multi-hull fast ferries for inter-island routes"
  },
  {
    id: "steel",
    name: "Steel Monohull Ferry",
    baseCost: 110000,
    effPerKm: 4.2,
    dieselPerNm: 3.8,
    capacityDefault: 180,
    icon: Ship,
    desc: "Heavy-duty steel passenger & light vehicle ferries"
  }
];

export function RetrofitSimulator() {
  const [selectedVessel, setSelectedVessel] = useState(VESSEL_TYPES[0]);
  const [dailyNm, setDailyNm] = useState(45);
  const [passengers, setPassengers] = useState(50);
  const [dieselPrice, setDieselPrice] = useState(1.35); // $ per liter
  const [electricityPrice, setElectricityPrice] = useState(0.18); // $ per kWh

  // Calculations
  const totalDailyKwh = Math.round(dailyNm * selectedVessel.effPerKm * (1 + passengers / 200));
  const batteryKwhNeeded = Math.round(totalDailyKwh * 1.25); // 25% safety reserve
  const dailyDieselLiters = Math.round(dailyNm * selectedVessel.dieselPerNm * (1 + passengers / 200));

  const annualDieselCost = Math.round(dailyDieselLiters * 365 * dieselPrice);
  const annualElectricCost = Math.round(totalDailyKwh * 365 * electricityPrice);
  const annualSavings = annualDieselCost - annualElectricCost;

  const co2ReducedTons = Math.round((dailyDieselLiters * 2.68 * 365) / 1000); // 2.68 kg CO2 per liter diesel
  const estimatedRetrofitCost = Math.round(selectedVessel.baseCost + batteryKwhNeeded * 140);
  const paybackYears = (estimatedRetrofitCost / Math.max(annualSavings, 1)).toFixed(1);

  const motorKw = batteryKwhNeeded > 350 ? "Dual 180 kW Inboard" : batteryKwhNeeded > 180 ? "Dual 90 kW Drives" : "Single 120 kW Outboard";

  return (
    <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border-custom)] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Glow background accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-accent-custom)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-blue)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Badge className="bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] border border-[var(--color-accent-custom)]/30 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-2">
              Product 1 • Retrofit Configurator
            </Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              Modular E-Ferry Conversion Simulator
            </h3>
            <p className="text-sm text-[var(--color-muted-custom)] mt-1">
              Estimate battery capacity, retrofit investment, diesel savings, and carbon impact for existing vessels.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[var(--color-surface-2)] p-1.5 rounded-xl border border-[var(--color-border-custom)] self-start md:self-auto">
            <span className="text-xs font-medium text-[var(--color-muted-custom)] px-2">Zero Vessel Hull Rebuilding Required</span>
          </div>
        </div>

        {/* Vessel Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {VESSEL_TYPES.map((vessel) => {
            const Icon = vessel.icon;
            const isSelected = selectedVessel.id === vessel.id;
            return (
              <button
                key={vessel.id}
                onClick={() => {
                  setSelectedVessel(vessel);
                  setPassengers(vessel.capacityDefault);
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? "bg-[var(--color-accent-light)]/20 border-[var(--color-accent-custom)] shadow-[0_0_20px_rgba(0,245,212,0.15)]"
                    : "bg-[var(--color-surface-2)]/60 border-[var(--color-border-custom)] hover:border-[var(--color-accent-custom)]/40 hover:bg-[var(--color-surface-2)]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-[var(--color-accent-custom)] text-[var(--color-bg)]" : "bg-[var(--color-surface)] text-[var(--color-muted-custom)]"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <Badge className="bg-[var(--color-accent-custom)] text-[var(--color-bg)] font-bold text-[0.65rem] uppercase">
                      Selected
                    </Badge>
                  )}
                </div>
                <h4 className="font-bold text-[var(--color-text)] text-base mb-1">{vessel.name}</h4>
                <p className="text-xs text-[var(--color-muted-custom)] line-clamp-2">{vessel.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Sliders & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 p-6 bg-[var(--color-surface-2)]/40 border border-[var(--color-border-custom)] rounded-xl">
          {/* Daily Nautical Miles Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-[var(--color-text)]">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--color-accent-custom)]" />
                Daily Route Distance
              </span>
              <span className="text-[var(--color-accent-custom)] font-mono text-base font-bold bg-[var(--color-surface)] px-3 py-1 rounded-lg border border-[var(--color-border-custom)]">
                {dailyNm} Nautical Miles / day
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={dailyNm}
              onChange={(e) => setDailyNm(Number(e.target.value))}
              className="w-full accent-[var(--color-accent-custom)] bg-[var(--color-surface-2)] h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[var(--color-muted-custom)] font-mono">
              <span>10 NM (Short Ferry)</span>
              <span>75 NM (Island Hopper)</span>
              <span>150 NM (Regional Route)</span>
            </div>
          </div>

          {/* Passenger Capacity Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-[var(--color-text)]">
              <span className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-[var(--color-blue)]" />
                Passenger Payload Capacity
              </span>
              <span className="text-[var(--color-blue)] font-mono text-base font-bold bg-[var(--color-surface)] px-3 py-1 rounded-lg border border-[var(--color-border-custom)]">
                {passengers} Passengers
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="300"
              step="5"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full accent-[var(--color-blue)] bg-[var(--color-surface-2)] h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[var(--color-muted-custom)] font-mono">
              <span>15 Pax</span>
              <span>150 Pax</span>
              <span>300 Pax</span>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border-custom)] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-muted-custom)] font-semibold uppercase tracking-wider mb-2">
              <span>Req. Battery Pack</span>
              <Battery className="w-4 h-4 text-[var(--color-accent-custom)]" />
            </div>
            <div className="text-3xl font-extrabold text-[var(--color-accent-custom)] font-mono">
              {batteryKwhNeeded} <span className="text-sm font-sans text-[var(--color-muted-custom)]">kWh</span>
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted-custom)] mt-2">
              LFP Liquid-Cooled IP67 Pack (+25% safety reserve)
            </p>
          </div>

          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border-custom)] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-muted-custom)] font-semibold uppercase tracking-wider mb-2">
              <span>Annual OpEx Savings</span>
              <DollarSign className="w-4 h-4 text-[var(--color-teal)]" />
            </div>
            <div className="text-3xl font-extrabold text-[var(--color-teal)] font-mono">
              ${annualSavings.toLocaleString()}
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted-custom)] mt-2">
              ~{Math.round((annualSavings / Math.max(annualDieselCost, 1)) * 100)}% cheaper than diesel
            </p>
          </div>

          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border-custom)] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-muted-custom)] font-semibold uppercase tracking-wider mb-2">
              <span>Carbon Reduction</span>
              <Leaf className="w-4 h-4 text-[var(--color-success)]" />
            </div>
            <div className="text-3xl font-extrabold text-[var(--color-success)] font-mono">
              {co2ReducedTons} <span className="text-sm font-sans text-[var(--color-muted-custom)]">tCO₂/yr</span>
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted-custom)] mt-2">
              Direct localized emission elimination
            </p>
          </div>

          <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border-custom)] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-muted-custom)] font-semibold uppercase tracking-wider mb-2">
              <span>Est. Payback Time</span>
              <Zap className="w-4 h-4 text-[var(--color-warning)]" />
            </div>
            <div className="text-3xl font-extrabold text-[var(--color-warning)] font-mono">
              {paybackYears} <span className="text-sm font-sans text-[var(--color-muted-custom)]">Years</span>
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted-custom)] mt-2">
              Retrofit Investment: ${estimatedRetrofitCost.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Specifications Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[var(--color-surface)] border border-[var(--color-accent-custom)]/20 rounded-xl gap-4">
          <div className="flex items-center gap-3 text-xs text-[var(--color-muted-custom)]">
            <Cpu className="w-5 h-5 text-[var(--color-accent-custom)] shrink-0" />
            <span>
              <strong>Included Specs:</strong> {motorKw} Powertrain, Modular LFP Sub-Packs, Dual CCS2 Fast Charge Port, Integrated Marine-AI IoT Gateway.
            </span>
          </div>
          <Button className="bg-[var(--color-accent-custom)] hover:bg-[var(--color-accent-mid)] text-white font-bold text-xs px-5 py-2.5 rounded-lg whitespace-nowrap border-none transition-all">
            Get Technical Retrofit Spec Sheet
          </Button>
        </div>
      </div>
    </div>
  );
}
