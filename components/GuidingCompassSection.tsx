'use client';

import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';

const prideValues = [
  {
    letter: 'P',
    title: 'PROFESSIONALISM',
    description:
      'In delivering life insurance and retirement planning solutions to meet the individual needs of our customers.',
  },
  {
    letter: 'R',
    title: 'REWARDING',
    description: 'Force, and staff for their dedication and loyalty.',
  },
  {
    letter: 'I',
    title: 'INTEGRITY',
    description: 'In everything we do, individually and collectively.',
  },
  {
    letter: 'D',
    title: 'DEDICATION',
    description:
      'In communicating the importance of Life Insurance and Retirement Planning to every Sri Lankan.',
  },
  {
    letter: 'E',
    title: 'EXCELLENCE',
    description:
      'In customer service, product development, innovation and fulfilling our social responsibility.',
  },
];

export default function GuidingCompassSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="compass"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/truenorth-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient fallback */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, #020810 0%, #050E20 40%, #070A18 70%, #030810 100%)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-14 md:mb-20" style={fadeUp(isVisible, 0)}>
          <h2
            className="text-white font-black uppercase leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            OUR GUIDING
          </h2>
          <h2
            className="font-black uppercase leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            COMPASS
          </h2>
        </div>

        {/* PRIDE Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
          {prideValues.map((value, index) => (
            <div
              key={value.letter}
              className="rounded-2xl p-5 md:p-6 text-center flex flex-col items-center"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.7s ease ${200 + index * 120}ms, transform 0.7s ease ${200 + index * 120}ms`,
              }}
            >
              {/* Letter */}
              <div
                className="font-black leading-none mb-3"
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: '#F5A623' }}
              >
                {value.letter}
              </div>

              {/* Title */}
              <div
                className="font-bold uppercase tracking-wider mb-4 leading-tight"
                style={{
                  fontSize: 'clamp(0.6rem, 0.9vw, 0.7rem)',
                  color: '#F5A623',
                }}
              >
                {value.title}
              </div>

              {/* Description */}
              <p
                className="text-white/80 leading-relaxed"
                style={{ fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)' }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
