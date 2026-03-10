'use client';

import { useEffect, useRef, useState } from 'react';

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [textVisible, setTextVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setTextVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  function handleStart() {
    setExiting(true);
    setTimeout(onStart, 900);
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Background video — centred + covers full viewport */}
      <video
        ref={videoRef}
        src="/videos/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100vw',
          minHeight: '100vh',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Content — everything in one flex column that fits 100vh */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2vh 2rem',
          textAlign: 'center',
          gap: 0,
        }}
      >

        {/* ── Star glow behind logo ── */}
        <div
          aria-hidden
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5vh',
          }}
        >
          {/* Outer slow pulse */}
          <div
            style={{
              position: 'absolute',
              width: '18vh',
              height: '18vh',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(245,220,120,0.12) 40%, transparent 70%)',
              animation: 'starOuter 3s ease-in-out infinite',
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          />
          {/* Inner bright core */}
          <div
            style={{
              position: 'absolute',
              width: '10vh',
              height: '10vh',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(245,210,80,0.35) 35%, transparent 65%)',
              animation: 'starInner 2s ease-in-out infinite',
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 200ms',
            }}
          />
          {/* Light beam going up */}
          <div
            style={{
              position: 'absolute',
              bottom: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '22vh',
              background:
                'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.9) 100%)',
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 1s ease 400ms',
            }}
          />
          {/* Light beam going down */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '8vh',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 1s ease 400ms',
            }}
          />

          {/* Logo on top of glow */}
          <img
            src="/images/logo.png"
            alt="Ceylinco Life"
            style={{
              position: 'relative',
              zIndex: 1,
              height: 'clamp(4rem, 10vh, 7rem)',
              width: 'auto',
              objectFit: 'contain',
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.9)',
              transition: 'opacity 0.9s ease 0ms, transform 0.9s ease 0ms',
              filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.4)) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
            }}
          />
        </div>

        {/* GUIDED */}
        <h1
          style={{
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: 'clamp(4rem, 13vh, 10rem)',
            color: '#F5A623',
            textShadow: '0 4px 40px rgba(0,0,0,0.4)',
            margin: 0,
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease 150ms, transform 0.8s ease 150ms',
          }}
        >
          GUIDED
        </h1>

        {/* For Life / For Generations */}
        <div style={{ marginTop: '0.4vh' }}>
          {['For Life', 'For Generations'].map((line, i) => (
            <p
              key={line}
              style={{
                color: '#fff',
                fontWeight: 700,
                lineHeight: 1.15,
                margin: 0,
                fontSize: 'clamp(1.6rem, 4.5vh, 3.2rem)',
                textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ease ${180 + i * 150}ms, transform 0.8s ease ${180 + i * 150}ms`,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            marginTop: '1.8vh',
            height: '1px',
            background: 'rgba(255,255,255,0.35)',
            width: textVisible ? '160px' : '0px',
            transition: 'width 0.8s ease 500ms',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            marginTop: '1.2vh',
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 600ms, transform 0.7s ease 600ms',
          }}
        >
          <p
            style={{
              color: '#F5A623',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontSize: 'clamp(0.7rem, 1.6vh, 1rem)',
              margin: 0,
            }}
          >
            Ceylinco Life Insurance Limited
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontSize: 'clamp(0.65rem, 1.3vh, 0.88rem)',
              marginTop: '0.3rem',
            }}
          >
            Integrated Annual Report 2025
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          style={{
            marginTop: '2.5vh',
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
            transition:
              'opacity 0.7s ease 800ms, transform 0.7s ease 800ms, background 0.25s, box-shadow 0.25s',
            background: 'rgba(245,166,35,0.15)',
            border: '1.5px solid rgba(245,166,35,0.7)',
            color: '#F5A623',
            fontWeight: 700,
            fontSize: 'clamp(0.75rem, 1.4vh, 0.95rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            padding: 'clamp(0.55rem, 1.2vh, 0.85rem) 2.5rem',
            borderRadius: '999px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 0 30px rgba(245,166,35,0.15)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(245,166,35,0.3)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(245,166,35,0.35)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(245,166,35,0.15)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(245,166,35,0.15)';
          }}
        >
          Start
        </button>
      </div>

      <style>{`
        @keyframes starOuter {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%       { transform: scale(1.4); opacity: 1;   }
        }
        @keyframes starInner {
          0%, 100% { transform: scale(1);   opacity: 0.8; }
          50%       { transform: scale(1.25); opacity: 1;  }
        }
      `}</style>
    </div>
  );
}
