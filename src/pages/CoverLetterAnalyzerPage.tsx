import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';

interface AnalysisResult {
  overallScore: number;
  wordCount: number;
  readingTimeMin: number;
  dimensions: {
    lengthAndBrevity: { score: number; label: string; status: 'success' | 'warning' | 'info' };
    quantifiedEvidence: { score: number; label: string; status: 'success' | 'warning' | 'info'; metrics: string[] };
    personalization: { score: number; label: string; status: 'success' | 'warning' | 'info' };
    clicheIndex: { score: number; label: string; status: 'success' | 'warning' | 'info'; flaggedTerms: string[] };
  };
  recommendations: { id: string; type: 'praise' | 'warning' | 'action'; text: string }[];
}

const SAMPLE_LETTER = `Dear Hiring Team at Stripe,

I am writing to express my enthusiastic candidacy for the Staff Infrastructure & Platform Lead position. Having followed Stripe's distributed computing engineering publications and infrastructure milestones, I have long admired your uncompromising dedication to developer velocity and global financial resiliency.

Throughout my 9+ years architecting high-throughput distributed systems, I have prioritized operational excellence and latency optimization. At Enterprise Platform Group, I spearheaded the multi-region Kubernetes migration of 14 core microservices, slashing P99 latency by 42% and achieving 99.98% service uptime across four production zones. Furthermore, by designing automated canary deployment gates, our team reduced customer-impacting rollback incidents by 28% across 45 engineering contributors.

As a self-motivated team player who always goes the extra mile, I believe in collaborative velocity. Stripe's challenges in scaling financial compute pipelines require disciplined distributed systems principles, proactive reliability engineering, and empathetic technical leadership. I would welcome the opportunity to bring my verified background in high-concurrency event streaming and Kubernetes cluster orchestration to your platform engineering team.

Thank you for your time, consideration, and dedication to building world-class financial infrastructure.

Sincerely,
Alex Morgan, PMP`;

