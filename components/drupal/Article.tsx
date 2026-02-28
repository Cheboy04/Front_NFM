import Image from 'next/image';
import Link from 'next/link';
import { absoluteUrl, formatDate } from '@/lib/utils';
import { getMostRecentPlaylists } from '@/lib/spotify';
import type { DrupalArticle } from '@/lib/types';

interface ArticleProps {
  node: DrupalArticle;
  relatedArticles?: DrupalArticle[];
}

export async function Article({ node, relatedArticles = [] }: ArticleProps) {
  const imageUrl = node.field_image?.uri?.url
    ? absoluteUrl(node.field_image.uri.url)
    : null;

  const imageAlt = node.field_image?.resourceIdObjMeta?.alt || node.title;
  const category = node.field_category?.name;
  const readingTime = node.field_reading_time;
  const author = node.uid?.display_name;
  const playlist = await getMostRecentPlaylists();
  const playlistImage = playlist?.images?.[0]?.url;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[60vh] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover grayscale brightness-50"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10" />
          <div className="grunge-overlay absolute inset-0 opacity-20" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full pb-16">
          {category && (
            <span className="inline-block bg-primary px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase mb-4">
              {category}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-6 italic max-w-4xl">
            {node.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            {author && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">person</span>
                <span>Por: {author}</span>
              </div>
            )}
            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
              <span className="material-symbols-outlined text-primary text-base">calendar_today</span>
              <span>{formatDate(node.created)}</span>
            </div>
            {readingTime && (
              <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                <span className="material-symbols-outlined text-primary text-base">schedule</span>
                <span>{readingTime} MIN LECTURA</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative flex flex-col lg:flex-row gap-16">

        {/* Sidebar sticky de sharing */}
        <aside className="hidden lg:block w-12 sticky top-32 h-fit pt-16">
          <div className="flex flex-col items-center gap-6">
            <div className="h-40 w-1 bg-white/10 relative overflow-hidden rounded-full">
              <div className="absolute top-0 left-0 w-full bg-primary h-1/3" />
            </div>
            <button aria-label="Compartir"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
            <button aria-label="Me gusta"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined text-xl">thumb_up</span>
            </button>
            <button aria-label="Comentarios"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined text-xl">chat</span>
            </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="w-full max-w-[800px] py-16 mx-auto lg:mx-0">

          {node.field_excerpt && (
            <p className="text-xl italic text-gray-400 font-serif mb-12 leading-relaxed border-l-4 border-primary/40 pl-6">
              {node.field_excerpt}
            </p>
          )}

          {node.body?.processed && (
            <div
              dangerouslySetInnerHTML={{ __html: node.body.processed }}
              className="article-body"
            />
          )}

          {/* ── WIDGET PLAYLIST ── */}
          {playlist ? (
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="my-16 bg-zinc-900 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6 hover:border-primary/30 transition-colors group block"
            >
              {/* Imagen de la playlist */}
              <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-zinc-800">
                {playlistImage ? (
                  <Image
                    src={playlistImage}
                    alt={playlist.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">queue_music</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1 block flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">queue_music</span>
                  Playlist de la Semana
                </span>
                <h4 className="font-display font-bold text-lg uppercase mb-1 truncate group-hover:text-primary transition-colors">
                  {playlist.name}
                </h4>
                <p className="text-gray-500 text-xs mb-3">
                  {playlist.tracks?.total ? `${playlist.tracks.total} canciones · ` : ''}
                  Nunca Fuimos Normales
                </p>
                <div className="w-full bg-white/10 h-1 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-primary w-1/3" />
                </div>
              </div>

              {/* Botón play */}
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white translate-x-0.5">play_arrow</span>
              </div>
            </a>
          ) : (
            /* Fallback si no hay playlist */
            <a
              href="https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo"
              target="_blank"
              rel="noopener noreferrer"
              className="my-16 bg-zinc-900 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6 hover:border-primary/30 transition-colors group block"
            >
              <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-primary text-4xl">album</span>
              </div>
              <div className="flex-1">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1 block">
                  Escuchar en Spotify
                </span>
                <h4 className="font-display font-bold text-lg uppercase mb-1">Nunca Fuimos Normales</h4>
                <p className="text-gray-500 text-xs mb-3">El podcast definitivo del rock</p>
                <div className="w-full bg-white/10 h-1 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-primary w-1/3" />
                </div>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <span className="material-symbols-outlined text-white translate-x-0.5">play_arrow</span>
              </div>
            </a>
          )}

          {/* Tags */}
          {node.field_tags && node.field_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
              {node.field_tags.map((tag) => (
                <span key={tag.id}
                  className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 rounded-full">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ── CTA NEWSLETTER ── */}
      <section className="bg-primary py-20 px-6 lg:px-20 text-center overflow-hidden relative">
        <div className="absolute -top-10 -right-10 text-white/10 text-9xl font-black italic select-none pointer-events-none">
          BACKSTAGE
        </div>
        <div className="max-w-2xl mx-auto relative z-10">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-6">
            ¿TE GUSTÓ ESTA HISTORIA?
          </h3>
          <p className="text-black/80 font-bold text-lg mb-10 leading-tight uppercase">
            Únete al backstage para recibir contenido inédito y desgloses técnicos de los discos que marcaron tu vida.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              className="flex-1 bg-black text-white border-none px-6 py-4 rounded-lg focus:ring-2 focus:ring-black placeholder-gray-500 text-sm"
              placeholder="TU EMAIL DE ROCKSTAR"
              type="email"
              required
            />
            <button type="submit"
              className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-lg text-xs">
              SUSCRIBIRME
            </button>
          </form>
        </div>
      </section>

      {/* ── ARTÍCULOS RELACIONADOS ── */}
      {relatedArticles.length > 0 && (
        <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-3xl font-black uppercase tracking-tighter italic whitespace-nowrap">
              MÁS HISTORIAS
            </h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedArticles.map((article) => {
              const relImageUrl = article.field_image?.uri?.url
                ? absoluteUrl(article.field_image.uri.url)
                : null;
              const relPath = article.path?.alias || `/node/${article.drupal_internal__nid}`;
              return (
                <Link key={article.id} href={relPath} className="group cursor-pointer block">
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-zinc-800 mb-6 relative">
                    {relImageUrl ? (
                      <Image
                        src={relImageUrl}
                        alt={article.field_image?.resourceIdObjMeta?.alt || article.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/20 text-6xl">image</span>
                      </div>
                    )}
                  </div>
                  {article.field_category && (
                    <span className="text-vintage-gold text-[10px] font-black uppercase tracking-widest mb-2 block">
                      {article.field_category.name}
                    </span>
                  )}
                  <h4 className="text-xl font-bold uppercase group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}