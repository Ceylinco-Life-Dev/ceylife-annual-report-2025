'use client';

const quickLinks = [
  { label: 'Home',                        href: '#hero' },
  { label: 'Key Performance Indicators',  href: '#kpi' },
  { label: 'Our True North',              href: '#true-north' },
  { label: 'Our Guiding Compass',         href: '#compass' },
  { label: '37 Years of Trust & Legacy',   href: '#milestones' },
  { label: 'About Us',                    href: '#about' },
  { label: 'Sustainability',              href: '#sustainability' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/CeylincoLifeInsurance',
    icon: (
      <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ceylinco-life-insurance',
    icon: (
      <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@CeylincoLife',
    icon: (
      <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ceylincolife',
    icon: (
      <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const contactItems = [
  {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    text: 'Ceylinco Life Insurance Limited, 106 Havelock Rd, Colombo 00500',
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
];

export default function Footer() {
  function scrollTo(href: string) {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #FCF4E3 0%, #FFF8F0 50%, #F6EBEA 100%)' }}>

      {/* ── Soft pastel blobs ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 88% 10%, rgba(249,161,75,0.1) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 50% at 5% 55%, rgba(159,39,67,0.07) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 38% 35% at 18% 8%, rgba(126,87,194,0.07) 0%, transparent 58%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 28% at 50% 100%, rgba(245,166,35,0.08) 0%, transparent 65%)' }} />
      </div>

      {/* ── Top accent line ── */}
      <div style={{ position: 'relative', height: '3px', background: 'linear-gradient(90deg, transparent, #9F2743, #F9A14B, #F4D98E, #F9A14B, #9F2743, transparent)' }} />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '90rem', margin: '0 auto', padding: '4.5rem 2rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3.5rem',
        }}>

          {/* ── Brand column ── */}
          <div>
            <img
              src="/images/logo.png"
              alt="Ceylinco Life"
              style={{ height: '4rem', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }}
            />

            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: '320px' }}>
              Guided by an enduring North Star, Ceylinco Life Insurance Limited
              remains Sri Lanka's undisputed leader in life insurance —
              committed to protecting lives and securing futures for generations to come.
            </p>

            {/* Annual Report badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              background: 'rgba(159,39,67,0.08)',
              border: '1px solid rgba(159,39,67,0.35)',
              color: '#9F2743',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9F2743', flexShrink: 0, boxShadow: '0 0 8px rgba(159,39,67,0.6)' }} />
              Integrated Annual Report 2025
            </div>

            {/* Regulatory */}
            <p style={{ color: '#94a3b8', fontSize: '0.76rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Licensed by the Insurance Regulatory<br />Commission of Sri Lanka
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '2.2rem',
                    height: '2.2rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(159,39,67,0.22)',
                    color: '#64748b',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(159,39,67,0.1)';
                    el.style.borderColor = 'rgba(159,39,67,0.5)';
                    el.style.color = '#9F2743';
                    el.style.boxShadow = '0 0 12px rgba(159,39,67,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = 'rgba(255,255,255,0.75)';
                    el.style.borderColor = 'rgba(159,39,67,0.22)';
                    el.style.color = '#64748b';
                    el.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 style={{
              margin: '0 0 1.4rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c47d0a',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(159,39,67,0.2)',
            }}>
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
                      padding: '0.48rem 0',
                      cursor: 'pointer',
                      color: '#475569',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s, padding-left 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#9F2743';
                      e.currentTarget.style.paddingLeft = '4px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 style={{
              margin: '0 0 1.4rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c47d0a',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(159,39,67,0.2)',
            }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {contactItems.map(({ icon, text, href }) => (
                <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9F2743"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '1rem', height: '1rem', flexShrink: 0, marginTop: '0.2rem' }}
                  >
                    <path d={icon} />
                  </svg>
                  {href ? (
                    <a
                      href={href}
                      style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#9F2743'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── 2025 Highlights ── */}
          <div>
            <h4 style={{
              margin: '0 0 1.4rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c47d0a',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(159,39,67,0.2)',
            }}>
              2025 Highlights
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { value: 'Rs. 287 Bn',  label: 'Total Assets' },
                { value: '22nd Year',   label: 'Market Leadership' },
                { value: 'Rs. 44.2 Bn',label: 'Gross Written Premium' },
                { value: 'Rs. 1.18 Bn',label: 'CSR Investment' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.8rem 1rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(159,39,67,0.18)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ width: '3px', height: '2.2rem', borderRadius: '2px', background: 'linear-gradient(to bottom, #9F2743, #F9A14B)', flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', fontWeight: 900, color: '#c47d0a', lineHeight: 1.2 }}>{value}</p>
                    <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginTop: '0.2rem' }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      

      {/* ── Bottom bar ── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.4)',
        padding: '1.2rem 2rem',
        maxWidth: '90rem',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        fontSize: '0.78rem',
        color: '#94a3b8',
      }}>
        <p style={{ margin: 0 }}>
          © 2025 Ceylinco Life Insurance Limited. All Rights Reserved.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Customer Charter'].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#9F2743'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .awards-marquee {
          animation: marquee-scroll 28s linear infinite;
          width: max-content;
        }
        .awards-marquee:hover {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          footer > div:nth-child(3) > div {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
