import React, { useState } from 'react';
import { useRouter } from '../../router/RouterContext';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import {
  Check,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Star,
} from 'lucide-react';

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  limits: {
    resumes: string;
    atsScans: string;
    tailoring: string;
    autoApply: string;
    coverLetters: string;
  };
  ctaLabel: string;
  ctaVariant: 'primary' | 'secondary' | 'ghost';
}

const PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Career',
    tagline: 'Essential diagnostics and resume drafting for active job seekers.',
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    features: [
      '1 Master Resume Profile',
      '3 In-Memory ATS Diagnostic Scans / mo',
      'Standard Single-Column ATS Template',
      'Grounded Cover Letter Synthesizer',
      'Job Finder & Application Tracker (5-Column Kanban)',
    ],
    limits: {
      resumes: '1 Active Version',
      atsScans: '3 scans / mo',
      tailoring: 'Manual bullet editing',
      autoApply: 'Not included',
      coverLetters: 'Standard draft',
    },
    ctaLabel: 'Start Free Account',
    ctaVariant: 'secondary',
  },
  {
    id: 'pro',
    name: 'Professional Suite',
    tagline: 'Full algorithmic calibration, evidence tailoring, and interview rehearsal.',
    monthlyPrice: 24,
    annualMonthlyPrice: 19,
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      'Unlimited Master & Custom Resumes',
      'Unlimited ATS Diagnostics & Score Rings',
      'Job-Calibrated Tailoring Studio with Diff Review',
      'All 4 Superdesign Document Templates',
      'LinkedIn Profile Optimizer (Anti-Scraping)',
      'Interview Studio with 6 Grounded STAR Questions',
      '5 Controlled Auto Apply Package Reviews / mo',
      'Priority Email Support (< 4hr Response)',
    ],
    limits: {
      resumes: 'Unlimited Versions',
      atsScans: 'Unlimited Scans',
      tailoring: 'AI Evidence Tailoring with Diff Accept',
      autoApply: '5 Verified Outbound Packages / mo',
      coverLetters: 'Unlimited with 3 Tones',
    },
    ctaLabel: 'Upgrade to Pro Suite',
    ctaVariant: 'primary',
  },
  {
    id: 'executive',
    name: 'Executive All-Access',
    tagline: 'Tailored for principal engineers, directors, and executive leadership.',
    monthlyPrice: 49,
    annualMonthlyPrice: 39,
    features: [
      'Everything in Professional Suite',
      '15 Controlled Auto Apply Package Reviews / mo',
      'Executive STAR Talking Points & Board Readiness',
      'Recruiter Boolean Keyword Strategy Engine',
      'Multi-Region Convention Calibration (7 Countries)',
      'Send-Only Mailbox Dedicated Gateway',
      'White-Glove 1-on-1 Portfolio Consultation Credit',
    ],
    limits: {
      resumes: 'Unlimited Versions + Version History',
      atsScans: 'Unlimited + PDF Export',
      tailoring: 'Advanced Strategic Calibration',
      autoApply: '15 Verified Outbound Packages / mo',
      coverLetters: 'Bespoke Executive Tone',
    },
    ctaLabel: 'Select Executive Tier',
    ctaVariant: 'secondary',
  },
];

