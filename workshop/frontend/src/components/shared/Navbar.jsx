import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Phone, ChevronDown } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const navLinks = [
  { path: '/', label: 'Beranda' },
  { path: '/about', label: 'Tentang' },
  { path: '/services', label: 'Layanan', children: [
    { path: '/services#servis-berkala', label: 'Servis Berkala' },
    { path: '/services#ganti-oli', label: 'Ganti Oli & Filter' },
    { path: '/services#tune-up', label: 'Tune Up' },
    { path: '/services#sparepart', label: 'Sparepart Original' },
    { path: '/services#aksesoris', label: 'Aksesoris' },
    { path: '/services#poles-body', label: 'Poles & Coating' },
  ]},
  { path: '/careers', label: 'Karir' },
  { path: '/gallery', label: 'Galeri' },
  { path: '/testimonials', label: 'Testimoni' },
  { path: '/contact', label: 'Kontak' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownMobile, setDropdownMobile] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const onDarkHero = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setDropdownMobile(false);
    navRef.current?.focus();
  }, [location]);

  const headerBg = scrolled
    ? (onDarkHero ? 'rgba(15, 15, 35, 0.95)' : 'rgba(255, 255, 255, 0.95)')
    : 'transparent';
  const headerText = !scrolled && onDarkHero ? '#ffffff' : '#111827';
  const headerTextMuted = !scrolled && onDarkHero ? 'rgba(255,255,255,0.85)' : '#6b7280';

  return (
    <>
      <header
        ref={navRef}
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--header-height)',
          backgroundColor: headerBg,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(229,231,235,0.5)' : '1px solid transparent',
          zIndex: 'var(--z-fixed)',
          transition: 'all var(--transition-base)',
        }}
      >
        <nav className="container" style={{
          maxWidth: 'var(--container-xl)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--spacing-md)',
        }}>
          <Link to="/" className="navbar-brand" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--font-size-lg)',
            color: headerText,
            textDecoration: 'none',
            flexShrink: 0,
            letterSpacing: '-0.02em',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #facc15)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Megabuana Motor</span>
          </Link>

          <div className="navbar-links desktop-only" style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            background: !scrolled && onDarkHero ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)',
            backdropFilter: 'blur(10px)',
            padding: 'var(--spacing-xs)',
            borderRadius: 'var(--border-radius-full)',
            border: !scrolled && onDarkHero ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.06)',
          }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
              if (link.children) {
                return (
                  <div
                    key={link.path}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    style={{ position: 'relative' }}
                  >
                    <Link
                      to={link.path}
                      style={{
                        color: isActive ? '#f97316' : headerText,
                        background: isActive ? 'rgba(249,115,22,0.1)' : 'transparent',
                        fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                        fontSize: 'var(--font-size-sm)',
                        transition: 'all var(--transition-fast)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                        borderRadius: 'var(--border-radius-full)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#f97316';
                          e.currentTarget.style.background = 'rgba(249,115,22,0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = headerText;
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14} strokeWidth={2} />
                    </Link>
                    {dropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: 8,
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: 'var(--border-radius-lg)',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                        minWidth: 220,
                        padding: 'var(--spacing-sm) 0',
                        zIndex: 1000,
                      }}>
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            style={{
                              display: 'block',
                              padding: 'var(--spacing-sm) var(--spacing-lg)',
                              color: '#374151',
                              fontSize: 'var(--font-size-sm)',
                              textDecoration: 'none',
                              transition: 'all var(--transition-fast)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#fff7ed';
                              e.currentTarget.style.color = '#f97316';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#374151';
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: isActive ? '#f97316' : headerText,
                    background: isActive ? 'rgba(249,115,22,0.1)' : 'transparent',
                    fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'all var(--transition-fast)',
                    textDecoration: 'none',
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    borderRadius: 'var(--border-radius-full)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#f97316';
                      e.currentTarget.style.background = 'rgba(249,115,22,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = headerText;
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="navbar-actions" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            flexShrink: 0,
          }}>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="desktop-only"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: '#f97316',
                color: 'white',
                borderRadius: 'var(--border-radius-full)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-sm)',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ea580c';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f97316';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              <span>WhatsApp</span>
            </a>
            <Link
              to="/admin/login"
              className="desktop-only admin-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                backgroundColor: '#1f2937',
                color: 'white',
                borderRadius: 'var(--border-radius-full)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-xs)',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1f2937';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ADMIN
            </Link>
            <button
              className="mobile-menu-btn mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 'var(--border-radius-full)',
                backgroundColor: !scrolled && onDarkHero ? 'rgba(255,255,255,0.1)' : 'var(--color-surface)',
                border: !scrolled && onDarkHero ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--color-border)',
                color: !scrolled && onDarkHero ? '#ffffff' : 'var(--color-text)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f97316';
                e.currentTarget.style.borderColor = '#f97316';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = !scrolled && onDarkHero ? 'rgba(255,255,255,0.1)' : 'var(--color-surface)';
                e.currentTarget.style.borderColor = !scrolled && onDarkHero ? 'rgba(255,255,255,0.2)' : 'var(--color-border)';
                e.currentTarget.style.color = !scrolled && onDarkHero ? '#ffffff' : 'var(--color-text)';
              }}
            >
              {mobileOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 'calc(var(--z-fixed) - 1)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div className="mobile-menu" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            maxWidth: 320,
            height: '100%',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--spacing-xl)',
            animation: 'slideInLeft 0.3s ease',
            overflowY: 'auto',
          }}>
            <div style={{ marginBottom: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-lg)', borderBottom: '1px solid #e5e7eb' }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                if (link.children) {
                  return (
                    <div key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setDropdownMobile(!dropdownMobile)}
                        style={{
                          display: 'block',
                          padding: 'var(--spacing-md) 0',
                          color: isActive ? '#f97316' : '#111827',
                          fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                          fontSize: 'var(--font-size-base)',
                          textDecoration: 'none',
                          borderBottom: '1px solid #f3f4f6',
                        }}
                      >
                        {link.label}
                      </Link>
                      {dropdownMobile && (
                        <div style={{ paddingLeft: 16, marginBottom: 8 }}>
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: 'block',
                                padding: 'var(--spacing-sm) 0',
                                color: '#6b7280',
                                fontSize: 'var(--font-size-sm)',
                                textDecoration: 'none',
                                borderBottom: '1px solid #f3f4f6',
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: 'var(--spacing-md) 0',
                      color: location.pathname === link.path ? '#f97316' : '#111827',
                      fontWeight: location.pathname === link.path ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-base)',
                      textDecoration: 'none',
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginTop: 'auto' }}>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  backgroundColor: '#f97316',
                  color: 'white',
                  borderRadius: 'var(--border-radius-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-base)',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={20} strokeWidth={2.5} />
                <span>Hubungi via WhatsApp</span>
              </a>
              <a
                href="tel:+6281234567890"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  backgroundColor: '#f3f4f6',
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                  borderRadius: 'var(--border-radius-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-base)',
                  textDecoration: 'none',
                }}
              >
                <Phone size={20} strokeWidth={2} />
                <span>Telepon Langsung</span>
              </a>
              <Link
                to="/admin/login"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  borderRadius: 'var(--border-radius-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-base)',
                  textDecoration: 'none',
                }}
              >
                Admin
              </Link>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideInLeft {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </div>
      )}

      <WhatsAppButton />
    </>
  );
}
