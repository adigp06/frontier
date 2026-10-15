'use client';

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
  totalCount?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search deeptech ecosystem (name, category, tagline)...',
  resultCount,
  totalCount,
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 backdrop-blur-xl bg-black/85 border border-white/15 text-white placeholder-zinc-500 rounded-2xl focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 font-mono text-xs sm:text-sm shadow-2xl transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-white transition-colors"
          title="Clear search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      {resultCount !== undefined && totalCount !== undefined && (
        <div className="absolute right-3 -bottom-5 text-[10px] font-mono text-zinc-400 tracking-wider">
          FILTER: <span className="text-white font-bold">{resultCount}</span> / {totalCount} NODES
        </div>
      )}
    </div>
  );
}
