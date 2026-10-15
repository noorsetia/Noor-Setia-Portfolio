import React from 'react';
import { personalInfo } from '../data/personalInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#080A0B] border-t border-slate-200 dark:border-white/[0.08] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <a 
            href="#top" 
            onClick={scrollToTop}
            className="text-lg font-bold font-mono tracking-tight text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-[#C5F54A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded p-1"
            aria-label="Noor Setia Portfolio — Back to top"
          >
            <span className="text-[#C5F54A]">&lt;</span>NoorSetia <span className="text-[#C5F54A]">/&gt;</span>
          </a>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            Full Stack MERN Developer
          </p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
          <a 
            href={personalInfo.socialLinks.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-[#C5F54A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded px-1"
          >
            GitHub
          </a>
          <a 
            href={personalInfo.socialLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-[#C5F54A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded px-1"
          >
            LinkedIn
          </a>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="hover:text-slate-900 dark:hover:text-[#C5F54A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded px-1"
          >
            Email
          </a>
          {personalInfo.resumeUrl && (
            <a 
              href={personalInfo.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#C5F54A] hover:underline transition-colors font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded px-1"
            >
              Resume ↗
            </a>
          )}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500 font-mono">
          &copy; {currentYear} {personalInfo.name}. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
