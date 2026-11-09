import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  Clock,
  Copy,
  ShieldCheck,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  AlertCircle,
  FileText,
  Sparkles,
} from 'lucide-react';

export interface SavedResumeOption {
  id: string;
  name: string;
  role?: string;
  atsScore?: number;
  version?: string;
}

interface InterviewQuestion {
  id: string;
  category: 'System Architecture' | 'Behavioral & Leadership' | 'Execution & Delivery';
  question: string;
  rationale: string;
  resumeAnchor: string;
  modelAnswer: string;
  keyTalkingPoints: string[];
  rehearsed: boolean;
}

export const DEFAULT_SAVED_RESUMES: SavedResumeOption[] = [
  {
    id: 'res_master_01',
    name: 'Master Executive Profile (v3.2) — 92 ATS Score',
    role: 'Staff Systems Architect',
    atsScore: 92,
    version: 'v3.2',
  },
  {
    id: 'res_stripe_02',
    name: 'Stripe — Staff Infrastructure & Platform Lead (v1.4)',
    role: 'Staff Infrastructure Lead',
    atsScore: 89,
    version: 'v1.4',
  },
  {
    id: 'res_datadog_03',
    name: 'Datadog — Senior Systems Architect (v2.0)',
    role: 'Senior Systems Architect',
    atsScore: 86,
    version: 'v2.0',
  },
];

