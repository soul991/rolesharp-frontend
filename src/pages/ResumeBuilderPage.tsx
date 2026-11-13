import React, { useState } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { TemplateCardStack, TEMPLATES, ResumeTemplate } from '../components/resume/TemplateCardStack';
import {
  Save,
  Download,
  CheckCircle2,
} from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export const ResumeBuilderPage: React.FC = () => {
  // Selected Template
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(TEMPLATES[0]);

  // Form State
  const [fullName, setFullName] = useState('Alex Morgan, PMP');
  const [headline, setHeadline] = useState('Staff Infrastructure & Platform Architect');
  const [email, setEmail] = useState('alex.morgan@lattice.io');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [location, setLocation] = useState('San Francisco, CA');
  const [summary, setSummary] = useState(
    'Staff systems leader with 9+ years experience architecting high-throughput microservices, cutting P99 latency, and driving automated CI/CD canary deployments across multi-region cloud infrastructure.'
  );

  const [experiences] = useState<ExperienceItem[]>([
    {
      id: 'exp_1',
      role: 'Staff Systems Architect',
      company: 'Enterprise Platform Group',
      period: '2022 — Present',
      bullets: [
        'Orchestrated multi-region Kubernetes migration of 14 core microservices, slashing P99 latency by 42% and raising service uptime to 99.98% across 4 production zones.',
        'Engineered automated canary deployment gates and CI/CD pipelines, decreasing customer-impacting rollback incidents by 28% across 45 engineering contributors.',
      ],
    },
    {
      id: 'exp_2',
      role: 'Senior Backend Engineer',
      company: 'Fintech Solutions Inc.',
      period: '2019 — 2022',
      bullets: [
        'Architected distributed event streaming architecture using Apache Kafka and PostgreSQL, processing 45k financial transactions per second with sub-50ms consistency.',
        'Mentored 8 engineers across frontend and backend squads, establishing automated test coverage benchmarks of 92%.',
      ],
    },
  ]);

  const [skills, setSkills] = useState(
    'Kubernetes, Distributed Systems, Go, Python, PostgreSQL, Kafka, CI/CD Canary, P99 Latency Optimization, AWS/GCP'
  );

  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'templates'>('editor');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = () => {
    setNotification('Resume version successfully saved to your verified workspace repository.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExport = (format: 'PDF' | 'DOCX') => {
    setNotification(`Exporting "${fullName} — ${selectedTemplate.name}" as ${format}...`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <AppShell title="Precision Resume Builder & Stacks">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header Action Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--rs-blue-strong)',
                }}
              >
                Structured builder
              </span>
              <StatusBadge status="info" label={selectedTemplate.name} />
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontSize: '28px',
                fontWeight: 600,
                color: 'var(--rs-ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              Resume Workspace Editor
            </h1>
          </div>

          {/* Mode Switcher Tabs & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', borderRadius: '8px', backgroundColor: 'var(--rs-surface-2)', padding: '3px' }}>
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: viewMode === 'editor' ? 'var(--rs-surface)' : 'transparent',
                  color: viewMode === 'editor' ? 'var(--rs-ink)' : 'var(--rs-muted)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Content Editor
              </button>
              <button
                type="button"
                onClick={() => setViewMode('templates')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: viewMode === 'templates' ? 'var(--rs-surface)' : 'transparent',
                  color: viewMode === 'templates' ? 'var(--rs-ink)' : 'var(--rs-muted)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Card Stack ({TEMPLATES.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: viewMode === 'preview' ? 'var(--rs-surface)' : 'transparent',
                  color: viewMode === 'preview' ? 'var(--rs-ink)' : 'var(--rs-muted)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Paper Preview
              </button>
            </div>

            <Button size="sm" variant="secondary" onClick={handleSave} icon={<Save size={14} />}>
              Save
            </Button>
            <Button size="sm" onClick={() => handleExport('PDF')} icon={<Download size={14} />}>
              Export PDF
            </Button>
          </div>
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

        {/* TAB 1: CONTENT EDITOR */}
        {viewMode === 'editor' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Form Fields */}
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                padding: '28px',
                boxShadow: 'var(--rs-shadow)',
              }}
            >
              <h2 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--rs-ink)' }}>
                1. Personal & Contact Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label htmlFor="builder-fullname" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    FULL NAME
                  </label>
                  <input
                    id="builder-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="builder-headline" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    PROFESSIONAL TITLE
                  </label>
                  <input
                    id="builder-headline"
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <label htmlFor="builder-email" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    EMAIL
                  </label>
                  <input
                    id="builder-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="builder-phone" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    PHONE
                  </label>
                  <input
                    id="builder-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="builder-location" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    LOCATION
                  </label>
                  <input
                    id="builder-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--rs-ink)' }}>
                  2. Executive Summary
                </h2>
                <textarea
                  id="builder-summary"
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Experience Bullets */}
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--rs-ink)' }}>
                  3. Experience & Quantified Achievements
                </h2>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--rs-bg)',
                      border: '1px solid var(--rs-line)',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--rs-ink)' }}>
                        {exp.role} · {exp.company}
                      </strong>
                      <span style={{ fontSize: '12px', color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)' }}>
                        {exp.period}
                      </span>
                    </div>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ fontSize: '12px', color: 'var(--rs-ink)', marginBottom: '4px', paddingLeft: '8px' }}>
                        • {b}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--rs-ink)' }}>
                  4. Core Competencies & Technologies
                </h2>
                <input
                  id="builder-skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Live Paper Sheet Preview (Right column) */}
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                padding: '24px',
                boxShadow: 'var(--rs-shadow)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rs-ink)' }}>
                  Live document preview ({selectedTemplate.name})
                </span>
                <span style={{ fontSize: '11px', color: 'var(--rs-blue-strong)', fontWeight: 600 }}>
                  Single column · 100% ATS safe
                </span>
              </div>

              {/* Invariant Ivory/White Paper Sheet */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#172B48',
                  borderRadius: '6px',
                  border: '1px solid #D5DFEA',
                  padding: '28px 32px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  minHeight: '520px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <div style={{ borderBottom: '2px solid #172B48', paddingBottom: '10px', marginBottom: '14px' }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '18px', color: '#10243E' }}>
                    {fullName}
                  </h3>
                  <div style={{ color: '#2458A6', fontWeight: 600, fontSize: '12px', marginBottom: '2px' }}>
                    {headline}
                  </div>
                  <div style={{ color: '#52647A', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                    {location} · {email} · {phone}
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '-0.01em', color: '#10243E', borderBottom: '1px solid #D5DFEA', paddingBottom: '2px', marginBottom: '4px' }}>
                    Executive Summary
                  </div>
                  <p style={{ margin: 0, lineHeight: '1.4', color: '#2C3E50' }}>{summary}</p>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '-0.01em', color: '#10243E', borderBottom: '1px solid #D5DFEA', paddingBottom: '2px', marginBottom: '6px' }}>
                    Professional Experience
                  </div>
                  {experiences.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                        <span>{exp.role} — {exp.company}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>{exp.period}</span>
                      </div>
                      {exp.bullets.map((b, idx) => (
                        <div key={idx} style={{ lineHeight: '1.4', color: '#172B48', paddingLeft: '4px' }}>
                          • {b}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '-0.01em', color: '#10243E', borderBottom: '1px solid #D5DFEA', paddingBottom: '2px', marginBottom: '4px' }}>
                    Core Competencies
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '10px' }}>{skills}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE CARD STACK */}
        {viewMode === 'templates' && (
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '36px',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <TemplateCardStack
              selectedTemplateId={selectedTemplate.id}
              onSelectTemplate={(tmpl) => setSelectedTemplate(tmpl)}
            />
          </div>
        )}

        {/* TAB 3: FULL PAPER PREVIEW */}
        {viewMode === 'preview' && (
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '40px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '720px',
                backgroundColor: '#FFFFFF',
                color: '#172B48',
                borderRadius: '8px',
                border: '1px solid #D5DFEA',
                padding: '44px 52px',
                boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
                minHeight: '680px',
                fontSize: '12.5px',
                fontFamily: 'var(--font-body)',
              }}
            >
              <div style={{ borderBottom: '2px solid #172B48', paddingBottom: '16px', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '26px', color: '#10243E' }}>
                  {fullName}
                </h2>
                <div style={{ color: '#2458A6', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                  {headline}
                </div>
                <div style={{ color: '#52647A', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  {location} · {email} · {phone}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 700, fontSize: '12px', letterSpacing: '-0.01em', color: '#10243E', borderBottom: '1px solid #D5DFEA', paddingBottom: '4px', marginBottom: '8px' }}>
                  Executive summary
                </div>
                <p style={{ margin: 0, lineHeight: '1.6', color: '#2C3E50' }}>{summary}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: 700, fontSize: '12px', letterSpacing: '-0.01em', color: '#10243E', borderBottom: '1px solid #D5DFEA', paddingBottom: '4px', marginBottom: '10px' }}>
                  Professional experience
                </div>
                {experiences.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '13px' }}>
                      <span>{exp.role} — {exp.company}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#52647A' }}>
                        {exp.period}
                      </span>
                    </div>
                    {exp.bullets.map((b, idx) => (
                      <div key={idx} style={{ lineHeight: '1.5', color: '#172B48', paddingLeft: '8px', marginTop: '4px' }}>
                        • {b}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '12px', letterSpacing: '-0.01em', color: '#10243E', borderBottom: '1px solid #D5DFEA', paddingBottom: '4px', marginBottom: '6px' }}>
                  Core competencies & tools
                </div>
                <div style={{ color: '#2C3E50', lineHeight: '1.5' }}>{skills}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
