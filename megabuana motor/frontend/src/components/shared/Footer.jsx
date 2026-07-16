import { Bike, MapPin, Phone, Mail, Facebook, Instagram, Music2, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Music2, href: 'https://tiktok.com', label: 'TikTok' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

const contactInfo = [
  { icon: MapPin, label: 'Alamat', value: 'Jl. Raya Megabuana No. 123, Kota Bandung, Jawa Barat' },
  { icon: Phone, label: 'Telepon', value: '(022) 1234-5678' },
  { icon: Mail, label: 'Email', value: 'info@megabuanamotor.com' },
];

const quickLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Layanan', href: '/services' },
  { label: 'Karir', href: '/careers' },
  { label: 'Galeri', href: '/gallery' },
  { label: 'Testimoni', href: '/testimonials' },
  { label: 'Kontak', href: '/contact' },
];

const services = [
  { label: 'Servis Berkala', href: '/services#servis-berkala' },
  { label: 'Ganti Oli', href: '/services#ganti-oli' },
  { label: 'Tune Up', href: '/services#tune-up' },
  { label: 'Sparepart', href: '/services#sparepart' },
  { label: 'Aksesoris', href: '/services#aksesoris' },
  { label: 'Poles Body', href: '/services#poles-body' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{
      backgroundColor: '#0a0a1a',
      color: '#f3f4f6',
      padding: 'var(--spacing-4xl) 0 var(--spacing-xl)',
      borderTop: '1px solid rgba(249, 115, 22, 0.2)',
    }}>
      <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-2xl)',
          marginBottom: 'var(--spacing-2xl)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
              <Bike size={32} style={{ color: '#f97316' }} />
              <span style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-xl)', color: 'white' }}>Megabuana Motor</span>
            </div>
            <p style={{ color: '#9ca3af', lineHeight: 1.7, marginBottom: 'var(--spacing-lg)', fontSize: 'var(--font-size-sm)' }}>
              Bengkel motor terpercaya dengan pengalaman lebih dari 10 tahun melayani pelanggan setia.
              Menyediakan layanan servis, sparepart, dan aksesoris lengkap untuk kendaraan Anda.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--border-radius-full)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    transition: 'all var(--transition-fast)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f97316';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = '#f97316';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <social.icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'white' }}>Tautan Cepat</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      color: '#9ca3af',
                      transition: 'color var(--transition-fast)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'white' }}>Layanan Kami</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {services.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    style={{
                      color: '#9ca3af',
                      transition: 'color var(--transition-fast)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-md)', color: 'white' }}>Kontak Kami</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {contactInfo.map((item) => (
                <li key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)', color: '#9ca3af', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                  <item.icon size={18} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2, color: '#f97316' }} />
                  <div>
                    <span style={{ display: 'block', color: '#6b7280', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{item.label}</span>
                    <span style={{ color: '#d1d5db' }}>{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 'var(--spacing-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          textAlign: 'center',
        }}>
          <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>
            &copy; {currentYear} Megabuana Motor. Hak cipta dilindungi.
          </p>
          <p style={{ color: '#4b5563', fontSize: 'var(--font-size-xs)' }}>
            Dibangun dengan <span style={{ color: '#f97316' }}>&#9829;</span> untuk pecinta motor Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
