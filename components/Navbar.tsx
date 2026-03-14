'use client';

import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home',           href: '#hero' },
  { label: 'Performance',   href: '#kpi' },
  { label: 'Leadership',    href: '#leadership' },
  { label: 'Milestones',    href: '#milestones' },
  { label: 'True North',    href: '#true-north' },
  { label: 'Our Values',    href: '#compass' },
  { label: 'Sustainability',href: '#sustainability' },
  { label: 'About Us',      href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(href: string) {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  // Color tokens — hero = transparent dark, scrolled = white light
  const linkColor = scrolled ? '#475569' : 'rgba(255,255,255,0.82)';
  const linkActiveColor = scrolled ? '#9F2743' : '#F5A623';
  const linkHoverColor = scrolled ? '#0d1f35' : '#fff';
  const subtitleColor = scrolled ? '#94a3b8' : 'rgba(255,255,255,0.5)';
  const svgStroke = scrolled ? '#475569' : '#fcfcfc';
  const dlBorder = scrolled ? 'rgba(159,39,67,0.4)' : 'rgba(255,255,255,0.5)';
  const dlColor = scrolled ? '#9F2743' : '#e8edee';
  const hamburgerColor = scrolled ? '#334155' : '#fff';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: scrolled ? '0.6rem 2rem' : '1.1rem 2rem',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.28)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(18px) saturate(150%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(150%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(159,39,67,0.15)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
        transition: 'padding 0.35s ease, background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      {/* Logo / Brand */}
      <button
        onClick={() => scrollTo('#hero')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: 0,
        }}
      >
        <img
          src="/images/logo.png"
          alt="Ceylinco Life"
          style={{
            height: scrolled ? '2.4rem' : '2.8rem',
            width: 'auto',
            objectFit: 'contain',
            transition: 'height 0.35s ease, filter 0.35s ease',
            filter: scrolled
              ? 'none'
              : 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
          }}
        />
        <span
          style={{
            color: subtitleColor,
            fontWeight: 500,
            fontSize: 'clamp(0.5rem, 0.72vw, 0.6rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            transition: 'color 0.35s ease',
          }}
        >
          Annual Report 2025
        </span>
      </button>

      {/* Desktop links */}
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1rem, 2.5vw, 2rem)',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
        className="nav-desktop"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem 0',
                  color: isActive ? linkActiveColor : linkColor,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 'clamp(0.65rem, 0.9vw, 0.78rem)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  position: 'relative',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) =>
                  !isActive &&
                  ((e.currentTarget as HTMLButtonElement).style.color = linkHoverColor)
                }
                onMouseLeave={(e) =>
                  !isActive &&
                  ((e.currentTarget as HTMLButtonElement).style.color = linkColor)
                }
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    background: 'linear-gradient(90deg, #9F2743, #F9A14B)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'left',
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Download button */}
      <a
        href="/CLI 3rd Proof.pdf"
        download
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.45rem 1rem',
          borderRadius: '999px',
          border: `1px solid ${dlBorder}`,
          color: dlColor,
          fontWeight: 700,
          fontSize: 'clamp(0.58rem, 0.8vw, 0.7rem)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'background 0.2s, border-color 0.2s, color 0.35s',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(159,39,67,0.08)';
          (e.currentTarget as HTMLAnchorElement).style.borderColor = '#9F2743';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          (e.currentTarget as HTMLAnchorElement).style.borderColor = dlBorder;
        }}
        className="nav-download"
      >
        <svg viewBox="0 0 16 16" fill="none" style={{ width: '0.75rem', height: '0.75rem' }}>
          <path
            d="M8 2v8M8 10l-3-3M8 10l3-3M3 13h10"
            stroke={svgStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download
      </a>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="nav-hamburger"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem',
          flexDirection: 'column',
          gap: '5px',
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              background: hamburgerColor,
              borderRadius: '2px',
              transition: 'transform 0.25s, opacity 0.25s, background 0.35s',
              transform:
                menuOpen && i === 0
                  ? 'rotate(45deg) translate(5px, 5px)'
                  : menuOpen && i === 2
                  ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(5,13,26,0.97)',
            backdropFilter: 'blur(14px)',
            borderBottom: scrolled
              ? '1px solid rgba(159,39,67,0.15)'
              : '1px solid rgba(255,255,255,0.08)',
            padding: '1rem 2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.65rem 0',
                color:
                  activeSection === link.href.replace('#', '')
                    ? '#9F2743'
                    : scrolled ? '#475569' : 'rgba(255,255,255,0.8)',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: scrolled
                  ? '1px solid rgba(0,0,0,0.06)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-download { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
