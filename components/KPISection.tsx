'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';

const kpis = [
  {
    label: 'GROSS WRITTEN PREMIUM',
    prefix: 'Rs.',
    value: 37.1,
    suffix: ' Bn',
    badge: 'YoY Growth',
    badgeDesc: 'vs prior year',
  },
  {
    label: 'TOTAL ASSETS',
    prefix: 'Rs.',
    value: 251.4,
    suffix: ' Bn',
    badge: 'Market Leader',
    badgeDesc: 'vs prior year',
  },
  {
    label: 'LIFE FUND',
    prefix: 'Rs.',
    value: 180.9,
    suffix: ' Bn',
    badge: 'Policyholder Security',
    badgeDesc: 'vs prior year',
  },
  {
    label: "SHAREHOLDERS' EQUITY",
    prefix: 'Rs.',
    value: 60.7,
    suffix: ' Bn',
    badge: 'Capital Strength',
    badgeDesc: 'vs prior year',
  },
];

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

function KPICard({
  kpi,
  isVisible,
  delay,
}: {
  kpi: (typeof kpis)[0];
  isVisible: boolean;
  delay: number;
}) {
  const count = useCountUp(kpi.value, isVisible, 1800);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        background: 'rgba(170, 195, 235, 0.31)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: '1.5rem',
        padding: '2.25rem 1.75rem',
        boxShadow: isVisible
          ? '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
          : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle inner glow / accent gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,188,212,0.10) 0%, rgba(126,87,194,0.07) 50%, rgba(233,30,99,0.05) 100%)',
          opacity: isVisible ? 0.7 : 0,
          transition: `opacity 1.2s ease ${delay + 200}ms`,
          pointerEvents: 'none',
        }}
      />

      {/* Top glowing line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #00BCD4, #26C6DA, #F5A623, transparent)',
          opacity: isVisible ? 0.6 : 0,
          transition: `opacity 0.8s ease ${delay + 300}ms`,
        }}
      />

      {/* Label */}
      <p
        style={{
          fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
        }}
      >
        {kpi.label}
      </p>

      {/* Value */}
      <p
        style={{
          fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: '#F5A623',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 12px rgba(245,166,35,0.35)',
        }}
      >
        <span style={{ fontSize: '55%', fontWeight: 700, color: 'rgba(245,166,35,0.8)' }}>
          {kpi.prefix}
        </span>
        {count.toFixed(1)}
        <span style={{ fontSize: '48%', fontWeight: 700, color: 'rgba(245,166,35,0.8)' }}>
          {kpi.suffix}
        </span>
      </p>

      {/* Growth badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
        <div
          style={{
            width: '1.6rem',
            height: '1.6rem',
            borderRadius: '50%',
            background: 'rgba(34,197,94,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 12px rgba(34,197,94,0.4)',
          }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            style={{ width: '0.85rem', height: '0.85rem' }}
          >
            <path
              d="M8 12V4M8 4L4 8M8 4L12 8"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <span
            style={{
              fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
              fontWeight: 700,
              color: '#22c55e',
              letterSpacing: '0.06em',
            }}
          >
            {kpi.badge}
          </span>
          <span
            style={{
              fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)',
              color: 'rgba(255,255,255,0.45)',
              marginLeft: '0.4rem',
            }}
          >
            {kpi.badgeDesc}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function KPISection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="kpi"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: 'relative',
        padding: '7rem 0',
        background: '#122438',
        overflow: 'hidden',
      }}
    >
      {/* ── Watercolor cloud layers ── */}
      {/* Teal/cyan — upper right */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 82% 18%, rgba(0,210,230,0.65) 0%, transparent 65%)',
      }} />
      {/* Green — left side */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 50% at 8% 30%, rgba(76,175,80,0.58) 0%, transparent 60%)',
      }} />
      {/* Purple — upper left */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 45% 40% at 22% 8%, rgba(126,87,194,0.60) 0%, transparent 58%)',
      }} />
      {/* Pink/rose — lower left */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 48% 42% at 5% 88%, rgba(233,30,99,0.52) 0%, transparent 58%)',
      }} />
      {/* Orange/amber — lower right */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 45% at 92% 88%, rgba(255,152,0,0.55) 0%, transparent 60%)',
      }} />
      {/* Yellow warm glow — bottom center */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 30% at 50% 100%, rgba(253,216,53,0.42) 0%, transparent 65%)',
      }} />
      {/* Deep blue — center */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(32, 104, 219, 0.38) 0%, transparent 60%)',
      }} />
      {/* Star beam — white at center-top */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 18% 30% at 55% 0%, rgba(255,255,255,0.28) 0%, transparent 70%)',
      }} />
      {/* Minimal overlay — just enough contrast for text */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'rgba(203, 213, 233, 0.28)',
      }} />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '90rem',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', ...fadeUp(isVisible, 0) }}>
          <p
            style={{
              fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
              fontWeight: 700,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#F5A623',
              marginBottom: '1rem',
              opacity: 0.9,
            }}
          >
            Financial Highlights 2025
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4.8vw, 3.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#fff',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,188,212,0.2)',
            }}
          >
            Key Performance
            <span style={{ background: 'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Indicators</span>
          </h2>
        </div>

        {/* KPI grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {kpis.map((kpi, i) => (
            <KPICard key={kpi.label} kpi={kpi} isVisible={isVisible} delay={200 + i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}