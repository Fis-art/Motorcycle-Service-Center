import { Loader2 } from 'lucide-react';

export default function Loading({ size = 'md', text = 'Memuat...' }) {
  const sizeClasses = {
    sm: 20,
    md: 40,
    lg: 60,
  };

  return (
    <div className="loading" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--spacing-md)',
      padding: 'var(--spacing-xl)',
    }}>
      <Loader2
        size={sizeClasses[size]}
        style={{
          color: 'var(--color-secondary)',
          animation: 'spin 1s linear infinite',
        }}
      />
      {text && <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{text}</span>}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}