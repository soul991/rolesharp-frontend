import React, { useState } from 'react';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ExternalLink,
  Lock,
  X,
  FileCheck2,
} from 'lucide-react';

export type PackageStatus =
  | 'queued'
  | 'sending'
  | 'accepted by provider [delivery unverified]'
  | 'rejected'
  | 'unknown';

export interface ApplicationPackage {
  id: string;
  company: string;
  role: string;
  recipientEmail: string;
  recipientEvidence: string;
  subjectLine: string;
  coverLetterSnippet: string;
  attachedResumeName: string;
  attachedResumeSha: string;
  createdAt: string;
  expiresAt: string;
  status: PackageStatus;
  sourceUrl: string;
}

const INITIAL_PACKAGES: ApplicationPackage[] = [
  {
    id: 'pkg_stripe_01',
    company: 'Stripe',
    role: 'Staff Infrastructure & Platform Lead',
    recipientEmail: 'infrastructure-hiring@stripe.com',
    recipientEvidence: 'Publicly listed on official Stripe careers posting: "Apply via email to infrastructure-hiring@stripe.com with subject tag [INFRA-LEAD]"',
    subjectLine: '[INFRA-LEAD] Alex Morgan — Application for Staff Infrastructure & Platform Lead',
    coverLetterSnippet:
      'Dear Hiring Team at Stripe,\n\nI am writing to express my enthusiastic candidacy for the Staff Infrastructure & Platform Lead position. Having followed Stripe’s distributed computing publications and infrastructure milestones...',
    attachedResumeName: 'Alex_Morgan_Stripe_Infrastructure_v1.4.pdf',
    attachedResumeSha: 'sha256:4f8a129d8b76c5e2193b...',
    createdAt: 'Nov 09, 2026 14:30',
    expiresAt: 'Nov 12, 2026 14:30 (48h remaining)',
    status: 'queued',
    sourceUrl: 'https://stripe.com/jobs/infrastructure-lead',
  },
  {
    id: 'pkg_datadog_02',
    company: 'Datadog',
    role: 'Senior Systems Architect',
    recipientEmail: 'systems-recruiting@datadoghq.com',
    recipientEvidence: 'Explicit recruiting contact listed on Datadog engineering blog publication.',
    subjectLine: 'Systems Architect Application — Alex Morgan (Grounded Profile)',
    coverLetterSnippet:
      'Dear Datadog Systems Team,\n\nI am architecting high-throughput distributed compute platforms that maintain four-nines reliability under extreme volume...',
    attachedResumeName: 'Alex_Morgan_Datadog_Systems_v2.0.pdf',
    attachedResumeSha: 'sha256:9a32c7e1104e...',
    createdAt: 'Nov 08, 2026 11:15',
    expiresAt: 'Expired Nov 11, 2026',
    status: 'accepted by provider [delivery unverified]',
    sourceUrl: 'https://careers.datadoghq.com/detail/1092',
  },
  {
    id: 'pkg_linear_03',
    company: 'Linear',
    role: 'Product Systems & Experience Lead',
    recipientEmail: 'jobs@linear.app',
    recipientEvidence: 'Explicit instructions on Linear careers: "Email portfolio and cover note directly to jobs@linear.app"',
    subjectLine: 'Application: Product Systems Lead — Alex Morgan',
    coverLetterSnippet:
      'Dear Karri and the Linear team,\n\nLinear’s commitment to craft, speed, and keyboard-first developer UX represents the standard I strive for...',
    attachedResumeName: 'Alex_Morgan_Linear_Experience_v1.0.pdf',
    attachedResumeSha: 'sha256:bc3991ae8802...',
    createdAt: 'Nov 07, 2026 09:20',
    expiresAt: 'Nov 10, 2026 09:20',
    status: 'unknown',
    sourceUrl: 'https://linear.app/careers/product-systems',
  },
];

