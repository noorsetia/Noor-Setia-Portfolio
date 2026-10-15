import React, { useState } from 'react';

/**
 * ProjectVisual Component
 * 
 * Displays genuine screenshots when provided, or a high-fidelity, minimal,
 * intentional Architecture Blueprint Card tailored to each verified project.
 * No fake browser chrome, no simulated screenshots, no '.local' domains,
 * and no 'Screenshot Pending' placeholders.
 */
export default function ProjectVisual({ project, className = "", isModal = false }) {
  const [imageError, setImageError] = useState(false);

  // If a real screenshot URL is supplied and loads successfully
  if (project.screenshotUrl && !imageError) {
    return (
      <div className={`relative overflow-hidden w-full ${isModal ? 'aspect-[16/9] max-h-80' : 'aspect-[16/10]'} bg-slate-900 ${className}`}>
        <img
          src={project.screenshotUrl}
          alt={`Interface screenshot of ${project.title}`}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>
    );
  }

  // High-Fidelity Minimal Architecture Blueprint Card
  return (
    <div 
      className={`relative overflow-hidden w-full ${isModal ? 'aspect-[16/9] max-h-80' : 'aspect-[16/10]'} bg-slate-900 dark:bg-[#070B14] border-b border-slate-200 dark:border-white/[0.08] flex flex-col justify-between p-5 sm:p-6 select-none transition-colors duration-300 ${className}`}
    >
      {/* Precision Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      {/* Subtle Glow in Upper Right */}
      <div 
        className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Banner Row: Category and Project Index */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2.5 py-1 rounded-md backdrop-blur-sm">
          {project.category}
        </span>

        <span className="text-xs font-mono text-slate-400">
          SYS-0{project.id}
        </span>
      </div>

      {/* Center Icon & Architectural Schematic Monogram */}
      <div className="relative z-10 my-auto py-3 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
          {project.id === 1 && (
            /* E-Commerce Shopping Bag & Payment Node */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          {project.id === 2 && (
            /* Healthcare Medical Pulse / Shield */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
          {project.id === 3 && (
            /* Data Analytics Bar Graph */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
          {project.id === 4 && (
            /* Fitness Energy Bolt */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>

        <div className="overflow-hidden">
          <p className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
            {project.title.split('—')[0].trim()}
          </p>
          <p className="text-xs text-blue-300/80 font-mono tracking-tight truncate">
            {project.tags.slice(0, 4).join(' • ')}
          </p>
        </div>
      </div>

      {/* Bottom Row: Verified Architecture Signature */}
      <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-white/[0.08] text-[11px] font-mono text-slate-400">
        <span className="truncate">
          {project.id === 1 && "MERN Stack • Zustand State • Razorpay Gateway"}
          {project.id === 2 && "React SPA • React Router • Modular Component Hierarchy"}
          {project.id === 3 && "JavaScript (ES6+) • Chart.js • Real-time Data Filter"}
          {project.id === 4 && "MERN Stack • Health Metrics Engine • REST APIs"}
        </span>
        <span className="text-blue-400 text-xs font-semibold shrink-0 ml-2">
          Architecture ↗
        </span>
      </div>
    </div>
  );
}
