'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import TrueNorthSection from '@/components/TrueNorthSection';
import GuidingCompassSection from '@/components/GuidingCompassSection';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import KPISection from '@/components/KPISection';
import Navbar from '@/components/Navbar';
// import MarqueeStrip from '@/components/MarqueeStrip';
import LegacyMilestonesSection from '@/components/LegacyMilestonesSection';
import AboutLegacySection from '@/components/AboutLegacySection';
import LeadershipMessagesSection from '@/components/LeadershipMessagesSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import StarCursor from '@/components/StarCursor';
import CompassAIButton from '@/components/CompassAIButton';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (!started) return;
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [started]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <StarCursor />
      {!started && <SplashScreen onStart={() => setStarted(true)} />}

      {/* Navbar — hidden until started */}
      <div
        style={{
          opacity: started ? 1 : 0,
          pointerEvents: started ? 'auto' : 'none',
          transition: 'opacity 0.5s ease 0.4s',
        }}
      >
        <Navbar />
      </div>

      <main
        style={{
          opacity: started ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
          pointerEvents: started ? 'auto' : 'none',
        }}
      >
        <HeroSection />
        <KPISection />
        {/* <MarqueeStrip /> */}
        <LeadershipMessagesSection />
        <LegacyMilestonesSection />
        <TrueNorthSection />
        <GuidingCompassSection />
        <SustainabilitySection />
        <AboutLegacySection />
        <Footer />
      </main>

      {/* Fixed bottom-right action cluster */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.6rem',
          opacity: started ? 1 : 0,
          pointerEvents: started ? 'auto' : 'none',
          transition: 'opacity 0.5s ease 0.8s',
        }}
      >
        {/* Scroll to top — appears after scrolling down */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.25)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: showScrollTop ? 1 : 0,
            transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.85)',
            transition: 'opacity 0.3s ease, transform 0.3s ease, background 0.2s',
            pointerEvents: showScrollTop ? 'auto' : 'none',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'rgba(245,166,35,0.25)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'rgba(255,255,255,0.12)')
          }
        >
          <svg viewBox="0 0 16 16" fill="none" style={{ width: '0.85rem', height: '0.85rem' }}>
            <path
              d="M8 12V4M8 4L4 8M8 4L12 8"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <CompassAIButton />
      </div>
    </>
  );
}
