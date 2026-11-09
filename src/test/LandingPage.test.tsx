import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LandingPage } from '../pages/LandingPage';
import { MyResumesPage } from '../pages/MyResumesPage';
import { AboutPage } from '../pages/AboutPage';
import { HelpPage } from '../pages/HelpPage';
import { ThemeProvider } from '../context/ThemeContext';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';

describe('LandingPage & Design System Core', () => {
  it('renders brand headline and value proposition', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <LandingPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/RoleSharp:/i)).toBeInTheDocument();
    expect(screen.getByText(/One step ahead towards a successful career./i)).toBeInTheDocument();
    expect(screen.getByText(/Career clarity, built around your real work/i)).toBeInTheDocument();
    expect(screen.getByText(/Evidence Review Stage/i)).toBeInTheDocument();
  });

  it('contains the exact user-mandated kinetic promotional quote text', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <LandingPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    const srOnlyQuote = screen.getByText(
      /Do you know what it takes to secure a job rather than Degree and Skills\? well! A perfect resume that explains you more than yourself!! So, choose RoleSharp to tailor your resume\./i
    );
    expect(srOnlyQuote).toBeInTheDocument();
  });

  describe('Route Availability & Reconciliation (/resumes, /about, /help)', () => {
    it('renders MyResumesPage at /resumes with document repository and master profile', () => {
      render(
        <ThemeProvider>
          <RouterProvider>
            <AuthProvider>
              <MyResumesPage />
            </AuthProvider>
          </RouterProvider>
        </ThemeProvider>
      );

      expect(screen.getByText(/Master Executive Profile/i)).toBeInTheDocument();
      expect(screen.getByText(/DOCUMENT WORKSPACE/i)).toBeInTheDocument();
      expect(screen.getByText(/New Resume/i)).toBeInTheDocument();
    });

    it('renders AboutPage at /about with clean-room engineering manifesto', () => {
      render(
        <ThemeProvider>
          <RouterProvider>
            <AuthProvider>
              <AboutPage />
            </AuthProvider>
          </RouterProvider>
        </ThemeProvider>
      );

      expect(screen.getByText(/The Anti-Slop, Evidence-First Career Platform/i)).toBeInTheDocument();
      expect(screen.getByText(/Evidence-Grounded Engineering/i)).toBeInTheDocument();
      expect(screen.getByText(/MANIFESTO & PRINCIPLES/i)).toBeInTheDocument();
    });

    it('renders HelpPage at /help with searchable knowledge base and mythbusters', () => {
      render(
        <ThemeProvider>
          <RouterProvider>
            <AuthProvider>
              <HelpPage />
            </AuthProvider>
          </RouterProvider>
        </ThemeProvider>
      );

      expect(screen.getByText(/RoleSharp Help Center & ATS Knowledge Base/i)).toBeInTheDocument();
      expect(screen.getByText(/KNOWLEDGE BASE & GUIDES/i)).toBeInTheDocument();
      expect(screen.getByText(/Recruiting Best Practices/i)).toBeInTheDocument();
    });
  });
});
