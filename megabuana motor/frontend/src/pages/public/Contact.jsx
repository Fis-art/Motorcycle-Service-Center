import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

export default function Contact() {
  return (
    <>
      <SEO title="Kontak" description="Hubungi Megabuana Motor untuk konsultasi dan pemesanan layanan." />

      <section className="section">
        <div className="container">
          <div className="page-title">
            <h1>Hubungi Kami</h1>
            <p>Silakan hubungi kami untuk informasi lebih lanjut</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', marginBottom: 'var(--spacing-3xl)' }}>
            <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', backgroundColor: '#ffffff' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--border-radius-md)', backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 2 }}>Alamat</p>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)', margin: 0 }}>Jl. Raya Megabuana No. 123, Kota Bandung, Jawa Barat</p>
              </div>
            </Card>

            <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', backgroundColor: '#ffffff' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--border-radius-md)', backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 2 }}>Telepon</p>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)', margin: 0 }}>(022) 1234-5678</p>
              </div>
            </Card>

            <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', backgroundColor: '#ffffff' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--border-radius-md)', backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 2 }}>Email</p>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)', margin: 0 }}>info@megabuanamotor.com</p>
              </div>
            </Card>

            <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', backgroundColor: '#ffffff' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--border-radius-md)', backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={24} />
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 2 }}>Jam Operasional</p>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)', margin: 0 }}>Senin - Sabtu: 08:00 - 18:00</p>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)', margin: 0 }}>Minggu: 09:00 - 15:00</p>
              </div>
            </Card>
          </div>

          <div style={{
            backgroundColor: '#0a0a1a',
            color: 'white',
            borderRadius: 'var(--border-radius-2xl)',
            padding: 'var(--spacing-3xl)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                marginBottom: 'var(--spacing-md)',
                color: 'white',
              }}>
                Butuh Konsultasi atau Booking Servis?
              </h2>
              <p style={{
                fontSize: 'var(--font-size-lg)',
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 600,
                margin: '0 auto var(--spacing-xl)',
              }}>
                Hubungi kami langsung via WhatsApp untuk konsultasi gratis dan booking servis cepat.
              </p>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl" style={{ backgroundColor: '#f97316', borderColor: '#f97316' }}>
                <MessageCircle size={24} />
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
