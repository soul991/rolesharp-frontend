import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.55 : 1,
    transition: 'transform 0.14s var(--rs-ease), background-color 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease, color 0.14s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-body)',
    userSelect: 'none',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { minHeight: '36px', padding: '0 12px', fontSize: '13px' },
    md: { minHeight: '44px', padding: '0 18px', fontSize: '14px' },
    lg: { minHeight: '48px', padding: '0 22px', fontSize: '15px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--rs-blue)',
      color: 'var(--rs-blue-ink)',
      border: '1px solid transparent',
      boxShadow: 'var(--rs-shadow-sm)',
    },
    secondary: {
      backgroundColor: 'var(--rs-surface)',
      color: 'var(--rs-ink)',
      border: '1px solid var(--rs-line)',
      boxShadow: 'var(--rs-shadow-sm)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--rs-ink)',
      border: '1px solid var(--rs-line)',
    },
    subtle: {
      backgroundColor: 'var(--rs-surface-2)',
      color: 'var(--rs-ink)',
      border: '1px solid transparent',
    },
    danger: {
      backgroundColor: 'var(--rs-red)',
      color: '#FFFFFF',
      border: '1px solid transparent',
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      className={`rs-button rs-button-${variant} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: '15px',
            height: '15px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'rs-spin 0.6s linear infinite',
          }}
          aria-hidden="true"
        />
      ) : icon ? (
        <span style={{ display: 'inline-flex', alignItems: 'center' }} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children && <span>{children}</span>}
    </button>
  );
};
