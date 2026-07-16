import { useState, useEffect } from 'react';
import { Search, ArrowRight, Tag, MessageCircle, Bike, Wrench, Package, Battery, Circle, Sparkles, Grid2x2 } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import Loading from '../../components/shared/Loading';
import Card from '../../components/shared/Card';
import api from '../../config/api';
import { formatPrice, categoryLabels } from '../../utils/format';

const categoryIcons = {
  sparepart: Wrench,
  aksesoris: Package,
  oli: Sparkles,
  aki: Battery,
  ban: Circle,
  servis: Bike,
};

const defaultProducts = [
  { id: 1, name: 'Oli Mesin Yamalube Super 1L', category: 'oli', brand: 'Yamalube', image: '', price: 45000, old_price: 60000, motor_type: 'Matic' },
  { id: 2, name: 'Oli Mesin AHM MPX 0.8L', category: 'oli', brand: 'AHM', image: '', price: 38000, old_price: 50000, motor_type: 'Matic' },
  { id: 3, name: 'Ban Tubeless IRC Fastron 90/90-14', category: 'ban', brand: 'IRC', image: '', price: 135000, old_price: 165000, motor_type: 'Matic' },
  { id: 4, name: 'Ban Belakang FDR Sport-X 100/90-14', category: 'ban', brand: 'FDR', image: '', price: 155000, old_price: 185000, motor_type: 'Matic' },
  { id: 5, name: 'Aki Kering GS Astra 12V 5Ah', category: 'aki', brand: 'GS Astra', image: '', price: 185000, old_price: 220000, motor_type: 'Matic' },
  { id: 6, name: 'Kampas Rem Depan Original', category: 'sparepart', brand: 'OEM', image: '', price: 65000, old_price: 85000, motor_type: 'Matic' },
  { id: 7, name: 'Rantai & Gir Set 428H', category: 'sparepart', brand: 'SSS', image: '', price: 230000, old_price: 280000, motor_type: 'Bebek' },
  { id: 8, name: 'Busi Iridium NGK CPR8EAIX', category: 'sparepart', brand: 'NGK', image: '', price: 55000, old_price: 70000, motor_type: 'Sport' },
];

const motorTypes = ['Semua', 'Matic', 'Bebek', 'Sport', 'All'];

