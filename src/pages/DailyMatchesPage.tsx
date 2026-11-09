import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Sparkles,
  CheckCircle2,
  Bookmark,
  X,
  ExternalLink,
  PauseCircle,
  PlayCircle,
  Info,
  MapPin,
} from 'lucide-react';

export interface DailyMatchItem {
  id: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  freshness: string;
  sourceProvider: string;
  sourceUrl: string;
  compatibilityScore: number; // Fit
  evidenceConfidenceScore: number; // Completeness
  evidenceHighlights: string[];
  missingEvidenceNotes: string[];
}

const INITIAL_MATCHES: DailyMatchItem[] = [
  {
    id: 'dm_1',
    company: 'Stripe',
    role: 'Staff Infrastructure & Platform Lead',
    location: 'San Francisco, CA / Remote (US)',
    salary: '$225k — $275k + Equity',
    freshness: 'Delivered today at 9:00 AM',
    sourceProvider: 'Greenhouse',
    sourceUrl: 'https://stripe.com/jobs/staff-infrastructure-lead',
    compatibilityScore: 94,
    evidenceConfidenceScore: 88,
    evidenceHighlights: [
      'Multi-region Kubernetes architecture (Evidenced in Enterprise Platform Group)',
      'P99 latency reduction and automated canary CI/CD gates',
    ],
    missingEvidenceNotes: [
      'Stripe-specific financial ledger reconciliation proof (Recommend tailoring bullet 3)',
    ],
  },
  {
    id: 'dm_2',
    company: 'Datadog',
    role: 'Senior Systems Architect — Distributed Streaming',
    location: 'New York, NY / Hybrid',
    salary: '$210k — $255k + Equity',
    freshness: 'Delivered today at 9:00 AM',
    sourceProvider: 'Lever',
    sourceUrl: 'https://datadoghq.com/careers/distributed-systems-architect',
    compatibilityScore: 91,
    evidenceConfidenceScore: 86,
    evidenceHighlights: [
      'Kafka distributed event streaming handling 45k transactions/sec',
      'Go & PostgreSQL concurrency benchmarks verified',
    ],
    missingEvidenceNotes: [
      'Kernel-level eBPF tracing depth not explicitly referenced in master resume',
    ],
  },
  {
    id: 'dm_3',
    company: 'Linear',
    role: 'Product Systems & Experience Lead',
    location: 'San Francisco, CA / Remote Global',
    salary: '$190k — $230k + Equity',
    freshness: 'Delivered today at 9:00 AM',
    sourceProvider: 'Ashby',
    sourceUrl: 'https://linear.app/careers/product-systems',
    compatibilityScore: 89,
    evidenceConfidenceScore: 82,
    evidenceHighlights: [
      'High-density UI systems and state synchronization architecture',
      'Cross-functional leadership across product engineering squads',
    ],
    missingEvidenceNotes: [
      'Local-first SQLite / sync engine architecture proof suggested',
    ],
  },
];

