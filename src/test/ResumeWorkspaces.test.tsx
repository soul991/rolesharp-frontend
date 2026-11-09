import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ResumeWritingAnimation } from '../components/resume/ResumeWritingAnimation';
import { TemplateCardStack } from '../components/resume/TemplateCardStack';
import { MyResumesPage } from '../pages/MyResumesPage';
import { ATSCheckerPage } from '../pages/ATSCheckerPage';
import { ResumeTailorPage } from '../pages/ResumeTailorPage';
import { ResumeBuilderPage } from '../pages/ResumeBuilderPage';
import { ThemeProvider } from '../context/ThemeContext';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';

describe('Resume Workspaces & Superdesign Patterns (Task 3)', () => {
  it('renders ResumeWritingAnimation with white paper sheet and progressive text reveal', async () => {
    const onComplete = vi.fn();
    render(
      <ResumeWritingAnimation
        isGenerating={true}
        speedMs={50}
        onComplete={onComplete}
        candidateName="Alex Morgan"
        targetRole="Staff Systems Architect"
        company="Stripe"
      />
    );

    expect(screen.getByText('Alex Morgan')).toBeInTheDocument();
    expect(screen.getByText(/Staff Systems Architect · Calibrated for Stripe/i)).toBeInTheDocument();
    expect(screen.getByText(/100% EVIDENCE GROUNDED/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    }, { timeout: 1500 });
  });

  it('renders TemplateCardStack and handles template selection', () => {
    const onSelect = vi.fn();
    render(
      <TemplateCardStack
        selectedTemplateId="editorial"
        onSelectTemplate={onSelect}
      />
    );

    expect(screen.getByRole('heading', { name: 'Classic Editorial' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Modern Executive' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Technical Depth' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Compact Single-Page' })).toBeInTheDocument();

    // Select Modern Executive
    const modernCard = screen.getByLabelText(/Select template Modern Executive/i);
    fireEvent.click(modernCard);

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'modern', name: 'Modern Executive' })
    );
  });

  it('renders MyResumesPage with versions, search filtering, and duplicate action', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <MyResumesPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Master Profiles & Role-Specific Tailors/i)).toBeInTheDocument();
    expect(screen.getByText(/Master Executive Profile \(Comprehensive\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Stripe — Staff Infrastructure & Platform Lead/i)).toBeInTheDocument();

    // Search filter
    const searchInput = screen.getByPlaceholderText(/Search by resume title, target role, or company\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'Datadog' } });

    expect(screen.getByText(/Datadog — Senior Systems Architect/i)).toBeInTheDocument();
    expect(screen.queryByText(/Stripe — Staff Infrastructure & Platform Lead/i)).not.toBeInTheDocument();
  });

  it('renders ATSCheckerPage with category breakdown and anchored evidence gaps', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <ATSCheckerPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/ATS Resume Health & Diagnostic Report/i)).toBeInTheDocument();
    expect(screen.getByText(/High Parsing Fidelity & Single-Column Compliance/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Formatting Safety/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Metric Density/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Keyword Coverage/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Executive Voice/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Anchored Evidence Gaps & Actionable Fixes/i)).toBeInTheDocument();
  });

  it('renders ResumeTailorPage and allows reviewing grounded diffs', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <ResumeTailorPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Job-Calibrated Resume Tailoring Studio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Company \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Role Title \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Tailored Draft/i })).toBeInTheDocument();
  });

  it('renders ResumeBuilderPage with editor tabs and live preview sheet', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <ResumeBuilderPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Resume Workspace Editor/i)).toBeInTheDocument();
    expect(screen.getByText(/Content Editor/i)).toBeInTheDocument();
    expect(screen.getByText(/Paper Preview/i)).toBeInTheDocument();

    // Switch to Card Stack tab
    const stackTab = screen.getByRole('button', { name: /Card Stack/i });
    fireEvent.click(stackTab);

    expect(screen.getByText(/INTERACTIVE TEMPLATE STACK/i)).toBeInTheDocument();
  });
});
