'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ChatbotPopup = dynamic(() => import('./ChatbotPopup'), { ssr: false });

export default function CompassAIButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes compassSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes compassPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(38,198,218,0.4), 0 0 22px rgba(38,198,218,0.3), 0 6px 20px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 0 3px rgba(38,198,218,0.7), 0 0 36px rgba(38,198,218,0.55), 0 6px 20px rgba(0,0,0,0.4); }
        }
        .compass-btn:hover .compass-face { transform: scale(1.08); }
        .compass-btn:active .compass-face { transform: scale(0.95); }
        .compass-btn:hover .compass-ring { animation-duration: 4s !important; }
      `}</style>

      {open && <ChatbotPopup onClose={() => setOpen(false)} />}

      <button
        className="compass-btn"
        onClick={() => setOpen(v => !v)}
        aria-label="Ask AI"
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', padding: 0 }}
      >
        {/* Compass face */}
        <div
          className="compass-face"
          style={{
            position: 'relative',
            width: '3.4rem',
            height: '3.4rem',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, #1a2e4a 0%, #0a1628 60%, #060e1c 100%)',
            animation: 'compassPulse 3s ease-in-out infinite',
            transition: 'transform 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Outer tick ring — slow spin */}
          <svg
            className="compass-ring"
            width="54" height="54" viewBox="0 0 54 54"
            style={{
              position: 'absolute',
              inset: 0,
              animation: 'compassSpin 12s linear infinite',
              opacity: 0.55,
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const r1 = 24, r2 = i % 4 === 0 ? 20 : 22;
              const cx = 27, cy = 27;
              return (
                <line
                  key={i}
                  x1={cx + r1 * Math.sin(rad)}
                  y1={cy - r1 * Math.cos(rad)}
                  x2={cx + r2 * Math.sin(rad)}
                  y2={cy - r2 * Math.cos(rad)}
                  stroke={i % 4 === 0 ? '#26C6DA' : 'rgba(255,255,255,0.4)'}
                  strokeWidth={i % 4 === 0 ? 1.8 : 1}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Compass rose SVG */}
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            {/* N needle — teal */}
            <polygon points="16,3 13.5,16 16,14 18.5,16" fill="#26C6DA" opacity="0.95" />
            {/* S needle — white/silver */}
            <polygon points="16,29 13.5,16 16,18 18.5,16" fill="rgba(255,255,255,0.55)" />
            {/* E needle — thin */}
            <polygon points="29,16 16,13.5 18,16 16,18.5" fill="rgba(255,255,255,0.35)" />
            {/* W needle */}
            <polygon points="3,16 16,13.5 14,16 16,18.5" fill="rgba(255,255,255,0.35)" />
            {/* Centre dot */}
            <circle cx="16" cy="16" r="2.2" fill="#26C6DA" opacity="0.9" />
            <circle cx="16" cy="16" r="1" fill="#fff" opacity="0.8" />
          </svg>

          {/* Rim highlight */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%)',
            pointerEvents: 'none',
          }} />
        </div>

        <span style={{ fontSize: '0.46rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: 700, userSelect: 'none' }}>
          ASK&nbsp;AI
        </span>
      </button>
    </>
  );
}
