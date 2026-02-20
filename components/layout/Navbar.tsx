import Link from 'next/link';
import nfmLogo from '@/public/images/Logo-NFM.svg'
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-20 border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 h-full hover:opacity-80 transition-opacity">
          <Image
            src={nfmLogo}
            alt="Logo Nunca Fuimos Normales"
            className="h-full w-auto"
            priority
          />
          <h1 className="text-xl font-bold tracking-tighter uppercase leading-none">
            Nunca Fuimos <br />
            <span className="text-primary">Normales</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/contactanos"
            className="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Social Icons & Login Button */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4 border-r border-white/10 pr-6">
            <a
              href="https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Escuchar en Spotify"
            >
              <span className="material-symbols-outlined">podcasts</span>
            </a>
            <a
              href="https://www.youtube.com/@NuncaFuimosNormalesROCKTALKS"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Ver en YouTube"
            >
              <span className="material-symbols-outlined">smart_display</span>
            </a>
          </div>
          <Link
            href="/login"
            className="px-5 py-2 border-2 border-primary text-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all"
          >
            Ingresar Sesión
          </Link>
        </div>
      </div>
    </header>
  );
}
