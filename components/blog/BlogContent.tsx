'use client';

import { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import BlogFeatured from './BlogFeatured';
import FilterBar from './FilterBar';
import type { DrupalArticle } from '@/lib/types';

interface BlogContentProps {
  articles: DrupalArticle[];
  categories: Array<{ id: string; name: string }>;
  featuredArticle: DrupalArticle | null;
}

type SortOption = 'recent' | 'oldest';

export default function BlogContent({ articles, categories, featuredArticle }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  // ── Lógica de filtrado y ordenado ──────────────────────────────────────
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // 1. Excluir el featured del listado principal
    if (featuredArticle && searchQuery === '' && selectedCategory === 'all') {
      result = result.filter((a) => a.id !== featuredArticle.id);
    }

    // 2. Filtrar por búsqueda (título + excerpt)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.field_excerpt?.toLowerCase().includes(q)
      );
    }

    // 3. Filtrar por categoría
    if (selectedCategory !== 'all') {
      result = result.filter(
        (a) => String(a.field_category?.drupal_internal__tid) === selectedCategory
      );
    }

    // 4. Ordenar
    result.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return sortBy === 'recent' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [articles, featuredArticle, searchQuery, selectedCategory, sortBy]);

  // Determinar si estamos en modo búsqueda/filtro activo
  const isFiltering = searchQuery !== '' || selectedCategory !== 'all';

  // Separar artículos para el layout
  const topArticles = filteredArticles.slice(0, 2);
  const bottomArticles = filteredArticles.slice(2);

  return (
    <>
      <FilterBar
        categories={categories}
        activeCategory={selectedCategory}
        onSearch={setSearchQuery}
        onFilterCategory={setSelectedCategory}
        onSort={(val) => setSortBy(val as SortOption)}
      />

      <div className="lg:col-span-8 space-y-16">

        {/* Resultados de búsqueda */}
        {isFiltering && (
          <div className="flex items-center gap-3">
            <p className="text-gray-400 text-sm">
              {filteredArticles.length === 0
                ? 'No se encontraron resultados'
                : `${filteredArticles.length} ${filteredArticles.length === 1 ? 'resultado' : 'resultados'}`}
              {searchQuery && (
                <span className="text-white font-bold"> para "{searchQuery}"</span>
              )}
            </p>
            {/* Botón limpiar filtros */}
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSortBy('recent'); }}
              className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Sin filtros activos: layout original con featured */}
        {!isFiltering && (
          <>
            {topArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {topArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {featuredArticle && <BlogFeatured article={featuredArticle} />}

            {bottomArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bottomArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Con filtros activos: grid uniforme con todos los resultados */}
        {isFiltering && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <span className="material-symbols-outlined text-white/10 text-8xl block">search_off</span>
            <p className="text-gray-500 text-lg">No hay historias con esos filtros.</p>
            <p className="text-gray-600 text-sm">Probá con otra búsqueda o categoría.</p>
          </div>
        )}

        {/* Load more — solo sin filtros activos */}
        {!isFiltering && articles.length >= 12 && (
          <div className="text-center pt-8">
            <button className="px-8 py-4 border-2 border-primary text-primary font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
              CARGAR MÁS HISTORIAS
            </button>
          </div>
        )}
      </div>
    </>
  );
}
