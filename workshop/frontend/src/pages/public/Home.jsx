import { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Phone, Users, Award, Star, Briefcase, Link2, Tag, Bike, Wrench, Package, Battery, Circle, Sparkles, Instagram, Music2, Facebook } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Loading from '../../components/shared/Loading';
import WhatsAppButton from '../../components/shared/WhatsAppButton';
import api from '../../config/api';
import { formatPrice, categoryLabels } from '../../utils/format';

const defaultHero = {
  badge: 'Solusi Tepat Service Motor Matic Injeksi',
  title: 'Keahlian Teruji, Performa Maksimal',
  subtitle: 'Prioritas kami adalah kendaraan Anda. Spesialis service motor matic injeksi dengan teknisi berpengalaman dan harga terjangkau.',
  image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80',
};

const defaultStats = [
  { icon: 'users', value: '500+', label: 'Jumlah Pelanggan Terus Bertambah' },
  { icon: 'award', value: '10+', label: 'Berpengalaman Sejak Desember 2015' },
  { icon: 'star', value: '98%', label: 'Kepuasan Pelanggan Berdasarkan 1000+ Ulasan' },
];

const defaultTestimonials = [
  { name: 'Silfi Nur Indah Sari', text: 'Pelayanan ramah, mekanik cukup profesional, cuma saran aja untuk ruang tunggu customer disediakan ruangan ber AC agar pelanggan tidak menghirup asap knalpot & debu motor yg sedang diservice, sukses selalu untuk FIT motor.', image: 'https://fitmotor.web.id/images/tes1.png' },
  { name: 'Muhammad Musa', text: 'Alhamdulillah sudah menjadi member, serasa bengkel dalam genggaman tinggal klik WA khususnya daerah Tegal, semuanya mudah dan murah amat recommend banget banyak discount nya dengan tidak melupakan kwalitas dari hasil servicenya.', image: 'https://fitmotor.web.id/images/tes2.png' },
  { name: 'Re Vay', text: 'Awalnya ragu untuk kesini, akhirnya jadi keterusan, pelayanannya baik dan cepat, pernah waktu itu ada kendala di pengereman after service di sini, dari admin dan mekanik cepat tanggap memperbaikinya, dan aman sampe sekarang. Terimakasih!', image: 'https://fitmotor.web.id/images/tes3.png' },
];

const iconMap = { users: Users, award: Award, star: Star, briefcase: Briefcase, link: Link2 };

const productCategoryIcons = {
  sparepart: Wrench,
  aksesoris: Package,
  oli: Sparkles,
  aki: Battery,
  ban: Circle,
  servis: Bike,
};

const defaultPromos = [
  { id: 1, name: 'Oli Mesin Yamalube Super 1L', category: 'oli', brand: 'Yamalube', image: '', price: 45000, old_price: 60000, motor_type: 'Matic' },
  { id: 2, name: 'Ban Tubeless IRC Fastron 90/90-14', category: 'ban', brand: 'IRC', image: '', price: 135000, old_price: 165000, motor_type: 'Matic' },
  { id: 3, name: 'Aki Kering GS Astra 12V 5Ah', category: 'aki', brand: 'GS Astra', image: '', price: 185000, old_price: 220000, motor_type: 'Matic' },
  { id: 4, name: 'Paket Servis Berkala 1000km', category: 'servis', brand: 'Megabuana', image: '', price: 150000, old_price: 200000, motor_type: 'Matic' },
];

