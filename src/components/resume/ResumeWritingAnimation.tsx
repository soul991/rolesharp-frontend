import React, { useEffect, useState } from 'react';
import { PenTool, CheckCircle, Sparkles } from 'lucide-react';

export interface ResumeWritingAnimationProps {
  isGenerating?: boolean;
  onComplete?: () => void;
  speedMs?: number;
  sampleLines?: string[];
  candidateName?: string;
  targetRole?: string;
  company?: string;
}

const DEFAULT_LINES = [
  '• Spearheaded cross-functional delivery of enterprise ML scoring pipeline, reducing manual review latency by 42%.',
  '• Orchestrated migration of 14 core microservices to Kubernetes, achieving 99.98% service uptime across 4 regions.',
  '• Mentored 8 junior and mid-level engineers, resulting in 3 internal promotions within 12 months.',
  '• Authored technical RFCs and established automated CI/CD gating, cutting regression incidents by 28%.',
  '• Partnered directly with executive stakeholders to align technical roadmap with Q3 fiscal expansion objectives.',
];

const GENERATION_PHASES = [
  'Extracting required competencies from job description...',
  'Grounding candidate evidence and verifying metrics...',
  'Tailoring action verbs and domain-specific keywords...',
  'Validating strict single-column ATS typography...',
  'Polishing syntax and generating production artifact...',
];

export const ResumeWritingAnimation: React.FC<ResumeWritingAnimationProps> = ({
  isGenerating = true,
  onComplete,
  speedMs = 700,
  sampleLines = DEFAULT_LINES,
  candidateName = 'Alex Morgan',
  targetRole = 'Senior Staff Engineer',
  company = 'Enterprise Partner',
}) => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealedCount(sampleLines.length);
      setIsCompleted(true);
      onComplete?.();
      return;
    }

    if (!isGenerating) {
      setRevealedCount(sampleLines.length);
      setIsCompleted(true);
      return;
    }

    setRevealedCount(0);
    setIsCompleted(false);
    setPhaseIndex(0);

    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        const next = prev + 1;
        setPhaseIndex(Math.min(next, GENERATION_PHASES.length - 1));
        if (next >= sampleLines.length) {
          clearInterval(interval);
          setIsCompleted(true);
          onComplete?.();
          return sampleLines.length;
        }
        return next;
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [isGenerating, speedMs, prefersReducedMotion, sampleLines.length]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      {/* Progress & Status Header */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          borderRadius: '12px',
          backgroundColor: 'var(--rs-surface)',
          border: '1px solid var(--rs-line)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: isCompleted
                ? 'color-mix(in srgb, var(--rs-emerald) 18%, transparent)'
                : 'color-mix(in srgb, var(--rs-blue-strong) 18%, transparent)',
              display: 'grid',
              placeItems: 'center',
              color: isCompleted ? 'var(--rs-emerald)' : 'var(--rs-blue-strong)',
              transition: 'all 0.3s ease',
            }}
          >
            {isCompleted ? <CheckCircle size={16} /> : <Sparkles size={16} />}
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {isCompleted ? 'Tailored Resume Ready' : 'Synthesizing Verified Document'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--rs-muted)' }}>
              {isCompleted
                ? `Calibrated for ${targetRole} at ${company}`
                : GENERATION_PHASES[phaseIndex]}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '100px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: 'var(--rs-line)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: isCompleted ? 'var(--rs-emerald)' : 'var(--rs-blue-strong)',
                width: `${Math.round((revealedCount / Math.max(1, sampleLines.length)) * 100)}%`,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              color: isCompleted ? 'var(--rs-emerald)' : 'var(--rs-blue-strong)',
              minWidth: '38px',
              textAlign: 'right',
            }}
          >
            {Math.round((revealedCount / Math.max(1, sampleLines.length)) * 100)}%
          </span>
        </div>
      </div>

      {/* Superdesign White Paper Sheet */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          color: '#172B48',
          borderRadius: '8px',
          border: '1px solid #D5DFEA',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
          padding: '40px 48px',
          fontFamily: 'var(--font-body)',
          minHeight: '440px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Document Header */}
        <div style={{ borderBottom: '2px solid #172B48', paddingBottom: '16px', marginBottom: '20px' }}>
          <h2
            style={{
              margin: '0 0 4px',
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 700,
              color: '#10243E',
              letterSpacing: '-0.02em',
            }}
          >
            {candidateName}
          </h2>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#2458A6', marginBottom: '4px' }}>
            {targetRole} · Calibrated for {company}
          </div>
          <div style={{ fontSize: '11px', color: '#52647A', fontFamily: 'var(--font-mono)' }}>
            San Francisco, CA · alex.morgan@lattice.io · +1 (555) 019-2834 · linkedin.com/in/alexmorgan
          </div>
        </div>

        {/* Section: Professional Summary */}
        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#10243E',
              borderBottom: '1px solid #D5DFEA',
              paddingBottom: '4px',
              marginBottom: '8px',
            }}
          >
            Professional Experience & Verified Achievements
          </div>
          <div style={{ fontSize: '12.5px', lineHeight: '1.5', color: '#2C3E50', marginBottom: '14px' }}>
            Accomplished technology leader with 9+ years delivering distributed cloud systems. Proven
            record architecting resilient microservices, reducing MTTR, and mentoring engineering teams.
          </div>
        </div>

        {/* Progressive Line Reveal with Pen Cursor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sampleLines.map((line, idx) => {
            const isRevealed = idx < revealedCount;
            const isCurrentlyWriting = idx === revealedCount - 1 && !isCompleted;

            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  opacity: isRevealed ? 1 : 0.12,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(4px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: '12px',
                  lineHeight: '1.6',
                  color: '#172B48',
                  paddingLeft: '4px',
                }}
              >
                <span>{line}</span>

                {/* Animated Moving Pen Nib on the currently written line */}
                {isCurrentlyWriting && !prefersReducedMotion && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginLeft: '6px',
                      color: '#2458A6',
                      animation: 'penWrite 0.6s infinite alternate ease-in-out',
                      verticalAlign: 'middle',
                    }}
                    aria-hidden="true"
                  >
                    <PenTool size={14} style={{ transform: 'rotate(-45deg)' }} />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Paper Watermark / Brand Signature */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: '#A9BAD1',
            letterSpacing: '0.05em',
          }}
        >
          ROLESHARP 2.0 ATS VERIFIED · 100% EVIDENCE GROUNDED
        </div>
      </div>
    </div>
  );
};
