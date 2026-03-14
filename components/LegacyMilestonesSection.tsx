'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, fadeUp, fadeIn } from '@/hooks/useScrollAnimation';

/* ─── Data ───────────────────────────────────────────────────── */
const milestones = [
  { year: '1988', title: 'Founded',              desc: 'Ceylinco Holdings PLC commenced on 14th January 1988, pioneering life insurance in Sri Lanka with a solid and innovative start.',                                                     color: '#26C6DA', icon: '★' },
  { year: '1998', title: 'Rs. 1 Bn Premium',     desc: "Life Division's annual premium income crossed the Rs. 1 Billion milestone — a landmark in Sri Lanka's insurance history.",                                                           color: '#F5A623', icon: '◈' },
  { year: '2004', title: 'No. 1 Service Brand',  desc: "Achieved market leadership and recognised as 'No. 1 Service Brand in Sri Lanka' at SLIM Brand Excellence Awards.",                                                                   color: '#CE93D8', icon: '⬟' },
  { year: '2005', title: 'Asia Pacific Award',   desc: 'Won first-ever CSR Award for an insurance company in Asia Pacific at the 9th Asian Insurance Industry Awards, Singapore.',                                                          color: '#FF7043', icon: '⬡' },
  { year: '2015', title: 'New Entity',           desc: 'Ceylinco Life Insurance Limited began operations in June 2015, taking over the life insurance business of Ceylinco Insurance PLC.',                                                 color: '#66BB6A', icon: '◉' },
  { year: '2020', title: 'Life Fund Rs. 106 Bn', desc: "Life Fund reached Rs. 106.7 Bn. Despite COVID-19, the Company's GWP grew by 18%, demonstrating remarkable resilience.",                                                            color: '#42A5F5', icon: '◆' },
  { year: '2022', title: 'Brand of the Year',    desc: "Won the prestigious 'Brand of the Year' at SLIM Brand Excellence Awards, cementing decades of market dominance.",                                                                  color: '#EC407A', icon: '✦' },
  { year: '2023', title: '35th Anniversary',     desc: "Total assets over Rs. 200 Bn, equity over Rs. 50 Bn. Won 'Brand of the Year' and SAFA Gold Award for Best Annual Report.",                                                       color: '#FFC107', icon: '★' },
  { year: '2024', title: '21 Yrs Leadership',    desc: "Rs. 37 Bn in premiums, asset base over Rs. 250 Bn. Profit before tax exceeded Rs. 10 Bn for the 1st time in history.",                                                           color: '#26C6DA', icon: '⬡' },
];

const achievements = [
  { value: 22,   suffix: '',    label: 'Years Market Leadership', prefix: '' },
  { value: 202,  suffix: ' Bn', label: 'Life Fund (Rs.)',         prefix: 'Rs.' },
  { value: 44.2, suffix: ' Bn', label: 'Gross Written Premium',   prefix: 'Rs.' },
  { value: 287,  suffix: ' Bn', label: 'Total Assets (Rs.)',      prefix: 'Rs.' },
];

