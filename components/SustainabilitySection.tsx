'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Data ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { label: 'Education',   amount: 'Rs. 847 Mn.', percent: 72, color: '#26C6DA', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z' },
  { label: 'Healthcare',  amount: 'Rs. 108 Mn.', percent: 9,  color: '#F5A623', icon: 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z' },
  { label: 'Environment', amount: 'Rs. 39 Mn.',  percent: 3,  color: '#66BB6A', icon: 'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2' },
  { label: 'Community',   amount: 'Rs. 186 Mn.', percent: 16, color: '#CE93D8', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z' },
];

/* fixed positions to avoid hydration mismatch */
const FIREFLIES = [
  {x:8,  y:15, dur:3.2, del:0.0, s:4}, {x:22, y:68, dur:2.8, del:0.4, s:3},
  {x:38, y:30, dur:4.1, del:0.9, s:5}, {x:52, y:82, dur:2.5, del:1.2, s:3},
  {x:65, y:20, dur:3.7, del:0.3, s:4}, {x:74, y:58, dur:2.2, del:1.5, s:3},
  {x:85, y:88, dur:3.4, del:0.7, s:5}, {x:91, y:40, dur:1.9, del:0.2, s:3},
  {x:14, y:88, dur:3.0, del:1.1, s:4}, {x:44, y:52, dur:3.6, del:0.6, s:3},
  {x:30, y:92, dur:2.3, del:0.8, s:5}, {x:60, y:8,  dur:4.0, del:1.3, s:3},
  {x:5,  y:48, dur:2.7, del:0.5, s:4}, {x:88, y:72, dur:1.8, del:1.0, s:3},
  {x:48, y:14, dur:3.3, del:0.1, s:5}, {x:70, y:96, dur:2.6, del:1.4, s:4},
  {x:20, y:36, dur:3.8, del:0.9, s:3}, {x:35, y:74, dur:2.1, del:0.3, s:4},
  {x:78, y:40, dur:4.3, del:1.6, s:3}, {x:93, y:20, dur:2.0, del:0.8, s:5},
];

const CIRCUMFERENCE = 2 * Math.PI * 52;

/* ─── Donut chart ───────────────────────────────────────────── */
function DonutChart({ visible }: { visible: boolean }) {
  let cumulativePct = 0;
  return (
    <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="13" />
      {CATEGORIES.map((cat, i) => {
        const dash = (cat.percent / 100) * CIRCUMFERENCE;
        const rotation = (cumulativePct / 100) * 360 - 90;
        cumulativePct += cat.percent;
        return (
          <circle key={i} cx="60" cy="60" r="52" fill="none"
            stroke={cat.color} strokeWidth="13" strokeLinecap="round"
            strokeDasharray={`${visible ? dash - 2 : 0} ${CIRCUMFERENCE}`}
            transform={`rotate(${rotation} 60 60)`}
            style={{ transition: `stroke-dasharray 1.6s cubic-bezier(.4,0,.2,1) ${i * 0.3 + 0.4}s` }}
          />
        );
      })}
      {/* glow ring */}
      <circle cx="60" cy="60" r="52" fill="none"
        stroke="rgba(0,188,212,0.08)" strokeWidth="20"
        style={{ filter: 'blur(6px)' }}
      />
      <text x="60" y="53" textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="900" letterSpacing="-0.5">Rs. 1.180</text>
      <text x="60" y="64" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5" fontWeight="600">Bn. TOTAL</text>
      <text x="60" y="73" textAnchor="middle" fill="rgba(0,188,212,0.7)" fontSize="5.5" fontWeight="700" letterSpacing="0.5">UTILISED</text>
    </svg>
  );
}

/* ─── 3D Earth ──────────────────────────────────────────────── */
function EarthAnim() {
  return (
    <>
      <style>{`
        @keyframes earthFloat {
          0%,100% { transform: translateY(0px) rotate(-1.5deg); }
          50%      { transform: translateY(-20px) rotate(1.5deg); }
        }
        @keyframes earthGlow {
          0%,100% { opacity: 0.5; transform: scale(0.93); }
          50%      { opacity: 0.85; transform: scale(1.07); }
        }
      `}</style>

      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>

        {/* Ambient glow behind earth */}
        <div style={{
          position:'absolute', width:'72%', height:'72%', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(38,198,218,0.35) 0%, rgba(102,187,106,0.2) 45%, transparent 70%)',
          filter:'blur(32px)',
          animation:'earthGlow 4s ease-in-out infinite',
          pointerEvents:'none',
        }} />

        {/* Earth image — radial mask removes the solid cyan background */}
        <div style={{
          width:'92%', height:'92%',
          animation:'earthFloat 6s ease-in-out infinite',
          maskImage:'radial-gradient(ellipse 52% 52% at 50% 50%, black 38%, rgba(0,0,0,0.94) 50%, rgba(0,0,0,0.6) 64%, rgba(0,0,0,0.15) 77%, transparent 88%)',
          WebkitMaskImage:'radial-gradient(ellipse 52% 52% at 50% 50%, black 38%, rgba(0,0,0,0.94) 50%, rgba(0,0,0,0.6) 64%, rgba(0,0,0,0.15) 77%, transparent 88%)',
          filter:'drop-shadow(0 0 36px rgba(38,198,218,0.6)) drop-shadow(0 0 80px rgba(102,187,106,0.28))',
        }}>
          <img
            src="/images/8335983.jpg"
            alt="3D Earth"
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }}
          />
        </div>

        {/* Decorative orbit rings */}
        <svg viewBox="0 0 100 100" style={{ position:'absolute', width:'108%', height:'108%', pointerEvents:'none', overflow:'visible' }}>
          <ellipse cx="50" cy="50" rx="48" ry="12" fill="none"
            stroke="rgba(38,198,218,0.28)" strokeWidth="0.7"
            transform="rotate(-18 50 50)" strokeDasharray="5 3"/>
          <ellipse cx="50" cy="50" rx="46" ry="11" fill="none"
            stroke="rgba(102,187,106,0.2)" strokeWidth="0.5"
            transform="rotate(22 50 50)" strokeDasharray="7 4"/>
        </svg>
      </div>
    </>
  );
}

