import React, { useState } from 'react';
import { AppShell } from '../components/common/AppShell';
import { PricingSection } from '../components/pricing/PricingSection';
import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const FAQS = [
  {
    q: 'Can I switch between monthly and annual plans at any time?',
    a: 'Yes. When upgrading from monthly to annual billing, any unused days on your active monthly plan are prorated and credited immediately toward your annual subscription.',
  },
  {
    q: 'How does the student discount verification work?',
    a: 'Simply register with an active university or accredited educational domain email (.edu, .ac.uk, etc.). The 50% discount applies automatically to your account for 12 months.',
  },
  {
    q: 'What does "Controlled Auto Apply" mean?',
    a: 'Unlike dangerous bots that blast hundreds of spam applications and get candidates blacklisted, RoleSharp prepares complete, immutable application packages that require your explicit one-time manual approval before outbound dispatch. Packages are only generated when an employer explicitly publishes an email or direct contact pathway.',
  },
  {
    q: 'Will my credit card be automatically charged after cancellation?',
    a: 'No. Cancellation is immediate with zero retention friction. You will never be charged again, and you retain full plan access until your current paid billing period concludes.',
  },
];

export const PricingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <AppShell title="Pricing & Subscription Plans">
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Render Superdesign Pricing Section */}
        <PricingSection />

        {/* FAQ Accordion Section */}
        <div style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--rs-blue)',
              }}
            >
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3
              style={{
                margin: '8px 0 0',
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
              }}
            >
              Everything you need to know about plans & billing
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-surface)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'var(--rs-ink)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14.5px',
                      fontWeight: 650,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={18} color="var(--rs-blue-strong)" />
                    ) : (
                      <ChevronDown size={18} color="var(--rs-muted)" />
                    )}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 20px 18px',
                        fontSize: '13.5px',
                        color: 'var(--rs-muted)',
                        lineHeight: '1.55',
                      }}
                    >
                      {faq.a}
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