export default function Home() {
  const [hero, setHero] = useState(defaultHero);
  const [stats, setStats] = useState(defaultStats);
  const [testimonials, setTestimonials] = useState([]);
  const [social, setSocial] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [promos, setPromos] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [heroRes, statsRes, testiRes, socialRes, galRes, promoRes, partRes] = await Promise.all([
          api.get('/hero').catch(() => null),
          api.get('/stats').catch(() => null),
          api.get('/testimonials').catch(() => null),
          api.get('/social-media').catch(() => null),
          api.get('/gallery').catch(() => null),
          api.get('/products?promo=1').catch(() => null),
          api.get('/partnership').catch(() => null),
        ]);
        if (heroRes?.data?.length) {
          const h = heroRes.data[0];
          setHero({ badge: h.badge || defaultHero.badge, title: h.title || defaultHero.title, subtitle: h.subtitle || defaultHero.subtitle, image: h.image || defaultHero.image });
        }
        if (statsRes?.data?.length) setStats(statsRes.data);
        if (testiRes?.data?.length) setTestimonials(testiRes.data);
        if (socialRes?.data?.length) setSocial(socialRes.data);
        if (galRes?.data?.length) setGallery(galRes.data.slice(0, 6));
        if (promoRes?.data?.length) setPromos(promoRes.data);
        if (partRes?.data?.length) setPartnerships(partRes.data);
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const displayGallery = gallery.length > 0 ? gallery : [];
  const displayPromos = promos.length > 0 ? promos : defaultPromos;

  if (loading) return <Loading fullPage />;

  return (
    <>
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0a0a1a',
        color: 'white',
        overflow: 'hidden',
      }}>
        <div className="hero-slides" style={{ position: 'absolute', inset: 0 }}>
          <div className="hero-slide active" style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${hero.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(10, 10, 26, 0.92) 0%, rgba(26, 26, 46, 0.75) 100%)',
            }} />
          </div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-xl)' }}>
          <div style={{ maxWidth: 700, textAlign: 'left' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(249, 115, 22, 0.15)',
              color: '#fb923c',
              borderRadius: 'var(--border-radius-full)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--spacing-md)',
              border: '1px solid rgba(249, 115, 22, 0.25)',
            }}>
              {hero.badge}
            </span>
            <h1 style={{
              fontSize: 'var(--font-size-5xl)',
              fontWeight: 'var(--font-weight-extrabold)',
              lineHeight: 1.1,
              marginBottom: 'var(--spacing-md)',
              maxWidth: 900,
              color: 'white',
            }}>
              {hero.title}
            </h1>
            <p style={{
              fontSize: 'var(--font-size-lg)',
              color: 'rgba(255, 255, 255, 0.75)',
              marginBottom: 'var(--spacing-xl)',
              maxWidth: 600,
              lineHeight: 1.7,
            }}>
              {hero.subtitle}
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
              <a href="/services" className="btn btn-primary btn-lg" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                backgroundColor: '#f97316',
                borderColor: '#f97316',
              }}>
                <ArrowRight size={20} />
                <span>Lihat Layanan</span>
              </a>
              <a href="/contact" className="btn btn-lg" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
              }}>
                <Phone size={20} />
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {partnerships.length > 0 && (
        <section className="section" style={{ padding: 'var(--spacing-2xl) 0', backgroundColor: '#ffffff' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-xl)',
              flexWrap: 'wrap',
              opacity: 0.85,
            }}>
              {partnerships.map((p) => (
                <div key={p._id || p.id} style={{
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'grayscale(100%)',
                  opacity: 0.7,
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%)';
                  e.currentTarget.style.opacity = '0.7';
                }}
                >
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} style={{ maxHeight: 48, maxWidth: 140, objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-muted)' }}>{p.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Kemitraan Perusahaan"
            subtitle="Dipercaya oleh brand-brand ternama untuk memberikan layanan terbaik"
          />
          {partnerships.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: 'var(--spacing-3xl) var(--spacing-md)',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--border-radius-xl)',
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-background)',
            }}>
              <Link2 size={40} style={{ color: '#f97316', marginBottom: 'var(--spacing-md)' }} />
              <p style={{ fontSize: 'var(--font-size-base)', margin: 0 }}>
                Belum ada data kemitraan. Silakan tambahkan melalui menu admin <strong>Kemitraan</strong>.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="stats-section" style={{
        padding: 'var(--spacing-3xl) 0',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container">
          <SectionTitle
            title="Pencapaian Kami"
            subtitle="Dedikasi dan kualitas layanan kami dalam angka"
            center
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--spacing-lg)',
          }}>
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon] || Star;
              return (
                <div key={stat._id || index} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 'var(--spacing-xl)',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-xl)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'all var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                }}
                >
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 'var(--border-radius-xl)',
                    background: 'linear-gradient(135deg, #f97316, #facc15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-md)',
                  }}>
                    <Icon size={28} strokeWidth={2} style={{ color: 'white' }} />
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-extrabold)',
                    color: '#111827',
                    lineHeight: 1.2,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-sm)',
                    color: '#6b7280',
                    fontWeight: 'var(--font-weight-medium)',
                    marginTop: 4,
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="testimonials-section" style={{ padding: 'var(--spacing-3xl) 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <SectionTitle
            title="Apa Kata Pelanggan Kami"
            subtitle="Berdasarkan 1000+ ulasan di Google Maps"
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-lg)',
          }}>
            {displayTestimonials.map((testimonial, index) => (
              <Card key={testimonial._id || index} hoverable style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #f97316' }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: 'var(--font-weight-semibold)', color: '#111827', fontSize: 'var(--font-size-base)' }}>
                      {testimonial.name || testimonial.client_name}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: '#f97316', fontWeight: 'var(--font-weight-medium)' }}>
                      Google Review
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 'var(--spacing-md)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} style={{
                      color: i < (testimonial.rating || 5) ? '#facc15' : '#e5e7eb',
                      fill: i < (testimonial.rating || 5) ? 'currentColor' : 'none',
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.7, color: '#4b5563', marginBottom: 'var(--spacing-lg)', flex: 1, fontStyle: 'italic' }}>
                  "{testimonial.content || testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {social.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionTitle
              title="Ikuti Kami"
              subtitle="Update terbaru, promo eksklusif, dan tips perawatan motor."
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-lg)',
            }}>
              {social.map((s) => {
                const Icon = s.platform?.toLowerCase().includes('instagram') ? Instagram : s.platform?.toLowerCase().includes('tiktok') ? Music2 : s.platform?.toLowerCase().includes('facebook') ? Facebook : Link2;
                return (
                  <Card key={s._id} hoverable style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', backgroundColor: '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 'var(--border-radius-lg)',
                        background: 'linear-gradient(135deg, #f97316, #facc15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700,
                      }}>
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 'var(--font-weight-semibold)', color: '#111827' }}>{s.platform}</div>
                        {s.username && <div style={{ fontSize: 'var(--font-size-sm)', color: '#f97316' }}>{s.username}</div>}
                      </div>
                    </div>
                    {s.description && (
                      <p style={{ color: '#6b7280', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                        {s.description}
                      </p>
                    )}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: 'auto' }}>
                      {s.cta || 'Ikuti'} <ArrowRight size={16} />
                    </a>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {displayGallery.length > 0 && (
        <section className="section" style={{ padding: 'var(--spacing-3xl) 0', backgroundColor: '#ffffff' }}>
          <div className="container">
            <SectionTitle
              title="Galeri Kami"
              subtitle="Dokumentasi aktivitas dan momen berharga di bengkel kami"
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--spacing-md)',
            }}>
              {displayGallery.map((item, i) => (
                <div key={item._id || i} style={{
                  borderRadius: 'var(--border-radius-lg)',
                  overflow: 'hidden',
                  height: 240,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  transition: 'all var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                }}
                >
                  <img
                    src={item.image}
                    alt={item.title || item.caption || 'Gallery'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
              <a href="/gallery" className="btn btn-secondary btn-lg">
                Lihat Semua Galeri <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="cta-section" style={{
        padding: 'var(--spacing-4xl) 0',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
        color: 'white',
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
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--spacing-md)',
            color: 'white',
          }}>
            Siap Memberi Perawatan Terbaik untuk Motor Anda?
          </h2>
          <p style={{
            fontSize: 'var(--font-size-lg)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 600,
            margin: '0 auto var(--spacing-xl)',
          }}>
            Hubungi kami via WhatsApp untuk konsultasi gratis dan booking servis cepat.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl" style={{ backgroundColor: '#f97316', borderColor: '#f97316' }}>
              <MessageCircle size={20} />
              Booking via WhatsApp
            </a>
            <a href="/careers" className="btn btn-secondary btn-xl" style={{
              backgroundColor: 'transparent',
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
            }}>
              <Briefcase size={20} />
              <span>Karir Bersama Kami</span>
            </a>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </>
  );
}
