'use client';

import { useScrollAnimation, slideLeft, slideRight, fadeUp, fadeIn } from '@/hooks/useScrollAnimation';

export default function AboutLegacySection() {
  const aboutAnim = useScrollAnimation({ threshold: 0.15 });
  const legacyAnim = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="about">

      {/* ── Panel 1: About Us ───────────────────────────── */}
      <div
        ref={aboutAnim.ref as React.RefObject<HTMLDivElement>}
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
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto">

          {/* Top label */}
          <div
            style={{
              ...fadeUp(aboutAnim.isVisible, 0),
              marginBottom: '3.5rem',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(0.58rem, 0.85vw, 0.7rem)',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                borderLeft: '2px solid rgba(245,166,35,0.6)',
                paddingLeft: '0.75rem',
              }}
            >
              01 &nbsp;/&nbsp; About Us
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Left: Heading */}
            <div style={slideLeft(aboutAnim.isVisible, 100)}>
              <h2
                className="text-white font-black uppercase leading-none"
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                ABOUT
                <br />
                <span style={{ background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>US</span>
              </h2>

              {/* Thin gold divider */}
              <div
                style={{
                  marginTop: '1.5rem',
                  width: '50px',
                  height: '3px',
                  background: '#F5A623',
                  borderRadius: '2px',
                  opacity: aboutAnim.isVisible ? 1 : 0,
                  transform: aboutAnim.isVisible ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'opacity 0.6s ease 400ms, transform 0.6s ease 400ms',
                }}
              />
            </div>

            {/* Right: Description */}
            <div style={slideRight(aboutAnim.isVisible, 250)}>
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

        {/* Bottom separator arrow */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            ...fadeIn(aboutAnim.isVisible, 600),
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: '1.5rem', height: '1.5rem', animation: 'bounce 2s infinite' }}
          >
            <path
              d="M12 5v14M12 19l-5-5M12 19l5-5"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Panel 2: Legacy of Leadership ───────────────── */}
      <div
        ref={legacyAnim.ref as React.RefObject<HTMLDivElement>}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/legacy-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient fallback */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(135deg, #00A8BF 0%, #00BCD4 35%, #26C6DA 55%, #F48FB1 80%, #E91E63 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto">

          {/* Top label */}
          <div
            style={{
              ...fadeUp(legacyAnim.isVisible, 0),
              marginBottom: '3.5rem',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(0.58rem, 0.85vw, 0.7rem)',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                borderLeft: '2px solid rgba(255,255,255,0.5)',
                paddingLeft: '0.75rem',
              }}
            >
              02 &nbsp;/&nbsp; Legacy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div style={slideLeft(legacyAnim.isVisible, 100)}>
              <div className="mb-6">
                <h2
                  className="text-white font-black uppercase leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
                >
                  A LEGACY OF
                </h2>
                <h2
                  className="font-black uppercase leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  LEADERSHIP
                </h2>
              </div>

              <p
                className="text-white font-medium leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
              >
                For 37 years, Ceylinco Life Insurance Limited has played a
                defining role in shaping Sri Lanka&apos;s life insurance industry.
                What began as a growing life insurance business within a broader
                insurance institution has evolved into the country&apos;s
                undisputed market leader&mdash;guided by foresight, resilience,
                and an unwavering commitment to long-term protection. Across key
                phases of economic change, regulatory reform, and sector
                liberalization, the Company has consistently played a leadership
                role&mdash;introducing solutions, standards, and practices that
                shaped the life insurance industry in Sri Lanka.
              </p>

              {/* Quick stats row */}
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginTop: '2rem',
                  flexWrap: 'wrap',
                  ...fadeUp(legacyAnim.isVisible, 400),
                }}
              >
                {[
                  { value: '37', label: 'Years' },
                  { value: '#1', label: 'Market Leader' },
                  { value: '4M+', label: 'Lives Protected' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: 900,
                        color: '#fff',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(0.6rem, 0.8vw, 0.68rem)',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                        marginTop: '0.2rem',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual card */}
            <div className="flex justify-center md:justify-end" style={slideRight(legacyAnim.isVisible, 300)}>
              <div
                className="relative w-64 h-80 md:w-80 md:h-96"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  gap: '1rem',
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Ceylinco Life"
                  style={{
                    width: '85%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
                  }}
                />
                <p
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.65rem',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    margin: 0,
                  }}
                >
                  37 Years of Leadership
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
