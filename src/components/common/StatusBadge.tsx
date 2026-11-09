import React from 'react';

export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
  label: string;
  dot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, dot = false }) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'success':
        return {
          bg: 'var(--rs-green-subtle)',
          color: 'var(--rs-green)',
          border: 'color-mix(in srgb, var(--rs-green) 24%, transparent)',
        };
      case 'warning':
        return {
          bg: 'var(--rs-amber-subtle)',
          color: 'var(--rs-amber)',
          border: 'color-mix(in srgb, var(--rs-amber) 24%, transparent)',
        };
      case 'info':
        return {
          bg: 'var(--rs-blue-subtle)',
          color: 'var(--rs-blue)',
          border: 'color-mix(in srgb, var(--rs-blue) 24%, transparent)',
        };
      case 'danger':
        return {
          bg: 'var(--rs-red-subtle)',
          color: 'var(--rs-red)',
          border: 'color-mix(in srgb, var(--rs-red) 24%, transparent)',
        };
      default:
        return {
          bg: 'var(--rs-surface-2)',
          color: 'var(--rs-muted)',
          border: 'var(--rs-line)',
        };
    }
  };

  const style = getBadgeStyles();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: style.color,
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
};
