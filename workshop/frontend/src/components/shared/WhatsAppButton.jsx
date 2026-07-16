import { MessageCircle, Phone, ExternalLink } from 'lucide-react';

export default function WhatsAppButton({ phone = '6281234567890', message = 'Halo, saya ingin bertanya tentang layanan Megabuana Motor.' }) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Hubungi via WhatsApp"
      style={{
        position: 'fixed',
        bottom: 'var(--spacing-lg)',
        right: 'var(--spacing-lg)',
        width: 56,
        height: 56,
        borderRadius: 'var(--border-radius-full)',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 'var(--z-fixed)',
        transition: 'all var(--transition-base)',
        color: 'white',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
      }}
    >
      <MessageCircle size={28} strokeWidth={2.5} />
    </a>
  );
}