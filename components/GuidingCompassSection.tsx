'use client';

import React from 'react';
import { useScrollAnimation, fadeUp } from '@/hooks/useScrollAnimation';

const prideValues = [
  {
    letter: 'P',
    title: 'PROFESSIONALISM',
    description: 'In delivering life insurance and retirement planning solutions to meet the individual needs of our customers.',
    color: '#26C6DA',
    delay: 0,
  },
  {
    letter: 'R',
    title: 'REWARDING',
    description: 'Our sales force, and staff for their dedication and loyalty in serving our customers.',
    color: '#66BB6A',
    delay: 120,
  },
  {
    letter: 'I',
    title: 'INTEGRITY',
    description: 'In everything we do, individually and collectively, without compromise.',
    color: '#F5A623',
    delay: 240,
  },
  {
    letter: 'D',
    title: 'DEDICATION',
    description: 'In communicating the importance of Life Insurance and Retirement Planning to every Sri Lankan.',
    color: '#CE93D8',
    delay: 360,
  },
  {
    letter: 'E',
    title: 'EXCELLENCE',
    description: 'In customer service, product development, innovation and fulfilling our social responsibility.',
    color: '#FF7043',
    delay: 480,
  },
];

export default function GuidingCompassSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="compass"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #FCF4E3 0%, #FFF8F0 50%, #F6EBEA 100%)',
        overflow: 'hidden',
        padding: '7rem 0 8rem',
      }}
    >
      {/* Compass watermark */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'url(/images/pride.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        opacity: 0.50,
        mixBlendMode: 'multiply',
      }} />
      {/* Pastel overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(160deg, rgba(252,244,227,0.82) 0%, rgba(255,248,240,0.82) 50%, rgba(246,235,234,0.82) 100%)',
      }} />
      {/* Subtle tinted blobs */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(249,161,75,0.1) 0%, transparent 65%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 50% 65% at 0% 85%, rgba(159,39,67,0.07) 0%, transparent 60%)' }} />
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 45% 55% at 100% 85%, rgba(245,166,35,0.06) 0%, transparent 60%)' }} />

      <div style={{ position:'relative', zIndex:1, maxWidth:'88rem', margin:'0 auto', padding:'0 2rem' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'3rem', ...fadeUp(isVisible, 0) }}>
          <p style={{ margin:'0 0 0.6rem', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'#9F2743' }}>
            Core Values
          </p>
          <h2 style={{ margin:'0 0 0.75rem', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#0d1f35', lineHeight:1.1 }}>
            OUR GUIDING{' '}
            <span style={{ background:'linear-gradient(90deg,#9F2743,#F9A14B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              COMPASS
            </span>
          </h2>
          <p style={{ margin:'0 auto', maxWidth:'34rem', fontSize:'clamp(0.85rem,1.1vw,0.95rem)', color:'#64748b', lineHeight:1.75 }}>
            The PRIDE values that drive every action and decision at Ceylinco Life.
          </p>
        </div>

        {/* PRIDE connector banner */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'3rem', ...fadeUp(isVisible, 80) }}>
          {prideValues.map((v, i) => (
            <React.Fragment key={v.letter}>
              <div style={{
                width:'46px', height:'46px', borderRadius:'50%',
                background:`${v.color}14`, border:`2px solid ${v.color}45`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.3rem', fontWeight:900, color:v.color,
                boxShadow:`0 2px 12px ${v.color}20`,
              }}>
                {v.letter}
              </div>
              {i < prideValues.length - 1 && (
                <div style={{ width:'28px', height:'2px', background:`linear-gradient(90deg, ${v.color}50, ${prideValues[i+1].color}50)` }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Value cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(175px, 1fr))', gap:'1.25rem' }}>
          {prideValues.map((value) => (
            <div
              key={value.letter}
              style={{
                background:'#ffffff',
                borderRadius:'1.25rem',
                padding:'2.25rem 1.5rem',
                textAlign:'center',
                boxShadow:`0 2px 20px rgba(0,0,0,0.05), 0 0 0 1px ${value.color}18`,
                borderBottom:`3px solid ${value.color}`,
                display:'flex', flexDirection:'column', alignItems:'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${value.delay}ms, transform 0.7s ease ${value.delay}ms`,
              }}
            >
              {/* Letter disc */}
              <div style={{
                width:'68px', height:'68px', borderRadius:'50%',
                background:`${value.color}10`,
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'1.1rem',
                boxShadow:`0 0 0 8px ${value.color}07`,
              }}>
                <span style={{ fontSize:'2.3rem', fontWeight:900, color:value.color, lineHeight:1 }}>
                  {value.letter}
                </span>
              </div>

              <p style={{ margin:'0 0 0.7rem', fontSize:'0.6rem', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase', color:value.color }}>
                {value.title}
              </p>
              <p style={{ margin:0, fontSize:'clamp(0.72rem,0.92vw,0.8rem)', color:'#64748b', lineHeight:1.72 }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
