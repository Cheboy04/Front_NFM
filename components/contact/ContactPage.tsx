'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { SpotifyEpisode } from '@/lib/spotify';

const CONTACT_SUBJECTS = [
  'Sugerir una banda / artista',
  'Propuesta de colaboración',
  'Prensa y Medios',
  'Reportar un error técnico',
  'Otro',
];

const SOCIAL_LINKS = [
  { icon: 'public', href: 'https://www.instagram.com', label: 'Instagram' },
  { icon: 'smart_display', href: 'https://www.youtube.com/@NuncaFuimosNormalesROCKTALKS', label: 'YouTube' },
  { icon: 'podcasts', href: 'https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo', label: 'Spotify' },
];

const FAQS = [
  {
    q: '¿Cómo sugiero una banda?',
    a: 'Completa el formulario seleccionando "Sugerir una banda". Incluye links a su Spotify o YouTube para que podamos escucharlos.',
  },
  {
    q: '¿Hacen colaboraciones pagadas?',
    a: 'Sí, trabajamos con marcas que resuenen con nuestra identidad. Pídenos el Media Kit a través del formulario.',
  },
];

function formatDuration(ms: number): string {
  const total = Math.floor(ms / 60000);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h ${m}min` : `${m} min`;
}

function extractEpisodeNumber(name: string): string | null {
  const match = name.match(/[Ee]pisodio\s+(\d+)/);
  return match ? match[1] : null;
}

interface ContactPageProps {
  latestEpisode?: SpotifyEpisode | null;
}

export default function ContactPage({ latestEpisode}: ContactPageProps) {
  const [charCount, setCharCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const episodeImage = latestEpisode?.images?.[0]?.url;
  const epNumber = latestEpisode ? extractEpisodeNumber(latestEpisode.name) : null;
  const cleanTitle = latestEpisode?.name.replace(/^[Ee]pisodio\s+\d+\s*[-–]\s*/, '') ?? '';

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[25vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        {/* Textura amplificador */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background-dark" />
        <div className="grunge-overlay absolute inset-0 opacity-20" />

        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic mb-4">
            HABLEMOS DE <span className="text-primary">ROCK</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto uppercase tracking-widest text-sm font-medium">
            ¿Tenés una historia que merece ser contada? ¿Querés colaborar? El micrófono está abierto.
          </p>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── FORMULARIO ── */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-950 p-8 md:p-10 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden">
              {/* Glow decorativo */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary shrink-0" />
                ENVÍANOS UN MENSAJE
              </h3>

              <form className="space-y-6">
                {/* Nombre + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-500">
                      Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre artístico o real"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-primary text-white placeholder-zinc-600 text-sm transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-primary text-white placeholder-zinc-600 text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Asunto
                  </label>
                  <select className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-primary text-white text-sm transition-colors appearance-none cursor-pointer">
                    {CONTACT_SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-500">
                      Mensaje
                    </label>
                    <span className="text-[11px] font-mono text-zinc-300">
                      {charCount} / 600
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    maxLength={1000}
                    placeholder="Contanos tu historia..."
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-primary text-white placeholder-zinc-600 text-sm transition-colors resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-xl">attach_file</span>
                    Adjuntar Archivo
                  </button>
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-primary px-10 py-4 rounded-lg font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm"
                  >
                    ENVIAR MENSAJE
                    <span className="text-base">🤘</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-5 space-y-10">

            {/* Info de contacto */}
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                Información de contacto
              </h4>
              <div className="space-y-4">
                <a href="mailto:hola@nfn.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-[14px] uppercase font-bold text-gray-500 tracking-wider leading-none mb-1">
                      Escribenos a
                    </p>
                    <p className="text-lg font-bold">hola@nfn.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-[10x] uppercase font-bold text-gray-500 tracking-wider leading-none mb-1">
                      Tiempo de respuesta
                    </p>
                    <p className="text-lg font-bold">24 - 48 Horas</p>
                  </div>
                </div>
              </div>

              {/* Redes */}
              <div className="pt-2">
                <p className="text-[12px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-4">
                  Siguenos en el backstage
                </p>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">{s.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ accordion */}
            <div className="space-y-6 pt-6 border-t border-white/10">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                Preguntas Frecuentes
              </h4>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900/30 rounded-lg overflow-hidden border border-white/5"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <span className="text-md font-bold uppercase tracking-tight">{faq.q}</span>
                      <span className="material-symbols-outlined text-primary shrink-0 ml-4">
                        {openFaq === i ? 'remove' : 'add'}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-md text-gray-400 leading-relaxed italic">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Press kit */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <span className="material-symbols-outlined text-8xl">newspaper</span>
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-2">
                Sección de Prensa
              </h4>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Descarga nuestro kit oficial: logos, fotos en alta resolución y biografía del equipo.
              </p>
              <button className="w-full py-3 border-2 border-primary text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded hover:bg-primary hover:text-white transition-all">
                DESCARGAR KIT
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── CTA SPOTIFY ── */}
      <section className="bg-primary py-16 px-6 lg:px-20 mt-12 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-10 top-0 text-white/10 text-9xl font-black italic select-none pointer-events-none">
          LISTEN
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic mb-4 leading-none">
              MIENTRAS ESPERÁS <br />
              <span className="text-black/30">NUESTRA RESPUESTA...</span>
            </h3>
            <p className="text-white/80 font-medium max-w-md uppercase tracking-widest text-xs">
              Dale play al último episodio y sumergete en el lado B del rock.
            </p>
          </div>

          {/* Mini player decorativo */}
          <a
            href={latestEpisode?.external_urls.spotify ?? 'https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-white/30 transition-colors block group"
          >
            <div className="w-full flex items-center px-4 gap-4 py-3 bg-black/30 rounded-xl border border-white/5">
              {/* Imagen del episodio */}
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 shrink-0 relative">
                {episodeImage ? (
                  <Image
                    src={episodeImage}
                    alt={latestEpisode?.name ?? 'Episodio'}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">album</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {epNumber && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50 block mb-0.5">
                    EP. {epNumber}
                  </span>
                )}
                <p className="text-sm font-bold text-white leading-tight line-clamp-1 group-hover:text-white/80 transition-colors">
                  {cleanTitle || 'Nunca Fuimos Normales'}
                </p>
                {latestEpisode && (
                  <p className="text-[10px] text-white/50 mt-0.5">
                    {formatDuration(latestEpisode.duration_ms)}
                  </p>
                )}
              </div>

              {/* Play */}
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                <span className="material-symbols-outlined text-white translate-x-0.5">play_arrow</span>
              </div>
            </div>
            <p className="text-[10px] text-center mt-3 font-bold uppercase tracking-[0.3em] text-black/50">
              Escuchar en Spotify
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
