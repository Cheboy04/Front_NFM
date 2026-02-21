import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-background-light dark:bg-zinc-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Polaroid Style Collage */}
        <div className="relative">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* First Polaroid */}
            <div className="absolute top-0 left-0 w-64 h-80 bg-white shadow-xl rotate-[-6deg] p-4 z-20">
              <div className="relative w-full h-60">
                <Image
                  src="/images/polaroid-1.jpg"
                  alt="Vintage black and white photo of a drummer"
                  fill
                  className="object-cover grayscale"
                  sizes="256px"
                />
              </div>
              <p className="mt-4 font-mono text-black text-xs text-center">STUDIO SESSIONS '78</p>
            </div>

            {/* Second Polaroid */}
            <div className="absolute bottom-0 right-0 w-64 h-80 bg-white shadow-xl rotate-[8deg] p-4 z-30 border border-gray-200">
              <div className="relative w-full h-60">
                <Image
                  src="/images/polaroid-2.jpg"
                  alt="Candid photo of musicians sitting on a sofa"
                  fill
                  className="object-cover grayscale"
                  sizes="256px"
                />
              </div>
              <p className="mt-4 font-mono text-black text-xs text-center">BACKSTAGE L.A. '91</p>
            </div>

            {/* Background Geometric Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-primary/10 rotate-[15deg] z-10"></div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-8">
            NUNCA FUIMOS <br />
            <span className="text-primary">NORMALES</span>
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Nacimos de la obsesión por lo que ocurre cuando se apagan los amplificadores. No somos
            críticos de música; somos narradores de la mitología del rock. Investigamos los archivos
            olvidados para traerte la verdad detrás de las leyendas que cambiaron tu vida.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <span className="block text-3xl font-black text-white italic">+150</span>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                Episodios
              </span>
            </div>
            <div>
              <span className="block text-3xl font-black text-white italic">250K</span>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                Oyentes Mensuales
              </span>
            </div>
          </div>
          
          <Link
            href="/about"
            className="px-8 py-3 
            text-black dark:text-white 
            font-bold uppercase tracking-widest 
            border-2 border-primary rounded-lg 
            hover:bg-primary hover:text-white 
            transition-all"
          >
            Nuestra Misión
          </Link>
        </div>
      </div>
    </section>
  );
}