const MASTER_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q1',
    category: 'System Architecture',
    question: 'How did you approach migrating 14 core microservices to Kubernetes while maintaining 99.98% uptime?',
    rationale: 'Directly validates your claimed headline metric from Enterprise Platform Group.',
    resumeAnchor: 'spearheaded multi-region Kubernetes migration of 14 core microservices, slashing P99 latency by 42%',
    modelAnswer:
      'We initiated the migration by decomposing our dependencies into three risk tiers. Before redirecting any customer traffic, we instituted automated canary deployment gates that mirrored 2% of live ingress traffic to shadow pods. We monitored error budgets and P99 latency via Prometheus and Grafana alerts before expanding the traffic envelope in 10% increments.',
    keyTalkingPoints: [
      'Risk tiering for microservice dependencies',
      'Automated canary deployment gates with 2% shadow traffic',
      'Continuous SLO/error-budget tracking before traffic elevation',
      'Zero-downtime DNS failover mechanism',
    ],
    rehearsed: true,
  },
  {
    id: 'q2',
    category: 'System Architecture',
    question: 'When optimizing for P99 latency, what specific bottlenecks did you uncover in your distributed event streams?',
    rationale: 'Tests your deep knowledge of Kafka partitioning, consumer group rebalancing, and serialization overhead.',
    resumeAnchor: 'high-concurrency event streaming and Kafka cluster optimization',
    modelAnswer:
      'Our primary bottleneck was consumer group rebalancing storms during autoscaling events. By tuning heartbeat intervals, migrating to cooperative sticky assignors, and optimizing batch compression using zstd, we reduced tail latencies significantly while preventing partition lockups.',
    keyTalkingPoints: [
      'Cooperative sticky assignors to eliminate stop-the-world rebalances',
      'Batch compression tuning with zstd',
      'Partition count alignment with consumer concurrency',
    ],
    rehearsed: false,
  },
  {
    id: 'q3',
    category: 'Execution & Delivery',
    question: 'Tell me about a time an automated deployment gate caught a critical regression before production impact.',
    rationale: 'Demonstrates defensive engineering and practical ROI from your 28% rollback incident reduction.',
    resumeAnchor: 'designed automated canary deployment gates, reducing rollback incidents by 28%',
    modelAnswer:
      'During a platform release, an updated billing serialization library introduced an unindexed database query that degraded latency under simulated peak load. Our canary gate detected a 18% spike in database connection pool saturation on the 2% canary tier, automatically aborting the rollout within 45 seconds without customer-visible errors.',
    keyTalkingPoints: [
      'Automated abort criteria based on pool saturation metrics',
      '45-second automated rollback without manual human panic',
      'Follow-up blameless post-mortem with cross-team remediation',
    ],
    rehearsed: true,
  },
  {
    id: 'q4',
    category: 'Behavioral & Leadership',
    question: 'How do you foster alignment across 45 engineering contributors when introducing strict infrastructure guardrails?',
    rationale: 'Validates executive presence and technical leadership without authoritarian friction.',
    resumeAnchor: 'collaborated across 45 engineering contributors and cross-functional teams',
    modelAnswer:
      'I avoid imposing top-down mandates. Instead, I write lightweight RFCs and establish an internal architecture guild where team leads review proposed guardrails. We focus on developer experience first—ensuring local tooling and automated CI checks give immediate, helpful feedback rather than late-stage rejections.',
    keyTalkingPoints: [
      'RFC design documents with open stakeholder review',
      'Architecture guild for decentralized ownership',
      'Developer experience (DevEx) focus with fast feedback in local environments',
    ],
    rehearsed: false,
  },
  {
    id: 'q5',
    category: 'Behavioral & Leadership',
    question: 'Describe a situation where you had to push back on a product deadline for infrastructure stability reasons.',
    rationale: 'Evaluates your spine, diplomatic communication, and business-focused trade-off justification.',
    resumeAnchor: 'maintained 99.98% production uptime across four geographical cloud regions',
    modelAnswer:
      'Ahead of a major quarterly customer onboarding, product wanted to skip staging load tests. I framed the risk in business terms—projecting that our database sharding limits would hit capacity at 120% of estimated volume, causing revenue loss. I proposed a 3-day focused load test sprint with dedicated automation, ensuring launch day passed with zero incident tickets.',
    keyTalkingPoints: [
      'Framing technical risk in terms of customer trust and revenue risk',
      'Offering constructive compromise instead of simple refusal',
      'Delivering measurable launch stability',
    ],
    rehearsed: false,
  },
  {
    id: 'q6',
    category: 'Execution & Delivery',
    question: 'What is your process for establishing SLOs and error budgets with non-engineering stakeholders?',
    rationale: 'Validates mature engineering governance and clear translation of reliability concepts.',
    resumeAnchor: 'SLO/SLI governance and multi-region disaster recovery protocols',
    modelAnswer:
      'I translate nine-reliability metrics into concrete user impact: 99.98% uptime means no more than 8 minutes of degraded service per month. By establishing that remaining error budget is our allowance for innovative releases, both product and engineering align on when to prioritize new features versus when to freeze and pay down technical debt.',
    keyTalkingPoints: [
      'Translating percentages into human customer impact',
      'Treating error budgets as a currency for deployment velocity',
      'Collaborative freeze criteria agreed upon upfront',
    ],
    rehearsed: false,
  },
];

const STRIPE_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q1_stripe',
    category: 'System Architecture',
    question: 'How did your canary CI/CD gate reduce rollback incidents by 28% for high-throughput payment clusters?',
    rationale: 'Validates headline claim from your Stripe Staff Infrastructure resume.',
    resumeAnchor: 'designed automated canary deployment gates, reducing rollback incidents by 28%',
    modelAnswer:
      'At Stripe, we instituted automated canary deployment gates that evaluated P99 latency and database connection pool saturation on a 2% shadow traffic tier before promoting changes.',
    keyTalkingPoints: [
      '2% shadow traffic validation',
      'Connection pool saturation triggers',
      '28% reduction in rollback incidents',
    ],
    rehearsed: true,
  },
  {
    id: 'q2_stripe',
    category: 'Execution & Delivery',
    question: 'How did you benchmark multi-region compute clusters to guarantee 99.98% financial platform uptime?',
    rationale: 'Directly probes your high-availability multi-region architecture.',
    resumeAnchor: 'maintained 99.98% production uptime across four geographical cloud regions',
    modelAnswer:
      'We ran automated chaos tests across regional endpoints, simulating datacenter network partitions and verifying zero-loss state transitions across our financial ledger infrastructure.',
    keyTalkingPoints: [
      'Regional chaos testing',
      'Zero-data-loss failover',
      'Four geographical cloud regions',
    ],
    rehearsed: false,
  },
  {
    id: 'q3_stripe',
    category: 'Behavioral & Leadership',
    question: 'Walk me through how you aligned 45 engineering contributors when establishing strict infrastructure SLOs.',
    rationale: 'Probes cross-team engineering leadership and consensus building.',
    resumeAnchor: 'collaborated across 45 engineering contributors and cross-functional teams',
    modelAnswer:
      'We launched an internal architecture guild and authored lightweight RFCs. By treating the remaining error budget as currency for feature velocity, teams naturally aligned on stability goals.',
    keyTalkingPoints: [
      'Internal architecture guild',
      'Lightweight RFC design reviews',
      'Error budgets as velocity currency',
    ],
    rehearsed: false,
  },
];

