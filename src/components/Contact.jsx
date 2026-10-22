import React, { useRef, useState } from 'react';
import Reveal from './Reveal';
import { personalInfo } from '../data/personalInfo';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const submissionInFlightRef = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.submit) setErrors((prev) => ({ ...prev, [name]: '', submit: '' }));
  };

  const copyToClipboard = async (text, label) => {
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
      setCopyFeedback(`${label} copied to clipboard!`);
    } catch {
      setCopyFeedback(`${label}: ${text}`);
    }
    setTimeout(() => setCopyFeedback(''), 3000);
  };

  const validate = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const newErrors = {};
    if (!name) newErrors.name = 'Please provide your name';
    if (!email) newErrors.email = 'Please provide an email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address';
    if (!message) newErrors.message = 'Please write a message';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submissionInFlightRef.current) return;
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrors({ submit: 'The contact form is not configured yet. Please email Noor directly.' });
      return;
    }

    submissionInFlightRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || `Portfolio contact from ${formData.name.trim()}`,
          message: formData.message.trim(),
          botcheck: false,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success === true) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setErrors({ submit: result?.message || result?.body?.message || "Unable to send your message. Please email directly." });
      }
    } catch {
      setErrors({ submit: "The contact service is unavailable. Your message is still here, so please retry or email directly." });
    } finally {
      submissionInFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 sm:py-28 px-4 sm:px-6 bg-white dark:bg-[#080A0B] transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-white/[0.04]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="mb-14 sm:mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#C5F54A]">
              05. Get In Touch
            </span>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
              Let's Build Something Solid
            </h2>
            <div className="w-16 h-1 bg-[#C5F54A] mt-4 rounded-full" aria-hidden="true"></div>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl mt-4">
              Open to Frontend and Full Stack opportunities. Let's discuss engineering roles, project collaborations, or developer ideas.
            </p>
          </div>
        </Reveal>

        {/* Copy Feedback Toast */}
        {copyFeedback && (
          <div 
            className="fixed bottom-20 right-6 sm:bottom-6 sm:right-28 z-50 bg-slate-900 dark:bg-[#101315] border border-[#C5F54A]/40 text-[#C5F54A] text-xs font-mono font-medium px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in"
            role="status"
            aria-live="polite"
          >
            <svg className="w-4 h-4 text-[#C5F54A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>{copyFeedback}</span>
          </div>
        )}

        <div className="grid md:grid-cols-12 gap-10 sm:gap-12 items-start">
          
          {/* LEFT COLUMN - INTERACTIVE FORM */}
          <div className="md:col-span-7">
            <Reveal direction="left" delay={150}>
              <div className="bg-slate-50 dark:bg-[#101315] border border-slate-200 dark:border-white/[0.08] p-5 sm:p-8 rounded-2xl shadow-sm">
                {isSubmitted ? (
                  <div className="py-12 text-center flex flex-col justify-center items-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-[#C5F54A]/10 rounded-2xl flex items-center justify-center mb-5 text-[#C5F54A] border border-[#C5F54A]/30">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Delivered</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm" role="status" aria-live="polite">
                      Your message has been sent successfully. I’ll get back to you as soon as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-xs font-mono font-semibold text-[#6f8e2e] dark:text-[#C5F54A] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded px-2 py-1"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full bg-white dark:bg-[#14191D] border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-white/[0.08]'} rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#C5F54A] focus:ring-1 focus:ring-[#C5F54A] transition-colors disabled:opacity-50`}
                        placeholder="Your name"
                        autoComplete="name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full bg-white dark:bg-[#14191D] border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-white/[0.08]'} rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#C5F54A] focus:ring-1 focus:ring-[#C5F54A] transition-colors disabled:opacity-50`}
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Subject <span className="normal-case tracking-normal font-normal text-slate-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        maxLength="200"
                        className="w-full bg-white dark:bg-[#14191D] border border-slate-300 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#C5F54A] focus:ring-1 focus:ring-[#C5F54A] transition-colors disabled:opacity-50"
                        placeholder="Internship, collaboration, or project inquiry"
                        autoComplete="off"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="contact-message" className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Project or Message Details
                        </label>
                        <span className={`text-[10px] font-mono ${
                          formData.message.length > 450 ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          {formData.message.length}/500
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="5"
                        maxLength="500"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full bg-white dark:bg-[#14191D] border ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-white/[0.08]'} rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#C5F54A] focus:ring-1 focus:ring-[#C5F54A] transition-colors resize-none disabled:opacity-50`}
                        placeholder="Tell me about your team, tech stack, or engineering opportunity..."
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      ></textarea>
                      {errors.message && <p id="message-error" className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.message}</p>}
                    </div>

                    {errors.submit && (
                      <div className="text-xs text-red-500 font-mono text-center p-2.5 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20" role="alert">
                        <p>{errors.submit}</p>
                        <button
                          type="submit"
                          className="mt-2 font-semibold underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded"
                        >
                          Retry sending
                        </button>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C5F54A] hover:bg-[#D4F76E] text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-md shadow-[#C5F54A]/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>                          Sending message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                    <input type="text" name="company" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - DIRECT DETAILS & QUICK ACTIONS */}
          <div className="md:col-span-5 space-y-6">
            <Reveal direction="right" delay={250}>
              <div className="bg-slate-50 dark:bg-[#101315] border border-slate-200 dark:border-white/[0.08] p-5 sm:p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Direct Channels</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  Feel free to reach out directly via email or phone. I usually respond within 24 hours.
                </p>

                <div className="space-y-3">
                  {/* Email Card */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#14191D] border border-slate-200 dark:border-white/[0.06] shadow-sm">
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500">Email</p>
                      <a 
                        href={`mailto:${personalInfo.email}`} 
                        className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-[#C5F54A] transition-colors truncate block focus:outline-none focus-visible:underline"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(personalInfo.email, 'Email')}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-[#C5F54A]/10 text-slate-700 dark:text-slate-300 dark:hover:text-[#C5F54A] rounded border border-slate-300 dark:border-white/[0.08] dark:hover:border-[#C5F54A]/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
                      aria-label="Copy email address to clipboard"
                    >
                      Copy
                    </button>
                  </div>

                  {/* Phone Card */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#14191D] border border-slate-200 dark:border-white/[0.06] shadow-sm">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500">Phone</p>
                      <a 
                        href={`tel:${personalInfo.phone.replace(/[\s-]/g, '')}`} 
                        className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-[#C5F54A] transition-colors focus:outline-none focus-visible:underline"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(personalInfo.phone, 'Phone')}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-[#C5F54A]/10 text-slate-700 dark:text-slate-300 dark:hover:text-[#C5F54A] rounded border border-slate-300 dark:border-white/[0.08] dark:hover:border-[#C5F54A]/30 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
                      aria-label="Copy phone number to clipboard"
                    >
                      Copy
                    </button>
                  </div>

                  {/* Location Card */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#14191D] border border-slate-200 dark:border-white/[0.06] shadow-sm">
                    <p className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500">Location</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Social Network Links */}
            <Reveal direction="right" delay={350}>
              <div className="bg-slate-50 dark:bg-[#101315] border border-slate-200 dark:border-white/[0.08] p-5 sm:p-6 rounded-2xl shadow-sm">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  Professional Profiles
                </h4>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#14191D] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-[#C5F54A]/40 transition-all text-xs sm:text-sm font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
                    aria-label="Visit Noor Setia's GitHub profile in a new tab"
                  >
                    <span>GitHub: /noorsetia</span>
                    <span className="text-blue-600 dark:text-[#C5F54A] font-mono text-xs">Explore Code ↗</span>
                  </a>

                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#14191D] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-[#C5F54A]/40 transition-all text-xs sm:text-sm font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
                    aria-label="Visit Noor Setia's LinkedIn profile in a new tab"
                  >
                    <span>LinkedIn: /in/noorsetia</span>
                    <span className="text-blue-600 dark:text-[#C5F54A] font-mono text-xs">Connect ↗</span>
                  </a>

                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#14191D] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-[#C5F54A]/40 transition-all text-xs sm:text-sm font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A]"
                    aria-label="Open Noor Setia's resume in a new tab"
                  >
                    <span>Resume</span>
                    <span className="text-blue-600 dark:text-[#C5F54A] font-mono text-xs">Open Resume ↗</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
