'use client';

import React from 'react';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Space Tech': 'border-blue-500/50 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20',
  'Robotics & Drones': 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20',
  'Industrial AI': 'border-purple-500/50 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20',
  'Quantum Tech': 'border-pink-500/50 text-pink-400 bg-pink-500/10 hover:bg-pink-500/20',
  'Semiconductors': 'border-amber-500/50 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20',
  'EV & Energy Tech': 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20',
};

const CATEGORY_ACTIVE_COLORS: Record<string, string> = {
  'Space Tech': 'bg-blue-600 text-white border-blue-400 shadow-blue-500/30',
  'Robotics & Drones': 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/30',
  'Industrial AI': 'bg-purple-600 text-white border-purple-400 shadow-purple-500/30',
  'Quantum Tech': 'bg-pink-600 text-white border-pink-400 shadow-pink-500/30',
  'Semiconductors': 'bg-amber-600 text-white border-amber-400 shadow-amber-500/30',
  'EV & Energy Tech': 'bg-cyan-600 text-white border-cyan-400 shadow-cyan-500/30',
};

export function CategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFiltersProps) {
  const totalCount = categoryCounts ? Object.values(categoryCounts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all whitespace-nowrap shadow-sm ${
          selectedCategory === 'All'
            ? 'bg-zinc-100 text-zinc-950 border-zinc-200 shadow-zinc-100/20 font-bold'
            : 'bg-zinc-900/95 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700 backdrop-blur'
        }`}
      >
        ALL SECTORS {totalCount > 0 && `(${totalCount})`}
      </button>

      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        const activeStyle = CATEGORY_ACTIVE_COLORS[cat] || 'bg-zinc-200 text-zinc-950 border-white';
        const inactiveStyle = CATEGORY_COLORS[cat] || 'border-zinc-800 text-zinc-400 bg-zinc-900/95';
        const count = categoryCounts ? categoryCounts[cat] : undefined;

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all whitespace-nowrap shadow-md backdrop-blur ${
              isActive ? `${activeStyle} shadow-lg ring-1 ring-white/25` : `${inactiveStyle}`
            }`}
          >
            {cat} {count !== undefined && <span className="opacity-75">({count})</span>}
          </button>
        );
      })}
    </div>
  );
}
