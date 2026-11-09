import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { AlertCircle, Lock, Mail, Globe, ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { navigate } = useRouter();
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('United States');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide an email address and password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      setError('You must accept the Terms of Service and Privacy Policy to create an account.');
      return;
    }

    setLoading(true);
    const res = await signup(email, password, true);
    setLoading(false);

    if (res.success) {
      navigate('/onboarding');
    } else {
      setError(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main
        style={{
          flex: 1,
          display: 'grid',
          placeItems: 'center',
          padding: '60px 20px',
          background:
            'radial-gradient(ellipse at 50% 20%, color-mix(in srgb, var(--rs-blue-strong) 10%, transparent), transparent 60%), var(--rs-bg)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            padding: '36px 32px',
            borderRadius: '16px',
            border: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-surface)',
            boxShadow: 'var(--rs-shadow)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--rs-blue)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              CANDIDATE REGISTRATION
            </span>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                letterSpacing: '-0.04em',
              }}
            >
              Start Your Free Workspace
            </h1>
            <p style={{ margin: '8px 0 0', color: 'var(--rs-muted)', fontSize: '13.5px' }}>
              Includes ATS diagnostics, resume tailoring, and interview practice tools.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: 'color-mix(in srgb, var(--rs-red) 12%, transparent)',
                border: '1px solid var(--rs-red)',
                color: 'var(--rs-red)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
              role="alert"
            >
              <AlertCircle size={16} flex-shrink="0" />
              <span>{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label
                htmlFor="signup-email"
                style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', marginBottom: '6px' }}
              >
                Work or Personal Email
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rs-muted)' }}>
                  <Mail size={16} />
                </span>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@lattice.io"
                  required
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px 0 40px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-surface-2)',
                    color: 'var(--rs-ink)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-password"
                style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', marginBottom: '6px' }}
              >
                Choose Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rs-muted)' }}>
                  <Lock size={16} />
                </span>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px 0 40px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-surface-2)',
                    color: 'var(--rs-ink)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-confirm-password"
                style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', marginBottom: '6px' }}
              >
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rs-muted)' }}>
                  <Lock size={16} />
                </span>
                <input
                  id="signup-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px 0 40px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-surface-2)',
                    color: 'var(--rs-ink)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-country"
                style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--rs-ink)', marginBottom: '6px' }}
              >
                Target Application Country
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rs-muted)' }}>
                  <Globe size={16} />
                </span>
                <select
                  id="signup-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px 0 40px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-surface-2)',
                    color: 'var(--rs-ink)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                >
                  <option value="United States">United States (ATS standard format)</option>
                  <option value="United Kingdom">United Kingdom (CV standard)</option>
                  <option value="Canada">Canada (Bilingual / Federal)</option>
                  <option value="Germany">Germany (Europass / Detailed)</option>
                  <option value="India">India (Technical Profile / Summary)</option>
                  <option value="Australia">Australia (Comprehensive CV)</option>
                </select>
              </div>
            </div>

            {/* Legal Terms Acceptance Checkboxes */}
            <div
              style={{
                marginTop: '6px',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface-2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '12px',
                color: 'var(--rs-muted)',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={{ marginTop: '3px' }}
                  required
                />
                <span>
                  I accept the{' '}
                  <button type="button" onClick={() => navigate('/terms')} style={{ color: 'var(--rs-blue)', textDecoration: 'underline' }}>
                    RoleSharp Terms of Service (v2.0)
                  </button>
                  .
                </span>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  style={{ marginTop: '3px' }}
                  required
                />
                <span>
                  I agree to the{' '}
                  <button type="button" onClick={() => navigate('/privacy')} style={{ color: 'var(--rs-blue)', textDecoration: 'underline' }}>
                    Privacy Policy
                  </button>{' '}
                  and acknowledge that RoleSharp does not scrape third-party accounts or fabricate qualifications.
                </span>
              </label>
            </div>

            <Button type="submit" size="lg" loading={loading} icon={<ArrowRight size={16} />}>
              Create Account & Start Onboarding
            </Button>
          </form>

          {/* Footer Navigation */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--rs-line)',
              textAlign: 'center',
              fontSize: '13px',
              color: 'var(--rs-muted)',
            }}
          >
            <span>Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              style={{
                color: 'var(--rs-blue-strong)',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