export const DailyMatchesPage: React.FC = () => {
  const { navigate } = useRouter();

  const [matches, setMatches] = useState<DailyMatchItem[]>(INITIAL_MATCHES);
  const [isCampaignActive, setIsCampaignActive] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleDismiss = (id: string, title: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
    setNotification(`Dismissed "${title}". This recommendation will not appear in future digests.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveToTracker = (match: DailyMatchItem) => {
    if (savedIds.includes(match.id)) {
      setSavedIds(savedIds.filter((id) => id !== match.id));
      setNotification(`Removed "${match.role} at ${match.company}" from tracker.`);
    } else {
      setSavedIds([...savedIds, match.id]);
      setNotification(`Saved "${match.role} at ${match.company}" to Application Tracker.`);
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleCampaign = () => {
    setIsCampaignActive(!isCampaignActive);
    setNotification(
      isCampaignActive
        ? 'Daily match campaign paused. You will not receive morning digests.'
        : 'Daily match campaign resumed. Next digest scheduled for tomorrow at 9:00 AM.'
    );
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <AppShell title="Daily Opportunity Matches">
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Campaign Settings Header Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '20px 24px',
            borderRadius: '16px',
            backgroundColor: 'var(--rs-surface)',
            border: '1px solid var(--rs-line)',
            boxShadow: 'var(--rs-shadow)',
            marginBottom: '28px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--rs-blue-strong)',
                }}
              >
                Daily digest campaign
              </span>
              <StatusBadge
                status={isCampaignActive ? 'success' : 'neutral'}
                label={isCampaignActive ? 'Active · 9:00 AM Daily' : 'Paused'}
              />
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                fontWeight: 600,
                color: 'var(--rs-ink)',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Curated Opportunities for Master Profile (v3.2)
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--rs-muted)' }}>
              Calibrated against Staff/Principal titles in United States & Remote markets.
            </p>
          </div>

          <Button
            size="sm"
            variant={isCampaignActive ? 'secondary' : 'primary'}
            onClick={toggleCampaign}
            icon={isCampaignActive ? <PauseCircle size={15} /> : <PlayCircle size={15} />}
          >
            {isCampaignActive ? 'Pause Campaign' : 'Resume Campaign'}
          </Button>
        </div>

        {/* Regulatory & Ethical Calibration Notice */}
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '12px',
            backgroundColor: 'color-mix(in srgb, var(--rs-amber) 8%, var(--rs-surface))',
            border: '1px solid color-mix(in srgb, var(--rs-amber) 30%, var(--rs-line))',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <Info size={18} color="var(--rs-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '12.5px', color: 'var(--rs-ink)', lineHeight: '1.5' }}>
            <strong>Evidence Scoring Standard:</strong> Compatibility measures requirement coverage against published job specs. Evidence Confidence reflects verified proof in your active resume. <em>Neither metric constitutes an interview, referral, or hiring probability claim.</em>
          </div>
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

        {/* Matches List */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {matches.map((item) => {
            const isSaved = savedIds.includes(item.id);

            return (
              <div
                key={item.id}
                style={{
                  borderRadius: '16px',
                  border: isSaved ? '1.5px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface)',
                  padding: '28px',
                  boxShadow: 'var(--rs-shadow)',
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '18px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--rs-blue-strong)', textTransform: 'uppercase' }}>
                        {item.company}
                      </span>
                      <span>·</span>
                      <span style={{ fontSize: '11px', color: 'var(--rs-muted)' }}>
                        via {item.sourceProvider}
                      </span>
                      <span>·</span>
                      <span style={{ fontSize: '11px', color: 'var(--rs-muted)' }}>
                        {item.freshness}
                      </span>
                    </div>

                    <h2
                      style={{
                        margin: '0 0 6px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      {item.role}
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', fontSize: '12.5px', color: 'var(--rs-muted)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} />
                        {item.location}
                      </span>
                      <span>·</span>
                      <span style={{ fontWeight: 600, color: 'var(--rs-ink)' }}>
                        {item.salary}
                      </span>
                    </div>
                  </div>

                  {/* Two Independent Score Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Compatibility (Fit) Badge */}
                    <div
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--rs-surface-2)',
                        border: '1px solid var(--rs-line)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--rs-muted)', marginBottom: '2px' }}>
                        Role Fit
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 800, color: 'var(--rs-blue-strong)' }}>
                        {item.compatibilityScore}%
                      </div>
                    </div>

                    {/* Evidence Confidence (Completeness) Badge */}
                    <div
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--rs-surface-2)',
                        border: '1px solid var(--rs-line)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--rs-muted)', marginBottom: '2px' }}>
                        Evidence
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 800, color: 'var(--rs-emerald)' }}>
                        {item.evidenceConfidenceScore}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Alignment Breakdown */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '14px',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--rs-bg)',
                    border: '1px solid var(--rs-line)',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rs-emerald)', display: 'block', marginBottom: '6px' }}>
                      Verified Evidence Match
                    </span>
                    {item.evidenceHighlights.map((eh, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: 'var(--rs-ink)', marginBottom: '4px' }}>
                        ✓ {eh}
                      </div>
                    ))}
                  </div>

                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rs-amber)', display: 'block', marginBottom: '6px' }}>
                      Evidence Gap to Address
                    </span>
                    {item.missingEvidenceNotes.map((me, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                        ⚠️ {me}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--rs-blue)',
                        textDecoration: 'underline',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Inspect Source Posting
                      <ExternalLink size={13} />
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => handleDismiss(item.id, item.role)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid var(--rs-line)',
                        backgroundColor: 'transparent',
                        color: 'var(--rs-muted)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <X size={13} />
                      Dismiss
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSaveToTracker(item)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: isSaved ? '1px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
                        backgroundColor: isSaved ? 'color-mix(in srgb, var(--rs-blue-strong) 14%, var(--rs-surface))' : 'transparent',
                        color: isSaved ? 'var(--rs-blue-strong)' : 'var(--rs-ink)',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Bookmark size={14} />
                      {isSaved ? 'Saved in Tracker' : 'Save to Tracker'}
                    </button>

                    <Button
                      size="sm"
                      onClick={() => navigate('/tailor')}
                      icon={<Sparkles size={14} />}
                    >
                      Tailor Resume
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
