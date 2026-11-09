import React, { useState } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Plus,
  Search,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

export type ApplicationStatus = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';

export interface TrackerItem {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  date: string;
  salary?: string;
  location?: string;
  reminder?: string;
  notes?: string;
  sourceUrl?: string;
}

const INITIAL_APPLICATIONS: TrackerItem[] = [
  {
    id: 'app_1',
    company: 'Stripe',
    role: 'Staff Infrastructure Lead',
    status: 'interview',
    date: 'Applied Nov 3, 2026',
    salary: '$250k',
    location: 'Remote (US)',
    reminder: 'Technical Architecture Round — Thursday 2:00 PM',
    notes: 'Tailored resume v1.4 submitted. Recruiter highlighted multi-region K8s experience.',
    sourceUrl: 'https://stripe.com/jobs/staff-infrastructure-lead',
  },
  {
    id: 'app_2',
    company: 'Datadog',
    role: 'Senior Systems Architect',
    status: 'interview',
    date: 'Applied Nov 1, 2026',
    salary: '$235k',
    location: 'New York, NY',
    reminder: 'Follow-up with hiring manager regarding streaming case study',
    notes: 'Passed initial screening. Deep dive into Kafka streaming topology scheduled.',
  },
  {
    id: 'app_3',
    company: 'Linear',
    role: 'Product Systems & Experience Lead',
    status: 'applied',
    date: 'Applied Nov 7, 2026',
    salary: '$210k',
    location: 'Remote Global',
    reminder: 'Check status Nov 14',
    notes: 'Submitted via Ashby with customized cover letter focusing on state sync.',
  },
  {
    id: 'app_4',
    company: 'Figma',
    role: 'Senior Engineering Manager — Design Systems',
    status: 'saved',
    date: 'Saved Nov 8, 2026',
    salary: '$255k',
    location: 'San Francisco, CA',
    reminder: 'Tailor resume for Design Systems leadership before submitting',
  },
  {
    id: 'app_5',
    company: 'Vercel',
    role: 'Principal Edge Infrastructure Architect',
    status: 'saved',
    date: 'Saved Nov 9, 2026',
    salary: '$270k',
    location: 'Remote',
    reminder: 'Review cold-start latency reduction bullets',
  },
  {
    id: 'app_6',
    company: 'Cloudflare',
    role: 'Lead Systems Engineer',
    status: 'offer',
    date: 'Applied Oct 18, 2026',
    salary: '$260k + Equity',
    location: 'Austin, TX / Remote',
    reminder: 'Offer review deadline: Nov 15, 2026',
    notes: 'Written offer received. Evaluating equity vesting schedule and compensation package.',
  },
  {
    id: 'app_7',
    company: 'Legacy Corp',
    role: 'Enterprise Cloud Specialist',
    status: 'rejected',
    date: 'Applied Oct 12, 2026',
    notes: 'Role closed due to internal restructuring.',
  },
];

const COLUMNS: { id: ApplicationStatus; title: string; color: string }[] = [
  { id: 'saved', title: 'Saved', color: 'var(--rs-muted)' },
  { id: 'applied', title: 'Applied', color: 'var(--rs-blue-strong)' },
  { id: 'interview', title: 'Interviewing', color: 'var(--rs-amber)' },
  { id: 'offer', title: 'Offer Received', color: 'var(--rs-emerald)' },
  { id: 'rejected', title: 'Archived / Rejected', color: '#6b7280' },
];

