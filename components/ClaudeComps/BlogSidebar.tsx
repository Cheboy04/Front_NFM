import Image from 'next/image';
import type { SpotifyPlaylist } from '@/lib/spotify';

interface Band {
  name: string;
  postCount: number;
}

interface BlogSidebarProps {
  topBands?: Band[];
  playlist?: SpotifyPlaylist;
}

const DEFAULT_BANDS: Band[] = [
  { name: 'Pink Floyd', postCount: 42 },
  { name: 'Led Zeppelin', postCount: 38 },
  { name: 'Nirvana', postCount: 31 },
  { name: 'Rolling Stones', postCount: 27 },
  { name: 'Black Sabbath', postCount: 22 },
];

export default function BlogSidebar({ topBands, playlist }: BlogSidebarProps) {
  const bandsToShow = topBands?.length ? topBands : DEFAULT_BANDS;
  const playlistImage = playlist?.images?.[0]?.url;

  return (
    <aside className="lg:col-span-4 space-y-12">

      {/* Newsletter Widget */}
      <div className="bg-zinc-900/50 p-8 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="grunge-overlay absolute inset-0 opacity-10" />
        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4 italic relative z-10">
          SUSCRÍBETE AL BACKSTAGE
        </h4>
        <p className="text-gray-500 text-xs mb-6 relative z-10">
          Recibe material inédito y alertas de nuevos capítulos antes que nadie.
        </p>
        <form className="space-y-4 relative z-10">
          <input
            className="w-full bg-black border border-white/10 rounded-lg text-xs py-3 px-4 focus:outline-none focus:border-primary text-white placeholder-gray-500 transition-colors"
            placeholder="Tu mejor email"
            type="email"
            required
          />
          <button type="submit"
            className="w-full bg-primary py-3 rounded-lg text-white font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all">
            Suscribirme
          </button>
        </form>
      </div>

      {/* Top Bands Widget */}
      <div>
        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 border-l-4 border-primary pl-4">
          BANDAS MÁS BUSCADAS
        </h4>
        <ul className="space-y-4">
          {bandsToShow.map((band, index) => (
            <li key={index}
              className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-3 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-primary/40 w-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                  {band.name}
                </span>
              </div>
              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 border border-white/5">
                {band.postCount} posts
              </span>
            </li>
          ))}
        </ul>
      </div>

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
