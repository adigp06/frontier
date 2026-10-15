'use client';

import React, { useEffect } from 'react';
import { Company } from '@/types/company';

interface CompanyDrawerProps {
  company: Company | null;
  onClose: () => void;
}

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg pointer-events-auto bg-black/95 border-l border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col transform transition-transform duration-300 ease-out">

          {/* Terminal Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
                NODE_INSPECTOR // {company.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              title="Close panel (ESC)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 text-xs font-mono font-semibold rounded-lg border border-white/20 bg-white/10 text-white">
                  {company.category}
                </span>
                <span className="px-3 py-1 text-xs font-mono font-semibold rounded-lg border border-white/20 bg-white/5 text-zinc-300">
                  {company.funding_stage}
                </span>
              </div>
              <h1 className="text-2xl font-bold font-mono text-white tracking-tight">
                {company.name}
              </h1>
              <p className="text-sm font-mono text-zinc-400 mt-2 leading-relaxed">
                {company.tagline}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10 font-mono text-xs">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-1.5 uppercase tracking-wider">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>FOUNDED</span>
                </div>
                <span className="text-base font-bold text-white">{company.founded_year}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-1.5 uppercase tracking-wider">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>STAGE</span>
                </div>
                <span className="text-base font-bold text-white">{company.funding_stage}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Company Overview
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-4 font-sans">
                {company.description}
              </p>
            </div>

            {/* Website Link */}
            {company.website_url && (
              <div className="space-y-2">
                <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Official Web Port
                </h2>
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl text-white transition-all group shadow-sm"
                >
                  <span className="text-xs font-mono truncate">{company.website_url}</span>
                  <svg className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Verifiable Source Citations */}
            {company.sources && company.sources.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verified Ground-Truth Sources ({company.sources.length})
                </h2>
                <div className="space-y-2.5">
                  {company.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl transition-all group"
                    >
                      <div className="pr-2">
                        <span className="text-xs font-medium text-white group-hover:underline block">
                          {source.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 truncate block mt-0.5">
                          {source.url}
                        </span>
                      </div>
                      <svg className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Metadata */}
          <div className="px-6 py-4 border-t border-white/10 bg-black/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>ID: {company.id || company.slug}</span>
            <span>XYZ: [{company.x.toFixed(1)}, {company.y.toFixed(1)}, {company.z.toFixed(1)}]</span>
          </div>

        </div>
      </div>
    </div>
  );
}
