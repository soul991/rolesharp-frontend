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
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '9px',
    fontWeight: 650,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'transform 0.18s var(--rs-ease), background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-body)',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { minHeight: '38px', padding: '0 14px', fontSize: '13px' },
    md: { minHeight: '44px', padding: '0 18px', fontSize: '14px' },
    lg: { minHeight: '50px', padding: '0 24px', fontSize: '15px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--rs-blue)',
      color: 'var(--rs-blue-ink)',
      border: '1px solid transparent',
      boxShadow: '0 8px 24px rgba(62, 117, 190, 0.16)',
    },
    secondary: {
      backgroundColor: 'var(--rs-surface)',
      color: 'var(--rs-ink)',
      border: '1px solid var(--rs-line)',
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
      }}
      className={`rs-button rs-button-${variant} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'rs-spin 0.6s linear infinite',
          }}
          aria-hidden="true"
        />
      ) : icon ? (
        <span style={{ display: 'flex', alignItems: 'center' }} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
