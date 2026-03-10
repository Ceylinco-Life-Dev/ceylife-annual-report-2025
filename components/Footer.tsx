'use client';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Key Performance Indicators', href: '#kpi' },
  { label: 'Our True North', href: '#true-north' },
  { label: 'Our Guiding Compass', href: '#compass' },
  { label: '37 Years of Trust', href: '#milestones' },
  { label: 'About Us', href: '#about' },
  { label: 'Sustainability', href: '#sustainability' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/CeylincoLifeInsurance',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ceylinco-life-insurance',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@CeylincoLife',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ceylincolife',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

// Light theme colors inspired by ceylincolife.com
const BRAND_BURGUNDY   = '#7A192A';
const BRAND_BLUE       = '#003087';     // deep corporate blue
const FOOTER_BG        = '#f8fafc';     // very light cool gray-blue
const FOOTER_BOTTOM    = '#f1f5f9';     // slightly darker light gray-blue
const TEXT_DARK        = '#0f172a';     // near-black for headings
const TEXT_PRIMARY     = '#1e293b';     // main text
const TEXT_SECONDARY   = '#475569';     // links / secondary text
const BORDER_LIGHT     = '#e2e8f0';

export default function Footer() {
  function scrollTo(href: string) {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer style={{ 
      background: FOOTER_BG, 
      color: TEXT_PRIMARY,
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Thin accent line at top */}
      <div style={{ 
        height: '4px', 
        background: `linear-gradient(90deg, ${BRAND_BURGUNDY}, ${BRAND_BLUE})` 
      }} />

      <div style={{ 
        maxWidth: '90rem', 
        margin: '0 auto', 
        padding: '4rem 2rem 2.5rem' 
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3.5rem',
          }}
        >

          {/* Brand / About Column */}
          <div>
            <img
              src="/images/logo.png"
              alt="Ceylinco Life"
              style={{ 
                height: '3.5rem', 
                width: 'auto', 
                objectFit: 'contain', 
                marginBottom: '1.5rem' 
              }}
            />

            <p
              style={{
                color: TEXT_PRIMARY,
                fontSize: '0.92rem',
                lineHeight: 1.7,
                marginBottom: '1.75rem',
                maxWidth: '340px',
              }}
            >
              Guided by an enduring North Star, Ceylinco Life Insurance Limited
              remains Sri Lanka's undisputed leader in life insurance —
              committed to protecting lives and securing futures for generations
              to come.
            </p>

            {/* Annual Report badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                borderRadius: '999px',
                background: `${BRAND_BURGUNDY}12`,
                border: `1px solid ${BRAND_BURGUNDY}30`,
                color: BRAND_BURGUNDY,
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: BRAND_BURGUNDY,
                  flexShrink: 0,
                }}
              />
              Integrated Annual Report 2025
            </div>

            {/* Regulatory note */}
            <p
              style={{
                color: TEXT_SECONDARY,
                fontSize: '0.78rem',
                lineHeight: 1.6,
                marginBottom: '1.75rem',
              }}
            >
              Licensed by the Insurance Regulatory<br />Commission of Sri Lanka
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.9rem' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: `1px solid ${BORDER_LIGHT}`,
                    color: TEXT_SECONDARY,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = BRAND_BURGUNDY;
                    el.style.color = 'white';
                    el.style.borderColor = BRAND_BURGUNDY;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'transparent';
                    el.style.color = TEXT_SECONDARY;
                    el.style.borderColor = BORDER_LIGHT;
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: TEXT_DARK,
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                paddingBottom: '0.7rem',
                borderBottom: `1px solid ${BORDER_LIGHT}`,
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.5rem 0',
                      cursor: 'pointer',
                      color: TEXT_SECONDARY,
                      fontSize: '0.92rem',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = BRAND_BURGUNDY;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = TEXT_SECONDARY;
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: BRAND_BURGUNDY,
                        flexShrink: 0,
                      }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4
              style={{
                color: TEXT_DARK,
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                paddingBottom: '0.7rem',
                borderBottom: `1px solid ${BORDER_LIGHT}`,
              }}
            >
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                {
                  icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
                  text: 'Ceylinco Life Tower, 115, Sir Chittampalam A. Gardiner Mawatha, Colombo 02, Sri Lanka',
                  href: null,
                },
                {
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                  text: '(011) 2461461',
                  href: 'tel:+94112461461',
                },
                {
                  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                  text: 'info@ceylincolife.com',
                  href: 'mailto:info@ceylincolife.com',
                },
                {
                  icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9',
                  text: 'www.ceylincolife.com',
                  href: 'https://www.ceylincolife.com',
                },
              ].map(({ icon, text, href }) => (
                <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={BRAND_BLUE}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0, marginTop: '0.15rem' }}
                  >
                    <path d={icon} />
                  </svg>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        color: TEXT_SECONDARY,
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = BRAND_BURGUNDY; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_SECONDARY; }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ 
                      color: TEXT_SECONDARY, 
                      fontSize: '0.92rem', 
                      lineHeight: 1.6 
                    }}>
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: BORDER_LIGHT }} />

      {/* Bottom bar */}
      <div
        style={{
          background: FOOTER_BOTTOM,
          padding: '1.3rem 2rem',
          maxWidth: '90rem',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: TEXT_SECONDARY,
        }}
      >
        <p style={{ margin: 0 }}>
          © 2025 Ceylinco Life Insurance Limited. All Rights Reserved.
        </p>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Customer Charter'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: TEXT_SECONDARY,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = BRAND_BURGUNDY; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_SECONDARY; }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}