import { useState, useEffect } from 'react';
import { ArrowRight, Briefcase, MapPin, Clock, MessageCircle } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

const fallbackCareers = [
  { title: 'Mekanik Motor Matic', location: 'Tegal', type: 'Full Time', desc: 'Bertanggung jawab atas servis dan perbaikan motor matic injeksi dengan standar bengkel resmi.' },
  { title: 'Customer Service', location: 'Tegal', type: 'Full Time', desc: 'Melayani konsultasi pelanggan via WhatsApp dan walk-in dengan ramah dan profesional.' },
  { title: 'Sparepart Staff', location: 'Tegal', type: 'Full Time', desc: 'Mengelola inventory sparepart original & OEM serta memastikan ketersediaan stok.' },
];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/careers')
      .then(res => setJobs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const display = jobs.length > 0 ? jobs : fallbackCareers;

  return (
    <>
      <SEO title="Karir" description="Bergabung bersama tim bengkel kami. Lihat lowongan tersedia." />

      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0a0a1a',
        color: 'white',
        overflow: 'hidden',
        backgroundImage: 'url(https://fitmotor.web.id/images/karir.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,26,0.92), rgba(26,26,46,0.75))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-xl)' }}>
          <span style={{
            display: 'inline-block',
            padding: 'var(--spacing-xs) var(--spacing-md)',
            backgroundColor: 'rgba(249, 115, 22, 0.15)',
            color: '#fb923c',
            borderRadius: 'var(--border-radius-full)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--spacing-md)',
            border: '1px solid rgba(249, 115, 22, 0.25)',
          }}>
            Karir
          </span>
          <h1 style={{
            fontSize: 'var(--font-size-5xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            lineHeight: 1.1,
            marginBottom: 'var(--spacing-md)',
            color: 'white',
          }}>
            Bergabung Bersama<br />Tim Megabuana Motor
          </h1>
          <p style={{
            fontSize: 'var(--font-size-lg)',
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: 600,
            marginBottom: 'var(--spacing-xl)',
          }}>
            Kami mencari individu passionate yang ingin berkembang di dunia otomotif. Lihat lowongan tersedia dan kirimkan lamaran Anda.
          </p>
          <a href="/contact" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-sm)', backgroundColor: '#f97316', borderColor: '#f97316' }}>
            Lihat lowongan kami <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitleLocal title="Lowongan Tersedia" subtitle="Bergabunglah dengan tim profesional kami" />
          {loading ? (
            <Loading text="Memuat lowongan..." />
          ) : (
            <div className="grid-auto-fit">
              {display.map((job, i) => (
                <Card key={job._id || i} hoverable style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 'var(--border-radius-xl)',
                    background: 'linear-gradient(135deg, #f97316, #facc15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--spacing-md)',
                  }}>
                    <Briefcase size={26} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                    {job.title}
                  </h3>
                  <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)', color: '#6b7280', fontSize: 'var(--font-size-sm)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {job.location || 'Tegal'}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {job.type || 'Full Time'}</span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)', lineHeight: 1.7, flex: 1, marginBottom: 'var(--spacing-lg)' }}>
                    {job.desc || job.description}
                  </p>
                  <a href={`https://wa.me/6281234567890?text=${encodeURIComponent('Halo, saya tertarik melamar posisi ' + (job.title || ''))}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: 'auto' }}>
                    <MessageCircle size={16} /> Lamar Sekarang
                  </a>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function SectionTitleLocal({ title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-3xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--spacing-sm)',
        color: '#111827',
      }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: '#6b7280', fontSize: 'var(--font-size-base)' }}>{subtitle}</p>}
    </div>
  );
}
