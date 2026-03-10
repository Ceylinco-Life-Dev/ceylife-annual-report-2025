'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ChatbotPopup = dynamic(() => import('./ChatbotPopup'), { ssr: false });

/* ─── Siri-style animated orb ───────────────────────────────── */
function SiriOrb({ open }: { open: boolean }) {
  return (
    <div style={{
      position: 'relative',
      width: '3.6rem',
      height: '3.6rem',
      borderRadius: '50%',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: open
        ? '0 0 0 3px rgba(255,255,255,0.5), 0 0 40px rgba(38,198,218,0.7), 0 8px 32px rgba(0,0,0,0.3)'
        : '0 0 0 2px rgba(255,255,255,0.2), 0 0 28px rgba(38,198,218,0.4), 0 6px 20px rgba(0,0,0,0.25)',
      transition: 'box-shadow 0.4s ease',
    }}>
      {/* Dark base */}
      <div style={{ position: 'absolute', inset: 0, background: '#0a0f1e' }} />

      {/* Blob 1 – teal/cyan, rotates forward */}
      <div style={{
        position: 'absolute',
        width: '130%', height: '130%',
        top: '-15%', left: '-15%',
        background: 'conic-gradient(from 0deg at 38% 42%, #26C6DA 0deg, transparent 110deg, #66BB6A 200deg, transparent 310deg)',
        animation: `siriB1 ${open ? '1.8s' : '4s'} linear infinite`,
        opacity: 0.85,
        filter: 'blur(2px)',
      }} />

      {/* Blob 2 – warm gold/purple, rotates reverse */}
      <div style={{
        position: 'absolute',
        width: '130%', height: '130%',
        top: '-15%', left: '-15%',
        background: 'conic-gradient(from 60deg at 62% 58%, #F5A623 0deg, transparent 100deg, #CE93D8 210deg, transparent 330deg)',
        animation: `siriB2 ${open ? '2.2s' : '5.5s'} linear infinite reverse`,
        opacity: 0.7,
        filter: 'blur(3px)',
      }} />

      {/* Blob 3 – blue accent */}
      <div style={{
        position: 'absolute',
        width: '110%', height: '110%',
        top: '-5%', left: '-5%',
        background: 'conic-gradient(from 180deg at 50% 30%, #4FC3F7 0deg, transparent 140deg, #26C6DA 260deg, transparent 360deg)',
        animation: `siriB3 ${open ? '3s' : '7s'} linear infinite`,
        opacity: 0.55,
        filter: 'blur(4px)',
      }} />

      {/* Radial white glow pulse */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.28) 0%, transparent 60%)',
        animation: `siriGlow ${open ? '1.4s' : '3s'} ease-in-out infinite`,
      }} />

      {/* Frosted overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.06)' }} />

      {/* Mic icon center */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open
            ? <> {/* X when open */}
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </>
            : <> {/* Mic when closed */}
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="rgba(255,255,255,0.2)"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </>
          }
        </svg>
      </div>
    </div>
  );
}

export default function CompassAIButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes siriB1  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes siriB2  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes siriB3  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes siriGlow {
          0%,100% { opacity:0.6; transform:scale(0.9); }
          50%      { opacity:1;   transform:scale(1.1); }
        }
        .siri-btn:hover .siri-orb-wrap { transform: scale(1.08); }
        .siri-btn:active .siri-orb-wrap { transform: scale(0.95); }
      `}</style>

      {/* Full-screen chatbot popup */}
      {open && <ChatbotPopup onClose={() => setOpen(false)} />}

      <button
        className="siri-btn"
        onClick={() => setOpen(v => !v)}
        aria-label="Ask AI"
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', padding: 0 }}
      >
        <div className="siri-orb-wrap" style={{ transition: 'transform 0.2s ease' }}>
          <SiriOrb open={open} />
        </div>
        <span style={{ fontSize: '0.48rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', fontWeight: 700, userSelect: 'none' }}>
          ASK&nbsp;AI
        </span>
      </button>
    </>
  );
}
