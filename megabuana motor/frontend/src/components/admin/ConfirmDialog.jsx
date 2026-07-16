import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  message = 'Apakah Anda yakin?',
  confirmText = 'Ya',
  cancelText = 'Batal',
  variant = 'danger',
  loading = false,
}) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="confirm-dialog-overlay"
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-modal)',
        animation: 'fadeIn 0.2s ease',
        padding: 'var(--spacing-md)',
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="confirm-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          width: '100%',
          maxWidth: 400,
          animation: 'slideUp 0.2s ease',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <h3 style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text)',
            margin: 0,
          }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Tutup dialog"
            style={{
              padding: 'var(--spacing-xs)',
              borderRadius: 'var(--border-radius-md)',
              color: 'var(--color-text-muted)',
              background: 'transparent',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div style={{
          padding: 'var(--spacing-lg)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.6,
        }}>
          {message}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 'var(--spacing-sm)',
          padding: 'var(--spacing-lg)',
          borderTop: '1px solid var(--color-border)',
        }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              borderRadius: 'var(--border-radius-lg)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: 'var(--font-size-sm)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              borderRadius: 'var(--border-radius-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-sm)',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              backgroundColor: variant === 'danger' ? 'var(--color-error)' : 'var(--color-secondary)',
              color: 'white',
              border: 'none',
            }}
          >
            {loading ? <Loader2 size={16} /> : <Check size={16} />}
            {confirmText}
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}