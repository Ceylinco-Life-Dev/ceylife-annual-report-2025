'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, fadeUp, fadeIn } from '@/hooks/useScrollAnimation';

const milestones = [
  { year: '1988', title: 'Founded',             desc: 'Ceylinco Holdings PLC commenced on 14th January 1988, pioneering life insurance in Sri Lanka.',                                                     color: '#26C6DA' },
  { year: '1998', title: 'Rs. 1 Bn Premium',    desc: "Life Division's annual premium income crossed the Rs. 1 Bn milestone.",                                                                            color: '#F5A623' },
  { year: '2004', title: 'No. 1 Service Brand', desc: "Achieved market leadership and recognised as 'No. 1 Service Brand in Sri Lanka' at SLIM Brand Excellence Awards.",                                  color: '#CE93D8' },
  { year: '2005', title: 'Asia Pacific Award',  desc: 'Won first-ever CSR Award for an insurance company in Asia Pacific at the 9th Asian Insurance Industry Awards, Singapore.',                         color: '#FF7043' },
  { year: '2015', title: 'New Entity',          desc: 'Ceylinco Life Insurance Limited began operations in June 2015, taking over the life insurance business of Ceylinco Insurance PLC.',                color: '#66BB6A' },
  { year: '2020', title: 'Life Fund Rs. 106 Bn',desc: "Life Fund reached Rs. 106.7 Bn. Despite COVID-19, the Company's GWP grew by 18%.",                                                               color: '#42A5F5' },
  { year: '2022', title: 'Brand of the Year',   desc: "Won the prestigious 'Brand of the Year' at SLIM Brand Excellence Awards.",                                                                         color: '#EC407A' },
  { year: '2023', title: '35th Anniversary',    desc: "Total assets over Rs. 200 Bn, equity over Rs. 50 Bn. Won 'Brand of the Year' and SAFA Gold Award for Best Annual Report.",                        color: '#FFC107' },
  { year: '2024', title: '21 Yrs Leadership',   desc: "Rs. 37 Bn in premiums, asset base over Rs. 250 Bn. Profit before tax exceeded Rs. 10 Bn for the 1st time in history.",                           color: '#26C6DA' },
];

const achievements = [
  { value: 22,   suffix: '',    label: 'Years Market Leadership', prefix: '' },
  { value: 202,  suffix: ' Bn', label: 'Life Fund (Rs.)',         prefix: 'Rs.' },
  { value: 44.2, suffix: ' Bn', label: 'Gross Written Premium',   prefix: 'Rs.' },
  { value: 287,  suffix: ' Bn', label: 'Total Assets (Rs.)',      prefix: 'Rs.' },
];

/* 3 road rows — serpentine: LTR, RTL, LTR */
const ROWS = [
  { items: milestones.slice(0, 3), dir: 'ltr' as const, turnSide: 'right' as const },
  { items: milestones.slice(3, 6), dir: 'rtl' as const, turnSide: 'left'  as const },
  { items: milestones.slice(6, 9), dir: 'ltr' as const, turnSide: null },
];

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', padding: '0 1.75rem', opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'translateY(16px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
        <div style={{ fontSize: 'clamp(1.4rem,2.6vw,2.1rem)', fontWeight: 900, lineHeight: 1, color: '#F5A623', letterSpacing: '-0.02em' }}>
          {item.prefix && <span style={{ fontSize: '45%', color: 'rgba(245,166,35,0.7)', fontWeight: 700 }}>{item.prefix} </span>}
          {display}
          <span style={{ fontSize: '50%', color: 'rgba(245,166,35,0.75)' }}>{item.suffix}</span>
        </div>
        <p style={{ margin: '0.2rem 0 0', fontSize: 'clamp(0.52rem,0.72vw,0.62rem)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap' }}>
          {item.label}
        </p>
      </div>
      {showDivider && <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />}
    </div>
  );
}

