"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const IMAGES = [
  "/PIC1.png",
  "/PIC2.png",
  "/PIC3.png"
];

export function HeroSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 aspect-video rounded-2xl overflow-hidden shadow-xl border border-[var(--color-border-custom)] bg-[var(--color-surface-2)]">
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 10 : 0
          }}
        >
          <img
            src={src}
            alt={`MarineSync platform ${index + 1}`}
            className="w-full h-full object-contain object-center p-2"
          />
        </div>
      ))}
      
      {/* Navigation indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? "bg-white scale-125 shadow-[0_0_8px_rgba(0,0,0,0.5)]" 
                : "bg-white/50 hover:bg-white/80 shadow-[0_0_4px_rgba(0,0,0,0.3)]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
