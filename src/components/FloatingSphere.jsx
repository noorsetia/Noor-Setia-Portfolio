import React, { useState } from 'react';
import energySphereImage from '../assets/generated-energy-sphere.png';
import EnergyOrb from './EnergyOrb';

/**
 * Displays the generated glass energy sphere as the chat welcome visual.
 */
export default function FloatingSphere({ isLoading = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none my-1">
      <div className={`relative flex h-[120px] w-[120px] items-center justify-center animate-sphere-float sm:h-[135px] sm:w-[135px] ${isLoading ? 'scale-105' : ''}`}>
        <div
          className="absolute -inset-5 rounded-full animate-sphere-glow"
          style={{
            background:
              'radial-gradient(circle at 50% 32%, rgba(197, 245, 74, 0.28), transparent 48%), radial-gradient(circle at 50% 82%, rgba(249, 115, 22, 0.2), transparent 58%)',
            filter: 'blur(14px)',
          }}
          aria-hidden="true"
        />
        {imageFailed ? (
          <EnergyOrb size={120} animate={!isLoading} glow={false} />
        ) : (
          <img
            src={energySphereImage}
            alt=""
            onError={() => setImageFailed(true)}
            loading="lazy"
            decoding="async"
            width="135"
            height="135"
            className="relative h-full w-full rounded-full object-contain mix-blend-screen"
            draggable="false"
          />
        )}
      </div>

      <div
        className="w-14 h-1.5 rounded-[100%] bg-black/70 blur-[4px] mt-0.5 animate-sphere-shadow pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
