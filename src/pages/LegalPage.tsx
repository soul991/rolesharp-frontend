import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { StatusBadge } from '../components/common/StatusBadge';
import { ShieldCheck, FileText } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const { currentPath } = useRouter();

  // If route is /terms, default to terms; otherwise privacy
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(
    currentPath === '/terms' ? 'terms' : 'privacy'
  );

  return (
    <AppShell title={activeTab === 'privacy' ? 'Privacy Policy & Data Retention' : 'Terms of Service'}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--rs-blue)',
              }}
            >
              LEGAL CONTRACTS & POLICIES
            </span>
            <StatusBadge status="success" label="Version 2026-v2 Active" />
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--rs-ink)',
              letterSpacing: '-0.03em',
            }}
          >
            {activeTab === 'privacy' ? 'Privacy Policy & Data Retention' : 'Terms of Service & Usage Charter'}
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
            Effective Date: November 01, 2026 · Governing Law: State of Delaware & GDPR / CCPA Compliant
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid var(--rs-line)',
            marginBottom: '28px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'privacy' ? '2px solid var(--rs-blue-strong)' : '2px solid transparent',
              color: activeTab === 'privacy' ? 'var(--rs-ink)' : 'var(--rs-muted)',
              fontSize: '14px',
              fontWeight: activeTab === 'privacy' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ShieldCheck size={16} />
            Privacy Policy 2026-v2
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'terms' ? '2px solid var(--rs-blue-strong)' : '2px solid transparent',
              color: activeTab === 'terms' ? 'var(--rs-ink)' : 'var(--rs-muted)',
              fontSize: '14px',
              fontWeight: activeTab === 'terms' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <FileText size={16} />
            Terms of Service 2026-v2
          </button>
        </div>

        {/* Content Container */}
        <div
          style={{
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-surface)',
            boxShadow: 'var(--rs-shadow)',
            fontSize: '14px',
            color: 'var(--rs-ink)',
            lineHeight: '1.7',
          }}
        >
          {activeTab === 'privacy' ? (
            <div>
              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                1. Our Core Privacy Commitment
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                RoleSharp collects only the minimum information necessary to calibrate and tailor your career documentation. We never sell, rent, or monetize your resume text or personal identity to third-party data brokers, recruitment agencies, or public training models.
              </p>

              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                2. In-Memory Diagnostic Audits
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                When you run an ATS analysis on `/checker` or evaluate text on `/cover-letter-analyzer`, the text payload is processed strictly in temporary volatile memory. Unsaved diagnostic runs leave zero persistent trace in our databases upon session completion.
              </p>

              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                3. Send-Only Mailbox Protocol
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                When connecting a send-only mailbox for Controlled Auto Apply, RoleSharp requests isolated OAuth SMTP send permissions. RoleSharp does not have, nor will ever request, read or search permissions to your private inbox or received emails.
              </p>

              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                4. Data Retention & Deletion Schedule
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                You retain complete ownership of your career assets. Clicking &ldquo;Delete Resume&rdquo; permanently purges the document and its compiled PDF/DOCX artifacts from our cloud storage within 60 seconds.
              </p>
            </div>
          ) : (
            <div>
              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                1. Acceptance of Terms & Verification
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                By creating a RoleSharp account or accessing our services, you agree to these Terms of Service (Version 2026-v2). Users must be at least 18 years of age or possess legal authorization to enter employment contracts in their primary hiring market.
              </p>

              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                2. Anti-Scraping & Ethical Automation Charter
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                Users agree not to use RoleSharp to launch unsolicited email blasts, scrape unauthorized third-party job boards, or circumvent captcha protection mechanisms. RoleSharp enforces human-in-the-loop approval on all outbound dispatches.
              </p>

              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                3. Subscription, Quotas & Refund Policy
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                Paid subscriptions (Professional Suite, Executive All-Access) renew automatically at the selected monthly or annual interval. Subscriptions can be canceled at any time with 1 click in your Billing settings. We offer a no-questions-asked 7-day full refund guarantee from initial charge.
              </p>

              <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                4. Ethical Scoring Standard Disclaimer
              </h2>
              <p style={{ margin: '0 0 20px', color: 'var(--rs-muted)' }}>
                Fit / Compatibility scores and Evidence Confidence metrics measure keyword coverage and evidence alignment against job descriptions. RoleSharp makes no representation, warranty, or guarantee regarding interview offers, hiring outcomes, or compensation levels.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};