/* ─── Small drifting bird silhouette ─────────────────────────── */
function MiniBird({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 30" style={{ ...style, opacity: 0.2 }}>
      <path d="M30,15 Q20,5 5,10 Q15,12 20,15 Q15,18 5,20 Q20,25 30,15 Z" fill="#26C6DA"/>
      <path d="M30,15 Q40,5 55,10 Q45,12 40,15 Q45,18 55,20 Q40,25 30,15 Z" fill="#26C6DA"/>
    </svg>
  );
}

/* ─── Category card ─────────────────────────────────────────── */
function CategoryCard({ cat, visible, index }: { cat: typeof CATEGORIES[0]; visible: boolean; index: number }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${0.5 + index * 0.12}s, transform 0.7s ease ${0.5 + index * 0.12}s`,
        background: 'rgba(59, 158, 207, 0.11)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${cat.color}28`,
        borderRadius: '1rem',
        padding: '1.25rem 1.25rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: cat.color, borderRadius: '2px 2px 0 0' }} />
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: `${cat.color}12`, filter: 'blur(20px)', pointerEvents: 'none' }} />

      {/* Icon */}
      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: `${cat.color}18`, border: `1px solid ${cat.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
        <svg viewBox="0 0 24 24" style={{ width: '1rem', height: '1rem' }} fill={cat.color}>
          <path d={cat.icon} />
        </svg>
      </div>

      <p style={{ margin: '0 0 0.15rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: cat.color }}>{cat.label}</p>
      <p style={{ margin: '0 0 0.9rem', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', fontWeight: 800, color: '#fff' }}>{cat.amount}</p>

      {/* Progress bar */}
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: visible ? `${cat.percent}%` : '0%', background: `linear-gradient(90deg, ${cat.color}88, ${cat.color})`, borderRadius: '4px', transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${0.7 + index * 0.15}s`, boxShadow: `0 0 8px ${cat.color}80` }} />
      </div>
      <p style={{ margin: '0.4rem 0 0', fontSize: '0.62rem', fontWeight: 700, color: `${cat.color}cc`, letterSpacing: '0.08em' }}>{cat.percent}%</p>
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden', background: '#7995b6', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 0 4rem' }}
    >
      <style>{`
        @keyframes fireflyPulse {
          0%,100% { opacity: 0.08; transform: scale(0.8); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes fireflyDrift {
          0%   { transform: translate(0px,  0px); }
          33%  { transform: translate(8px, -12px); }
          66%  { transform: translate(-6px, -8px); }
          100% { transform: translate(0px,  0px); }
        }
        @keyframes leafSway {
          0%,100% { transform: rotate(-4deg); }
          50%     { transform: rotate(4deg);  }
        }
        @keyframes floatAcross {
          0%   { transform: translate(-120px, 0px)   rotate(-5deg); opacity:0;   }
          8%   { opacity: 0.35; }
          50%  { transform: translate(40vw,  -60px)  rotate(3deg);  opacity:0.35; }
          92%  { opacity: 0.35; }
          100% { transform: translate(100vw, -20px)  rotate(-2deg); opacity:0;   }
        }
        @keyframes floatAcross2 {
          0%   { transform: translate(-80px,  60px)  rotate(8deg); opacity:0;   }
          8%   { opacity: 0.25; }
          50%  { transform: translate(30vw,   10px)  rotate(-4deg); opacity:0.25; }
          92%  { opacity: 0.25; }
          100% { transform: translate(95vw,   40px)  rotate(5deg); opacity:0;   }
        }

        /* ── Responsive ── */
        .sustain-header-row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .sustain-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .sustain-cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .sustain-donut-wrap {
          width: clamp(160px, 18vw, 220px);
          height: clamp(160px, 18vw, 220px);
          flex-shrink: 0;
        }
        .sustain-butterfly-size { width: 440px; height: 330px; }
        .sustain-stats-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(2rem, 6vw, 5rem);
          flex-wrap: wrap;
          padding: 1rem 3rem;
        }

        @media (max-width: 900px) {
          .sustain-main-grid {
            grid-template-columns: 1fr;
          }
          .sustain-butterfly-col {
            order: -1;
          }
          .sustain-butterfly-size { width: 320px !important; height: 240px !important; }
        }
        @media (max-width: 640px) {
          .sustain-header-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .sustain-donut-wrap {
            width: 180px !important;
            height: 180px !important;
          }
          .sustain-cat-grid {
            grid-template-columns: 1fr;
          }
          .sustain-butterfly-size { width: 260px !important; height: 195px !important; }
          .sustain-stats-strip {
            gap: 1.5rem;
            padding: 1rem 1.5rem;
          }
        }
      `}</style>

      {/* ── Watercolor cloud layers (identical palette to Milestones) ── */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 55% 50% at 50% 12%, rgba(0,210,225,0.65) 0%, transparent 65%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 45% 55% at 5% 45%, rgba(67,160,71,0.58) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 42% 38% at 18% 10%, rgba(123,31,162,0.62) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 48% 42% at 88% 15%, rgba(25,118,210,0.55) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 45% 40% at 8% 88%, rgba(216,27,96,0.52) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 52% 42% at 90% 90%, rgba(251,140,0,0.55) 0%, transparent 58%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 40% 30% at 50% 95%, rgba(253,216,53,0.42) 0%, transparent 65%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 14% 28% at 50% 0%, rgba(255,255,255,0.30) 0%, transparent 70%)' }} />
      {/* Dark overlay to keep text readable */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'rgba(8,14,28,0.28)' }} />

      {/* ── Background leaves ── */}
      {[
        { x:'5%',  y:'8%',  s:55, r: 15 }, { x:'88%', y:'5%',  s:70, r:-20 },
        { x:'2%',  y:'75%', s:45, r: 25 }, { x:'92%', y:'80%', s:60, r:-10 },
        { x:'45%', y:'92%', s:40, r: 18 }, { x:'50%', y:'2%',  s:50, r:-15 },
      ].map((l, i) => (
        <svg key={i} viewBox="0 0 60 80" aria-hidden style={{ position:'absolute', left:l.x, top:l.y, width:l.s, height:l.s*1.3, opacity:0.06, pointerEvents:'none', animation:`leafSway ${3+i*0.4}s ease-in-out ${i*0.6}s infinite`, transform:`rotate(${l.r}deg)` }}>
          <path d="M30 5 C50 20 55 50 30 75 C5 50 10 20 30 5Z" fill="#fff"/>
          <line x1="30" y1="5" x2="30" y2="75" stroke="#fff" strokeWidth="1" opacity="0.4"/>
        </svg>
      ))}

      {/* ── Fireflies ── */}
      {FIREFLIES.map((f, i) => (
        <div key={i} aria-hidden style={{ position:'absolute', left:`${f.x}%`, top:`${f.y}%`, width:`${f.s}px`, height:`${f.s}px`, borderRadius:'50%', background:`radial-gradient(circle, rgba(255,255,200,0.95) 0%, rgba(200,255,150,0.5) 50%, transparent 100%)`, animation:`fireflyPulse ${f.dur}s ease-in-out ${f.del}s infinite, fireflyDrift ${f.dur*1.8}s ease-in-out ${f.del*0.5}s infinite`, pointerEvents:'none' }} />
      ))}

      {/* ── Floating mini-butterflies across scene ── */}
      <div aria-hidden style={{ position:'absolute', bottom:'30%', left:0, pointerEvents:'none', animation:'floatAcross 22s linear 2s infinite' }}>
        <MiniBird style={{ width:'60px', height:'45px' }}/>
      </div>
      <div aria-hidden style={{ position:'absolute', bottom:'55%', left:0, pointerEvents:'none', animation:'floatAcross2 28s linear 8s infinite' }}>
        <MiniBird style={{ width:'40px', height:'30px' }}/>
      </div>

      {/* ── Content wrapper ── */}
      <div style={{ position:'relative', zIndex:1, maxWidth:'90rem', margin:'0 auto', padding:'0 2rem', width:'100%' }}>

        {/* Top: Heading row */}
        <div className="sustain-header-row">
          <div style={{ maxWidth:'38rem' }}>
            <h2 style={{ margin:'0 0 1rem', fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:900, lineHeight:1.1, color:'#fff', letterSpacing:'-0.01em', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)', transition:'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}>
              Growing a<br/>
              <span style={{ background:'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Sustainable Future
              </span>
            </h2>
            <p style={{ margin:0, fontSize:'clamp(0.82rem,1.1vw,0.95rem)', color:'rgba(255,255,255,0.55)', lineHeight:1.75, maxWidth:'30rem', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(16px)', transition:'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s' }}>
              In 2025, Ceylinco Life invested <strong style={{ color:'#fff' }}>Rs. 1.180 Billion</strong> in targeted programmes across education, healthcare, environment and community — guided by our commitment to protect not just individuals, but the world they live in.
            </p>
          </div>

          {/* Donut chart */}
          {/* <div className="sustain-donut-wrap" style={{ opacity:visible?1:0, transform:visible?'scale(1)':'scale(0.85)', transition:'opacity 1s ease 0.4s, transform 1s ease 0.4s' }}> <DonutChart visible={visible} />
            {/* legend */}
            {/* <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem 0.8rem', marginTop:'0.75rem', justifyContent:'center' }}>
              {CATEGORIES.map(c => (
                <div key={c.label} style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
                  <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:c.color, flexShrink:0 }}/>
                  <span style={{ fontSize:'0.55rem', color:'rgba(255,255,255,0.5)', fontWeight:600, letterSpacing:'0.06em' }}>{c.label}</span>
                </div>
              ))}
            </div> */}
          {/* </div> */}
        </div>

        {/* Middle: Butterfly hero + category cards */}
        <div className="sustain-main-grid">

          {/* Category cards grid */}
          <div className="sustain-cat-grid">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.label} cat={cat} visible={visible} index={i} />
            ))}
          </div>

          {/* Butterfly */}
          <div className="sustain-butterfly-col" style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative', opacity:visible?1:0, transform:visible?'translateX(0)':'translateX(60px)', transition:'opacity 1s ease 0.3s, transform 1s ease 0.3s' }}>
            {/* Radial glow behind butterfly */}
            <div aria-hidden style={{ position:'absolute', width:'100%', height:'100%', background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,188,212,0.12) 0%, transparent 70%)', pointerEvents:'none', filter:'blur(20px)' }}/>
            <div className="sustain-butterfly-size" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
              <EarthAnim />
            </div>
            {/* Label under butterfly */}
            <div style={{ position:'absolute', bottom:'-1.5rem', left:'50%', transform:'translateX(-50%)', textAlign:'center', whiteSpace:'nowrap' }}>
              <span style={{ fontSize:'0.52rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(0,188,212,0.45)' }}>Our Planet, Our Responsibility</span>
            </div>
          </div>
        </div>

        {/* Bottom: Sustainability image strip
        <div style={{ marginTop:'3.5rem', borderRadius:'1.25rem', overflow:'hidden', position:'relative', height:'clamp(120px,18vw,200px)', opacity:visible?1:0, transition:'opacity 1s ease 0.8s' }}>
          <img src="/images/Sustainability.png" alt="Sustainability" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%', filter:'brightness(0.6) saturate(1.3)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, rgba(2,15,10,0.85) 0%, transparent 40%, transparent 60%, rgba(2,15,10,0.85) 100%)' }}/>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', gap:'clamp(2rem,6vw,5rem)', flexWrap:'wrap', padding:'1rem 3rem' }}>
            {[
              { val:'37+', label:'Years of Responsible\nBusiness' },
              { val:'Rs.1.18Bn', label:'Total CSR\nInvestment 2025' },
              { val:'72%', label:'Education\nFocus' },
              { val:'4', label:'Pillars of\nSustainability' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign:'center', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(12px)', transition:`opacity 0.7s ease ${1+i*0.1}s, transform 0.7s ease ${1+i*0.1}s` }}>
                <p style={{ margin:0, fontSize:'clamp(1.2rem,2.5vw,1.8rem)', fontWeight:900, color:'#fff', letterSpacing:'-0.01em', textShadow:'0 2px 12px rgba(0,0,0,0.5)' }}>{stat.val}</p>
                <p style={{ margin:'0.15rem 0 0', fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(0,188,212,0.75)', whiteSpace:'pre-line', lineHeight:1.35 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  );
}
