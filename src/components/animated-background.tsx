"use client";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background color */}
      <div className="absolute inset-0 bg-[var(--color-bg)] transition-colors duration-300" />

      {/* Decorative Route Map with Animated Ferries */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Route paths */}
          <path id="heroRoute1" d="M-100,300 Q360,100 720,300 T1540,100" stroke="var(--color-accent-custom)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <path id="heroRoute2" d="M-100,500 Q360,600 720,400 T1540,500" stroke="var(--color-teal)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />

          {/* Ferry 1 — sailing along route 1 */}
          <g>
            <animateMotion dur="60s" repeatCount="indefinite" path="M-100,300 Q360,100 720,300 T1540,100" />
            <g transform="scale(0.8) translate(-16,-12)">
              <path d="M 2,18 L 28,18 L 32,12 L 0,12 Z" fill="var(--color-accent-custom)" />
              <rect x="4" y="6" width="22" height="6" fill="var(--color-accent-custom)" opacity="0.9" />
              <rect x="8" y="2" width="10" height="4" fill="var(--color-accent-custom)" opacity="0.8" />
              <rect x="6" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="10" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="14" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="18" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="22" y="8" width="2" height="2" fill="var(--color-bg)" />
            </g>
          </g>

          {/* Ferry 2 — sailing along route 2 */}
          <g>
            <animateMotion dur="85s" repeatCount="indefinite" path="M-100,500 Q360,600 720,400 T1540,500" />
            <g transform="scale(0.5) translate(-16,-12)">
              <path d="M 2,18 L 28,18 L 32,12 L 0,12 Z" fill="var(--color-teal)" />
              <rect x="4" y="6" width="22" height="6" fill="var(--color-teal)" opacity="0.9" />
              <rect x="8" y="2" width="10" height="4" fill="var(--color-teal)" opacity="0.8" />
              <rect x="6" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="10" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="14" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="18" y="8" width="2" height="2" fill="var(--color-bg)" />
              <rect x="22" y="8" width="2" height="2" fill="var(--color-bg)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
