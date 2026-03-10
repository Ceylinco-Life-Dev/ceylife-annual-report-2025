'use client';

const items = [
  'Guided For Life',
  '★',
  'For Generations',
  '★',
  '37 Years of Leadership',
  '★',
  'Market Leader in Life Insurance',
  '★',
  'Rs. 251.4 Bn Total Assets',
  '★',
  'Rs. 37.1 Bn Gross Written Premium',
  '★',
  'Ceylinco Life Annual Report 2025',
  '★',
  'Trusted · Protected · Resilient',
  '★',
];

// Duplicate for seamless loop
const track = [...items, ...items];

export default function MarqueeStrip() {
  return (
    <div
      style={{
        background: '#F5A623',
        overflow: 'hidden',
        padding: '0.75rem 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          width: 'max-content',
          animation: 'marquee 40s linear infinite',
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              color: item === '★' ? 'rgba(0,0,0,0.35)' : '#000',
              fontWeight: item === '★' ? 400 : 700,
              fontSize: item === '★' ? '0.6rem' : 'clamp(0.65rem, 1vw, 0.78rem)',
              letterSpacing: item === '★' ? '0' : '0.12em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
