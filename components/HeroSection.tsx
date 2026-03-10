'use client';

import { useScrollAnimation, fadeUp, fadeIn } from '@/hooks/useScrollAnimation';

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      {/* Gradient fallback when no image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, #3BBFB8 0%, #6DC8A0 15%, #A8C870 30%, #C8B850 45%, #D4A040 55%, #6A9E60 75%, #2E7A55 100%)',
        }}
      />

      {/* Logo — top right, sits behind the fixed navbar */}
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          padding: '1rem 1.5rem',
          ...fadeIn(isVisible, 200),
        }}
      >
        <img
          src="/images/logo.png"
          alt="Ceylinco Life"
          style={{
            height: 'clamp(4.5rem, 9vw, 7rem)',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.35))',
          }}
        />
      </div> */}

      {/* Search Bar
      <div className="flex justify-end pt-6 px-4" style={fadeIn(isVisible, 200)}>
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-3 w-72 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-700 flex-1 placeholder:text-gray-400"
          />
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20 pb-24 pt-8">
        <h1
          className="font-black leading-none tracking-wide uppercase"
          style={{
            marginTop: '20vh',
            fontSize: 'clamp(4.5rem, 13vw, 10rem)',
            color: '#F5A623',
            textShadow: '0 10px 20px rgba(0,0,0,0.15)',
            ...fadeUp(isVisible, 0),
          }}
        >
          GUIDED
        </h1>

        <div className="mt-3 space-y-1">
          <h2
            className="text-white font-bold leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              ...fadeUp(isVisible, 150),
            }}
          >
            For Life
          </h2>
          <h2
            className="text-white font-bold leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              ...fadeUp(isVisible, 300),
            }}
          >
            For Generations
          </h2>
        </div>

        <div className="mt-8 space-y-1" style={fadeUp(isVisible, 450)}>
          <p
            className="font-bold tracking-widest uppercase"
            style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', color: '#b21616' }}
          >
            Ceylinco Life Insurance Limited
          </p>
          <p
            className="text-white tracking-widest uppercase font-medium"
            style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}
          >
            Integrated Annual Report 2025
          </p>
        </div>
      </div>

    </section>
  );
}
