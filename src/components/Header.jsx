import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/personalInfo';

export default function Header({ isDarkMode, onToggleTheme, onOpenCommandPalette }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Calculate scroll progress percentage
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }

      // Scroll spy for active section
      const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
      let current = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-[#080A0B]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-lg dark:shadow-black/50' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Top Reading Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#C5F54A] via-blue-500 to-cyan-400 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#top" 
          onClick={scrollToTop}
          className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-[#C5F54A] transition-colors whitespace-nowrap shrink-0 font-mono flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded-lg p-1 group"
          aria-label="Noor Setia Portfolio — Back to top"
        >
          <span className="text-[#C5F54A] transition-transform group-hover:-translate-x-0.5">&lt;</span>
          <span>NoorSetia</span>
          <span className="text-[#C5F54A] transition-transform group-hover:translate-x-0.5">/&gt;</span>
        </a>

        {/* Zone 2: Navigation Links with Active Indicator */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded px-1.5 ${
                  isActive 
                    ? 'text-blue-600 dark:text-[#C5F54A] font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-blue-600 dark:bg-[#C5F54A] rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Command Palette, Theme Toggle & Contact CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Quick Command Palette Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-[#12171A] dark:hover:bg-[#161C20] border border-slate-300 dark:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] cursor-pointer"
            aria-label="Open command menu (Ctrl+K or Cmd+K)"
            title="Open command menu"
          >
            <svg className="w-3.5 h-3.5 text-[#C5F54A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[11px]">Search</span>
            <kbd className="text-[10px] bg-white dark:bg-black/60 px-1 py-0.5 rounded border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] cursor-pointer"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-700 transition-transform hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-[#C5F54A] hover:bg-[#D4F76E] rounded-lg transition-all shadow-md shadow-[#C5F54A]/20 whitespace-nowrap shrink-0 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
          >
            Get In Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-white dark:bg-[#0A0E17] border-b border-slate-200 dark:border-white/[0.08] px-6 py-5 shadow-xl transition-all">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium px-3 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] ${
                  activeSection === link.id
                    ? 'bg-[#C5F54A]/10 text-blue-600 dark:text-[#C5F54A] font-semibold border border-[#C5F54A]/30'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#C5F54A] hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-blue-600 dark:text-[#C5F54A] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded p-1"
              >
                View Resume ↗
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-[#C5F54A] text-slate-950 text-xs font-bold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] shadow-md shadow-[#C5F54A]/20"
              >
                Get In Touch
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}