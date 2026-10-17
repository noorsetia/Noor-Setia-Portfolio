import React, { useState, useMemo, useRef } from 'react';
import Reveal from './Reveal';
import { projectsData } from '../data/projectsData';
import ProjectVisual from './ProjectVisual';

function ProjectCardItem({ project, index, onOpenProjectModal }) {
  const [isHovered, setIsHovered] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(350px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(197, 245, 74, 0.1), transparent 75%)`;
    }
  };

  const handleCopyProjectLink = async (e) => {
    e.stopPropagation();
    const link = project.liveLink || project.repoLink;
    if (link) {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(link);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = link;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    }
  };

  return (
    <Reveal 
      direction={index % 2 === 0 ? "left" : "right"} 
      delay={150 + (index * 80)} 
      className="h-full"
    >
      <article 
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-white dark:bg-[#101315] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] hover:border-[#C5F54A]/40 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-sm"
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Dynamic Cursor Spotlight Effect */}
        <div
          ref={spotlightRef}
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        
        {/* Visual Showcase (Accessible Button triggering Deep-Dive Modal) */}
        <button
          type="button"
          onClick={() => onOpenProjectModal(project)}
          aria-label={`View verified technical specifications and details for ${project.title}`}
          className="w-full text-left relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] focus-visible:ring-inset cursor-pointer overflow-hidden"
        >
          <ProjectVisual project={project} />
          
          {/* Subtle Quick Hover Hint in Upper Right */}
          <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <span className="text-[11px] font-mono font-bold bg-[#C5F54A] text-slate-950 px-2.5 py-1 rounded shadow-md">
              Inspect Specs ↗
            </span>
          </div>
        </button>
        
        {/* Card Content */}
        <div className="p-5 sm:p-7 flex flex-col flex-grow relative z-20">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 id={`project-title-${project.id}`} className="flex-grow">
              <button
                type="button"
                onClick={() => onOpenProjectModal(project)}
                className="text-left font-bold text-xl sm:text-2xl text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-[#C5F54A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded-lg transition-colors cursor-pointer w-full leading-snug"
              >
                {project.title}
              </button>
            </h3>
            <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-[#6f8e2e] dark:text-[#C5F54A] border border-[#C5F54A]/30 bg-[#C5F54A]/10 rounded-md px-2 py-1">
              {project.status}
            </span>

            {/* Quick Share / Copy URL action */}
            {(project.liveLink || project.repoLink) && (
              <button
                type="button"
                onClick={handleCopyProjectLink}
                className="text-xs font-mono text-slate-400 hover:text-[#C5F54A] p-1 rounded transition-colors shrink-0 cursor-pointer"
                title="Copy project link"
                aria-label={`Copy link for ${project.title}`}
              >
                {copiedLink ? '✓' : '🔗'}
              </button>
            )}
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          <div className="grid gap-3 mb-6 text-xs sm:text-sm">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Problem</span>
              <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">My contribution</span>
              <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">{project.contribution[0]}</p>
            </div>
          </div>

          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Key features</span>
            <ul className="mt-2 grid gap-1.5 text-xs text-slate-600 dark:text-slate-300" aria-label={`Key features of ${project.title}`}>
              {project.caseStudyFeatures.slice(0, 3).map((feature) => (
                <li key={feature.title} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5F54A]" aria-hidden="true" />
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Verified Tech Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6" aria-label="Technologies used">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Interactive Action Bar with Verified Live & Code Links */}
          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            {/* Primary Architecture Action */}
            <button
              type="button"
              onClick={() => onOpenProjectModal(project)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-600 dark:text-[#C5F54A] hover:text-blue-700 dark:hover:text-[#D4F76E] hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded p-1 cursor-pointer"
              aria-label={`View verified architecture and features for ${project.title}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>View Case Study</span>
            </button>

            {/* Verified External Link Group */}
            <div className="flex items-center gap-2">
              {/* Live Demo Action with Neon Lime */}
              {project.liveLink ? (
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-[#C5F54A] hover:bg-[#D4F76E] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded-lg px-3 py-1.5 shadow-sm shadow-[#C5F54A]/25"
                  aria-label={`Open ${project.title} live demo in a new tab`}
                >
                  <span>Live App</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span 
                  className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-300/50 dark:border-white/[0.06]"
                >
                  Deployment in Progress
                </span>
              )}

              {/* Specific Repository Action */}
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#C5F54A] bg-slate-100 dark:bg-[#161C20] hover:bg-slate-200 dark:hover:bg-[#1B2228] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded-lg px-2.5 py-1.5"
                  aria-label={`View ${project.title} source code on GitHub in a new tab`}
                >
                  <span>Code</span>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

      </article>
    </Reveal>
  );
}

export default function Projects({ onOpenProjectModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');

  const categories = useMemo(() => {
    const projectCategories = [...new Set(projectsData.map(project => project.category))];
    return [
      { name: 'All', count: projectsData.length },
      ...projectCategories.map(name => ({
        name,
        count: projectsData.filter(project => project.category === name).length
      }))
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchingProjects = projectsData.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...project.tags
      ].join(' ').toLowerCase();

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });

    return [...matchingProjects].sort((first, second) => {
      if (sortOrder === 'alphabetical') return first.title.localeCompare(second.title);
      if (sortOrder === 'category') return first.category.localeCompare(second.category) || first.title.localeCompare(second.title);
      return first.id - second.id;
    });
  }, [activeCategory, searchQuery, sortOrder]);

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-28 px-4 sm:px-6 bg-white dark:bg-[#080A0B] transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-white/[0.04]"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#C5F54A]">
                03. Selected Works
              </span>
              <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
                Featured Projects
              </h2>
              <div className="w-16 h-1 bg-[#C5F54A] mt-4 rounded-full" aria-hidden="true"></div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <label className="relative">
                  <span className="sr-only">Search projects</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search projects or technologies"
                    className="w-full sm:w-64 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs text-slate-900 outline-none transition-colors placeholder:text-slate-500 focus:border-[#C5F54A] focus:ring-2 focus:ring-[#C5F54A]/30 dark:border-white/[0.06] dark:bg-[#101315] dark:text-white dark:placeholder:text-slate-500"
                  />
                </label>
                <label>
                  <span className="sr-only">Sort projects</span>
                  <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs text-slate-700 outline-none transition-colors focus:border-[#C5F54A] focus:ring-2 focus:ring-[#C5F54A]/30 dark:border-white/[0.06] dark:bg-[#101315] dark:text-slate-300"
                  >
                    <option value="featured">Featured order</option>
                    <option value="alphabetical">A–Z</option>
                    <option value="category">Category</option>
                  </select>
                </label>
              </div>

              <div
                className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
                role="tablist"
                aria-label="Filter projects by technical category"
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] ${
                        isActive
                          ? 'bg-[#C5F54A] text-slate-950 font-bold shadow-md shadow-[#C5F54A]/20'
                          : 'bg-slate-100 dark:bg-[#101315] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#161B1F] border border-slate-200 dark:border-white/[0.06]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-slate-950/20 text-slate-950 font-semibold' : 'bg-slate-200 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                index={index}
                onOpenProjectModal={onOpenProjectModal}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-white/10 dark:bg-[#101315]">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">No matching projects</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Try a different technology, project name, or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-4 rounded-lg border border-[#C5F54A]/40 px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-[#C5F54A]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] dark:text-slate-200"
            >
              Clear filters
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
}