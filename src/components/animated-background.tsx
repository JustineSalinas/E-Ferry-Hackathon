"use client";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background color */}
      <div className="absolute inset-0 bg-[var(--color-bg)] transition-colors duration-300" />

      {/* Faint topographic/contour SVG watermark with radial mask to clear the center */}
      <div 
        className="absolute inset-0 w-full h-full topo-watermark" 
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 70%)',
          maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 70%)'
        }}
      />
    </div>
  );
}
