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
        className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-mono text-xs font-semibold shadow-lg backdrop-blur border border-blue-400/30 transition-all hover:scale-105"
        title="Extract startup profile using Gemini AI"
      >
        <svg className="w-4 h-4 text-blue-200 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>+ SIFT STARTUP (AI)</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm pointer-events-auto">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-xs text-zinc-300 tracking-wider">
                  GEMINI AI // STARTUP SIFTER & EXTRACTOR
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">

              {/* URL Input Form */}
              <form onSubmit={handleExtract} className="space-y-3">
                <label className="block font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  Target Company Website URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com or https://agnikul.in"
                    className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-mono text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
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
                <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 font-mono text-xs">
                  <span className="font-bold">Extraction Error:</span> {error}
                </div>
              )}

              {/* Extracted Preview Draft */}
              {extractedData && (
                <div className="space-y-4 pt-4 border-t border-zinc-800/80 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Extraction Successful - Review Draft
                    </span>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded font-mono text-[10px]">
                        {extractedData.category}
                      </span>
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded font-mono text-[10px]">
                        {extractedData.funding_stage}
                      </span>
                    </div>
                  </div>

                  <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase block">Company Name</span>
                      <span className="text-zinc-100 font-bold text-sm">{extractedData.name}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase block">Tagline</span>
                      <span className="text-zinc-300">{extractedData.tagline}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase block">Description</span>
                      <p className="text-zinc-300 font-sans text-xs leading-relaxed mt-0.5">{extractedData.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase block">Founded Year</span>
                        <span className="text-zinc-200">{extractedData.founded_year}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase block">Website</span>
                        <a href={extractedData.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block">
                          {extractedData.website_url}
                        </a>
                      </div>
                    </div>

                    {extractedData.sources && extractedData.sources.length > 0 && (
                      <div className="pt-2 border-t border-zinc-800">
                        <span className="text-zinc-500 text-[10px] uppercase block mb-1">Citations ({extractedData.sources.length})</span>
                        <div className="space-y-1">
                          {extractedData.sources.map((s, idx) => (
                            <div key={idx} className="text-[11px] text-zinc-400 truncate">
                              • <span className="text-zinc-300">{s.title}</span> ({s.url})
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
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-mono text-xs transition-colors"
                    >
                      Clear / Retry
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmAdd}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-mono text-xs font-semibold transition-all shadow-lg shadow-emerald-900/20"
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