export const TrackerPage: React.FC = () => {
  const [applications, setApplications] = useState<TrackerItem[]>(INITIAL_APPLICATIONS);
  const [searchFilter, setSearchFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New App Form State
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('saved');

  const filteredApps = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      app.role.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleMoveStatus = (id: string, nextStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: nextStatus } : app))
    );
    setNotification(`Moved application to ${nextStatus.toUpperCase()}.`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleDelete = (id: string, title: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setNotification(`Removed "${title}" from tracker.`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    const newApp: TrackerItem = {
      id: `app_${Math.random().toString(36).substring(2, 7)}`,
      company: newCompany,
      role: newRole,
      salary: newSalary || undefined,
      status: newStatus,
      date: 'Added today',
    };

    setApplications([newApp, ...applications]);
    setShowAddModal(false);
    setNewCompany('');
    setNewRole('');
    setNewSalary('');
    setNotification(`Added "${newRole} at ${newCompany}" to tracker.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <AppShell title="Application Tracker Pipeline">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--rs-blue)',
                }}
              >
                ACTIVE PIPELINE
              </span>
              <StatusBadge status="info" label={`${applications.length} Tracked Roles`} />
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
              5-Stage Opportunity Pipeline
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: 'var(--rs-surface)',
                border: '1px solid var(--rs-line)',
              }}
            >
              <Search size={15} color="var(--rs-muted)" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by company or role..."
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--rs-ink)',
                  fontSize: '13px',
                }}
              />
            </div>

            <Button onClick={() => setShowAddModal(true)} icon={<Plus size={16} />}>
              Add Application
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

        {/* Modal: Add New Application */}
        {showAddModal && (
          <div
            style={{
              marginBottom: '24px',
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: 'var(--rs-surface)',
              border: '1.5px solid var(--rs-blue-strong)',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <h2 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--rs-ink)' }}>
              Add New Opportunity to Tracker
            </h2>
            <form onSubmit={handleAddApplication}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label htmlFor="tracker-company" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    COMPANY NAME *
                  </label>
                  <input
                    id="tracker-company"
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. OpenAI, Notion, Linear"
                    style={{
                      width: '100%',
                      padding: '10px',
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
                  <label htmlFor="tracker-role" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    ROLE TITLE *
                  </label>
                  <input
                    id="tracker-role"
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Staff Platform Engineer"
                    style={{
                      width: '100%',
                      padding: '10px',
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
                  <label htmlFor="tracker-salary" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    TARGET SALARY (OPTIONAL)
                  </label>
                  <input
                    id="tracker-salary"
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. $240,000"
                    style={{
                      width: '100%',
                      padding: '10px',
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
                  <label htmlFor="tracker-stage" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', marginBottom: '4px' }}>
                    INITIAL STAGE
                  </label>
                  <select
                    id="tracker-stage"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interviewing</option>
                    <option value="offer">Offer Received</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button size="sm" variant="ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Save to Pipeline
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* 5-Column Kanban Board */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(220px, 1fr))',
            gap: '16px',
            alignItems: 'start',
            overflowX: 'auto',
            paddingBottom: '24px',
          }}
        >
          {COLUMNS.map((col) => {
            const colApps = filteredApps.filter((a) => a.status === col.id);

            return (
              <div
                key={col.id}
                style={{
                  borderRadius: '14px',
                  backgroundColor: 'var(--rs-surface-2)',
                  border: '1px solid var(--rs-line)',
                  padding: '16px',
                  minHeight: '480px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Column Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--rs-line)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: col.color,
                      }}
                    />
                    <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--rs-ink)' }}>
                      {col.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--rs-surface)',
                      color: 'var(--rs-muted)',
                      border: '1px solid var(--rs-line)',
                    }}
                  >
                    {colApps.length}
                  </span>
                </div>

                {/* Cards in Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--rs-surface)',
                        border: '1px solid var(--rs-line)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--rs-blue-strong)' }}>
                            {app.company}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDelete(app.id, `${app.role} at ${app.company}`)}
                            style={{
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'var(--rs-muted)',
                              cursor: 'pointer',
                              padding: '2px',
                            }}
                            title="Remove application"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '14.5px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                          {app.role}
                        </h3>

                        {app.salary && (
                          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--rs-emerald)', marginTop: '2px' }}>
                            {app.salary}
                          </div>
                        )}
                      </div>

                      {app.reminder && (
                        <div
                          style={{
                            padding: '6px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'color-mix(in srgb, var(--rs-amber) 10%, var(--rs-surface))',
                            borderLeft: '2px solid var(--rs-amber)',
                            fontSize: '11px',
                            color: 'var(--rs-ink)',
                            lineHeight: '1.4',
                          }}
                        >
                          ⏰ {app.reminder}
                        </div>
                      )}

                      {/* Stage Progression Selector */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--rs-line)',
                          fontSize: '11px',
                        }}
                      >
                        <span style={{ color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)' }}>
                          {app.date}
                        </span>

                        <select
                          id={`stage-select-${app.id}`}
                          name={`stage-select-${app.id}`}
                          aria-label={`Move stage for ${app.role} at ${app.company}`}
                          value={app.status}
                          onChange={(e) => handleMoveStatus(app.id, e.target.value as ApplicationStatus)}
                          style={{
                            padding: '3px 6px',
                            borderRadius: '6px',
                            border: '1px solid var(--rs-line)',
                            backgroundColor: 'var(--rs-surface-2)',
                            color: 'var(--rs-ink)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            outline: 'none',
                          }}
                        >
                          <option value="saved">Saved</option>
                          <option value="applied">Applied</option>
                          <option value="interview">Interview</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
