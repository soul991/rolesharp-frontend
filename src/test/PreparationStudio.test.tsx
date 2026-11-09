import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AnimatedList, AnimatedListItem } from '../components/common/AnimatedList';
import { CoverLetterPage } from '../pages/CoverLetterPage';
import { CoverLetterAnalyzerPage } from '../pages/CoverLetterAnalyzerPage';
import { LinkedInOptimizerPage } from '../pages/LinkedInOptimizerPage';
import { InterviewStudioPage } from '../pages/InterviewStudioPage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <RouterProvider>
        <AuthProvider>{ui}</AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
};

describe('Task 5 — Preparation Tools & Superdesign Animated List', () => {
  describe('AnimatedList Component', () => {
    const mockItems: AnimatedListItem[] = [
      { id: 'item_1', title: 'Formal Tone', description: 'Enterprise and executive standard' },
      { id: 'item_2', title: 'Warm Tone', description: 'Mission-driven and collaborative' },
      { id: 'item_3', title: 'Direct Tone', description: 'Metrics-first and concise' },
    ];

    it('renders all items and marks selected item with aria-checked', () => {
      const handleSelect = vi.fn();
      render(
        <AnimatedList
          items={mockItems}
          selectedId="item_1"
          onSelect={handleSelect}
          label="Test Options"
        />
      );

      expect(screen.getByText('Formal Tone')).toBeInTheDocument();
      expect(screen.getByText('Warm Tone')).toBeInTheDocument();
      expect(screen.getByText('Direct Tone')).toBeInTheDocument();

      const radioOptions = screen.getAllByRole('radio');
      expect(radioOptions).toHaveLength(3);
      expect(radioOptions[0]).toHaveAttribute('aria-checked', 'true');
      expect(radioOptions[1]).toHaveAttribute('aria-checked', 'false');
    });

    it('triggers onSelect when an item is clicked or keyboard activated', () => {
      const handleSelect = vi.fn();
      render(
        <AnimatedList
          items={mockItems}
          selectedId="item_1"
          onSelect={handleSelect}
          label="Test Options"
        />
      );

      const radioOptions = screen.getAllByRole('radio');
      fireEvent.click(radioOptions[1]);
      expect(handleSelect).toHaveBeenCalledWith(mockItems[1]);

      fireEvent.keyDown(radioOptions[2], { key: 'Enter' });
      expect(handleSelect).toHaveBeenCalledWith(mockItems[2]);
    });
  });

  describe('CoverLetterPage', () => {
    it('renders generator controls, tone selector, and invariant paper preview', () => {
      renderWithProviders(<CoverLetterPage />);

      expect(screen.getByText('Evidence-Grounded Cover Letter Generator')).toBeInTheDocument();
      expect(screen.getByLabelText(/Grounded Resume Source/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Target Company/i)).toHaveValue('Stripe');
      expect(screen.getByText('Formal & Authoritative')).toBeInTheDocument();
      expect(screen.getByLabelText('Editable cover letter content')).toBeInTheDocument();
    });

    it('synthesizes draft upon form submission', async () => {
      vi.useFakeTimers();
      renderWithProviders(<CoverLetterPage />);

      const submitBtn = screen.getByRole('button', { name: /Synthesize Grounded Draft/i });
      fireEvent.click(submitBtn);

      await act(async () => {
        vi.advanceTimersByTime(800);
      });

      expect(screen.getByText(/Draft synthesized/i)).toBeInTheDocument();
      vi.useRealTimers();
    });
  });

  describe('CoverLetterAnalyzerPage', () => {
    it('analyzes cover letter text and shows 4 dimension diagnostics', async () => {
      vi.useFakeTimers();
      renderWithProviders(<CoverLetterAnalyzerPage />);

      expect(screen.getAllByText('Cover Letter Diagnostic Analyzer')[0]).toBeInTheDocument();
      const auditBtn = screen.getByRole('button', { name: /Run Diagnostic Audit/i });
      fireEvent.click(auditBtn);

      await act(async () => {
        vi.advanceTimersByTime(700);
      });

      expect(screen.getByText('Overall Letter Quality')).toBeInTheDocument();
      expect(screen.getByText('Length & Readability')).toBeInTheDocument();
      expect(screen.getByText('Quantified Evidence & Metrics')).toBeInTheDocument();
      expect(screen.getByText('Target Alignment & Purpose')).toBeInTheDocument();
      expect(screen.getByText('Cliché & Buzzword Detection')).toBeInTheDocument();
      vi.useRealTimers();
    });
  });

  describe('LinkedInOptimizerPage', () => {
    it('renders headline studio, zero-scraping guarantee, and simulated recruiter card', () => {
      renderWithProviders(<LinkedInOptimizerPage />);

      expect(screen.getAllByText('LinkedIn Profile Optimizer')[0]).toBeInTheDocument();
      expect(screen.getByText('Zero-Scraping Guarantee')).toBeInTheDocument();
      expect(screen.getByLabelText(/LinkedIn Headline/i)).toBeInTheDocument();
      expect(screen.getByText('Recruiter View Simulation')).toBeInTheDocument();
      expect(screen.getByText('Alex Morgan, PMP')).toBeInTheDocument();
    });

    it('switches between Headline, About, and Keywords tabs', () => {
      renderWithProviders(<LinkedInOptimizerPage />);

      const aboutTab = screen.getByRole('button', { name: /About & Summary Hook/i });
      fireEvent.click(aboutTab);
      expect(screen.getByLabelText(/About Section & Executive Hook/i)).toBeInTheDocument();

      const keywordsTab = screen.getByRole('button', { name: /Recruiter Search Keywords/i });
      fireEvent.click(keywordsTab);
      expect(screen.getByText('High-Visibility Recruiter Keywords')).toBeInTheDocument();
      expect(screen.getByText('Kubernetes (K8s)')).toBeInTheDocument();
    });
  });

  describe('InterviewStudioPage', () => {
    it('renders 6 grounded questions and tracks rehearsal mastery', () => {
      renderWithProviders(<InterviewStudioPage />);

      expect(screen.getAllByText('Interview Practice Studio')[0]).toBeInTheDocument();
      expect(screen.getByText(/Questions Rehearsed/i)).toBeInTheDocument();
      expect(screen.getByText('Model Executive Answer (STAR Format)')).toBeInTheDocument();
      expect(screen.getByText(/Calibrated To Verified Resume Anchor/i)).toBeInTheDocument();

      const markBtn = screen.getByRole('button', { name: /Mark Unrehearsed/i });
      fireEvent.click(markBtn);
      expect(screen.getAllByRole('button', { name: /Mark as Rehearsed/i })[0]).toBeInTheDocument();
    });

    it('disables calibration when no resume is selected and prevents submission', () => {
      renderWithProviders(<InterviewStudioPage />);

      const select = screen.getByTestId('interview-resume-select');
      expect(select).toHaveValue('');
      expect(screen.getByText(/Select one of your authenticated saved resumes above/i)).toBeInTheDocument();

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      expect(calibrateBtn).toBeDisabled();
    });

    it('correctly serializes the selected resume ID to POST /api/interview and handles response', async () => {
      localStorage.setItem(
        'rolesharp-auth-session',
        JSON.stringify({
          authenticated: true,
          credits: 5,
          features: { interview_prep: true },
        })
      );

      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/interview') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                questions: [
                  {
                    id: 'q_server_1',
                    category: 'System Architecture',
                    question: 'Server Calibrated: How did you scale Redis clusters?',
                    rationale: 'Directly from server',
                    resumeAnchor: 'scaled Redis clusters to 50k ops/sec',
                    modelAnswer: 'We sharded across 16 master nodes...',
                    keyTalkingPoints: ['Redis sharding', 'Cluster failover'],
                    rehearsed: false,
                  },
                ],
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.resolve(
          new Response(
            JSON.stringify({
              resumes: [
                { id: 'res_stripe_02', name: 'Stripe — Staff Infrastructure & Platform Lead (v1.4)' },
                { id: 'res_datadog_03', name: 'Datadog — Senior Systems Architect (v2.0)' },
              ],
            }),
            { status: 200 }
          )
        );
      });

      renderWithProviders(<InterviewStudioPage />);

      const select = screen.getByTestId('interview-resume-select');
      fireEvent.change(select, { target: { value: 'res_stripe_02' } });
      expect(select).toHaveValue('res_stripe_02');

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      expect(calibrateBtn).not.toBeDisabled();

      fireEvent.click(calibrateBtn);

      await act(async () => {
        await Promise.resolve();
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/interview',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ resumeId: 'res_stripe_02', useCredit: true }),
        })
      );

      expect(await screen.findByText(/Live Backend Active/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Server Calibrated: How did you scale Redis clusters/i)[0]).toBeInTheDocument();

      fetchSpy.mockRestore();
    });

    it('displays explicit offline fallback warning when /api/interview fails and does not consume credits', async () => {
      localStorage.setItem(
        'rolesharp-auth-session',
        JSON.stringify({
          authenticated: true,
          credits: 5,
          features: { interview_prep: true },
        })
      );

      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/interview') {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.resolve(
          new Response(
            JSON.stringify({
              resumes: [
                { id: 'res_stripe_02', name: 'Stripe — Staff Infrastructure & Platform Lead (v1.4)' },
                { id: 'res_datadog_03', name: 'Datadog — Senior Systems Architect (v2.0)' },
              ],
            }),
            { status: 200 }
          )
        );
      });

      renderWithProviders(<InterviewStudioPage />);

      const select = screen.getByTestId('interview-resume-select');
      fireEvent.change(select, { target: { value: 'res_datadog_03' } });

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      fireEvent.click(calibrateBtn);

      await act(async () => {
        await Promise.resolve();
      });

      expect(await screen.findByText(/Offline Rehearsal Mode/i)).toBeInTheDocument();
      expect(screen.getByText(/Zero credits were consumed/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Retry Server Connection/i })).toBeInTheDocument();

      fetchSpy.mockRestore();
    });

    it('prevents submission and displays honest error when user is not authenticated', () => {
      localStorage.removeItem('rolesharp-auth-session');
      renderWithProviders(<InterviewStudioPage />);

      const select = screen.getByTestId('interview-resume-select');
      fireEvent.change(select, { target: { value: 'res_stripe_02' } });

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      act(() => {
        fireEvent.click(calibrateBtn);
      });

      expect(screen.getByText(/Authentication required/i)).toBeInTheDocument();
    });
  });
});