'use client';

import { useState } from 'react';

interface FilterBarProps {
  categories?: Array<{ id: string; name: string }>;
  onSearch?: (query: string) => void;
  onFilterCategory?: (category: string) => void;
  onSort?: (sortBy: string) => void;
  activeCategory?: string;
}

const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'polemicas', name: 'Polémicas' },
  { id: 'historias', name: 'Historias' },
  { id: 'equipamiento', name: 'Equipamiento' },
  { id: 'entrevistas', name: 'Entrevistas' },
];

export default function FilterBar({
  categories = [],
  onSearch,
  onFilterCategory,
  onSort,
  activeCategory = 'all',
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const categoriesToShow = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSort?.(e.target.value);
  };

  return (
    <div className="sticky top-[73px] z-50 w-full border-b border-white/10 bg-background-dark/95 backdrop-blur-sm py-4 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Search Input */}
        <div className="relative w-full md:w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
            search
          </span>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary text-white placeholder-gray-500 transition-colors"
            placeholder="Buscar historia..."
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Category Filters — estado controlado por el padre via activeCategory */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categoriesToShow.map((category) => (
            <button
              key={category.id}
              onClick={() => onFilterCategory?.(category.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-bold text-gray-500">Ordenar por:</span>
          <select
            className="bg-black border-none text-xs font-bold uppercase tracking-widest focus:ring-0 cursor-pointer text-white"
            onChange={handleSortChange}
            defaultValue="recent"
          >
            <option value="recent">Recientes</option>
            <option value="oldest">Más Antiguos</option>
          </select>
        </div>
      </div>
    </div>
  );
}