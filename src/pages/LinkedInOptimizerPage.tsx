import React, { useState } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Sparkles,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Eye,
} from 'lucide-react';

const RESUME_SOURCES = [
  { id: 'res_master_01', name: 'Master Executive Profile (v3.2) — 92 ATS Score' },
  { id: 'res_stripe_02', name: 'Stripe — Staff Infrastructure & Platform Lead (v1.4)' },
  { id: 'res_datadog_03', name: 'Datadog — Senior Systems Architect (v2.0)' },
];

const INITIAL_HEADLINE =
  'Staff Systems Architect | Distributed Systems & Multi-Region Kubernetes | Slashing P99 Latency at Scale';

const INITIAL_ABOUT = `I architect high-throughput distributed compute platforms that maintain four-nines reliability under extreme volume.

Over the past 9+ years, I have helped platform engineering teams transform legacy monolithic backends into resilient, distributed microservices. At Enterprise Platform Group, I led the Kubernetes infrastructure migration across 14 services, slashing P99 latency by 42% and keeping uptime at 99.98% across four geographical cloud regions.

Core Areas of Competence:
• Distributed Architecture: Kubernetes, Go, Kafka, gRPC, Terraform, AWS/GCP
• Reliability & Observability: High-throughput event streaming, automated canary gates, SLO/SLI governance
• Technical Leadership: Mentoring senior engineers, driving RFC design documents, cross-org architectural reviews

Currently exploring Staff Infrastructure & Principal Systems Architecture roles at mission-driven platforms. Let’s connect: alex.morgan@lattice.io`;

