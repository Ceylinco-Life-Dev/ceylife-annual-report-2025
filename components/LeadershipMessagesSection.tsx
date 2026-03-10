'use client';

import { useRef, useState, useEffect } from 'react';

const leaders = [
  {
    role: "Chairman's Review",
    name: 'R. Renganathan',
    title: 'Chairman',
    image: '/images/Chairman.jpg',
    quote: 'We strengthened our market leadership for the 22nd consecutive year, advancing digital transformation to improve customer experience.',
    message: 'This year marked continued stability and strong performance for Ceylinco Life, supported by disciplined execution, prudent financial management and an unwavering commitment to our policyholders. As Sri Lanka\'s economic environment stabilised, we maintained resilient growth, strong capital adequacy and a solid balance sheet. Looking ahead, we remain committed to delivering long-term value to our stakeholders, preparing for evolving regulatory standards including SLFRS 17 and the new RBC regime.',
    accent: '#0b0335',
    imageLeft: true,
  },
  {
    role: "Managing Director / Chief Executive Officer's Review",
    name: 'E T L Ranasinghe',
    title: 'MD / CEO',
    image: '/images/CEO.jpg',
    quote: 'Our focus remains on strengthening productivity, accelerating digital enablement and deepening customer relationships.',
    message: '2025 was a year of steady progress as we strengthened operations, enhanced service quality and advanced our digital transformation agenda. Our distribution network remained a key strength, with renewed momentum across the agency force and growth in the Virtual Financial Advisor channel. We invested in our people through upgraded learning platforms and leadership development, ensuring our teams remain equipped and future‑ready.',
    accent: '#0e2a04',
    imageLeft: false,
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
    ? 'to right, transparent 0%, transparent 35%, rgba(230, 124, 32, 0.82) 58%, rgba(217, 206, 51, 0.98) 78%, #22c55e 100%'
    : 'to left,  transparent 0%, transparent 35%, rgba(188, 166, 66, 0.82) 58%, rgba(152, 130, 30, 0.98) 78%, #c3a626 100%';

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
            ? 'linear-gradient(to left, #4661b0 45%, transparent 65%)'
            : 'linear-gradient(to right, #146880 45%, transparent 65%)',
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
              color: '#fff',
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
              color: 'rgba(255,255,255,0.72)',
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
              <p style={{ margin: 0, fontSize: 'clamp(0.78rem, 1vw, 0.9rem)', fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>
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
      style={{ position: 'relative', overflow: 'hidden', background: '#040814' }}
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
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          Leadership Perspectives
        </p>
        <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
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
        @media (max-width: 640px) {
          .leader-panel { height: auto !important; min-height: 480px; }
          .leader-panel img { width: 100% !important; height: 260px !important; top: 0 !important; left: 0 !important; right: 0 !important; }
          .leader-panel-gradient-a { background: linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(4,8,20,0.9) 65%, #040814 100%) !important; }
          .leader-panel-gradient-b { display: none !important; }
          .leader-panel-text { justify-content: flex-start !important; align-items: flex-end !important; padding-top: 200px !important; padding-bottom: 2rem !important; }
          .leader-panel-text > div { width: 100% !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
