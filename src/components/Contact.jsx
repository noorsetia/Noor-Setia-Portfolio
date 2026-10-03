import React, { useState } from 'react';
import Reveal from './Reveal';
import { personalInfo } from '../data/personalInfo';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "3bee2b90-fa51-415d-90b1-a076db166e2b", 
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrors({ submit: "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto mb-10 overflow-hidden">
      
      <Reveal direction="up" delay={0}>
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
            Let's Build Something Solid
          </h2>
          <div className="w-24 h-1.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-6 mb-8 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Looking for a developer who delivers production-ready solutions? Let's connect.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COLUMN - FORM */}
        <Reveal direction="left" delay={200} className="order-2 md:order-1">
          {isSubmitted ? (
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-10 rounded-2xl text-center h-full flex flex-col justify-center items-center shadow-sm">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h4>
              <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. I'll check my email and get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <input
                  type="text" id="name" name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting}
                  className={`w-full bg-slate-50 dark:bg-[#111827] border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-800'} rounded-xl px-4 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email" id="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting}
                  className={`w-full bg-slate-50 dark:bg-[#111827] border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-800'} rounded-xl px-4 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea
                  id="message" name="message" rows="6" value={formData.message} onChange={handleChange} disabled={isSubmitting}
                  className={`w-full bg-slate-50 dark:bg-[#111827] border ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-800'} rounded-xl px-4 py-3.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 resize-none disabled:opacity-50`}
                  placeholder="Tell me about your project..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              {errors.submit && <p className="text-sm text-red-500 text-center">{errors.submit}</p>}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-indigo-500/20 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5 ml-2 transform -rotate-45 -mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>

        {/* RIGHT COLUMN - INFO */}
        <Reveal direction="right" delay={400} className="order-1 md:order-2">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h3>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-10">
            I'm always open to discussing new projects, opportunities, or partnerships. Whether you need a full-stack developer or just want to say hello, feel free to reach out.
          </p>

          <div className="space-y-4 mb-10">
            {/* Email Card */}
            <div className="flex items-center p-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/80 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Email</p>
                <p className="text-slate-900 dark:text-white font-medium truncate"><a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{personalInfo.email}</a></p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-center p-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/80 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Phone</p>
                <p className="text-slate-900 dark:text-white font-medium">{personalInfo.phone}</p>
                <p className="text-slate-900 dark:text-white font-medium"><a href={`tel:${personalInfo.phone.replace(/[\s-]/g, '')}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{personalInfo.phone}</a></p>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center p-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/80 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Location</p>
                <p className="text-slate-900 dark:text-white font-medium">{personalInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Social Connect */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Connect on Social</p>
            <div className="flex space-x-4">
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}