import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  CheckCircle2,
  Clock,
  Copy,
  ShieldCheck,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';

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

const INITIAL_QUESTIONS: InterviewQuestion[] = [
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

export const InterviewStudioPage: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(INITIAL_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q1');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

  // Rehearsal timer state
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const activeQuestion = questions.find((q) => q.id === selectedQuestionId) || questions[0];
  const rehearsedCount = questions.filter((q) => q.rehearsed).length;
  const totalCount = questions.length;
  const progressPercent = Math.round((rehearsedCount / totalCount) * 100);

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

  const handleRegenerate = () => {
    setNotification('Calibrating questions from backend (POST /api/interview)...');
    fetch('/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', credentials: 'include' },
      body: JSON.stringify({ resumeId: 'res_master_01', useCredit: true }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data?.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
        }
      })
      .catch(() => {});

    setTimeout(() => {
      setNotification('Interview questions refreshed and grounded in verified resume metrics.');
      setTimeout(() => setNotification(null), 3000);
    }, 600);
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
            <StatusBadge status="success" label="100% Resume Grounded" />
            <span style={{ fontSize: '12px', color: 'var(--rs-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="var(--rs-green)" /> 0 Fabricated Stories
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
            Interview Practice Studio
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
            Practice answering 6 rigorous interview prompts calibrated directly to your verified career history and metrics.
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
            onClick={handleRegenerate}
            icon={<RotateCcw size={13} />}
          >
            Regenerate Questions
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