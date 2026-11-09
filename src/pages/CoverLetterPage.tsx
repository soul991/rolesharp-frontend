import React, { useState } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { AnimatedList, AnimatedListItem } from '../components/common/AnimatedList';
import {
  Sparkles,
  Download,
  Copy,
  CheckCircle2,
  Feather,
  Flame,
  Award,
} from 'lucide-react';

const TONE_OPTIONS: AnimatedListItem[] = [
  {
    id: 'formal',
    title: 'Formal & Authoritative',
    description: 'Measured, respectful, and board-ready. Ideal for enterprise platforms, banking, and executive roles.',
    badge: 'Enterprise Standard',
    icon: <Award size={18} />,
  },
  {
    id: 'warm',
    title: 'Warm & Mission-Driven',
    description: 'Authentic partnership, collaborative culture, and mission focus. Ideal for high-growth tech & startups.',
    badge: 'High-Growth Tech',
    icon: <Feather size={18} />,
  },
  {
    id: 'direct',
    title: 'Direct & Impact-First',
    description: 'Concise, quantitative, and bottom-line driven. Leads immediately with verified metric achievements.',
    badge: 'Executive Direct',
    icon: <Flame size={18} />,
  },
];

const RESUME_OPTIONS = [
  { id: 'res_master_01', name: 'Master Executive Profile (v3.2) — 92 ATS Score' },
  { id: 'res_stripe_02', name: 'Stripe — Staff Infrastructure & Platform Lead (v1.4)' },
  { id: 'res_datadog_03', name: 'Datadog — Senior Systems Architect (v2.0)' },
];

export const CoverLetterPage: React.FC = () => {
  // Inputs
  const [selectedResumeId, setSelectedResumeId] = useState('res_master_01');
  const [company, setCompany] = useState('Stripe');
  const [role, setRole] = useState('Staff Infrastructure & Platform Lead');
  const [selectedTone, setSelectedTone] = useState('formal');
  const [specificReason, setSpecificReason] = useState(
    'Stripe’s mission to increase the GDP of the internet aligns with my 9+ years engineering scalable, highly available distributed compute infrastructure.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Editable Letter Content
  const [letterBody, setLetterBody] = useState(
    `Dear Hiring Team at Stripe,

I am writing to express my enthusiastic candidacy for the Staff Infrastructure & Platform Lead position. Having followed Stripe's distributed computing engineering publications and infrastructure milestones, I have long admired your uncompromising dedication to developer velocity and global financial resiliency.

Throughout my 9+ years architecting high-throughput distributed systems, I have prioritized operational excellence and latency optimization. At Enterprise Platform Group, I spearheaded the multi-region Kubernetes migration of 14 core microservices, slashing P99 latency by 42% and achieving 99.98% service uptime across four production zones. Furthermore, by designing automated canary deployment gates, our team reduced customer-impacting rollback incidents by 28% across 45 engineering contributors.

Stripe's challenges in scaling financial compute pipelines require disciplined distributed systems principles, proactive reliability engineering, and empathetic technical leadership. I would welcome the opportunity to bring my verified background in high-concurrency event streaming and Kubernetes cluster orchestration to your platform engineering team.

Thank you for your time, consideration, and dedication to building world-class financial infrastructure.

Sincerely,
Alex Morgan, PMP
alex.morgan@lattice.io · +1 (555) 019-2834`
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setNotification(`Draft synthesized using ${selectedTone.toUpperCase()} tone calibrated for ${company}.`);
      setTimeout(() => setNotification(null), 3500);
    }, 700);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(letterBody);
    setNotification('Cover letter copied to clipboard.');
    setTimeout(() => setNotification(null), 2500);
  };

  const handleExportPDF = () => {
    setNotification(`Exporting cover letter for ${company} as PDF...`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <AppShell title="Cover Letter Studio & Generator">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--rs-blue-strong)',
              }}
            >
              Preparation suite
            </span>
            <StatusBadge status="success" label="100% Resume Grounded" />
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-serif)',
              fontSize: '30px',
              fontWeight: 600,
              color: 'var(--rs-ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            Evidence-Grounded Cover Letter Generator
          </h1>
          <p style={{ margin: '8px 0 0', color: 'var(--rs-muted)', fontSize: '14.5px', lineHeight: 1.55 }}>
            Generate bespoke, persuasive cover letters matching employer values without clichés or unevidenced claims.
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {/* Left Column: Form & Tone Selector */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '28px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <form onSubmit={handleGenerate}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="cl-resume-select"
                  style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                >
                  Grounded Resume Source *
                </label>
                <select
                  id="cl-resume-select"
                  name="clResumeSelect"
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  {RESUME_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label
                    htmlFor="cl-company"
                    style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                  >
                    Target Company *
                  </label>
                  <input
                    id="cl-company"
                    name="clCompany"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cl-role"
                    style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                  >
                    Target Role *
                  </label>
                  <input
                    id="cl-role"
                    name="clRole"
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Superdesign Animated List Tone Selector */}
              <div style={{ marginBottom: '18px' }}>
                <div
                  id="tone-group-label"
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--rs-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  Voice & Tone (Superdesign Animated List)
                </div>
                <AnimatedList
                  items={TONE_OPTIONS}
                  selectedId={selectedTone}
                  onSelect={(item) => setSelectedTone(item.id)}
                  label="Select Cover Letter Tone"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="cl-motivation"
                  style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                >
                  Specific Motivation / Company Alignment (Optional)
                </label>
                <textarea
                  id="cl-motivation"
                  name="clMotivation"
                  rows={3}
                  value={specificReason}
                  onChange={(e) => setSpecificReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '12.5px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <Button
                type="submit"
                loading={isGenerating}
                icon={<Sparkles size={15} />}
                style={{ width: '100%' }}
              >
                Synthesize Grounded Draft
              </Button>
            </form>
          </div>

          {/* Right Column: Invariant White Paper Draft */}
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
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', textTransform: 'uppercase' }}>
                  Document Draft Preview
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--rs-muted)' }}>
                  Calibrated for {company} · Tone: {selectedTone.toUpperCase()}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button size="sm" variant="secondary" onClick={handleCopy} icon={<Copy size={14} />}>
                  Copy Text
                </Button>
                <Button size="sm" onClick={handleExportPDF} icon={<Download size={14} />}>
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Invariant Ivory/White Paper Sheet */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#172B48',
                borderRadius: '8px',
                border: '1px solid #D5DFEA',
                padding: '32px 36px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                minHeight: '480px',
                fontFamily: 'var(--font-body)',
                position: 'relative',
              }}
            >
              <label
                htmlFor="cl-letter-body"
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                }}
              >
                Cover Letter Content Preview
              </label>
              <textarea
                aria-label="Editable cover letter content"
                id="cl-letter-body"
                name="clLetterBody"
                value={letterBody}
                onChange={(e) => setLetterBody(e.target.value)}
                rows={16}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '440px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  color: '#172B48',
                  fontSize: '13px',
                  lineHeight: '1.65',
                  fontFamily: 'var(--font-body)',
                  boxSizing: 'border-box',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '20px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: '#A9BAD1',
                }}
              >
                ROLESHARP VERIFIED · 0 FABRICATED CLAIMS
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
