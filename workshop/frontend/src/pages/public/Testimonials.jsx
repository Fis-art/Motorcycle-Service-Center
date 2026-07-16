import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/testimonials')
      .then(res => setTestimonials(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Testimoni" description="Apa kata pelanggan tentang layanan Megabuana Motor." />

      <section className="section">
        <div className="container">
          <div className="page-title">
            <h1>Testimoni Pelanggan</h1>
            <p>Apa kata mereka tentang layanan kami</p>
          </div>

          {loading ? (
            <Loading text="Memuat testimoni..." />
          ) : testimonials.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--spacing-lg)',
            }}>
              {testimonials.map((t) => (
                <Card key={t._id} hoverable style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', gap: 2, color: '#facc15', marginBottom: 'var(--spacing-md)' }}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} fill={j < (t.rating || 5) ? 'currentColor' : 'none'} style={{ color: j < (t.rating || 5) ? '#facc15' : '#e5e7eb' }} />
                    ))}
                  </div>
                  <p style={{ color: '#4b5563', fontSize: 'var(--font-size-sm)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)', flex: 1 }}>
                    "{t.content}"
                  </p>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{t.name || t.client_name}</p>
                    {t.position && <p style={{ color: '#6b7280', fontSize: 'var(--font-size-xs)' }}>{t.position}</p>}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--spacing-lg)',
            }}>
              {[
                { name: 'Budi Santoso', content: 'Pelayanan sangat memuaskan, motor saya jadi seperti baru lagi! Teknisi ramah dan profesional.', rating: 5, position: 'Pemilik Honda Vario' },
                { name: 'Siti Rahma', content: 'Harga terjangkau dan pengerjaan cepat. Saya rutin service di sini. Recommended!', rating: 5, position: 'Pemilik Yamaha Mio' },
                { name: 'Ahmad Fauzi', content: 'Hasil modifikasi sesuai dengan keinginan. Terima kasih Megabuana Motor!', rating: 5, position: 'Pemilik Kawasaki Ninja' },
                { name: 'Dewi Lestari', content: 'Service elektrik motor saya ditangani dengan baik. Problem cepat teratasi.', rating: 5, position: 'Pemilik Suzuki Address' },
                { name: 'Rudi Hartono', content: 'Sudah 3 tahun jadi pelanggan setia. Kualitas service tidak pernah mengecewakan.', rating: 5, position: 'Pemilik Honda Beat' },
                { name: 'Mega Sari', content: 'Tempatnya bersih, pelayanan ramah, dan hasil kerja memuaskan. Pasti balik lagi!', rating: 5, position: 'Pemilik Yamaha Nmax' },
              ].map((t, i) => (
                <Card key={i} hoverable style={{ padding: 'var(--spacing-2xl)', backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', gap: 2, color: '#facc15', marginBottom: 'var(--spacing-md)' }}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} fill={j < t.rating ? 'currentColor' : 'none'} style={{ color: j < t.rating ? '#facc15' : '#e5e7eb' }} />
                    ))}
                  </div>
                  <p style={{ color: '#4b5563', fontSize: 'var(--font-size-sm)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)' }}>"{t.content}"</p>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{t.name}</p>
                    <p style={{ color: '#6b7280', fontSize: 'var(--font-size-xs)' }}>{t.position}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
