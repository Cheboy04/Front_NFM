'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import heroImage from '@/public/images/hero-aboutUs.png'

const SOUNDWAVE_DELAYS = [0.1, 0.3, 0.2, 0.4, 0.1, 0.5, 0.2, 0.3];

const WHAT_WE_DO = [
  {
    icon: 'search_insights',
    title: 'Investigación Profunda',
    description:
      'Excavamos en archivos analógicos, cintas perdidas y testimonios olvidados para desenterrar la verdad sobre los discos más icónicos.',
  },
  {
    icon: 'mic_external_on',
    title: 'Conversaciones Crudas',
    description:
      'Sin guiones preestablecidos. Hablamos con leyendas y técnicos sobre lo que realmente pasó en el estudio cuando nadie estaba grabando.',
  },
  {
    icon: 'auto_stories', 
    title: 'Historias Épicas',
    description:
      'Nuestra narrativa te transporta a las giras caóticas de los 70 y la angustia grunge de los 90 como si estuvieras allí mismo.',
  },
];

const PROCESS_STEPS = [
  { num: '#01', title: 'Selección', desc: 'Elegimos el álbum o artista que cambió las reglas del juego.' },
  { num: '#02', title: 'Investigación', desc: 'Semanas de rastreo de datos, mitos y realidades ocultas.' },
  { num: '#03', title: 'Conversación', desc: 'Grabamos el episodio con la intensidad de un concierto en vivo.' },
  { num: '#04', title: 'El Lado B', desc: 'Lanzamos la historia al mundo, sin censura ni filtros.' },
];

