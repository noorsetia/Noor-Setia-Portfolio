import React, { useState, useMemo } from 'react';
import Reveal from './Reveal';
import { skillsCategories } from '../data/skillsData';

// Verified project references for skills
const skillProjectMap = {
  'React.js': 'Nestora • CareSync',
  'Node.js': 'Nestora • GYM',
  'Express.js': 'Nestora • GYM',
  'MongoDB': 'Nestora • GYM',
  'Mongoose': 'Nestora • GYM',
  'Tailwind CSS': 'Portfolio • CareSync',
  'JavaScript': 'All Projects',
  'Vite': 'Nestora • CareSync',
  'REST APIs': 'Nestora • CareSync • GYM',
  'JWT': 'Nestora Auth',
  'Vercel': 'Nestora Deploy',
  'Postman': 'API Testing',
  'Git': 'Version Control',
  'GitHub': 'Open Source'
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const totalSkillCount = useMemo(() => {
    return skillsCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  const categories = useMemo(() => {
    return [
      { name: 'All', count: totalSkillCount },
      ...skillsCategories.map(c => ({ name: c.category, count: c.skills.length }))
    ];
  }, [totalSkillCount]);

  const filteredSkills = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    let result = [];
    skillsCategories.forEach(group => {
      if (selectedCategory === 'All' || group.category === selectedCategory) {
        group.skills.forEach(skill => {
          if (!query || skill.toLowerCase().includes(query)) {
            result.push({
              name: skill,
              category: group.category,
              projectTag: skillProjectMap[skill] || null
            });
          }
        });
      }
    });

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#07090E] transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-white/[0.04]"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                02. Technical Arsenal
              </span>
              <h2 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
                Categorized Skills Explorer
              </h2>
              <div className="w-16 h-1 bg-blue-600 mt-4 rounded-full" aria-hidden="true"></div>
            </div>

            {/* Instant Search Bar */}
            <div className="w-full md:w-80 relative">
              <label htmlFor="skill-search" className="sr-only">Search technical skills</label>
              <input
                id="skill-search"
                type="text"
                placeholder="Search tools & technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#0C101B] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
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
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white dark:bg-[#0E1321] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#151D33] border border-slate-200 dark:border-white/[0.06] shadow-sm'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Results Metric */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          <span>
            Showing <span className="text-blue-600 dark:text-blue-400 font-semibold">{filteredSkills.length}</span> technologies
          </span>
          {searchQuery && (
            <span>Filtered by "{searchQuery}"</span>
          )}
        </div>

        {/* Skills Grid with Responsive Hover Depth & Project Association */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredSkills.map((item, index) => (
              <div 
                key={`${item.name}-${index}`}
                className="p-4 sm:p-4.5 rounded-xl bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-white/[0.06] hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-[#0E1424] transition-all duration-200 flex flex-col justify-between min-h-[105px] group hover:-translate-y-1 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-snug break-words">
                    {item.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform shrink-0 mt-1" aria-hidden="true"></span>
                </div>
                
                <div>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug block">
                    {item.name}
                  </span>

                  {/* Verified Project Association Tag if present */}
                  {item.projectTag && (
                    <span className="mt-1 text-[10px] font-mono text-slate-400 dark:text-slate-500 block truncate group-hover:text-blue-500/80 transition-colors">
                      {item.projectTag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 sm:p-12 text-center rounded-2xl bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-white/[0.06] shadow-sm">
            <p className="text-slate-600 dark:text-slate-400 text-base mb-3">No technologies match your current search query.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-medium bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-600/30 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
