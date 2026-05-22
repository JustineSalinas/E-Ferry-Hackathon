'use client';

import React, { useState } from 'react';
import { Sun, Cpu, Sliders, BatteryCharging, Fan, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Hotspot definitions - Coordinates map to a 16:9 container aspect ratio
const HOTSPOTS = [
  {
    id: 'solar',
    title: 'Wind/Solar Array',
    description: 'Rooftop photovoltaic arrays and micro-turbines that harness renewable environmental energy.',
    stat: 'Captures up to 4.2kW in optimal conditions',
    icon: Sun,
    x: 40,
    y: 26, // Roof (sit on top of solar panels)
    labelPos: 'right', // To avoid overlap
  },
  {
    id: 'controller',
    title: 'Hybrid Controller',
    description: 'Smart power inverter that regulates voltage and manages the blend of renewable and grid power.',
    stat: '98.5% peak conversion efficiency',
    icon: Cpu,
    x: 22,
    y: 48, // Cabin wall, moved slightly right
    labelPos: 'bottom',
  },
  {
    id: 'controls',
    title: 'System Controls',
    description: 'Bridge-mounted interface for the captain to monitor power delivery and vessel telemetry.',
    stat: 'Real-time <10ms latency updates',
    icon: Sliders,
    x: 65,
    y: 42, // Bridge (white structure to the right)
    labelPos: 'top',
  },
  {
    id: 'battery',
    title: 'Battery Bank',
    description: 'Modular marine-grade lithium-iron-phosphate (LiFePO4) storage housed in the lower hull.',
    stat: 'Stores 120kWh of usable energy',
    icon: BatteryCharging,
    x: 40,
    y: 68, // Middle of the blue hull, moved slightly left
    labelPos: 'bottom',
  },
  {
    id: 'motor',
    title: 'Electric Motor',
    description: 'Direct-drive brushless DC motor replacing the traditional diesel inboard engine.',
    stat: 'Outputs 85kW continuous power',
    icon: Fan,
    x: 8,
    y: 60, // Moved up into the blue area on the left
    labelPos: 'top',
  },
];

export function PropulsionDiagram() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Helper to get coordinates for lines
  const getCoords = (id: string) => {
    const hs = HOTSPOTS.find(h => h.id === id);
    return hs ? { x: hs.x * 16, y: hs.y * 9 } : { x: 0, y: 0 };
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border-custom)] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row">
      
      {/* ── Left Side: Interactive 3D/Photo Area ── */}
      <div className="w-full xl:w-2/3 bg-[#0a192f] flex items-center justify-center relative">
        
        {/* We use a fixed aspect-ratio container to ensure the image, hotspots, and lines perfectly align regardless of screen size */}
        <div className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden">
          
          {/* Main Vessel Image - Lighter overlay so the photo breathes */}
          <img 
            src="/boat.png" 
            alt="E.P.E. E-Bangka Vessel (ILO-06-0001562)" 
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 bg-[#0a192f]"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1544329241-11d950d29199?q=80&w=1200&auto=format&fit=crop";
            }}
          />

          {/* Subdued gradient for SVG contrast, but much lighter than before */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/60 via-transparent to-transparent pointer-events-none" />

          {/* Energy Flow Lines (SVG Overlay) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-lg z-10" viewBox="0 0 1600 900">
            <defs>
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes dashFlow {
                  from { stroke-dashoffset: 40; }
                  to { stroke-dashoffset: 0; }
                }
                .energy-line {
                  animation: dashFlow 1.2s linear infinite;
                }
              `}} />
            </defs>

            {/* Logical Flow: Solar -> Controller -> Battery -> Motor */}
            <line x1={getCoords('solar').x} y1={getCoords('solar').y} x2={getCoords('controller').x} y2={getCoords('controller').y} stroke="#14b8a6" strokeWidth="3" strokeDasharray="8,6" className="energy-line" strokeOpacity="0.9" />
            <line x1={getCoords('controller').x} y1={getCoords('controller').y} x2={getCoords('battery').x} y2={getCoords('battery').y} stroke="#14b8a6" strokeWidth="4" strokeDasharray="10,8" className="energy-line" strokeOpacity="0.9" />
            <path d={`M ${getCoords('battery').x} ${getCoords('battery').y} Q ${(getCoords('battery').x + getCoords('motor').x) / 2} ${Math.max(getCoords('battery').y, getCoords('motor').y) + 60} ${getCoords('motor').x} ${getCoords('motor').y}`} fill="none" stroke="#14b8a6" strokeWidth="5" strokeDasharray="12,10" className="energy-line" strokeOpacity="1" />
            <line x1={getCoords('controller').x} y1={getCoords('controller').y} x2={getCoords('controls').x} y2={getCoords('controls').y} stroke="#14b8a6" strokeWidth="2" strokeDasharray="6,4" className="energy-line" strokeOpacity="0.6" />
          </svg>

          {/* Hotspots */}
          {HOTSPOTS.map((hs) => {
            const Icon = hs.icon;
            const isActive = activeHotspot === hs.id;
            
            // Label Positioning logic
            let labelClasses = "";
            if (hs.labelPos === 'top') labelClasses = "bottom-full mb-2 left-1/2 -translate-x-1/2";
            else if (hs.labelPos === 'bottom') labelClasses = "top-full mt-2 left-1/2 -translate-x-1/2";
            else if (hs.labelPos === 'right') labelClasses = "left-full ml-2 top-1/2 -translate-y-1/2";
            else if (hs.labelPos === 'left') labelClasses = "right-full mr-2 top-1/2 -translate-y-1/2";

            return (
              <div 
                key={hs.id}
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                onMouseEnter={() => setActiveHotspot(hs.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(hs.id)}
              >
                {/* Pulsing ring background */}
                <div className={cn(
                  "absolute inset-0 rounded-full bg-teal-500/80 border-2 border-teal-400/50 scale-125 animate-ping opacity-100 pointer-events-none",
                  isActive && "bg-teal-400/60 border-teal-300 animate-none scale-125"
                )} style={{ animationDuration: '1.5s' }} />
                
                {/* Hotspot Button */}
                <div className={cn(
                  "relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all duration-300 backdrop-blur-md",
                  isActive 
                    ? "bg-teal-400 border-white text-[#0a192f] scale-110 shadow-[0_0_30px_rgba(20,184,166,0.8)]" 
                    : "bg-[#0a192f] border-teal-400 text-teal-300 group-hover:border-teal-300 group-hover:bg-[#112240]"
                )}>
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>

                {/* Default visible label (staggered to avoid overlap) */}
                <div className={cn(
                  "absolute px-2.5 py-1 bg-[#0a192f]/80 backdrop-blur-sm text-teal-50 border border-teal-500/30 text-[10px] md:text-xs font-bold rounded shadow-sm whitespace-nowrap transition-opacity duration-300 pointer-events-none",
                  labelClasses,
                  isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                )}>
                  {hs.title}
                </div>

                {/* Mobile Tooltip Overlay (visible only on small screens when clicked) */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 mt-6 w-64 bg-[#f0fafa] border-l-4 border-[var(--color-accent-custom)] rounded-r-xl rounded-bl-xl p-4 shadow-2xl transition-all duration-300 xl:hidden z-50",
                  isActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                )}>
                  <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">{hs.title}</h4>
                  <p className="text-xs text-[var(--color-muted-custom)] mb-3 leading-relaxed">{hs.description}</p>
                  <div className="flex items-start gap-1.5 text-[var(--color-accent-custom)] bg-white p-2 rounded-lg border border-[var(--color-border-custom)]">
                    <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="text-[10px] font-semibold">{hs.stat}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Side: Info Panel (Desktop) ── */}
      <div className="w-full xl:w-1/3 p-8 flex flex-col bg-[var(--color-surface)]">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-full text-[var(--color-success)] text-xs font-bold uppercase tracking-widest mb-4">
            {/* Pulsing Green Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
            </span>
            Live System Map
          </div>
          <h3 className="text-2xl font-display font-bold text-[var(--color-text)] mb-3">
            Interactive Topology
          </h3>
          <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed">
            Hover over the pulsing hotspots on the 3D vessel view to explore the real-world placement of our hardware nodes and trace the energy flows.
          </p>
        </div>

        {/* Selected Info Card Area */}
        <div className="flex-1 relative w-full h-[320px] xl:h-[350px] mt-4">
          
          {/* Active State Container */}
          <div className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-300 z-10",
            activeHotspot ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}>
            {(() => {
                const hs = HOTSPOTS.find(h => h.id === activeHotspot);
                if (!hs) return null;
                const Icon = hs.icon;
                return (
                  <div className="bg-[#f0fafa] border border-[var(--color-border-custom)] border-l-4 border-l-[var(--color-accent-custom)] rounded-r-2xl rounded-bl-2xl p-6 shadow-xl w-full h-full flex flex-col justify-center relative group hover:shadow-2xl transition-shadow">
                    
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-[var(--color-border-custom)] text-[var(--color-accent-custom)] shadow-sm shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-[var(--color-text)] font-display leading-tight">{hs.title}</h4>
                    </div>
                    
                    <p className="text-sm text-[var(--color-muted-custom)] leading-relaxed mb-6 relative z-10 overflow-y-auto pr-2">
                      {hs.description}
                    </p>
                    
                    <div className="bg-white rounded-xl p-4 border border-[var(--color-border-custom)] flex items-center gap-3 relative z-10 shadow-sm mt-auto">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-accent-custom)]/10 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-[var(--color-accent-custom)]" />
                      </div>
                      <span className="text-xs font-bold tracking-wide text-[var(--color-accent-custom)]">
                        {hs.stat}
                      </span>
                    </div>
                  </div>
                );
            })()}
          </div>

          {/* Empty State Container */}
          <div className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-300 z-0 border-2 border-dashed border-[var(--color-border-custom)] rounded-2xl flex flex-col items-center justify-center text-center p-6 text-[var(--color-muted-custom)]/50 bg-[var(--color-surface-2)]/50",
            activeHotspot ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          )}>
            <Sun className="w-8 h-8 mb-3 opacity-20" />
            <p className="text-sm font-medium">Select a hotspot on the vessel to view details.</p>
          </div>

        </div>
      </div>
      
    </div>
  );
}
