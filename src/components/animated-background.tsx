"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 120;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isHub: boolean;

      constructor(isHub: boolean) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6; // Max 0.3px per frame
        this.vy = (Math.random() - 0.5) * 0.6; // Max 0.3px per frame
        this.isHub = isHub;
        this.radius = isHub ? 3.5 : 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isHub ? "rgba(45, 212, 191, 0.9)" : "rgba(45, 212, 191, 0.6)"; // Teal dots
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(i < 5)); // First 5 are hubs
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(45, 212, 191, 0.15)`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep radial gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, #0a1628 0%, #050d1a 100%)"
        }}
      />
      
      {/* Grain noise texture */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Static SVG Ocean Wave Topology */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,50 Q200,100 400,50 T800,50 T1200,50 T1600,50 T2000,50"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="1"
          className="animate-[pulse_10s_ease-in-out_infinite]"
        />
        <path
          d="M0,150 Q250,200 500,150 T1000,150 T1500,150 T2000,150"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="0.8"
          className="animate-[pulse_12s_ease-in-out_infinite]"
        />
        <path
          d="M0,250 Q150,300 300,250 T600,250 T900,250 T1200,250 T1500,250 T1800,250 T2000,250"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="0.6"
          className="animate-[pulse_15s_ease-in-out_infinite]"
        />
        <path
          d="M0,350 Q300,400 600,350 T1200,350 T1800,350 T2000,350"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="0.5"
        />
      </svg>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