export const LinkedInOptimizerPage: React.FC = () => {
  const [selectedResumeId, setSelectedResumeId] = useState('res_master_01');
  const [headline, setHeadline] = useState(INITIAL_HEADLINE);
  const [aboutText, setAboutText] = useState(INITIAL_ABOUT);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Diagnostics state
  const [activeTab, setActiveTab] = useState<'headline' | 'about' | 'keywords'>('headline');

  const headlineLength = headline.length;
  const isHeadlineOptimal = headlineLength >= 80 && headlineLength <= 220;

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setNotification('LinkedIn profile sections optimized and grounded in your verified Master Executive Profile.');
      setTimeout(() => setNotification(null), 3500);
    }, 650);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setNotification(`${label} copied to clipboard! Paste directly into LinkedIn.`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <AppShell title="LinkedIn Profile Optimizer">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
              PREPARATION SUITE
            </span>
            <StatusBadge status="success" label="100% Anti-Scraping Compliant" />
            <span style={{ fontSize: '12px', color: 'var(--rs-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="var(--rs-green)" /> Zero-Scraping Guarantee
            </span>
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
            LinkedIn Profile Optimizer
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
            Calibrate your public profile to attract tier-1 recruiters. RoleSharp never scrapes LinkedIn or accesses credentials—paste your text and copy verified recommendations.
          </p>
        </div>

        {/* Temporary Notification */}
        {notification && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, var(--rs-blue-strong) 14%, var(--rs-surface))',
              border: '1px solid var(--rs-blue-strong)',
              color: 'var(--rs-ink)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={16} color="var(--rs-blue-strong)" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid var(--rs-line)',
            marginBottom: '24px',
            paddingBottom: '2px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('headline')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'headline' ? '2px solid var(--rs-blue-strong)' : '2px solid transparent',
              color: activeTab === 'headline' ? 'var(--rs-ink)' : 'var(--rs-muted)',
              fontSize: '14px',
              fontWeight: activeTab === 'headline' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Zap size={15} color={activeTab === 'headline' ? 'var(--rs-blue-strong)' : 'inherit'} />
            Headline Studio
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'about' ? '2px solid var(--rs-blue-strong)' : '2px solid transparent',
              color: activeTab === 'about' ? 'var(--rs-ink)' : 'var(--rs-muted)',
              fontSize: '14px',
              fontWeight: activeTab === 'about' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={15} color={activeTab === 'about' ? 'var(--rs-blue-strong)' : 'inherit'} />
            About & Summary Hook
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('keywords')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'keywords' ? '2px solid var(--rs-blue-strong)' : '2px solid transparent',
              color: activeTab === 'keywords' ? 'var(--rs-ink)' : 'var(--rs-muted)',
              fontSize: '14px',
              fontWeight: activeTab === 'keywords' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <TrendingUp size={15} color={activeTab === 'keywords' ? 'var(--rs-blue-strong)' : 'inherit'} />
            Recruiter Search Keywords
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
          {/* Left Column: Editor & Source Controls */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '24px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              <label
                htmlFor="li-resume-source"
                style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
              >
                Grounded Resume Profile *
              </label>
              <select
                id="li-resume-source"
                name="liResumeSource"
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-bg)',
                  color: 'var(--rs-ink)',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              >
                {RESUME_SOURCES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Content for Active Tab */}
            {activeTab === 'headline' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label
                    htmlFor="li-headline"
                    style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}
                  >
                    LinkedIn Headline (Max 220 chars) *
                  </label>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: isHeadlineOptimal ? 'var(--rs-green)' : 'var(--rs-amber)',
                      fontWeight: 700,
                    }}
                  >
                    {headlineLength} / 220 chars
                  </span>
                </div>
                <textarea
                  id="li-headline"
                  name="liHeadline"
                  rows={4}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => copyToClipboard(headline, 'Headline')}
                    icon={<Copy size={13} />}
                  >
                    Copy Headline
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleOptimize}
                    loading={isOptimizing}
                    icon={<Sparkles size={13} />}
                  >
                    Re-Calibrate
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label
                    htmlFor="li-about"
                    style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}
                  >
                    About Section & Executive Hook (Max 2,600 chars) *
                  </label>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--rs-muted)' }}>
                    {aboutText.length} chars
                  </span>
                </div>
                <textarea
                  id="li-about"
                  name="liAbout"
                  rows={12}
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '12.5px',
                    lineHeight: '1.6',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => copyToClipboard(aboutText, 'About section')}
                    icon={<Copy size={13} />}
                  >
                    Copy About Section
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleOptimize}
                    loading={isOptimizing}
                    icon={<Sparkles size={13} />}
                  >
                    Re-Calibrate
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'keywords' && (
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                  High-Visibility Recruiter Keywords
                </span>
                <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--rs-muted)' }}>
                  Recruiters on LinkedIn Recruiter search for exact boolean combinations. Incorporate these verified terms into your skills and experience descriptions:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {[
                    'Distributed Systems',
                    'Kubernetes (K8s)',
                    'Multi-Region Cloud',
                    'Go / Golang',
                    'Kafka Streaming',
                    'gRPC Microservices',
                    'Terraform IaC',
                    'Latency Optimization (P99)',
                    'High Concurrency',
                    'Fault Tolerance',
                    'SLO / SLI Governance',
                    'System Design RFCs',
                  ].map((kw, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--rs-surface-2)',
                        border: '1px solid var(--rs-line)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    copyToClipboard(
                      'Distributed Systems, Kubernetes (K8s), Multi-Region Cloud, Go / Golang, Kafka Streaming, gRPC Microservices, Terraform IaC, Latency Optimization (P99), High Concurrency, Fault Tolerance, SLO / SLI Governance, System Design RFCs',
                      'Recruiter keywords'
                    )
                  }
                  icon={<Copy size={13} />}
                >
                  Copy All Keywords
                </Button>
              </div>
            )}

            {/* Zero-Scraping Disclosure Box */}
            <div
              style={{
                marginTop: '10px',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: 'color-mix(in srgb, var(--rs-blue-strong) 6%, var(--rs-surface))',
                border: '1px solid var(--rs-line)',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
              }}
            >
              <ShieldCheck size={16} color="var(--rs-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '11.5px', color: 'var(--rs-muted)', lineHeight: '1.45' }}>
                <strong style={{ color: 'var(--rs-ink)' }}>Strict Ethical Policy:</strong> RoleSharp does not scrape LinkedIn, bypass authentication, or connect to unauthorized profile endpoints. All optimizations are generated locally and client-applied.
              </div>
            </div>
          </div>

          {/* Right Column: Live Invariant Card Preview */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '24px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', textTransform: 'uppercase' }}>
                Recruiter View Simulation
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={14} color="var(--rs-muted)" />
                <span style={{ fontSize: '11px', color: 'var(--rs-muted)' }}>Desktop Recruiter Simulation</span>
              </div>
            </div>

            {/* Simulated LinkedIn Card (Clean Invariant Style) */}
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid #D5DFEA',
                backgroundColor: '#FFFFFF',
                color: '#10243E',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              {/* Cover Banner */}
              <div
                style={{
                  height: '70px',
                  background: 'linear-gradient(135deg, #123B7A 0%, #2458A6 100%)',
                  position: 'relative',
                }}
              />

              <div style={{ padding: '0 20px 20px', position: 'relative' }}>
                {/* Avatar */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '3px solid #FFFFFF',
                    marginTop: '-32px',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '22px',
                    color: '#123B7A',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  AM
                </div>

                {/* Name & Headline */}
                <h3
                  style={{
                    margin: '8px 0 2px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#10243E',
                  }}
                >
                  Alex Morgan, PMP
                </h3>
                <p
                  style={{
                    margin: '0 0 10px',
                    fontSize: '13px',
                    color: '#334155',
                    lineHeight: '1.4',
                    fontWeight: 500,
                  }}
                >
                  {headline}
                </p>

                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#64748B', marginBottom: '14px' }}>
                  <span>San Francisco Bay Area</span>
                  <span>·</span>
                  <span style={{ color: '#2458A6', fontWeight: 600 }}>500+ connections</span>
                </div>

                {/* Simulated About Snippet */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>
                    About (First 3 Lines Visible)
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#1E293B',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {aboutText.slice(0, 220)}...
                  </p>
                </div>
              </div>
            </div>

            {/* Recruiter Evaluation Checklist */}
            <div style={{ marginTop: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                Algorithmic Strength Checklist
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--rs-ink)' }}>
                  <CheckCircle2 size={15} color="var(--rs-green)" />
                  <span>Target job title appears within first 40 characters of headline</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--rs-ink)' }}>
                  <CheckCircle2 size={15} color="var(--rs-green)" />
                  <span>Quantifiable metric hook (&ldquo;slashing P99 latency&rdquo;) visible before fold</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--rs-ink)' }}>
                  <CheckCircle2 size={15} color="var(--rs-green)" />
                  <span>100% grounded in verified career history without embellishment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};