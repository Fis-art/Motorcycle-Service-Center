export default function FormField({
  label,
  error,
  helpText,
  required = false,
  children,
  className = '',
  htmlFor,
}) {
  const fieldId = htmlFor || `field-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`form-field ${className}`} style={{ marginBottom: 'var(--spacing-md)' }}>
      {label && (
        <label
          htmlFor={fieldId}
          style={{
            display: 'block',
            marginBottom: 'var(--spacing-xs)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-text)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--color-error)', marginLeft: 'var(--spacing-xs)' }}>*</span>}
        </label>
      )}
      <div>{children}</div>
      {error && (
        <p style={{
          marginTop: 'var(--spacing-xs)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-error)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
        }}>
          <AlertCircle size={12} strokeWidth={2} />
          {error}
        </p>
      )}
      {helpText && !error && (
        <p style={{
          marginTop: 'var(--spacing-xs)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-light)',
        }}>
          {helpText}
        </p>
      )}
    </div>
  );
}