import React, { useState, useEffect, useRef } from 'react';
import FloatingSphere from './FloatingSphere';
import RotatingLogo from './RotatingLogo';
import EnergyOrb from './EnergyOrb';

const SUGGESTED_PROMPTS = [
  "What’s your strongest project?",
  "What’s your tech stack?",
  "Are you open to internships?",
  "I’d like to leave you a message"
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const lastPromptRef = useRef('');
  const messageCounterRef = useRef(0);

  // Check backend AI configuration status on mount
  useEffect(() => {
    fetch('/api/chat/status')
      .then(res => res.json())
      .then(data => {
        setIsConfigured(Boolean(data.configured));
      })
      .catch(() => {
        setIsConfigured(false);
      });
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle Escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    lastPromptRef.current = text;
    setInputValue('');
    setErrorMsg(null);

    messageCounterRef.current += 1;
    const userMessage = {
      role: 'user',
      content: text,
      id: `user-${messageCounterRef.current}`
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            content: m.content
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.configured === false) {
          setIsConfigured(false);
          throw new Error("I'm currently resting while my server API key is configured. You can explore Noor's projects, resume, or contact Noor directly!");
        }
        throw new Error(data.error || 'Unable to connect to the assistant right now. Please try again.');
      }

      messageCounterRef.current += 1;
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          id: `assistant-${messageCounterRef.current}`
        }
      ]);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to connect to the assistant.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastPromptRef.current) {
      handleSendMessage(lastPromptRef.current);
    }
  };

  const renderFormattedContent = (content) => {
    // Parser for markdown links [text](url) and **bold**
    const parts = content.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

    return parts.map((part, i) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5F54A] font-semibold underline hover:text-[#b4e637] transition-colors inline-flex items-center gap-0.5"
          >
            {linkMatch[1]}
            <svg className="w-3 h-3 inline-block shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      }

      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      if (boldMatch) {
        return <strong key={i} className="font-semibold text-white">{boldMatch[1]}</strong>;
      }

      return part;
    });
  };

  return (
    <>
      {/* Floating Launcher Hover Button Matching Image 2 */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open Ask Noor anything AI Assistant"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 pl-2.5 pr-4.5 py-2 bg-[#0B0F12]/95 hover:bg-[#12181B] text-white border border-[#C5F54A]/35 hover:border-[#C5F54A] rounded-full shadow-2xl shadow-black/80 hover:shadow-[0_0_24px_rgba(197,245,74,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C5F54A] cursor-pointer backdrop-blur-xl"
      >
        {/* Animated 3D Energy Orb as shown in Image 2 */}
        <div className="relative flex items-center justify-center">
          <EnergyOrb size={28} glow={false} />
          {/* Subtle Live Status Indicator Badge */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5F54A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C5F54A] border border-black shadow-[0_0_6px_#C5F54A]"></span>
          </span>
        </div>

        {/* Button Label */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-[13px] font-mono font-bold tracking-wide text-white group-hover:text-[#C5F54A] transition-colors">
            Ask Noor anything
          </span>
        </div>
      </button>

      {/* Floating Chat Modal Panel Matching Reference */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-2.5 sm:p-6 bg-black/65 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Ask Noor anything AI Chat Assistant"
            onClick={e => e.stopPropagation()}
            className="relative w-full sm:w-[480px] md:w-[500px] max-h-[92vh] sm:max-h-[660px] flex flex-col bg-[#0A0E10]/95 backdrop-blur-xl border border-[#C5F54A]/35 rounded-[28px] shadow-2xl shadow-black/85 overflow-hidden bg-grid-subtle transition-all duration-300"
          >
            {/* Ambient Background Glow inside panel */}
            <div 
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none -z-10 opacity-35"
              style={{
                background: 'radial-gradient(circle, rgba(197, 245, 74, 0.22) 0%, rgba(245, 158, 11, 0.14) 45%, transparent 75%)',
                filter: 'blur(45px)',
              }}
              aria-hidden="true"
            />

            {/* Clean Minimalist Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/[0.06] bg-[#070B0D]/60 shrink-0">
              <div className="flex items-center gap-3">
                <RotatingLogo size={22} />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                    Ask Noor anything
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 flex items-center gap-1.5 uppercase mt-0.5">
                    <span 
                      className={`w-1.5 h-1.5 rounded-full ${isConfigured ? 'bg-[#C5F54A] shadow-[0_0_8px_#C5F54A]' : 'bg-emerald-400'}`}
                      title={isConfigured ? 'AI Twin Active' : 'Online'}
                    ></span>
                    <span>AI TWIN · MESSAGES REACH ME</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setMessages([]);
                      setErrorMsg(null);
                    }}
                    aria-label="Start new conversation"
                    className="text-[11px] font-mono text-slate-400 hover:text-[#C5F54A] px-2.5 py-1 rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer"
                    title="Start new conversation"
                  >
                    New chat
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat assistant"
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            {messages.length === 0 ? (
              /* Initial Welcome State Matching Reference Screenshot */
              <div className="flex-1 overflow-y-auto px-5 py-6 sm:py-7 flex flex-col items-center justify-center text-center">
                {/* Centered Glass Energy Orb with Dark Circular Surround */}
                <div className="mb-4 sm:mb-5">
                  <FloatingSphere isLoading={isLoading} />
                </div>

                {/* Centered Heading */}
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  Hey, I’m Noor’s AI twin 👋
                </h2>

                {/* Centered Muted Description */}
                <p className="text-xs sm:text-sm text-slate-400 max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-6">
                  Ask about my skills, projects, or leave a message — I read every one.
                </p>

                {/* 4 Centered Rounded Pill Question Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                      className="rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium bg-[#13191C]/90 hover:bg-[#1A2328] border border-white/10 hover:border-[#C5F54A]/40 text-slate-200 hover:text-white transition-all shadow-xs hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Active Conversation Stream */
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 max-h-[440px] text-sm scrollbar-thin">
                <div className="flex items-center justify-center gap-2 py-1 text-slate-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5F54A]"></span>
                  <span>Conversation with Noor’s AI twin</span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere] ${
                        msg.role === 'user'
                          ? 'bg-[#C5F54A] text-slate-950 font-medium rounded-br-xs shadow-md shadow-[#C5F54A]/10'
                          : 'bg-[#13191C] text-slate-200 border border-white/[0.08] rounded-bl-xs shadow-md shadow-black/40'
                      }`}
                    >
                      {renderFormattedContent(msg.content)}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#13191C] border border-white/[0.08] rounded-2xl rounded-bl-xs px-4 py-3 flex items-center gap-1.5 shadow-md shadow-black/40">
                      <span className="w-2 h-2 rounded-full bg-[#C5F54A] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#C5F54A] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#C5F54A] animate-bounce"></span>
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3.5 bg-red-950/30 border border-red-500/30 rounded-xl text-xs text-red-200 space-y-2">
                    <p className="leading-relaxed">{errorMsg}</p>
                    <div className="flex items-center gap-2 pt-1 border-t border-red-500/20">
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="text-[11px] font-mono text-[#C5F54A] hover:underline font-semibold cursor-pointer"
                      >
                        Try again ↺
                      </button>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Large Bottom Input Area with Thin Lime-Green Outline */}
            <div className="p-4 sm:p-5 pt-2 bg-transparent shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center bg-[#0D1214] border border-[#C5F54A]/50 focus-within:border-[#C5F54A] focus-within:ring-1 focus-within:ring-[#C5F54A]/40 rounded-2xl p-1.5 sm:p-2 transition-all shadow-[0_0_20px_rgba(197,245,74,0.12)]"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm px-3.5 py-2 sm:py-2.5 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-xl bg-[#C5F54A] hover:bg-[#D4F76E] disabled:opacity-30 disabled:hover:bg-[#C5F54A] flex items-center justify-center text-slate-950 transition-all font-bold shrink-0 cursor-pointer shadow-sm active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
