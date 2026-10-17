import React, { useId } from 'react';

/**
 * Compact energy core used by the chat launcher and welcome state.
 * The black surround stays fixed while only the plasma artwork rotates.
 */
export default function EnergyOrb({
  size = 96,
  className = '',
  animate = true,
  glow = true,
}) {
  const id = `energy-${useId().replace(/:/g, '')}-${size}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none rounded-full bg-black ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {glow && (
        <div
          className="pointer-events-none absolute -inset-3 rounded-full opacity-45"
          style={{
            background:
              'radial-gradient(circle at 50% 25%, rgba(197,245,74,.28), transparent 48%), radial-gradient(circle at 50% 90%, rgba(249,115,22,.18), transparent 52%)',
            filter: 'blur(10px)',
          }}
        />
      )}

      <svg
        viewBox="0 0 100 100"
        className={`relative h-[62%] w-[62%] ${animate ? 'animate-energy-core' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={`${id}-clip`}>
            <circle cx="50" cy="50" r="48" />
          </clipPath>
          <radialGradient id={`${id}-base`} cx="45%" cy="42%" r="65%">
            <stop offset="0" stopColor="#253b13" />
            <stop offset=".45" stopColor="#0b2819" />
            <stop offset="1" stopColor="#020806" />
          </radialGradient>
          <linearGradient id={`${id}-lime`} x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#15803d" />
            <stop offset=".45" stopColor="#bef264" />
            <stop offset=".8" stopColor="#fef08a" />
            <stop offset="1" stopColor="#65a30d" />
          </linearGradient>
          <linearGradient id={`${id}-fire`} x1="1" y1="0" x2="0" y2="1">
            <stop stopColor="#facc15" />
            <stop offset=".35" stopColor="#fb923c" />
            <stop offset=".72" stopColor="#ea580c" />
            <stop offset="1" stopColor="#7f1d1d" />
          </linearGradient>
          <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        <g clipPath={`url(#${id}-clip)`}>
          <circle cx="50" cy="50" r="49" fill={`url(#${id}-base)`} />
          <g style={{ transformOrigin: '50px 50px' }}>
            <path
              d="M8 57C19 22 47 12 70 26c14 8 15 22 4 29-10 7-22 3-25-5-4-12 14-22 27-13 13 9 15 29 4 45-17 23-53 18-72-7Z"
              fill={`url(#${id}-lime)`}
              opacity=".95"
              filter={`url(#${id}-blur)`}
              style={{ mixBlendMode: 'screen' }}
            />
            <path
              d="M91 42C78 16 50 15 32 31c-12 11-10 24 1 29 11 5 21-1 22-10 2-11-15-18-27-8C15 52 15 73 29 86c19 18 52 8 62-13Z"
              fill={`url(#${id}-fire)`}
              opacity=".92"
              filter={`url(#${id}-blur)`}
              style={{ mixBlendMode: 'screen' }}
            />
            <path
              d="M14 65c17-22 29-26 42-18 10 6 12 16 4 22-7 6-17 3-18-4-2-9 10-15 20-9 12 7 16 19 25 26"
              fill="none"
              stroke="#d9f99d"
              strokeWidth="7"
              strokeLinecap="round"
              opacity=".85"
              filter={`url(#${id}-blur)`}
            />
            <path
              d="M84 34C66 54 54 59 43 52c-9-6-10-15-2-20 7-5 16-1 17 6 1 8-10 13-19 8-10-5-17-16-24-23"
              fill="none"
              stroke="#fb923c"
              strokeWidth="6"
              strokeLinecap="round"
              opacity=".9"
              filter={`url(#${id}-blur)`}
            />
            <ellipse cx="51" cy="49" rx="13" ry="10" fill="#fef08a" opacity=".55" filter={`url(#${id}-blur)`} />
            <circle cx="50" cy="48" r="4" fill="#fff7ae" opacity=".9" />
          </g>
          <circle cx="32" cy="24" r="2.5" fill="#fff" opacity=".45" />
        </g>
      </svg>
    </div>
  );
}
