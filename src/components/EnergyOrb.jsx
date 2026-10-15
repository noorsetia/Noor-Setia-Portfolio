import React from 'react';

/**
 * EnergyOrb
 * 
 * High-fidelity SVG 3D glass energy orb replicating Image 1:
 * - Dynamic S-curve dual plasma vortex:
 *   - Luminous neon lime-green / chartreuse swirl
 *   - Fiery orange / golden amber counter-swirl
 *   - Intertwining galactic nexus with deep emerald and void shadows
 * - Continuous smooth 360-degree internal plasma rotation
 * - Photorealistic glass specular curved reflection arc (upper-left)
 * - Sharp pinhole gloss glint and secondary amber/cyan rim reflection
 * - Scalable from miniature (24-32px for buttons) to large (96-120px for chat hero)
 */
export default function EnergyOrb({ 
  size = 96, 
  className = '', 
  animate = true,
  glow = true 
}) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Soft Ambient Radiance Behind Sphere */}
      {glow && (
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-70 animate-sphere-glow"
          style={{
            background: 'radial-gradient(circle, rgba(197, 245, 74, 0.4) 0%, rgba(249, 115, 22, 0.28) 45%, rgba(16, 185, 129, 0.15) 70%, transparent 85%)',
            filter: `blur(${Math.max(6, Math.round(size * 0.22))}px)`,
            transform: 'scale(1.25)',
          }}
        />
      )}

      {/* Main Glass Sphere Body */}
      <div 
        className="relative w-full h-full rounded-full overflow-hidden border border-white/25 shadow-2xl"
        style={{
          boxShadow: `
            0 0 ${Math.max(8, Math.round(size * 0.2))}px rgba(197, 245, 74, 0.3),
            0 ${Math.max(4, Math.round(size * 0.1))}px ${Math.max(8, Math.round(size * 0.25))}px rgba(0, 0, 0, 0.9),
            inset 0 0 ${Math.max(6, Math.round(size * 0.18))}px rgba(0, 0, 0, 0.95),
            inset 0 -${Math.max(2, Math.round(size * 0.08))}px ${Math.max(4, Math.round(size * 0.15))}px rgba(249, 115, 22, 0.5),
            inset 0 ${Math.max(2, Math.round(size * 0.08))}px ${Math.max(4, Math.round(size * 0.15))}px rgba(197, 245, 74, 0.6)
          `,
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Base Depth Radial Gradient */}
            <radialGradient id={`base-depth-${size}`} cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#042014" />
              <stop offset="45%" stopColor="#02120b" />
              <stop offset="85%" stopColor="#010604" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Lime-Green Vortex Arm Gradient */}
            <linearGradient id={`lime-swirl-${size}`} x1="15%" y1="85%" x2="85%" y2="15%">
              <stop offset="0%" stopColor="#052e16" stopOpacity="0" />
              <stop offset="25%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#84cc16" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#C5F54A" stopOpacity="1" />
              <stop offset="100%" stopColor="#ecfccb" stopOpacity="0.9" />
            </linearGradient>

            {/* Fiery Orange/Amber Vortex Arm Gradient */}
            <linearGradient id={`orange-swirl-${size}`} x1="85%" y1="15%" x2="15%" y2="85%">
              <stop offset="0%" stopColor="#450a0a" stopOpacity="0" />
              <stop offset="20%" stopColor="#c2410c" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ea580c" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#f97316" stopOpacity="1" />
              <stop offset="90%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0.85" />
            </linearGradient>

            {/* Core Nexus Blend Gradient */}
            <radialGradient id={`core-nexus-${size}`} cx="50%" cy="50%" r="40%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#C5F54A" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#f97316" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#04120c" stopOpacity="0" />
            </radialGradient>

            {/* Specular Curved Reflection Gradient */}
            <linearGradient id={`specular-arc-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#C5F54A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Lower Rim Refraction Gradient */}
            <linearGradient id={`lower-refract-${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="80%" stopColor="#C5F54A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Spherical Clip Path */}
            <clipPath id={`orb-clip-${size}`}>
              <circle cx="50" cy="50" r="49" />
            </clipPath>

            {/* Soft Glow Filter for Internal Plasma */}
            <filter id={`vortex-glow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Group Clipped to Perfect Sphere */}
          <g clipPath={`url(#orb-clip-${size})`}>
            {/* Base Dark Void Background */}
            <rect width="100" height="100" fill={`url(#base-depth-${size})`} />

            {/* Continuously Rotating Internal Dual S-Curve Vortex */}
            <g 
              className={animate ? "animate-sphere-internal origin-center" : "origin-center"}
              style={{ transformOrigin: '50px 50px' }}
            >
              {/* Deep Shadow Swirl / Separation Groove */}
              <circle cx="50" cy="50" r="46" fill="#020806" opacity="0.6" />

              {/* Luminous Lime-Green S-Curve Wave (Bottom-Left to Core to Top-Right) */}
              <path 
                d="M 18 78 C 12 58 24 38 42 36 C 54 35 62 42 60 52 C 58 60 48 64 42 58 C 36 52 40 40 54 36 C 68 32 82 42 86 60 C 88 68 84 80 72 86 C 58 92 34 92 18 78 Z"
                fill={`url(#lime-swirl-${size})`}
                filter={`url(#vortex-glow-${size})`}
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Secondary Lime Core Filament */}
              <path 
                d="M 28 72 C 22 56 32 42 46 42 C 56 42 64 48 62 56 C 60 62 52 64 46 58 C 42 54 44 46 52 44 C 60 42 72 48 76 64"
                fill="none"
                stroke="#C5F54A"
                strokeWidth="5"
                strokeLinecap="round"
                filter={`url(#vortex-glow-${size})`}
                style={{ mixBlendMode: 'color-dodge' }}
                opacity="0.85"
              />

              {/* Fiery Orange / Golden Amber S-Curve Wave (Top-Right to Core to Bottom-Left) */}
              <path 
                d="M 82 22 C 88 42 76 62 58 64 C 46 65 38 58 40 48 C 42 40 52 36 58 42 C 64 48 60 60 46 64 C 32 68 18 58 14 40 C 12 32 16 20 28 14 C 42 8 66 8 82 22 Z"
                fill={`url(#orange-swirl-${size})`}
                filter={`url(#vortex-glow-${size})`}
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Secondary Amber Core Filament */}
              <path 
                d="M 72 28 C 78 44 68 58 54 58 C 44 58 36 52 38 44 C 40 38 48 36 54 42 C 58 46 56 54 48 56 C 40 58 28 52 24 36"
                fill="none"
                stroke="#f97316"
                strokeWidth="5"
                strokeLinecap="round"
                filter={`url(#vortex-glow-${size})`}
                style={{ mixBlendMode: 'color-dodge' }}
                opacity="0.85"
              />

              {/* Central Interlocking Plasma Nexus (Golden Core) */}
              <ellipse 
                cx="50" 
                cy="50" 
                rx="18" 
                ry="14" 
                transform="rotate(-25 50 50)"
                fill={`url(#core-nexus-${size})`}
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Sharp Solar Flare Core Spark */}
              <circle cx="50" cy="50" r="4" fill="#ffffff" opacity="0.9" filter={`url(#vortex-glow-${size})`} />
              <circle cx="50" cy="50" r="2" fill="#fef08a" />
            </g>

            {/* Subsurface Cosmic Vignette Depth (Static) */}
            <circle 
              cx="50" 
              cy="50" 
              r="49" 
              fill="none" 
              stroke="#000000" 
              strokeWidth="9" 
              opacity="0.65" 
            />

            {/* Lower-Right Internal Refraction Arc */}
            <path 
              d="M 52 97 C 76 96 95 77 96 52 C 94 72 78 88 56 94 Z"
              fill={`url(#lower-refract-${size})`}
              opacity="0.75"
              style={{ mixBlendMode: 'screen' }}
            />

            {/* Upper-Left Glass Specular Curved Crescent Arc */}
            <path 
              d="M 18 36 C 22 22 36 12 54 10 C 38 14 26 24 22 38 C 18 52 20 68 28 78 C 22 70 16 52 18 36 Z"
              fill={`url(#specular-arc-${size})`}
              opacity="0.9"
            />

            {/* Secondary Soft Specular Crest */}
            <ellipse 
              cx="38" 
              cy="26" 
              rx="18" 
              ry="9" 
              transform="rotate(-32 38 26)"
              fill={`url(#specular-arc-${size})`}
              fillOpacity="0.45"
            />

            {/* Pinhole Sharp Glass Gloss Glint */}
            <circle 
              cx="32" 
              cy="22" 
              r="2.8" 
              fill="#ffffff" 
              opacity="0.98" 
            />
            <circle 
              cx="32" 
              cy="22" 
              r="6" 
              fill="#ffffff" 
              opacity="0.35" 
            />
          </g>

          {/* Outer Glass Refraction Rim Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="48.5" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.35)" 
            strokeWidth="1.2" 
          />
        </svg>
      </div>
    </div>
  );
}