/* ─── Counter hook ───────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const fn = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(parseFloat((e * target).toFixed(target % 1 === 0 ? 0 : 1)));
      if (p < 1) raf.current = requestAnimationFrame(fn);
    };
    raf.current = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);
  return count;
}

function StatItem({ item, isVisible, delay, showDivider }: { item: typeof achievements[0]; isVisible: boolean; delay: number; showDivider: boolean }) {
  const count = useCountUp(item.value, isVisible, 1800);
  const display = item.value % 1 === 0 ? Math.round(count) : count.toFixed(1);
  return (
    <div style={{ display:'flex', alignItems:'center' }}>
      <div style={{ textAlign:'center', padding:'0 1.75rem', opacity:isVisible?1:0, transform:isVisible?'none':'translateY(16px)', transition:`opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
        <div style={{ fontSize:'clamp(1.4rem,2.6vw,2.1rem)', fontWeight:900, lineHeight:1, color:'#0d1f35', letterSpacing:'-0.02em' }}>
          {item.prefix && <span style={{ fontSize:'45%', color:'#64748b', fontWeight:700 }}>{item.prefix} </span>}
          {display}
          <span style={{ fontSize:'50%', color:'#64748b' }}>{item.suffix}</span>
        </div>
        <p style={{ margin:'0.2rem 0 0', fontSize:'clamp(0.52rem,0.72vw,0.62rem)', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#94a3b8', whiteSpace:'nowrap' }}>
          {item.label}
        </p>
      </div>
      {showDivider && <div style={{ width:'1px', height:'2rem', background:'rgba(0,0,0,0.08)', flexShrink:0 }} />}
    </div>
  );
}

/* ─── Milestone card ─────────────────────────────────────────── */
function MilestoneCard({
  m, side, index, visible, active, onHover, onLeave,
}: {
  m: typeof milestones[0]; side: 'left' | 'right'; index: number;
  visible: boolean; active: boolean;
  onHover: () => void; onLeave: () => void;
}) {
  const enterX = side === 'left' ? '-40px' : '40px';
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '1.4rem 1.6rem',
        boxShadow: active
          ? `0 12px 40px rgba(0,0,0,0.1), 0 0 0 2px ${m.color}50`
          : '0 2px 16px rgba(0,0,0,0.055)',
        borderLeft: side === 'left' ? `3px solid ${m.color}` : '3px solid transparent',
        borderRight: side === 'right' ? `3px solid ${m.color}` : '3px solid transparent',
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(0) translateX(0) scale(${active ? 1.02 : 1})`
          : `translateY(16px) translateX(${enterX})`,
        transition: `opacity 0.55s ease ${index * 75}ms, transform 0.55s ease ${index * 75}ms, box-shadow 0.25s ease, border-color 0.25s ease`,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint year watermark */}
      <span aria-hidden style={{
        position: 'absolute',
        bottom: '-0.5rem',
        [side === 'left' ? 'right' : 'left']: '0.75rem',
        fontSize: '3.5rem', fontWeight: 900, lineHeight: 1,
        color: `${m.color}0c`, userSelect: 'none', pointerEvents: 'none',
      }}>
        {m.year}
      </span>

      {/* Year badge */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        marginBottom: '0.6rem', padding: '0.2rem 0.65rem',
        borderRadius: '999px',
        background: `${m.color}12`, border: `1px solid ${m.color}35`,
        fontSize: '0.6rem', fontWeight: 800, color: m.color, letterSpacing: '0.06em',
      }}>
        <span style={{ fontSize: '0.65em' }}>{m.icon}</span>
        {m.year}
      </span>

      <p style={{ margin: '0 0 0.35rem', fontSize: 'clamp(0.78rem,1vw,0.9rem)', fontWeight: 700, color: '#0d1f35', lineHeight: 1.3 }}>
        {m.title}
      </p>
      <p style={{ margin: 0, fontSize: 'clamp(0.68rem,0.85vw,0.76rem)', color: '#64748b', lineHeight: 1.65 }}>
        {m.desc}
      </p>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────── */
export default function LegacyMilestonesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.06 });
  const tlRef = useRef<HTMLDivElement>(null);
  const [tlVisible, setTlVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  /* Intersection observer for timeline */
  useEffect(() => {
    const el = tlRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTlVisible(true); }, { threshold: 0.04 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Animate the spine line drawing in */
  useEffect(() => {
    if (!tlVisible) return;
    const start = performance.now();
    const dur = 1400;
    const raf = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      setLineProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [tlVisible]);

  return (
    <section
      id="milestones"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ position:'relative', background:'linear-gradient(160deg, #FCF4E3 0%, #FFF8F0 50%, #F6EBEA 100%)', overflow:'hidden', padding:'5.5rem 0 5rem' }}
    >
      {/* Head office watermark — vintage building behind the timeline */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'url(/images/headoffice.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
        opacity: 0.50,
        mixBlendMode: 'multiply',
      }} />
      {/* Pastel overlay to keep section readable */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'linear-gradient(160deg, rgba(252,244,227,0.82) 0%, rgba(255,248,240,0.82) 50%, rgba(246,235,234,0.82) 100%)' }} />

      {/* Soft background blobs */}
      <div aria-hidden style={{ position:'absolute', top:0, right:'10%', width:'40vw', height:'40vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(249,161,75,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div aria-hidden style={{ position:'absolute', bottom:'5%', left:'5%', width:'35vw', height:'35vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)', pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, maxWidth:'84rem', margin:'0 auto', padding:'0 2rem' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'2.25rem' }}>
          <p style={{ ...fadeUp(isVisible, 0), margin:'0 0 0.4rem', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'#F5A623' }}>
            Since 1988
          </p>
          <h2 style={{ ...fadeUp(isVisible, 80), margin:0, fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, textTransform:'uppercase', color:'#0d1f35', lineHeight:1.1, letterSpacing:'-0.01em' }}>
            37 Years of{' '}
            <span style={{ background:'linear-gradient(90deg,#9F2743,#F9A14B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Trust &amp; Promise</span>
          </h2>
          <p style={{ ...fadeIn(isVisible, 160), margin:'0.35rem 0 0', fontSize:'0.68rem', color:'#94a3b8', letterSpacing:'0.18em', textTransform:'uppercase' }}>
            22 Consecutive Years of Market Leadership
          </p>
          <div style={{ ...fadeIn(isVisible, 240), width:'36px', height:'2px', background:'#F5A623', margin:'0.85rem auto 0', borderRadius:'2px' }} />
        </div>

        {/* Stats bar */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', marginBottom:'3.5rem', padding:'1.1rem 1.5rem', background:'#ffffff', boxShadow:'0 2px 18px rgba(0,0,0,0.055)', border:'1px solid rgba(159,39,67,0.15)', borderRadius:'0.875rem', ...fadeUp(isVisible, 150) }}>
          {achievements.map((item, i) => (
            <StatItem key={item.label} item={item} isVisible={isVisible} delay={200 + i * 100} showDivider={i < achievements.length - 1} />
          ))}
        </div>

        {/* ── Vertical timeline ── */}
        <div ref={tlRef} style={{ position:'relative', maxWidth:'72rem', margin:'0 auto' }}>

          {/* Ghost spine (full height, faint) */}
          <div style={{ position:'absolute', left:'50%', top:'24px', bottom:'24px', width:'2px', transform:'translateX(-50%)', background:'linear-gradient(to bottom, #9F274322, #F9A14B22, #F4D98E22, #9F274322)', borderRadius:'2px', pointerEvents:'none' }} />

          {/* Live spine (draws in) */}
          <div style={{
            position:'absolute', left:'50%', top:'24px', width:'2px',
            height: `calc((100% - 48px) * ${lineProgress})`,
            transform:'translateX(-50%)',
            background:'linear-gradient(to bottom, #9F2743, #F9A14B, #F4D98E, #9F2743)',
            borderRadius:'2px', pointerEvents:'none',
            transition:'height 0.06s linear',
          }} />

          {/* Milestones */}
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            const isActive = hoveredYear === m.year;

            return (
              <div
                key={m.year}
                style={{
                  display:'grid',
                  gridTemplateColumns:'1fr 88px 1fr',
                  alignItems:'center',
                  marginBottom: i < milestones.length - 1 ? '0.5rem' : 0,
                  minHeight:'90px',
                }}
              >
                {/* Left slot */}
                {isLeft ? (
                  <div style={{ paddingRight:'1.25rem' }}>
                    <MilestoneCard m={m} side="left" index={i} visible={tlVisible} active={isActive} onHover={() => setHoveredYear(m.year)} onLeave={() => setHoveredYear(null)} />
                  </div>
                ) : <div />}

                {/* Centre: disc */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:2, position:'relative' }}>
                  {/* Connector line to card */}
                  <div style={{
                    position:'absolute',
                    top:'50%',
                    [isLeft ? 'right' : 'left']: '50%',
                    width:'20px', height:'2px',
                    background: isActive ? m.color : `${m.color}50`,
                    transform:'translateY(-50%)',
                    transition:'background 0.25s ease',
                  }} />

                  {/* Year disc */}
                  <div style={{
                    width:'58px', height:'58px', borderRadius:'50%',
                    background: isActive ? m.color : '#ffffff',
                    border: `3px solid ${m.color}`,
                    boxShadow: isActive
                      ? `0 0 0 5px ${m.color}25, 0 4px 16px ${m.color}40`
                      : `0 2px 12px rgba(0,0,0,0.08), 0 0 0 4px ${m.color}14`,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    transition:'all 0.25s ease',
                    cursor:'default',
                    zIndex:3, position:'relative',
                    opacity: tlVisible ? 1 : 0,
                    transform: tlVisible ? 'scale(1)' : 'scale(0.6)',
                    transitionDelay: `${i * 75}ms`,
                  }}>
                    <span style={{ fontSize:'8px', fontWeight:700, color: isActive ? 'rgba(255,255,255,0.8)' : m.color, lineHeight:1, letterSpacing:'0.04em' }}>
                      {m.year.slice(0,2)}
                    </span>
                    <span style={{ fontSize:'14px', fontWeight:900, color: isActive ? '#fff' : '#0d1f35', lineHeight:1.1 }}>
                      {m.year.slice(2)}
                    </span>
                  </div>
                </div>

                {/* Right slot */}
                {!isLeft ? (
                  <div style={{ paddingLeft:'1.25rem' }}>
                    <MilestoneCard m={m} side="right" index={i} visible={tlVisible} active={isActive} onHover={() => setHoveredYear(m.year)} onLeave={() => setHoveredYear(null)} />
                  </div>
                ) : <div />}
              </div>
            );
          })}

          {/* End marker */}
          <div style={{
            display:'flex', alignItems:'center', gap:'0.75rem', marginTop:'1.5rem',
            opacity: tlVisible ? 1 : 0, transition:'opacity 0.6s ease 0.8s',
          }}>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, transparent, rgba(245,166,35,0.4))' }} />
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.4rem 1rem', background:'rgba(245,166,35,0.08)', border:'1px solid rgba(245,166,35,0.28)', borderRadius:'999px' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#F5A623', boxShadow:'0 0 10px #F5A623' }} />
              <span style={{ fontSize:'0.6rem', fontWeight:800, color:'#F5A623', letterSpacing:'0.12em', textTransform:'uppercase' }}>2025 — The Journey Continues</span>
            </div>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, rgba(245,166,35,0.4), transparent)' }} />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 700px) {
          /* Collapse to single column on mobile */
          #milestones .tl-row {
            grid-template-columns: 48px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
