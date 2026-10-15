import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import myProfileImg from '../assets/profile.jpg';
import { personalInfo } from '../data/personalInfo';

const rotatingKeywords = [
  'clean architecture.',
  'robust REST APIs.',
  'scalable MERN stacks.',
  'modern React systems.',
  'AI / ML fundamentals.'
];

export default function Hero({ onOpenCommandPalette }) {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const cardRef = useRef(null);

  // Cycling keyword timer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % rotatingKeywords.length);
        setIsFading(false);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // 3D Card Tilt handler
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: x * 10, y: -y * 10 });
    setIsCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="top" className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-slate-50 dark:bg-[#07090E] transition-colors duration-300">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[400px] bg-blue-500/10 dark:bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" aria-hidden="true"></div>
      <div className="absolute top-1/3 right-10 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[110px] rounded-full pointer-events-none -z-10" aria-hidden="true"></div>

      <div className="max-w-6xl mx-auto w-full">
        {/* Split Hero: Content & Profile Card */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-14 sm:mb-16">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <Reveal direction="up" delay={50}>
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-mono mb-5 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors cursor-default"
                title="System Status: Open to Full Stack & Frontend opportunities"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-medium">Available for Opportunities</span>
                <span className="text-slate-400 dark:text-slate-500">·</span>
                <span className="text-slate-600 dark:text-slate-300">Full Stack & Frontend</span>
              </div>
            </Reveal>

            {/* Headline with Dynamic Keyword Switcher */}
            <Reveal direction="up" delay={150}>
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] sm:leading-[1.12] mb-4 text-balance">
                <span>Building scalable web apps with </span>
                <span className="inline-block relative text-blue-600 dark:text-blue-400 min-w-[260px] sm:min-w-[340px]">
                  <span 
                    className={`inline-block transition-all duration-300 transform ${
                      isFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  >
                    {rotatingKeywords[keywordIndex]}
                  </span>
                  <span className="animate-pulse text-blue-500 dark:text-blue-400 ml-0.5">_</span>
                </span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={250}>
              <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 font-mono">
                {personalInfo.name} <span className="text-slate-400 dark:text-slate-500 font-normal">/</span> {personalInfo.role}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-7 leading-relaxed max-w-xl">
                BCA Software Development student engineering robust, production-grade applications with React, modular Express.js REST APIs, performant state workflows, and structured MongoDB schemas.
              </p>
            </Reveal>

            <Reveal direction="up" delay={350}>
              {/* Primary & Secondary CTA Hierarchy */}
              <div className="flex flex-wrap items-center gap-3 mb-7 w-full sm:w-auto">
                {/* Primary CTA */}
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span>Explore Featured Work</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                {/* Secondary CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-[#0F1626] hover:bg-slate-100 dark:hover:bg-[#152037] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Contact Me
                </a>

                {/* Tertiary Resume CTA */}
                {personalInfo.resumeUrl && (
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-3.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white font-medium text-xs sm:text-sm transition-colors focus:outline-none focus-visible:underline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Resume ↗</span>
                  </a>
                )}
              </div>

              {/* Verified Connect Links with Instant Copy Micro-Action */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider">Connect:</span>
                <a 
                  href={personalInfo.socialLinks.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  GitHub
                </a>
                <span>·</span>
                <a 
                  href={personalInfo.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer inline-flex items-center gap-1"
                  title="Click to copy email address"
                >
                  <span>{copiedEmail ? '✓ Copied!' : 'Copy Email'}</span>
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  title="Open Command Palette (⌘K)"
                >
                  <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px]">⌘K</kbd>
                  <span>Quick Jump</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Developer Profile Showcase Card with 3D Perspective Tilt */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Reveal direction="right" delay={300} className="w-full max-w-sm sm:max-w-md">
              <div 
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateY(${cardTilt.x}deg) rotateX(${cardTilt.y}deg)`,
                  transition: isCardHovered ? 'none' : 'transform 0.5s ease-out'
                }}
                className="relative rounded-2xl bg-white dark:bg-[#0C111E] border border-slate-200 dark:border-white/[0.08] p-5 sm:p-6 shadow-xl dark:shadow-2xl dark:shadow-black/60 overflow-hidden group transform-gpu"
              >
                {/* Dynamic Specular Glare following mouse */}
                {isCardHovered && (
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl opacity-40 transition-opacity"
                    style={{
                      background: `radial-gradient(circle 300px at ${50 + cardTilt.x * 4}% ${50 - cardTilt.y * 4}%, rgba(59, 130, 246, 0.15), transparent 70%)`
                    }}
                    aria-hidden="true"
                  />
                )}
                
                {/* Profile Image & Role Signature */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/[0.06]">
                  <img
                    src={myProfileImg}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#0C111E] via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-white/95 dark:bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 shadow-sm">
                    <span className="font-semibold text-slate-900 dark:text-white">Full Stack MERN</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">React · Node · Mongo</span>
                  </div>
                </div>

                {/* Developer Card Verified Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">Based in</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">Current Focus</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Learning AI / ML & System Design</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">Education</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">BCA (Software Dev, 2024–2027)</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Full-Width Key Metrics Strip with Hover Micro-Interactions */}
        <Reveal direction="up" delay={450}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0A0F1B] border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  AI / ML
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">Current Learning</p>
            </div>
            
            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  MERN
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">Full Stack Core</p>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  4+ Apps
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-60"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">Shipped to Web</p>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  2027
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">BCA Candidate</p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}