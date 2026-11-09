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

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--rs-line)',
        backgroundColor: 'color-mix(in srgb, var(--rs-bg) 92%, transparent)',
        backdropFilter: 'blur(16px)',
        transition: 'background-color 0.36s ease, border-color 0.36s ease',
      }}
    >
      <div className="container">
        <nav
          style={{
            height: '68px',
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
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '-0.055em',
              color: 'var(--rs-ink)',
            }}
            aria-label="RoleSharp Home"
          >
            <span
              style={{
                width: '30px',
                height: '30px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '18px',
                background: 'linear-gradient(145deg, #527DBA, #102B53 65%, #D9B65E)',
                boxShadow: '0 4px 14px rgba(91, 155, 255, 0.22)',
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
              gap: 'clamp(14px, 2vw, 26px)',
            }}
            className="hidden-mobile"
          >
            <button
              onClick={() => navigate('/tools')}
              style={{
                color: currentPath === '/tools' ? 'var(--rs-ink)' : 'var(--rs-muted)',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'color 0.18s ease',
              }}
            >
              Tools & Catalogue
            </button>
            <button
              onClick={() => navigate('/interview')}
              style={{
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 650,
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid color-mix(in srgb, var(--rs-amber) 45%, var(--rs-line))',
                backgroundColor: 'color-mix(in srgb, var(--rs-amber) 8%, transparent)',
                transition: 'border-color 0.18s ease, background-color 0.18s ease',
              }}
            >
              Interview Practice
            </button>
            <button
              onClick={() => navigate('/jobs')}
              style={{
                color: currentPath === '/jobs' ? 'var(--rs-ink)' : 'var(--rs-muted)',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'color 0.18s ease',
              }}
            >
              Jobs & Matches
            </button>
            <button
              onClick={() => navigate('/pricing')}
              style={{
                color: currentPath === '/pricing' ? 'var(--rs-ink)' : 'var(--rs-muted)',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'color 0.18s ease',
              }}
            >
              Pricing
            </button>
            <button
              onClick={() => navigate('/about')}
              style={{
                color: currentPath === '/about' ? 'var(--rs-ink)' : 'var(--rs-muted)',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'color 0.18s ease',
              }}
            >
              Methodology
            </button>
          </div>

          {/* Navigation Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title="Change theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Auth Actions */}
            {session.authenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  minHeight: '40px',
                  padding: '0 16px',
                  borderRadius: '9px',
                  backgroundColor: 'var(--rs-blue)',
                  color: 'var(--rs-blue-ink)',
                  fontSize: '13px',
                  fontWeight: 700,
                  transition: 'transform 0.18s ease',
                }}
              >
                <span>Workspace</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    color: 'var(--rs-ink)',
                    fontSize: '13px',
                    fontWeight: 700,
                    padding: '8px 10px',
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
                    minHeight: '40px',
                    padding: '0 16px',
                    borderRadius: '9px',
                    backgroundColor: 'var(--rs-blue)',
                    color: 'var(--rs-blue-ink)',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '0 6px 18px rgba(62, 117, 190, 0.18)',
                    transition: 'transform 0.18s ease',
                  }}
                >
                  <span>Start free</span>
                  <ArrowRight size={14} />
                </button>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: '40px',
                height: '40px',
                display: 'none',
                placeItems: 'center',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
              }}
              className="visible-mobile"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 0 24px',
              borderTop: '1px solid var(--rs-line)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
            }}
          >
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 600,
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
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              Tools Catalogue
            </button>
            <button
              onClick={() => {
                navigate('/checker');
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              ATS Checker
            </button>
            <button
              onClick={() => {
                navigate('/tailor');
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              Resume Tailor
            </button>
            <button
              onClick={() => {
                navigate('/interview');
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              Interview Prep
            </button>
            <button
              onClick={() => {
                navigate('/pricing');
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                fontSize: '13px',
                fontWeight: 600,
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
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface-2)',
                  color: 'var(--rs-ink)',
                  fontSize: '13px',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                Log in to Account
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
