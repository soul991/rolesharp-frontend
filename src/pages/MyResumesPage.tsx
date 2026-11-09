import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { ScoreRing } from '../components/common/ScoreRing';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Download,
  Edit3,
  Search,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export interface ResumeRecord {
  id: string;
  title: string;
  targetRole: string;
  targetCompany?: string;
  atsScore: number;
  wordCount: number;
  isMaster: boolean;
  updatedAt: string;
  version: string;
}

const INITIAL_RESUMES: ResumeRecord[] = [
  {
    id: 'res_master_01',
    title: 'Master Executive Profile (Comprehensive)',
    targetRole: 'Staff / Principal Product Leader',
    targetCompany: 'General Enterprise',
    atsScore: 92,
    wordCount: 580,
    isMaster: true,
    updatedAt: '2 hours ago',
    version: 'v3.2',
  },
  {
    id: 'res_stripe_02',
    title: 'Stripe — Staff Infrastructure & Platform Lead',
    targetRole: 'Staff Infrastructure Lead',
    targetCompany: 'Stripe',
    atsScore: 89,
    wordCount: 512,
    isMaster: false,
    updatedAt: 'Yesterday at 4:15 PM',
    version: 'v1.4',
  },
  {
    id: 'res_datadog_03',
    title: 'Datadog — Senior Systems Architect',
    targetRole: 'Senior Systems Architect',
    targetCompany: 'Datadog',
    atsScore: 86,
    wordCount: 495,
    isMaster: false,
    updatedAt: '3 days ago',
    version: 'v2.0',
  },
  {
    id: 'res_lattice_04',
    title: 'Lattice — Director of Technical Product',
    targetRole: 'Director of Product',
    targetCompany: 'Lattice',
    atsScore: 84,
    wordCount: 540,
    isMaster: false,
    updatedAt: '1 week ago',
    version: 'v1.1',
  },
];

export const MyResumesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [resumes, setResumes] = useState<ResumeRecord[]>(INITIAL_RESUMES);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const filteredResumes = resumes.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.targetCompany && r.targetCompany.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDuplicate = (resume: ResumeRecord) => {
    const duplicated: ResumeRecord = {
      ...resume,
      id: `res_dup_${Math.random().toString(36).substring(2, 7)}`,
      title: `${resume.title} (Copy)`,
      isMaster: false,
      updatedAt: 'Just now',
      version: 'v1.0',
    };
    setResumes([duplicated, ...resumes]);
    setNotification(`Duplicated "${resume.title}" as new workspace draft.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    setResumes(resumes.filter((r) => r.id !== id));
    setNotification(`Deleted "${title}".`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownload = (title: string, format: 'PDF' | 'DOCX') => {
    setNotification(`Generating and exporting ${title} in ${format} format...`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <AppShell title="My Resumes & Document Workspaces">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header Action Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '28px',
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
                Document repository
              </span>
              <StatusBadge status="info" label="4 Synced Versions" />
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
              Master Profiles & Role-Specific Tailors
            </h1>
            <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
              Every version maintains evidence citations grounded in your verified career history.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="secondary"
              onClick={() => navigate('/checker')}
              icon={<Search size={15} />}
            >
              Analyze with ATS
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/tailor')}
              icon={<Sparkles size={15} />}
            >
              Tailor for Job
            </Button>
            <Button
              onClick={() => navigate('/resume-builder')}
              icon={<Plus size={15} />}
            >
              New Resume
            </Button>
          </div>
        </div>

        {/* Temporary Notification Banner */}
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

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            padding: '12px 16px',
            borderRadius: '12px',
            backgroundColor: 'var(--rs-surface)',
            border: '1px solid var(--rs-line)',
          }}
        >
          <Search size={16} color="var(--rs-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by resume title, target role, or company..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--rs-ink)',
              fontSize: '13.5px',
            }}
          />
        </div>

        {/* Resumes List Grid */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredResumes.map((resume) => {
            return (
              <div
                key={resume.id}
                style={{
                  borderRadius: '16px',
                  border: resume.isMaster
                    ? '1.5px solid var(--rs-blue-strong)'
                    : '1px solid var(--rs-line)',
                  backgroundColor: 'var(--rs-surface)',
                  padding: '24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  transition: 'box-shadow 0.2s ease',
                  boxShadow: 'var(--rs-shadow)',
                }}
              >
                {/* Left: Metadata & Details */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: '1 1 360px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: resume.isMaster
                        ? 'color-mix(in srgb, var(--rs-blue-strong) 15%, transparent)'
                        : 'var(--rs-surface-2)',
                      display: 'grid',
                      placeItems: 'center',
                      color: resume.isMaster ? 'var(--rs-blue-strong)' : 'var(--rs-muted)',
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={22} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      {resume.isMaster && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--rs-blue-strong)',
                            color: '#FFFFFF',
                            letterSpacing: '0.06em',
                          }}
                        >
                          MASTER PROFILE
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--rs-muted)',
                        }}
                      >
                        {resume.version}
                      </span>
                    </div>

                    <h3
                      style={{
                        margin: '0 0 6px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '17px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      {resume.title}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '14px',
                        fontSize: '12.5px',
                        color: 'var(--rs-muted)',
                      }}
                    >
                      <span>
                        Target: <strong style={{ color: 'var(--rs-ink)' }}>{resume.targetRole}</strong>
                      </span>
                      {resume.targetCompany && (
                        <span>
                          Company: <strong style={{ color: 'var(--rs-ink)' }}>{resume.targetCompany}</strong>
                        </span>
                      )}
                      <span>·</span>
                      <span>{resume.wordCount} words</span>
                      <span>·</span>
                      <span>Updated {resume.updatedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Score Ring & Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ScoreRing score={resume.atsScore} size={48} strokeWidth={4} />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase' }}>
                        ATS Health
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--rs-ink)', fontFamily: 'var(--font-mono)' }}>
                        {resume.atsScore}/100
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate('/resume-builder')}
                      icon={<Edit3 size={15} />}
                      title="Edit in structured builder"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDuplicate(resume)}
                      icon={<Copy size={15} />}
                      title="Duplicate version"
                    >
                      Duplicate
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(resume.title, 'PDF')}
                      icon={<Download size={15} />}
                      title="Export PDF"
                    >
                      PDF
                    </Button>
                    {!resume.isMaster && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(resume.id, resume.title)}
                        icon={<Trash2 size={15} />}
                        title="Delete resume version"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
