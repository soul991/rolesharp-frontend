import React, { useState } from 'react';
import { FileText, CheckCircle2, Search, Sparkles } from 'lucide-react';

type Mode = 'evidence' | 'gap' | 'edit';

interface ModeContent {
  title: string;
  text: string;
  gapTitle: string;
  gapText: string;
  sourceTitle: string;
  sourceText: string;
  highlight: string;
}

const modesData: Record<Mode, ModeContent> = {
  evidence: {
    title: 'Supported by the resume',
    text: 'The 12% lift is a concrete, quantifiable outcome the hiring team can evaluate with confidence.',
    gapTitle: 'Check before adding',
    gapText: 'The role asks for pricing tests. This resume proves onboarding tests.',
    sourceTitle: 'Sample source',
    sourceText: 'Onboarding release notes and experiment results',
    highlight: 'Led onboarding experiments that raised activation 12% across two releases.',
  },
  gap: {
    title: 'Role requirement not evidenced',
    text: 'Pricing experiments appear in the job posting, but no supporting example is visible in this resume.',
    gapTitle: 'Do not invent the missing skill',
    gapText: 'Keep this as a gap until the candidate can supply real project evidence.',
    sourceTitle: 'Role requirement',
    sourceText: 'Product Manager posting · pricing and packaging experiments',
    highlight: 'Interviewed 24 customers to identify where trial users dropped off.',
  },
  edit: {
    title: 'Suggested wording — candidate review required',
    text: 'Bring the measurable outcome closer to the top, while strictly retaining original facts.',
    gapTitle: 'Candidate approval required',
    gapText: 'Accept, edit or reject the suggestion. Never change the metric or claim.',
    sourceTitle: 'Change rationale',
    sourceText: 'Prioritize the measurable result already present in the resume.',
    highlight: 'Raised activation by 12% through onboarding experiments across two releases.',
  },
};

