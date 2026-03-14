'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─── Data ───────────────────────────────────────────────────── */
const SDG_GOALS = [
  { id: 1,  label: 'No Poverty',           color: '#E5243B', desc: 'Providing life insurance security to vulnerable families, reducing financial risk from mortality events.' },
  { id: 3,  label: 'Good Health',          color: '#4C9F38', desc: 'Free medical camps, hospital equipment donations, and rural healthcare outreach across Sri Lanka.' },
  { id: 4,  label: 'Quality Education',    color: '#C5192D', desc: 'Scholarship programs, school infrastructure grants, and digital learning tools for underprivileged students.' },
  { id: 8,  label: 'Decent Work',          color: '#A21942', desc: 'Creating employment through a 14,000+ strong agent network and supporting local entrepreneurship.' },
  { id: 10, label: 'Reduced Inequalities', color: '#DD1367', desc: 'Inclusive micro-insurance products and rural outreach ensuring coverage reaches all Sri Lankans.' },
  { id: 11, label: 'Sustainable Cities',   color: '#FD9D24', desc: 'Urban community development, affordable housing support, and smart city infrastructure projects.' },
  { id: 13, label: 'Climate Action',       color: '#3F7E44', desc: 'Carbon footprint reduction, renewable energy adoption, and environmental policy advocacy.' },
  { id: 15, label: 'Life on Land',         color: '#56C02B', desc: 'Tree planting campaigns, coastal conservation, and biodiversity protection across the island.' },
];

const FOCUS_AREAS = [
  {
    key: 'education',
    label: 'Education',
    amount: 'Rs. 847 Mn',
    percent: 72,
    color: '#9F2743',
    bgColor: 'rgba(159,39,67,0.06)',
    borderColor: 'rgba(159,39,67,0.22)',
    svgPath: 'M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z',
    desc: 'Scholarships, school infrastructure, and digital learning tools reaching thousands of students across Sri Lanka.',
    stats: [{ val: '5,200+', lbl: 'Students' }, { val: '86', lbl: 'Schools' }, { val: '72%', lbl: 'of CSR' }],
  },
  {
    key: 'community',
    label: 'Community',
    amount: 'Rs. 186 Mn',
    percent: 16,
    color: '#F9A14B',
    bgColor: 'rgba(249,161,75,0.06)',
    borderColor: 'rgba(249,161,75,0.3)',
    svgPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z',
    desc: 'Community upliftment programs, housing support, and social welfare initiatives spanning 25 districts nationwide.',
    stats: [{ val: '200+', lbl: 'Projects' }, { val: '25', lbl: 'Districts' }, { val: '16%', lbl: 'of CSR' }],
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    amount: 'Rs. 108 Mn',
    percent: 9,
    color: '#20799B',
    bgColor: 'rgba(32,121,155,0.06)',
    borderColor: 'rgba(32,121,155,0.22)',
    svgPath: 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z',
    desc: 'Free medical camps, hospital equipment donations, and rural healthcare outreach programs across Sri Lanka.',
    stats: [{ val: '50K+', lbl: 'Patients' }, { val: '120', lbl: 'Clinics' }, { val: '9%', lbl: 'of CSR' }],
  },
  {
    key: 'environment',
    label: 'Environment',
    amount: 'Rs. 39 Mn',
    percent: 3,
    color: '#3F7E44',
    bgColor: 'rgba(63,126,68,0.06)',
    borderColor: 'rgba(63,126,68,0.22)',
    svgPath: 'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2',
    desc: 'Tree planting, coastal conservation, and sustainable business practices protecting Sri Lanka\'s natural heritage.',
    stats: [{ val: '100K+', lbl: 'Trees' }, { val: '15', lbl: 'Sites' }, { val: '3%', lbl: 'of CSR' }],
  },
];

const METRICS = [
  { value: 1.18, suffix: 'B',  label: 'CSR Investment',    prefix: 'Rs.', decimals: 2, sub: '2025' },
  { value: 8,    suffix: '',   label: 'SDGs Supported',     prefix: '',    decimals: 0, sub: 'UN Goals' },
  { value: 37,   suffix: '+',  label: 'Years of CSR',       prefix: '',    decimals: 0, sub: 'Since 1988' },
  { value: 25,   suffix: '',   label: 'Districts Reached',  prefix: '',    decimals: 0, sub: 'Nationwide' },
];

