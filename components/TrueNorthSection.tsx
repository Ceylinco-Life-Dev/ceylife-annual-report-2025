'use client';

import React from 'react';
import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';

const pillars = [
  {
    num: '01',
    accent: '#d39145',
    label: 'Vision',
    title: 'OUR GUIDING STAR',
    text: 'To take the message of life insurance and retirement planning to every Sri Lankan and provide protection to every family.',
    delay: 0,
  },
  {
    num: '02',
    accent: '#94531d',
    label: 'Mission',
    title: 'OUR PATH FORWARD',
    text: 'To become the most trusted, acclaimed and progressive life insurance company in Sri Lanka, by providing need-based life insurance solutions to our customers, recognising and rewarding our employees, creating successful partnerships with stakeholders and ensuring sustainable business practices for responsible and profitable growth.',
    delay: 160,
  },
  {
    num: '03',
    accent: '#c9c90e',
    label: 'Purpose',
    title: 'OUR TRUE NORTH',
    text: 'The enduring compass that shapes every decision — from product innovation to community investment — anchoring our journey toward a future where every Sri Lankan family is protected and secure.',
    delay: 320,
  },
];

export default function TrueNorthSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="true-north"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #f0f8ff 0%, #f5fff5 55%, #fffbf0 100%)',
        overflow: 'hidden',
        padding: '7rem 0 8rem',
      }}
    >
       {/* Compass watermark */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'url(/images/north.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        opacity: 0.15,
        mixBlendMode: 'multiply',
      }} />
      
      {/* Decorative soft orbs */}
      <div aria-hidden style={{ position:'absolute', top:'-12%', left:'-8%', width:'55vw', height:'55vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(38,198,218,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div aria-hidden style={{ position:'absolute', bottom:'-10%', right:'-6%', width:'42vw', height:'42vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(102,187,106,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div aria-hidden style={{ position:'absolute', top:'25%', right:'8%', width:'28vw', height:'28vw', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />

      {/* Fine dot grid */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.45, backgroundImage:'radial-gradient(circle, rgba(38,198,218,0.18) 1px, transparent 1px)', backgroundSize:'34px 34px' }} />

      <div style={{ position:'relative', zIndex:1, maxWidth:'88rem', margin:'0 auto', padding:'0 2rem' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'4rem', ...fadeUp(isVisible, 0) }}>
          <p style={{ margin:'0 0 0.6rem', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.32em', textTransform:'uppercase', color:'#26C6DA' }}>
            Principles &amp; Purpose
          </p>
          <h2 style={{ margin:'0 0 0.9rem', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#0d1f35', lineHeight:1.1, letterSpacing:'-0.01em' }}>
            OUR TRUE{' '}
            <span style={{ background:'linear-gradient(90deg,#26C6DA,#66BB6A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>NORTH</span>
          </h2>
          <p style={{ margin:'0 auto', maxWidth:'36rem', fontSize:'clamp(0.88rem,1.2vw,1rem)', color:'#64748b', lineHeight:1.75 }}>
            The enduring principles that shape our vision, guide our mission, and anchor our values across every touchpoint.
          </p>
        </div>

        {/* Pillar cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.75rem' }}>
          {pillars.map((p) => (
            <div
              key={p.num}
              style={{
                background:'#ffffff50',
                borderRadius:'1.5rem',
                padding:'2.5rem 2rem 2.75rem',
                boxShadow:`0 2px 24px rgba(0,0,0,0.055), inset 0 0 0 1px ${p.accent}1a`,
                borderTop:`3px solid ${p.accent}`,
                position:'relative', overflow:'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.7s ease ${p.delay}ms, transform 0.7s ease ${p.delay}ms`,
              }}
            >
              {/* Watermark number */}
              <span aria-hidden style={{ position:'absolute', bottom:'-0.9rem', right:'1.2rem', fontSize:'6rem', fontWeight:900, lineHeight:1, color:`${p.accent}09`, userSelect:'none', pointerEvents:'none' }}>
                {p.num}
              </span>

              {/* Icon disc */}
              <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:`${p.accent}12`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.5rem', boxShadow:`0 0 0 7px ${p.accent}06` }}>
                <div style={{ width:'22px', height:'22px', borderRadius:'50%', background:`linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`, boxShadow:`0 2px 8px ${p.accent}55` }} />
              </div>

              <p style={{ margin:'0 0 0.4rem', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.26em', textTransform:'uppercase', color:p.accent }}>
                {p.label}
              </p>
              <h3 style={{ margin:'0 0 1rem', fontSize:'clamp(0.85rem,1.2vw,0.95rem)', fontWeight:900, color:'#0d1f35', letterSpacing:'0.06em', textTransform:'uppercase', lineHeight:1.35 }}>
                {p.title}
              </h3>
              <p style={{ margin:0, fontSize:'clamp(0.83rem,1.05vw,0.92rem)', color:'#475569', lineHeight:1.82 }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
