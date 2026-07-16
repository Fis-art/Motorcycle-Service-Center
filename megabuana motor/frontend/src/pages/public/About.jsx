import { Shield, Award, Calendar, MapPin, Phone, Clock } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const teamMembers = [
  { name: 'Budi Santoso', role: 'Pendiri & Kepala Bengkel', experience: '15+ Tahun', desc: 'Ahli mesin motor dengan sertifikasi Yamaha & Honda. Memimpin tim teknisi dengan standar bengkel resmi.', image: 'https://images.unsplash.com/photo-1581578731438-314f4e1f5a3e?w=400&q=80' },
  { name: 'Ahmad Wijaya', role: 'Kepala Teknisi', experience: '12+ Tahun', desc: 'Spesialis injeksi elektronik & tuning performa. Mengelola divisi tune up dan diagnosa mesin.', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a2692?w=400&q=80' },
  { name: 'Siti Rahma', role: 'Teknisi Senior', experience: '8+ Tahun', desc: 'Ahli sistem kelistrikan & body repair. Bertanggung jawab atas divisi poles & coating.', image: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6d110?w=400&q=80' },
  { name: 'Doni Pratama', role: 'Teknisi Sparepart', experience: '6+ Tahun', desc: 'Mengelola inventory sparepart original & OEM. Memastikan ketersediaan stok & kualitas barang.', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80' },
];

const milestones = [
  { value: '2014', label: 'Tahun Berdiri' },
  { value: '5000+', label: 'Pelanggan Puas' },
  { value: '10+', label: 'Teknisi Berpengalaman' },
  { value: '100%', label: 'Sparepart Original' },
];

export default function About() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">Tentang Kami</h1>
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Beranda</a>
            <span>/</span>
            <span>Tentang Kami</span>
          </nav>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-3xl)',
              alignItems: 'center',
            }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  padding: 'var(--spacing-xs) var(--spacing-md)',
                  backgroundColor: 'rgba(249, 115, 22, 0.1)',
                  color: '#f97316',
                  borderRadius: 'var(--border-radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginBottom: 'var(--spacing-md)',
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                }}>
                  Sejak 2014
                </span>
                <h2 style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--spacing-md)',
                  lineHeight: 1.2,
                }}>
                  Bengkel Motor Terpercaya<br />Dengan Pengalaman <span style={{ color: '#f97316' }}>10+ Tahun</span>
                </h2>
                <p style={{
                  fontSize: 'var(--font-size-lg)',
                  color: '#6b7280',
                  marginBottom: 'var(--spacing-lg)',
                  lineHeight: 1.7,
                }}>
                  Megabuana Motor didirikan pada tahun 2014 dengan visi menjadi bengkel motor terpercaya
                  yang memberikan layanan berkualitas, transparan, dan ramah di kantong. Kami berkomitmen
                  menggunakan sparepart original, oli berkualitas, dan teknisi bersertifikat.
                </p>
                <p style={{
                  color: '#6b7280',
                  marginBottom: 'var(--spacing-xl)',
                  lineHeight: 1.7,
                }}>
                  Hingga saat ini, kami telah melayani lebih dari 5.000 pelanggan setia dan terus
                  berinovasi untuk memberikan pengalaman servis terbaik bagi komunitas pengendara motor Indonesia.
                </p>
                <div style={{
                  display: 'flex',
                  gap: 'var(--spacing-lg)',
                  flexWrap: 'wrap',
                }}>
                  <a href="/contact" className="btn btn-primary btn-lg">
                    Hubungi Kami
                  </a>
                  <a href="/services" className="btn btn-secondary btn-lg">
                    Lihat Layanan
                  </a>
                </div>
              </div>
              <div style={{
                borderRadius: 'var(--border-radius-2xl)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: 'var(--shadow-xl)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1625047509245-98c1f3f83a7a?w=800&q=80"
                  alt="Bengkel Megabuana Motor"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <SectionTitle
              title="Pencapaian Kami"
              subtitle="Bukti komitmen kami dalam memberikan layanan terbaik"
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--spacing-lg)',
            }}>
              {milestones.map((milestone, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-xl)',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-xl)',
                  transition: 'all var(--transition-base)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-4xl)',
                    fontWeight: 'var(--font-weight-extrabold)',
                    color: '#f97316',
                    marginBottom: 'var(--spacing-sm)',
                    lineHeight: 1,
                  }}>
                    {milestone.value}
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-sm)',
                    color: '#6b7280',
                    fontWeight: 'var(--font-weight-medium)',
                  }}>
                    {milestone.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionTitle
              title="Tim Kami"
              subtitle="Ditenagai oleh teknisi berpengalaman dan bersertifikat"
            />
            <div className="grid-auto-fit">
              {teamMembers.map((member, index) => (
                <Card key={index} hoverable style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>
                  <div style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    overflow: 'hidden',
                    marginBottom: 'var(--spacing-md)',
                    borderRadius: 'var(--border-radius-lg)',
                  }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)' }}>
                    {member.name}
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: '#f97316', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-xs)' }}>
                    {member.role}
                  </p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: '#9ca3af', marginBottom: 'var(--spacing-md)' }}>
                    Pengalaman: {member.experience}
                  </p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: '#6b7280', lineHeight: 1.6, flex: 1 }}>
                    {member.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <SectionTitle
              title="Mengapa Memilih Kami?"
              subtitle="Keunggulan yang membuat pelanggan kembali kembali"
            />
            <div className="grid-auto-fit">
              <Card hoverable style={{ textAlign: 'center', padding: 'var(--spacing-xl)', backgroundColor: '#ffffff' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 'var(--border-radius-xl)',
                  background: 'linear-gradient(135deg, #f97316, #facc15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-md)',
                }}>
                  <Shield size={28} strokeWidth={2} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                  Sparepart Original 100%
                </h3>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>
                  Hanya menggunakan sparepart original & OEM bermerek dengan garansi resmi.
                </p>
              </Card>
              <Card hoverable style={{ textAlign: 'center', padding: 'var(--spacing-xl)', backgroundColor: '#ffffff' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 'var(--border-radius-xl)',
                  background: 'linear-gradient(135deg, #f97316, #facc15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-md)',
                }}>
                  <Award size={28} strokeWidth={2} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                  Teknisi Bersertifikat
                </h3>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>
                  Tim teknisi berpengalaman dengan sertifikasi merk ternama (Yamaha, Honda, Suzuki).
                </p>
              </Card>
              <Card hoverable style={{ textAlign: 'center', padding: 'var(--spacing-xl)', backgroundColor: '#ffffff' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 'var(--border-radius-xl)',
                  background: 'linear-gradient(135deg, #f97316, #facc15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-md)',
                }}>
                  <Calendar size={28} strokeWidth={2} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                  Garansi Pekerjaan
                </h3>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>
                  Setiap servis mendapat garansi pekerjaan. Jika ada masalah, kami tangani gratis.
                </p>
              </Card>
              <Card hoverable style={{ textAlign: 'center', padding: 'var(--spacing-xl)', backgroundColor: '#ffffff' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 'var(--border-radius-xl)',
                  background: 'linear-gradient(135deg, #f97316, #facc15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-md)',
                }}>
                  <Users size={28} strokeWidth={2} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                  Harga Transparan
                </h3>
                <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>
                  Tidak ada biaya tersembunyi. Estimasi biaya diberitakan sebelum pengerjaan dimulai.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
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
                  Kunjungi Bengkel Kami
                </h2>
                <p style={{
                  fontSize: 'var(--font-size-lg)',
                  color: 'rgba(255,255,255,0.75)',
                  maxWidth: 600,
                  margin: '0 auto var(--spacing-xl)',
                }}>
                  Berlokasi strategis di Bandung dengan fasilitas lengkap: ruang tunggu nyaman, area servis bersih, dan showroom sparepart.
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 'var(--spacing-xl)',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--spacing-xl)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'rgba(255,255,255,0.9)' }}>
                    <MapPin size={20} style={{ color: '#f97316' }} />
                    <span>Jl. Raya Megabuana No. 123, Bandung</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'rgba(255,255,255,0.9)' }}>
                    <Phone size={20} style={{ color: '#f97316' }} />
                    <span>(022) 1234-5678</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'rgba(255,255,255,0.9)' }}>
                    <Clock size={20} style={{ color: '#f97316' }} />
                    <span>Senin-Sabtu: 08.00-18.00</span>
                  </div>
                </div>
                <a href="/contact" className="btn btn-primary btn-xl" style={{ backgroundColor: '#f97316', borderColor: '#f97316' }}>
                  Lihat Lokasi & Kontak Lengkap
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}