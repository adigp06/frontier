'use client';

import React, { useEffect } from 'react';
import { Company } from '@/types/company';

interface CompanyDrawerProps {
  company: Company | null;
  onClose: () => void;
}

const STAGE_COLORS: Record<string, string> = {
  'Seed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Series A': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Series B': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Series C+': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Public': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Bootstrapped': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  'Acquired': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

const CATEGORY_BADGES: Record<string, string> = {
  'Space Tech': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'Robotics & Drones': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Industrial AI': 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  'Quantum Tech': 'text-pink-400 bg-pink-500/10 border-pink-500/30',
  'Semiconductors': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'EV & Energy Tech': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
};

export function CompanyDrawer({ company, onClose }: CompanyDrawerProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!company) return null;

  const stageBadge = STAGE_COLORS[company.funding_stage] || 'bg-zinc-800 text-zinc-300 border-zinc-700';
  const categoryBadge = CATEGORY_BADGES[company.category] || 'text-zinc-300 bg-zinc-800 border-zinc-700';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md pointer-events-auto bg-zinc-950/98 border-l border-zinc-800/80 shadow-2xl backdrop-blur-xl flex flex-col transform transition-transform duration-300 ease-out">

          {/* Terminal Header */}
          <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-zinc-400 tracking-wider">
                SEC // {company.category.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 rounded-lg transition-colors"
              title="Close panel (ESC)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md border ${categoryBadge}`}>
                  {company.category}
                </span>
                <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md border ${stageBadge}`}>
                  {company.funding_stage}
                </span>
              </div>
              <h1 className="text-2xl font-bold font-mono text-zinc-100 tracking-tight">
                {company.name}
              </h1>
              <p className="text-sm font-mono text-zinc-400 mt-1.5 leading-relaxed">
                {company.tagline}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-zinc-800/80 font-mono text-xs">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>FOUNDED YEAR</span>
                </div>
                <span className="text-sm font-bold text-zinc-200">{company.founded_year}</span>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>FUNDING STAGE</span>
                </div>
                <span className="text-sm font-bold text-zinc-200">{company.funding_stage}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Company Overview
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4 font-sans">
                {company.description}
              </p>
            </div>

            {/* Website Link */}
            {company.website_url && (
              <div className="space-y-2">
                <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Direct Access
                </h2>
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-zinc-200 hover:text-white transition-all group shadow-sm"
                >
                  <span className="text-xs font-mono truncate">{company.website_url}</span>
                  <svg className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Verifiable Source Citations */}
            {company.sources && company.sources.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verifiable Ground-Truth Sources ({company.sources.length})
                </h2>
                <div className="space-y-2">
                  {company.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between p-3 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all group"
                    >
                      <div className="pr-2">
                        <span className="text-xs font-medium text-zinc-200 group-hover:text-blue-400 transition-colors block">
                          {source.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 truncate block mt-0.5">
                          {source.url}
                        </span>
                      </div>
                      <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Metadata */}
          <div className="px-6 py-4 border-t border-zinc-800/80 bg-zinc-900/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>NODE_ID: {company.id || company.slug}</span>
            <span>COORD: [{company.x.toFixed(1)}, {company.y.toFixed(1)}, {company.z.toFixed(1)}]</span>
          </div>

        </div>
      </div>
    </div>
  );
}
