import { Inbox, Package, Smile, AlertCircle } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title = 'Data Kosong', description = 'Belum ada data tersedia', action }) {
  return (
    <div className="empty-state" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-3xl)',
      textAlign: 'center',
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--border-radius-xl)',
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 'var(--border-radius-full)',
        backgroundColor: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'var(--spacing-lg)',
        color: 'var(--color-text-muted)',
      }}>
        <Icon size={36} strokeWidth={1.5} />
      </div>
      <h3 style={{
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-text)',
        marginBottom: 'var(--spacing-sm)',
      }}>
        {title}
      </h3>
      <p style={{
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)',
        maxWidth: 300,
        marginBottom: 'var(--spacing-lg)',
      }}>
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            ...action.style,
            padding: 'var(--spacing-sm) var(--spacing-lg)',
            borderRadius: 'var(--border-radius-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-sm)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
          }}
        >
          {action.icon && <action.icon size={16} strokeWidth={2} />}
          {action.label}
        </button>
      )}
    </div>
  );
}