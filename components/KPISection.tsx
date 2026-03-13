'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';

const kpis = [
  { label: 'GROSS WRITTEN PREMIUM',         prefix: 'Rs.', value2025: 44.2,    value2024: 37.1,    suffix: ' Bn', change: 18.96, decimals: 1 },
  { label: 'TOTAL CLAIMS PAID',             prefix: 'Rs.', value2025: 31,      value2024: 25,      suffix: ' Bn', change: 24.06, decimals: 0 },
  { label: 'TOTAL ASSETS',                  prefix: 'Rs.', value2025: 287,     value2024: 251,     suffix: ' Bn', change: 14.15, decimals: 0 },
  { label: 'LIFE FUND',                     prefix: 'Rs.', value2025: 202,     value2024: 181,     suffix: ' Bn', change: 11.56, decimals: 0 },
  { label: 'SHAREHOLDER FUND',              prefix: 'Rs.', value2025: 68,      value2024: 61,      suffix: ' Bn', change: 11.71, decimals: 0 },
  { label: 'EARNINGS PER SHARE',            prefix: 'Rs.', value2025: 156.94,  value2024: 141.43,  suffix: '',    change: 10.97, decimals: 2 },
  { label: 'DIVIDEND PER SHARE (PROPOSED)', prefix: 'Rs.', value2025: 19.60,   value2024: 17.70,   suffix: '',    change: 10.73, decimals: 2 },
  { label: 'NET ASSETS PER SHARE',          prefix: 'Rs.', value2025: 1357.20, value2024: 1214.91, suffix: '',    change: 11.71, decimals: 2 },
];

function useCountUp(target: number, active: boolean, decimals: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration, decimals]);

  return count;
}

function fmt(val: number, decimals: number) {
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
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
  const count = useCountUp(kpi.value2025, isVisible, kpi.decimals, 1800);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        border: '1px solid rgba(38,198,218,0.25)',
        borderRadius: '1.25rem',
        padding: '1.75rem 1.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07), inset 0 0 0 1px rgba(38,198,218,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glowing line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, #26C6DA, #66BB6A, transparent)',
        opacity: isVisible ? 0.7 : 0,
        transition: `opacity 0.8s ease ${delay + 300}ms`,
      }} />

      {/* Label */}
      <p style={{
        margin: 0,
        fontSize: 'clamp(0.58rem, 0.8vw, 0.7rem)',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#1a9aaa',
      }}>
        {kpi.label}
      </p>

      {/* 2025 value — main large */}
      <p style={{
        margin: 0,
        fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
        fontWeight: 900,
        lineHeight: 1,
        color: '#0d1f35',
        letterSpacing: '-0.02em',
        textShadow: 'none',
      }}>
        <span style={{ fontSize: '48%', fontWeight: 700, color: '#64748b', marginRight: '2px' }}>
          {kpi.prefix}
        </span>
        {fmt(count, kpi.decimals)}
        {kpi.suffix && (
          <span style={{ fontSize: '42%', fontWeight: 600, color: '#64748b', marginLeft: '3px' }}>
            {kpi.suffix}
          </span>
        )}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />

      {/* Comparison row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: '0.6rem', color: '#94a3b8', letterSpacing: '0.08em' }}>2024 </span>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>
            {kpi.prefix} {fmt(kpi.value2024, kpi.decimals)}{kpi.suffix}
          </span>
        </div>

        {/* YoY change badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          background: 'rgba(34,197,94,0.15)',
          border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: '999px',
          padding: '2px 8px',
          flexShrink: 0,
        }}>
          <svg viewBox="0 0 12 12" fill="none" style={{ width: '9px', height: '9px' }}>
            <path d="M6 9V3M6 3L3 6M6 3L9 6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#22c55e', letterSpacing: '0.04em' }}>
            {kpi.change}%
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
        padding: '6rem 0',
        background: 'linear-gradient(160deg, #d8f5f0 0%, #e8f8e8 55%, #f5f8d8 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Watercolor cloud layers — darker/subtler */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 65% 50% at 80% 15%, rgba(0,188,212,0.14) 0%, transparent 65%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 50% 50% at 10% 30%, rgba(67,160,71,0.12) 0%, transparent 60%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 42% 38% at 20% 8%, rgba(103,58,183,0.10) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 44% 40% at 5% 88%, rgba(194,24,91,0.10) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 50% 42% at 92% 88%, rgba(230,119,0,0.10) 0%, transparent 60%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'rgba(255,255,255,0.2)' }} />

      <div style={{ position:'relative', zIndex:1, maxWidth:'90rem', margin:'0 auto', padding:'0 2rem' }}>

        {/* Section heading */}
        <div style={{ textAlign:'center', marginBottom:'3.5rem', ...fadeUp(isVisible, 0) }}>
          <p style={{ fontSize:'clamp(0.62rem,0.9vw,0.78rem)', fontWeight:700, letterSpacing:'0.32em', textTransform:'uppercase', color:'#1a9aaa', marginBottom:'0.8rem', opacity:0.85 }}>
            Financial Highlights 2025
          </p>
          <h2 style={{ fontSize:'clamp(1.8rem,4.2vw,3.2rem)', fontWeight:900, textTransform:'uppercase', color:'#0d1f35', letterSpacing:'-0.02em', margin:'0 0 0.5rem' }}>
            Key Performance
            <span style={{ background:'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}> Indicators</span>
          </h2>
          <p style={{ margin:0, fontSize:'clamp(0.7rem,0.9vw,0.82rem)', color:'#64748b', letterSpacing:'0.08em' }}>
            All figures in Sri Lankan Rupees · Year ended 31 December 2025
          </p>
        </div>

        {/* Market Leadership highlight bar */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:'2rem',
          flexWrap:'wrap',
          marginBottom:'2.5rem',
          padding:'1rem 2rem',
          background:'rgba(255,255,255,0.7)',
          border:'1px solid rgba(38,198,218,0.22)',
          borderRadius:'0.875rem',
          ...fadeUp(isVisible, 100),
        }}>
          {[
            { val: '22nd', label: 'Consecutive Year of Market Leadership' },
            { val: 'Rs. 44.2 Bn', label: 'Gross Written Premium 2025' },
            { val: 'Rs. 287 Bn', label: 'Total Assets 2025' },
          ].map(item => (
            <div key={item.label} style={{ textAlign:'center' }}>
              <p style={{ margin:0, fontSize:'clamp(1rem,1.8vw,1.4rem)', fontWeight:900, color:'#c47d0a', letterSpacing:'-0.01em' }}>{item.val}</p>
              <p style={{ margin:'0.15rem 0 0', fontSize:'0.58rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#64748b' }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* KPI grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1.25rem' }}>
          {kpis.map((kpi, i) => (
            <KPICard key={kpi.label} kpi={kpi} isVisible={isVisible} delay={200 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