/* ─── Hooks ──────────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, decimals: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(parseFloat((e * target).toFixed(decimals)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration, decimals]);
  return count;
}

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

/* ─── Metric Card ────────────────────────────────────────────── */
function MetricCard({ item, visible, delay }: { item: typeof METRICS[0]; visible: boolean; delay: number }) {
  const count = useCountUp(item.value, visible, item.decimals, 2000);
  const display = item.decimals > 0 ? count.toFixed(item.decimals) : Math.round(count).toString();
  return (
    <div style={{
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '1.25rem',
      padding: '2rem 1.5rem',
      textAlign: 'center',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      border: '1px solid rgba(159,39,67,0.12)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #9F2743, #F9A14B)' }} />
      <p style={{ margin: '0 0 0.25rem', fontSize: 'clamp(2rem,3.5vw,2.6rem)', fontWeight: 900, color: '#0d1f35', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {item.prefix && <span style={{ fontSize: '42%', color: '#9F2743', fontWeight: 700 }}>{item.prefix} </span>}
        {display}
        <span style={{ fontSize: '52%', color: '#F9A14B', fontWeight: 800 }}>{item.suffix}</span>
      </p>
      <p style={{ margin: '0 0 0.2rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#334155' }}>{item.label}</p>
      <p style={{ margin: 0, fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8' }}>{item.sub}</p>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function SustainabilitySection() {
  const hero    = useInView(0.1);
  const metrics = useInView(0.1);
  const focus   = useInView(0.08);
  const sdg     = useInView(0.06);
  const story   = useInView(0.1);

  const [hoveredSDG,   setHoveredSDG]   = useState<number | null>(null);
  const [hoveredFocus, setHoveredFocus] = useState<string | null>(null);

  return (
    <section
      id="sustainability"
      style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #FCF4E3 0%, #FFF8F0 50%, #F6EBEA 100%)' }}
    >

      {/* ── HERO STATEMENT ──────────────────────────────────────── */}
      <div
        ref={hero.ref as React.RefObject<HTMLDivElement>}
        style={{ position: 'relative', padding: '6rem 2rem 4rem', textAlign: 'center', overflow: 'hidden' }}
      >
        {/* Nature blobs */}
        <div aria-hidden style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 55% at 50% 100%, rgba(63,126,68,0.1) 0%, transparent 65%)' }} />
        <div aria-hidden style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 40% at 15% 0%, rgba(249,161,75,0.08) 0%, transparent 60%)' }} />
        <div aria-hidden style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 38% at 85% 0%, rgba(159,39,67,0.07) 0%, transparent 60%)' }} />

        <div style={{ position:'relative', zIndex:1, maxWidth:'56rem', margin:'0 auto' }}>
          <p style={{
            margin: '0 0 1rem',
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3F7E44',
            opacity: hero.visible ? 1 : 0, transition: 'opacity 0.7s ease 0.1s',
          }}>
            Sustainability &amp; ESG Impact 2025
          </p>
          <h2 style={{
            margin: '0 0 1.5rem',
            fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, color: '#0d1f35', lineHeight: 1.1, letterSpacing: '-0.02em',
            opacity: hero.visible ? 1 : 0,
            transform: hero.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}>
            Creating Lasting Impact<br />
            <span style={{ background: 'linear-gradient(90deg, #3F7E44, #9F2743, #F9A14B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              for People and Planet
            </span>
          </h2>
          <p style={{
            margin: '0 auto',
            fontSize: 'clamp(0.9rem,1.2vw,1.05rem)', color: '#475569', lineHeight: 1.8, maxWidth: '42rem',
            opacity: hero.visible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s',
          }}>
            For over three decades, Ceylinco Life has invested in Sri Lanka&apos;s communities, ecosystems, and human capital — guided by the UN Sustainable Development Goals and a deep commitment to responsible business.
          </p>
          {/* Decorative separator */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginTop:'2rem', opacity: hero.visible ? 1 : 0, transition:'opacity 0.8s ease 0.6s' }}>
            <div style={{ width:'52px', height:'1px', background:'linear-gradient(to right, transparent, #9F2743)' }} />
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#9F2743' }} />
            <div style={{ width:'52px', height:'1px', background:'linear-gradient(to left, transparent, #9F2743)' }} />
          </div>
        </div>
      </div>

      {/* ── IMPACT METRICS ──────────────────────────────────────── */}
      <div ref={metrics.ref as React.RefObject<HTMLDivElement>} style={{ padding:'0 2rem 5rem', maxWidth:'88rem', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1.25rem' }}>
          {METRICS.map((item, i) => (
            <MetricCard key={item.label} item={item} visible={metrics.visible} delay={i * 120} />
          ))}
        </div>
      </div>

      {/* ── FOCUS AREAS ─────────────────────────────────────────── */}
      <div ref={focus.ref as React.RefObject<HTMLDivElement>} style={{ padding:'0 2rem 5rem', maxWidth:'88rem', margin:'0 auto' }}>
        <div style={{
          textAlign:'center', marginBottom:'2.5rem',
          opacity: focus.visible ? 1 : 0, transform: focus.visible ? 'translateY(0)' : 'translateY(20px)',
          transition:'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <p style={{ margin:'0 0 0.4rem', fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'#9F2743' }}>Where We Invest</p>
          <h3 style={{ margin:0, fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:900, color:'#0d1f35' }}>
            Our{' '}
            <span style={{ background:'linear-gradient(90deg,#9F2743,#F9A14B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Focus Areas</span>
          </h3>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'1.5rem' }}>
          {FOCUS_AREAS.map((area, i) => {
            const hov = hoveredFocus === area.key;
            return (
              <div
                key={area.key}
                onMouseEnter={() => setHoveredFocus(area.key)}
                onMouseLeave={() => setHoveredFocus(null)}
                style={{
                  background: hov ? area.bgColor : 'rgba(255,255,255,0.9)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  border: `1px solid ${hov ? area.borderColor : 'rgba(0,0,0,0.06)'}`,
                  boxShadow: hov ? `0 16px 48px ${area.color}22` : '0 2px 16px rgba(0,0,0,0.055)',
                  opacity: focus.visible ? 1 : 0,
                  transform: focus.visible ? (hov ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(32px)',
                  transition: `opacity 0.7s ease ${i * 100}ms, transform 0.35s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease`,
                  cursor: 'default',
                  display: 'flex', flexDirection: 'column', gap: '1.1rem',
                }}
              >
                {/* Icon + Label + Amount */}
                <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                  <div style={{
                    width:'52px', height:'52px', borderRadius:'1rem', flexShrink:0,
                    background: hov ? `${area.color}20` : `${area.color}10`,
                    border: `1.5px solid ${area.color}35`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'background 0.3s',
                  }}>
                    <svg viewBox="0 0 24 24" style={{ width:'1.5rem', height:'1.5rem' }} fill={area.color}>
                      <path d={area.svgPath} />
                    </svg>
                  </div>
                  <div>
                    <p style={{ margin:0, fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:area.color }}>{area.label}</p>
                    <p style={{ margin:'0.1rem 0 0', fontSize:'clamp(1rem,1.6vw,1.2rem)', fontWeight:900, color:'#0d1f35', lineHeight:1 }}>{area.amount}</p>
                  </div>
                </div>

                {/* Description */}
                <p style={{ margin:0, fontSize:'clamp(0.8rem,1vw,0.88rem)', color:'#475569', lineHeight:1.72 }}>{area.desc}</p>

                {/* Progress bar */}
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.4rem' }}>
                    <span style={{ fontSize:'0.58rem', fontWeight:700, color:area.color, letterSpacing:'0.1em', textTransform:'uppercase' }}>Share of Total CSR</span>
                    <span style={{ fontSize:'0.7rem', fontWeight:800, color:area.color }}>{area.percent}%</span>
                  </div>
                  <div style={{ height:'6px', background:'rgba(0,0,0,0.06)', borderRadius:'6px', overflow:'hidden' }}>
                    <div style={{
                      height:'100%',
                      width: focus.visible ? `${area.percent}%` : '0%',
                      background: `linear-gradient(90deg, ${area.color}80, ${area.color})`,
                      borderRadius:'6px',
                      transition: `width 1.6s cubic-bezier(.4,0,.2,1) ${0.4 + i * 0.15}s`,
                      boxShadow: `0 0 8px ${area.color}55`,
                    }} />
                  </div>
                </div>

                {/* Mini stats */}
                <div style={{ display:'flex', gap:'0.6rem', paddingTop:'0.5rem', borderTop:`1px solid ${area.color}18` }}>
                  {area.stats.map(s => (
                    <div key={s.lbl} style={{ flex:1, textAlign:'center' }}>
                      <p style={{ margin:0, fontSize:'0.78rem', fontWeight:900, color:'#0d1f35' }}>{s.val}</p>
                      <p style={{ margin:0, fontSize:'0.5rem', fontWeight:600, color:'#94a3b8', letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SDG ALIGNMENT ───────────────────────────────────────── */}
      <div ref={sdg.ref as React.RefObject<HTMLDivElement>} style={{ padding:'0 2rem 5rem', maxWidth:'88rem', margin:'0 auto' }}>
        <div style={{
          textAlign:'center', marginBottom:'2.5rem',
          opacity: sdg.visible ? 1 : 0, transform: sdg.visible ? 'translateY(0)' : 'translateY(20px)',
          transition:'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <p style={{ margin:'0 0 0.4rem', fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'#9F2743' }}>UN Sustainable Development Goals</p>
          <h3 style={{ margin:0, fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:900, color:'#0d1f35' }}>
            Our{' '}
            <span style={{ background:'linear-gradient(90deg,#9F2743,#F9A14B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>SDG Alignment</span>
          </h3>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1rem' }}>
          {SDG_GOALS.map((g, i) => {
            const hov = hoveredSDG === g.id;
            return (
              <div
                key={g.id}
                onMouseEnter={() => setHoveredSDG(g.id)}
                onMouseLeave={() => setHoveredSDG(null)}
                style={{
                  background: hov ? `${g.color}0e` : 'rgba(255,255,255,0.88)',
                  borderRadius:'1rem',
                  padding:'1.25rem',
                  border: `1px solid ${hov ? g.color + '50' : 'rgba(0,0,0,0.06)'}`,
                  boxShadow: hov ? `0 8px 32px ${g.color}28` : '0 2px 12px rgba(0,0,0,0.05)',
                  opacity: sdg.visible ? 1 : 0,
                  transform: sdg.visible ? (hov ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 60}ms, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease`,
                  cursor: 'default',
                  display:'flex', alignItems:'flex-start', gap:'1rem',
                }}
              >
                {/* SDG badge */}
                <div style={{
                  width:'48px', height:'48px', borderRadius:'10px', flexShrink:0,
                  background: g.color,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  boxShadow: hov ? `0 4px 16px ${g.color}60` : `0 2px 8px ${g.color}38`,
                  transition:'box-shadow 0.3s',
                }}>
                  <span style={{ fontSize:'8px', fontWeight:700, color:'rgba(255,255,255,0.85)', lineHeight:1, letterSpacing:'0.02em' }}>SDG</span>
                  <span style={{ fontSize:'1.1rem', fontWeight:900, color:'#fff', lineHeight:1.1 }}>{g.id}</span>
                </div>

                {/* Text */}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:'0 0 0.3rem', fontSize:'0.72rem', fontWeight:800, color:'#0d1f35' }}>{g.label}</p>
                  <p style={{
                    margin:0, fontSize:'0.68rem', color: hov ? '#475569' : '#94a3b8', lineHeight:1.6,
                    maxHeight: hov ? '5rem' : '2.4rem', overflow:'hidden',
                    transition:'color 0.3s, max-height 0.4s ease',
                  }}>{g.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── IMPACT STORY ────────────────────────────────────────── */}
      <div ref={story.ref as React.RefObject<HTMLDivElement>} style={{ padding:'0 2rem 6rem', maxWidth:'88rem', margin:'0 auto' }}>
        <div
          className="sustain-story-grid"
          style={{
            borderRadius:'2rem', overflow:'hidden',
            background:'rgba(255,255,255,0.9)',
            boxShadow:'0 8px 48px rgba(0,0,0,0.09)',
            border:'1px solid rgba(159,39,67,0.12)',
            display:'grid', gridTemplateColumns:'1fr 1fr',
            opacity: story.visible ? 1 : 0,
            transform: story.visible ? 'translateY(0)' : 'translateY(32px)',
            transition:'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          {/* Left — visual panel */}
          <div style={{
            position:'relative',
            background:'linear-gradient(135deg, #9F2743 0%, #c9572a 50%, #F9A14B 100%)',
            minHeight:'360px', display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', padding:'3rem',
          }}>
            {/* School image watermark */}
            <div aria-hidden style={{
              position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'url(/images/school.jpg)',
              backgroundSize:'cover',
              backgroundPosition:'center center',
              opacity:0.18,
              mixBlendMode:'multiply',
            }} />
            {/* Decorative rings */}
            <div aria-hidden style={{ position:'absolute', width:'300px', height:'300px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.12)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
            <div aria-hidden style={{ position:'absolute', width:'210px', height:'210px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.18)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
            <div aria-hidden style={{ position:'absolute', width:'120px', height:'120px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.28)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />

            {/* Icon disc */}
            <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.5rem', boxShadow:'0 4px 24px rgba(0,0,0,0.25)' }}>
              <svg viewBox="0 0 24 24" fill="white" style={{ width:'2.5rem', height:'2.5rem' }}>
                <path d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" />
              </svg>
            </div>

            <p style={{ margin:0, fontSize:'clamp(1.2rem,2vw,1.6rem)', fontWeight:900, color:'#fff', textAlign:'center', lineHeight:1.25 }}>
              Empowering<br />Rural Education
            </p>
            <p style={{ margin:'0.75rem 0 0', fontSize:'0.7rem', color:'rgba(255,255,255,0.72)', letterSpacing:'0.14em', textTransform:'uppercase', textAlign:'center' }}>
              Impact Story 2025
            </p>

            {/* Bottom badge */}
            <div style={{ marginTop:'2rem', padding:'0.45rem 1.25rem', borderRadius:'999px', background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.28)' }}>
              <span style={{ fontSize:'0.62rem', fontWeight:700, color:'#fff', letterSpacing:'0.12em', textTransform:'uppercase' }}>Case Study · Education CSR</span>
            </div>
          </div>

          {/* Right — story text */}
          <div style={{ padding:'2.5rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <p style={{ margin:'0 0 0.5rem', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.28em', textTransform:'uppercase', color:'#9F2743' }}>Case Study</p>
            <h4 style={{ margin:'0 0 1rem', fontSize:'clamp(1.1rem,2vw,1.5rem)', fontWeight:900, color:'#0d1f35', lineHeight:1.3 }}>
              Building Futures Through Education
            </h4>
            <p style={{ margin:'0 0 1.75rem', fontSize:'clamp(0.8rem,1vw,0.9rem)', color:'#475569', lineHeight:1.82 }}>
              Through the Ceylinco Life Scholarship Programme and school infrastructure grants, we have transformed educational access for thousands of underprivileged students across Sri Lanka. From building science labs in rural schools to funding university scholarships, education represents{' '}
              <strong style={{ color:'#9F2743' }}>72% of our total Rs. 1.18 Billion</strong> CSR investment in 2025 — our largest and most enduring commitment.
            </p>

            {/* Story stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.85rem' }}>
              {[
                { val:'5,200+',     lbl:'Students Supported' },
                { val:'86',         lbl:'Schools Benefited' },
                { val:'Rs. 847 Mn', lbl:'Education Investment' },
              ].map(s => (
                <div key={s.lbl} style={{ textAlign:'center', padding:'0.85rem 0.5rem', borderRadius:'0.875rem', background:'rgba(159,39,67,0.05)', border:'1px solid rgba(159,39,67,0.12)' }}>
                  <p style={{ margin:0, fontSize:'clamp(0.78rem,1.2vw,0.95rem)', fontWeight:900, color:'#9F2743', lineHeight:1 }}>{s.val}</p>
                  <p style={{ margin:'0.25rem 0 0', fontSize:'0.5rem', fontWeight:600, color:'#94a3b8', letterSpacing:'0.1em', textTransform:'uppercase' }}>{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .sustain-story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
