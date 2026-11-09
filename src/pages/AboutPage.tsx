import React from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  ShieldCheck,
  Target,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <AppShell title="About RoleSharp & Methodological Manifesto">
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--rs-blue)',
              }}
            >
              MANIFESTO & PRINCIPLES
            </span>
            <StatusBadge status="success" label="Evidence-Grounded Engineering" />
          </div>
          <h1
            style={{
              margin: '0 0 10px',
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--rs-ink)',
              letterSpacing: '-0.03em',
            }}
          >
            The Anti-Slop, Evidence-First Career Platform
          </h1>
          <p style={{ margin: 0, color: 'var(--rs-muted)', fontSize: '16px', lineHeight: '1.6' }}>
            Why we rebuilt RoleSharp 2.0 from scratch: to banish hallucinated claims, robotic templates, and fake candidate metrics in favor of verified engineering precision.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-blue)', marginBottom: '14px' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              1. Zero Hallucination Guarantee
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.55' }}>
              We will never invent metrics, falsify company titles, or embellish project scopes. All calibrated bullet points are anchored strictly to verified candidate history.
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-amber)', marginBottom: '14px' }}>
              <Target size={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              2. Ethical Scoring Standard
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.55' }}>
              Fit / Compatibility and Evidence Confidence are strictly independent. We never phrase compatibility as a hiring or interview probability claim.
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-green)', marginBottom: '14px' }}>
              <Lock size={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              3. Anti-Scraping Integrity
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.55' }}>
              We do not scrape LinkedIn, bypass authentication walls, or abuse third-party APIs. Outbound applications require explicit one-time human review.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div
          style={{
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-surface)',
            boxShadow: 'var(--rs-shadow)',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--rs-ink)' }}>
            The Clean-Room Architectural Philosophy
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--rs-muted)', lineHeight: '1.7', margin: '0 0 16px' }}>
            Modern recruiting has been overwhelmed by automated spam and generic AI-generated templates. Candidate resumes look identical, buzzwords are copied without context, and hiring teams deploy aggressive filters to reject low-effort applications.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--rs-muted)', lineHeight: '1.7', margin: '0 0 20px' }}>
            RoleSharp 2.0 reverses this dynamic. We treat career documentation like software engineering: version-controlled, evidence-anchored, and parsed with deterministic ATS precision. By pairing editorial typography with human-reviewed diffs, candidates present genuine technical depth that cuts through recruiter skepticism.
          </p>
          <Button onClick={() => navigate('/tools')} icon={<ArrowRight size={15} />}>
            Explore Career Tools Suite
          </Button>
        </div>
      </div>
    </AppShell>
  );
};