const DATADOG_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q1_datadog',
    category: 'System Architecture',
    question: 'How did you optimize Kafka consumer group rebalancing to eliminate stop-the-world partition storms?',
    rationale: 'Validates deep streaming telemetry and Kafka cluster expertise.',
    resumeAnchor: 'high-concurrency event streaming and Kafka cluster optimization',
    modelAnswer:
      'We tuned heartbeat intervals, migrated consumer groups to cooperative sticky assignors, and enabled zstd batch compression, eliminating stop-the-world rebalance storms.',
    keyTalkingPoints: [
      'Cooperative sticky assignors',
      'zstd batch compression',
      'P99 tail latency reduction',
    ],
    rehearsed: true,
  },
  {
    id: 'q2_datadog',
    category: 'Execution & Delivery',
    question: 'What telemetry metrics do you monitor first when diagnosing sudden P99 latency spikes?',
    rationale: 'Evaluates production diagnostic intuition and high-velocity triage.',
    resumeAnchor: 'slashing P99 latency by 42% across distributed compute clusters',
    modelAnswer:
      'I inspect consumer lag metrics, garbage collection pause frequency, and thread pool exhaustion before drilling into distributed trace waterfalls.',
    keyTalkingPoints: [
      'Consumer lag vs ingress rate',
      'GC pause metrics',
      'Distributed trace span waterfalls',
    ],
    rehearsed: false,
  },
];

const getGroundedQuestionsForResume = (resumeId: string): InterviewQuestion[] => {
  if (resumeId === 'res_stripe_02') return STRIPE_QUESTIONS;
  if (resumeId === 'res_datadog_03') return DATADOG_QUESTIONS;
  return MASTER_QUESTIONS;
};