const STATS = [
  { value: '50+', label: 'Episodios' },
  { value: '30+', label: 'Bandas' },
  { value: '10K+', label: 'Oyentes' },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background-dark z-10" />
          <Image
                src={heroImage}
                alt="Recording studio console and microphones"
                fill
                className="fill object-cover"
                priority
              />
        </div>
      
        <div className="relative z-20 text-center px-6">

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-2">
            NUNCA FUIMOS <span className="text-primary">NORMALES</span>
          </h2>
          <p className="text-primary italic font-medium tracking-[0.3em] uppercase mb-6 text-sm">
            Y QUÉ BUENO QUE NO
          </p>

          {/* Soundwave animada */}
          <div className="flex items-center justify-center gap-1 h-10">
            {SOUNDWAVE_DELAYS.map((delay, i) => (
              <div
                key={i}
                className="soundwave-bar"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          .soundwave-bar {
            @apply bg-primary/40 w-1 rounded-full;
            animation: soundwave 1.5s ease-in-out infinite alternate;
          }
          @keyframes soundwave {
            0% { height: 10px; }
            100% { height: 40px; }
          }
        `}</style>
      </section>

      {/* ── NUESTRA HISTORIA ── */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
          {/* Texto */}
          <div className="lg:col-span-6">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">
              NUESTRA HISTORIA
            </h3>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Todo empezó un domingo.
                Un tío y su sobrino.
                Una conversación larga.
                Un par de riffs sonando de fondo.
                Y una pregunta que lo cambió todo:
              </p>
              <p>
                ¿Por qué guardarnos todo este conocimiento? <br />
                ¿Por qué no convertirlo en algo más grande?
              </p>
              <p>
                Ese domingo, Boris y Julián entendieron que el rock no era solo música. Era memoria. <br />Era identidad. <br />Era cultura viva. <br />

                Hablaron de discos que marcaron generaciones. De conciertos que parecían rituales. De bandas que rompieron moldes y de canciones que salvaron días difíciles. <br />
              </p>
              <p>
                Y decidieron que esas historias no podían quedarse en la sala. <br />

                Tenían que salir. <br />

                Tenían que sonar. <br />
              </p>
              <p>
                Así nació Nunca Fuimos Normales. <br />
              </p>
              <p>
                No como un proyecto comercial. <br />
                No como un programa más. <br />
                Sino como un acto de transmisión.
              </p>
              <p>
                Un espacio donde el rock no se analiza desde la distancia, sino desde la experiencia. <br />

                Donde no hablamos de rankings.
                Hablamos de impacto.
                Hablamos de lo que pasa cuando una canción se convierte en parte de tu vida. <br />
              </p>
              <p>
                Tiempo después se unió Juani.
                Y la conversación creció.
                Se volvió más profunda.
                Más diversa.
                Más intensa.
              </p>
              <p>           
                Hoy, Nunca Fuimos Normales es un podcast de rock en español dedicado a explorar la historia del rock, las bandas icónicas, los discos que redefinieron generaciones y las historias que quedaron fuera del documental oficial.

                Somos cronistas del backstage. <br />
                Narradores de la mitología del rock.
                Inadaptados con micrófono.

                Porque nunca nacimos para flotar.
                Nacimos para agitar.

                Y si tú estás aquí, probablemente tampoco fuiste normal.

                Bienvenido.
              </p>
             
            </div>
          </div>

          {/* Collage polaroids */}
          <div className="lg:col-span-4 relative h-[480px]">
            {/* Polaroid 1 */}
            <div className="absolute top-10 left-0 w-52 h-64 bg-white shadow-2xl rotate-[-12deg] p-3 z-20">
              <div className="w-full h-48 bg-zinc-300 overflow-hidden relative">
                <div className="w-full h-full bg-zinc-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-zinc-500 text-5xl">mic</span>
                </div>
              </div>
              <p className="text-black font-mono text-[9px] mt-2 text-center tracking-widest">
                SESSION #01 - L.A.
              </p>
            </div>

            {/* Polaroid 2 */}
            <div className="absolute bottom-10 right-0 w-56 h-72 bg-white shadow-2xl rotate-[8deg] p-3 z-30 border border-gray-200">
              <div className="w-full h-56 bg-zinc-300 overflow-hidden relative">
                <div className="w-full h-full bg-zinc-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-zinc-600 text-5xl">album</span>
                </div>
              </div>
              <p className="text-black font-mono text-[9px] mt-2 text-center tracking-widest">
                ARCHIVOS '74
              </p>
            </div>

            {/* Nota de producción (decorativa) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-52 bg-zinc-100 p-2 rotate-[2deg] shadow-xl z-10 border border-gray-300">
              <div className="w-full h-full bg-zinc-200 flex flex-col p-4">
                <span className="text-gray-500 font-mono text-[8px] tracking-widest">
                  NOTAS DE PRODUCCIÓN
                </span>
                <div className="mt-3 space-y-2">
                  <div className="h-px w-full bg-gray-400" />
                  <div className="h-px w-3/4 bg-gray-400" />
                  <div className="h-px w-full bg-gray-400" />
                  <div className="h-px w-1/2 bg-gray-400" />
                  <div className="h-px w-full bg-gray-400" />
                </div>
                <div className="mt-auto flex justify-end">
                  <span className="text-primary font-black italic text-lg">NFN</span>
                </div>
              </div>
            </div>

            {/* Decoración geométrica detrás */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-28 bg-primary/10 rotate-[15deg] z-0" />
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="w-full bg-zinc-900 border-l-8 border-primary py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <blockquote className="text-3xl md:text-5xl font-black uppercase tracking-tight italic leading-none">
            "No contamos la historia oficial.{' '}
            <br />
            <span className="text-primary">Contamos la historia REAL."</span>
          </blockquote>
        </div>
      </section>

      {/* ── LO QUE HACEMOS ── */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">
            LO QUE HACEMOS
          </h3>
          <div className="h-1.5 w-24 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHAT_WE_DO.map((item) => (
            <div
              key={item.title}
              className="bg-zinc-900/60 p-10 rounded-xl border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="mb-6 text-primary">
                <span className="material-symbols-outlined text-5xl group-hover:scale-110 transition-transform block">
                  {item.icon}
                </span>
              </div>
              <h4 className="text-xl font-bold uppercase mb-4 tracking-wider">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="py-24 px-6 lg:px-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">
              NUESTRO PROCESO
            </h3>
            <div className="h-1.5 w-24 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="relative pt-10">
                <span className="text-6xl font-black text-primary/20 absolute top-0 -left-2 leading-none select-none">
                  {step.num}
                </span>
                <div className="relative z-10">
                  <h5 className="text-xl font-bold uppercase mb-3">{step.title}</h5>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-primary py-12 px-6 lg:px-20 overflow-hidden relative">
        <div className="absolute -left-10 top-0 text-white/10 text-9xl font-black italic select-none pointer-events-none">
          NFN
        </div>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center gap-10 text-center relative z-10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <span className="block text-6xl font-black text-white italic">{stat.value}</span>
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-black/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-zinc-900" />
          <div className="absolute inset-0 bg-background-dark/80" />
          <div className="grunge-overlay absolute inset-0 opacity-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">
            ÚNETE AL BACKSTAGE
          </h3>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto italic leading-relaxed">
            La historia del rock se sigue escribiendo cada semana. No te pierdas el próximo capítulo del Lado B.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl text-xs"
            >
              <span className="material-symbols-outlined">podcasts</span>
              ESCUCHAR EN SPOTIFY
            </a>
            <a
              href="https://www.youtube.com/@NuncaFuimosNormalesROCKTALKS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-2 border-white/40 text-white px-10 py-5 rounded-lg font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all backdrop-blur-sm text-xs"
            >
              <span className="material-symbols-outlined">smart_display</span>
              VER EN YOUTUBE
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