export default function LegacyMilestonesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.06 });
  const roadRef = useRef<HTMLDivElement>(null);
  const [roadVisible, setRoadVisible] = useState(false);

  useEffect(() => {
    const el = roadRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRoadVisible(true); }, { threshold: 0.04 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="milestones"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ position: 'relative', background: '#080f1c', overflow: 'hidden', padding: '4.5rem 0 4rem' }}
    >
      {/* Subtle background glows */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,188,212,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 40% 50% at 5% 50%, rgba(67,160,71,0.08) 0%, transparent 60%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 40% 50% at 95% 50%, rgba(25,118,210,0.08) 0%, transparent 60%)' }} />

      {/* Faint year watermark */}
      <div aria-hidden style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'clamp(12rem,25vw,22rem)', fontWeight:900, lineHeight:1, color:'rgba(255,255,255,0.02)', userSelect:'none', pointerEvents:'none', letterSpacing:'-0.05em' }}>
        1988
      </div>

      <div style={{ position:'relative', zIndex:1, maxWidth:'88rem', margin:'0 auto', padding:'0 2rem' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <p style={{ ...fadeUp(isVisible, 0), margin:'0 0 0.4rem', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'#F5A623' }}>Since 1988</p>
          <h2 style={{ ...fadeUp(isVisible, 80), margin:0, fontSize:'clamp(1.5rem,3.2vw,2.5rem)', fontWeight:900, textTransform:'uppercase', color:'#fff', lineHeight:1.1, letterSpacing:'-0.01em' }}>
            37 Years of{' '}
            <span style={{ background:'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Trust &amp; Promise</span>
          </h2>
          <p style={{ ...fadeIn(isVisible, 180), margin:'0.35rem 0 0', fontSize:'0.68rem', color:'rgba(255,255,255,0.32)', letterSpacing:'0.18em', textTransform:'uppercase' }}>
            22 Consecutive Years of Market Leadership
          </p>
          <div style={{ ...fadeIn(isVisible, 260), width:'36px', height:'2px', background:'#F5A623', margin:'0.8rem auto 0' }} />
        </div>

        {/* Stats bar */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', marginBottom:'2.5rem', padding:'1rem 1.5rem', background:'rgba(38,198,218,0.05)', border:'1px solid rgba(38,198,218,0.1)', borderRadius:'0.875rem', backdropFilter:'blur(8px)', ...fadeUp(isVisible, 150) }}>
          {achievements.map((item, i) => (
            <StatItem key={item.label} item={item} isVisible={isVisible} delay={200 + i * 100} showDivider={i < achievements.length - 1} />
          ))}
        </div>

        {/* Road map */}
        <div ref={roadRef}>
          {ROWS.map((row, rowIdx) => {
            /* RTL rows: visually reverse card order so the road reads chronologically R→L */
            const displayItems = row.dir === 'rtl' ? [...row.items].reverse() : row.items;
            const isLast = row.turnSide === null;

            return (
              <div key={rowIdx}>
                {/* Cards row */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.75rem', marginBottom:'0' }}>
                  {displayItems.map((m, ci) => {
                    /* Global index for stagger delay */
                    const gi = rowIdx * 3 + ci;
                    return (
                      <div
                        key={m.year}
                        style={{
                          position:'relative', overflow:'hidden',
                          background:'rgba(255,255,255,0.03)',
                          border:`1px solid ${m.color}28`,
                          borderTop:`2px solid ${m.color}`,
                          borderRadius:'0.75rem 0.75rem 0 0',
                          padding:'0.9rem 1rem 0.85rem',
                          opacity: roadVisible ? 1 : 0,
                          transform: roadVisible ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 0.5s ease ${gi * 70}ms, transform 0.5s ease ${gi * 70}ms`,
                        }}
                      >
                        {/* Faint year bg */}
                        <span aria-hidden style={{ position:'absolute', bottom:'-0.6rem', right:'0.3rem', fontSize:'3.2rem', fontWeight:900, lineHeight:1, color:`${m.color}10`, userSelect:'none', pointerEvents:'none' }}>
                          {m.year}
                        </span>
                        <span style={{ display:'inline-block', marginBottom:'0.4rem', padding:'0.12rem 0.5rem', borderRadius:'999px', background:`${m.color}18`, border:`1px solid ${m.color}35`, fontSize:'0.58rem', fontWeight:800, color:m.color, letterSpacing:'0.06em' }}>
                          {m.year}
                        </span>
                        <p style={{ margin:'0 0 0.3rem', fontSize:'clamp(0.68rem,0.92vw,0.8rem)', fontWeight:700, color:'#fff', lineHeight:1.3 }}>{m.title}</p>
                        <p style={{ margin:0, fontSize:'clamp(0.58rem,0.75vw,0.66rem)', color:'rgba(255,255,255,0.4)', lineHeight:1.55 }}>{m.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Road strip */}
                <div style={{ position:'relative', height:'44px', marginBottom: isLast ? 0 : 0 }}>
                  {/* Road surface */}
                  <div style={{
                    position:'absolute', top:0, left:0, right:0, bottom:0,
                    background:'#101c2e',
                    borderLeft:'1px solid rgba(255,255,255,0.06)',
                    borderRight:'1px solid rgba(255,255,255,0.06)',
                  }} />

                  {/* Edge lines */}
                  <div style={{ position:'absolute', top:'3px', left:0, right:0, height:'2px', background:`rgba(255,255,255,0.07)` }} />
                  <div style={{ position:'absolute', bottom:'3px', left:0, right:0, height:'2px', background:`rgba(255,255,255,0.07)` }} />

                  {/* Center dashes */}
                  <div style={{
                    position:'absolute', top:'50%', left:0, right:0, height:'2px',
                    transform:'translateY(-50%)',
                    backgroundImage:'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 24px, transparent 24px, transparent 44px)',
                  }} />

                  {/* Direction arrow */}
                  <div style={{
                    position:'absolute', top:'50%', left:'50%',
                    transform:`translate(-50%,-50%) ${row.dir === 'rtl' ? 'rotate(180deg)' : ''}`,
                    color:'rgba(255,255,255,0.25)', fontSize:'1.2rem', lineHeight:1,
                  }}>
                    ›
                  </div>

                  {/* Milestone dots on road — align with each card column */}
                  {[0, 1, 2].map(ci => (
                    <div key={ci} style={{
                      position:'absolute', top:'50%',
                      left:`calc(${ci * 33.333 + 16.667}% - 7px)`,
                      transform:'translateY(-50%)',
                      width:'14px', height:'14px', borderRadius:'50%',
                      background: displayItems[ci]?.color ?? '#26C6DA',
                      boxShadow:`0 0 8px ${displayItems[ci]?.color ?? '#26C6DA'}88`,
                      zIndex:2,
                    }} />
                  ))}
                </div>

                {/* Turn connector between rows */}
                {!isLast && (
                  <div style={{ position:'relative', height:'32px', marginBottom:'0' }}>
                    {row.turnSide === 'right' ? (
                      <>
                        {/* Right turn: vertical line on right + horizontal back */}
                        <div style={{ position:'absolute', right:0, top:0, width:'50%', height:'100%', borderRight:`2px dashed rgba(255,255,255,0.12)`, borderBottom:`2px dashed rgba(255,255,255,0.12)`, borderBottomRightRadius:'12px' }} />
                      </>
                    ) : (
                      <>
                        {/* Left turn */}
                        <div style={{ position:'absolute', left:0, top:0, width:'50%', height:'100%', borderLeft:`2px dashed rgba(255,255,255,0.12)`, borderBottom:`2px dashed rgba(255,255,255,0.12)`, borderBottomLeftRadius:'12px' }} />
                      </>
                    )}
                    {/* Turn label */}
                    <span style={{
                      position:'absolute', top:'50%', transform:'translateY(-50%)',
                      [row.turnSide === 'right' ? 'right' : 'left']: '4px',
                      fontSize:'0.52rem', fontWeight:700, color:'rgba(255,255,255,0.2)', letterSpacing:'0.1em', textTransform:'uppercase',
                    }}>
                      {row.turnSide === 'right' ? '→ cont.' : '← cont.'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* End marker */}
          <div style={{
            display:'flex', alignItems:'center', gap:'0.75rem', marginTop:'0.5rem',
            opacity: roadVisible ? 1 : 0, transition:'opacity 0.6s ease 0.7s',
          }}>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, transparent, rgba(245,166,35,0.4))' }} />
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.3rem 0.8rem', background:'rgba(245,166,35,0.1)', border:'1px solid rgba(245,166,35,0.3)', borderRadius:'999px' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#F5A623', boxShadow:'0 0 10px #F5A623' }} />
              <span style={{ fontSize:'0.58rem', fontWeight:800, color:'#F5A623', letterSpacing:'0.12em', textTransform:'uppercase' }}>2024 — The Journey Continues</span>
            </div>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg, rgba(245,166,35,0.4), transparent)' }} />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          /* Stack to single column on mobile */
          .rm-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
