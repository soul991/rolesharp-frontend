import React from 'react';
import { AppShell } from '../components/common/AppShell';
import { ScoreRing } from '../components/common/ScoreRing';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { useRouter } from '../router/RouterContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  FileCheck2,
  Mic,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { session } = useAuth();
  const userName = session.user?.name || 'Alex Morgan';

  return (
    <AppShell title="Overview Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Welcome Banner & Next Best Action */}
        <section
          style={{
            padding: '28px 32px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-surface)',
            boxShadow: 'var(--rs-shadow-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--rs-blue-strong)',
                }}
              >
                Your career workspace
              </span>
              <StatusBadge status="success" label="Active" dot />
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--rs-ink)',
              }}
            >
              Welcome back, {userName}.
            </h2>
            <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px', maxWidth: '50ch', lineHeight: 1.55 }}>
              Your primary resume is verified with 86/100 ATS health. You have 2 new job matches aligned with your verified experience.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={() => navigate('/tailor')} icon={<Sparkles size={15} />}>
              Tailor to Job
            </Button>
            <Button variant="secondary" onClick={() => navigate('/checker')}>
              Re-check ATS Score
            </Button>
          </div>
        </section>

        {/* Top 3 Core Metrics Grid */}
        <style>{`
          @media (min-width: 960px) {
            .rs-dashboard-metrics {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
          }
        `}</style>
        <section
          className="rs-dashboard-metrics"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Card 1: Resume Health */}
          <div
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--rs-muted)', letterSpacing: '-0.01em' }}>
                Primary resume health
              </span>
              <h3 style={{ margin: '6px 0 2px', fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--rs-ink)' }}>
                Product Lead (v2.4)
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-muted)' }}>
                Zero layout risks detected
              </p>
              <div style={{ marginTop: '14px' }}>
                <StatusBadge status="success" label="ATS Ready" />
              </div>
            </div>
            <ScoreRing score={86} size={90} strokeWidth={6} />
          </div>

          {/* Card 2: Role Alignment */}
          <div
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--rs-muted)', letterSpacing: '-0.01em' }}>
                Role alignment
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: '32px',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    color: 'var(--rs-ink)',
                    lineHeight: 1,
                  }}
                >
                  12
                </span>
                <span style={{ fontSize: '13px', color: 'var(--rs-muted)', fontWeight: 500 }}>
                  skills evidenced
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-muted)' }}>
                2 requirements identified as unevidenced gaps
              </p>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="subtle" onClick={() => navigate('/checker')} icon={<ArrowRight size={14} />}>
                View gap breakdown
              </Button>
            </div>
          </div>

          {/* Card 3: Active Pipeline */}
          <div
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--rs-muted)', letterSpacing: '-0.01em' }}>
                Application pipeline
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: '32px',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    color: 'var(--rs-blue-strong)',
                    lineHeight: 1,
                  }}
                >
                  7
                </span>
                <span style={{ fontSize: '13px', color: 'var(--rs-muted)', fontWeight: 500 }}>
                  active opportunities
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-muted)' }}>
                1 interview scheduled this week · 2 follow-ups pending
              </p>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="subtle" onClick={() => navigate('/tracker')} icon={<ArrowRight size={14} />}>
                Open tracker
              </Button>
            </div>
          </div>
        </section>

        {/* Priority Action Tasks & Recent Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(300px, 1fr)', gap: '24px' }} className="dashboard-subgrid">
          {/* Priority Workflow Tasks */}
          <section
            style={{
              padding: '24px',
              borderRadius: '14px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                Prioritized Next Steps
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--rs-muted)', fontWeight: 600 }}>
                Grounded in your active applications
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  title: 'Rehearse interview answers for Stripe Product Lead',
                  tag: 'Interview Prep',
                  status: 'warning' as const,
                  time: 'Scheduled for Thursday',
                  action: () => navigate('/interview'),
                },
                {
                  title: 'Review 3 high-confidence Daily Matches',
                  tag: 'Daily Digest',
                  status: 'info' as const,
                  time: 'Delivered today at 9:00 AM',
                  action: () => navigate('/daily-matches'),
                },
                {
                  title: 'Review unverified metrics in experience section',
                  tag: 'ATS Optimization',
                  status: 'neutral' as const,
                  time: 'Estimated 5 min fix',
                  action: () => navigate('/checker'),
                },
              ].map((task, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--rs-surface)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--rs-blue)',
                      }}
                    >
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--rs-ink)' }}>
                          {task.title}
                        </span>
                        <StatusBadge status={task.status} label={task.tag} />
                      </div>
                      <span style={{ fontSize: '11.5px', color: 'var(--rs-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {task.time}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={task.action} icon={<ArrowRight size={14} />}>
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Tool Launchers */}
          <section
            style={{
              padding: '24px',
              borderRadius: '14px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              Studio Launchers
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <button
                onClick={() => navigate('/checker')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface-2)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 0.18s ease',
                }}
              >
                <FileCheck2 size={20} color="var(--rs-blue)" />
                <h4 style={{ margin: '10px 0 2px', fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  ATS Check
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--rs-muted)' }}>
                  Analyze formatting & proof
                </p>
              </button>

              <button
                onClick={() => navigate('/tailor')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface-2)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 0.18s ease',
                }}
              >
                <Sparkles size={20} color="var(--rs-amber)" />
                <h4 style={{ margin: '10px 0 2px', fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Tailor
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--rs-muted)' }}>
                  Job-specific alignment
                </p>
              </button>

              <button
                onClick={() => navigate('/interview')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface-2)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 0.18s ease',
                }}
              >
                <Mic size={20} color="var(--rs-green)" />
                <h4 style={{ margin: '10px 0 2px', fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Interview
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--rs-muted)' }}>
                  6 Grounded Q&A prompts
                </p>
              </button>

              <button
                onClick={() => navigate('/jobs')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface-2)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 0.18s ease',
                }}
              >
                <Briefcase size={20} color="var(--rs-blue-strong)" />
                <h4 style={{ margin: '10px 0 2px', fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Find Jobs
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--rs-muted)' }}>
                  Matches & source links
                </p>
              </button>
            </div>

            <div
              style={{
                marginTop: 'auto',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface-2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Calendar size={18} color="var(--rs-amber)" />
              <div style={{ fontSize: '12px' }}>
                <span style={{ fontWeight: 700, color: 'var(--rs-ink)', display: 'block' }}>Daily Matches Digest</span>
                <span style={{ color: 'var(--rs-muted)' }}>Next update tomorrow at 9:00 AM</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppShell>
  );
};
