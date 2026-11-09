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
          bg: 'color-mix(in srgb, var(--rs-green) 12%, transparent)',
          color: 'var(--rs-green)',
          border: 'color-mix(in srgb, var(--rs-green) 30%, transparent)',
        };
      case 'warning':
        return {
          bg: 'color-mix(in srgb, var(--rs-amber) 12%, transparent)',
          color: 'var(--rs-amber)',
          border: 'color-mix(in srgb, var(--rs-amber) 30%, transparent)',
        };
      case 'info':
        return {
          bg: 'color-mix(in srgb, var(--rs-blue) 12%, transparent)',
          color: 'var(--rs-blue)',
          border: 'color-mix(in srgb, var(--rs-blue) 30%, transparent)',
        };
      case 'danger':
        return {
          bg: 'color-mix(in srgb, var(--rs-red) 12%, transparent)',
          color: 'var(--rs-red)',
          border: 'color-mix(in srgb, var(--rs-red) 30%, transparent)',
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
        padding: '3px 9px',
        borderRadius: '9999px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
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
          }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
};
