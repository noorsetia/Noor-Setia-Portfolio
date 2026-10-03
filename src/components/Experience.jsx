import React from 'react';
import Reveal from './Reveal';
import { experiences } from '../data/experienceData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <Reveal direction="up" delay={0}>
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
              Experience & Education
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl">
              My academic journey and professional leadership experience.
            </p>
            <div className="w-20 h-1.5 bg-indigo-600 dark:bg-indigo-500 mt-8 rounded-full"></div>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative border-l-2 border-indigo-100 dark:border-slate-800 ml-3 md:ml-6 space-y-12 md:space-y-16">
          {experiences.map((item, index) => (
            <Reveal key={index} direction="up" delay={200 + (index * 150)} className="relative pl-8 md:pl-12">
              
              {/* Timeline Dot */}
              <div className="absolute w-5 h-5 bg-indigo-600 dark:bg-indigo-500 rounded-full -left-[11px] top-1.5 ring-4 ring-white dark:ring-slate-900 shadow-sm"></div>
              
              {/* Content Card */}
              <div className="bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-colors duration-300 shadow-sm group">
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 block">
                      {item.type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mt-1">
                      {item.organization}
                    </h4>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium md:mt-1 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 w-fit shrink-0">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"></path></svg>
                    {item.date}
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {item.details.map((desc, idx) => (
                    <li key={idx} className="flex items-start text-slate-600 dark:text-slate-400 leading-relaxed">
                      <svg className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}