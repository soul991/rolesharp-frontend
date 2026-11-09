import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { useAuth } from '../context/AuthContext';
import { AnimatedStepper, StepItem } from '../components/common/AnimatedStepper';
import { Button } from '../components/common/Button';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import {
  User,
  Briefcase,
  Globe2,
  Building,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  FileText,
  AlertCircle,
} from 'lucide-react';

const ONBOARDING_STEPS: StepItem[] = [
  { id: 'profile', title: 'Identity', description: 'Name & Contact' },
  { id: 'target', title: 'Target Role', description: 'Role & Seniority' },
  { id: 'country', title: 'Conventions', description: 'Country Standards' },
  { id: 'preferences', title: 'Preferences', description: 'Work Mode & Relocation' },
  { id: 'resume', title: 'Resume Base', description: 'Upload or Blank' },
  { id: 'activation', title: 'Activation', description: 'Claim Checklist Credit' },
];

const SENIORITY_LEVELS = [
  { id: 'entry', label: 'Early Career / Entry', desc: '0–2 years of relevant experience' },
  { id: 'mid', label: 'Mid-Level Professional', desc: '3–6 years with proven autonomy' },
  { id: 'senior', label: 'Senior Specialist', desc: '7–10 years leading critical initiatives' },
  { id: 'lead', label: 'Staff / Principal / Lead', desc: '10+ years driving strategy & architecture' },
  { id: 'exec', label: 'Executive / Director', desc: 'C-suite or VP organizational leadership' },
];

const COUNTRIES = [
  {
    code: 'US',
    name: 'United States',
    convention: 'Strict 1–2 page resume, no photos, outcome-metric bullets, ATS-first layout',
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    convention: 'Standard 2-page CV, personal statement header, no headshot or personal age info',
  },
  {
    code: 'CA',
    name: 'Canada',
    convention: '1–2 page resume, strict anti-discrimination guidelines (no photo/DOB/marital status)',
  },
  {
    code: 'DE',
    name: 'Germany (DACH)',
    convention: 'Lebenslauf standard, structured table format, optional professional portrait',
  },
  {
    code: 'IN',
    name: 'India / South Asia',
    convention: 'Technical depth, detailed project breakdown, verifiable credentials and tech stack',
  },
  {
    code: 'SG',
    name: 'Singapore / APAC',
    convention: 'Concise executive summary, visa status transparency, bilingual notes if applicable',
  },
];

