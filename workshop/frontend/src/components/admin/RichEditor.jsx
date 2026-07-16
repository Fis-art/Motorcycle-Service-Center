export default function RichEditor({
  value,
  onChange,
  placeholder = 'Tulis konten di sini...',
  rows = 10,
  className = '',
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`rich-editor ${className}`}
      style={{
        width: '100%',
        padding: 'var(--spacing-md)',
        fontSize: 'var(--font-size-base)',
        fontFamily: 'inherit',
        lineHeight: 1.6,
        color: 'var(--color-text)',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--border-radius-lg)',
        resize: 'vertical',
        minHeight: 150,
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        outline: 'none',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'var(--color-secondary)';
        e.target.style.boxShadow = '0 0 0 3px rgba(233, 69, 96, 0.15)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'var(--color-border)';
        e.target.style.boxShadow = 'none';
      }}
    />
  );
}