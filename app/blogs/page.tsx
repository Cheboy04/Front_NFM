import type { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import FilterBar from '@/components/blog/FilterBar';
import BlogCard from '@/components/blog/BlogCard';
import BlogFeatured from '@/components/blog/BlogFeatured';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { drupal } from '@/lib/drupal';
import type { DrupalArticle } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Blog | Nunca Fuimos Normales',
  description:
    'Crónicas, mitos y realidades del rock. Lee las historias no contadas de las leyendas que marcaron la música.',
  keywords: ['blog de rock', 'historias de rock', 'backstage', 'artículos de música'],
  openGraph: {
    title: 'Blog - El Backstage Completo | Nunca Fuimos Normales',
    description: 'Crónicas, mitos y realidades del rock.',
    type: 'website',
  },
};

export default async function BlogsPage() {
  // Fetch articles from Drupal
  const articles = await drupal.getResourceCollection<DrupalArticle[]>('node--article', {
    params: {
      'filter[status]': 1,
      'include': 'field_image,field_category', //,field_category
      'sort': '-created',
      'page[limit]': 12,
    },
    next: {
      revalidate: 3600,
    },
  })
  
  const categories = await drupal.getResourceCollection('taxonomy_term--categorias', {
  params: {
    'filter[status]': 1,
    'fields[taxonomy_term--categorias]': 'name,drupal_internal__tid',
    'sort': 'name',
  },
  next: { revalidate: 3600 },
});

// Transformar al formato que espera FilterBar:
const categoryOptions = [
  { id: 'all', name: 'Todos' },
  ...categories.map((cat: any) => ({
    id: String(cat.drupal_internal__tid),
    name: cat.name,
  })),
];;

  // Get featured article (first one with field_featured or just the latest)
  const featuredArticle = articles.find((article) => article.field_featured) || articles[0];

  // Remove featured from main list if it exists
  const regularArticles = articles.filter((article) => article.id !== featuredArticle?.id);

  // Separate first 2 articles for the top grid
  const topArticles = regularArticles.slice(0, 2);
  // Remaining articles for bottom grid
  const bottomArticles = regularArticles.slice(2);

  return (
    <>
      {/* Hero Section */}
      <BlogHero />

      {/* Filter Bar - Client Component */}
      <FilterBar activeCategory="all" categories={categoryOptions}/>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Articles Column */}
        <div className="lg:col-span-8 space-y-16">
          {/* Top 2 Articles Grid */}
          {topArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {topArticles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Featured Article */}
          {featuredArticle && <BlogFeatured article={featuredArticle} />}

          {/* Remaining Articles Grid */}
          {bottomArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bottomArticles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* No Articles Message */}
          {articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No hay artículos disponibles en este momento.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                ¡Vuelve pronto para descubrir nuevas historias del rock!
              </p>
            </div>
          )}

          {/* Load More Button - Placeholder for pagination */}
          {articles.length >= 12 && (
            <div className="text-center pt-8">
              <button className="px-8 py-4 border-2 border-primary text-primary font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
                CARGAR MÁS HISTORIAS
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BlogSidebar />
      </main>
      </>
  );
}
