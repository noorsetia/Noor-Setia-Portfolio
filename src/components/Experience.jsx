import React, { useState, useMemo } from 'react';
import Reveal from './Reveal';
import { experiences } from '../data/experienceData';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const counts = useMemo(() => {
    return {
      all: experiences.length,
      work: experiences.filter(e => e.type.toLowerCase().includes('work')).length,
      education: experiences.filter(e => e.type.toLowerCase().includes('education')).length
    };
  }, []);

  const filteredExperiences = useMemo(() => {
    if (activeTab === 'all') return experiences;
    if (activeTab === 'work') return experiences.filter(e => e.type.toLowerCase().includes('work'));
    if (activeTab === 'education') return experiences.filter(e => e.type.toLowerCase().includes('education'));
    return experiences;
  }, [activeTab]);

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#080A0B] transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-white/[0.04]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#C5F54A]">
                04. Career Journey
              </span>
              <h2 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
                Experience & Education
              </h2>
              <div className="w-16 h-1 bg-[#C5F54A] mt-4 rounded-full" aria-hidden="true"></div>
            </div>

            {/* Segmented Filter Control with Counts */}
            <div 
              className="inline-flex p-1 bg-slate-200 dark:bg-[#101315] rounded-xl border border-slate-300 dark:border-white/[0.08] self-start sm:self-auto shadow-sm"
              role="tablist"
              aria-label="Filter career milestones"
            >
              <button
                role="tab"
                aria-selected={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] ${
                  activeTab === 'all'
                    ? 'bg-[#C5F54A] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>All Milestones</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  activeTab === 'all' ? 'bg-slate-950/20 text-slate-950' : 'opacity-70'
                }`}>{counts.all}</span>
              </button>
              
              <button
                role="tab"
                aria-selected={activeTab === 'work'}
                onClick={() => setActiveTab('work')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] ${
                  activeTab === 'work'
                    ? 'bg-[#C5F54A] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>Work & Leadership</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  activeTab === 'work' ? 'bg-slate-950/20 text-slate-950' : 'opacity-70'
                }`}>{counts.work}</span>
              </button>

              <button
                role="tab"
                aria-selected={activeTab === 'education'}
                onClick={() => setActiveTab('education')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] ${
                  activeTab === 'education'
                    ? 'bg-[#C5F54A] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>Education</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  activeTab === 'education' ? 'bg-slate-950/20 text-slate-950' : 'opacity-70'
                }`}>{counts.education}</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Timeline Stream */}
        <div className="relative border-l border-slate-300 dark:border-white/[0.12] ml-4 sm:ml-6 space-y-10">
          {filteredExperiences.map((item, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <Reveal key={`${item.title}-${index}`} direction="up" delay={150 + (index * 100)} className="relative pl-8 sm:pl-10">
                
                {/* Timeline Indicator Dot with Ping Animation on Hover */}
                <div className="absolute -left-[7px] top-2 flex items-center justify-center">
                  {isHovered && (
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#C5F54A] opacity-75"></span>
                  )}
                  <div className={`w-3.5 h-3.5 rounded-full ring-4 ring-slate-50 dark:ring-[#080A0B] transition-all duration-300 ${
                    isHovered ? 'bg-[#D4F76E] scale-125' : 'bg-[#C5F54A]'
                  }`}></div>
                </div>
                
                {/* Milestone Card */}
                <div 
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="bg-white dark:bg-[#101315] border border-slate-200 dark:border-white/[0.08] hover:border-[#C5F54A]/40 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm group"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#C5F54A]">
                          {item.type}
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">·</span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {item.organization}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#C5F54A] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Date Badge */}
                    <div className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full w-fit shrink-0 sm:mt-1">
                      {item.date}
                    </div>
                  </div>

                  {/* Details List */}
                  <ul className="space-y-2.5 mt-5">
                    {item.details.map((desc, idx) => (
                      <li key={idx} className="flex items-start text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        <span className="text-[#C5F54A] mr-2.5 mt-1 font-bold">›</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {item.technologies && (
                    <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06]" aria-label={`${item.title} technologies and methods`}>
                      {item.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] px-2 py-1 rounded-md"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}