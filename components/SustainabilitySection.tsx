'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── SDG Data (UN goals relevant to Ceylinco Life) ─────────── */
const SDG_GOALS = [
  { id: 1,  label: 'No Poverty',            color: '#E5243B', r: 155, speed: 32, startAngle: 0   },
  { id: 3,  label: 'Good Health',           color: '#4C9F38', r: 165, speed: 38, startAngle: 45  },
  { id: 4,  label: 'Quality Education',     color: '#C5192D', r: 172, speed: 28, startAngle: 90  },
  { id: 8,  label: 'Decent Work',           color: '#A21942', r: 158, speed: 42, startAngle: 140 },
  { id: 10, label: 'Reduced Inequalities',  color: '#DD1367', r: 168, speed: 35, startAngle: 200 },
  { id: 11, label: 'Sustainable Cities',    color: '#FD9D24', r: 160, speed: 45, startAngle: 250 },
  { id: 13, label: 'Climate Action',        color: '#3F7E44', r: 175, speed: 30, startAngle: 300 },
  { id: 15, label: 'Life on Land',          color: '#56C02B', r: 163, speed: 40, startAngle: 340 },
];

/* ─── CSR Investment Data ───────────────────────────────────── */
const CATEGORIES = [
  { label: 'Education',   amount: 'Rs. 847 Mn.', percent: 72, color: '#26C6DA', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z' },
  { label: 'Healthcare',  amount: 'Rs. 108 Mn.', percent: 9,  color: '#F5A623', icon: 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z' },
  { label: 'Environment', amount: 'Rs. 39 Mn.',  percent: 3,  color: '#66BB6A', icon: 'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2' },
  { label: 'Community',   amount: 'Rs. 186 Mn.', percent: 16, color: '#CE93D8', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z' },
];

/* fixed positions to avoid hydration mismatch */
const FIREFLIES = [
  {x:8,y:15,dur:3.2,del:0.0,s:4},{x:22,y:68,dur:2.8,del:0.4,s:3},
  {x:38,y:30,dur:4.1,del:0.9,s:5},{x:65,y:20,dur:3.7,del:0.3,s:4},
  {x:74,y:58,dur:2.2,del:1.5,s:3},{x:85,y:88,dur:3.4,del:0.7,s:5},
  {x:91,y:40,dur:1.9,del:0.2,s:3},{x:14,y:88,dur:3.0,del:1.1,s:4},
  {x:60,y:8, dur:4.0,del:1.3,s:3},{x:5, y:48,dur:2.7,del:0.5,s:4},
  {x:88,y:72,dur:1.8,del:1.0,s:3},{x:48,y:14,dur:3.3,del:0.1,s:5},
];


/* ─── Category card ─────────────────────────────────────────── */
function CategoryCard({ cat, visible, index }: { cat: typeof CATEGORIES[0]; visible: boolean; index: number }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${0.5 + index * 0.1}s, transform 0.6s ease ${0.5 + index * 0.1}s`,
      background: 'rgba(255,255,255,0.88)',
      border: `1px solid ${cat.color}35`,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      borderRadius: '0.85rem',
      padding: '1rem 1rem 0.85rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: cat.color }} />
      <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '60px', height: '60px', borderRadius: '50%', background: `${cat.color}0f`, filter: 'blur(16px)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
        <div style={{ width: '1.7rem', height: '1.7rem', borderRadius: '50%', background: `${cat.color}1a`, border: `1px solid ${cat.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" style={{ width: '0.85rem', height: '0.85rem' }} fill={cat.color}>
            <path d={cat.icon} />
          </svg>
        </div>
        <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: cat.color }}>{cat.label}</p>
      </div>

      <p style={{ margin: '0 0 0.6rem', fontSize: 'clamp(0.85rem,1.2vw,0.95rem)', fontWeight: 800, color: '#0d1f35' }}>{cat.amount}</p>

      <div style={{ height: '3px', background: 'rgba(0,0,0,0.07)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: visible ? `${cat.percent}%` : '0%', background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})`, borderRadius: '3px', transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${0.7 + index * 0.12}s`, boxShadow: `0 0 6px ${cat.color}80` }} />
      </div>
      <p style={{ margin: '0.3rem 0 0', fontSize: '0.58rem', fontWeight: 700, color: `${cat.color}bb`, letterSpacing: '0.06em' }}>{cat.percent}% of total</p>
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────────── */
export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Build per-SDG keyframe CSS */
  const orbitKeyframes = SDG_GOALS.map(sdg => `
    @keyframes sdgOrbit${sdg.id} {
      from { transform: rotate(${sdg.startAngle}deg); }
      to   { transform: rotate(${sdg.startAngle + 360}deg); }
    }
    @keyframes sdgCounter${sdg.id} {
      from { transform: rotate(-${sdg.startAngle}deg); }
      to   { transform: rotate(-${sdg.startAngle + 360}deg); }
    }
  `).join('');

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f5f0d8 0%, #e8f5e0 50%, #d8f5f0 100%)', padding: '4rem 0 3.5rem' }}
    >
          {/* background: 'linear-gradient(160deg, #d8f5f0 0%, #e8f5e0 50%, #f5f0d8 100%)', */}

      <style>{`
        ${orbitKeyframes}

        @keyframes earthSpin  { from{background-position:0% 50%}  to{background-position:100% 50%} }
        @keyframes earthFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes earthAtmos {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.03); }
        }
        @keyframes sriLankaGlow {
          0%,100% { opacity: 0.6; transform: scale(0.9); }
          50%      { opacity: 1;   transform: scale(1.5); }
        }
        @keyframes fireflyPulse {
          0%,100% { opacity: 0.08; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes fireflyDrift {
          0%   { transform: translate(0px,  0px); }
          33%  { transform: translate(8px, -12px); }
          66%  { transform: translate(-6px, -8px); }
          100% { transform: translate(0px,  0px); }
        }

        .sustain-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
          align-items: center;
        }
        .sustain-earth-wrap {
          position: relative;
          width: 400px;
          height: 400px;
          flex-shrink: 0;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .sustain-grid { grid-template-columns: 1fr; }
          .sustain-earth-wrap { width: 340px; height: 340px; }
        }
        @media (max-width: 640px) {
          .sustain-earth-wrap { width: 280px; height: 280px; }
        }
      `}</style>

      {/* Pastel watercolor blobs */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 55% 50% at 50% 10%, rgba(0,188,212,0.12) 0%, transparent 65%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 45% 55% at 5%  45%, rgba(67,160,71,0.10) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 42% 38% at 88% 15%, rgba(25,118,210,0.09) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 45% 40% at 8%  88%, rgba(216,27,96,0.07) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 52% 42% at 90% 90%, rgba(251,140,0,0.09) 0%, transparent 58%)' }} />

      {/* Light sparkle dots */}
      {FIREFLIES.map((f, i) => (
        <div key={i} aria-hidden style={{ position:'absolute', left:`${f.x}%`, top:`${f.y}%`, width:`${f.s}px`, height:`${f.s}px`, borderRadius:'50%', background:'radial-gradient(circle, rgba(38,198,218,0.6) 0%, rgba(102,187,106,0.3) 50%, transparent 100%)', animation:`fireflyPulse ${f.dur}s ease-in-out ${f.del}s infinite, fireflyDrift ${f.dur*1.8}s ease-in-out ${f.del*0.5}s infinite`, pointerEvents:'none' }} />
      ))}

      {/* Content */}
      <div style={{ position:'relative', zIndex:1, maxWidth:'90rem', margin:'0 auto', padding:'0 2rem', width:'100%' }}>

        {/* Section header */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <p style={{ margin:'0 0 0.5rem', fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'#1a9aaa', opacity:visible?1:0, transition:'opacity 0.7s ease 0.1s' }}>
            Our Commitment to the Planet
          </p>
          <h2 style={{ margin:'0 0 0.9rem', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.1, color:'#0d1f35', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)', transition:'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s' }}>
            Sustainability &{' '}
            <span style={{ background:'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Global Goals
            </span>
          </h2>
          <p style={{ margin:'0 auto', fontSize:'clamp(0.8rem,1vw,0.9rem)', color:'#64748b', maxWidth:'38rem', lineHeight:1.7, opacity:visible?1:0, transition:'opacity 0.7s ease 0.35s' }}>
            In 2025, Ceylinco Life invested <strong style={{ color:'#0d1f35' }}>Rs. 1.180 Billion</strong> aligned with 8 UN Sustainable Development Goals — driving meaningful impact across Sri Lanka.
          </p>
        </div>

        {/* Main two-column grid */}
        <div className="sustain-grid">

          {/* LEFT — Earth with orbiting SDGs */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem', order: 1 }}>

            {/* Image + orbiting SDG badges */}
            <div className="sustain-earth-wrap">
              <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>

                {/* Atmosphere glow */}
                {/* <div style={{
                  position:'absolute', width:'115%', height:'115%', borderRadius:'50%',
                  background:'radial-gradient(circle, transparent 38%, rgba(38,198,218,0.15) 52%, rgba(102,187,106,0.08) 68%, transparent 80%)',
                  animation:'earthAtmos 5s ease-in-out infinite', pointerEvents:'none',
                }} /> */}

                {/* Orbit rings */}
                <svg viewBox="0 0 400 400" style={{ position:'absolute', width:'100%', height:'100%', pointerEvents:'none', overflow:'visible', opacity:0.2 }}>
                  {[140, 155, 168].map(r => (
                    <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#26C6DA" strokeWidth="0.7" strokeDasharray="4 6" />
                  ))}
                  {[148, 162, 175].map(r => (
                    <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#66BB6A" strokeWidth="0.4" strokeDasharray="3 9" />
                  ))}
                </svg>

                {/* Orbiting SDG badges */}
                {SDG_GOALS.map((sdg, i) => (
                  <div
                    key={sdg.id}
                    aria-hidden={!visible}
                    style={{
                      position:'absolute', width:'100%', height:'100%',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      animation:`sdgOrbit${sdg.id} ${sdg.speed}s linear infinite`,
                      opacity: visible ? 1 : 0,
                      transition:`opacity 0.6s ease ${0.3 + i * 0.08}s`,
                    }}
                  >
                    <div
                      title={`SDG ${sdg.id}: ${sdg.label}`}
                      style={{
                        position:'absolute', top:'50%', left:'50%',
                        width:'36px', height:'36px',
                        marginTop:'-18px', marginLeft:`${sdg.r - 18}px`,
                        borderRadius:'50%', background:sdg.color,
                        border:'2px solid rgba(255,255,255,0.25)',
                        display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
                        boxShadow:`0 0 12px ${sdg.color}88, 0 2px 8px rgba(0,0,0,0.5)`,
                        animation:`sdgCounter${sdg.id} ${sdg.speed}s linear infinite`,
                        cursor:'default',
                      }}
                    >
                      <span style={{ fontSize:'9px', fontWeight:900, color:'#fff', lineHeight:1, letterSpacing:'-0.3px' }}>SDG</span>
                      <span style={{ fontSize:'11px', fontWeight:900, color:'#fff', lineHeight:1 }}>{sdg.id}</span>
                    </div>
                  </div>
                ))}

                {/* Center image in circular frame */}
                <div style={{
                  position:'relative', width:'210px', height:'210px',
                  borderRadius:'50%', overflow:'hidden', flexShrink:0,
                  boxShadow:`
                    0 0 40px rgba(38,198,218,0.3),
                    0 0 80px rgba(38,198,218,0.12),
                    0 8px 32px rgba(0,0,0,0.12)
                  `,
                  animation:'earthFloat 7s ease-in-out infinite',
                }}>
                  <img
                    src="/images/8335983.png"
                    alt="Sustainability"
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  />
                  {/* Rim vignette */}
                  <div style={{
                    position:'absolute', inset:0, borderRadius:'50%',
                    background:'radial-gradient(circle at 50% 50%, transparent 55%, rgba(232,245,240,0.35) 78%, rgba(232,245,240,0.65) 100%)',
                    pointerEvents:'none',
                  }} />
                </div>
              </div>
            </div>

            {/* SDG legend pills */}
            <div style={{
              display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'0.4rem 0.6rem',
              opacity:visible?1:0, transition:'opacity 0.8s ease 0.7s',
              maxWidth:'400px',
            }}>
              {SDG_GOALS.map(sdg => (
                <div key={sdg.id} style={{
                  display:'flex', alignItems:'center', gap:'0.35rem',
                  padding:'0.2rem 0.6rem 0.2rem 0.4rem',
                  borderRadius:'999px',
                  background:`${sdg.color}18`,
                  border:`1px solid ${sdg.color}40`,
                }}>
                  <span style={{ width:'14px', height:'14px', borderRadius:'50%', background:sdg.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'7px', fontWeight:900, color:'#fff' }}>{sdg.id}</span>
                  <span style={{ fontSize:'0.55rem', fontWeight:600, color:'#475569', whiteSpace:'nowrap' }}>{sdg.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — CSR investment breakdown */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', order: 2 }}>

            {/* Total investment card */}
            <div style={{
              padding:'1.25rem 1.5rem',
              borderRadius:'1rem',
              background:'rgba(255,255,255,0.88)',
              border:'1px solid rgba(38,198,218,0.25)',
              boxShadow:'0 4px 20px rgba(0,0,0,0.07)',
              opacity:visible?1:0,
              transform:visible?'translateY(0)':'translateY(20px)',
              transition:'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
            }}>
              <p style={{ margin:'0 0 0.2rem', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#1a9aaa' }}>Total CSR Investment 2025</p>
              <p style={{ margin:0, fontSize:'clamp(1.6rem,2.8vw,2.2rem)', fontWeight:900, color:'#0d1f35', letterSpacing:'-0.02em' }}>
                Rs. 1.180 <span style={{ fontSize:'0.55em', fontWeight:600, color:'#64748b' }}>Billion</span>
              </p>
              <div style={{ marginTop:'0.75rem', height:'3px', background:'rgba(0,0,0,0.06)', borderRadius:'3px', overflow:'hidden' }}>
                <div style={{ height:'100%', width:visible?'100%':'0%', background:'linear-gradient(90deg,#26C6DA,#66BB6A)', borderRadius:'3px', transition:'width 1.6s cubic-bezier(.4,0,.2,1) 0.6s' }} />
              </div>
            </div>

            {/* Category cards */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.label} cat={cat} visible={visible} index={i} />
              ))}
            </div>

            {/* Bottom stats row */}
            <div style={{
              display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem',
              opacity:visible?1:0, transition:'opacity 0.7s ease 0.9s',
            }}>
              {[
                { val:'37+', label:'Years CSR' },
                { val:'8',   label:'SDG Goals' },
                { val:'4',   label:'Pillars' },
              ].map(({ val, label }) => (
                <div key={label} style={{ textAlign:'center', padding:'0.7rem 0.5rem', borderRadius:'0.75rem', background:'rgba(255,255,255,0.82)', border:'1px solid rgba(38,198,218,0.15)', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
                  <p style={{ margin:0, fontSize:'clamp(1rem,1.8vw,1.3rem)', fontWeight:900, color:'#c47d0a' }}>{val}</p>
                  <p style={{ margin:'0.1rem 0 0', fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'#64748b' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
