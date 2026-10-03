import React from 'react';
import Reveal from './Reveal';
import { projectsData } from '../data/projectsData';

const ProjectCard = ({ title, description, tags, image, liveLink }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50">
      
      {/* Image Container */}
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-900/5 dark:bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
        <img src={image} alt={`Screenshot of ${title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
      </div>
      
      {/* Content Container */}
      <div className="p-8 flex flex-col flex-grow relative">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Live Link Button */}
        <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800">
          <a href={liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-semibold uppercase tracking-wider group/link">
            <svg className="w-5 h-5 mr-2 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            View Live Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-slate-800/30 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER (Slides Up) */}
        <Reveal direction="up" delay={0}>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
              Some Things I've Built
            </h2>
            {/* Indigo Underline */}
            <div className="w-24 h-1.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-6 mb-8 rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Here are a few of my recent projects. I've built these from scratch to solve real-world problems.
            </p>
          </div>
        </Reveal>

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {projectsData.map((project, index) => (
            <Reveal 
              key={project.id} 
              direction={index % 2 === 0 ? "left" : "right"} 
              delay={200 + (index * 200)} 
              className="h-full"
            >
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
        
      </div>
    </section>
  );
}