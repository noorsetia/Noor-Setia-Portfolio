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
  const heroRef = useRef(null);
  const glowRef = useRef(null);

  // Interactive Cursor-Following Lime-Yellow Background Glow
  useEffect(() => {
    const heroEl = heroRef.current;
    const glowEl = glowRef.current;
    if (!heroEl || !glowEl) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if device is touch-primary (mobile / tablet without mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    // Default resting position (center-right towards the hero visual nexus)
    let currentX = heroEl.clientWidth * 0.52;
    let currentY = heroEl.clientHeight * 0.42;
    let targetX = currentX;
    let targetY = currentY;
    let currentOpacity = 0;
    let targetOpacity = 0.85;
    let rafId = null;

    if (prefersReducedMotion) {
      // Respect reduced motion: static, gentle ambient spotlight
      glowEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      glowEl.style.opacity = '0.75';
      return;
    }

    if (isTouchDevice) {
      // Mobile / touch devices: soft static ambient glow with gentle ambient presence
      glowEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      glowEl.style.opacity = '0.75';
      glowEl.classList.add('animate-pulse-subtle');
      return;
    }

    // Set initial position
    glowEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetOpacity = 0.95;
    };

    const handleMouseEnter = (e) => {
      const rect = heroEl.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetOpacity = 0.95;
    };

    const handleMouseLeave = () => {
      // Smoothly drift toward resting position with softer ambient glow
      targetX = heroEl.clientWidth * 0.52;
      targetY = heroEl.clientHeight * 0.42;
      targetOpacity = 0.65;
    };

    // Smooth continuous animation loop using lerp (fluid lag)
    const lerpFactor = 0.082;
    const animate = () => {
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;
      currentOpacity += (targetOpacity - currentOpacity) * 0.05;

      glowEl.style.transform = `translate3d(${Math.round(currentX * 10) / 10}px, ${Math.round(currentY * 10) / 10}px, 0) translate(-50%, -50%)`;
      glowEl.style.opacity = String(Math.round(currentOpacity * 100) / 100);

      rafId = requestAnimationFrame(animate);
    };

    heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroEl.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    heroEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseenter', handleMouseEnter);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

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

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(personalInfo.email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = personalInfo.email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section 
      id="top" 
      ref={heroRef}
      className="relative z-0 isolate min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-slate-50 dark:bg-[#080A0B] bg-grid-subtle transition-colors duration-300"
    >
      {/* Interactive Cursor-Following Lime-Yellow / Olive Ambient Glow */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[580px] h-[580px] sm:w-[740px] sm:h-[740px] lg:w-[860px] lg:h-[860px] rounded-full pointer-events-none -z-10 will-change-transform transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(217, 249, 106, 0.22) 0%, rgba(197, 245, 74, 0.16) 18%, rgba(163, 230, 53, 0.10) 36%, rgba(132, 204, 22, 0.05) 55%, rgba(101, 163, 13, 0.02) 75%, transparent 100%)',
          filter: 'blur(45px)',
          opacity: 0,
        }}
        aria-hidden="true"
      />

      {/* Signature Glowing Glass Sphere from Lovable visual identity */}
      <div 
        className="absolute top-1/4 right-[10%] lg:right-[15%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full pointer-events-none -z-10 opacity-70 dark:opacity-80 transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(197, 245, 74, 0.22) 0%, rgba(59, 130, 246, 0.16) 45%, rgba(249, 115, 22, 0.08) 75%, transparent 100%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 left-[5%] w-[320px] h-[320px] rounded-full pointer-events-none -z-10 opacity-50 dark:opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(197, 245, 74, 0.08) 50%, transparent 80%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Split Hero: Content & Profile Card */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-14 sm:mb-16">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <Reveal direction="up" delay={50}>
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#12171A] border border-slate-200 dark:border-[#C5F54A]/30 text-slate-800 dark:text-[#C5F54A] text-xs font-mono mb-5 hover:border-[#C5F54A]/60 transition-colors cursor-default shadow-sm"
                title="System Status: Open to Full Stack & Frontend opportunities"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5F54A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5F54A]"></span>
                </span>
                <span className="font-semibold text-slate-900 dark:text-[#C5F54A]">Available for Opportunities</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-600 dark:text-slate-300">Full Stack & Frontend</span>
              </div>
            </Reveal>

            {/* Prominent Name as Main Visual Focus */}
            <Reveal direction="up" delay={120}>
              <div className="mb-2 sm:mb-3">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black text-slate-900 dark:text-white tracking-tight leading-[1.02] drop-shadow-sm">
                  <span>{personalInfo.name}</span>
                  <span className="text-[#C5F54A] font-black inline-block ml-1 select-none">.</span>
                </h1>
              </div>
            </Reveal>

            {/* Headline with Dynamic Keyword Switcher */}
            <Reveal direction="up" delay={200}>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-[1.2] sm:leading-[1.18] mb-3 text-balance">
                <span>Building scalable web apps with </span>
                <span className="inline-block relative text-[#C5F54A] min-w-[240px] sm:min-w-[320px]">
                  <span 
                    className={`inline-block transition-all duration-300 transform ${
                      isFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  >
                    {rotatingKeywords[keywordIndex]}
                  </span>
                  <span className="animate-pulse text-[#C5F54A] ml-0.5">_</span>
                </span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={280}>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 dark:bg-[#C5F54A]/10 border border-blue-500/20 dark:border-[#C5F54A]/25 text-blue-600 dark:text-[#C5F54A] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#C5F54A]"></span>
                  {personalInfo.role}
                </span>
                <span className="text-slate-400 dark:text-slate-600">/</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{personalInfo.roleStack}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-7 leading-relaxed max-w-xl">
                BCA Software Development student engineering robust, production-grade applications with React, modular Express.js REST APIs, performant state workflows, and structured MongoDB schemas.
              </p>
            </Reveal>

            <Reveal direction="up" delay={350}>
              {/* Primary & Secondary CTA Hierarchy */}
              <div className="flex flex-wrap items-center gap-3 mb-7 w-full sm:w-auto">
                {/* Primary CTA with Neon Lime Glow */}
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5F54A] hover:bg-[#D4F76E] text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#C5F54A]/25 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
                >
                  <span>Explore Featured Work</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                {/* Secondary CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-[#12171A] hover:bg-slate-100 dark:hover:bg-[#161C20] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
                >
                  Contact Me
                </a>

                {/* Tertiary Resume CTA */}
                {personalInfo.resumeUrl && (
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-3.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-[#C5F54A] font-medium text-xs sm:text-sm transition-colors focus:outline-none focus-visible:underline"
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
                className="relative rounded-2xl bg-white dark:bg-[#101315] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-[#C5F54A]/30 p-5 sm:p-6 shadow-xl dark:shadow-2xl dark:shadow-black/70 overflow-hidden group transform-gpu transition-colors"
              >
                {/* Dynamic Specular Glare following mouse */}
                {isCardHovered && (
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl opacity-40 transition-opacity"
                    style={{
                      background: `radial-gradient(circle 300px at ${50 + cardTilt.x * 4}% ${50 - cardTilt.y * 4}%, rgba(197, 245, 74, 0.15), transparent 70%)`
                    }}
                    aria-hidden="true"
                  />
                )}
                
                {/* Profile Image & Role Signature */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.06]">
                  <img
                    src={myProfileImg}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 dark:from-[#101315] via-transparent to-transparent opacity-85"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-white/95 dark:bg-[#12171A]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 shadow-sm">
                    <span className="font-semibold text-slate-900 dark:text-white">Full Stack MERN</span>
                    <span className="text-blue-600 dark:text-[#C5F54A] font-medium">React · Node · Mongo</span>
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
                    <span className="text-blue-600 dark:text-[#C5F54A] font-medium">AI / ML & System Design</span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#101315] border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#C5F54A] font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  AI / ML
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F54A] opacity-75"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">Current Learning</p>
            </div>
            
            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  MERN
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">Full Stack Core</p>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  4+ Apps
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">Shipped to Web</p>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-default">
              <div className="flex items-center justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                  2027
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F54A] opacity-60"></span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-mono">BCA Candidate</p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}