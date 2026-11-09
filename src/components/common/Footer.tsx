import React from 'react';
import { useRouter } from '../../router/RouterContext';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--rs-line)',
        backgroundColor: 'var(--rs-bg)',
        padding: '48px 0 36px',
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
            marginBottom: '40px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '-0.04em',
                color: 'var(--rs-ink)',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  background: 'linear-gradient(145deg, #527DBA, #102B53 65%, #D9B65E)',
                }}
              >
                R
              </span>
              <span>Role<span style={{ color: 'var(--rs-blue-strong)' }}>Sharp</span></span>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6, maxWidth: '28ch', fontSize: '13px' }}>
              Precision editorial career workspace. Evidence-grounded resumes, opportunity matching, and confident preparation.
            </p>
          </div>

          {/* Workflow Col */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 14px',
              }}
            >
              Application Workflow
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <button onClick={() => navigate('/checker')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  01 / ATS Check & Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tailor')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  02 / Role-Specific Tailoring
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/interview')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  03 / Interview Practice Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tracker')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  04 / Application Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 14px',
              }}
            >
              Tools & Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <button onClick={() => navigate('/tools')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  Free Tools Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cover-letter')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  Cover Letter Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/linkedin')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  LinkedIn Optimizer
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  Methodology & Trust
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 14px',
              }}
            >
              Trust & Security
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <li>
                <button onClick={() => navigate('/privacy')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  Privacy Policy & Retention
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/help')} style={{ color: 'var(--rs-muted)', transition: 'color 0.2s' }}>
                  Help Center & FAQs
                </button>
              </li>
              <li style={{ color: 'var(--rs-green)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--rs-green)' }} />
                <span>Zero Data Scraping Policy</span>
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
            <span>WCAG 2.2 AA Validated</span>
            <span>Zero Hallucination Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
