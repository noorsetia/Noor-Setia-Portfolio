import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/personalInfo';

export default function CommandPalette({ isOpen, onClose, onToggleTheme, isDarkMode }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const actions = [
    { id: 'about', label: 'Go to About & Engineering Mindset', category: 'Navigation', icon: '↗', action: () => scrollTo('#about') },
    { id: 'skills', label: 'Go to Technical Arsenal & Skills', category: 'Navigation', icon: '↗', action: () => scrollTo('#skills') },
    { id: 'projects', label: 'Go to Production Projects', category: 'Navigation', icon: '↗', action: () => scrollTo('#projects') },
    { id: 'experience', label: 'Go to Experience & Timeline', category: 'Navigation', icon: '↗', action: () => scrollTo('#experience') },
    { id: 'contact', label: 'Go to Contact & Direct Channels', category: 'Navigation', icon: '↗', action: () => scrollTo('#contact') },
    { id: 'theme', label: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Theme`, category: 'Preferences', icon: isDarkMode ? '☀' : '☾', action: onToggleTheme },
    { id: 'copy-email', label: 'Copy Email Address', category: 'Quick Action', icon: '📋', action: () => copyText(personalInfo.email) },
    { id: 'copy-phone', label: 'Copy Phone Number', category: 'Quick Action', icon: '📋', action: () => copyText(personalInfo.phone) },
    { id: 'resume', label: 'Open Resume (Google Drive)', category: 'Links', icon: '↗', action: () => openExternal(personalInfo.resumeUrl) },
    { id: 'github', label: 'Open GitHub Profile', category: 'Links', icon: '↗', action: () => openExternal(personalInfo.socialLinks.github) },
    { id: 'linkedin', label: 'Open LinkedIn Profile', category: 'Links', icon: '↗', action: () => openExternal(personalInfo.socialLinks.linkedin) },
  ];

  const openExternal = (url) => {
    onClose();
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  const scrollTo = (hash) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyText = async (text) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch {
      // fallback
    }
    onClose();
  };

  const filtered = actions.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const safeIndex = Math.min(selectedIndex, Math.max(0, filtered.length - 1));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[safeIndex]) {
        filtered[safeIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#101315] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 animate-scale-up"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/[0.08] gap-3">
          <svg className="w-5 h-5 text-slate-400 dark:text-[#C5F54A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.06] rounded border border-slate-200 dark:border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = idx === safeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-[#C5F54A] text-slate-950 font-bold shadow-sm' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs opacity-75">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                    isSelected ? 'bg-slate-950/20 text-slate-950 font-semibold' : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Keyboard Navigation Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#0C0F12] border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="font-semibold text-slate-700 dark:text-slate-300">↑↓</kbd> Navigate</span>
            <span><kbd className="font-semibold text-slate-700 dark:text-slate-300">↵</kbd> Select</span>
          </div>
          <span className="text-[#C5F54A] font-semibold">Command Menu</span>
        </div>
      </div>
    </div>
  );
}
