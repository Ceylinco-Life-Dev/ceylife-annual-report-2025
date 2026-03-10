'use client';

import { useScrollAnimation, slideLeft, slideRight } from '@/hooks/useScrollAnimation';

export default function AboutUsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/about-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient fallback */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(160deg, #071828 0%, #0D2A3E 30%, #0A2030 55%, #122A1E 80%, #1A3E28 100%)',
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl mx-auto">
          {/* Left: Heading */}
          <div style={slideLeft(isVisible, 0)}>
            <h2
              className="text-white font-black uppercase leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                letterSpacing: '-0.02em',
              }}
            >
              ABOUT
              <br />
              US
            </h2>
          </div>

          {/* Right: Description */}
          <div style={slideRight(isVisible, 200)}>
            <p
              className="text-white/90 leading-relaxed font-light"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
            >
              Ceylinco Life Insurance Limited is guided by an enduring North
              Star&mdash; one that has shaped its journey across decades,
              anchoring growth in trust, protection, and long-term value
              creation. These guiding principles reflect the Company&apos;s
              constant commitment to safeguarding lives today, while building
              resilience and security for generations to come. From its roots in
              Sri Lanka&apos;s earliest insurance institutions to its position
              today as the undisputed market leader in life insurance, Ceylinco
              Life&apos;s evolution is defined by foresight, resilience, and
              purposeful innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
