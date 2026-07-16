import { AlertCircle, X } from 'lucide-react';

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-message" style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--spacing-sm)',
      padding: 'var(--spacing-md)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid var(--color-error)',
      borderRadius: 'var(--border-radius-lg)',
      color: 'var(--color-error)',
    }}>
      <AlertCircle size={20} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
      <span style={{ flex: 1, fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Tutup pesan error"
          style={{
            padding: 'var(--spacing-xs)',
            color: 'var(--color-error)',
            opacity: 0.7,
            transition: 'opacity var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
        >
          <X size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}