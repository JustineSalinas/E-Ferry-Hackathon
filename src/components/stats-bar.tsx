"use client";

import { useEffect, useRef, useState } from "react";
import { Anchor, Zap, MapPin } from "lucide-react";

interface StatItemProps {
  endValue: number;
  suffix?: string;
  unit: string;
  icon: React.ReactNode;
  duration?: number;
}

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo)
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [end, duration, isIntersecting]);

  return { count, ref };
}

function StatItem({ endValue, suffix = "", unit, icon, duration = 2000 }: StatItemProps) {
  const { count, ref } = useCountUp(endValue, duration);

  // Format number with commas
  const formattedCount = new Intl.NumberFormat('en-US').format(count);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 w-full group">
      <div className="text-[var(--color-teal)] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl md:text-5xl font-display font-bold text-[var(--color-accent-custom)] group-hover:scale-105 transition-transform duration-300">
          {formattedCount}{suffix}
        </span>
      </div>
      <span className="text-[var(--color-muted-custom)] font-body text-xs font-semibold uppercase tracking-widest text-center">
        {unit}
      </span>
    </div>
  );
}

export function StatsBar() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-20 relative z-10">
      <div
        className="rounded-2xl p-8 md:px-12 md:py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 transition-colors duration-300"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-custom)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          borderRadius: "16px",
        }}
      >
        <StatItem
          icon={<Anchor className="w-6 h-6" />}
          endValue={50000}
          suffix="+"
          unit="Tons CO₂ Saved"
        />

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-[var(--color-border-custom)]" />
        <div className="block md:hidden w-16 h-px bg-[var(--color-border-custom)]" />

        <StatItem
          icon={<Zap className="w-6 h-6" />}
          endValue={35}
          suffix="%"
          unit="Fuel Reduction"
        />

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-[var(--color-border-custom)]" />
        <div className="block md:hidden w-16 h-px bg-[var(--color-border-custom)]" />

        <StatItem
          icon={<MapPin className="w-6 h-6" />}
          endValue={12}
          unit="Routes Optimized"
        />
      </div>
    </div>
  );
}
