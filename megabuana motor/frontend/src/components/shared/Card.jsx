export default function Card({ children, className = '', style = {}, hover = true, ...props }) {
  return (
    <div
      className={`card ${className}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--border-radius-xl)',
        overflow: 'hidden',
        transition: hover ? 'all var(--transition-base)' : 'none',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`card-header ${className}`} style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-border)', ...props }}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`card-body ${className}`} style={{ padding: 'var(--spacing-lg)', ...props }}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`card-footer ${className}`} style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)', ...props }}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`card-title ${className}`} style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text)', ...props }}>
      {children}
    </h3>
  );
}

export function CardText({ children, className = '', ...props }) {
  return (
    <p className={`card-text ${className}`} style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6, ...props }}>
      {children}
    </p>
  );
}