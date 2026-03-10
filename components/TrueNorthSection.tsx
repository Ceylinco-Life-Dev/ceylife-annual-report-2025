'use client';

import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';

export default function TrueNorthSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="true-north"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center overflow-hidden"
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
            'linear-gradient(180deg, #030E1C 0%, #051828 25%, #080E28 50%, #0E0828 75%, #06041A 100%)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto">
        <div className="space-y-14 md:space-y-20">

          {/* Our True North */}
          <div className="max-w-2xl" style={fadeUp(isVisible, 0)}>
            <h2
              className="font-black uppercase leading-none mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', color: '#fff' }}
            >
              OUR TRUE{' '}
              <span style={{ background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NORTH</span>
            </h2>
            <p
              className="text-white/80 leading-relaxed"
              style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
            >
              The enduring principles that shape our vision, guide our mission,
              and anchor our values.
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px bg-white/10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'opacity 0.8s ease 200ms, transform 0.8s ease 200ms',
            }}
          />

          {/* Our Guiding Star - centered */}
          <div className="text-center" style={fadeUp(isVisible, 300)}>
            <h2
              className="font-black uppercase leading-none mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', color: '#fff' }}
            >
              OUR GUIDING{' '}
              <span style={{ background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>STAR</span>
            </h2>
            <p
              className="text-white/80 leading-relaxed max-w-xl mx-auto"
              style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
            >
              To take the message of life insurance and retirement planning to
              every Sri Lankan and provide protection to every family.
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px bg-white/10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'right',
              transition: 'opacity 0.8s ease 450ms, transform 0.8s ease 450ms',
            }}
          />

          {/* Our Path Forward */}
          <div className="max-w-2xl" style={fadeUp(isVisible, 550)}>
            <h2
              className="font-black uppercase leading-none mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', color: '#fff' }}
            >
              OUR PATH{' '}
              <span style={{ background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>FORWARD</span>
            </h2>
            <p
              className="text-white/80 leading-relaxed"
              style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
            >
              To become the most trusted, acclaimed and progressive life
              insurance company in Sri Lanka, by providing need based life
              insurance solutions to our customers, recognising and rewarding
              our employees, creating successful partnerships with stakeholders
              and ensuring sustainable business practices for sustainable,
              responsible and profitable growth, while leaving a smaller carbon
              footprint on the planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
