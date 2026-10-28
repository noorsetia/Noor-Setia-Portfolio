import React, { useState, useMemo } from 'react';
import Reveal from './Reveal';
import { certifications } from '../data/certificationsData';

const SUBCATEGORY_ORDER = [
  'Certifications & Training',
  'Workshops & Training',
  'Awards & Recognition',
];

const allCategories = ['All', ...Array.from(new Set(certifications.map((c) => c.category)))];

function ExternalLinkIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

const BADGE_COLOURS = {
  'AI / ML':        'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  Frontend:         'bg-blue-100   text-blue-700   dark:bg-blue-500/15   dark:text-blue-300',
  'Developer Tools':'bg-cyan-100   text-cyan-700   dark:bg-cyan-500/15   dark:text-cyan-300',
  Language:         'bg-amber-100  text-amber-700  dark:bg-amber-500/15  dark:text-amber-300',
  Achievement:      'bg-slate-100  text-slate-600  dark:bg-white/[0.06]  dark:text-slate-400',
};

function CertBadge({ category }) {
  return (
    <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${BADGE_COLOURS[category] ?? BADGE_COLOURS.Achievement}`}>
      {category}
    </span>
  );
}

/** Icon shown on the subcategory group heading. */
function SubcategoryIcon({ sub }) {
  if (sub === 'Awards & Recognition') {
    return (
      <svg className="w-4 h-4 text-[#C5F54A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  }
  if (sub === 'Workshops & Training') {
    return (
      <svg className="w-4 h-4 text-[#C5F54A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  // Certifications & Training
  return (
    <svg className="w-4 h-4 text-[#C5F54A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryCounts = useMemo(() =>
    allCategories.reduce((acc, cat) => {
      acc[cat] = cat === 'All'
        ? certifications.length
        : certifications.filter((c) => c.category === cat).length;
      return acc;
    }, {}),
  []);

  const visible = useMemo(() =>
    activeCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category === activeCategory),
  [activeCategory]);

  /**
   * When "All" is selected group by subcategory so the three sections appear.
   * Otherwise (a specific category tab is active) skip grouping and render a
   * flat grid — the same behaviour as before for the existing tabs.
   */
  const grouped = useMemo(() => {
    if (activeCategory !== 'All') return null;

    return SUBCATEGORY_ORDER
      .map((sub) => ({
        sub,
        items: visible.filter((c) => c.subcategory === sub),
      }))
      .filter((g) => g.items.length > 0);
  }, [activeCategory, visible]);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-24 sm:py-28 px-4 sm:px-6 bg-white dark:bg-[#080A0B] transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#C5F54A]">
                05. Certifications & Achievements
              </span>
              <h2
                id="certifications-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mt-2"
              >
                Certificates &amp; Credentials
              </h2>
              <div className="w-16 h-1 bg-[#C5F54A] mt-4 rounded-full" aria-hidden="true" />
            </div>

            {/* Count pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="text-blue-600 dark:text-[#C5F54A] font-bold text-lg">
                  {certifications.length}
                </span>{' '}
                verified credentials
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Category Filter Tabs ────────────────────────────────────────── */}
        <Reveal direction="up" delay={100}>
          <div
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none"
            role="tablist"
            aria-label="Filter certifications by category"
          >
            {allCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] ${
                    isActive
                      ? 'bg-[#C5F54A] text-slate-950 font-bold shadow-md shadow-[#C5F54A]/20'
                      : 'bg-white dark:bg-[#101315] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161B1F] border border-slate-200 dark:border-white/[0.06] shadow-sm'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 rounded-full ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950 font-semibold'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                  }`}>
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Results count ──────────────────────────────────────────────── */}
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          Showing{' '}
          <span className="text-blue-600 dark:text-[#C5F54A] font-semibold">
            {visible.length}
          </span>{' '}
          certificate{visible.length !== 1 ? 's' : ''}
        </div>

        {/* ── Grouped view (All tab) ─────────────────────────────────────── */}
        {grouped ? (
          <div className="space-y-12">
            {grouped.map(({ sub, items }) => (
              <div key={sub}>
                {/* Subcategory heading */}
                <Reveal direction="up" delay={60}>
                  <div className="flex items-center gap-2.5 mb-6">
                    <SubcategoryIcon sub={sub} />
                    <h3 className="text-sm font-mono font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {sub}
                    </h3>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.06]" aria-hidden="true" />
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      {items.length}
                    </span>
                  </div>
                </Reveal>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {items.map((cert, index) => (
                    <CertCard key={cert.id} cert={cert} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Flat grid for category-filtered views ─────────────────────── */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {visible.map((cert, index) => (
              <CertCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function CertCard({ cert, index }) {
  return (
    <Reveal direction="up" delay={120 + index * 60}>
      <article
        className="group flex flex-col h-full bg-slate-50 dark:bg-[#101315] border border-slate-200 dark:border-white/[0.06] hover:border-[#C5F54A]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 shadow-sm"
        aria-label={`${cert.title} — ${cert.issuer}`}
      >
        {/* Top row: category badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <CertBadge category={cert.category} />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#C5F54A] transition-colors leading-snug mb-1">
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
          {cert.issuer}
        </p>

        {/* Date / duration */}
        {(cert.date || cert.duration) && (
          <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mb-3">
            {cert.date && <span>{cert.date}</span>}
            {cert.date && cert.duration && <span className="mx-1">·</span>}
            {cert.duration && <span>{cert.duration}</span>}
          </p>
        )}

        {/* Note (e.g. programme context) */}
        {cert.note && (
          <p className="text-[11px] text-slate-400 dark:text-slate-500 italic mb-3 leading-relaxed">
            {cert.note}
          </p>
        )}

        {/* Skills tags (only when available) */}
        {cert.skills.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 mb-4"
            aria-label={`Skills: ${cert.skills.join(', ')}`}
          >
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Spacer pushes the link to the bottom of the card */}
        <div className="flex-1" />

        {/* View Certificate link */}
        <a
          href={cert.verifiedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 pt-4 border-t border-slate-200 dark:border-white/[0.06] text-xs font-semibold text-blue-600 dark:text-[#C5F54A] hover:text-blue-700 dark:hover:text-[#D4F76E] transition-colors group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5F54A] rounded"
          aria-label={`View certificate: ${cert.title} by ${cert.issuer} (opens in new tab)`}
        >
          <span>View Certificate</span>
          <ExternalLinkIcon />
        </a>
      </article>
    </Reveal>
  );
}
