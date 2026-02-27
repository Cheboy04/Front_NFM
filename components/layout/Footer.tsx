import Link from 'next/link';
import Image from 'next/image';
import nfmLogo from '@/public/images/Logo-NFM.svg'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <Image
                src={nfmLogo}
                alt="Logo Nunca Fuimos Normales"
                width={120}
                height={120}
                className="w-[120px] h-auto"
                priority
              />
            </Link>
            <p className="text-gray-400 text-s leading-relaxed mb-6">
              El podcast definitivo sobre la cultura, los excesos y la genialidad del rock and roll.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a
                href="https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Spotify"
              >
                <span className="material-symbols-outlined text-lg">podcasts</span>
              </a>
              <a
                href="https://www.youtube.com/@NuncaFuimosNormalesROCKTALKS"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <span className="material-symbols-outlined text-lg">smart_display</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-md mb-8">
              Navegación
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium"
                >
                  Episodios
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-400 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium"
                >
                  Blog de Backstage
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium"
                >
                  Merchandise
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-md mb-8">
              Legales
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacidad"
                  className="text-gray-400 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-gray-400 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium"
                >
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/contactanos"
                  className="text-gray-400 text-sm hover:text-white transition-colors uppercase tracking-widest font-medium"
                >
                  Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="bg-zinc-900/50 p-8 rounded-xl border border-white/5">
            <h4 className="text-white font-black uppercase tracking-widest text-s mb-4 italic">
              SUSCRÍBETE AL BACKSTAGE
            </h4>
            <p className="text-gray-400 text-xs mb-6">
              Recibe noticias exclusivas y alertas de nuevos capítulos directo en tu correo.
            </p>
            <form className="space-y-3">
              <input
                className="w-full bg-black border-white/10 rounded-lg text-s py-3 px-4 focus:ring-primary focus:border-primary text-white"
                placeholder="Email"
                type="email"
                id="email"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary py-3 rounded-lg text-white font-bold text-xs uppercase tracking-widest hover:bg-primary/70 transition-all"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
            © 2026 Nunca Fuimos Normales. Producido por...
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">
            <span>Loud</span>
            <span>Raw</span>
            <span>Real</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