export const PricingSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { navigate } = useRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    navigate(`/signup?plan=${planId}&billing=${isAnnual ? 'annual' : 'monthly'}`);
  };

  return (
    <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', padding: compact ? '20px 0' : '40px 0' }}>
      {/* Header & Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--rs-blue)',
            }}
          >
            TRANSPARENT, EVIDENCE-FIRST PRICING
          </span>
          <StatusBadge status="success" label="Zero Hidden Fees" />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: compact ? '30px' : '40px',
            fontWeight: 700,
            color: 'var(--rs-ink)',
            margin: '0 0 14px',
            letterSpacing: '-0.03em',
          }}
        >
          Invest in precision career advancement.
        </h2>

        <p
          style={{
            color: 'var(--rs-muted)',
            fontSize: '16px',
            maxWidth: '620px',
            margin: '0 auto 28px',
            lineHeight: '1.55',
          }}
        >
          No fake subscription lock-ins or surprise renewals. Choose the tier that matches your job search velocity.
        </p>

        {/* Superdesign Billing Interval Switcher */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px',
            borderRadius: '9999px',
            backgroundColor: 'var(--rs-surface-2)',
            border: '1px solid var(--rs-line)',
            boxShadow: 'var(--rs-shadow)',
          }}
        >
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: !isAnnual ? 'var(--rs-surface)' : 'transparent',
              color: !isAnnual ? 'var(--rs-ink)' : 'var(--rs-muted)',
              fontSize: '13px',
              fontWeight: !isAnnual ? 700 : 500,
              cursor: 'pointer',
              boxShadow: !isAnnual ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.18s ease',
            }}
          >
            Monthly Billing
          </button>

          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: isAnnual ? 'var(--rs-blue-strong)' : 'transparent',
              color: isAnnual ? '#FFFFFF' : 'var(--rs-muted)',
              fontSize: '13px',
              fontWeight: isAnnual ? 700 : 500,
              cursor: 'pointer',
              boxShadow: isAnnual ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.18s ease',
            }}
          >
            <span>Annual Billing</span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: isAnnual ? '#FFFFFF' : 'var(--rs-surface)',
                color: isAnnual ? 'var(--rs-blue-strong)' : 'var(--rs-amber)',
              }}
            >
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Student Discount Callout Banner */}
      <div
        style={{
          margin: '0 auto 36px',
          maxWidth: '880px',
          padding: '14px 20px',
          borderRadius: '12px',
          backgroundColor: 'color-mix(in srgb, var(--rs-amber) 10%, var(--rs-surface))',
          border: '1px solid color-mix(in srgb, var(--rs-amber) 30%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--rs-amber)',
              color: '#10243E',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <GraduationCap size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                Active Student or Recent Graduate?
              </span>
              <span style={{ fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px', backgroundColor: 'var(--rs-amber)', color: '#10243E' }}>
                50% OFF PRO
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--rs-muted)' }}>
              Verify with any valid university `.edu` address to receive 50% discount on Professional Suite for 12 months.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate('/signup?student=true')}
          style={{ whiteSpace: 'nowrap' }}
        >
          Claim Student Rate
        </Button>
      </div>

      {/* Pricing Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const displayPrice = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              style={{
                borderRadius: '18px',
                border: plan.popular
                  ? '2px solid var(--rs-amber)'
                  : isSelected
                  ? '1.5px solid var(--rs-blue-strong)'
                  : '1px solid var(--rs-line)',
                backgroundColor: plan.popular
                  ? 'color-mix(in srgb, var(--rs-surface) 95%, var(--rs-amber))'
                  : 'var(--rs-surface)',
                padding: '32px 28px',
                boxShadow: plan.popular ? '0 12px 36px rgba(242, 201, 109, 0.14)' : 'var(--rs-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-13px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--rs-amber)',
                    color: '#10243E',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 12px rgba(242, 201, 109, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Star size={12} fill="#10243E" />
                  {plan.badge}
                </div>
              )}

              {/* Card Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3
                      style={{
                        margin: '0 0 6px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)', minHeight: '38px', lineHeight: '1.45' }}>
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div style={{ margin: '24px 0 20px', paddingBottom: '20px', borderBottom: '1px solid var(--rs-line)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '44px',
                        fontWeight: 800,
                        color: 'var(--rs-ink)',
                        lineHeight: 1,
                      }}
                    >
                      ${displayPrice}
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--rs-muted)' }}>
                      / month
                    </span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: 'var(--rs-muted)', marginTop: '4px', display: 'block' }}>
                    {plan.monthlyPrice === 0
                      ? 'Free forever · No credit card required'
                      : isAnnual
                      ? `Billed annually ($${displayPrice * 12}/year)`
                      : 'Billed monthly · Cancel anytime'}
                  </span>
                </div>

                {/* Features List */}
                <div style={{ marginBottom: '28px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--rs-muted)',
                      marginBottom: '14px',
                    }}
                  >
                    Included In This Plan:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: plan.popular
                              ? 'color-mix(in srgb, var(--rs-amber) 20%, var(--rs-surface))'
                              : 'color-mix(in srgb, var(--rs-blue-strong) 14%, var(--rs-surface))',
                            color: plan.popular ? 'var(--rs-amber)' : 'var(--rs-blue-strong)',
                            display: 'grid',
                            placeItems: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--rs-ink)', lineHeight: '1.4' }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <Button
                  variant={plan.popular ? 'primary' : plan.ctaVariant}
                  onClick={() => handleSelectPlan(plan.id)}
                  style={{ width: '100%', justifyContent: 'center' }}
                  icon={<ArrowRight size={15} />}
                >
                  {plan.ctaLabel}
                </Button>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '12px',
                    fontSize: '11px',
                    color: 'var(--rs-muted)',
                  }}
                >
                  <ShieldCheck size={13} color="var(--rs-green)" />
                  <span>7-Day Full Refund Guarantee</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Policy Assurance Footer */}
      <div
        style={{
          marginTop: '48px',
          padding: '24px',
          borderRadius: '14px',
          backgroundColor: 'var(--rs-surface)',
          border: '1px solid var(--rs-line)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          textAlign: 'left',
        }}
      >
        <div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)', display: 'block', marginBottom: '4px' }}>
            Zero Scraping Policy
          </span>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-muted)', lineHeight: '1.45' }}>
            RoleSharp never automates unauthorized web scraping, captcha circumvention, or invasive employer crawling. All applications respect terms of service.
          </p>
        </div>

        <div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)', display: 'block', marginBottom: '4px' }}>
            One-Click Cancellation
          </span>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-muted)', lineHeight: '1.45' }}>
            Downgrade or cancel your plan at any moment from your Billing dashboard. Your access remains active until the end of the paid billing cycle.
          </p>
        </div>

        <div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rs-ink)', display: 'block', marginBottom: '4px' }}>
            Data Privacy & Retention
          </span>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-muted)', lineHeight: '1.45' }}>
            We do not sell resume data to third parties. Diagnostic scans run in memory, and your documents are protected under encrypted storage.
          </p>
        </div>
      </div>
    </div>
  );
};