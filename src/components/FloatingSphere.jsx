import React from 'react';
import EnergyOrb from './EnergyOrb';

/**
 * FloatingSphere
 * 
 * Renders the pure 3D animated glass energy orb matching Image 1:
 * - Fluid dual S-curve vortex (lime-green and fiery orange/amber plasma)
 * - Photorealistic glass specular curvature and gloss highlights
 * - Continuous smooth 8–12px vertical floating motion
 * - Ambient lime/amber breathing glow
 * - Ground shadow synchronized with floating elevation
 * - Pure sphere presentation without bulky outer surround pedestals
 */
export default function FloatingSphere({ isLoading = false }) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none my-1">
      {/* Floating Assembly */}
      <div className={`relative flex items-center justify-center animate-sphere-float ${isLoading ? 'scale-105' : ''}`}>
        
        {/* Soft Ambient Radiance Behind Sphere */}
        <div 
          className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full pointer-events-none animate-sphere-glow"
          style={{
            background: 'radial-gradient(circle, rgba(197, 245, 74, 0.35) 0%, rgba(249, 115, 22, 0.25) 45%, rgba(16, 185, 129, 0.12) 70%, transparent 85%)',
            filter: 'blur(28px)',
          }}
          aria-hidden="true"
        />

        {/* The Exact Image 1 3D Glass Energy Orb */}
        <EnergyOrb 
          size={100} 
          glow={false}
          className="transition-transform duration-500" 
        />
      </div>

      {/* Synchronized Ground Shadow */}
      <div 
        className="w-16 sm:w-20 h-2 rounded-[100%] bg-black/85 blur-[4px] mt-2.5 animate-sphere-shadow pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
