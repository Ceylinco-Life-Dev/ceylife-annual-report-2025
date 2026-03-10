'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, fadeUp, fadeIn } from '@/hooks/useScrollAnimation';

const milestones = [
  {
    year: '1988',
    title: 'Founded',
    desc: 'Established as a life insurance pioneer within Sri Lanka\'s earliest insurance institution.',
  },
  {
    year: '1998',
    title: 'Market Leadership',
    desc: 'Claimed the undisputed #1 position in Sri Lanka\'s life insurance market.',
  },
  {
    year: '2004',
    title: 'Rs. 1 Bn Premium',
    desc: 'Crossed the landmark Rs. 1 Billion milestone in annual gross written premium.',
  },
  {
    year: '2009',
    title: 'Rs. 10 Bn Life Fund',
    desc: 'Life fund surpassed Rs. 10 Billion, underscoring policyholder confidence.',
  },
  {
    year: '2015',
    title: '200+ Service Points',
    desc: 'Expanded national footprint to over 200 customer service touchpoints island-wide.',
  },
  {
    year: '2019',
    title: 'Digital Transformation',
    desc: 'Launched digital platforms enabling seamless policy management and customer service.',
  },
  {
    year: '2022',
    title: 'Rs. 100 Bn Life Fund',
    desc: 'Life fund crossed the Rs. 100 Billion threshold, reinforcing policyholder security.',
  },
  {
    year: '2025',
    title: 'Rs. 251.4 Bn Assets',
    desc: 'Total assets reach Rs. 251.4 Billion — cementing leadership for the next generation.',
  },
];

const achievements = [
  { value: 37, suffix: '', label: 'Years as\nMarket Leader', prefix: '' },
  { value: 180.9, suffix: ' Bn', label: 'Life Fund\n(Rs.)', prefix: 'Rs.' },
  { value: 280, suffix: '+', label: 'Service\nTouchpoints', prefix: '' },
  { value: 4, suffix: 'M+', label: 'Lives\nProtected', prefix: '' },
];

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(parseFloat((eased * target).toFixed(target % 1 === 0 ? 0 : 1)));
      if (p < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);
  return count;
}

function AchievementStat({
  item,
  isVisible,
  delay,
}: {
  item: (typeof achievements)[0];
  isVisible: boolean;
  delay: number;
}) {
  const count = useCountUp(item.value, isVisible, 2200);
  const display = item.value % 1 === 0 ? Math.round(count) : count.toFixed(1);

  return (
    <div
      style={{
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: '#F5A623',
          letterSpacing: '-0.02em',
        }}
      >
        {item.prefix && (
          <span style={{ fontSize: '45%', fontWeight: 700, color: 'rgba(245,166,35,0.7)' }}>
            {item.prefix}
          </span>
        )}
        {display}
        <span style={{ fontSize: '55%', color: 'rgba(245,166,35,0.8)' }}>{item.suffix}</span>
      </div>
      <p
        style={{
          marginTop: '0.5rem',
          fontSize: 'clamp(0.6rem, 0.85vw, 0.72rem)',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          whiteSpace: 'pre-line',
          lineHeight: 1.5,
        }}
      >
        {item.label}
      </p>
    </div>
  );
}

