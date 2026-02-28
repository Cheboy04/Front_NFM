import Link from 'next/link';
import Image from 'next/image';
import type { SpotifyEpisode } from '@/lib/spotify';

interface EpisodeCardProps {
  episode: SpotifyEpisode;
  index: number;
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}min`;
  return `${minutes} min`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();
}

// Extrae número de episodio del título (ej: "Episodio 12 - ...")
function extractEpisodeNumber(name: string): string | null {
  const match = name.match(/[Ee]pisodio\s+(\d+)/);
  return match ? match[1] : null;
}

// Trunca descripción a N caracteres
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '...';
}

export default function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const image = episode.images?.[0]?.url;
  const epNumber = extractEpisodeNumber(episode.name);
  // Limpia el título quitando "Episodio X - " del principio
  const cleanTitle = episode.name.replace(/^[Ee]pisodio\s+\d+\s*[-–]\s*/, '');

  return (
    <a
      href={episode.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-zinc-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        {image ? (
          <Image
            src={image}
            alt={episode.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-white/20 text-7xl">album</span>
          </div>
        )}

        {/* Overlay con play */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 scale-90 group-hover:scale-100 transition-transform">
            <span className="material-symbols-outlined text-white text-3xl translate-x-0.5">play_arrow</span>
          </div>
        </div>

        {/* Badge número de episodio */}
        {epNumber && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
            EP. {epNumber}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-black uppercase tracking-tight text-sm leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {cleanTitle}
        </h4>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
          {truncate(episode.description, 120)}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-primary text-sm">schedule</span>
            {formatDuration(episode.duration_ms)}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
            {formatDate(episode.release_date)}
          </div>
        </div>
      </div>
    </a>
  );
}
