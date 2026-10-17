import React, { useState, useMemo } from 'react';
import Reveal from './Reveal';
import { skills } from '../data/skillsData';

const categories = ['All', 'Frontend', 'Backend', 'Databases', 'Tools & Platforms', 'Currently Learning'];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = useMemo(() => {
    return categories.reduce((counts, category) => {
      counts[category] = category === 'All'
        ? skills.length
        : skills.filter((skill) => skill.category === category).length;
      return counts;
    }, {});
  }, []);

  const filteredSkills = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const searchableText = [skill.name, ...skill.aliases].join(' ').toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#080A0B] transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-white/[0.04]"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#C5F54A]">
                02. Technical Arsenal
              </span>
              <h2 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
                Categorized Skills Explorer
              </h2>
              <div className="w-16 h-1 bg-[#C5F54A] mt-4 rounded-full" aria-hidden="true"></div>
            </div>

            {/* Instant Search Bar */}
            <div className="w-full md:w-80 relative">
              <label htmlFor="skill-search" className="sr-only">Search technical skills</label>
              <input
                id="skill-search"
                type="text"
                placeholder="Search technologies or aliases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#101315] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#C5F54A] focus:ring-1 focus:ring-[#C5F54A] transition-all shadow-sm"
              />
              <svg 
                className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer"
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Category Tabs with Count Badges */}
        <Reveal direction="up" delay={100}>
          <div 
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none"
            role="tablist"
            aria-label="Filter skills by technical category"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] ${
                    isActive
                      ? 'bg-[#C5F54A] text-slate-950 font-bold shadow-md shadow-[#C5F54A]/20'
                      : 'bg-white dark:bg-[#101315] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161B1F] border border-slate-200 dark:border-white/[0.06] shadow-sm'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-950/20 text-slate-950 font-semibold' : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                  }`}>
                    {categoryCounts[category]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Results Metric */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          <span>
            Showing <span className="text-blue-600 dark:text-[#C5F54A] font-semibold">{filteredSkills.length}</span> technologies
          </span>
          {searchQuery && (
            <span>Filtered by "{searchQuery}"</span>
          )}
        </div>

        {/* Skills Grid with Responsive Hover Depth & Project Association */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredSkills.map((item) => (
              <div 
                key={item.name}
                className={`p-4 sm:p-4.5 rounded-xl bg-white dark:bg-[#101315] border border-slate-200 dark:border-white/[0.06] hover:border-[#C5F54A]/50 hover:bg-slate-50 dark:hover:bg-[#13171A] transition-colors duration-200 flex flex-col justify-between min-h-[105px] group relative overflow-hidden ${item.core ? 'ring-1 ring-[#C5F54A]/20' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-snug break-words">
                    {item.category === 'Currently Learning' ? 'Currently Learning' : item.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5F54A] group-hover:scale-125 transition-transform shrink-0 mt-1" aria-hidden="true"></span>
                </div>
                
                <div>
                  <span className={`text-xs sm:text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-[#C5F54A] transition-colors leading-snug block ${item.core ? 'text-sm sm:text-base md:text-lg' : ''}`}>
                    {item.name}
                  </span>

                  {/* Verified Project Association Tag if present */}
                  {item.status === 'learning' && (
                    <span className="mt-1 text-[10px] font-mono text-[#84a83a] dark:text-[#C5F54A]/80 block">
                      Learning focus
                    </span>
                  )}
                  {item.projectTag && (
                    <span className="mt-1 text-[10px] font-mono text-slate-400 dark:text-slate-500 block truncate group-hover:text-[#C5F54A]/80 transition-colors">
                      {item.projectTag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 sm:p-12 text-center rounded-2xl bg-white dark:bg-[#101315] border border-slate-200 dark:border-white/[0.06] shadow-sm">
            <p className="text-slate-600 dark:text-slate-400 text-base mb-3">No technologies match your current search query.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#C5F54A]/20 text-[#C5F54A] rounded-lg hover:bg-[#C5F54A]/30 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