export const EvidenceReviewStage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('evidence');
  const [focused, setFocused] = useState(false);

  const setMode = (mode: Mode) => {
    setActiveMode(mode);
    setFocused(true);
    setTimeout(() => setFocused(false), 650);
  };

  const current = modesData[activeMode];

  return (
    <figure
      style={{
        position: 'relative',
        margin: 0,
        padding: 0,
        minWidth: 0,
        borderRadius: '24px',
        border: '1px solid var(--rs-line)',
        backgroundColor: 'var(--rs-surface)',
        boxShadow: 'var(--rs-shadow)',
        overflow: 'hidden',
      }}
      aria-labelledby="stageTitle"
    >
      {/* Stage Header */}
      <div
        style={{
          minHeight: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid var(--rs-line)',
          color: 'var(--rs-muted)',
          fontSize: '12px',
        }}
      >
        <span
          id="stageTitle"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--rs-ink)',
            fontWeight: 700,
            fontSize: '13px',
          }}
        >
          <FileText size={16} color="var(--rs-blue)" />
          <span>Evidence Review Stage</span>
        </span>
        <span style={{ fontSize: '11px', color: 'var(--rs-muted)' }}>Interactive Demo</span>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          padding: '10px 20px 0',
          borderBottom: '1px solid var(--rs-line)',
        }}
        role="tablist"
        aria-label="Evidence Demo Modes"
      >
        {(['evidence', 'gap', 'edit'] as Mode[]).map((mode) => {
          const isSelected = activeMode === mode;
          const labels: Record<Mode, string> = {
            evidence: 'Evidence Review',
            gap: 'Role Gap',
            edit: 'Suggested Edit',
          };
          return (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              role="tab"
              aria-selected={isSelected}
              style={{
                position: 'relative',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                padding: '9px 14px 11px',
                fontSize: '12px',
                fontWeight: 700,
                color: isSelected ? 'var(--rs-ink)' : 'var(--rs-muted)',
                backgroundColor: isSelected ? 'var(--rs-surface-2)' : 'transparent',
                cursor: 'pointer',
                transition: 'color 0.18s ease, background-color 0.18s ease',
              }}
            >
              {labels[mode]}
              {isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '12px',
                    right: '12px',
                    height: '2px',
                    backgroundColor: 'var(--rs-amber)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Body Grid with concentric 16px padding */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(230px, 0.85fr)',
          gap: '16px',
          padding: '16px',
          alignItems: 'stretch',
        }}
        className="stage-body-grid"
      >
        {/* Left: Authentic Invariant Paper Surface (Concentric 8px radius: 24 - 16 = 8) */}
        <article
          className="rs-paper-sheet"
          style={{
            minHeight: '380px',
            padding: '28px 24px',
            backgroundColor: '#FFFFFF',
            color: '#0A0F1D',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#0A0F1D',
            }}
          >
            Alex Morgan
          </div>
          <div style={{ marginTop: '4px', fontSize: '11px', color: '#556070' }}>
            Lead Product Manager · Seattle, WA
          </div>
          <div style={{ height: '1px', margin: '18px 0 16px', backgroundColor: '#E2E6ED' }} />

          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: '#1E3A68',
              marginBottom: '6px',
            }}
          >
            Work experience
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#1B2432' }}>
            Product Lead · Lattice Works (2022–Present)
          </div>

          <p
            style={{
              margin: '8px -6px 0',
              padding: '8px 8px',
              borderRadius: '4px',
              backgroundColor: '#EEF4FC',
              color: '#133566',
              fontSize: '11.5px',
              lineHeight: 1.55,
              border: focused ? '1px solid #2B6CB0' : '1px solid transparent',
              transition: 'border-color 0.15s ease',
            }}
          >
            {current.highlight}
          </p>

          <p style={{ margin: '8px 0 0', color: '#445163', fontSize: '11.5px', lineHeight: 1.55 }}>
            Interviewed 24 enterprise customers to identify key onboarding drop-off moments.
          </p>

          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: '#1E3A68',
              marginTop: '18px',
              marginBottom: '6px',
            }}
          >
            Verified skills
          </div>
          <p style={{ margin: 0, color: '#445163', fontSize: '11.5px' }}>
            Experiment Design, Funnel Optimization, SQL, Quantitative User Research
          </p>
        </article>

        {/* Right: Interactive Evidence Callouts */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => setMode('evidence')}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: activeMode === 'evidence' ? '1px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
              backgroundColor:
                activeMode === 'evidence'
                  ? 'var(--rs-blue-subtle)'
                  : 'var(--rs-surface)',
              color: 'var(--rs-ink)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background-color 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CheckCircle2 size={15} color="var(--rs-green)" />
              <h3 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600 }}>
                {current.title}
              </h3>
            </div>
            <p style={{ margin: 0, color: 'var(--rs-muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {current.text}
            </p>
          </button>

          <button
            onClick={() => setMode('gap')}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: activeMode === 'gap' ? '1px solid var(--rs-amber)' : '1px solid var(--rs-line)',
              backgroundColor:
                activeMode === 'gap'
                  ? 'var(--rs-amber-subtle)'
                  : 'var(--rs-surface)',
              color: 'var(--rs-ink)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background-color 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              {activeMode === 'edit' ? <Sparkles size={15} color="var(--rs-amber)" /> : <Search size={15} color="var(--rs-amber)" />}
              <h3 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600 }}>
                {current.gapTitle}
              </h3>
            </div>
            <p style={{ margin: 0, color: 'var(--rs-muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {current.gapText}
            </p>
          </button>

          <div
            style={{
              marginTop: 'auto',
              paddingTop: '12px',
              borderTop: '1px solid var(--rs-line)',
            }}
          >
            <strong style={{ display: 'block', fontSize: '11px', color: 'var(--rs-ink)', marginBottom: '3px', fontWeight: 600 }}>
              {current.sourceTitle}:
            </strong>
            <p style={{ margin: 0, color: 'var(--rs-muted)', fontSize: '11.5px', lineHeight: 1.45 }}>
              {current.sourceText}
            </p>
          </div>
        </aside>
      </div>

      <figcaption
        style={{
          padding: '0 24px 16px',
          color: 'var(--rs-muted)',
          fontSize: '11px',
        }}
      >
        Fictional candidate and job posting · Select any card or tab to inspect evidence reasoning.
      </figcaption>

      <style>{`
        @media (max-width: 768px) {
          .stage-body-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </figure>
  );
};
