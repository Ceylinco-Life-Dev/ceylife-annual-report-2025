'use client';

import React from 'react';
import { useScrollAnimation, slideLeft, slideRight, fadeUp } from '@/hooks/useScrollAnimation';

export default function AboutLegacySection() {
  const aboutAnim = useScrollAnimation({ threshold: 0.15 });
  const legacyAnim = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="about">

      {/* ── Panel 1: About Us ─────────────────────────────────── */}
      <div
        ref={aboutAnim.ref as React.RefObject<HTMLDivElement>}
        style={{
          position: 'relative',
          minHeight: '20vh',
          display: 'flex', alignItems: 'justifyContent: center',
          background: 'linear-gradient(160deg, #FCF4E3 0%, #FFF8F0 50%, #F6EBEA 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div aria-hidden style={{ position:'absolute', top:'-15%', right:'-10%', width:'55vw', height:'55vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(249,161,75,0.1) 0%, transparent 62%)', pointerEvents:'none' }} />
        <div aria-hidden style={{ position:'absolute', bottom:'-15%', left:'-8%', width:'42vw', height:'42vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(159,39,67,0.07) 0%, transparent 62%)', pointerEvents:'none' }} />
        {/* Fine dot grid */}
        <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.5, backgroundImage:'radial-gradient(circle, rgba(159,39,67,0.1) 1px, transparent 1px)', backgroundSize:'36px 36px' }} />

        <div style={{ position:'relative', zIndex:1, width:'100%', padding:'6rem 2rem', maxWidth:'88rem', margin:'0 auto' }}>

          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'4rem 5rem', alignItems:'center' }}>

            {/* Left: All content — label, heading, bar, body text, stats */}
            <div style={slideRight(aboutAnim.isVisible, 100)}>
              <h2 style={{ margin:'0 0 1.25rem', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#0d1f35', lineHeight:1, letterSpacing:'-0.02em', textTransform:'uppercase' }}>
                ABOUT
                <span style={{ background:'linear-gradient(90deg,#9F2743,#F9A14B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}> US</span>
              </h2>
              <p style={{ margin:'0 0 2rem', fontSize:'clamp(0.95rem,1.35vw,1.05rem)', color:'#334155', lineHeight:1.88, fontWeight:400 }}>
                Ceylinco Life Insurance Limited is guided by an enduring North Star — one that has shaped its journey across decades, anchoring growth in trust, protection, and long-term value creation. These guiding principles reflect the Company&apos;s constant commitment to safeguarding lives today, while building resilience and security for generations to come. From its roots in Sri Lanka&apos;s earliest insurance institutions to its position today as the undisputed market leader in life insurance, Ceylinco Life&apos;s evolution is defined by foresight, resilience, and purposeful innovation.
              </p>
            </div>

            {/* Right: Shield image */}
            {/* <div style={{ ...slideRight(aboutAnim.isVisible, 300), display:'flex', justifyContent:'center', alignItems:'center' }}>
              <img
                src="/images/aboutus.png"
                alt="Ceylinco Life Shield"
                style={{
                  width: 'clamp(180px, 20vw, 280px)',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 32px rgba(38,198,218,0.18))',
                  opacity: aboutAnim.isVisible ? 1 : 0,
                  transform: aboutAnim.isVisible ? 'scale(1)' : 'scale(0.88)',
                  transition: 'opacity 0.8s ease 350ms, transform 0.8s ease 350ms',
                }}
              />
            </div> */}
          </div>
        </div>

        {/* Scroll arrow */}
        {/* <div style={{ position:'absolute', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)', ...fadeIn(aboutAnim.isVisible, 600) }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width:'1.5rem', height:'1.5rem', animation:'bounce 2s infinite' }}>
            <path d="M12 5v14M12 19l-5-5M12 19l5-5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div> */}
      </div>

      {/* ── Panel 2: Legacy of Leadership ────────────────────── */}
      <div
        ref={legacyAnim.ref as React.RefObject<HTMLDivElement>}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex', alignItems: 'center',
          background: 'linear-gradient(160deg, #F6EBEA 0%, #FFF8F0 50%, #FCF4E3 85%)',
          overflow: 'hidden',
        }}
      >
        {/* Orbs */}
        <div aria-hidden style={{ position:'absolute', top:'-10%', right:'-5%', width:'48vw', height:'48vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(249,161,75,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div aria-hidden style={{ position:'absolute', bottom:'-10%', left:'-5%', width:'42vw', height:'42vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div aria-hidden style={{ position:'absolute', top:'40%', left:'20%', width:'25vw', height:'25vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(159,39,67,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1, width:'100%', padding:'6rem 2rem', maxWidth:'88rem', margin:'0 auto' }}>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>

            {/* Left: Content */}
            <div style={slideLeft(legacyAnim.isVisible, 100)}>
              <h2 style={{ margin:'0 0 0.2rem', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#0d1f35', lineHeight:0.95, textTransform:'uppercase' }}>
                A LEGACY OF
              </h2>
              <h2 style={{ margin:'0 0 1.75rem',  fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:0.95, textTransform:'uppercase', background:'linear-gradient(90deg,#9F2743,#F9A14B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                LEADERSHIP
              </h2>
              <p style={{ margin:'0 0 2.25rem', fontSize:'clamp(0.88rem,1.2vw,1rem)', color:'#334155', lineHeight:1.88 }}>
                For 37 years, Ceylinco Life Insurance Limited has played a defining role in shaping Sri Lanka&apos;s life insurance industry. What began as a growing life insurance business within a broader insurance institution has evolved into the country&apos;s undisputed market leader — guided by foresight, resilience, and an unwavering commitment to long-term protection.
              </p>

              {/* Stats */}
              <div style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap', ...fadeUp(legacyAnim.isVisible, 400) }}>
                {[{ value:'37+', label:'Years' }, { value:'#1', label:'Market Leader' }, { value:'4M+', label:'Lives Protected' }].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize:'clamp(1.5rem,2.5vw,2rem)', fontWeight:900, color:'#0d1f35', lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#94a3b8', marginTop:'0.25rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Logo card */}
            <div style={{ display:'flex', justifyContent:'flex-end', ...slideRight(legacyAnim.isVisible, 300) }}>
              <div style={{
                background:'#ffffff00',
                borderRadius:'1.5rem',
                padding:'2.75rem',
                width:'clamp(220px, 32vw, 320px)',
                aspectRatio:'4/5',
                boxShadow:'0 8px 48px rgba(38, 197, 218, 0), 0 2px 14px rgba(0,0,0,0.05)',
                border:'1px solid rgba(38, 197, 218, 0)',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1.5rem',
              }}>
                <img
                  src="/images/logo.png"
                  alt="Ceylinco Life"
                  style={{ width:'82%', height:'auto', objectFit:'contain' }}
                />
                <div style={{ textAlign:'center' }}>
                  <div style={{ width:'40px', height:'2px', background:'linear-gradient(90deg,#9F2743,#F9A14B)', margin:'0 auto 0.75rem', borderRadius:'2px' }} />
                  <p style={{ margin:0, fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'#94a3b8' }}>
                    37 Years of Leadership
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Awards & Recognition ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '3.5rem 0 3rem', background: 'linear-gradient(160deg, #FCF4E3 0%, #FFF8F0 50%, #F6EBEA 85%)', borderTop: '1px solid rgba(159,39,67,0.15)', borderBottom: '1px solid rgba(159,39,67,0.15)' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ margin:'0 0 0.2rem', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#0d1f35', lineHeight:0.95, textTransform:'uppercase' }}>
            EXCELLANCE RECOGNISED
          </h2>
          <h2 style={{ margin:'0 0 1.75rem',  fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:0.95, textTransform:'uppercase', background:'linear-gradient(90deg,#9F2743,#F9A14B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            AWARDS
          </h2>
        </div>

        {/* Marquee track */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Left/right fade edges */}
          <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8rem', background: 'linear-gradient(to right, rgba(255,255,255,0.35), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8rem', background: 'linear-gradient(to left, rgba(255,255,255,0.35), transparent)', zIndex: 2, pointerEvents: 'none' }} />

          <div className="awards-marquee" style={{ display: 'flex', gap: '1.5rem', padding: '0.5rem 1.5rem' }}>
            {[...Array(2)].flatMap((_, pass) =>
              [
                { src: '/images/01.jpg',            title: "People's Life Insurance Brand of the Year",   org: 'SLIM Kantar Peoples Awards 2025' },
                { src: '/images/02.jpg',            title: 'Distinguished Recognition',                   org: 'CMA Sri Lanka' },
                { src: '/images/08.jpg',            title: 'Silver – Insurance Companies',                org: 'TAGS Awards 2025' },
                { src: '/images/09.jpg',            title: 'Sustainability Reporting Award',              org: 'ACCA Sri Lanka 2025' },
                { src: '/images/10.jpg',            title: 'Other Financial Services Category Winner',    org: 'ACCA Sri Lanka 2025' },
                { src: '/images/World Finance.jpg', title: 'Best Life Insurance Company',                 org: 'World Finance Insurance Awards 2024' },
              ].map(({ src, title, org }) => (
                <div
                  key={`${pass}-${src}`}
                  style={{
                    flexShrink: 0,
                    width: '200px',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-6px) scale(1.02)';
                    el.style.boxShadow = '0 16px 40px rgba(159,39,67,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0) scale(1)';
                    el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Image + overlay caption */}
                  <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                    <img
                      src={src}
                      alt={title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    {/* Caption gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      padding: '2rem 1rem 1rem',
                      background: 'linear-gradient(to top, rgba(5,13,26,0.82) 0%, transparent 100%)',
                    }}>
                      <p style={{ margin: '0 0 0.2rem', fontSize: '0.72rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>{title}</p>
                      <p style={{ margin: 0, fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9F2743' }}>{org}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
        @media (max-width: 768px) {
          #about .grid-cols-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
