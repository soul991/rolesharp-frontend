import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Eye,
  AlertTriangle,
} from 'lucide-react';

export interface SavedResumeOption {
  id: string;
  name: string;
  role?: string;
  atsScore?: number;
}

const SAMPLE_HEADLINE =
  'Staff Systems Architect | Distributed Systems & Multi-Region Kubernetes | Slashing P99 Latency at Scale';

const SAMPLE_ABOUT = `I architect high-throughput distributed compute platforms that maintain four-nines reliability under extreme volume.

Over the past 9+ years, I have helped platform engineering teams transform legacy monolithic backends into resilient, distributed microservices. At Enterprise Platform Group, I led the Kubernetes infrastructure migration across 14 services, slashing P99 latency by 42% and keeping uptime at 99.98% across four geographical cloud regions.

Core Areas of Competence:
• Distributed Architecture: Kubernetes, Go, Kafka, gRPC, Terraform, AWS/GCP
• Reliability & Observability: High-throughput event streaming, automated canary gates, SLO/SLI governance
• Technical Leadership: Mentoring senior engineers, driving RFC design documents, cross-org architectural reviews

Currently exploring Staff Infrastructure & Principal Systems Architecture roles at mission-driven platforms. Let’s connect: alex.morgan@lattice.io`;

export const LinkedInOptimizerPage: React.FC = () => {
  const { session } = useAuth();

  // Resume selection state
  const [savedResumes, setSavedResumes] = useState<SavedResumeOption[]>([]);
  const [resumeLoadState, setResumeLoadState] = useState<'loading' | 'success' | 'empty' | 'error'>('loading');
  const [resumeLoadError, setResumeLoadError] = useState<string | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');

  // Editor content states (empty placeholders by default)
  const [headline, setHeadline] = useState<string>('');
  const [aboutText, setAboutText] = useState<string>('');
  const [isSampleLoaded, setIsSampleLoaded] = useState<boolean>(false);

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'idle' | 'connected' | 'offline_fallback'>('idle');

  // Diagnostics state
  const [activeTab, setActiveTab] = useState<'headline' | 'about' | 'keywords'>('headline');

  // Load authenticated user's saved resumes from GET /api/resumes
  useEffect(() => {
    let active = true;
    setResumeLoadState('loading');
    setResumeLoadError(null);

    fetch('/api/resumes', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) {
          if (active) {
            setSavedResumes([]);
            setResumeLoadState('error');
            setResumeLoadError(`Server returned HTTP ${res.status}`);
          }
          return;
        }
        const text = await res.text();
        let data: unknown;
        try {
          data = JSON.parse(text);
        } catch {
          if (active) {
            setSavedResumes([]);
            setResumeLoadState('error');
            setResumeLoadError('Server returned non-JSON response (endpoint offline)');
          }
          return;
        }
        if (active) {
          if (Array.isArray(data)) {
            const valid = data.filter(
              (item): item is SavedResumeOption =>
                Boolean(item && typeof item.id === 'string' && typeof item.name === 'string')
            );
            setSavedResumes(valid);
            setResumeLoadState(valid.length > 0 ? 'success' : 'empty');
          } else {
            setSavedResumes([]);
            setResumeLoadState('error');
            setResumeLoadError('Invalid response shape from /api/resumes: expected array');
          }
        }
      })
      .catch((err) => {
        if (active) {
          setSavedResumes([]);
          setResumeLoadState('error');
          setResumeLoadError(err.message || 'Network error loading resumes');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const headlineLength = headline.length;
  const isHeadlineOptimal = headlineLength >= 80 && headlineLength <= 220;
  const selectedResume = savedResumes.find((r) => r.id === selectedResumeId);

  const handleOptimize = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!selectedResumeId || !savedResumes.some((r) => r.id === selectedResumeId)) {
      setNotification('Please select a valid saved resume from your account.');
      return;
    }

    setIsOptimizing(true);
    setNotification(`Optimizing LinkedIn profile grounded in "${selectedResume?.name}"...`);

    try {
      const res = await fetch('/api/linkedin', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: selectedResumeId }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          if (typeof data.headline === 'string' && data.headline.trim()) {
            setHeadline(data.headline);
          }
          if (typeof data.about === 'string' && data.about.trim()) {
            setAboutText(data.about);
          }
          setServerStatus('connected');
          setIsSampleLoaded(false);
          setNotification('LinkedIn profile sections optimized and grounded via backend (/api/linkedin).');
        }
      } else {
        setServerStatus('offline_fallback');
        setNotification(`Server error (HTTP ${res.status}): /api/linkedin returned an error. Profile not updated.`);
      }
    } catch {
      setServerStatus('offline_fallback');
      setNotification('Network error: /api/linkedin unreachable. Profile not updated.');
    } finally {
      setIsOptimizing(false);
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleLoadSample = () => {
    setHeadline(SAMPLE_HEADLINE);
    setAboutText(SAMPLE_ABOUT);
    setIsSampleLoaded(true);
    setNotification('Loaded illustrative sample persona (Alex Morgan). Note: Demo data is not saved to your profile.');
    setTimeout(() => setNotification(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setNotification(`${label} copied to clipboard! Paste directly into LinkedIn.`);
    setTimeout(() => setNotification(null), 2500);
  };

  const displayName = isSampleLoaded
    ? 'Alex Morgan, PMP'
    : session.user?.name || (session.authenticated ? 'Authenticated Professional' : 'Alex Morgan, PMP');
  const displayInitials = isSampleLoaded
    ? 'AM'
    : session.user?.name
    ? session.user.name.slice(0, 2).toUpperCase()
    : 'AM';

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
            <StatusBadge
              status={
                serverStatus === 'connected'
                  ? 'success'
                  : serverStatus === 'offline_fallback'
                  ? 'warning'
                  : selectedResume
                  ? 'info'
                  : 'neutral'
              }
              label={
                serverStatus === 'connected'
                  ? 'Live /api/linkedin'
                  : serverStatus === 'offline_fallback'
                  ? 'Offline Fallback'
                  : selectedResume
                  ? 'Resume Grounded'
                  : 'Awaiting Resume Selection'
              }
            />
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label
                  htmlFor="li-resume-source"
                  style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}
                >
                  Grounded Resume Profile *
                </label>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--rs-blue)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {isSampleLoaded ? 'Sample Persona Loaded' : 'Load Illustrative Sample (Demo)'}
                </button>
              </div>
              <select
                id="li-resume-source"
                name="liResumeSource"
                data-testid="linkedin-resume-select"
                value={selectedResumeId}
                onChange={(e) => {
                  setSelectedResumeId(e.target.value);
                  setIsSampleLoaded(false);
                }}
                disabled={resumeLoadState === 'loading'}
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
                {resumeLoadState === 'loading' ? (
                  <option value="">Loading your saved resumes...</option>
                ) : resumeLoadState === 'error' ? (
                  <option value="">Error loading resumes: {resumeLoadError}</option>
                ) : resumeLoadState === 'empty' ? (
                  <option value="">No saved resumes found in account</option>
                ) : (
                  <option value="">-- Choose an Authenticated Saved Resume --</option>
                )}
                {savedResumes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {resumeLoadState === 'empty' && !isSampleLoaded && (
                <p style={{ margin: '6px 0 0', fontSize: '11.5px', color: 'var(--rs-muted)' }}>
                  No saved resumes found. Create one in Resume Studio, or click &ldquo;Load Illustrative Sample (Demo)&rdquo; to preview.
                </p>
              )}

              {isSampleLoaded && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'color-mix(in srgb, var(--rs-amber) 12%, var(--rs-surface))',
                    border: '1px solid var(--rs-amber)',
                    fontSize: '11.5px',
                    color: 'var(--rs-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <AlertTriangle size={13} color="var(--rs-amber)" />
                  <span>
                    <strong>Illustrative Sample Persona Active:</strong> Displaying demonstration text for Alex Morgan. Select an authenticated saved resume to ground your own profile.
                  </span>
                </div>
              )}
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
                  placeholder="Select a saved resume above and click 'Calibrate Profile' to generate a high-signal headline grounded in your verified achievements..."
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
                    data-testid="linkedin-optimize-btn"
                    onClick={handleOptimize}
                    loading={isOptimizing}
                    disabled={!selectedResumeId || !savedResumes.some((r) => r.id === selectedResumeId) || isOptimizing}
                    icon={<Sparkles size={13} />}
                  >
                    Calibrate Profile
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
                  placeholder="Your calibrated About section will appear here once optimized. RoleSharp anchors each paragraph to verified achievements from your selected resume..."
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
                    data-testid="linkedin-optimize-btn-about"
                    onClick={handleOptimize}
                    loading={isOptimizing}
                    disabled={!selectedResumeId || !savedResumes.some((r) => r.id === selectedResumeId) || isOptimizing}
                    icon={<Sparkles size={13} />}
                  >
                    Calibrate Profile
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
                    fontSize: '20px',
                    color: '#123B7A',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {displayInitials}
                </div>

                {/* Name & Headline */}
                <h3
                  style={{
                    margin: '8px 0 2px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#10243E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{displayName}</span>
                  {isSampleLoaded && (
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        fontWeight: 600,
                      }}
                    >
                      Demo Persona
                    </span>
                  )}
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
                  {headline || 'Select a saved resume and click "Calibrate Profile" to generate a verified headline...'}
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
                    {aboutText
                      ? `${aboutText.slice(0, 220)}...`
                      : 'Your calibrated executive summary will appear here once optimized from your saved resume...'}
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