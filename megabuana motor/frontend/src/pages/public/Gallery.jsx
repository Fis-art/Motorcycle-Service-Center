import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import api from '../../config/api';

const fallbackImages = [
  { image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400', title: 'Service Mesin' },
  { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', title: 'Modifikasi Motor' },
  { image: 'https://images.unsplash.com/photo-1619844175408-c059481130b5?w=400', title: 'Workshop Kami' },
  { image: 'https://images.unsplash.com/photo-1625047509245-98c1f3f83a7a?w=400', title: 'Tim Mekanik' },
  { image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400', title: 'Peralatan Modern' },
  { image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', title: 'Hasil Kerja' },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/gallery').then(res => setImages(res.data || [])).catch(() => {});
  }, []);

  const items = images.length > 0 ? images : fallbackImages;

  return (
    <>
      <SEO title="Galeri" description="Lihat galeri foto hasil kerja dan workshop Megabuana Motor." />

      <section className="section">
        <div className="container">
          <div className="page-title">
            <h1>Galeri</h1>
            <p>Dokumentasi hasil kerja dan workshop kami</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--spacing-md)',
          }}>
            {items.map((item, i) => (
              <div
                key={item._id || i}
                onClick={() => setSelected(item)}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--border-radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: 260,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  transition: 'all var(--transition-base)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; }}
              >
                <img
                  src={item.image}
                  alt={item.title || item.caption || 'Gallery'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  className="overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 'var(--spacing-lg)',
                    opacity: 0,
                    transition: 'opacity var(--transition-base)',
                  }}
                >
                  <p style={{ color: 'white', fontWeight: 600 }}>{item.title || item.caption || 'Gallery'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: 'var(--spacing-md)',
          }}
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              color: 'white',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={24} />
          </button>
          <img
            src={selected.image}
            alt={selected.title || 'Gallery'}
            style={{ maxWidth: '90%', maxHeight: '85vh', borderRadius: 'var(--border-radius-lg)' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
