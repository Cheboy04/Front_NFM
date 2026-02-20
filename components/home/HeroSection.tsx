import Image from 'next/image';
import concert from '@/public/images/hero-concert.png'

export default function HeroSection() {
  return (
    <section className="relative min-h-[105vh] flex items-center justify-start overflow-hidden bg-zinc-900">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 "></div>
        <Image
          src={concert}
          alt="Cinematic shot of a rock concert stage with smoke and lights"
          fill
          className="object-cover object-[70%_center]"
          priority
          sizes="100vw"
        />
        <div className="grunge-overlay absolute inset-0 opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full -translate-y-20">
        <div className="max-w-2xl">
          <span className="inline-block bg-primary px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase mb-6">
            Nuevo Episodio
          </span>
          <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-6 italic">
            EL LADO B <br />
            <span className="text-white/40">DEL DISCO</span>
          </h2>
          <p className="text-lg md:text-xl font-medium text-gray-300 mb-10 max-w-lg leading-relaxed">
            Historias no contadas del rock que marcó generaciones. Desde los excesos en el backstage
            hasta los mitos urbanos de los 70s y 90s.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-3 bg-primary px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-primary/90 transition-all group">
              <span className="material-symbols-outlined group-hover:scale-125 transition-transform">
                play_circle
              </span>
              ESCUCHAR ÚLTIMO EPISODIO
            </button>
            <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20">
              VER TRACKLIST
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Vinyl Element */}
      <div className="absolute -right-32 bottom-20 opacity-20 rotate-12 hidden lg:block pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border-[30px] border-white/20 relative">
          <div className="absolute inset-[30%] rounded-full border-[10px] border-white/10"></div>
        </div>
      </div>
    </section>
  );
}
