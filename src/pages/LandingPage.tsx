import React from 'react';
import { useRouter } from '../router/RouterContext';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/common/Button';
import { KineticBrandStatement } from '../components/landing/KineticBrandStatement';
import { EvidenceReviewStage } from '../components/landing/EvidenceReviewStage';
import { CheckCircle2, ArrowRight, ShieldCheck, Compass, Sparkles, Layers } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            minHeight: '660px',
            display: 'grid',
            alignItems: 'center',
            padding: 'clamp(48px, 6vw, 84px) 0 60px',
            backgroundColor: 'var(--rs-bg)',
            borderBottom: '1px solid var(--rs-line)',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.95fr) minmax(520px, 1.05fr)',
                gap: 'clamp(32px, 5vw, 64px)',
                alignItems: 'center',
              }}
              className="hero-grid-responsive"
            >
              {/* Left: Value Proposition */}
              <div style={{ minWidth: 0 }}>
                {/* Eyebrow */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '18px',
                    color: 'var(--rs-blue-strong)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--rs-amber)',
                    }}
                  />
                  <span>Career clarity, built around your real work</span>
                </div>

                {/* Main Headline */}
                <h1
                  style={{
                    margin: 0,
                    maxWidth: '14ch',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.4rem, 4.2vw, 3.85rem)',
                    fontWeight: 600,
                    lineHeight: 1.08,
                    letterSpacing: '-0.035em',
                    color: 'var(--rs-ink)',
                  }}
                >
                  <span style={{ color: 'var(--rs-blue-strong)' }}>RoleSharp:</span> One step ahead towards a successful career.
                </h1>

                {/* Subtitle / Lede */}
                <p
                  style={{
                    maxWidth: '46ch',
                    margin: '20px 0 0',
                    color: 'var(--rs-muted)',
                    fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                    lineHeight: 1.6,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Turn the work you have actually completed into a resume that hiring teams understand, verify, and remember — without fabricating credentials.
                </p>

                {/* Hero CTAs */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '28px',
                  }}
                >
                  <Button
                    size="lg"
                    onClick={() => navigate('/checker')}
                    icon={<ArrowRight size={15} />}
                  >
                    Check my resume free
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => navigate('/tailor')}
                  >
                    Build tailored resume
                  </Button>
                  <Button
                    variant="subtle"
                    size="lg"
                    onClick={() => navigate('/resume-builder')}
                  >
                    Browse templates
                  </Button>
                </div>

                <p style={{ margin: '14px 0 0', color: 'var(--rs-muted)', fontSize: '12px' }}>
                  Start with a PDF, DOCX, or pasted text. No credit card required.
                </p>

                {/* Trust Signals */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginTop: '18px',
                    color: 'var(--rs-muted)',
                    fontSize: '12px',
                  }}
                  aria-label="RoleSharp Core Guarantees"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="var(--rs-green)" />
                    Evidence-linked suggestions
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} color="var(--rs-green)" />
                    You approve every change
                  </span>
                </div>

                {/* Word-by-word kinetic promotional statement */}
                <KineticBrandStatement />
              </div>

              {/* Right: Interactive Product Stage */}
              <div>
                <EvidenceReviewStage />
              </div>
            </div>
          </div>
        </section>

        {/* Proof Strip */}
        <section
          style={{
            borderBottom: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-surface)',
            padding: '28px 0',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--rs-surface-2)',
                    border: '1px solid var(--rs-line)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--rs-green)',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--rs-ink)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    Verifiable Evidence
                  </strong>
                  <span style={{ color: 'var(--rs-muted)', fontSize: '12px' }}>
                    Every recommendation links directly to your real experience
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--rs-surface-2)',
                    border: '1px solid var(--rs-line)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--rs-blue)',
                    flexShrink: 0,
                  }}
                >
                  <Compass size={16} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--rs-ink)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    One Job at a Time
                  </strong>
                  <span style={{ color: 'var(--rs-muted)', fontSize: '12px' }}>
                    Tailor specifically without rewriting or distorting your history
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--rs-surface-2)',
                    border: '1px solid var(--rs-line)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--rs-amber)',
                    flexShrink: 0,
                  }}
                >
                  <Layers size={16} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--rs-ink)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    True Invariant Exports
                  </strong>
                  <span style={{ color: 'var(--rs-muted)', fontSize: '12px' }}>
                    Download identical PDF and DOCX documents with crisp ATS layouts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Core Workflow */}
        <section style={{ padding: 'clamp(56px, 7vw, 92px) 0' }}>
          <div className="container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '24px',
                marginBottom: '44px',
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    maxWidth: '18ch',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.85rem, 3vw, 2.75rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.12,
                    color: 'var(--rs-ink)',
                  }}
                >
                  A better application starts with a clearer story.
                </h2>
              </div>
              <p style={{ margin: 0, maxWidth: '42ch', color: 'var(--rs-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                RoleSharp helps you diagnose what your resume proves, what a role genuinely requires, and what to improve before you apply.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {[
                {
                  step: '01 / CHECK',
                  title: 'Understand your evidence',
                  desc: 'Review structure, readability, ATS parsing risks, and the real capabilities demonstrated in your document.',
                  cta: 'Check my resume →',
                  route: '/checker',
                },
                {
                  step: '02 / TAILOR',
                  title: 'Focus on one opportunity',
                  desc: 'Compare target role requirements with your real experience. Keep unsupported requirements visible as honest gaps.',
                  cta: 'Tailor for a role →',
                  route: '/tailor',
                },
                {
                  step: '03 / PREPARE',
                  title: 'Make your case clearly',
                  desc: 'Prepare grounded cover letters and practice explaining the concrete decisions behind your project achievements.',
                  cta: 'Rehearse interview questions →',
                  route: '/interview',
                },
                {
                  step: '04 / TRACK',
                  title: 'Keep next steps visible',
                  desc: 'Organize saved opportunities, application stages, and follow-ups in a unified, transparent pipeline.',
                  cta: 'Open application tracker →',
                  route: '/tracker',
                },
              ].map((item, idx) => (
                <article
                  key={idx}
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
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--rs-blue-strong)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.step}
                    </span>
                    <h3
                      style={{
                        margin: '14px 0 8px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '16px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: 'var(--rs-ink)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--rs-muted)', fontSize: '13px', lineHeight: 1.55 }}>
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(item.route)}
                    style={{
                      marginTop: '20px',
                      color: 'var(--rs-blue-strong)',
                      fontSize: '12px',
                      fontWeight: 600,
                      textAlign: 'left',
                    }}
                  >
                    {item.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Catalogue Preview */}
        <section
          style={{
            backgroundColor: 'var(--rs-surface)',
            borderBlock: '1px solid var(--rs-line)',
            padding: 'clamp(56px, 7vw, 92px) 0',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '36px',
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    color: 'var(--rs-ink)',
                  }}
                >
                  One workspace. The tools your application needs.
                </h2>
                <p style={{ margin: '8px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
                  Use only what fits the opportunity in front of you. Your source resume remains the foundation.
                </p>
              </div>
              <Button variant="ghost" onClick={() => navigate('/tools')}>
                View all 20+ tools →
              </Button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '16px',
              }}
            >
              {[
                {
                  no: '01 / RESUME',
                  title: 'ATS Diagnostics & Fixer',
                  desc: 'Surface formatting risks, missing metrics, and keyword alignment against job descriptions.',
                  route: '/checker',
                },
                {
                  no: '02 / TAILORING',
                  title: 'Role-Specific Resume',
                  desc: 'Adapt your presentation to a target company and role without inventing unproven claims.',
                  route: '/tailor',
                },
                {
                  no: '03 / TEMPLATES',
                  title: 'ATS-Friendly Templates & PDF',
                  desc: 'Crisp editorial layouts built from the same validated resume facts with zero formatting bugs.',
                  route: '/resume-builder',
                },
                {
                  no: '04 / DISCOVERY',
                  title: 'Source-Verified Job Matches',
                  desc: 'Explore opportunities with original posting links, freshness dates, and clear evidence match context.',
                  route: '/jobs',
                },
                {
                  no: '05 / PREPARATION',
                  title: 'Grounded Interview Studio',
                  desc: 'Practice 6 role-specific questions with evidence-grounded model answers drawn from your experience.',
                  route: '/interview',
                },
                {
                  no: '06 / ORGANIZATION',
                  title: 'Application Pipeline Tracker',
                  desc: 'Manage stages, follow-up notes, and activity history in a transparent 5-column board.',
                  route: '/tracker',
                },
              ].map((tool, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(tool.route)}
                  style={{
                    padding: '22px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                  }}
                  className="rs-tool-card"
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--rs-amber)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {tool.no}
                  </span>
                  <h3
                    style={{
                      margin: '10px 0 6px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: 'var(--rs-ink)',
                    }}
                  >
                    {tool.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--rs-muted)', fontSize: '13px', lineHeight: 1.55 }}>
                    {tool.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Callout */}
        <section style={{ padding: 'clamp(56px, 7vw, 92px) 0' }}>
          <div className="container">
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(40px, 6vw, 72px) 24px',
                backgroundColor: 'var(--rs-surface)',
                border: '1px solid var(--rs-line)',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  position: 'relative',
                  margin: '0 auto',
                  maxWidth: '18ch',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.95rem, 3.5vw, 3.1rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  color: 'var(--rs-ink)',
                  lineHeight: 1.1,
                }}
              >
                Your work deserves to be understood.
              </h2>
              <p
                style={{
                  position: 'relative',
                  margin: '16px auto 26px',
                  maxWidth: '52ch',
                  color: 'var(--rs-muted)',
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                }}
              >
                Start with the resume you have right now. Review the evidence, resolve parsing risks, and tailor it specifically for the opportunity ahead.
              </p>
              <Button size="lg" onClick={() => navigate('/checker')} icon={<Sparkles size={15} />}>
                Check my resume free →
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .rs-tool-card:hover {
          transform: translateY(-3px);
          border-color: var(--rs-blue-strong) !important;
        }
        @media (max-width: 960px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};
