"use client";

import React, { useState, useEffect } from "react";
import { Compass, Navigation, Cpu, Activity, AlertTriangle, ShieldCheck, Play, Pause, RefreshCw, Gauge, Zap, Wind, Radio, Award, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MarineAiConsole() {
  const [povMode, setPovMode] = useState<"north" | "course" | "follow" | "helm">("helm");
  const [isPlaying, setIsPlaying] = useState(true);
  const [anomalyInjected, setAnomalyInjected] = useState(false);
  const [voyageProgress, setVoyageProgress] = useState(38); // 0 to 100 %

  // Simulated telemetry state
  const [telemetry, setTelemetry] = useState({
    speedKts: 12.4,
    recSpeedKts: 11.2,
    recommendedThrottle: 72,
    currentThrottle: 85,
    energySavedPercent: 18.4,
    batterySoc: 78,
    coolantTempC: 42,
    vibrationMmS: 1.2,
    windKnots: 14,
    waveHeightM: 0.8,
    anomalyScore: 0.04,
    status: "OPTIMAL",
    advisoryText: "Recommend reducing throttle to 72%. Headwind active at Waypoint 3. Reduces hydro-drag while maintaining ETA within +2 mins."
  });

  // Calculate precise vessel position (x, y) along the exact SVG Bezier curve path
  // SVG viewBox is 0 0 600 200
  const calculatePathPosition = (progress: number) => {
    const t = Math.max(0, Math.min(100, progress)) / 100;
    let x = 40;
    let y = 150;

    if (t <= 0.5) {
      // First Cubic Bezier Segment: P0(40,150), P1(140,40), P2(260,40), P3(380,150)
      const u = t / 0.5;
      const u1 = 1 - u;
      x = u1 * u1 * u1 * 40 + 3 * u1 * u1 * u * 140 + 3 * u1 * u * u * 260 + u * u * u * 380;
      y = u1 * u1 * u1 * 150 + 3 * u1 * u1 * u * 40 + 3 * u1 * u * u * 40 + u * u * u * 150;
    } else {
      // Second Cubic Bezier Segment: P0(380,150), P1(440,200), P2(500,100), P3(560,60)
      const u = (t - 0.5) / 0.5;
      const u1 = 1 - u;
      x = u1 * u1 * u1 * 380 + 3 * u1 * u1 * u * 440 + 3 * u1 * u * u * 500 + u * u * u * 560;
      y = u1 * u1 * u1 * 150 + 3 * u1 * u1 * u * 200 + 3 * u1 * u * u * 100 + u * u * u * 60;
    }

    return {
      leftPercent: (x / 600) * 100,
      topPercent: (y / 200) * 100
    };
  };

  const vesselPos = calculatePathPosition(voyageProgress);

  // Simulated live voyage tick
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVoyageProgress((prev) => (prev >= 100 ? 0 : prev + 1));

      // Live telemetry jitter
      setTelemetry((prev) => {
        const noise = (Math.random() - 0.5) * 0.2;
        const currentVib = anomalyInjected ? 4.8 + Math.random() * 0.5 : 1.2 + Math.abs(noise);
        const currentTemp = anomalyInjected ? 74 + Math.random() * 2 : 42 + Math.abs(noise * 3);
        const anomalyVal = anomalyInjected ? 0.88 : 0.04 + Math.abs(noise * 0.02);

        return {
          ...prev,
          speedKts: Number((12.0 + noise).toFixed(1)),
          coolantTempC: Number(currentTemp.toFixed(1)),
          vibrationMmS: Number(currentVib.toFixed(1)),
          anomalyScore: Number(anomalyVal.toFixed(2)),
          status: anomalyInjected ? "ANOMALY_WARNING" : "OPTIMAL",
          advisoryText: anomalyInjected
            ? "WARNING: Bearing vibration z-score +3.2σ above baseline. PCA Anomaly Detector flags motor shaft alignment drift. Cap speed at 10 kts."
            : "Recommend throttle setting 72%. Sea-state climatology clear. XGBoost engine wear model confirms 99.4% propulsion health."
        };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying, anomalyInjected]);

  return (
    <div className="w-full bg-[#080E1E] border border-[var(--color-accent-custom)]/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,245,212,0.1)] relative overflow-hidden font-sans">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#00F5D4_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-[var(--color-border-custom)] pb-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-amber-500/15 text-amber-400 border border-amber-400/30 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                National AI Hackathon 2026
              </Badge>
              <Badge className="bg-[var(--color-accent-custom)]/15 text-[var(--color-accent-custom)] border border-[var(--color-accent-custom)]/30 rounded-full px-2.5 py-0.5 text-xs font-mono">
                Product 3 • Marine-AI
              </Badge>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Radio className="w-6 h-6 text-[var(--color-accent-custom)] animate-pulse" />
              Marine-AI Bridge & Telemetry Console
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              3 Parallel AI Engines: Hydrodynamics Speed Optimizer • Climatology Route Planner • PCA Anomaly Maintenance Detector
            </p>
          </div>

          {/* Controls & View Modes */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              {(["north", "course", "follow", "helm"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPovMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    povMode === mode
                      ? "bg-[var(--color-accent-custom)] text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="outline"
              className="bg-slate-900 border-slate-700 text-xs font-mono text-white h-9 px-3"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 mr-1 text-amber-400" /> : <Play className="w-3.5 h-3.5 mr-1 text-emerald-400" />}
              {isPlaying ? "Pause Sim" : "Run Sim"}
            </Button>

            <Button
              onClick={() => setAnomalyInjected(!anomalyInjected)}
              className={`text-xs font-mono h-9 px-3 border-none transition-all ${
                anomalyInjected
                  ? "bg-rose-500 hover:bg-rose-600 text-white font-bold"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              {anomalyInjected ? "Anomaly Injected!" : "Test Anomaly Fault"}
            </Button>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left / Center Map & Throttle Gauge Display (8 cols) */}
          <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
            {/* Top Bar inside bridge */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 border-b border-slate-800/80 pb-3">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[var(--color-accent-custom)] animate-spin-slow" />
                WAYPOINT ROUTE: MANILA BAY → PUERTO GALERA (LEG 2/4)
              </span>
              <span className="text-[var(--color-accent-custom)]">POV: {povMode.toUpperCase()} VIEW</span>
            </div>

            {/* Radar / Waypoint Track Visualiser */}
            <div className="relative my-4 h-52 w-full bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              {/* Radar Rings */}
              <div className="absolute w-44 h-44 rounded-full border border-slate-800/50" />
              <div className="absolute w-28 h-28 rounded-full border border-slate-800/50" />

              {/* Precise Waypoint Route Line SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <path
                  d="M 40 150 C 140 40, 260 40, 380 150 C 440 200, 500 100, 560 60"
                  fill="none"
                  stroke="#00F5D4"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  opacity="0.6"
                />
              </svg>

              {/* Exact Waypoint Nodes */}
              <div className="absolute left-[6.6%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-2 border-[var(--color-accent-custom)] flex items-center justify-center z-10">
                <span className="w-1.5 h-1.5 bg-[var(--color-accent-custom)] rounded-full" />
              </div>
              <div className="absolute left-[63.3%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-2 border-[var(--color-accent-custom)] flex items-center justify-center z-10">
                <span className="w-1.5 h-1.5 bg-[var(--color-accent-custom)] rounded-full" />
              </div>
              <div className="absolute left-[93.3%] top-[30%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 rounded-full border-2 border-[var(--color-accent-custom)] flex items-center justify-center z-10">
                <span className="w-1.5 h-1.5 bg-[var(--color-accent-custom)] rounded-full" />
              </div>

              {/* Vessel Marker mathematically locked onto curve path */}
              <div
                className="absolute transition-all duration-700 ease-linear flex flex-col items-center z-20 pointer-events-none"
                style={{
                  left: `${vesselPos.leftPercent}%`,
                  top: `${vesselPos.topPercent}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 bg-[var(--color-accent-custom)] rounded-full animate-ping opacity-60 absolute" />
                  <div className="w-6 h-6 bg-[var(--color-accent-custom)] text-slate-950 rounded-full flex items-center justify-center font-extrabold text-[0.65rem] shadow-[0_0_15px_#00F5D4]">
                    ▲
                  </div>
                </div>
                <span className="bg-slate-950/90 text-[0.65rem] font-mono text-[var(--color-accent-custom)] px-2 py-0.5 rounded border border-[var(--color-accent-custom)]/40 mt-1 whitespace-nowrap shadow-md">
                  {telemetry.speedKts} Kts • SOC {telemetry.batterySoc}%
                </span>
              </div>
            </div>

            {/* Bottom Bridge Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[0.65rem] font-mono text-slate-400 uppercase block">Optimal Throttle</span>
                <span className="text-lg font-bold font-mono text-[var(--color-accent-custom)]">
                  {telemetry.recommendedThrottle}% <span className="text-xs text-slate-400 font-sans">({telemetry.currentThrottle}% manual)</span>
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[0.65rem] font-mono text-slate-400 uppercase block">Energy Savings</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  +{telemetry.energySavedPercent}% <span className="text-xs text-slate-400 font-sans">Hydro Efficiency</span>
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[0.65rem] font-mono text-slate-400 uppercase block">Bearing Vibration</span>
                <span className={`text-lg font-bold font-mono ${telemetry.vibrationMmS > 3 ? "text-rose-400" : "text-slate-200"}`}>
                  {telemetry.vibrationMmS} <span className="text-xs text-slate-400 font-sans">mm/s</span>
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[0.65rem] font-mono text-slate-400 uppercase block">Coolant Temp</span>
                <span className={`text-lg font-bold font-mono ${telemetry.coolantTempC > 65 ? "text-rose-400" : "text-slate-200"}`}>
                  {telemetry.coolantTempC}°C
                </span>
              </div>
            </div>
          </div>

          {/* Right AI Status & Engine Telemetry (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Anomaly / System Status Box */}
            <div className={`p-4 rounded-xl border transition-all ${
              telemetry.status === "ANOMALY_WARNING"
                ? "bg-rose-950/40 border-rose-500/60 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                : "bg-slate-900/80 border-slate-800 text-slate-200"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[var(--color-accent-custom)]" />
                  PCA Anomaly Detector
                </span>
                <Badge className={telemetry.status === "ANOMALY_WARNING" ? "bg-rose-500 text-white font-bold" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"}>
                  {telemetry.status}
                </Badge>
              </div>

              <div className="flex items-baseline justify-between font-mono my-2">
                <span className="text-xs text-slate-400">Anomaly Index:</span>
                <span className={`text-xl font-bold ${telemetry.anomalyScore > 0.5 ? "text-rose-400" : "text-emerald-400"}`}>
                  {telemetry.anomalyScore} / 1.00
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${telemetry.anomalyScore > 0.5 ? "bg-rose-500" : "bg-emerald-400"}`}
                  style={{ width: `${Math.min(telemetry.anomalyScore * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* AI Advisory Log (Claude Integration) */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-[var(--color-accent-custom)] font-bold">
                  <Terminal className="w-4 h-4" />
                  CAPTAIN ADVISORY LOG
                </span>
                <span className="text-[0.65rem] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                  Claude-phrased
                </span>
              </div>

              <p className="text-xs font-mono leading-relaxed text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 min-h-[90px]">
                {telemetry.advisoryText}
              </p>

              <div className="mt-3 flex items-center justify-between text-[0.7rem] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Safety Cutoffs Active
                </span>
                <span>Captain In Full Command</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--color-accent-custom)] shrink-0" />
            <span>
              <strong>Open Source Architecture:</strong> Installs directly onto existing vessel sensors. Zero engine replacement needed.
            </span>
          </div>
          <a
            href="https://github.com/JustineSalinas/MARINE-AI---National-AI-Hackathon---AI-Fest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-custom)] hover:underline font-mono font-bold flex items-center gap-1 shrink-0"
          >
            View GitHub Hackathon Repository →
          </a>
        </div>
      </div>
    </div>
  );
}
