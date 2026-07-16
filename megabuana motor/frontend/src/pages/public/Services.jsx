import { Bike, Wrench, Package, Sparkles, Shield, Truck, Star, MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const services = [
  {
    id: 'servis-berkala',
    icon: Wrench,
    title: 'Servis Berkala',
    description: 'Perawatan rutin komprehensif untuk menjaga performa motor selalu optimal. Termasuk pengecekan sistem kelistrikan, rem, suspensi, dan sistem injeksi.',
    features: [
      'Pengecekan & pengisian oli mesin',
      'Pembersihan filter udara',
      'Pengecekan & penyesuaian rem',
      'Pengecekan sistem kelistrikan',
      'Pengecekan suspensi & ban',
      'Pengecekan sistem injeksi/karburator',
    ],
    price: 'Mulai dari Rp 150.000',
    duration: '60-90 menit',
  },
  {
    id: 'ganti-oli',
    icon: Package,
    title: 'Ganti Oli & Filter',
    description: 'Penggantian oli mesin dan filter berkualitas tinggi sesuai spesifikasi pabrik untuk melindungi komponen mesin dan menjaga performa.',
    features: [
      'Oli mesin sintetik/semi-sintetik premium',
      'Filter oli original',
      'Pengecekan tingkat oli gratis',
      'Reset indikator servis',
      'Pemeriksaan kebocoran',
    ],
    price: 'Mulai dari Rp 120.000',
    duration: '30-45 menit',
  },
  {
    id: 'tune-up',
    icon: Sparkles,
    title: 'Tune Up Mesin',
    description: 'Penyetelan ulang mesin untuk mengembalikan performa pabrik. Cocok untuk motor yang sudah berumur atau mengalami penurunan tenaga.',
    features: [
      'Penggantian busi iridium/platinum',
      'Penyesuaian valve clearance',
      'Pembersihan throttle body',
      'Sinkronisasi karburator/injeksi',
      'Pengecekan kompresi mesin',
      'Pengaturan idle speed',
    ],
    price: 'Mulai dari Rp 300.000',
    duration: '2-3 jam',
  },
  {
    id: 'sparepart',
    icon: Shield,
    title: 'Sparepart Original',
    description: 'Kami menyediakan sparepart original dan OEM bermerek terkenal dengan garansi resmi. Pastikan kelangkaan motor Anda dengan komponen asli.',
    features: [
      'Oli meson & oli gardan original',
      'Filter udara, oli, & bensin',
      'Busi original NGK/Denso',
      'Kampas rem & cakram rem',
      'Rantai & sprocket',
      'Busi & kabel busi',
    ],
    price: 'Sesuai harga pasaran',
    duration: 'Tersedia stok',
  },
  {
    id: 'aksesoris',
    icon: Truck,
    title: 'Aksesoris Motor',
    description: 'Koleksi aksesoris motor lengkap dari helm standar SNI, jaket riding, stiker custom, knalpot racing, hingga perlengkapan touring.',
    features: [
      'Helm full face & modular SNI',
      'Jaket riding & celana riding',
      'Stiker & wrapping custom',
      'Knalpot racing & slip-on',
      'Handlebar & grip racing',
      'Box motor & tas tank',
    ],
    price: 'Beragam harga',
    duration: 'Ready stock',
  },
  {
    id: 'poles-body',
    icon: Bike,
    title: 'Poles & Coating Body',
    description: 'Perawatan cat body motor dengan poles detail dan coating keramik untuk melindungi cat dari sinar UV, hujan asam, dan goresan ringan.',
    features: [
      'Poles body detail (compound & wax)',
      'Coating keramik 9H durability',
      'Pembersihan detail engine bay',
      'Poles chrome & stainless',
      'Pembersihan karat ringan',
      'Proteksi cat tahan lama',
    ],
    price: 'Mulai dari Rp 500.000',
    duration: '4-6 jam',
  },
];

const processSteps = [
  { step: '01', title: 'Konsultasi', desc: 'Teknisi mendiagnosa keluhan dan memberikan rekomendasi layanan yang tepat.' },
  { step: '02', title: 'Persetujuan', desc: 'Kami jelaskan biaya & durasi pekerjaan sebelum memulai. Tidak ada biaya tersembunyi.' },
  { step: '03', title: 'Pengerjaan', desc: 'Teknisi berpengalaman melakukan servis dengan peralatan standar bengkel resmi.' },
  { step: '04', title: 'Quality Check', desc: 'Setelah servis, motor diuji coba untuk memastikan performa optimal.' },
  { step: '05', title: 'Serah Terima', desc: 'Motor dikembalikan dengan laporan servis lengkap dan garansi pekerjaan.' },
];

export default function Services() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">Layanan Kami</h1>
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Beranda</a>
            <span>/</span>
            <span>Layanan</span>
          </nav>
        </div>
      </header>

      <main>
        <section className="section section-alt">
          <div className="container">
            <SectionTitle
              title="Daftar Layanan Lengkap"
              subtitle="Setiap layanan dilakukan oleh teknisi bersertifikat dengan peralatan modern dan standar bengkel resmi"
            />
            <div className="grid-auto-fit">
              {services.map((service, index) => (
                <article key={service.id} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-xl)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'all var(--transition-base)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #f97316, #facc15)',
                    padding: 'var(--spacing-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                  }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: 'var(--border-radius-lg)',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <service.icon size={26} strokeWidth={2} style={{ color: 'white' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'white', marginBottom: 'var(--spacing-xs)' }}>
                        {service.title}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                        {service.duration} • {service.price}
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: 'var(--spacing-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: '#6b7280', lineHeight: 1.6, marginBottom: 'var(--spacing-lg)' }}>
                      {service.description}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-lg)', flex: 1 }}>
                      {service.features.map((feature, i) => (
                        <li key={i} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--spacing-sm)',
                          fontSize: 'var(--font-size-sm)',
                          color: '#374151',
                        }}>
                          <Star size={14} style={{ color: '#facc15', fill: 'currentColor', flexShrink: 0, marginTop: 2 }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a href={`https://wa.me/6281234567890?text=${encodeURIComponent('Halo, saya ingin info tentang ' + service.title)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#f97316', borderColor: '#f97316' }}>
                      Booking via WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionTitle
              title="Proses Servis Kami"
              subtitle="Transparan, terstruktur, dan memuaskan"
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--spacing-lg)',
            }}>
              {processSteps.map((step, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-lg)',
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--border-radius-xl)',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: 'var(--border-radius-full)',
                    background: 'linear-gradient(135deg, #f97316, #facc15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--spacing-md)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'white',
                  }}>
                    {step.step}
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>
                    {step.desc}
                  </p>
                  {index < processSteps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: 30,
                      right: '-50%',
                      width: '100%',
                      height: 2,
                      background: 'linear-gradient(90deg, var(--color-border), transparent)',
                      display: 'none',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container" style={{ textAlign: 'center', maxWidth: 800 }}>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-md)' }}>
              Butuh Konsultasi Gratis?
            </h2>
            <p style={{ fontSize: 'var(--font-size-lg)', color: '#6b7280', marginBottom: 'var(--spacing-xl)' }}>
              Tim kami siap membantu menentukan layanan yang tepat untuk motor Anda. Hubungi kami via WhatsApp atau telepon.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" style={{ backgroundColor: '#f97316', borderColor: '#f97316' }}>
                <Phone size={20} /> Konsultasi WhatsApp
              </a>
              <a href="tel:+6281234567890" className="btn btn-secondary btn-lg">
                <Phone size={20} /> Telepon Langsung
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
