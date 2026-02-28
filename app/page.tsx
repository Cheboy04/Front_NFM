import { ArticleTeaser } from "@/components/drupal/ArticleTeaser"
import { drupal } from "@/lib/drupal"
import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"
import { getShowEpisodes, getMostRecentPlaylists } from "@/lib/spotify"
import Link from "next/link"
import HeroSection from '@/components/home/HeroSection';
import CTASection from '@/components/home/CTASection';
import AboutSection from '@/components/home/AboutSection';
import BlogCard from "@/components/blog/BlogCard"
import EpisodeCard from '@/components/episodes/EpisodeCard';

export const metadata: Metadata = {
  title: 'Nunca Fuimos Normales | El Lado B del Disco',
  description:
    'Historias no contadas del rock que marcó generaciones. Desde los excesos en el backstage hasta los mitos urbanos de los 70s y 90s.',
  keywords: ['rock', 'podcast', 'música', 'historia del rock', 'backstage', '70s', '80s', '90s'],
  openGraph: {
    title: 'Nunca Fuimos Normales | El Lado B del Disco',
    description:
      'Historias no contadas del rock que marcó generaciones. El podcast definitivo sobre la cultura del rock and roll.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nunca Fuimos Normales | El Lado B del Disco',
    description: 'Historias no contadas del rock que marcó generaciones.',
  },
};

export default async function Home() {
   const [episodes, articles] = await Promise.all([
      getShowEpisodes(3), await drupal.getResourceCollection<DrupalNode[]>(
      "node--article",
      {
        params: {
          "filter[status]": 1,
          "include": "field_image,field_category",
          "sort": "-created",
          "page[limit]": 3,
        },
        next: {
          revalidate: 3600,
        },
      }
    )
   ]) 
   const playlist = await getMostRecentPlaylists();
  console.log(playlist);
  

  return (
    <>
          <HeroSection />
    
          {/* ── ÚLTIMOS CAPÍTULOS ── */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
              ÚLTIMOS CAPÍTULOS
            </h3>
            <div className="h-1.5 w-24 bg-primary" />
          </div>
          <a
            href={`https://open.spotify.com/show/${process.env.SPOTIFY_SHOW_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-primary/20 hover:border-primary pb-1 transition-all"
          >
            Ver todos
          </a>
        </div>

        {episodes?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {episodes.map((episode, i) => (
              <EpisodeCard key={episode.id} episode={episode} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p>No hay episodios disponibles.</p>
          </div>
        )}
      </section>
    
          <CTASection />
    
          {/* Backstage Blog Section - Placeholder */}
          <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
              HISTORIAS DESDE EL BACKSTAGE
            </h3>
            <div className="h-1.5 w-24 bg-primary"></div>
          </div>
          <Link
            href="/blogs"
            className="text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-primary/20 hover:border-primary pb-1 transition-all"
          >
            Ver todos
          </Link>
        </div>

        {articles?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">No hay artículos disponibles en este momento.</p>
          </div>
        )}
          </section>
    
          <AboutSection />
      
    </>
  )
}
