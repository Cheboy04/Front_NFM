'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import nfmLogo from '@/public/images/Logo-NFM.svg';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/about', label: 'Nosotros' },
  { href: '/contactanos', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full h-20 border-b border-white/10 backdrop-blur-md px-6 lg:px-20 transition-colors duration-300 ${
        scrolled ? 'bg-background-dark/95' : 'bg-background-dark/80'
      }`}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 h-full hover:opacity-80 transition-opacity">
            <Image
              src={nfmLogo}
              alt="Logo Nunca Fuimos Normales"
              className="h-[70%] w-auto"
              priority
            />
            <h1 className="text-xl font-bold tracking-tighter uppercase leading-none">
              Nunca Fuimos <br />
              <span className="text-primary">Normales</span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                  pathname === href ? 'text-primary' : 'hover:text-primary'
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-6">
              <a href="https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo" target="_blank" rel="noopener noreferrer"
                className="hover:text-primary transition-colors" aria-label="Spotify">
                <span className="material-symbols-outlined">podcasts</span>
              </a>
              <a href="https://www.youtube.com/@NuncaFuimosNormalesROCKTALKS" target="_blank" rel="noopener noreferrer"
                className="hover:text-primary transition-colors" aria-label="YouTube">
                <span className="material-symbols-outlined">smart_display</span>
              </a>
            </div>

            <Link href="/login"
              className="hidden sm:inline-flex px-5 py-2 border-2 border-primary text-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
              Ingresar Sesión
            </Link>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(true)} aria-label="Abrir menú"
              className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 bottom-0 w-[300px] z-50 md:hidden
        bg-zinc-950 border-l border-white/10
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_20%_0%,rgba(230,55,70,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src={nfmLogo} alt="Logo NFM" className="h-10 w-auto" width={40} height={40} />
              <span className="text-sm font-bold tracking-tighter uppercase leading-none">
                Nunca Fuimos <br /><span className="text-primary">Normales</span>
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú"
              className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-px bg-white/10 mb-6" />

          {/* Nav links */}
          <nav className="flex flex-col gap-2 flex-1">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className={`
                  flex items-center justify-between py-3.5 px-4 rounded-xl border
                  text-sm font-bold uppercase tracking-widest transition-all duration-200
                  ${isActive
                    ? 'text-primary bg-primary/10 border-primary/20'
                    : 'text-white/80 border-white/5 hover:bg-white/5 hover:border-white/10 hover:translate-x-1'
                  }
                `}>
                  {label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                </Link>
              );
            })}
          </nav>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-6" />

          {/* Social + Login */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <a href="https://open.spotify.com/show/56jjWvbGxEQiCVoVuc0vGo" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 bg-white/5 hover:border-primary transition-all text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-base">podcasts</span>
                Spotify
              </a>
              <a href="https://www.youtube.com/@NuncaFuimosNormalesROCKTALKS" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 bg-white/5 hover:border-primary transition-all text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-base">smart_display</span>
                YouTube
              </a>
            </div>
            <Link href="/login"
              className="block w-full text-center py-3.5 border-2 border-primary text-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
              Ingresar Sesión
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}