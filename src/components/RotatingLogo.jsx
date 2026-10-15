import React from 'react';

/**
 * RotatingLogo
 * 
 * A futuristic, cybernetic rotating logo beside the chat assistant title:
 * - Dual-concentric orbital rotation (outer orbital ring + inner faceted spark)
 * - Neon lime (#C5F54A) and electric cyan accents
 * - Buttery smooth continuous 60fps rotation
 * - Subtle hover acceleration and glow
 */
export default function RotatingLogo({ size = 20, className = '' }) {
  return (
    <span 
      className={`relative inline-flex items-center justify-center shrink-0 group/logo cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      title="AI Quantum Core"
      aria-hidden="true"
    >
      {/* Soft Ambient Core Glow */}
      <span 
        className="absolute inset-0 rounded-full bg-[#C5F54A]/25 blur-xs group-hover/logo:bg-[#C5F54A]/40 transition-colors"
      />

      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative overflow-visible"
      >
        {/* Outer Orbital Ring (Clockwise Smooth Rotation) */}
        <g className="animate-spin-slow origin-center group-hover/logo:[animation-duration:6s] transition-all">
          <circle 
            cx="12" 
            cy="12" 
            r="9.5" 
            stroke="#C5F54A" 
            strokeWidth="1.25" 
            strokeDasharray="4 3" 
            strokeOpacity="0.8" 
          />
          {/* Orbital Nodes */}
          <circle cx="12" cy="2.5" r="1.5" fill="#C5F54A" />
          <circle cx="21.5" cy="12" r="1.25" fill="#38BDF8" />
          <circle cx="12" cy="21.5" r="1.5" fill="#C5F54A" />
          <circle cx="2.5" cy="12" r="1.25" fill="#38BDF8" />
        </g>

        {/* Inner Faceted Diamond Sparkle (Counter-Clockwise Rotation) */}
        <g className="animate-spin-reverse-slow origin-center group-hover/logo:[animation-duration:8s] transition-all">
          <polygon 
            points="12,5 15,12 12,19 9,12" 
            fill="url(#sparkle-gradient-lime)" 
            fillOpacity="0.85"
            stroke="#C5F54A"
            strokeWidth="0.5"
          />
          <polygon 
            points="5,12 12,9 19,12 12,15" 
            fill="url(#sparkle-gradient-cyan)" 
            fillOpacity="0.75"
            stroke="#38BDF8"
            strokeWidth="0.5"
          />
        </g>

        {/* Central Luminous Quantum Core */}
        <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
        <circle cx="12" cy="12" r="1.2" fill="#C5F54A" />

        {/* Gradients */}
        <defs>
          <linearGradient id="sparkle-gradient-lime" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C5F54A" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="sparkle-gradient-cyan" x1="5" y1="12" x2="19" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#C5F54A" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
