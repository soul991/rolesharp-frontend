import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  CheckCircle2,
  Download,
  ShieldCheck,
} from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: 'paid' | 'pending';
  receiptUrl: string;
}

const INVOICE_HISTORY: Invoice[] = [
  {
    id: 'inv_2026_11_01',
    date: 'Nov 01, 2026',
    amount: '$19.00',
    plan: 'Professional Suite (Annual)',
    status: 'paid',
    receiptUrl: '#',
  },
  {
    id: 'inv_2026_10_01',
    date: 'Oct 01, 2026',
    amount: '$19.00',
    plan: 'Professional Suite (Annual)',
    status: 'paid',
    receiptUrl: '#',
  },
  {
    id: 'inv_2026_09_01',
    date: 'Sep 01, 2026',
    amount: '$19.00',
    plan: 'Professional Suite (Annual)',
    status: 'paid',
    receiptUrl: '#',
  },
];

export const BillingPage: React.FC = () => {
  const { navigate } = useRouter();

  const [notification, setNotification] = useState<string | null>(null);

  const handleUpdatePayment = () => {
    setNotification('Payment method update portal opened. Card verified via Stripe Elements.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownloadInvoice = (id: string) => {
    setNotification(`Receipt for ${id} downloaded.`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <AppShell title="Subscription, Credits & Invoices">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--rs-blue)',
              }}
            >
              Workspace settings
            </span>
            <StatusBadge status="success" label="Active Subscription" />
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-serif)',
              fontSize: '32px',
              fontWeight: 600,
              color: 'var(--rs-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Subscription, Quotas & Invoices
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14.5px', lineHeight: 1.5 }}>
            Canonical plan entitlements are synced live from your verified identity. Manage payment methods, credit quotas, and invoices.
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

        {/* Active Plan & Quotas Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '28px' }}>
          {/* Left: Active Subscription Card */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '24px',
              boxShadow: 'var(--rs-shadow)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-blue)' }}>
                    Current active plan
                  </span>
                  <h2
                    style={{
                      margin: '6px 0 2px',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '26px',
                      fontWeight: 600,
                      color: 'var(--rs-ink)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Professional Suite
                  </h2>
                  <span style={{ fontSize: '13px', color: 'var(--rs-muted)', fontVariantNumeric: 'tabular-nums' }}>
                    $19/month · Billed annually (renews Oct 31, 2027)
                  </span>
                </div>
                <StatusBadge status="success" label="Active" />
              </div>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--rs-ink)' }}>
                  <CheckCircle2 size={14} color="var(--rs-green)" />
                  <span>Unlimited Resumes & Master Versions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--rs-ink)' }}>
                  <CheckCircle2 size={14} color="var(--rs-green)" />
                  <span>Unlimited In-Memory ATS Diagnostic Scans</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--rs-ink)' }}>
                  <CheckCircle2 size={14} color="var(--rs-green)" />
                  <span>Full Job-Calibrated Tailoring with Diff Review</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--rs-ink)' }}>
                  <CheckCircle2 size={14} color="var(--rs-green)" />
                  <span>5 Controlled Outbound Email Packages / mo</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="secondary"
                onClick={() => navigate('/pricing')}
                style={{ flex: 1 }}
              >
                Change Plan
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setNotification('Plan cancellation request recorded. Subscription active until billing term end.');
                  setTimeout(() => setNotification(null), 3000);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Right: Credit Balances & Resource Quotas */}
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
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)' }}>
                Monthly resource consumption
              </span>
              <h3 style={{ margin: '6px 0 0', fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: 'var(--rs-ink)', letterSpacing: '-0.01em' }}>
                Current Usage Period
              </h3>
            </div>

            {/* Quota Progress Bar: Tailored Resumes */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--rs-ink)' }}>Tailored Job Resumes</span>
                <span style={{ color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>6 of 20 generated</span>
              </div>
              <div style={{ height: '7px', borderRadius: '4px', backgroundColor: 'var(--rs-surface-2)', overflow: 'hidden' }}>
                <div style={{ width: '30%', height: '100%', backgroundColor: 'var(--rs-blue-strong)', borderRadius: '4px' }} />
              </div>
            </div>

            {/* Quota Progress Bar: Controlled Auto Apply */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--rs-ink)' }}>Controlled Auto Apply Dispatches</span>
                <span style={{ color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>2 of 5 packages dispatched</span>
              </div>
              <div style={{ height: '7px', borderRadius: '4px', backgroundColor: 'var(--rs-surface-2)', overflow: 'hidden' }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: 'var(--rs-amber)', borderRadius: '4px' }} />
              </div>
            </div>

            {/* Active Credit Wallet */}
            <div
              style={{
                marginTop: 'auto',
                padding: '14px 16px',
                borderRadius: '10px',
                backgroundColor: 'color-mix(in srgb, var(--rs-blue-strong) 8%, var(--rs-surface))',
                border: '1px solid var(--rs-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', display: 'block' }}>
                  Available Credit Balance
                </span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: 'var(--rs-ink)', fontVariantNumeric: 'tabular-nums' }}>
                  15 Credits
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--rs-green)', marginTop: '2px' }}>
                  Includes +5 onboarding bonus credit
                </span>
              </div>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setNotification('Added 5 additional credits to your balance.');
                  setTimeout(() => setNotification(null), 2500);
                }}
              >
                Add Credits
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Method & Invoices Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {/* Payment Method Card */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '24px',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', display: 'block', marginBottom: '14px' }}>
              Payment method
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-bg)',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '28px',
                    borderRadius: '5px',
                    backgroundColor: 'var(--rs-surface-2)',
                    color: 'var(--rs-ink)',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: '1px solid var(--rs-line)',
                  }}
                >
                  VISA
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--rs-ink)', display: 'block', fontVariantNumeric: 'tabular-nums' }}>
                    •••• •••• •••• 4242
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--rs-muted)', fontVariantNumeric: 'tabular-nums' }}>Expires 08/2028 · Default</span>
                </div>
              </div>

              <Button size="sm" variant="ghost" onClick={handleUpdatePayment}>
                Update
              </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--rs-muted)' }}>
              <ShieldCheck size={14} color="var(--rs-green)" />
              <span>Encrypted 256-bit SSL transaction via Stripe PCI-DSS Level 1</span>
            </div>
          </div>

          {/* Invoice History Table */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              padding: '24px',
              boxShadow: 'var(--rs-shadow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)' }}>
                Invoice & receipt history
              </span>
              <span style={{ fontSize: '11px', color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)' }}>GET /api/account/billing</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {INVOICE_HISTORY.map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--rs-bg)',
                    border: '1px solid var(--rs-line)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--rs-ink)', display: 'block' }}>
                      {inv.plan}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--rs-muted)', fontVariantNumeric: 'tabular-nums' }}>
                      {inv.date} · {inv.amount}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <StatusBadge status="success" label="Paid" />
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(inv.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--rs-blue)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                      title="Download Invoice PDF"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};