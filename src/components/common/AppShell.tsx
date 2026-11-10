import React, { useState } from 'react';
import { useRouter } from '../../router/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  FileText,
  FileCheck2,
  Sparkles,
  Mail,
  Linkedin,
  Mic,
  Briefcase,
  Flame,
  KanbanSquare,
  Send,
  CreditCard,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title = 'Workspace',
}) => {
  const { currentPath, navigate } = useRouter();
  const { session, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navGroups = [
    {
      group: 'Workspace',
      items: [
        { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Settings', icon: Settings, path: '/settings' },
        { label: 'Billing & Plan', icon: CreditCard, path: '/billing' },
      ],
    },
    {
      group: 'Career Tools',
      items: [
        { label: 'My Resumes', icon: FileText, path: '/resumes' },
        { label: 'Resume Builder', icon: FileText, path: '/resume-builder' },
        { label: 'ATS Analyzer', icon: FileCheck2, path: '/checker' },
        { label: 'Resume Tailor', icon: Sparkles, path: '/tailor' },
        { label: 'Cover Letters', icon: Mail, path: '/cover-letter' },
        { label: 'Letter Diagnostics', icon: FileCheck2, path: '/cover-letter-analyzer' },
        { label: 'LinkedIn Optimizer', icon: Linkedin, path: '/linkedin' },
      ],
    },
    {
      group: 'Opportunities',
      items: [
        { label: 'Job Matches', icon: Briefcase, path: '/jobs' },
        { label: 'Daily Matches', icon: Flame, path: '/daily-matches' },
        { label: 'Application Tracker', icon: KanbanSquare, path: '/tracker' },
        { label: 'Controlled Auto Apply', icon: Send, path: '/auto-apply' },
      ],
    },
    {
      group: 'Practice',
      items: [{ label: 'Interview Studio', icon: Mic, path: '/interview' }],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--rs-bg)' }}>
      {/* Desktop Sidebar Navigation (240px) */}
      <aside
        style={{
          width: '240px',
          borderRight: '1px solid var(--rs-line)',
          backgroundColor: 'var(--rs-surface)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
        }}
        className="app-sidebar-desktop"
      >
        {/* Brand Header */}
        <div
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            borderBottom: '1px solid var(--rs-line)',
          }}
        >
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 650,
              fontSize: '18px',
              letterSpacing: '-0.03em',
              color: 'var(--rs-ink)',
            }}
          >
            <span
              style={{
                width: '26px',
                height: '26px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--rs-ink)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '16px',
                backgroundColor: 'var(--rs-surface-2)',
                border: '1px solid var(--rs-line-strong)',
                boxShadow: 'var(--rs-shadow-sm)',
              }}
              aria-hidden="true"
            >
              R
            </span>
            <span>
              Role<span style={{ color: 'var(--rs-blue-strong)' }}>Sharp</span>
            </span>
          </button>
        </div>

        {/* Navigation List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <span
                style={{
                  display: 'block',
                  padding: '0 10px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  color: 'var(--rs-muted)',
                }}
              >
                {group.group}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {group.items.map((item, iIdx) => {
                  const isActive = currentPath === item.path;
                  const Icon = item.icon;
                  return (
                    <button
                      key={iIdx}
                      onClick={() => navigate(item.path)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 500,
                        letterSpacing: '-0.01em',
                        color: isActive ? 'var(--rs-ink)' : 'var(--rs-muted)',
                        backgroundColor: isActive ? 'var(--rs-surface-2)' : 'transparent',
                        border: isActive ? '1px solid var(--rs-line)' : '1px solid transparent',
                        transition: 'background-color 0.15s ease, color 0.15s ease',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon
                        size={15}
                        color={isActive ? 'var(--rs-blue-strong)' : 'currentColor'}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card & Logout Bottom */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--rs-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {session.user?.name || 'Candidate User'}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--rs-muted)' }}>
              {session.plans?.name || 'Free Plan'}
            </span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{
              width: '32px',
              height: '32px',
              display: 'grid',
              placeItems: 'center',
              borderRadius: '6px',
              color: 'var(--rs-muted)',
            }}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header
          style={{
            height: '64px',
            borderBottom: '1px solid var(--rs-line)',
            backgroundColor: 'var(--rs-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
          }}
        >
          {/* Breadcrumb Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="app-mobile-menu-btn"
              style={{
                display: 'none',
                width: '36px',
                height: '36px',
                placeItems: 'center',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rs-line)',
                color: 'var(--rs-ink)',
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <span style={{ fontSize: '13px', color: 'var(--rs-muted)' }}>RoleSharp</span>
            <ChevronRight size={14} color="var(--rs-muted)" />
            <h1 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--rs-ink)' }}>
              {title}
            </h1>
          </div>

          {/* Right Topbar Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                display: 'grid',
                placeItems: 'center',
                border: '1px solid var(--rs-line)',
                backgroundColor: 'var(--rs-surface)',
                color: 'var(--rs-ink)',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease, border-color 0.15s ease',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: '32px 24px 80px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>

        {/* Mobile Bottom Navigation (Visible on narrow viewports <= 768px) */}
        <nav
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: 'var(--rs-surface)',
            borderTop: '1px solid var(--rs-line)',
            display: 'none',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 50,
          }}
          className="app-mobile-bottom-nav"
          aria-label="Mobile Navigation"
        >
          {[
            { label: 'Home', icon: LayoutDashboard, path: '/dashboard' },
            { label: 'Resumes', icon: FileText, path: '/resumes' },
            { label: 'Tailor', icon: Sparkles, path: '/tailor' },
            { label: 'Jobs', icon: Briefcase, path: '/jobs' },
            { label: 'Tracker', icon: KanbanSquare, path: '/tracker' },
          ].map((tab, idx) => {
            const isActive = currentPath === tab.path;
            const Icon = tab.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(tab.path)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  color: isActive ? 'var(--rs-blue-strong)' : 'var(--rs-muted)',
                  fontSize: '10px',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .app-sidebar-desktop {
            display: ${mobileSidebarOpen ? 'flex' : 'none'} !important;
            position: fixed !important;
            inset: 0 auto 0 0 !important;
            width: 260px !important;
            box-shadow: var(--rs-shadow) !important;
          }
          .app-mobile-menu-btn {
            display: grid !important;
          }
          .app-mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
