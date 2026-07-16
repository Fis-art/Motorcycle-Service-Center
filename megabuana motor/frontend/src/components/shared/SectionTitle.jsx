export default function SectionTitle({ title, subtitle, align = 'center', className = '' }) {
  return (
    <div className={`section-title ${className}`} style={{ textAlign: align, marginBottom: 'var(--spacing-2xl)' }}>
      <h2 style={{
        fontSize: 'var(--font-size-3xl)',
        fontWeight: 'var(--font-weight-bold)',
        color: '#111827',
        marginBottom: 'var(--spacing-sm)',
        position: 'relative',
        display: 'inline-block',
      }}>
        {title}
        <span style={{
          display: 'block',
          width: 60,
          height: 4,
          background: 'linear-gradient(90deg, #f97316, #facc15)',
          borderRadius: 'var(--border-radius-full)',
          marginTop: 8,
          marginLeft: align === 'center' ? 'auto' : align === 'right' ? 'auto' : 0,
          marginRight: align === 'left' ? 'auto' : 0,
        }} />
      </h2>
      {subtitle && (
        <p style={{
          fontSize: 'var(--font-size-lg)',
          color: '#6b7280',
          maxWidth: 600,
          margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : 0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}