'use client';

import { useRef, useState, useEffect } from 'react';

const leaders = [
  {
    role: "Chairman's Message",
    name: 'R. Renganathan',
    title: 'Chairman',
    image: '/images/Chairman.jpg',
    quote: 'We strengthened our market leadership for the 22nd consecutive year, advancing digital transformation to improve customer experience.',
    message: 'This year marked continued stability and strong performance for Ceylinco Life, supported by disciplined execution, prudent financial management and an unwavering commitment to our policyholders. As Sri Lanka\'s economic environment stabilised, we maintained resilient growth, strong capital adequacy and a solid balance sheet. Looking ahead, we remain committed to delivering long-term value to our stakeholders, preparing for evolving regulatory standards including SLFRS 17 and the new RBC regime.',
    accent: '#1a6aaa',
    imageLeft: false,
  },
  {
    role: "CEO / MD Message",
    name: 'E T L Ranasinghe',
    title: 'CEO / MD',
    image: '/images/CEO.jpg',
    quote: 'Our focus remains on strengthening productivity, accelerating digital enablement and deepening customer relationships.',
    message: '2025 was a year of steady progress as we strengthened operations, enhanced service quality and advanced our digital transformation agenda. Our distribution network remained a key strength, with renewed momentum across the agency force and growth in the Virtual Financial Advisor channel. We invested in our people through upgraded learning platforms and leadership development, ensuring our teams remain equipped and future‑ready.',
    accent: '#0a7a3f',
    imageLeft: true,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function LeaderPanel({ leader, idx }: { leader: typeof leaders[0]; idx: number }) {
  const { ref, visible } = useInView(0.1);

  const gradientDir = leader.imageLeft
    ? 'to right, transparent 0%, transparent 30%, rgba(184,240,210,0.85) 55%, rgba(184,240,210,0.98) 100%'
    : 'to left, transparent 0%, transparent 30%, rgba(184,230,242,0.85) 55%, rgba(184,230,242,0.98) 100%';

  return (
    <div
      ref={ref}
      className="leader-panel"
      style={{
        position: 'relative',
        height: 'clamp(320px, 42vw, 520px)',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s ease ${idx * 0.2}s, transform 0.9s ease ${idx * 0.2}s`,
      }}
    >
      {/* Person photo — fills one side */}
      <img
        src={leader.image}
        alt={leader.name}
        style={{
          position: 'absolute',
          top: 0,
          [leader.imageLeft ? 'left' : 'right']: 0,
          width: '58%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          display: 'block',
        }}
      />

      {/* Gradient overlay — blends photo into dark text area */}
      <div
        aria-hidden
        className="leader-panel-gradient-a"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${gradientDir})`,
          pointerEvents: 'none',
        }}
      />

      {/* Dark base for text side */}
      <div
        aria-hidden
        className="leader-panel-gradient-b"
        style={{
          position: 'absolute',
          inset: 0,
          background: leader.imageLeft
            ? 'linear-gradient(to left, rgba(184,240,210,0.95) 45%, transparent 65%)'
            : 'linear-gradient(to right, rgba(184,230,242,0.95) 45%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Text content */}
      <div
        className="leader-panel-text"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: leader.imageLeft ? 'flex-end' : 'flex-start',
          padding: '2.5rem clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div
          style={{
            width: 'clamp(280px, 46%, 560px)',
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateX(0)'
              : leader.imageLeft ? 'translateX(30px)' : 'translateX(-30px)',
            transition: `opacity 0.9s ease ${idx * 0.2 + 0.25}s, transform 0.9s ease ${idx * 0.2 + 0.25}s`,
          }}
        >
          {/* Role title */}
          <h3
            style={{
              margin: '0 0 0.9rem',
              fontSize: 'clamp(1.1rem, 2vw, 1.65rem)',
              fontWeight: 900,
              color: '#0d1f35',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            {leader.role}
          </h3>

          {/* Pull quote */}
          <p
            style={{
              margin: '0 0 1.25rem',
              fontSize: 'clamp(0.78rem, 1.05vw, 0.92rem)',
              color: '#334155',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {leader.message}
          </p>

          {/* Name + divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '28px', height: '2px', background: leader.accent, borderRadius: '2px', flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: 'clamp(0.78rem, 1vw, 0.9rem)', fontWeight: 800, color: '#0d1f35', letterSpacing: '0.02em' }}>
                {leader.name}
              </p>
              <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: leader.accent, marginTop: '0.15rem' }}>
                {leader.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accent bottom line */}
      <div
        className="leader-panel-accent"
        style={{
          position: 'absolute',
          bottom: 0,
          [leader.imageLeft ? 'right' : 'left']: 0,
          width: '45%',
          height: '2px',
          background: `linear-gradient(${leader.imageLeft ? 'to left' : 'to right'}, ${leader.accent}, transparent)`,
        }}
      />
    </div>
  );
}

export default function LeadershipMessagesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="leadership"
      style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #d8f5f2 0%, #e8f5e8 50%, #f5f0e8 100%)' }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          padding: '1rem 2rem 1rem',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#64748b' }}>
          Leadership Perspectives
        </p>
        <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#0d1f35', lineHeight: 1.1 }}>
          Messages from our{' '}
          <span style={{ background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Leadership
          </span>
        </h2>
      </div>

      {/* Leader panels */}
      {leaders.map((leader, idx) => (
        <LeaderPanel key={leader.name} leader={leader} idx={idx} />
      ))}

      {/* Bottom padding */}
      <div style={{ height: '3rem' }} />

      <style>{`
        /* ── Medium screens: 641px – 1024px ─────────────────────── */
        @media (min-width: 641px) and (max-width: 1024px) {
          .leader-panel { height: clamp(340px, 52vw, 480px) !important; }
          .leader-panel img { width: 50% !important; }
          .leader-panel-text { padding: 1.5rem 1.75rem !important; }
          .leader-panel-text > div { width: clamp(220px, 48%, 400px) !important; }
        }

        /* ── Small screens: ≤ 640px — stacked layout ────────────── */
        @media (max-width: 640px) {
          /* Panel becomes a flex column so image + text stack */
          .leader-panel {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: visible !important;
          }

          /* Image flows in document */
          .leader-panel img {
            position: relative !important;
            top: auto !important; left: auto !important; right: auto !important;
            width: 100% !important;
            height: 300px !important;
            object-fit: cover !important;
            object-position: top center !important;
            flex-shrink: 0;
          }

          /* Gradient fades image bottom to dark */
          .leader-panel-gradient-a {
            position: absolute !important;
            top: 0 !important; left: 0 !important; right: 0 !important;
            height: 300px !important;
            bottom: auto !important;
            background: linear-gradient(to bottom, transparent 45%, #d8f5f2 100%) !important;
          }
          .leader-panel-gradient-b { display: none !important; }

          /* Text panel flows below image */
          .leader-panel-text {
            position: relative !important;
            inset: auto !important;
            flex: 1 !important;
            display: flex !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            padding: 1.25rem 1.1rem 2rem !important;
            background: #d8f5f2;
          }

          /* Text content fills full width, no slide animations */
          .leader-panel-text > div {
            width: 100% !important;
            transform: none !important;
            opacity: 1 !important;
          }

          /* Accent line: full width at bottom of text area */
          .leader-panel-accent {
            position: relative !important;
            width: 100% !important;
            left: auto !important; right: auto !important;
          }
        }

        /* ── Extra small: ≤ 390px (iPhone SE, 12 mini) ──────────── */
        @media (max-width: 390px) {
          .leader-panel img { height: 260px !important; }
          .leader-panel-gradient-a { height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
