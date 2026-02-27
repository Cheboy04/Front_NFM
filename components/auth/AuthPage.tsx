'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import concert from '@/public/images/hero-concert.png'

// ── Tipos ──────────────────────────────────────────────────────────────────
type Tab = 'login' | 'register';
type PasswordStrength = { label: string; color: string; bars: number };

// ── Helpers ────────────────────────────────────────────────────────────────
const BENEFITS = [
  { icon: 'favorite', label: 'Guarda tus favoritos' },
  { icon: 'forum', label: 'Comenta los episodios' },
  { icon: 'auto_awesome', label: 'Recomendaciones personalizadas' },
  { icon: 'key', label: 'Acceso exclusivo' },
];

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { label: '', color: 'bg-zinc-800', bars: 0 };
  if (password.length < 6) return { label: 'Débil', color: 'bg-red-500', bars: 1 };
  if (password.length < 10) return { label: 'Media', color: 'bg-yellow-500', bars: 2 };
  return { label: 'Fuerte', color: 'bg-green-500', bars: 3 };
}

// ── Componente principal ───────────────────────────────────────────────────
export default function AuthPage({ defaultTab = 'login' }: { defaultTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">

      {/* ── PANEL IZQUIERDO ────────────────────────────────────────────── */}
      <section className="relative w-full md:w-1/2 min-h-[380px] md:min-h-screen overflow-hidden flex flex-col justify-between p-10 lg:p-20">
        {/* Fondo */}
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

        {/* Logo */}
        <div className="relative z-30">
          <Link href="/" className="flex items-center gap-3 mb-10 w-fit">
            <div className="bg-white p-2 rounded-sm shadow-xl">
              <span className="material-symbols-outlined text-black text-3xl">album</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none text-white">
              Nunca Fuimos <br />
              <span className="text-white">Normales</span>
            </h1>
          </Link>

          {tab === 'login' && (
            <p className="text-2xl lg:text-3xl font-black italic uppercase tracking-tight text-white/90 leading-tight max-w-sm">
              LA MITOLOGÍA DEL ROCK EN TUS OÍDOS.
            </p>
          )}
        </div>

        {/* Benefits list */}
        <div className="relative z-30">
          <ul className="space-y-5 mb-10">
            {BENEFITS.map((b) => (
              <li key={b.icon} className="flex items-center gap-4">
                <span className="material-symbols-outlined text-white bg-white/20 p-2 rounded-full text-lg">
                  {b.icon}
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-white">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Quote */}
          <div className="border-l-4 border-white pl-6">
            <p className="text-lg italic font-medium text-white/80">
              "El rock no se trata de ser normal, se trata de ser real."
            </p>
            <span className="block mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
              — Backstage Diaries
            </span>
          </div>
        </div>
      </section>

      {/* ── PANEL DERECHO ──────────────────────────────────────────────── */}
      <main className="w-full md:w-1/2 bg-background-dark flex flex-col items-center justify-center p-8 lg:p-20 relative min-h-screen">

        {/* Ícono decorativo */}
        <div className="absolute bottom-8 right-8 opacity-[0.03] hidden lg:block pointer-events-none select-none">
          <span className="material-symbols-outlined text-[150px]">graphic_eq</span>
        </div>

        <div className="w-full max-w-md">

          {/* ── Tabs ── */}
          <div className="flex gap-8 mb-10 border-b border-white/10">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${
                  tab === t
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                {t === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
              </button>
            ))}
          </div>

          {/* ── LOGIN ── */}
          {tab === 'login' && (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">
                  BIENVENIDO DE VUELTA
                </h2>
                <p className="text-gray-500 text-sm">
                  Ingresa tus credenciales para acceder al lado B.
                </p>
              </div>

              <form className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-4 px-5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Contraseña
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-4 px-5 text-sm text-white focus:outline-none focus:border-primary transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 bottom-4 text-gray-500 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Remember + forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 accent-primary"
                    />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                      Recordarme
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-lg uppercase tracking-[0.2em] text-sm shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  INICIAR SESIÓN
                </button>
              </form>

              <SocialDivider />
              <SocialButtons />

              <p className="text-center text-xs font-medium text-gray-500 uppercase tracking-widest mt-10">
                ¿Aún no eres parte?{' '}
                <button
                  onClick={() => setTab('register')}
                  className="text-primary font-black hover:underline underline-offset-4 ml-1"
                >
                  Regístrate aquí
                </button>
              </p>
            </>
          )}

          {/* ── REGISTER ── */}
          {tab === 'register' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-1">
                  ÚNETE A LA COMUNIDAD
                </h2>
                <p className="text-gray-500 text-sm">Crea tu cuenta y descubre el lado B.</p>
              </div>

              <form className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 px-5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 px-5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Password + strength meter */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 px-5 text-sm text-white focus:outline-none focus:border-primary transition-colors pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>

                  {/* Strength bars */}
                  {password && (
                    <>
                      <div className="flex gap-1.5 pt-1">
                        {[1, 2, 3].map((bar) => (
                          <div
                            key={bar}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              bar <= strength.bars ? strength.color : 'bg-zinc-800'
                            }`}
                          />
                        ))}
                      </div>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          strength.bars === 1
                            ? 'text-red-500'
                            : strength.bars === 2
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      >
                        Nivel: {strength.label}
                      </p>
                    </>
                  )}
                </div>

                {/* Confirm password */}
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    Confirmar Contraseña
                  </label>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 px-5 text-sm text-white focus:outline-none focus:border-primary transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 bottom-3.5 text-gray-500 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showConfirm ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 rounded bg-zinc-800 border-zinc-700 accent-primary shrink-0"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors">
                      Acepto los{' '}
                      <Link href="/terminos" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>{' '}
                      y la política de privacidad.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4 rounded bg-zinc-800 border-zinc-700 accent-primary shrink-0"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors">
                      Quiero recibir el Newsletter con{' '}
                      <span className="italic">historias épicas</span> del rock.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-lg uppercase tracking-[0.2em] text-sm shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  CREAR MI CUENTA
                </button>
              </form>

              <SocialDivider />
              <SocialButtons />

              <p className="text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-8">
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => setTab('login')}
                  className="text-primary hover:underline underline-offset-4 ml-1"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Sub-componentes ────────────────────────────────────────────────────────
function SocialDivider() {
  return (
    <div className="relative my-8 flex items-center">
      <div className="flex-grow border-t border-white/5" />
      <span className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">O</span>
      <div className="flex-grow border-t border-white/5" />
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Google */}
      <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-primary py-3.5 rounded-lg transition-all group">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
          Google
        </span>
      </button>

      {/* Facebook */}
      <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-primary py-3.5 rounded-lg transition-all group">
        <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
          Facebook
        </span>
      </button>
    </div>
  );
}
