import type { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { drupal } from '@/lib/drupal';
import type { DrupalArticle } from '@/lib/types';
import { getMostRecentPlaylists } from '@/lib/spotify';

export const metadata: Metadata = {
  title: 'Blog | Nunca Fuimos Normales',
  description: 'Crónicas, mitos y realidades del rock. Lee las historias no contadas de las leyendas que marcaron la música.',
  keywords: ['blog de rock', 'historias de rock', 'backstage', 'artículos de música'],
  openGraph: {
    title: 'Blog - El Backstage Completo | Nunca Fuimos Normales',
    description: 'Crónicas, mitos y realidades del rock.',
    type: 'website',
  },
};

export default async function BlogsPage() {
  const [articles, categories, playlist] = await Promise.all([
    drupal.getResourceCollection<DrupalArticle[]>('node--article', {
      params: {
        'filter[status]': 1,
        'include': 'field_image,field_category',
        'sort': '-created',
        'page[limit]': 12,
      },
      next: { revalidate: 3600 },
    }),
    drupal.getResourceCollection('taxonomy_term--categorias', {
      params: {
        'filter[status]': 1,
        'fields[taxonomy_term--categorias]': 'name,drupal_internal__tid',
        'sort': 'name',
      },
      next: { revalidate: 3600 },
    }),
    getMostRecentPlaylists(),
  ]);

  const categoryOptions = [
    { id: 'all', name: 'Todos' },
    ...categories.map((cat: any) => ({
      id: String(cat.drupal_internal__tid),
      name: cat.name,
    })),
  ];

  const featuredArticle = articles.find((a) => a.field_featured) || articles[0] || null;

  return (
    <>
      <BlogHero />

      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <BlogContent
          articles={articles}
          categories={categoryOptions}
          featuredArticle={featuredArticle}
        />
        <BlogSidebar playlist={playlist} />
      </main>
    </>
  );
}
