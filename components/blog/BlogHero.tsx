'use client';

export default function BlogHero() {
  return (
    <section className="relative h-[40vh] flex items-center justify-center overflow-hidden vinyl-bg">
      <div className="grunge-overlay absolute inset-0 opacity-20"></div>
      <div className="relative z-10 text-center">
        {/* Animated Equalizer Bars */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {[0.1, 0.3, 0.2, 0.4, 0.1].map((delay, index) => (
            <div
              key={index}
              className="equalizer-bar"
              style={{ animationDelay: `${delay}s` }}
            ></div>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
          EL BACKSTAGE <br />
          <span className="text-primary">COMPLETO</span>
        </h2>

        {/* Subtitle */}
        <p className="text-vintage-gold font-bold tracking-[0.3em] text-xs mt-4">
          CRÓNICAS, MITOS Y REALIDADES DEL ROCK
        </p>
      </div>

      <style jsx>{`
        .vinyl-bg {
          background: radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%);
          position: relative;
        }
        .vinyl-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-radial-gradient(
            circle at center,
            transparent 0,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 3px,
            transparent 4px
          );
        }
        .equalizer-bar {
          @apply w-1 bg-primary;
          animation: eq 1s ease-in-out infinite alternate;
        }
        @keyframes eq {
          0% {
            height: 8px;
          }
          100% {
            height: 32px;
          }
        }
      `}</style>
    </section>
  );
}