export const AutoApplyPage: React.FC = () => {
  const [packages, setPackages] = useState<ApplicationPackage[]>(INITIAL_PACKAGES);
  const [selectedPackage, setSelectedPackage] = useState<ApplicationPackage | null>(INITIAL_PACKAGES[0]);
  const [isApproving, setIsApproving] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const getStatusBadge = (status: PackageStatus) => {
    switch (status) {
      case 'queued':
        return <StatusBadge status="warning" label="Ready for Human Review" />;
      case 'sending':
        return <StatusBadge status="info" label="Sending..." />;
      case 'accepted by provider [delivery unverified]':
        return <StatusBadge status="success" label="Accepted by Provider" />;
      case 'rejected':
        return <StatusBadge status="danger" label="Rejected by Server" />;
      case 'unknown':
        return <StatusBadge status="neutral" label="Terminal: Unknown Outcome" />;
    }
  };

  const handleApprovePackage = () => {
    if (!selectedPackage) return;
    setIsApproving(true);
    setTimeout(() => {
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === selectedPackage.id
            ? { ...pkg, status: 'accepted by provider [delivery unverified]' }
            : pkg
        )
      );
      setSelectedPackage((prev) =>
        prev ? { ...prev, status: 'accepted by provider [delivery unverified]' } : null
      );
      setIsApproving(false);
      setApprovalModalOpen(false);
      setNotification(`Package for ${selectedPackage.company} approved and dispatched via verified send-only mailbox.`);
      setTimeout(() => setNotification(null), 3500);
    }, 700);
  };

  return (
    <AppShell title="Controlled Auto Apply Queue">
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
              Controlled application dispatch
            </span>
            <StatusBadge status="success" label="Human-in-the-Loop Enforced" />
            <span style={{ fontSize: '12px', color: 'var(--rs-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="var(--rs-green)" /> Zero Unsolicited Spam
            </span>
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
            Controlled Auto Apply Review Queue
          </h1>
          <p style={{ margin: '8px 0 0', color: 'var(--rs-muted)', fontSize: '14.5px', lineHeight: 1.55 }}>
            RoleSharp rejects blind bot spamming. Outbound email packages are prepared strictly for postings with verified contact paths and require explicit one-time human approval.
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

        {/* Safety Assurances Bar */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            backgroundColor: 'var(--rs-surface)',
            border: '1px solid var(--rs-line)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
            boxShadow: 'var(--rs-shadow)',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-blue)' }}>
              <Mail size={16} />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)', display: 'block' }}>
                Send-Only Mailbox Connected
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--rs-muted)' }}>
                alex.morgan@lattice.io · Zero read access to personal inbox
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-amber)' }}>
              <Lock size={16} />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)', display: 'block' }}>
                Immutable Package Contract
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--rs-muted)' }}>
                Every payload is cryptographic SHA-anchored before dispatch
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-green)' }}>
              <ShieldCheck size={16} />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)', display: 'block' }}>
                Terminal Unknown Policy
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--rs-muted)' }}>
                No aggressive retry loops; employer direct link always provided
              </span>
            </div>
          </div>
        </div>

        {/* Master-Detail Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
          {/* Left Column: Package Queue List */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '20px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rs-ink)' }}>
                Pending & recent packages ({packages.length})
              </span>
              <span style={{ fontSize: '11px', color: 'var(--rs-muted)' }}>GET /api/application-packages</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {packages.map((pkg) => {
                const isSelected = selectedPackage?.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid var(--rs-blue-strong)' : '1px solid var(--rs-line)',
                      backgroundColor: isSelected
                        ? 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))'
                        : 'var(--rs-bg)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                        {pkg.company}
                      </span>
                      {getStatusBadge(pkg.status)}
                    </div>
                    <span style={{ fontSize: '12.5px', color: 'var(--rs-muted)' }}>
                      {pkg.role}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '11px', color: 'var(--rs-muted)' }}>
                      <span>To: {pkg.recipientEmail}</span>
                      <span>{pkg.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Immutable Package Inspection */}
          {selectedPackage && (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rs-blue)' }}>
                    Immutable payload review
                  </span>
                  <h2
                    style={{
                      margin: '4px 0 2px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--rs-ink)',
                    }}
                  >
                    {selectedPackage.company} — {selectedPackage.role}
                  </h2>
                  <span style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                    Package ID: {selectedPackage.id} · Expires: {selectedPackage.expiresAt}
                  </span>
                </div>
                {getStatusBadge(selectedPackage.status)}
              </div>

              {/* Recipient Provenance Evidence Box */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))',
                  border: '1px solid color-mix(in srgb, var(--rs-blue-strong) 25%, transparent)',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rs-blue)', display: 'block', marginBottom: '4px' }}>
                  Verified recipient pathway evidence
                </span>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-ink)', lineHeight: '1.4' }}>
                  {selectedPackage.recipientEvidence}
                </p>
                <a
                  href={selectedPackage.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: 'var(--rs-blue)',
                    marginTop: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Inspect Original Source Posting <ExternalLink size={11} />
                </a>
              </div>

              {/* Payload Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rs-muted)', display: 'block', marginBottom: '4px' }}>
                    Destination address
                  </span>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: 'var(--rs-bg)', border: '1px solid var(--rs-line)', fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--rs-ink)' }}>
                    {selectedPackage.recipientEmail}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rs-muted)', display: 'block', marginBottom: '4px' }}>
                    Subject line
                  </span>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: 'var(--rs-bg)', border: '1px solid var(--rs-line)', fontSize: '13px', color: 'var(--rs-ink)' }}>
                    {selectedPackage.subjectLine}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rs-muted)', display: 'block', marginBottom: '4px' }}>
                    Attached resume PDF
                  </span>
                  <div style={{ padding: '10px 12px', borderRadius: '6px', backgroundColor: 'var(--rs-bg)', border: '1px solid var(--rs-line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileCheck2 size={16} color="var(--rs-blue)" />
                      <div>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--rs-ink)', display: 'block' }}>
                          {selectedPackage.attachedResumeName}
                        </span>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--rs-muted)' }}>
                          {selectedPackage.attachedResumeSha}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--rs-muted)', display: 'block', marginBottom: '4px' }}>
                    Cover note content
                  </span>
                  <div
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--rs-bg)',
                      border: '1px solid var(--rs-line)',
                      fontSize: '12.5px',
                      color: 'var(--rs-ink)',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line',
                      maxHeight: '140px',
                      overflowY: 'auto',
                    }}
                  >
                    {selectedPackage.coverLetterSnippet}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ marginTop: '6px', display: 'flex', gap: '10px' }}>
                {selectedPackage.status === 'queued' ? (
                  <Button
                    onClick={() => setApprovalModalOpen(true)}
                    icon={<Send size={15} />}
                    style={{ flex: 1 }}
                  >
                    Review & One-Time Approve Dispatch
                  </Button>
                ) : selectedPackage.status === 'unknown' ? (
                  <div style={{ width: '100%' }}>
                    <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: 'var(--rs-surface-2)', border: '1px solid var(--rs-line)', fontSize: '12px', color: 'var(--rs-muted)', marginBottom: '8px' }}>
                      Outcome unknown: provider did not return verifiable delivery handshake. No automatic retry will be performed. Use original source link to verify application directly.
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => window.open(selectedPackage.sourceUrl, '_blank')}
                      icon={<ExternalLink size={14} />}
                      style={{ width: '100%' }}
                    >
                      Visit Employer Career Page
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--rs-green)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} />
                    <span>Payload dispatched and accepted by recipient server.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Explicit Human Approval Confirmation Modal */}
        {approvalModalOpen && selectedPackage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-modal-title"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'grid',
              placeItems: 'center',
              zIndex: 100,
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                borderRadius: '16px',
                backgroundColor: 'var(--rs-surface)',
                border: '1px solid var(--rs-line)',
                padding: '28px',
                boxShadow: 'var(--rs-shadow)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--rs-surface-2)', display: 'grid', placeItems: 'center', color: 'var(--rs-blue)' }}>
                    <Send size={18} />
                  </div>
                  <div>
                    <h3 id="approval-modal-title" style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                      Confirm One-Time Outbound Dispatch
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                      {selectedPackage.company} · {selectedPackage.role}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setApprovalModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--rs-muted)', cursor: 'pointer', padding: 0 }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--rs-muted)', lineHeight: '1.5', marginBottom: '18px' }}>
                You are about to transmit this package from your verified send-only address (<strong style={{ color: 'var(--rs-ink)' }}>alex.morgan@lattice.io</strong>) to <strong style={{ color: 'var(--rs-ink)' }}>{selectedPackage.recipientEmail}</strong>.
              </div>

              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: 'color-mix(in srgb, var(--rs-amber) 12%, var(--rs-surface))',
                  border: '1px solid var(--rs-amber)',
                  fontSize: '12px',
                  color: 'var(--rs-ink)',
                  marginBottom: '20px',
                }}
              >
                <strong>Non-Reversible Action:</strong> Once dispatched, the payload cannot be recalled. The recipient receives your attached PDF resume and tailored cover letter.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="ghost" onClick={() => setApprovalModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleApprovePackage}
                  loading={isApproving}
                  icon={<Send size={14} />}
                >
                  Approve & Dispatch Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};