export const OnboardingPage: React.FC = () => {
  const { navigate } = useRouter();
  const { session, updateSession } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [fullName, setFullName] = useState(session.user?.name || '');
  const [headline, setHeadline] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');

  const [targetRole, setTargetRole] = useState(session.user?.targetRole || 'Senior Product Manager');
  const [seniority, setSeniority] = useState('senior');

  const [selectedCountry, setSelectedCountry] = useState(session.user?.targetCountry || 'United States');
  const [respectStrictATS, setRespectStrictATS] = useState(true);

  const [workModes, setWorkModes] = useState<string[]>(['remote', 'hybrid']);
  const [requiresVisa, setRequiresVisa] = useState(false);
  const [willingToRelocate, setWillingToRelocate] = useState(false);

  const [resumeChoice, setResumeChoice] = useState<'upload' | 'scratch'>('upload');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [isActivating, setIsActivating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleWorkMode = (mode: string) => {
    setWorkModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleNext = () => {
    setErrorMsg(null);

    // Validation per step
    if (currentStep === 0 && !fullName.trim()) {
      setErrorMsg('Please enter your full legal or professional name to personalize your workspace.');
      return;
    }
    if (currentStep === 1 && !targetRole.trim()) {
      setErrorMsg('Please enter your target role title to ground your resume tailoring.');
      return;
    }
    if (currentStep === 4 && resumeChoice === 'upload' && !uploadedFileName) {
      // Allow them to continue with a sample or require simulated upload
      setUploadedFileName('Candidate_Current_Resume_2026.pdf');
    }

    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCompleteActivation = async () => {
    setIsActivating(true);
    setErrorMsg(null);

    try {
      // Call mock or real /api/onboarding endpoint
      // Simulate real checklist bonus credit claim
      await new Promise((r) => setTimeout(r, 600));

      updateSession({
        user: {
          id: session.user?.id || 'usr_verified_2026',
          email: session.user?.email || 'user@rolesharp.internal',
          name: fullName,
          targetRole,
          targetCountry: selectedCountry,
        },
        credits: (session.credits || 0) + 5, // Award onboarding completion bonus
      });

      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to complete onboarding. Please try again.');
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main
        style={{
          flex: 1,
          padding: '40px 20px 80px',
          background:
            'radial-gradient(ellipse at 50% 10%, color-mix(in srgb, var(--rs-blue-strong) 8%, transparent), transparent 60%), var(--rs-bg)',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Top Stage Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--rs-blue)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              <Sparkles size={13} />
              ROLESHARP PRECISION ONBOARDING
            </span>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontSize: '30px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                letterSpacing: '-0.03em',
              }}
            >
              Configure Your Career Studio
            </h1>
            <p style={{ margin: '8px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
              Tailor ATS parsing rules, regional conventions, and evidence benchmarks in six focused steps.
            </p>
          </div>

          {/* Superdesign Animated Stepper */}
          <AnimatedStepper
            steps={ONBOARDING_STEPS}
            currentStepIndex={currentStep}
            onStepClick={(idx) => setCurrentStep(idx)}
            allowStepClick={true}
          />

          {/* Step Container Card */}
          <div
            style={{
              borderRadius: '20px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              boxShadow: 'var(--rs-shadow)',
              padding: '36px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {errorMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'color-mix(in srgb, #ef4444 12%, transparent)',
                  border: '1px solid color-mix(in srgb, #ef4444 35%, transparent)',
                  color: '#ef4444',
                  fontSize: '13.5px',
                  marginBottom: '24px',
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 0: IDENTITY & CONTACT */}
            {currentStep === 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--rs-surface-2)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--rs-blue-strong)',
                    }}
                  >
                    <User size={20} />
                  </div>
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      Personal & Professional Identity
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                      How should your name and contact appear on tailored resumes and cover letters?
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div>
                    <label
                      htmlFor="onboarding-full-name"
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--rs-muted)',
                        marginBottom: '6px',
                      }}
                    >
                      Full Legal / Professional Name *
                    </label>
                    <input
                      id="onboarding-full-name"
                      name="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan, PMP"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--rs-line)',
                        backgroundColor: 'var(--rs-bg)',
                        color: 'var(--rs-ink)',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="onboarding-headline"
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--rs-muted)',
                        marginBottom: '6px',
                      }}
                    >
                      Professional Headline / Subtitle
                    </label>
                    <input
                      id="onboarding-headline"
                      name="headline"
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. Senior Product Leader | Enterprise SaaS & Cloud"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--rs-line)',
                        backgroundColor: 'var(--rs-bg)',
                        color: 'var(--rs-ink)',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="onboarding-phone"
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--rs-muted)',
                        marginBottom: '6px',
                      }}
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="onboarding-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--rs-line)',
                        backgroundColor: 'var(--rs-bg)',
                        color: 'var(--rs-ink)',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="onboarding-linkedin"
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--rs-muted)',
                        marginBottom: '6px',
                      }}
                    >
                      LinkedIn Profile Link (Optional)
                    </label>
                    <input
                      id="onboarding-linkedin"
                      name="linkedInUrl"
                      type="url"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--rs-line)',
                        backgroundColor: 'var(--rs-bg)',
                        color: 'var(--rs-ink)',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: TARGET ROLE & SENIORITY */}
            {currentStep === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--rs-surface-2)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--rs-blue-strong)',
                    }}
                  >
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      Target Role & Seniority Tier
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                      RoleSharp benchmarks your evidence bullets against genuine expectations for this tier.
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="onboarding-target-role"
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--rs-muted)',
                      marginBottom: '6px',
                    }}
                  >
                    Primary Target Title *
                  </label>
                  <input
                    id="onboarding-target-role"
                    name="targetRole"
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Product Manager, Lead Backend Engineer, Growth Marketer"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--rs-muted)',
                      marginBottom: '10px',
                    }}
                  >
                    Seniority Calibration
                  </label>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {SENIORITY_LEVELS.map((lvl) => {
                      const isSelected = seniority === lvl.id;
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => setSeniority(lvl.id)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: `1.5px solid ${isSelected ? 'var(--rs-blue-strong)' : 'var(--rs-line)'}`,
                            backgroundColor: isSelected
                              ? 'color-mix(in srgb, var(--rs-blue-strong) 10%, var(--rs-surface))'
                              : 'var(--rs-bg)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--rs-ink)' }}>
                              {lvl.label}
                            </div>
                            <div style={{ fontSize: '12.5px', color: 'var(--rs-muted)' }}>{lvl.desc}</div>
                          </div>
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: `2px solid ${isSelected ? 'var(--rs-blue-strong)' : 'var(--rs-line)'}`,
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            {isSelected && (
                              <div
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--rs-blue-strong)',
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: COUNTRY CONVENTIONS */}
            {currentStep === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--rs-surface-2)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--rs-blue-strong)',
                    }}
                  >
                    <Globe2 size={20} />
                  </div>
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      Regional Hiring Conventions
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                      Resume standards differ sharply between US, UK, DACH, and APAC markets.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                  {COUNTRIES.map((c) => {
                    const isSelected = selectedCountry === c.name;
                    return (
                      <div
                        key={c.code}
                        onClick={() => setSelectedCountry(c.name)}
                        style={{
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: `1.5px solid ${isSelected ? 'var(--rs-blue-strong)' : 'var(--rs-line)'}`,
                          backgroundColor: isSelected
                            ? 'color-mix(in srgb, var(--rs-blue-strong) 10%, var(--rs-surface))'
                            : 'var(--rs-bg)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '12px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 800,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: 'var(--rs-surface-2)',
                                color: 'var(--rs-blue)',
                              }}
                            >
                              {c.code}
                            </span>
                            <span style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--rs-ink)' }}>
                              {c.name}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                            {c.convention}
                          </p>
                        </div>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--rs-blue-strong)' : 'var(--rs-line)'}`,
                            display: 'grid',
                            placeItems: 'center',
                            flexShrink: 0,
                            marginTop: '4px',
                          }}
                        >
                          {isSelected && (
                            <div
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--rs-blue-strong)',
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={respectStrictATS}
                    onChange={(e) => setRespectStrictATS(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--rs-blue-strong)' }}
                  />
                  <span style={{ fontSize: '13px', color: 'var(--rs-ink)', fontWeight: 500 }}>
                    Automatically enforce strict single-column ATS formatting rules for {selectedCountry} applications.
                  </span>
                </label>
              </div>
            )}

            {/* STEP 3: WORK MODE & PREFERENCES */}
            {currentStep === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--rs-surface-2)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--rs-blue-strong)',
                    }}
                  >
                    <Building size={20} />
                  </div>
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      Work Environment & Logistics
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                      Set your work mode preferences to filter job discoveries and daily match recommendations.
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--rs-muted)',
                      marginBottom: '10px',
                    }}
                  >
                    Acceptable Work Modes (Select all that apply)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { id: 'remote', label: '100% Remote', desc: 'Anywhere within region' },
                      { id: 'hybrid', label: 'Hybrid', desc: '1–3 days in-office' },
                      { id: 'onsite', label: 'On-Site', desc: 'Full-time physical office' },
                    ].map((mode) => {
                      const active = workModes.includes(mode.id);
                      return (
                        <div
                          key={mode.id}
                          onClick={() => toggleWorkMode(mode.id)}
                          style={{
                            padding: '16px',
                            borderRadius: '12px',
                            border: `1.5px solid ${active ? 'var(--rs-blue-strong)' : 'var(--rs-line)'}`,
                            backgroundColor: active
                              ? 'color-mix(in srgb, var(--rs-blue-strong) 10%, var(--rs-surface))'
                              : 'var(--rs-bg)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--rs-ink)', marginBottom: '4px' }}>
                            {mode.label}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>{mode.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={requiresVisa}
                      onChange={(e) => setRequiresVisa(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--rs-blue-strong)' }}
                    />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--rs-ink)' }}>
                        I require employer visa sponsorship
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                        Filter job matches to sponsors with verified H-1B, Skilled Worker, or equivalent records.
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={willingToRelocate}
                      onChange={(e) => setWillingToRelocate(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--rs-blue-strong)' }}
                    />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--rs-ink)' }}>
                        Open to relocation assistance
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                        Include national or international opportunities with relocation packages.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: RESUME SOURCE */}
            {currentStep === 4 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--rs-surface-2)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--rs-blue-strong)',
                    }}
                  >
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      Establish Your Master Evidence Base
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                      Upload your current document to benchmark, or start cleanly with the structured builder.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div
                    onClick={() => setResumeChoice('upload')}
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      border: `1.5px solid ${resumeChoice === 'upload' ? 'var(--rs-blue-strong)' : 'var(--rs-line)'}`,
                      backgroundColor: resumeChoice === 'upload'
                        ? 'color-mix(in srgb, var(--rs-blue-strong) 10%, var(--rs-surface))'
                        : 'var(--rs-bg)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <UploadCloud size={24} color={resumeChoice === 'upload' ? 'var(--rs-blue-strong)' : 'var(--rs-muted)'} />
                      {resumeChoice === 'upload' && <CheckCircle2 size={18} color="var(--rs-blue-strong)" />}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--rs-ink)', marginBottom: '4px' }}>
                      Upload Existing Resume
                    </div>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--rs-muted)' }}>
                      Extract text from PDF, DOCX, or TXT (up to 5MB) and establish an immediate baseline score.
                    </p>
                  </div>

                  <div
                    onClick={() => setResumeChoice('scratch')}
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      border: `1.5px solid ${resumeChoice === 'scratch' ? 'var(--rs-blue-strong)' : 'var(--rs-line)'}`,
                      backgroundColor: resumeChoice === 'scratch'
                        ? 'color-mix(in srgb, var(--rs-blue-strong) 10%, var(--rs-surface))'
                        : 'var(--rs-bg)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <FileText size={24} color={resumeChoice === 'scratch' ? 'var(--rs-blue-strong)' : 'var(--rs-muted)'} />
                      {resumeChoice === 'scratch' && <CheckCircle2 size={18} color="var(--rs-blue-strong)" />}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--rs-ink)', marginBottom: '4px' }}>
                      Start in Structured Builder
                    </div>
                    <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--rs-muted)' }}>
                      Fill section-by-section with live preview, guided impact metrics, and editorial typography.
                    </p>
                  </div>
                </div>

                {resumeChoice === 'upload' && (
                  <div
                    style={{
                      border: '2px dashed var(--rs-line)',
                      borderRadius: '14px',
                      padding: '28px',
                      textAlign: 'center',
                      backgroundColor: 'var(--rs-bg)',
                    }}
                  >
                    <UploadCloud size={32} style={{ margin: '0 auto 10px', color: 'var(--rs-blue)' }} />
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--rs-ink)' }}>
                      {uploadedFileName ? (
                        <span style={{ color: 'var(--rs-blue-strong)' }}>
                          Ready: {uploadedFileName}
                        </span>
                      ) : (
                        'Drag & drop your resume file here or click to browse'
                      )}
                    </div>
                    <p style={{ margin: '4px 0 16px', fontSize: '12px', color: 'var(--rs-muted)' }}>
                      PDF, DOCX, or plain text up to 5 MB. Strictly parsed in-memory.
                    </p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setUploadedFileName('Alex_Morgan_Resume_Verified_2026.pdf')}
                    >
                      {uploadedFileName ? 'Replace Document' : 'Select File From Computer'}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: REVIEW & ACTIVATION */}
            {currentStep === 5 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'color-mix(in srgb, var(--rs-emerald) 15%, transparent)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--rs-emerald)',
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--rs-ink)',
                      }}
                    >
                      Review & Activate Studio
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                      Claim your one-time onboarding bonus and unlock your full career tools.
                    </p>
                  </div>
                </div>

                {/* Configuration Summary Card */}
                <div
                  style={{
                    backgroundColor: 'var(--rs-bg)',
                    borderRadius: '14px',
                    border: '1px solid var(--rs-line)',
                    padding: '20px',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--rs-muted)', fontWeight: 700 }}>
                        Candidate Name
                      </span>
                      <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--rs-ink)' }}>
                        {fullName || 'Alex Morgan'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--rs-muted)', fontWeight: 700 }}>
                        Target Role
                      </span>
                      <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--rs-ink)' }}>
                        {targetRole}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--rs-muted)', fontWeight: 700 }}>
                        Market / Convention
                      </span>
                      <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--rs-ink)' }}>
                        {selectedCountry}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--rs-muted)', fontWeight: 700 }}>
                        Work Modes
                      </span>
                      <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--rs-ink)', textTransform: 'capitalize' }}>
                        {workModes.join(', ') || 'Any'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Claim Credit Callout */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '14px',
                    backgroundColor: 'color-mix(in srgb, var(--rs-amber) 12%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--rs-amber) 35%, transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '24px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Sparkles size={16} color="var(--rs-amber)" />
                      <span style={{ fontWeight: 800, fontSize: '14.5px', color: 'var(--rs-ink)' }}>
                        One-Time Onboarding Bonus: +5 Credits
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--rs-muted)' }}>
                      Granted via <code style={{ fontSize: '12px' }}>POST /api/onboarding</code> upon checklist completion.
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '18px',
                      fontWeight: 800,
                      color: 'var(--rs-amber)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--rs-surface)',
                      border: '1px solid var(--rs-line)',
                    }}
                  >
                    +5 CREDITS
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Stepper Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '24px',
                marginTop: '28px',
                borderTop: '1px solid var(--rs-line)',
              }}
            >
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0 || isActivating}
                icon={<ArrowLeft size={16} />}
              >
                Back
              </Button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--rs-muted)', fontFamily: 'var(--font-mono)' }}>
                  Step {currentStep + 1} of {ONBOARDING_STEPS.length}
                </span>

                {currentStep < ONBOARDING_STEPS.length - 1 ? (
                  <Button onClick={handleNext} icon={<ArrowRight size={16} />}>
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleCompleteActivation}
                    loading={isActivating}
                    icon={<CheckCircle2 size={16} />}
                  >
                    Activate Studio & Claim Credits
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
