import React, { useState } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { ResumeWritingAnimation } from '../components/resume/ResumeWritingAnimation';
import {
  Sparkles,
  Check,
  X,
  Download,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface ProposedDiff {
  id: string;
  section: string;
  original: string;
  proposed: string;
  tag: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const INITIAL_DIFFS: ProposedDiff[] = [
  {
    id: 'diff_1',
    section: 'Experience · Staff Systems Architect (2022–Present)',
    original:
      'Led migration of enterprise services to cloud containers to improve resilience and reduce latency.',
    proposed:
      'Orchestrated multi-region Kubernetes migration of 14 core microservices, slashing P99 latency by 42% and raising service uptime to 99.98% across 4 production zones.',
    tag: '+Quantified P99 Latency & Uptime',
    status: 'pending',
  },
  {
    id: 'diff_2',
    section: 'Experience · Staff Systems Architect (2022–Present)',
    original:
      'Worked with product and platform teams to design automated testing pipelines and decrease production bugs.',
    proposed:
      'Engineered automated canary deployment gates and CI/CD pipelines, decreasing customer-impacting rollback incidents by 28% across 45 engineering contributors.',
    tag: '+CI/CD Canary Metrics',
    status: 'pending',
  },
  {
    id: 'diff_3',
    section: 'Experience · Senior Backend Engineer (2019–2022)',
    original:
      'Responsible for distributed data stores and scaling real-time transaction processing.',
    proposed:
      'Architected distributed event streaming architecture using Apache Kafka and PostgreSQL, processing 45k financial transactions per second with sub-50ms consistency.',
    tag: '+High-Throughput Concurrency',
    status: 'pending',
  },
];

export const ResumeTailorPage: React.FC = () => {
  // Job Context
  const [company, setCompany] = useState('Stripe');
  const [targetRole, setTargetRole] = useState('Staff Infrastructure & Platform Lead');
  const [country, setCountry] = useState('United States (Strict ATS)');
  const [jobDescription, setJobDescription] = useState(
    'We are looking for a Staff Infrastructure Lead to own our core distributed compute platform. Requirements: 8+ years experience with large-scale Kubernetes, P99 latency optimization, canary CI/CD deployments, and high-throughput transactional systems.'
  );

  // Flow States: 'input' | 'generating' | 'review'
  const [flowState, setFlowState] = useState<'input' | 'generating' | 'review'>('input');
  const [diffs, setDiffs] = useState<ProposedDiff[]>(INITIAL_DIFFS);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleStartTailoring = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowState('generating');
  };

  const handleAnimationComplete = () => {
    // Transition to grounded diff review
    setTimeout(() => {
      setFlowState('review');
    }, 600);
  };

  const handleAcceptDiff = (id: string) => {
    setDiffs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'accepted' } : d))
    );
  };

  const handleRejectDiff = (id: string) => {
    setDiffs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'rejected' } : d))
    );
  };

  const handleAcceptAll = () => {
    setDiffs((prev) => prev.map((d) => ({ ...d, status: 'accepted' })));
  };

  const handleExport = (format: 'PDF' | 'DOCX') => {
    setExportNotice(`Exporting tailored resume calibrated for ${company} (${format})...`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <AppShell title="Role-Specific Resume Tailor">
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--rs-blue-strong)',
              }}
            >
              Evidence-grounded tailoring
            </span>
            <StatusBadge status="success" label="Zero Hallucination Guarantee" />
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
            Job-Calibrated Resume Tailoring Studio
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px', lineHeight: 1.55 }}>
            Align your verified experience against target job requirements without fabricating credentials.
          </p>
        </div>

        {/* Temporary Notification */}
        {exportNotice && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, var(--rs-emerald) 14%, var(--rs-surface))',
              border: '1px solid var(--rs-emerald)',
              color: 'var(--rs-ink)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <Check size={16} color="var(--rs-emerald)" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* STAGE 1: JOB CONTEXT INPUT */}
        {flowState === 'input' && (
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '32px',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <form onSubmit={handleStartTailoring}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label
                    htmlFor="tailor-company"
                    style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', textTransform: 'uppercase', marginBottom: '6px' }}
                  >
                    Target Company *
                  </label>
                  <input
                    id="tailor-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Stripe, Datadog, Apple"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="tailor-role"
                    style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--rs-ink)', marginBottom: '6px' }}
                  >
                    Target role title *
                  </label>
                  <input
                    id="tailor-role"
                    type="text"
                    required
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Staff Infrastructure Lead"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="tailor-country"
                    style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--rs-ink)', marginBottom: '6px' }}
                  >
                    Application market *
                  </label>
                  <input
                    id="tailor-country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="tailor-jd"
                  style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--rs-ink)', marginBottom: '6px' }}
                >
                  Job description requirements *
                </label>
                <textarea
                  id="tailor-jd"
                  rows={6}
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description or responsibilities section (up to 20,000 characters)..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rs-muted)', fontSize: '12.5px' }}>
                  <AlertCircle size={15} />
                  <span>Consumes 1 tailoring allowance credit (HTTP 202 background queue)</span>
                </div>

                <Button type="submit" icon={<Sparkles size={16} />}>
                  Generate Tailored Draft
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* STAGE 2: SUPERDESIGN RESUME WRITING ANIMATION */}
        {flowState === 'generating' && (
          <div style={{ padding: '20px 0' }}>
            <ResumeWritingAnimation
              isGenerating={true}
              onComplete={handleAnimationComplete}
              speedMs={650}
              candidateName="Alex Morgan"
              targetRole={targetRole}
              company={company}
            />
          </div>
        )}

        {/* STAGE 3: GROUNDED DIFF REVIEW */}
        {flowState === 'review' && (
          <div>
            {/* Action Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '14px',
                backgroundColor: 'var(--rs-surface)',
                border: '1px solid var(--rs-line)',
                marginBottom: '24px',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Grounded Diff Review: {diffs.filter((d) => d.status === 'accepted').length} of {diffs.length} Accepted
                </div>
                <div style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                  Review each proposed bullet improvement before finalizing your export.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setFlowState('input')}
                  icon={<RotateCcw size={14} />}
                >
                  Reconfigure
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleAcceptAll}
                  icon={<Check size={14} />}
                >
                  Accept All
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleExport('PDF')}
                  icon={<Download size={14} />}
                >
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Diffs List */}
            <div style={{ display: 'grid', gap: '18px', marginBottom: '32px' }}>
              {diffs.map((diff) => {
                const isAccepted = diff.status === 'accepted';
                const isRejected = diff.status === 'rejected';

                return (
                  <div
                    key={diff.id}
                    style={{
                      borderRadius: '14px',
                      border: isAccepted
                        ? '1.5px solid var(--rs-emerald)'
                        : isRejected
                        ? '1px solid var(--rs-line)'
                        : '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-surface)',
                      padding: '20px',
                      boxShadow: 'var(--rs-shadow)',
                      opacity: isRejected ? 0.6 : 1,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rs-muted)' }}>
                        {diff.section}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--rs-surface-2)',
                          color: 'var(--rs-blue)',
                        }}
                      >
                        {diff.tag}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                      {/* Original */}
                      <div
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--rs-bg)',
                          borderLeft: '3px solid var(--rs-line)',
                          fontSize: '12.5px',
                          color: 'var(--rs-muted)',
                        }}
                      >
                        <strong style={{ display: 'block', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>
                          Original bullet
                        </strong>
                        {diff.original}
                      </div>

                      {/* Proposed */}
                      <div
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))',
                          borderLeft: '3px solid var(--rs-blue-strong)',
                          fontSize: '12.5px',
                          color: 'var(--rs-ink)',
                          fontWeight: 500,
                        }}
                      >
                        <strong style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--rs-blue-strong)', marginBottom: '4px' }}>
                          Grounded calibration
                        </strong>
                        {diff.proposed}
                      </div>
                    </div>

                    {/* Diff Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleRejectDiff(diff.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--rs-line)',
                          backgroundColor: isRejected ? 'var(--rs-surface-2)' : 'transparent',
                          color: isRejected ? 'var(--rs-ink)' : 'var(--rs-muted)',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <X size={13} />
                        Keep Original
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAcceptDiff(diff.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          border: isAccepted ? '1px solid var(--rs-emerald)' : '1px solid var(--rs-blue-strong)',
                          backgroundColor: isAccepted ? 'var(--rs-emerald)' : 'var(--rs-blue-strong)',
                          color: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Check size={13} />
                        {isAccepted ? 'Accepted' : 'Accept Calibration'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
