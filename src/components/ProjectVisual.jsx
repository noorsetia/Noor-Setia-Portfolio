import React, { useState } from 'react';

/**
 * ProjectVisual Component
 * 
 * Provides authentic, high-fidelity application previews for Noor Setia's verified projects:
 * 1. NESTORA (MERN E-Commerce Storefront & Checkout)
 * 2. CareSync (Healthcare Patient Portal & Appointment Workflow)
 * 3. World Countries Data Explorer (Demographic Data & Chart Visuals)
 * 4. GYM Platform (Fitness Regimens & BMI Calculator Widget)
 * 
 * Allows toggling between 'Application Preview' and 'Architecture Blueprint'.
 */
export default function ProjectVisual({ project, className = "", isModal = false }) {
  const [activeTab, setActiveTab] = useState(isModal ? 'blueprint' : 'preview');
  const [imageError, setImageError] = useState(false);

  // If a real screenshot file is supplied and loaded
  if (project.screenshotUrl && !imageError) {
    return (
      <div className={`relative overflow-hidden w-full ${isModal ? 'aspect-[16/9] max-h-80' : 'aspect-[16/10]'} bg-slate-900 ${className}`}>
        <img
          src={project.screenshotUrl}
          alt={`Interface screenshot of ${project.title}`}
          onError={() => setImageError(true)}
          loading={isModal ? 'eager' : 'lazy'}
          decoding="async"
          width="1280"
          height="800"
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>
    );
  }

  // 1. NESTORA - Authentic E-Commerce Storefront Preview
  const renderNestoraPreview = () => (
    <div className="h-full w-full bg-[#0D1117] text-slate-100 flex flex-col justify-between p-3.5 sm:p-4 text-xs select-none">
      {/* Top Navbar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5F54A]"></span>
            NESTORA
          </span>
          <span className="text-[9px] bg-[#C5F54A]/15 text-[#C5F54A] px-1.5 py-0.5 rounded font-mono border border-[#C5F54A]/30">
            DEMO STORE
          </span>
        </div>
        <div className="flex-1 max-w-[150px] sm:max-w-[180px] bg-white/[0.06] rounded-md px-2 py-1 text-[11px] text-slate-400 flex items-center gap-1.5 border border-white/[0.05]">
          <svg className="w-3 h-3 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="truncate">Search catalog...</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#C5F54A]/10 border border-[#C5F54A]/30 text-[#C5F54A] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Cart: 3
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2">
        {/* Item 1 */}
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2 flex flex-col justify-between">
          <div className="h-14 sm:h-16 rounded bg-gradient-to-br from-amber-500/20 to-orange-600/10 flex items-center justify-center text-amber-300 mb-1.5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-white truncate text-[11px]">Nordic Oak Armchair</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[#C5F54A] font-bold font-mono text-[11px]">$240</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">In Stock</span>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2 flex flex-col justify-between">
          <div className="h-14 sm:h-16 rounded bg-gradient-to-br from-blue-500/20 to-indigo-600/10 flex items-center justify-center text-blue-300 mb-1.5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-white truncate text-[11px]">Design Anthology</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[#C5F54A] font-bold font-mono text-[11px]">$48</span>
              <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1 rounded">Sample Item</span>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="hidden sm:flex bg-white/[0.04] border border-white/[0.06] rounded-lg p-2 flex-col justify-between">
          <div className="h-14 sm:h-16 rounded bg-gradient-to-br from-emerald-500/20 to-teal-600/10 flex items-center justify-center text-emerald-300 mb-1.5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-white truncate text-[11px]">Studio Task Lamp</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[#C5F54A] font-bold font-mono text-[11px]">$85</span>
              <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1 rounded">Catalog Mock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Features Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
          Razorpay Gateway • Google OAuth • Zustand
        </span>
        <span className="text-[#C5F54A] font-semibold shrink-0 ml-1">
          {project.screenshotUrl ? 'Live Preview ↗' : 'Illustrative ↗'}
        </span>
      </div>
    </div>
  );

  // 2. CareSync - Healthcare Patient Portal Preview (Demo Data / Zero PHI)
  const renderCareSyncPreview = () => (
    <div className="h-full w-full bg-[#0B131B] text-slate-100 flex flex-col justify-between p-3.5 sm:p-4 text-xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0"></span>
          <span className="font-bold text-sm tracking-tight text-white">CareSync Portal</span>
          <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-mono border border-sky-400/30">
            DEMO CLINIC • NO PHI
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-300 font-mono shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Dr. A. Sharma (Online Demo)
        </div>
      </div>

      {/* Patient Triage & Appointment Grid (Synthetic Illustrative Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400">ILLUSTRATIVE RECORD</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold font-mono">Demo Record</span>
          </div>
          <p className="font-semibold text-white text-[12px] truncate">Sample Patient #104 — Routine Health Exam</p>
          <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-300 pt-1 border-t border-white/[0.04]">
            <div>BP: <span className="text-white font-bold">118/78</span></div>
            <div>Heart Rate: <span className="text-[#C5F54A] font-bold">72 bpm</span></div>
          </div>
          <p className="text-[9px] text-slate-400 italic">Synthetic demo data only — no real patient records</p>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400">WORKFLOW SCHEDULER</span>
            <p className="text-[11px] text-white font-medium mt-1">Select Department:</p>
            <div className="flex gap-1 mt-1.5">
              <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-400/30 text-sky-200 text-[10px]">Cardiology</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 text-[10px]">General OPD</span>
            </div>
          </div>
          <div className="text-[10px] text-[#C5F54A] font-semibold mt-1 flex items-center justify-between">
            <span>Slot: 11:30 AM Today</span>
            <span className="bg-[#C5F54A]/20 px-1.5 py-0.5 rounded font-mono">Interactive Demo</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
        <span className="text-slate-300 truncate">React Router • Form Validation • CSS3</span>
        <span className="text-[#C5F54A] font-semibold shrink-0 ml-1">Live App ↗</span>
      </div>
    </div>
  );

  // 3. World Countries Explorer Preview
  const renderWorldVisualPreview = () => (
    <div className="h-full w-full bg-[#0C1217] text-slate-100 flex flex-col justify-between p-3.5 sm:p-4 text-xs select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5F54A]"></span>
          <span className="font-bold text-sm tracking-tight text-white">World Countries Explorer</span>
        </div>
        <div className="text-[10px] font-mono text-[#C5F54A] bg-[#C5F54A]/10 px-2 py-0.5 rounded border border-[#C5F54A]/30">
          250 Countries Indexed
        </div>
      </div>

      {/* Demographic Chart Visualization Simulation */}
      <div className="my-2 space-y-1.5 bg-white/[0.03] p-2.5 rounded-lg border border-white/[0.05]">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>POPULATION COMPARISON (MILLIONS)</span>
          <span className="text-slate-300">Live Chart.js</span>
        </div>

        {/* Bar 1 */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px]">
            <span>India</span>
            <span className="font-mono text-[#C5F54A]">1,428 M</span>
          </div>
          <div className="w-full bg-white/[0.08] h-2 rounded-full overflow-hidden">
            <div className="bg-[#C5F54A] h-full rounded-full" style={{ width: '98%' }}></div>
          </div>
        </div>

        {/* Bar 2 */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px]">
            <span>China</span>
            <span className="font-mono text-blue-400">1,411 M</span>
          </div>
          <div className="w-full bg-white/[0.08] h-2 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full rounded-full" style={{ width: '96%' }}></div>
          </div>
        </div>

        {/* Bar 3 */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px]">
            <span>United States</span>
            <span className="font-mono text-purple-400">339 M</span>
          </div>
          <div className="w-full bg-white/[0.08] h-2 rounded-full overflow-hidden">
            <div className="bg-purple-400 h-full rounded-full" style={{ width: '32%' }}></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
        <span className="text-slate-300">Debounced Instant Search • Chart.js • Vanilla ES6+</span>
        <span className="text-[#C5F54A] font-semibold">Live App ↗</span>
      </div>
    </div>
  );

  // 4. GYM Platform Preview
  const renderGymPreview = () => (
    <div className="h-full w-full bg-[#11161B] text-slate-100 flex flex-col justify-between p-3.5 sm:p-4 text-xs select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span className="font-bold text-sm tracking-tight text-white">GYM Fitness Suite</span>
        </div>
        <span className="text-[10px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
          MERN Fitness
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2.5">
          <span className="text-[10px] font-mono text-slate-400">INTERACTIVE BMI CALCULATOR</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold font-mono text-[#C5F54A]">22.4</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded font-semibold">Optimal Range</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Height: 175cm • Weight: 68kg</p>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400">MEMBERSHIP TIERS</span>
            <p className="font-bold text-white text-[11px] mt-0.5">Gold Pro Membership</p>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 pt-1">
            <span>₹1,499 / Month</span>
            <span className="text-[#C5F54A] font-semibold">Join Now</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
        <span className="text-slate-300">BMI Metric Engine • Express REST APIs • MongoDB</span>
        <span className="text-[#C5F54A] font-semibold">Live App ↗</span>
      </div>
    </div>
  );

  // High-Fidelity Architecture Blueprint View (available in modal or on toggle)
  const renderArchitectureBlueprint = () => (
    <div className="h-full w-full bg-slate-900 dark:bg-[#0B0F13] flex flex-col justify-between p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Precision Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C5F54A 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#C5F54A] bg-[#C5F54A]/10 border border-[#C5F54A]/30 px-2.5 py-1 rounded-md backdrop-blur-sm">
          {project.category}
        </span>
        <span className="text-xs font-mono text-slate-400">
          ARCHITECTURE SPECIFICATION: SYS-0{project.id}
        </span>
      </div>

      <div className="relative z-10 my-auto py-2 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#C5F54A]/10 border border-[#C5F54A]/30 flex items-center justify-center text-[#C5F54A] shrink-0 shadow-inner">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div>
          <p className="text-base sm:text-lg font-bold text-white tracking-tight">
            {project.title.split('—')[0].trim()}
          </p>
          <p className="text-xs text-blue-300 font-mono">
            {project.tags.slice(0, 4).join(' • ')}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px] font-mono text-slate-400">
        <span className="truncate">
          {project.id === 1 && "MERN Stack • Zustand State • Razorpay Gateway"}
          {project.id === 2 && "React SPA • React Router • Modular Hierarchy"}
          {project.id === 3 && "JavaScript (ES6+) • Chart.js • Real-time Filter"}
          {project.id === 4 && "MERN Stack • Health Metrics Engine • REST APIs"}
        </span>
        <span className="text-[#C5F54A] font-semibold shrink-0 ml-2">
          {project.screenshotUrl ? 'Verified Specs' : 'Illustrative preview'}
        </span>
      </div>
    </div>
  );

  return (
    <div className={`relative overflow-hidden w-full ${isModal ? 'aspect-[16/9] max-h-80' : 'aspect-[16/10]'} border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-300 ${className}`}>
      {/* Switcher Tab for Modal View */}
      {isModal && (
        <div className="absolute top-3 right-3 z-20 flex bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/10 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'preview' ? 'bg-[#C5F54A] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            {project.screenshotUrl ? 'Live Preview' : 'Illustration'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('blueprint')}
            className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'blueprint' ? 'bg-[#C5F54A] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Architecture
          </button>
        </div>
      )}

      {/* Render selected view */}
      {activeTab === 'blueprint' ? (
        renderArchitectureBlueprint()
      ) : (
        <>
          {!project.screenshotUrl && (
            <span className="absolute top-3 left-3 z-10 rounded-md border border-white/15 bg-slate-950/80 px-2 py-1 text-[10px] font-mono font-semibold text-slate-300 backdrop-blur-sm">
              Illustrative preview
            </span>
          )}
          {project.id === 1 && renderNestoraPreview()}
          {project.id === 2 && renderCareSyncPreview()}
          {project.id === 3 && renderWorldVisualPreview()}
          {project.id === 4 && renderGymPreview()}
        </>
      )}
    </div>
  );
}
