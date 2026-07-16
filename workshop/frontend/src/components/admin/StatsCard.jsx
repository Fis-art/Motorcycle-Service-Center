import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'var(--color-secondary)',
  bgColor = 'var(--color-surface)',
}) {
  const getChangeColor = () => {
    if (change > 0) return 'var(--color-success)';
    if (change < 0) return 'var(--color-error)';
    return 'var(--color-text-muted)';
  };

  const getChangeIcon = () => {
    if (change > 0) return <TrendingUp size={14} />;
    if (change < 0) return <TrendingDown size={14} />;
    return <Minus size={14} />;
  };

  return (
    <div className="stats-card" style={{
      backgroundColor: bgColor,
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--border-radius-xl)',
      padding: 'var(--spacing-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-md)',
      transition: 'all var(--transition-base)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--spacing-xs)',
          }}>
            {title}
          </p>
          <p style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text)',
            lineHeight: 1.2,
          }}>
            {value}
          </p>
        </div>
        {Icon && (
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--border-radius-lg)',
            backgroundColor: `${iconColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
          }}>
            <Icon size={24} strokeWidth={2} />
          </div>
        )}
      </div>

      {change !== undefined && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          color: getChangeColor(),
        }}>
          {getChangeIcon()}
          <span>{change > 0 ? '+' : ''}{change}%</span>
          {changeLabel && <span style={{ color: 'var(--color-text-muted)' }}>{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}