import React, { useState, useEffect, useRef } from 'react';
import FloatingSphere from './FloatingSphere';
import RotatingLogo from './RotatingLogo';
import EnergyOrb from './EnergyOrb';
import energySphereImage from '../assets/generated-energy-sphere.png';

const SUGGESTED_PROMPTS = [
  "Tell me about the NESTORA project.",
  "What’s your tech stack?",
  "What did Noor work on at Vedonyx?",
  "Is Noor open to internships?"
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const [launcherImageFailed, setLauncherImageFailed] = useState(false);
  
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const lastPromptRef = useRef('');
  const lastUserMessageIdRef = useRef(null);
  const requestInFlightRef = useRef(false);
  const messageCounterRef = useRef(0);

  // Check backend AI configuration status on mount
  useEffect(() => {
    fetch('/api/chat/status', { headers: { Accept: 'application/json' } })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(data => {
        if (!data.ok && import.meta.env.DEV) {
          console.warn('[Ask Noor] status request failed', {
            endpoint: '/api/chat/status',
            configured: Boolean(data.data?.configured),
            error: typeof data.data?.error === 'string' ? data.data.error : 'No JSON error provided',
          });
        }
        setIsConfigured(Boolean(data.ok && data.data.configured));
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn('[Ask Noor] status request could not reach the API', {
            endpoint: '/api/chat/status',
            name: error?.name || 'Error',
            message: error?.message || 'Unknown network error',
          });
        }
        setIsConfigured(false);
      });
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (isOpen && container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(focusTimer);
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

  const handleSendMessage = async (textToSend, { appendUserMessage = true } = {}) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputValue).trim();
    if (!text || requestInFlightRef.current || isLoading) return;

    requestInFlightRef.current = true;
    setInputValue('');
    if (appendUserMessage) lastPromptRef.current = text;

    const history = messages
      .filter(message => message.role === 'user' || message.role === 'assistant')
      .filter(message => appendUserMessage || message.id !== lastUserMessageIdRef.current)
      .slice(-12)
      .map(message => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        content: message.content,
      }));

    if (appendUserMessage) {
      messageCounterRef.current += 1;
      const userMessage = {
        role: 'user',
        content: text,
        id: `user-${messageCounterRef.current}`
      };
      lastUserMessageIdRef.current = userMessage.id;
      setMessages(prev => [...prev.filter(message => message.role !== 'system'), userMessage]);
    } else {
      setMessages(prev => prev.filter(message => message.role !== 'system'));
    }
    setIsLoading(true);

    let timeout;
    try {
      const controller = new AbortController();
      timeout = window.setTimeout(() => controller.abort(), 20000);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          history,
        })
      });

      window.clearTimeout(timeout);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (import.meta.env.DEV) {
          console.warn('[Ask Noor] chat request failed', {
            endpoint: '/api/chat',
            status: response.status,
            configured: data.configured,
            error: typeof data.error === 'string' ? data.error : 'No JSON error provided',
          });
        }
        if (data.configured === false) {
          setIsConfigured(false);
          throw new Error("I’m having trouble connecting right now. You can explore Noor’s projects or contact Noor directly.");
        }
        if (response.status === 429) {
          throw new Error(data.error || 'The assistant is busy. Please wait a moment and try again.');
        }
        if (response.status === 400) {
          throw new Error(data.error || 'Please shorten your message and try again.');
        }
        throw new Error('I couldn’t get a response right now. Please try again.');
      }

      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('The assistant returned an invalid response. Please try again.');
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
      if (import.meta.env.DEV) {
        console.warn('[Ask Noor] chat request could not complete', {
          endpoint: '/api/chat',
          name: err?.name || 'Error',
          message: err?.message || 'Unknown network error',
        });
      }
      const message = err?.name === 'AbortError'
        ? 'The response took too long. Please try again.'
        : (err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'I’m having trouble connecting right now. You can explore Noor’s projects or contact Noor directly.');
      messageCounterRef.current += 1;
      setMessages(prev => [
        ...prev.filter(item => item.role !== 'system'),
        { role: 'system', content: message, id: `error-${messageCounterRef.current}` },
      ]);
    } finally {
      window.clearTimeout(timeout);
      requestInFlightRef.current = false;
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastPromptRef.current) {
      handleSendMessage(lastPromptRef.current, { appendUserMessage: false });
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
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open Ask Noor AI"
        className="ai-launcher fixed bottom-6 right-6 z-40 group flex h-[50px] w-[160px] items-center justify-between rounded-full bg-[#C5F54A] px-2.5 text-slate-950 shadow-[0_8px_24px_rgba(197,245,74,0.2)] transition-[width,padding,box-shadow,background-color] duration-300 ease-out hover:w-[180px] hover:bg-[#D4F76E] hover:shadow-[0_10px_30px_rgba(197,245,74,0.4)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] cursor-pointer"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black">
          {launcherImageFailed ? (
            <EnergyOrb size={32} animate={false} glow={false} />
          ) : (
            <img
              src={energySphereImage}
              alt=""
              onError={() => setLauncherImageFailed(true)}
              decoding="async"
              width="32"
              height="32"
              className="h-full w-full rounded-full object-cover"
              draggable="false"
            />
          )}
        </span>

        <span className="whitespace-nowrap text-[13px] font-semibold tracking-tight">
          Ask Noor AI
        </span>

        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7.25 6.5h5.5A4.25 4.25 0 0117 10.75v.5a4.25 4.25 0 01-4.25 4.25H9.5l-3 2.25v-3.05a4.25 4.25 0 01-1.5-3.2v-.75A4.25 4.25 0 017.25 6.5z" />
        </svg>
      </button>

      {/* Floating Chat Modal Panel Matching Reference */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Ask Noor anything AI Chat Assistant"
            onClick={e => e.stopPropagation()}
            className="fixed bottom-[82px] right-6 w-[min(360px,calc(100vw-48px))] h-[min(530px,calc(100vh-106px))] flex flex-col bg-[#0A0E10]/80 backdrop-blur-xl border border-[#C5F54A]/45 rounded-[22px] shadow-2xl shadow-black/85 overflow-hidden bg-grid-subtle transition-all duration-300"
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
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#070B0D]/45 shrink-0">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/80">
                  <RotatingLogo size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight leading-tight">
                    Ask Noor anything
                  </h3>
                  <p className="text-[9px] font-mono tracking-wide text-slate-400 flex items-center gap-1 uppercase mt-0.5 whitespace-nowrap">
                    <span 
                      className={`w-1.5 h-1.5 rounded-full ${isConfigured ? 'bg-[#C5F54A] shadow-[0_0_8px_#C5F54A]' : 'bg-emerald-400'}`}
                      title={isConfigured ? 'AI Twin Active' : 'Online'}
                    ></span>
                    <span>AI TWIN · MESSAGES REACH ME</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat assistant"
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            {messages.length === 0 ? (
              /* Initial Welcome State Matching Reference Screenshot */
              <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 sm:py-4 flex flex-col items-center justify-center text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {/* Centered Glass Energy Orb with Dark Circular Surround */}
                <div className="mb-2 flex items-center justify-center">
                  <FloatingSphere isLoading={isLoading} />
                </div>

                {/* Centered Heading */}
                <h2 className="text-base sm:text-[17px] font-bold text-white tracking-tight mb-2">
                  Hey, I’m Noor’s AI twin 👋
                </h2>

                {/* Centered Muted Description */}
                <p className="text-xs sm:text-[13px] text-slate-400 max-w-[300px] mx-auto leading-relaxed mb-3">
                  Ask about my skills, projects, or leave a message — I read every one.
                </p>

                {/* 4 Centered Rounded Pill Question Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[330px] mx-auto">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                      className="rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-medium bg-[#13191C]/75 hover:bg-[#1A2328] border border-white/10 hover:border-[#C5F54A]/40 text-slate-300 hover:text-white transition-all shadow-xs hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Active Conversation Stream */
              <div ref={messagesContainerRef} className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                      role={msg.role === 'system' ? 'alert' : undefined}
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap [overflow-wrap:anywhere] ${
                        msg.role === 'user'
                          ? 'bg-[#C5F54A] text-slate-950 font-medium rounded-br-xs shadow-md shadow-[#C5F54A]/10'
                          : msg.role === 'system'
                            ? 'bg-red-950/30 text-red-200 border border-red-500/30 rounded-bl-xs shadow-md shadow-black/40'
                            : 'bg-[#13191C] text-slate-200 border border-white/[0.08] rounded-bl-xs shadow-md shadow-black/40'
                      }`}
                    >
                      {msg.role === 'system' ? (
                        <div className="space-y-2">
                          <p>{msg.content}</p>
                          <div className="flex items-center gap-2 pt-1 border-t border-red-500/20">
                            <button
                              type="button"
                              onClick={handleRetry}
                              disabled={isLoading}
                              className="text-[11px] font-mono text-[#C5F54A] hover:underline font-semibold cursor-pointer disabled:opacity-50"
                            >
                              Try again ↺
                            </button>
                            <a href="#projects" className="text-[11px] font-mono text-slate-300 hover:text-white hover:underline">
                              Projects
                            </a>
                            <a href="#contact" className="text-[11px] font-mono text-slate-300 hover:text-white hover:underline">
                              Contact
                            </a>
                          </div>
                        </div>
                      ) : renderFormattedContent(msg.content)}
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

              </div>
            )}

            {/* Large Bottom Input Area with Thin Lime-Green Outline */}
            <div className="p-3 sm:p-4 pt-2 bg-transparent shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-end bg-[#0D1214]/85 border border-[#C5F54A]/75 focus-within:border-[#C5F54A] focus-within:ring-1 focus-within:ring-[#C5F54A]/40 rounded-2xl p-2 transition-all shadow-[0_0_20px_rgba(197,245,74,0.12)]"
              >
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  rows={2}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 min-w-0 resize-none bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm px-1.5 py-1.5 focus:outline-none"
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
