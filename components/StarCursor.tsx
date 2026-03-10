'use client';

import { useEffect, useRef } from 'react';

export default function StarCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move, { passive: true });

    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }

        @keyframes starPulseOuter {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.55; }
          50%       { transform: translate(-50%, -50%) scale(1.5); opacity: 0.85; }
        }
        @keyframes starPulseInner {
          0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.8; }
          50%       { transform: translate(-50%, -50%) scale(1.25); opacity: 1;   }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.9; }
          40%       { opacity: 0.4; }
          70%       { opacity: 1;   }
        }
      `}</style>

      {/* Wrapper — positioned by JS transform */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      >
        {/* Outer slow glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(245,220,100,0.18) 40%, transparent 70%)',
            animation: 'starPulseOuter 2.8s ease-in-out infinite',
          }}
        />

        {/* Inner bright core */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(245,210,70,0.6) 35%, transparent 65%)',
            animation: 'starPulseInner 2s ease-in-out infinite',
          }}
        />

        {/* Star spike — horizontal */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '44px',
            height: '1.5px',
            marginTop: '-0.75px',
            marginLeft: '-22px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 70%, transparent 100%)',
            animation: 'starTwinkle 2.4s ease-in-out infinite',
          }}
        />

        {/* Star spike — vertical */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1.5px',
            height: '54px',
            marginLeft: '-0.75px',
            marginTop: '-27px',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.6) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 75%, transparent 100%)',
            animation: 'starTwinkle 2.4s ease-in-out infinite',
          }}
        />

        {/* Star spike — diagonal ↗↙ */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '32px',
            height: '1.2px',
            marginTop: '-0.6px',
            marginLeft: '-16px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,220,100,0.5) 40%, rgba(255,220,100,0.8) 50%, rgba(255,220,100,0.5) 60%, transparent 100%)',
            transform: 'rotate(45deg)',
            animation: 'starTwinkle 3s ease-in-out infinite 0.4s',
          }}
        />

        {/* Star spike — diagonal ↖↘ */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '32px',
            height: '1.2px',
            marginTop: '-0.6px',
            marginLeft: '-16px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,220,100,0.5) 40%, rgba(255,220,100,0.8) 50%, rgba(255,220,100,0.5) 60%, transparent 100%)',
            transform: 'rotate(-45deg)',
            animation: 'starTwinkle 3s ease-in-out infinite 0.4s',
          }}
        />

        {/* Bright center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#fff',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px 2px rgba(255,255,255,0.8), 0 0 12px 4px rgba(245,210,70,0.5)',
          }}
        />
      </div>
    </>
  );
}
