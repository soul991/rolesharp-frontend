import React, { useState } from 'react';
import { useRouter } from '../../router/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/tools', label: 'Tools & catalogue' },
    { path: '/interview', label: 'Interview studio' },
    { path: '/jobs', label: 'Job matches' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'Methodology' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--rs-line)',
        backgroundColor: 'color-mix(in srgb, var(--rs-bg) 90%, transparent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div className="container">
        <nav
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
          aria-label="Main Navigation"
        >
          {/* Brand Logo */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 650,
              fontSize: '18px',
              letterSpacing: '-0.03em',
              color: 'var(--rs-ink)',
              padding: '4px 0',
            }}
            aria-label="RoleSharp Home"
          >
            <span
              style={{
                width: '28px',
                height: '28px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontSize: '17px',
                background: 'linear-gradient(135deg, #1E3A68 0%, #0F203C 100%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
              aria-hidden="true"
            >
              R
            </span>
            <span>
              Role<span style={{ color: 'var(--rs-blue-strong)' }}>Sharp</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{
                    color: isActive ? 'var(--rs-ink)' : 'var(--rs-muted)',
                    backgroundColor: isActive ? 'var(--rs-surface-2)' : 'transparent',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '-0.01em',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'color 0.15s ease, background-color 0.15s ease',
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Navigation Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                display: 'grid',
                placeItems: 'center',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease, border-color 0.15s ease',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title="Change theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Auth Actions */}
            {session.authenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  minHeight: '36px',
                  padding: '0 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--rs-blue)',
                  color: 'var(--rs-blue-ink)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  transition: 'opacity 0.15s ease',
                }}
              >
                <span>Workspace</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    color: 'var(--rs-ink)',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                  className="hidden-mobile"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    minHeight: '36px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--rs-blue)',
                    color: 'var(--rs-blue-ink)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  <span>Start free</span>
                  <ArrowRight size={13} />
                </button>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: '36px',
                height: '36px',
                display: 'none',
                placeItems: 'center',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
              }}
              className="visible-mobile"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '12px 0 20px',
              borderTop: '1px solid var(--rs-line)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
            }}
          >
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              style={{
                minHeight: '44px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/tools');
                setMobileMenuOpen(false);
              }}
              style={{
                minHeight: '44px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              Tools catalogue
            </button>
            <button
              onClick={() => {
                navigate('/checker');
                setMobileMenuOpen(false);
              }}
              style={{
                minHeight: '44px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              ATS checker
            </button>
            <button
              onClick={() => {
                navigate('/tailor');
                setMobileMenuOpen(false);
              }}
              style={{
                minHeight: '44px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              Resume tailor
            </button>
            <button
              onClick={() => {
                navigate('/interview');
                setMobileMenuOpen(false);
              }}
              style={{
                minHeight: '44px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              Interview studio
            </button>
            <button
              onClick={() => {
                navigate('/pricing');
                setMobileMenuOpen(false);
              }}
              style={{
                minHeight: '44px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              Pricing
            </button>
            {!session.authenticated && (
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                style={{
                  gridColumn: '1 / -1',
                  minHeight: '44px',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface-2)',
                  color: 'var(--rs-ink)',
                  fontSize: '13px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Log in to account
              </button>
            )}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .visible-mobile { display: grid !important; }
        }
      `}</style>
    </header>
  );
};
