import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Search,
  MapPin,
  ExternalLink,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Clock,
  DollarSign,
} from 'lucide-react';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-Site';
  salary: string;
  freshness: string;
  sourceProvider: string;
  sourceUrl: string;
  snippet: string;
  requiredSkills: string[];
}

const SAMPLE_JOBS: JobPosting[] = [
  {
    id: 'job_stripe_01',
    title: 'Staff Infrastructure & Platform Lead',
    company: 'Stripe',
    location: 'San Francisco, CA / Remote (US)',
    workMode: 'Remote',
    salary: '$225,000 — $275,000 + Equity',
    freshness: 'Posted 2 hours ago',
    sourceProvider: 'Greenhouse',
    sourceUrl: 'https://stripe.com/jobs/staff-infrastructure-lead',
    snippet:
      'Own core compute orchestration platforms, multi-region Kubernetes clusters, and automated deployment canary gates for high-throughput financial infrastructure.',
    requiredSkills: ['Kubernetes', 'P99 Latency', 'Canary CI/CD', 'Distributed Systems'],
  },
  {
    id: 'job_datadog_02',
    title: 'Senior Distributed Systems Architect',
    company: 'Datadog',
    location: 'New York, NY / Hybrid',
    workMode: 'Hybrid',
    salary: '$210,000 — $255,000 + Equity',
    freshness: 'Verified today at 8:30 AM',
    sourceProvider: 'Lever',
    sourceUrl: 'https://datadoghq.com/careers/distributed-systems-architect',
    snippet:
      'Lead design of streaming telemetry pipelines processing petabytes per day. Focus on Kafka topology, memory efficiency, and real-time incident diagnostics.',
    requiredSkills: ['Kafka', 'Go', 'Telemetry', 'Scalability'],
  },
  {
    id: 'job_linear_03',
    title: 'Product Systems & Experience Lead',
    company: 'Linear',
    location: 'San Francisco, CA / Remote Global',
    workMode: 'Remote',
    salary: '$190,000 — $230,000 + Equity',
    freshness: 'Posted yesterday',
    sourceProvider: 'Ashby',
    sourceUrl: 'https://linear.app/careers/product-systems',
    snippet:
      'Craft high-fidelity application workflows, keyboard-first navigation, and synchronized collaborative state for engineering teams worldwide.',
    requiredSkills: ['UI Architecture', 'High-Density UX', 'TypeScript', 'State Sync'],
  },
  {
    id: 'job_figma_04',
    title: 'Senior Engineering Manager — Design Systems',
    company: 'Figma',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    salary: '$230,000 — $280,000 + Equity',
    freshness: 'Posted 2 days ago',
    sourceProvider: 'Greenhouse',
    sourceUrl: 'https://figma.com/careers/em-design-systems',
    snippet:
      'Guide 12 design systems engineers building multi-platform token architectures, accessibility tooling, and developer ecosystem SDKs.',
    requiredSkills: ['Design Systems', 'Leadership', 'Token Spec', 'Accessibility'],
  },
  {
    id: 'job_vercel_05',
    title: 'Principal Edge Infrastructure Architect',
    company: 'Vercel',
    location: 'Remote (Global)',
    workMode: 'Remote',
    salary: '$240,000 — $295,000 + Equity',
    freshness: 'Posted 3 days ago',
    sourceProvider: 'Ashby',
    sourceUrl: 'https://vercel.com/careers/edge-architect',
    snippet:
      'Architect globally distributed routing, serverless compute execution, and cold-start latency reduction across Vercel Edge Network.',
    requiredSkills: ['Edge Compute', 'V8 Isolates', 'DNS Routing', 'Next.js Runtime'],
  },
];

export const JobFinderPage: React.FC = () => {
  const { navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('all');
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredJobs = SAMPLE_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWorkMode =
      selectedWorkMode === 'all' || job.workMode.toLowerCase() === selectedWorkMode.toLowerCase();

    return matchesSearch && matchesWorkMode;
  });

  const handleSaveToTracker = (job: JobPosting) => {
    if (savedJobIds.includes(job.id)) {
      setSavedJobIds(savedJobIds.filter((id) => id !== job.id));
      setToastMessage(`Removed "${job.title} at ${job.company}" from Application Tracker.`);
    } else {
      setSavedJobIds([...savedJobIds, job.id]);
      setToastMessage(`Saved "${job.title} at ${job.company}" to Application Tracker (Saved column).`);
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTailorJob = (_job: JobPosting) => {
    navigate('/tailor');
  };

  return (
    <AppShell title="Opportunity Discovery & Job Finder">
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
              OPPORTUNITY ENGINE
            </span>
            <StatusBadge status="success" label="Direct ATS Links" />
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
            Verified Job Matches & Source Postings
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
            Direct employer postings aggregated without third-party scrapers. Every opportunity links to its verified origin.
          </p>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
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
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            padding: '16px 20px',
            borderRadius: '14px',
            backgroundColor: 'var(--rs-surface)',
            border: '1px solid var(--rs-line)',
            boxShadow: 'var(--rs-shadow)',
            marginBottom: '28px',
          }}
        >
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px' }}>
            <Search size={16} color="var(--rs-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, company, or technical competency..."
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--rs-ink)',
                fontSize: '13.5px',
              }}
            />
          </div>

          {/* Work Mode Toggle Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginRight: '4px' }}>
              Mode:
            </span>
            {['all', 'remote', 'hybrid', 'on-site'].map((mode) => {
              const active = selectedWorkMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedWorkMode(mode)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    border: active ? '1px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
                    backgroundColor: active ? 'var(--rs-blue-strong)' : 'var(--rs-surface-2)',
                    color: active ? '#FFFFFF' : 'var(--rs-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Postings Results List */}
        <div style={{ display: 'grid', gap: '18px' }}>
          {filteredJobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                style={{
                  borderRadius: '16px',
                  border: isSaved ? '1.5px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface)',
                  padding: '24px 28px',
                  boxShadow: 'var(--rs-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Top Row: Company, Title, Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--rs-blue-strong)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {job.company}
                      </span>
                      <span>·</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--rs-muted)' }}>
                        <Clock size={12} />
                        {job.freshness}
                      </span>
                      <span>·</span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--rs-surface-2)',
                          color: 'var(--rs-muted)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        via {job.sourceProvider}
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
                      {job.title}
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--rs-muted)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span>·</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--rs-ink)', fontWeight: 600 }}>
                        <DollarSign size={14} color="var(--rs-emerald)" />
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => handleSaveToTracker(job)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: isSaved ? '1px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
                        backgroundColor: isSaved ? 'color-mix(in srgb, var(--rs-blue-strong) 14%, var(--rs-surface))' : 'transparent',
                        color: isSaved ? 'var(--rs-blue-strong)' : 'var(--rs-muted)',
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

                    <Button size="sm" onClick={() => handleTailorJob(job)} icon={<Sparkles size={14} />}>
                      Tailor Resume
                    </Button>

                    <a
                      href={job.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid var(--rs-line)',
                        color: 'var(--rs-muted)',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                      title="Open original employer posting"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* Description Snippet */}
                <p style={{ margin: 0, fontSize: '13.5px', lineHeight: '1.5', color: 'var(--rs-ink)' }}>
                  {job.snippet}
                </p>

                {/* Skill Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {job.requiredSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--rs-surface-2)',
                        border: '1px solid var(--rs-line)',
                        color: 'var(--rs-ink)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