export default function LegacyMilestonesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.08 });
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimelineVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="milestones"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: 'relative',
        background: '#7995b6',
        overflow: 'hidden',
        padding: '7rem 0 5rem',
      }}
    >
      {/* ── Watercolor cloud layers ── */}
      {/* Teal/cyan — upper center */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 50% at 50% 12%, rgba(0,210,225,0.65) 0%, transparent 65%)',
      }} />
      {/* Green — left mid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 45% 55% at 5% 45%, rgba(67,160,71,0.58) 0%, transparent 58%)',
      }} />
      {/* Purple — left upper */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 42% 38% at 18% 10%, rgba(123,31,162,0.62) 0%, transparent 58%)',
      }} />
      {/* Blue — right upper */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 48% 42% at 88% 15%, rgba(25,118,210,0.55) 0%, transparent 58%)',
      }} />
      {/* Pink/rose — lower left */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 45% 40% at 8% 88%, rgba(216,27,96,0.52) 0%, transparent 58%)',
      }} />
      {/* Orange/warm — lower right */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 52% 42% at 90% 90%, rgba(251,140,0,0.55) 0%, transparent 58%)',
      }} />
      {/* Yellow glow — bottom center */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 40% 30% at 50% 95%, rgba(253,216,53,0.42) 0%, transparent 65%)',
      }} />
      {/* Star beam — bright white at top-center */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 14% 28% at 50% 0%, rgba(255,255,255,0.30) 0%, transparent 70%)',
      }} />
      {/* Minimal overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'rgba(8,14,28,0.28)',
      }} />

      {/* Giant "37" watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(18rem, 40vw, 36rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.03)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        37
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p
            style={{
              ...fadeUp(isVisible, 0),
              fontSize: 'clamp(0.6rem, 0.9vw, 0.72rem)',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#F5A623',
              marginBottom: '1rem',
            }}
          >
            Since 1988
          </p>
          <h2
            style={{
              ...fadeUp(isVisible, 120),
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 auto',
              maxWidth: '800px',
            }}
          >
            37 Years of{' '}
            <span style={{ background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
              Trust,
            </span>{' '}
            Protection{' '}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>&amp;</span>{' '}
            Promise
          </h2>
          <div
            style={{
              ...fadeIn(isVisible, 300),
              width: '60px',
              height: '2px',
              background: '#F5A623',
              margin: '1.5rem auto 0',
            }}
          />
        </div>

        {/* Achievement stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem 3rem',
            marginBottom: '6rem',
            padding: '2.5rem',
            background: 'rgba(0,188,212,0.05)',
            border: '1px solid rgba(0,188,212,0.12)',
            borderRadius: '1.5rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          {achievements.map((item, i) => (
            <AchievementStat key={item.label} item={item} isVisible={isVisible} delay={200 + i * 150} />
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <p
            style={{
              ...fadeUp(timelineVisible, 0),
              fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '2.5rem',
              textAlign: 'center',
            }}
          >
            Key Milestones
          </p>

          {/* Vertical timeline */}
          <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
            {/* Centre line */}
            <div
              className="ms-line"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'linear-gradient(180deg, rgba(0,188,212,0.25) 0%, rgba(126,87,194,0.15) 100%)',
                transform: 'translateX(-50%)',
              }}
            />

            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className="ms-row"
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    marginBottom: '3rem',
                    position: 'relative',
                    opacity: timelineVisible ? 1 : 0,
                    transform: timelineVisible
                      ? 'translateX(0)'
                      : isLeft
                      ? 'translateX(-50px)'
                      : 'translateX(50px)',
                    transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
                  }}
                >
                  {/* Dot on centre line */}
                  <div
                    className="ms-dot"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '1.1rem',
                      transform: 'translate(-50%, -50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#00BCD4',
                      boxShadow: '0 0 0 3px rgba(0,188,212,0.25)',
                      zIndex: 2,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="ms-card"
                    style={{
                      width: '44%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(0,188,212,0.15)',
                      borderRadius: '1rem',
                      padding: '1.25rem 1.5rem',
                      textAlign: isLeft ? 'right' : 'left',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        fontWeight: 900,
                        color: '#26C6DA',
                        lineHeight: 1,
                        marginBottom: '0.3rem',
                      }}
                    >
                      {m.year}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'clamp(0.75rem, 1vw, 0.88rem)',
                        fontWeight: 700,
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {m.title}
                    </span>
                    <p
                      style={{
                        fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ms-line { left: 24px !important; transform: none !important; }
          .ms-row { justify-content: flex-start !important; padding-left: 52px; }
          .ms-dot { left: 24px !important; }
          .ms-card { width: 100% !important; text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
