import { useState, useEffect } from 'react';
import { Users, MessageSquare, Image, Wrench } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import StatsCard from '../../components/admin/StatsCard';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading fullPage text="Memuat dashboard..." />;

  return (
    <>
      <SEO title="Dashboard" />
      <div className="admin-page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="admin-stats-grid">
        <StatsCard
          title="Total Pesan"
          value={stats?.messages ?? '-'}
          icon={<MessageSquare size={24} />}
          color="var(--color-blue)"
        />
        <StatsCard
          title="Galeri Foto"
          value={stats?.gallery ?? '-'}
          icon={<Image size={24} />}
          color="var(--color-purple)"
        />
        <StatsCard
          title="Testimoni"
          value={stats?.testimonials ?? '-'}
          icon={<Users size={24} />}
          color="var(--color-green)"
        />
        <StatsCard
          title="Layanan"
          value={stats?.services ?? '-'}
          icon={<Wrench size={24} />}
          color="var(--color-accent)"
        />
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Selamat Datang di Panel Admin</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Gunakan menu sidebar untuk mengelola konten website Megabuana Motor.
        </p>
      </div>
    </>
  );
}
