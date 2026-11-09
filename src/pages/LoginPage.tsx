import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { AlertCircle, Lock, Mail, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please provide both your account email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Invalid credentials or suspended account. Please verify your details.');
    }
  };

  const autofillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('DemoPass2026!');
    setError(null);
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
            maxWidth: '460px',
            padding: '36px 32px',
            borderRadius: '16px',
            border: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-surface)',
            boxShadow: 'var(--rs-shadow)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
              AUTHENTICATED WORKSPACE
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
              Sign in to RoleSharp
            </h1>
            <p style={{ margin: '8px 0 0', color: 'var(--rs-muted)', fontSize: '13.5px' }}>
              Access your verified evidence, tailored resumes, and active job pipelines.
            </p>
          </div>

          {/* Quick Demo Credentials Autofill */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface-2)',
              marginBottom: '20px',
              fontSize: '12px',
              color: 'var(--rs-muted)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Quick test account:</span>
              <button
                type="button"
                onClick={() => autofillDemo('alex.morgan@lattice.io')}
                style={{
                  color: 'var(--rs-blue-strong)',
                  fontWeight: 700,
                  fontSize: '11.5px',
                  textDecoration: 'underline',
                }}
              >
                Autofill Alex Morgan
              </button>
            </div>
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label
                htmlFor="login-email"
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--rs-ink)',
                  marginBottom: '6px',
                }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--rs-muted)',
                    display: 'flex',
                  }}
                >
                  <Mail size={16} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
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
                    transition: 'border-color 0.18s ease',
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label
                  htmlFor="login-password"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--rs-ink)',
                  }}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password recovery link sent if email exists.')}
                  style={{ fontSize: '11.5px', color: 'var(--rs-blue)', fontWeight: 600 }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--rs-muted)',
                    display: 'flex',
                  }}
                >
                  <Lock size={16} />
                </span>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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
                    transition: 'border-color 0.18s ease',
                  }}
                />
              </div>
            </div>

            <Button type="submit" size="lg" loading={loading} icon={<ArrowRight size={16} />}>
              Sign In to Workspace
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
            <span>Don't have an account yet? </span>
            <button
              onClick={() => navigate('/signup')}
              style={{
                color: 'var(--rs-blue-strong)',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              Create account
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
