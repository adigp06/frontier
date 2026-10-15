'use client';

import React, { useState } from 'react';
import { Company, CompanySource } from '@/types/company';

interface AiExtractorModalProps {
  onAddCompany: (company: Company) => void;
}

export function AiExtractorModal({ onAddCompany }: AiExtractorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<{
    name: string;
    slug: string;
    tagline: string;
    description: string;
    category: string;
    website_url: string;
    founded_year: number;
    funding_stage: Company['funding_stage'];
    sources: CompanySource[];
  } | null>(null);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setExtractedData(null);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to extract company data');
      }

      setExtractedData(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!extractedData) return;

    // Compute random 3D coordinates within ecosystem space
    const angle = Math.random() * Math.PI * 2;
    const radius = 12 + Math.random() * 22;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 8;

    const newCompany: Company = {
      id: `ai-${Date.now()}`,
      name: extractedData.name,
      slug: extractedData.slug || extractedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: extractedData.tagline,
      description: extractedData.description,
      category: extractedData.category || 'Space Tech',
      website_url: extractedData.website_url || urlInput,
      founded_year: extractedData.founded_year || 2022,
      funding_stage: extractedData.funding_stage || 'Seed',
      x,
      y,
      z,
      sources: extractedData.sources || [{ title: 'Website', url: urlInput }],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onAddCompany(newCompany);
    setIsOpen(false);
    setExtractedData(null);
    setUrlInput('');
  };

  return (
    <>
      {/* Trigger Button in HUD */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-xl font-mono text-xs font-bold shadow-2xl backdrop-blur-xl border border-white transition-all hover:scale-[1.02]"
        title="Extract startup profile using Gemini AI pipeline"
      >
        <svg className="w-4 h-4 text-black animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>+ SIFT STARTUP (AI)</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl pointer-events-auto">
          <div className="w-full max-w-2xl bg-black/95 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] backdrop-blur-2xl">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <span className="font-mono text-xs text-white tracking-widest uppercase">
                  GEMINI AI // STARTUP EXTRACTION PIPELINE
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">

              {/* URL Input Form */}
              <form onSubmit={handleExtract} className="space-y-3">
                <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  Target Company Website URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    required
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com or https://agnikul.in"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-zinc-500 rounded-2xl focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 font-mono text-xs sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-white text-black hover:bg-zinc-200 disabled:opacity-50 font-mono text-xs font-bold rounded-2xl transition-all flex items-center gap-2 shrink-0 shadow-2xl"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin text-black" fill="none" viewBox="0 0 24 24" width="16" height="16">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Extracting...</span>
                      </>
                    ) : (
                      <>
                        <span>Extract with AI</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-2xl text-red-400 font-mono text-xs">
                  <span className="font-bold">Extraction Error:</span> {error}
                </div>
              )}

              {/* Extracted Preview Draft */}
              {extractedData && (
                <div className="space-y-4 pt-4 border-t border-white/10 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Extraction Successful - Review Draft
                    </span>
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded-lg font-mono text-[10px]">
                        {extractedData.category}
                      </span>
                      <span className="px-2.5 py-1 bg-white/5 text-zinc-300 border border-white/15 rounded-lg font-mono text-[10px]">
                        {extractedData.funding_stage}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Company Name</span>
                      <span className="text-white font-bold text-sm">{extractedData.name}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Tagline</span>
                      <span className="text-zinc-300">{extractedData.tagline}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Description</span>
                      <p className="text-zinc-300 font-sans text-xs leading-relaxed mt-1">{extractedData.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <div>
                        <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Founded Year</span>
                        <span className="text-white">{extractedData.founded_year}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Website</span>
                        <a href={extractedData.website_url} target="_blank" rel="noopener noreferrer" className="text-white hover:underline truncate block">
                          {extractedData.website_url}
                        </a>
                      </div>
                    </div>

                    {extractedData.sources && extractedData.sources.length > 0 && (
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1">Citations ({extractedData.sources.length})</span>
                        <div className="space-y-1">
                          {extractedData.sources.map((s, idx) => (
                            <div key={idx} className="text-[11px] text-zinc-400 truncate">
                              • <span className="text-zinc-200">{s.title}</span> ({s.url})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setExtractedData(null)}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-mono text-xs transition-colors border border-white/10"
                    >
                      Clear / Retry
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmAdd}
                      className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-xl font-mono text-xs font-bold transition-all shadow-2xl"
                    >
                      Add Node to 3D Ecosystem
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </>
  );
}
