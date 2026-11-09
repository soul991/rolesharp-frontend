import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  BookOpen,
  Globe,
  ChevronDown,
  ChevronUp,
  FileCheck2,
} from 'lucide-react';

const MYTHS = [
  {
    myth: 'Myth: Putting invisible white text or job descriptions in tiny font fools ATS systems.',
    reality: 'Reality: Modern applicant tracking systems (Greenhouse, Lever, Ashby, Workday) strip formatting down to raw text tokens. Invisible keywords appear as detached, un-anchored word clusters at the bottom of the parsed document, triggering immediate anti-fraud or spam flags by recruiters.',
  },
  {
    myth: 'Myth: Multi-column creative layouts with icons and progress bars make you stand out.',
    reality: 'Reality: Multi-column layouts scramble standard linear OCR scanners. When columns wrap across table cells, section headings become merged into job titles, resulting in missing experience history or zero parsed skills.',
  },
  {
    myth: 'Myth: An ATS assigns a single magical percentage score that automatically rejects candidates.',
    reality: 'Reality: Most enterprise ATS software ranks candidate relevance based on keyword match density and recruiter-configured filters, but a human recruiter or hiring manager reviews the candidate pool. Authentic evidence and readable typography win the human review.',
  },
];

export const HelpPage: React.FC = () => {
  const { navigate } = useRouter();
  const [openMythIndex, setOpenMythIndex] = useState<number | null>(0);

  const toggleMyth = (idx: number) => {
    setOpenMythIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <AppShell title="Help Center & ATS Optimization Guides">
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--rs-blue)',
              }}
            >
              KNOWLEDGE BASE & GUIDES
            </span>
            <StatusBadge status="info" label="Recruiting Best Practices" />
          </div>
          <h1
            style={{
              margin: '0 0 10px',
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--rs-ink)',
              letterSpacing: '-0.03em',
            }}
          >
            RoleSharp Help Center & ATS Knowledge Base
          </h1>
          <p style={{ margin: 0, color: 'var(--rs-muted)', fontSize: '15px', lineHeight: '1.6' }}>
            Comprehensive documentation on ATS compatibility heuristics, regional hiring standards, and responsible automation workflows.
          </p>
        </div>

        {/* Guides Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-blue)', marginBottom: '14px' }}>
              <FileCheck2 size={18} />
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              ATS Diagnostic Scoring Rules
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.5' }}>
              Learn how our 4-dimension scoring engine computes formatting safety, keyword coverage, and metric density.
            </p>
            <Button size="sm" variant="secondary" onClick={() => navigate('/checker')}>
              Open ATS Checker
            </Button>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-amber)', marginBottom: '14px' }}>
              <Globe size={18} />
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              Regional Conventions Handbook
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.5' }}>
              Differences between US Letter format, UK CV standards, EU Europass alignment, and APAC technical scale requirements.
            </p>
            <Button size="sm" variant="secondary" onClick={() => navigate('/settings')}>
              Configure Market
            </Button>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-green)', marginBottom: '14px' }}>
              <BookOpen size={18} />
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              Controlled Auto Apply Protocol
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.5' }}>
              Why RoleSharp requires explicit one-time human approval before dispatching outbound application packages.
            </p>
            <Button size="sm" variant="secondary" onClick={() => navigate('/auto-apply')}>
              View Queue
            </Button>
          </div>
        </div>

        {/* ATS Mythbusters Section */}
        <div
          style={{
            padding: '30px',
            borderRadius: '16px',
            border: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-surface)',
            boxShadow: 'var(--rs-shadow)',
            marginBottom: '32px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rs-amber)' }}>
              DEBUNKING POPULAR MYTHS
            </span>
            <h2 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              ATS Mythbusters & Engineering Realities
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MYTHS.map((item, idx) => {
              const isOpen = openMythIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleMyth(idx)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'var(--rs-ink)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 650,
                      gap: '12px',
                    }}
                  >
                    <span>{item.myth}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 16px 16px', fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.6' }}>
                      {item.reality}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
};