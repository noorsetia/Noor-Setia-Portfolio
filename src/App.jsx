import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // Default to signature obsidian dark theme
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Keyboard shortcut for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show / hide floating back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-[#080A0B] dark:text-[#F3F3EF] font-sans selection:bg-[#C5F54A] selection:text-[#080A0B] transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme} 
        onOpenCommandPalette={() => setIsCommandOpen(true)} 
      />
      
      <main>
        <Hero onOpenCommandPalette={() => setIsCommandOpen(true)} />
        <About />
        <Skills />
        <Projects onOpenProjectModal={(project) => setSelectedProject(project)} />
        <Experience /> 
        <Contact />
      </main>

      <Footer />

      {/* Floating Ask Noor AI Assistant Launcher */}
      <ChatAssistant />

      {/* Interactive Command Palette Modal (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onToggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Accessible Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-30 p-3 rounded-xl bg-white dark:bg-[#101315] text-slate-700 dark:text-slate-200 hover:text-[#C5F54A] dark:hover:text-[#C5F54A] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/60 hover:-translate-y-1 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] animate-fade-in group"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}