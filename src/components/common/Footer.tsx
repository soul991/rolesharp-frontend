import React from 'react';
import { useRouter } from '../../router/RouterContext';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--rs-line)',
        backgroundColor: 'var(--rs-bg)',
        padding: '56px 0 40px',
        color: 'var(--rs-muted)',
        fontSize: '13px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '44px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 650,
                fontSize: '17px',
                letterSpacing: '-0.03em',
                color: 'var(--rs-ink)',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--rs-ink)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '15px',
                  backgroundColor: 'var(--rs-surface-2)',
                  border: '1px solid var(--rs-line-strong)',
                  boxShadow: 'var(--rs-shadow-sm)',
                }}
                aria-hidden="true"
              >
                R
              </span>
              <span>Role<span style={{ color: 'var(--rs-blue-strong)' }}>Sharp</span></span>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, maxWidth: '30ch', fontSize: '13px' }}>
              Precision editorial career workspace. Evidence-grounded resumes, opportunity matching, and confident preparation.
            </p>
          </div>

          {/* Workflow Col */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--rs-ink)',
                letterSpacing: '-0.01em',
                margin: '0 0 14px',
              }}
            >
              Application workflow
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <button onClick={() => navigate('/checker')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  ATS check & diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tailor')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Role-specific tailoring
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/interview')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Interview practice studio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tracker')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Application tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--rs-ink)',
                letterSpacing: '-0.01em',
                margin: '0 0 14px',
              }}
            >
              Tools & resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <button onClick={() => navigate('/tools')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Free tools directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cover-letter')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Cover letter generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/linkedin')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  LinkedIn optimizer
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Pricing & plans
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Methodology & trust
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--rs-ink)',
                letterSpacing: '-0.01em',
                margin: '0 0 14px',
              }}
            >
              Trust & security
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <button onClick={() => navigate('/privacy')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Privacy policy & retention
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Terms of service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/help')} style={{ color: 'var(--rs-muted)', fontSize: '13px', transition: 'color 0.15s' }}>
                  Help center & FAQs
                </button>
              </li>
              <li style={{ color: 'var(--rs-green)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--rs-green)' }} />
                <span>Zero data scraping policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--rs-line)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
          }}
        >
          <span>© {new Date().getFullYear()} RoleSharp 2.0. Clean-room architecture. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>WCAG 2.2 AA validated</span>
            <span>Zero hallucination guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
