import React from 'react';
import { useRouter } from './router/RouterContext';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { MyResumesPage } from './pages/MyResumesPage';
import { ATSCheckerPage } from './pages/ATSCheckerPage';
import { ResumeTailorPage } from './pages/ResumeTailorPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { JobFinderPage } from './pages/JobFinderPage';
import { DailyMatchesPage } from './pages/DailyMatchesPage';
import { TrackerPage } from './pages/TrackerPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { CoverLetterAnalyzerPage } from './pages/CoverLetterAnalyzerPage';
import { LinkedInOptimizerPage } from './pages/LinkedInOptimizerPage';
import { InterviewStudioPage } from './pages/InterviewStudioPage';
import { AppShell } from './components/common/AppShell';
import { Button } from './components/common/Button';
import { ArrowLeft, Construction } from 'lucide-react';

export const App: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  switch (currentPath) {
    case '/':
      return <LandingPage />;
    case '/dashboard':
      return <DashboardPage />;
    case '/login':
      return <LoginPage />;
    case '/signup':
      return <SignupPage />;
    case '/onboarding':
      return <OnboardingPage />;
    case '/resumes':
      return <MyResumesPage />;
    case '/checker':
      return <ATSCheckerPage />;
    case '/tailor':
      return <ResumeTailorPage />;
    case '/resume-builder':
      return <ResumeBuilderPage />;
    case '/jobs':
      return <JobFinderPage />;
    case '/daily-matches':
      return <DailyMatchesPage />;
    case '/tracker':
      return <TrackerPage />;
    case '/cover-letter':
      return <CoverLetterPage />;
    case '/cover-letter-analyzer':
      return <CoverLetterAnalyzerPage />;
    case '/linkedin':
      return <LinkedInOptimizerPage />;
    case '/interview':
      return <InterviewStudioPage />;
    default:
      // Graceful fallback for subsequent bounded task routes
      return (
        <AppShell title={`Module: ${currentPath.replace('/', '').toUpperCase()}`}>
          <div
            style={{
              padding: '60px 24px',
              textAlign: 'center',
              borderRadius: '16px',
              border: '1px solid var(--rs-line)',
              backgroundColor: 'var(--rs-surface)',
              maxWidth: '600px',
              margin: '40px auto',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--rs-surface-2)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--rs-amber)',
                margin: '0 auto 16px',
              }}
            >
              <Construction size={24} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--rs-ink)',
                margin: '0 0 8px',
              }}
            >
              Module Route: {currentPath}
            </h2>
            <p style={{ color: 'var(--rs-muted)', fontSize: '14px', margin: '0 0 24px' }}>
              This route is mapped to the authoritative route matrix and is prepared for its bounded task implementation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <Button variant="ghost" onClick={() => navigate('/')} icon={<ArrowLeft size={16} />}>
                Return to Landing
              </Button>
              <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            </div>
          </div>
        </AppShell>
      );
  }
};