export const InterviewStudioPage: React.FC = () => {
  const { session, updateSession } = useAuth();

  // Resume selection state (initialized as empty production collection)
  const [savedResumes, setSavedResumes] = useState<SavedResumeOption[]>([]);
  const [resumeLoadState, setResumeLoadState] = useState<'loading' | 'success' | 'empty' | 'error'>('loading');
  const [resumeLoadError, setResumeLoadError] = useState<string | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [serverStatus, setServerStatus] = useState<'idle' | 'connected' | 'offline_fallback'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Questions state
  const [questions, setQuestions] = useState<InterviewQuestion[]>(MASTER_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q1');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

  // Rehearsal timer state
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Load available resumes from GET /api/resumes on mount
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
          // Documented contract: direct array [{ id, name, updatedAt, role, template }, ...]
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
          setResumeLoadError(err.message || 'Network failure loading resumes');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const selectedResume = savedResumes.find((r) => r.id === selectedResumeId);
  const activeQuestion = questions.find((q) => q.id === selectedQuestionId) || questions[0];
  const rehearsedCount = questions.filter((q) => q.rehearsed).length;
  const totalCount = questions.length;
  const progressPercent = totalCount > 0 ? Math.round((rehearsedCount / totalCount) * 100) : 0;

  const toggleRehearsed = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, rehearsed: !q.rehearsed } : q))
    );
  };

  const copyAnswer = (text: string) => {
    navigator.clipboard?.writeText(text);
    setNotification('Model answer copied to clipboard.');
    setTimeout(() => setNotification(null), 2500);
  };

  const handleCalibrate = async () => {
    setErrorMessage(null);

    // 1. Enforce resume selection and verify ID belongs to authenticated user's loaded resumes
    if (!selectedResumeId || !savedResumes.some((r) => r.id === selectedResumeId)) {
      setErrorMessage('Please select a valid saved resume belonging to your account.');
      return;
    }

    // 2. Enforce authentication
    if (!session.authenticated) {
      setErrorMessage('Authentication required: Please sign in to rehearse against saved resumes.');
      return;
    }

    // 3. Enforce credit balance
    if (session.credits < 1) {
      setErrorMessage('Insufficient credits: Rehearsal calibration requires at least 1 credit.');
      return;
    }

    setIsCalibrating(true);
    setNotification(`Calibrating interview questions for "${selectedResume?.name}"...`);

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: selectedResumeId, useCredit: true }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
          setSelectedQuestionId(data.questions[0].id);
        }

        // Reconcile credits strictly via authoritative server response or fresh /api/me
        if (typeof data?.creditsRemaining === 'number') {
          updateSession({ credits: data.creditsRemaining });
        } else if (typeof data?.credits === 'number') {
          updateSession({ credits: data.credits });
        } else {
          try {
            const meRes = await fetch('/api/me', { credentials: 'include' });
            if (meRes.ok) {
              const meData = await meRes.json();
              if (typeof meData?.credits === 'number') {
                updateSession({ credits: meData.credits });
              }
            }
          } catch (_) {}
        }

        setServerStatus('connected');
        setNotification(`Calibrated questions from server for "${selectedResume?.name}".`);
        setTimeout(() => setNotification(null), 3500);
      } else {
        // Explicit offline fallback: load resume-specific baseline template without consuming credit
        setServerStatus('offline_fallback');
        const grounded = getGroundedQuestionsForResume(selectedResumeId);
        setQuestions(grounded);
        setSelectedQuestionId(grounded[0].id);
        setNotification(null);
        setErrorMessage(
          `Backend unavailable (HTTP ${res.status}): Server returned an error. Displaying local grounded rehearsal template for ${selectedResume?.name}. No credits were consumed.`
        );
      }
    } catch {
      // Network failure: explicit offline state
      setServerStatus('offline_fallback');
      const grounded = getGroundedQuestionsForResume(selectedResumeId);
      setQuestions(grounded);
      setSelectedQuestionId(grounded[0].id);
      setNotification(null);
      setErrorMessage(
        `Network error: Server (/api/interview) unreachable. Operating in offline rehearsal mode with grounded template for ${selectedResume?.name}. No credits were consumed.`
      );
    } finally {
      setIsCalibrating(false);
    }
  };

  const filteredQuestions =
    filterCategory === 'All'
      ? questions
      : questions.filter((q) => q.category === filterCategory);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AppShell title="Interview Practice Studio">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--rs-blue-strong)',
              }}
            >
              Interview preparation studio
            </span>
            <StatusBadge
              status={selectedResume ? 'success' : isDemoMode ? 'info' : 'neutral'}
              label={
                selectedResume
                  ? '100% Resume Grounded'
                  : isDemoMode
                  ? 'Demo Persona (Alex Morgan)'
                  : 'Awaiting Resume Selection'
              }
            />
            {selectedResume ? (
              <span style={{ fontSize: '12px', color: 'var(--rs-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--rs-green)" /> 0 Fabricated Stories (Grounded in Verified Bullets)
              </span>
            ) : isDemoMode ? (
              <span style={{ fontSize: '12px', color: 'var(--rs-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--rs-blue)" /> Illustrative Persona (Demo Rehearsal)
              </span>
            ) : (
              <span style={{ fontSize: '12px', color: 'var(--rs-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--rs-muted)" /> Select a verified saved resume below
              </span>
            )}
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
            Interview Practice Studio
          </h1>
          <p style={{ margin: '8px 0 0', color: 'var(--rs-muted)', fontSize: '14.5px', lineHeight: 1.55 }}>
            Practice answering 6 rigorous interview prompts calibrated directly to your verified career history and metrics.
          </p>
        </div>

        {/* Target Rehearsal Resume Selection Card */}
        <div
          style={{
            padding: '20px',
            borderRadius: '14px',
            backgroundColor: 'var(--rs-surface)',
            border: '1px solid var(--rs-line)',
            boxShadow: 'var(--rs-shadow)',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} color="var(--rs-blue)" />
                <span
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: 'var(--rs-ink)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Target Rehearsal Resume (Authenticated)
                </span>
                <StatusBadge
                  status={serverStatus === 'connected' ? 'success' : serverStatus === 'offline_fallback' ? 'warning' : 'neutral'}
                  label={
                    serverStatus === 'connected'
                      ? 'Live /api/interview'
                      : serverStatus === 'offline_fallback'
                      ? 'Offline Fallback Active'
                      : 'Not Calibrated'
                  }
                />
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--rs-muted)' }}>
                Select an authenticated saved resume. The studio will calibrate 6 grounded STAR interview questions against that exact document’s metrics.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rs-muted)' }}>Available Balance:</span>
              <StatusBadge status={session.credits > 0 ? 'success' : 'warning'} label={`${session.credits} Credits`} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <select
              id="interview-resume-select"
              data-testid="interview-resume-select"
              value={selectedResumeId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedResumeId(val);
                setErrorMessage(null);
                if (val) {
                  setIsDemoMode(false);
                  const grounded = getGroundedQuestionsForResume(val);
                  setQuestions(grounded);
                  setSelectedQuestionId(grounded[0].id);
                }
              }}
              disabled={isCalibrating || resumeLoadState === 'loading'}
              style={{
                flex: '1 1 320px',
                height: '42px',
                padding: '0 14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface-2)',
                color: 'var(--rs-ink)',
                fontSize: '13.5px',
                outline: 'none',
                fontWeight: 600,
              }}
            >
              {resumeLoadState === 'loading' ? (
                <option value="">Loading your saved resumes...</option>
              ) : resumeLoadState === 'error' ? (
                <option value="">Error loading resumes: {resumeLoadError}</option>
              ) : resumeLoadState === 'empty' ? (
                <option value="">No saved resumes found in your account</option>
              ) : (
                <option value="">-- Choose a Saved Resume to Rehearse Against --</option>
              )}
              {savedResumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.name}
                </option>
              ))}
            </select>

            <Button
              data-testid="calibrate-interview-btn"
              onClick={handleCalibrate}
              disabled={
                !selectedResumeId ||
                !savedResumes.some((r) => r.id === selectedResumeId) ||
                isCalibrating ||
                resumeLoadState === 'loading'
              }
              icon={isCalibrating ? <RotateCcw size={14} className="spin" /> : <Sparkles size={14} />}
            >
              {isCalibrating ? 'Calibrating Questions...' : 'Calibrate Questions (1 Credit)'}
            </Button>
          </div>

          {/* Loading or Error Alerts for Resume Fetching */}
          {resumeLoadState === 'empty' && !isDemoMode && (
            <div
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: 'var(--rs-bg)',
                border: '1px dashed var(--rs-line)',
                fontSize: '12.5px',
                color: 'var(--rs-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span>No authenticated resumes found. Create one in Resume Studio to calibrate against your experience.</span>
              <button
                type="button"
                onClick={() => {
                  setIsDemoMode(true);
                  setSelectedResumeId('');
                  setQuestions(MASTER_QUESTIONS);
                  setSelectedQuestionId('q1');
                  setNotification('Loaded sample candidate questions (Alex Morgan) for demonstration.');
                  setTimeout(() => setNotification(null), 3000);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--rs-blue)',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Explore Sample Persona (Demo)
              </button>
            </div>
          )}

          {isDemoMode && (
            <div
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: 'color-mix(in srgb, var(--rs-amber) 10%, var(--rs-surface))',
                border: '1px solid var(--rs-amber)',
                fontSize: '12px',
                color: 'var(--rs-ink)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AlertTriangle size={14} color="var(--rs-amber)" />
              <span>
                <strong>Demo Mode Active:</strong> Rehearsing against sample candidate persona (Alex Morgan). Select an authenticated saved resume above to calibrate your own profile.
              </span>
            </div>
          )}

          {!selectedResumeId && (
            <div
              style={{
                marginTop: '10px',
                fontSize: '12px',
                color: 'var(--rs-amber)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AlertTriangle size={14} />
              <span>Select one of your authenticated saved resumes above to calibrate interview questions.</span>
            </div>
          )}

          {selectedResume && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--rs-bg)',
                border: '1px solid var(--rs-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Active Anchor: {selectedResume.name}
                </span>
                {selectedResume.atsScore && (
                  <StatusBadge status="success" label={`${selectedResume.atsScore} ATS`} />
                )}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                Target Role: {selectedResume.role || 'Executive Lead'} (ID: <code>{selectedResume.id}</code>)
              </span>
            </div>
          )}
        </div>

        {/* Offline Fallback Banner */}
        {serverStatus === 'offline_fallback' && (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, var(--rs-amber) 12%, var(--rs-surface))',
              border: '1px solid var(--rs-amber)',
              color: 'var(--rs-ink)',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={18} color="var(--rs-amber)" />
              <div>
                <strong style={{ color: 'var(--rs-amber)' }}>Offline Rehearsal Mode:</strong> Backend endpoint (
                <code>POST /api/interview</code>) is unavailable. Questions below are from the local baseline rehearsal
                template for <em>{selectedResume?.name || 'the selected resume'}</em>. <strong>Zero credits were consumed.</strong>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleCalibrate} icon={<RotateCcw size={13} />}>
              Retry Server Connection
            </Button>
          </div>
        )}

        {/* Server Connected Banner */}
        {serverStatus === 'connected' && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, var(--rs-green) 12%, var(--rs-surface))',
              border: '1px solid var(--rs-green)',
              color: 'var(--rs-ink)',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={16} color="var(--rs-green)" />
            <span>
              <strong>Live Backend Active:</strong> Questions successfully calibrated from server (
              <code>POST /api/interview</code>) for <em>{selectedResume?.name}</em>.
            </span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && serverStatus !== 'offline_fallback' && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, #ef4444 14%, var(--rs-surface))',
              border: '1px solid #ef4444',
              color: 'var(--rs-ink)',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={16} color="#ef4444" />
            <span>{errorMessage}</span>
          </div>
        )}

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

        {/* Progress & Rehearsal Metrics Bar */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            backgroundColor: 'var(--rs-surface)',
            border: '1px solid var(--rs-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            boxShadow: 'var(--rs-shadow)',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}>
              Rehearsal Mastery Progress
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                {rehearsedCount} of {totalCount} Questions Rehearsed
              </span>
              <StatusBadge
                status={progressPercent >= 50 ? 'success' : 'info'}
                label={`${progressPercent}% Ready`}
              />
            </div>
          </div>

          {/* Interactive Practice Stopwatch */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--rs-bg)',
              border: '1px solid var(--rs-line)',
            }}
          >
            <Clock size={16} color="var(--rs-muted)" />
            <div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', display: 'block' }}>
                Answer Timer
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: timerSeconds <= 20 ? 'var(--rs-amber)' : 'var(--rs-ink)',
                }}
              >
                {formatTimer(timerSeconds)}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginLeft: '6px' }}>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface)',
                  color: 'var(--rs-ink)',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
                title={isTimerRunning ? 'Pause timer' : 'Start timer'}
              >
                {isTimerRunning ? <Pause size={13} /> : <Play size={13} />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(120);
                }}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface)',
                  color: 'var(--rs-muted)',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
                title="Reset timer to 2:00"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleCalibrate}
            disabled={!selectedResumeId || isCalibrating}
            icon={<RotateCcw size={13} />}
          >
            Recalibrate Questions
          </Button>
        </div>

        {/* Main Grid: Question List & Active Question Stage */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
          {/* Left: Question Navigation List */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '20px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', textTransform: 'uppercase' }}>
                Curated Question Set
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['All', 'System Architecture', 'Behavioral & Leadership'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: filterCategory === cat ? 'var(--rs-blue-strong)' : 'var(--rs-bg)',
                      color: filterCategory === cat ? '#FFFFFF' : 'var(--rs-muted)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {cat === 'System Architecture' ? 'Architecture' : cat === 'Behavioral & Leadership' ? 'Behavioral' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredQuestions.map((q) => {
                const isSelected = q.id === activeQuestion.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestionId(q.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
                      backgroundColor: isSelected
                        ? 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))'
                        : 'var(--rs-bg)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRehearsed(q.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: q.rehearsed ? 'var(--rs-green)' : 'var(--rs-muted)',
                        marginTop: '2px',
                      }}
                      title={q.rehearsed ? 'Marked as rehearsed' : 'Mark as rehearsed'}
                    >
                      <CheckCircle2 size={18} />
                    </button>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--rs-blue)', textTransform: 'uppercase' }}>
                          {q.category}
                        </span>
                        {q.rehearsed && (
                          <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--rs-green)' }}>
                            · REHEARSED
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '12.5px',
                          fontWeight: isSelected ? 700 : 500,
                          color: 'var(--rs-ink)',
                          lineHeight: '1.4',
                        }}
                      >
                        {q.question}
                      </p>
                    </div>

                    <ChevronRight size={14} color="var(--rs-muted)" style={{ marginTop: '4px' }} />
                  </div>
                );
              })}
            </div>

            {/* Note on Voice AI */}
            <div
              style={{
                marginTop: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: 'var(--rs-surface-2)',
                border: '1px solid var(--rs-line)',
                fontSize: '11px',
                color: 'var(--rs-muted)',
                lineHeight: '1.4',
              }}
            >
              <strong style={{ color: 'var(--rs-ink)' }}>Mode Notice:</strong> High-precision text & structured rehearsal studio. Live audio and microphone coaching are intentionally deactivated for focused self-paced practice.
            </div>
          </div>

          {/* Right: Active Question Detail Stage */}
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
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <StatusBadge status="info" label={activeQuestion.category} />
                <Button
                  size="sm"
                  variant={activeQuestion.rehearsed ? 'secondary' : 'primary'}
                  onClick={() => toggleRehearsed(activeQuestion.id)}
                  icon={<CheckCircle2 size={14} />}
                >
                  {activeQuestion.rehearsed ? 'Mark Unrehearsed' : 'Mark as Rehearsed'}
                </Button>
              </div>

              <h2
                style={{
                  margin: '8px 0 0',
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--rs-ink)',
                  lineHeight: '1.35',
                }}
              >
                {activeQuestion.question}
              </h2>
            </div>

            {/* Grounded Resume Anchor */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))',
                border: '1px solid color-mix(in srgb, var(--rs-blue-strong) 25%, transparent)',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rs-blue)', display: 'block', marginBottom: '4px' }}>
                Calibrated To Verified Resume Anchor
              </span>
              <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic', color: 'var(--rs-ink)' }}>
                &ldquo;{activeQuestion.resumeAnchor}&rdquo;
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--rs-muted)' }}>
                {activeQuestion.rationale}
              </p>
            </div>

            {/* Model Answer (Invariant Ivory/White Paper Sheet) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}>
                  Model Executive Answer (STAR Format)
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyAnswer(activeQuestion.modelAnswer)}
                  icon={<Copy size={13} />}
                >
                  Copy Answer
                </Button>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#172B48',
                  borderRadius: '10px',
                  border: '1px solid #D5DFEA',
                  padding: '20px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                  fontSize: '13px',
                  lineHeight: '1.65',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {activeQuestion.modelAnswer}
              </div>
            </div>

            {/* Key Talking Points */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Essential Talking Points
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeQuestion.keyTalkingPoints.map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12.5px',
                      color: 'var(--rs-ink)',
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--rs-blue-strong)',
                        flexShrink: 0,
                      }}
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};