'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ChatbotPopup = dynamic(() => import('./ChatbotPopup'), { ssr: false });

export default function CompassAIButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes compassPulse {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(38,198,218,0.4)) drop-shadow(0 0 12px rgba(38,198,218,0.2)); }
          50%       { filter: drop-shadow(0 0 10px rgba(38,198,218,0.7)) drop-shadow(0 0 22px rgba(38,198,218,0.45)); }
        }
        @keyframes compassSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .compass-btn:hover .compass-img {
          transform: scale(1.08);
          animation: compassSpin 8s linear infinite;
        }
        .compass-btn:active .compass-img {
          transform: scale(0.95);
        }
        .compass-img {
          transition: transform 0.3s ease;
          animation: compassPulse 3s ease-in-out infinite;
        }
      `}</style>

      {open && <ChatbotPopup onClose={() => setOpen(false)} />}

      <button
        className="compass-btn"
        onClick={() => setOpen(v => !v)}
        aria-label="Ask AI"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          padding: 0,
        }}
      >
        <Image
          className="compass-img"
          src="/images/ai.png"
          alt="Compass"
          width={50}
          height={50}
          priority
        />

        <span style={{
          fontSize: '0.46rem',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase',
          fontWeight: 700,
          userSelect: 'none',
        }}>
          ASK&nbsp;AI
        </span>
      </button>
    </>
  );
}