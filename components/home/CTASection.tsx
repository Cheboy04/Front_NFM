export default function CTASection() {
  return (
    <section className="bg-primary py-12 px-6 lg:px-20 overflow-hidden relative">
      <div className="absolute -left-10 top-0 text-white/10 text-9xl font-black italic select-none">
        LISTEN NOW
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-center md:text-left">
          DISPONIBLE EN TODAS LAS <br />
          <span className="text-black/30">PLATAFORMAS</span>
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined">radio</span> ESCUCHAR EN SPOTIFY
          </a>
          <a
            href="https://www.youtube.com/@NuncaFuimosNormalesROCKTALKS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined">video_library</span> VER EN YOUTUBE
          </a>
        </div>
      </div>
    </section>
  );
}
