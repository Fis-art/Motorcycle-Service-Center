import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop({ threshold = 300 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll ke atas"
      style={{
        position: 'fixed',
        bottom: 'var(--spacing-lg)',
        right: 'var(--spacing-lg)',
        width: 48,
        height: 48,
        borderRadius: 'var(--border-radius-full)',
        backgroundColor: 'var(--color-secondary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 'var(--z-fixed)',
        transition: 'all var(--transition-base)',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#d63852';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
}