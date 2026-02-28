import Image from 'next/image';
import type { SpotifyPlaylist, SpotifyEpisode } from '@/lib/spotify';

interface BlogSidebarProps {
  playlist?: SpotifyPlaylist;
  latestEpisode?: SpotifyEpisode;
}

function formatDuration(ms: number): string {
  const total = Math.floor(ms / 60000);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h ${m}min` : `${m} min`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).toUpperCase();
}

function extractEpisodeNumber(name: string): string | null {
  const match = name.match(/[Ee]pisodio\s+(\d+)/);
  return match ? match[1] : null;
}

export default function BlogSidebar({ playlist, latestEpisode }: BlogSidebarProps) {
  const playlistImage = playlist?.images?.[0]?.url;
  const episodeImage = latestEpisode?.images?.[0]?.url;
  const epNumber = latestEpisode ? extractEpisodeNumber(latestEpisode.name) : null;
  const cleanTitle = latestEpisode?.name.replace(/^[Ee]pisodio\s+\d+\s*[-–]\s*/, '') ?? '';


  return (
    <aside className="lg:col-span-4 space-y-12">
      {/* Newsletter Widget */}
      <div className="bg-zinc-900/50 p-8 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="grunge-overlay absolute inset-0 opacity-10"></div>
        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4 italic relative z-10">
          SUSCRÍBETE AL BACKSTAGE
        </h4>
        <p className="text-gray-500 text-xs mb-6 relative z-10">
          Recibe material inédito y alertas de nuevos capítulos antes que nadie.
        </p>
        <form className="space-y-4 relative z-10">
          <input
            className="w-full bg-black border-white/10 rounded-lg text-xs py-3 px-4 focus:ring-primary focus:border-primary text-white placeholder-gray-500"
            placeholder="Tu mejor email"
            type="email"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary py-3 rounded-lg text-white font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all"
          >
            Suscribirme
          </button>
        </form>
      </div>

      {/* Último Episodio */}

      {latestEpisode && (
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 border-l-4 border-primary pl-4">
            ÚLTIMO EPISODIO
          </h4>
          <a
            href={latestEpisode.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-zinc-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
          >
            {/* Imagen */}
            <div className="relative aspect-square overflow-hidden bg-zinc-800">
              {episodeImage ? (
                <Image
                  src={episodeImage}
                  alt={latestEpisode.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/20 text-7xl">album</span>
                </div>
              )}

              {/* Overlay play */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 scale-90 group-hover:scale-100 transition-transform">
                  <span className="material-symbols-outlined text-white text-2xl translate-x-0.5">play_arrow</span>
                </div>
              </div>

              {epNumber && (
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                  EP. {epNumber}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5">
              <h5 className="font-black uppercase tracking-tight text-sm leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {cleanTitle}
              </h5>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                  {formatDuration(latestEpisode.duration_ms)}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                  {formatDate(latestEpisode.release_date)}
                </div>
              </div>
            </div>
          </a>
        </div>
      )}


      {/* Playlist Widget */}
      {playlist ? (
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-xl overflow-hidden aspect-square group block"
              >
                {/* Imagen de la playlist */}
                {playlistImage ? (
                  <Image
                    src={playlistImage}
                    alt={playlist.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/20 text-7xl">queue_music</span>
                  </div>
                )}
      
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                  <span className="text-primary font-black text-[10px] tracking-widest uppercase mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">queue_music</span>
                    Playlist de la Semana
                  </span>
                  <h5 className="text-lg font-black uppercase mb-1 leading-tight line-clamp-2">
                    {playlist.name}
                  </h5>
                  {playlist.tracks?.total && (
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-4">
                      {playlist.tracks.total} canciones
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    ESCUCHAR EN SPOTIFY
                  </div>
                </div>
              </a>
            ) : (
              // Fallback si no hay playlist
              <div className="relative rounded-xl overflow-hidden aspect-square bg-zinc-900 border border-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-white/10 text-8xl">queue_music</span>
              </div>
            )}
    </aside>
  );
}