export default function Promo() {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [motorFilter, setMotorFilter] = useState('Semua');

  useEffect(() => {
    const load = async () => {
      try {
        const params = activeTab === 'all' ? '' : `?category=${activeTab}`;
        const res = await api.get(`/products${params}`);
        if (res?.data?.length) setProducts(res.data);
        else setProducts(defaultProducts.filter((p) => activeTab === 'all' || p.category === activeTab));
      } catch {
        setProducts(defaultProducts.filter((p) => activeTab === 'all' || p.category === activeTab));
      }
      setLoading(false);
    };
    load();
  }, [activeTab]);

  const tabs = [
    { key: 'all', label: 'Semua Promo', icon: Grid2x2 },
    { key: 'sparepart', label: 'Sparepart', icon: Wrench },
    { key: 'oli', label: 'Oli', icon: Sparkles },
    { key: 'ban', label: 'Ban', icon: Circle },
    { key: 'aki', label: 'Aki', icon: Battery },
    { key: 'aksesoris', label: 'Aksesoris', icon: Package },
    { key: 'servis', label: 'Paket Servis', icon: Bike },
  ];

  const filtered = products.filter((p) => {
    const matchKeyword = keyword
      ? (p.name + ' ' + (p.brand || '') + ' ' + (p.motor_type || '')).toLowerCase().includes(keyword.toLowerCase())
      : true;
    const matchMotor = motorFilter === 'Semua'
      ? true
      : (p.motor_type || '') === motorFilter || (p.motor_type || '') === 'All';
    return matchKeyword && matchMotor;
  });

  const waNumber = '6281234567890';

  if (loading) return <Loading fullPage />;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">Promo & Sparepart Motor</h1>
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Beranda</a>
            <span>/</span>
            <span>Promo</span>
          </nav>
        </div>
      </header>

      <main>
        <section style={{ backgroundColor: '#ffcb05', padding: 'var(--spacing-lg) 0' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-sm)',
              borderBottom: '3px solid #000',
              paddingBottom: 'var(--spacing-sm)',
            }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      backgroundColor: isActive ? '#000' : 'transparent',
                      color: isActive ? '#fff' : '#000',
                      border: 'none',
                      borderRadius: 'var(--border-radius-md) var(--border-radius-md) 0 0',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--font-size-sm)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <Icon size={16} /> {tab.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
              <div style={{ position: 'relative', flex: '1 1 280px' }}>
                <Search size={18} style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#000',
                }} />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Cari oli, ban, aki, sparepart..."
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    border: '2px solid #000',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-sm)',
                  }}
                />
              </div>
              <select
                value={motorFilter}
                onChange={(e) => setMotorFilter(e.target.value)}
                style={{
                  padding: '10px var(--spacing-md)',
                  border: '2px solid #000',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: 'var(--font-size-sm)',
                  cursor: 'pointer',
                }}
              >
                {motorTypes.map((m) => (
                  <option key={m} value={m}>{m === 'Semua' ? 'Semua Tipe Motor' : m}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <SectionTitle
              title={`${filtered.length} Promo Tersedia`}
              subtitle="Harga terbaik untuk sparepart, oli, ban, dan paket servis motor kesayangan Anda"
            />

            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-3xl) var(--spacing-md)',
                border: '1px dashed var(--color-border)',
                borderRadius: 'var(--border-radius-xl)',
                color: '#6b7280',
                backgroundColor: '#ffffff',
              }}>
                <Tag size={40} style={{ color: '#f97316', marginBottom: 'var(--spacing-md)' }} />
                <p style={{ fontSize: 'var(--font-size-base)', margin: 0 }}>
                  Maaf, produk tidak tersedia untuk pencarian ini. Coba kata kunci lain atau hubungi kami.
                </p>
              </div>
            ) : (
              <div className="grid-auto-fit">
                {filtered.map((item) => {
                  const CatIcon = categoryIcons[item.category] || Wrench;
                  const discount = item.old_price
                    ? Math.round((1 - Number(item.price) / Number(item.old_price)) * 100)
                    : 0;
                  return (
                    <Card key={item._id || item.id} hoverable style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff' }}>
                      <div style={{
                        position: 'relative',
                        height: 190,
                        backgroundColor: '#f9fafb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <CatIcon size={56} strokeWidth={1.5} style={{ color: '#e5e7eb' }} />
                        )}
                        {discount > 0 && (
                          <div style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            zIndex: 2,
                            backgroundColor: '#f97316',
                            color: 'white',
                            fontWeight: 'var(--font-weight-bold)',
                            fontSize: 'var(--font-size-sm)',
                            padding: '4px 10px',
                            borderRadius: 'var(--border-radius-full)',
                          }}>
                            -{discount}%
                          </div>
                        )}
                      </div>
                      <div style={{ padding: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <span style={{
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#f97316',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: 2,
                        }}>
                          {categoryLabels[item.category] || 'Produk'}{item.brand ? ` • ${item.brand}` : ''}
                        </span>
                        <h3 style={{
                          fontSize: 'var(--font-size-base)',
                          fontWeight: 'var(--font-weight-bold)',
                          lineHeight: 1.4,
                          marginBottom: 'var(--spacing-xs)',
                          minHeight: 44,
                        }}>
                          {item.name}
                        </h3>
                        {item.motor_type && item.motor_type !== 'All' && (
                          <span style={{
                            alignSelf: 'flex-start',
                            fontSize: 'var(--font-size-xs)',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #e5e7eb',
                            padding: '2px var(--spacing-sm)',
                            borderRadius: 'var(--border-radius-full)',
                            color: '#6b7280',
                            marginBottom: 'var(--spacing-sm)',
                          }}>
                            {item.motor_type}
                          </span>
                        )}
                        <div style={{ marginTop: 'auto' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-sm)' }}>
                            <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-extrabold)', color: '#f97316' }}>
                              {formatPrice(item.price)}
                            </span>
                            {item.old_price && (
                              <span style={{
                                fontSize: 'var(--font-size-sm)',
                                color: '#9ca3af',
                                textDecoration: 'line-through',
                              }}>
                                {formatPrice(item.old_price)}
                              </span>
                            )}
                          </div>
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Halo, saya tertarik dengan promo ' + item.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              marginTop: 'var(--spacing-sm)',
                              backgroundColor: '#000',
                              color: 'white',
                              borderRadius: 'var(--border-radius-md)',
                              fontWeight: 'var(--font-weight-semibold)',
                              fontSize: 'var(--font-size-sm)',
                              padding: '10px var(--spacing-md)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 'var(--spacing-xs)',
                              textDecoration: 'none',
                            }}
                          >
                            <MessageCircle size={16} /> Pesan via WA
                          </a>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
              <a href="/services" className="btn btn-primary btn-lg" style={{ backgroundColor: '#f97316', borderColor: '#f97316' }}>
                Lihat Layanan Servis <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
