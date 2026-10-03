import React from 'react';
import Reveal from './Reveal';
import { skillsList } from '../data/skillsData';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto overflow-hidden">
      <Reveal direction="left">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12 flex items-center">
          <span className="text-indigo-600 dark:text-indigo-500 mr-3 font-mono text-2xl">02.</span> Technical Skills
          <div className="ml-6 h-[1px] bg-slate-300 dark:bg-slate-700 flex-grow max-w-xs"></div>
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
        {skillsList.map((skill, index) => (
          <Reveal direction="up" key={index} delay={index * 50}>
            <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-xl p-3 sm:p-4 flex items-center space-x-2 sm:space-x-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 group">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-white transition-colors leading-tight">{skill}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