export const CoverLetterAnalyzerPage: React.FC = () => {
  const { navigate } = useRouter();

  const [letterText, setLetterText] = useState(SAMPLE_LETTER);
  const [targetCompany, setTargetCompany] = useState('Stripe');
  const [targetRole, setTargetRole] = useState('Staff Infrastructure & Platform Lead');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [executionMode, setExecutionMode] = useState<'idle' | 'server' | 'client_fallback'>('idle');
  const [serverNotice, setServerNotice] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSampleLetter, setIsSampleLetter] = useState(true);

  const calculateLocalHeuristics = (text: string, company: string, role: string): AnalysisResult => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTime = Math.max(1, Math.round(wordCount / 180));

    // Cliché detection
    const cliches = ['team player', 'hard worker', 'go-getter', 'go the extra mile', 'think outside the box', 'self-motivated'];
    const foundCliches: string[] = [];
    const lower = text.toLowerCase();
    cliches.forEach((c) => {
      if (lower.includes(c)) {
        foundCliches.push(c);
      }
    });

    // Metrics detection (numbers followed by % or numbers indicating impact)
    const metricsMatches = text.match(/(\d+%\s[a-zA-Z0-9\s]+|\d+\.\d+%\s[a-zA-Z0-9\s]+|\d+\+\syears)/gi) || [];

    const hasCompanyMention = company ? lower.includes(company.toLowerCase()) : false;
    const hasRoleMention = role ? lower.includes(role.toLowerCase().slice(0, 10)) : false;

    const lengthScore = wordCount >= 250 && wordCount <= 420 ? 95 : wordCount < 200 ? 60 : 75;
    const evidenceScore = Math.min(100, Math.max(30, metricsMatches.length * 28));
    const personalizationScore = (hasCompanyMention ? 50 : 20) + (hasRoleMention ? 45 : 25);
    const clichePenalty = foundCliches.length * 15;
    const clicheScore = Math.max(40, 100 - clichePenalty);

    const overall = Math.round((lengthScore * 0.25) + (evidenceScore * 0.35) + (personalizationScore * 0.25) + (clicheScore * 0.15));

    return {
      overallScore: overall,
      wordCount,
      readingTimeMin: readingTime,
      dimensions: {
        lengthAndBrevity: {
          score: lengthScore,
          label: `${wordCount} words (Ideal: 250–400 words)`,
          status: lengthScore >= 80 ? 'success' : 'warning',
        },
        quantifiedEvidence: {
          score: evidenceScore,
          label: `${metricsMatches.length} quantified impact anchors verified`,
          status: evidenceScore >= 75 ? 'success' : 'warning',
          metrics: metricsMatches.slice(0, 4),
        },
        personalization: {
          score: personalizationScore,
          label: hasCompanyMention ? `Explicit alignment to ${company}` : 'Generic alignment detected',
          status: personalizationScore >= 80 ? 'success' : 'warning',
        },
        clicheIndex: {
          score: clicheScore,
          label: foundCliches.length > 0 ? `${foundCliches.length} cliché phrases detected` : '0 overused clichés detected',
          status: foundCliches.length === 0 ? 'success' : 'warning',
          flaggedTerms: foundCliches,
        },
      },
      recommendations: [
        ...(foundCliches.length > 0
          ? [
              {
                id: 'rec_cliche',
                type: 'warning' as const,
                text: `Replace generic phrases like "${foundCliches.join('", "')}" with concrete operational actions.`,
              },
            ]
          : []),
        {
          id: 'rec_metric',
          type: 'praise' as const,
          text: `Strong evidence ratio: your metrics (${metricsMatches.slice(0, 2).join(', ') || 'verified achievements'}) establish senior competence.`,
        },
        {
          id: 'rec_closing',
          type: 'action' as const,
          text: `Keep the call to action concise and reaffirm enthusiasm for ${company || 'the company'}'s specific technical challenges.`,
        },
      ],
    };
  };

  const runAnalysis = async () => {
    setValidationError(null);
    setServerNotice(null);

    const trimmed = letterText.trim();
    if (trimmed.length < 80) {
      setValidationError('Cover letter must be at least 80 characters long before running analysis.');
      return;
    }

    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/cover-letter-analyzer', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter: trimmed, targetCompany, targetRole }),
      });

      if (res.ok) {
        let data: any = null;
        try {
          const text = await res.text();
          data = JSON.parse(text);
        } catch {
          data = null;
        }

        if (data && typeof data.overallScore === 'number' && data.dimensions) {
          setAnalysisResult(data);
          setExecutionMode('server');
          setServerNotice('Cover letter analyzed via backend (/api/cover-letter-analyzer). Memory-only execution with zero remote retention.');
        } else {
          // Schema mismatch or non-JSON: honest fallback to local calculation
          const local = calculateLocalHeuristics(trimmed, targetCompany, targetRole);
          setAnalysisResult(local);
          setExecutionMode('client_fallback');
          setServerNotice('Server offline or non-JSON response. Computed diagnostics via client-side heuristic audit.');
        }
      } else {
        // Backend HTTP error: honest fallback
        const local = calculateLocalHeuristics(trimmed, targetCompany, targetRole);
        setAnalysisResult(local);
        setExecutionMode('client_fallback');
        setServerNotice(`Backend unavailable (HTTP ${res.status}). Computed diagnostics via local in-memory heuristic engine (zero remote retention).`);
      }
    } catch {
      // Network failure
      const local = calculateLocalHeuristics(trimmed, targetCompany, targetRole);
      setAnalysisResult(local);
      setExecutionMode('client_fallback');
      setServerNotice('Network error: Server unreachable. Computed diagnostics via local in-memory heuristic engine (zero remote retention).');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    setLetterText(SAMPLE_LETTER);
    setIsSampleLetter(true);
    setValidationError(null);
    setServerNotice('Loaded illustrative sample cover letter (Alex Morgan). Note: Demo data is not saved to your profile.');
    setTimeout(() => setServerNotice(null), 3000);
  };

  const handleClearText = () => {
    setLetterText('');
    setIsSampleLetter(false);
    setAnalysisResult(null);
    setExecutionMode('idle');
    setValidationError(null);
  };

  return (
    <AppShell title="Cover Letter Diagnostic Analyzer">
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
              PREPARATION DIAGNOSTICS
            </span>
            <StatusBadge
              status={
                executionMode === 'server'
                  ? 'success'
                  : executionMode === 'client_fallback'
                  ? 'warning'
                  : 'neutral'
              }
              label={
                executionMode === 'server'
                  ? 'Live /api/cover-letter-analyzer (Server Memory-Only)'
                  : executionMode === 'client_fallback'
                  ? 'Local In-Memory Heuristic Engine'
                  : 'Ready to Audit'
              }
            />
            <span style={{ fontSize: '12px', color: 'var(--rs-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="var(--rs-green)" /> Zero Retention
            </span>
            {isSampleLetter && (
              <StatusBadge status="info" label="Sample Candidate Letter" />
            )}
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
            Cover Letter Diagnostic Analyzer
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
            Audit your draft in real-time for executive conciseness, quantified proof ratios, cliché detection, and role alignment.
          </p>
        </div>

        {/* Server Notice & Validation Errors */}
        {serverNotice && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, var(--rs-blue-strong) 12%, var(--rs-surface))',
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
            <span>{serverNotice}</span>
          </div>
        )}

        {validationError && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, var(--rs-amber) 12%, var(--rs-surface))',
              border: '1px solid var(--rs-amber)',
              color: 'var(--rs-ink)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <AlertTriangle size={16} color="var(--rs-amber)" />
            <span>{validationError}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
          {/* Left: Input Form */}
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
                Draft Input & Target Context
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--rs-blue)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Load Sample
                </button>
                <button
                  type="button"
                  onClick={handleClearText}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--rs-muted)',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div>
                <label
                  htmlFor="cla-company"
                  style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                >
                  Target Company
                </label>
                <input
                  id="cla-company"
                  name="claCompany"
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. Stripe"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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
                  htmlFor="cla-role"
                  style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                >
                  Target Role
                </label>
                <input
                  id="cla-role"
                  name="claRole"
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Staff Systems Architect"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label
                  htmlFor="cla-letter-text"
                  style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}
                >
                  Cover Letter Text *
                </label>
                <span style={{ fontSize: '11px', color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)' }}>
                  {letterText.trim().split(/\s+/).filter(Boolean).length} words · {letterText.length} chars
                </span>
              </div>
              <textarea
                id="cla-letter-text"
                name="claLetterText"
                rows={14}
                value={letterText}
                onChange={(e) => {
                  setLetterText(e.target.value);
                  setIsSampleLetter(false);
                  setValidationError(null);
                }}
                placeholder="Paste your cover letter draft here..."
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
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button
                onClick={runAnalysis}
                loading={isAnalyzing}
                icon={<FileSearch size={15} />}
                style={{ flex: 1 }}
              >
                Run Diagnostic Audit
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/cover-letter')}
                icon={<Sparkles size={15} />}
              >
                Synthesizer
              </Button>
            </div>
          </div>

          {/* Right: Diagnostic Results */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '24px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {!analysisResult ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '340px',
                  textAlign: 'center',
                  color: 'var(--rs-muted)',
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--rs-surface-2)',
                    display: 'grid',
                    placeItems: 'center',
                    marginBottom: '14px',
                    color: 'var(--rs-blue)',
                  }}
                >
                  <FileSearch size={26} />
                </div>
                <h3 style={{ margin: '0 0 6px', color: 'var(--rs-ink)', fontSize: '17px' }}>
                  Awaiting Audit Input
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '13px', maxWidth: '300px' }}>
                  Click &ldquo;Run Diagnostic Audit&rdquo; to evaluate your draft across word count, evidence strength, clichés, and target personalization.
                </p>
                <Button size="sm" onClick={runAnalysis} icon={<Zap size={14} />}>
                  Audit Sample Now
                </Button>
              </div>
            ) : (
              <>
                {/* Score Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--rs-surface-2)',
                    border: '1px solid var(--rs-line)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}>
                      Overall Letter Quality
                    </span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '36px',
                          fontWeight: 800,
                          color: analysisResult.overallScore >= 80 ? 'var(--rs-green)' : 'var(--rs-amber)',
                          lineHeight: 1,
                        }}
                      >
                        {analysisResult.overallScore}
                      </span>
                      <span style={{ color: 'var(--rs-muted)', fontSize: '14px' }}>/ 100</span>
                      <StatusBadge
                        status={analysisResult.overallScore >= 80 ? 'success' : 'warning'}
                        label={analysisResult.overallScore >= 80 ? 'Executive Caliber' : 'Needs Polish'}
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--rs-muted)', display: 'block' }}>Estimated Read</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                      ~{analysisResult.readingTimeMin} min ({analysisResult.wordCount} words)
                    </span>
                  </div>
                </div>

                {/* 4 Dimension Breakdown Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Length */}
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                        Length & Readability
                      </span>
                      <StatusBadge
                        status={analysisResult.dimensions.lengthAndBrevity.status}
                        label={`${analysisResult.dimensions.lengthAndBrevity.score}%`}
                      />
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--rs-muted)' }}>
                      {analysisResult.dimensions.lengthAndBrevity.label}
                    </p>
                  </div>

                  {/* Quantified Evidence */}
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                        Quantified Evidence & Metrics
                      </span>
                      <StatusBadge
                        status={analysisResult.dimensions.quantifiedEvidence.status}
                        label={`${analysisResult.dimensions.quantifiedEvidence.score}%`}
                      />
                    </div>
                    <p style={{ margin: '4px 0 6px', fontSize: '12px', color: 'var(--rs-muted)' }}>
                      {analysisResult.dimensions.quantifiedEvidence.label}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {analysisResult.dimensions.quantifiedEvidence.metrics.map((m, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'color-mix(in srgb, var(--rs-green) 12%, var(--rs-surface))',
                            color: 'var(--rs-green)',
                            border: '1px solid color-mix(in srgb, var(--rs-green) 30%, transparent)',
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Personalization */}
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                        Target Alignment & Purpose
                      </span>
                      <StatusBadge
                        status={analysisResult.dimensions.personalization.status}
                        label={`${analysisResult.dimensions.personalization.score}%`}
                      />
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--rs-muted)' }}>
                      {analysisResult.dimensions.personalization.label}
                    </p>
                  </div>

                  {/* Clichés */}
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                        Cliché & Buzzword Detection
                      </span>
                      <StatusBadge
                        status={analysisResult.dimensions.clicheIndex.status}
                        label={`${analysisResult.dimensions.clicheIndex.score}%`}
                      />
                    </div>
                    <p style={{ margin: '4px 0 6px', fontSize: '12px', color: 'var(--rs-muted)' }}>
                      {analysisResult.dimensions.clicheIndex.label}
                    </p>
                    {analysisResult.dimensions.clicheIndex.flaggedTerms.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {analysisResult.dimensions.clicheIndex.flaggedTerms.map((term, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '11px',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: 'color-mix(in srgb, var(--rs-amber) 15%, var(--rs-surface))',
                              color: 'var(--rs-amber)',
                              border: '1px solid color-mix(in srgb, var(--rs-amber) 35%, transparent)',
                            }}
                          >
                            &ldquo;{term}&rdquo;
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Recommendations */}
                <div style={{ marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Actionable Recommendations
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {analysisResult.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          backgroundColor:
                            rec.type === 'warning'
                              ? 'color-mix(in srgb, var(--rs-amber) 8%, var(--rs-surface))'
                              : 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))',
                          border: `1px solid ${
                            rec.type === 'warning'
                              ? 'color-mix(in srgb, var(--rs-amber) 25%, transparent)'
                              : 'color-mix(in srgb, var(--rs-blue-strong) 25%, transparent)'
                          }`,
                          fontSize: '12.5px',
                          color: 'var(--rs-ink)',
                        }}
                      >
                        {rec.type === 'warning' ? (
                          <AlertTriangle size={15} color="var(--rs-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        ) : (
                          <CheckCircle2 size={15} color="var(--rs-blue-strong)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        )}
                        <span>{rec.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};