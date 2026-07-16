export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    borderRadius: 'var(--border-radius-lg)',
    border: '2px solid transparent',
    transition: 'all var(--transition-fast)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'white',
      borderColor: 'var(--color-secondary)',
    },
    secondary: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text)',
      borderColor: 'var(--color-border)',
    },
    accent: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-accent)',
      fontWeight: 'var(--font-weight-bold)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-secondary)',
      borderColor: 'var(--color-secondary)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: 'var(--color-error)',
      color: 'white',
      borderColor: 'var(--color-error)',
    },
  };

  const sizeStyles = {
    sm: { padding: 'var(--spacing-xs) var(--spacing-md)', fontSize: 'var(--font-size-xs)' },
    md: { padding: 'var(--spacing-sm) var(--spacing-lg)', fontSize: 'var(--font-size-sm)' },
    lg: { padding: 'var(--spacing-md) var(--spacing-xl)', fontSize: 'var(--font-size-base)' },
    xl: { padding: 'var(--spacing-lg) var(--spacing-2xl)', fontSize: 'var(--font-size-lg)' },
    icon: { padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-full)' },
  };

  const hoverStyles = {
    primary: { backgroundColor: '#d63852', borderColor: '#d63852', transform: 'translateY(-1px)', boxShadow: 'var(--shadow-md)' },
    secondary: { backgroundColor: 'var(--color-surface-hover)' },
    accent: { backgroundColor: '#d97706', borderColor: '#d97706', transform: 'translateY(-1px)', boxShadow: 'var(--shadow-md)' },
    outline: { backgroundColor: 'var(--color-secondary)', color: 'white' },
    ghost: { backgroundColor: 'var(--color-surface)' },
    danger: { backgroundColor: '#dc2626', borderColor: '#dc2626', transform: 'translateY(-1px)', boxShadow: 'var(--shadow-md)' },
  };

  const combinedStyle = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      Object.assign(e.currentTarget.style, hoverStyles[variant]);
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled && !loading) {
      Object.keys(hoverStyles[variant]).forEach(key => {
        e.currentTarget.style[key] = variantStyles[variant][key] || baseStyles[key] || '';
      });
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      className={className}
      style={combinedStyle}
      {...props}
    >
      {loading && (
        <svg
          style={{ animation: 'spin 1s linear infinite', width: '1em', height: '1em' }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
          <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </svg>
      )}
      {!loading && leftIcon && leftIcon}
      {children}
      {!loading && rightIcon && rightIcon}
    </button>
  );
}