import React, { useState } from 'react';
import { useRouter } from '../router/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { AppShell } from '../components/common/AppShell';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  User,
  Globe,
  Bell,
  Sun,
  Moon,
  LogOut,
  CheckCircle2,
  Save,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { session, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState(session?.user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(session?.user?.email || 'alex.morgan@lattice.io');
  const [headline, setHeadline] = useState(session?.user?.targetRole || 'Staff Infrastructure & Platform Lead');
  const [targetCountry, setTargetCountry] = useState(session?.user?.targetCountry || 'US');
  const [dailyDigest, setDailyDigest] = useState(true);
  const [applicationAlerts, setApplicationAlerts] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification('Settings saved successfully.');
    setTimeout(() => setNotification(null), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell title="Account & Preference Settings">
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--rs-blue)',
              }}
            >
              WORKSPACE PREFERENCES
            </span>
            <StatusBadge status="success" label="Active Profile" />
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
            Account & Preference Settings
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--rs-muted)', fontSize: '14px' }}>
            Manage your personal profile, regional ATS formatting conventions, notification cadences, and interface theme.
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

        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Identity & Career Profile */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                boxShadow: 'var(--rs-shadow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <User size={18} color="var(--rs-blue)" />
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Personal Profile & Credentials
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label
                    htmlFor="set-name"
                    style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="set-name"
                    name="setName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--rs-line)',
                      backgroundColor: 'var(--rs-bg)',
                      color: 'var(--rs-ink)',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="set-email"
                    style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                  >
                    Verified Account Email *
                  </label>
                  <input
                    id="set-email"
                    name="setEmail"
                    type="email"
                    required
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
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="set-headline"
                  style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                >
                  Primary Career Target Headline
                </label>
                <input
                  id="set-headline"
                  name="setHeadline"
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
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Regional Conventions */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                boxShadow: 'var(--rs-shadow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <Globe size={18} color="var(--rs-amber)" />
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Regional ATS Conventions Override
                </h2>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label
                  htmlFor="set-country"
                  style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--rs-muted)', textTransform: 'uppercase', marginBottom: '6px' }}
                >
                  Primary Hiring Market
                </label>
                <select
                  id="set-country"
                  name="setCountry"
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--rs-line)',
                    backgroundColor: 'var(--rs-bg)',
                    color: 'var(--rs-ink)',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="US">United States (Letter page, MM/YYYY dates, no photo, no personal demographic details)</option>
                  <option value="UK">United Kingdom (A4 format, DD/MM/YYYY dates, National Insurance omitted)</option>
                  <option value="EU">European Union (Europass alignment, A4, clear language proficiencies CEFR)</option>
                  <option value="CA">Canada (Letter format, strict human rights anti-bias compliance)</option>
                  <option value="AU">Australia & New Zealand (A4 format, comprehensive evidence trajectory)</option>
                  <option value="IN">India & APAC (Technical stack depth, project scale, educational pedigree)</option>
                  <option value="SG">Singapore (Global financial hub standards, bilingual capability)</option>
                </select>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--rs-muted)' }}>
                Changing this market automatically calibrates ATS parsing heuristics, date formatting, and page size standards across your resumes.
              </p>
            </div>

            {/* Delivery & Notifications */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                boxShadow: 'var(--rs-shadow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <Bell size={18} color="var(--rs-blue-strong)" />
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--rs-ink)' }}>
                  Notification & Digest Preferences
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="setDailyDigest"
                    checked={dailyDigest}
                    onChange={(e) => setDailyDigest(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--rs-blue-strong)' }}
                  />
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--rs-ink)', display: 'block' }}>
                      Daily Verified Job Digest (9:00 AM)
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                      Receive up to 10 verified job matches matching your evidence profile.
                    </span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="setApplicationAlerts"
                    checked={applicationAlerts}
                    onChange={(e) => setApplicationAlerts(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--rs-blue-strong)' }}
                  />
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--rs-ink)', display: 'block' }}>
                      Controlled Auto Apply Package Alerts
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--rs-muted)' }}>
                      Get notified when an eligible outbound email package is staged for your review.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Interface Theme & Session */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                boxShadow: 'var(--rs-shadow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--rs-ink)', display: 'block' }}>
                  Interface Theme
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--rs-muted)' }}>
                  Current Mode: {theme === 'dark' ? 'Midnight Blue (#061426)' : 'Warm Paper (#F3F2EE)'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={toggleTheme}
                  icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                >
                  Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleLogout}
                  icon={<LogOut size={15} />}
                  style={{ color: 'var(--rs-amber)' }}
                >
                  Log Out
                </Button>
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button type="submit" icon={<Save size={15} />}>
                Save Preferences
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
};