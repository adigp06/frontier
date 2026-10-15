'use client';

import React from 'react';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export function CategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFiltersProps) {
  const totalCount = categoryCounts ? Object.values(categoryCounts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all whitespace-nowrap shadow-lg backdrop-blur-xl ${
          selectedCategory === 'All'
            ? 'bg-white text-black border-white font-bold shadow-white/20'
            : 'bg-black/60 text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
        }`}
      >
        ALL SECTORS {totalCount > 0 && `(${totalCount})`}
      </button>

      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        const count = categoryCounts ? categoryCounts[cat] : undefined;

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all whitespace-nowrap shadow-lg backdrop-blur-xl ${
              isActive
                ? 'bg-white text-black border-white font-bold shadow-white/20'
                : 'bg-black/60 text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            {cat} {count !== undefined && <span className="opacity-75">({count})</span>}
          </button>
        );
      })}
    </div>
  );
}
