import React from 'react';
import { personalInfo } from '../data/personalInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.socialLinks.github, 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: personalInfo.socialLinks.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: personalInfo.socialLinks.email,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path>
        </svg>
      )
    }
  ];

  return (
    // Slightly darker background for the footer in dark mode to distinguish it
    <footer className="bg-slate-50 dark:bg-[#0b1121] pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Row: Logo & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6 md:mb-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            &lt;dev/&gt;
          </a>

          {/* Social Links & Resume */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name} 
                href={link.url} 
                aria-label={link.name} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 -m-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
            
            {/* Resume Button */}
            <a 
              href={personalInfo.resumeUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-white transition-all duration-300 font-medium text-sm"
            >
              {/* Document Icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800 mb-8"></div>

        {/* Bottom Row: Copyright */}
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
          &copy; {currentYear} {personalInfo.name}. Built with React & Tailwind CSS.
        </p>
        
      </div>
    </footer>
  );
}
