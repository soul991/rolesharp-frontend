import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  describe('CoverLetterAnalyzerPage — Data Flow & Server Contract', () => {
    it('submits letter to POST /api/cover-letter-analyzer and renders server response upon HTTP 200', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/cover-letter-analyzer') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                overallScore: 91,
                wordCount: 310,
                readingTimeMin: 2,
                dimensions: {
                  lengthAndBrevity: { score: 94, label: '310 words (Optimal)', status: 'success' },
                  quantifiedEvidence: { score: 92, label: '5 verified anchors', status: 'success', metrics: ['42% latency'] },
                  personalization: { score: 88, label: 'Target alignment verified', status: 'success' },
                  clicheIndex: { score: 95, label: '0 cliches detected', status: 'success', flaggedTerms: [] },
                },
                recommendations: [
                  { id: 'rec_server_1', type: 'praise', text: 'Server validated: Excellent technical density.' },
                ],
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<CoverLetterAnalyzerPage />);

      const auditBtn = screen.getByRole('button', { name: /Run Diagnostic Audit/i });
      fireEvent.click(auditBtn);

      await waitFor(() => {
        expect(screen.getByText('Overall Letter Quality')).toBeInTheDocument();
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/cover-letter-analyzer',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
        })
      );

      expect(screen.getByText(/Live \/api\/cover-letter-analyzer/i)).toBeInTheDocument();
      expect(screen.getByText('Server validated: Excellent technical density.')).toBeInTheDocument();
    });

    it('falls back to local heuristic analysis with honest offline disclosure when server fails', async () => {
      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/cover-letter-analyzer') {
          return Promise.resolve(new Response(JSON.stringify({ error: 'Server unavailable' }), { status: 503 }));
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<CoverLetterAnalyzerPage />);

      const auditBtn = screen.getByRole('button', { name: /Run Diagnostic Audit/i });
      fireEvent.click(auditBtn);

      await waitFor(() => {
        expect(screen.getByText('Overall Letter Quality')).toBeInTheDocument();
      });

      expect(screen.getAllByText(/Local In-Memory Heuristic Engine/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Backend unavailable \(HTTP 503\)/i)).toBeInTheDocument();
    });
  });

  describe('LinkedInOptimizerPage — Saved Resume Integration', () => {
    it('loads saved resumes via GET /api/resumes as a direct array and populates selector', async () => {
      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_auth_101', name: 'Real User Executive Profile', role: 'Staff Systems Architect' },
                { id: 'res_auth_102', name: 'Real User Cloud Lead', role: 'Cloud Lead' },
              ]),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<LinkedInOptimizerPage />);

      const select = await screen.findByTestId('linkedin-resume-select');
      expect(select).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Real User Executive Profile')).toBeInTheDocument();
        expect(screen.getByText('Real User Cloud Lead')).toBeInTheDocument();
      });

      // Initially unselected
      expect(select).toHaveValue('');
      const optimizeBtn = screen.getByTestId('linkedin-optimize-btn');
      expect(optimizeBtn).toBeDisabled();
    });

    it('submits selected real resume ID to POST /api/linkedin and updates fields from server response', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_auth_101', name: 'Real User Executive Profile', role: 'Staff Systems Architect' },
              ]),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        if (url === '/api/linkedin') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                headline: 'Server Generated Headline | Kubernetes & Go Specialist',
                about: 'Server Generated About: Architecting multi-region systems at scale.',
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<LinkedInOptimizerPage />);

      const select = await screen.findByTestId('linkedin-resume-select');
      await waitFor(() => {
        expect(screen.getByText('Real User Executive Profile')).toBeInTheDocument();
      });

      fireEvent.change(select, { target: { value: 'res_auth_101' } });
      expect(select).toHaveValue('res_auth_101');

      const optimizeBtn = screen.getByTestId('linkedin-optimize-btn');
      expect(optimizeBtn).not.toBeDisabled();
      fireEvent.click(optimizeBtn);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Server Generated Headline | Kubernetes & Go Specialist')).toBeInTheDocument();
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/linkedin',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ resumeId: 'res_auth_101' }),
        })
      );
      expect(screen.getByText(/Live \/api\/linkedin/i)).toBeInTheDocument();
    });

    it('handles server failure honestly without using sample fallback data', async () => {
      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_auth_101', name: 'Real User Executive Profile' },
              ]),
              { status: 200 }
            )
          );
        }
        if (url === '/api/linkedin') {
          return Promise.resolve(new Response(JSON.stringify({ error: 'Server error' }), { status: 500 }));
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<LinkedInOptimizerPage />);

      const select = await screen.findByTestId('linkedin-resume-select');
      await waitFor(() => {
        expect(screen.getByText('Real User Executive Profile')).toBeInTheDocument();
      });

      fireEvent.change(select, { target: { value: 'res_auth_101' } });
      const optimizeBtn = screen.getByTestId('linkedin-optimize-btn');
      fireEvent.click(optimizeBtn);

      await waitFor(() => {
        expect(screen.getByText(/Offline Fallback/i)).toBeInTheDocument();
      });
      expect(screen.getByText(/Server error \(HTTP 500\)/i)).toBeInTheDocument();
    });
  });

  describe('InterviewStudioPage — Authoritative Saved Resume Contract', () => {
    it('1. Direct array response from GET /api/resumes loads correctly into selector', async () => {
      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_user_alpha', name: 'Alpha Production Profile (v1.0)' },
                { id: 'res_user_beta', name: 'Beta Systems Profile (v2.0)' },
              ]),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<InterviewStudioPage />);

      const select = screen.getByTestId('interview-resume-select');
      expect(select).toHaveValue('');

      await waitFor(() => {
        expect(screen.getByText('Alpha Production Profile (v1.0)')).toBeInTheDocument();
        expect(screen.getByText('Beta Systems Profile (v2.0)')).toBeInTheDocument();
      });
    });

    it('2. Empty array from GET /api/resumes leaves selector empty with honest empty state', async () => {
      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(new Response(JSON.stringify([]), { status: 200 }));
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<InterviewStudioPage />);

      await waitFor(() => {
        expect(screen.getByText(/No saved resumes found in your account/i)).toBeInTheDocument();
      });

      const select = screen.getByTestId('interview-resume-select');
      expect(select).toHaveValue('');
      expect(screen.getByTestId('calibrate-interview-btn')).toBeDisabled();
    });

    it('3. 401 response and network failure do not expose demo resumes', async () => {
      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }));
        }
        return Promise.reject(new Error('Network error'));
      });

      renderWithProviders(<InterviewStudioPage />);

      await waitFor(() => {
        expect(screen.getByText(/Error loading resumes: Server returned HTTP 401/i)).toBeInTheDocument();
      });

      // Demo resumes must NOT be present as options in the select
      expect(screen.queryByText(/Master Executive Profile \(v3\.2\)/i)).not.toBeInTheDocument();
      expect(screen.getByTestId('calibrate-interview-btn')).toBeDisabled();
    });

    it('4. A real returned resume ID is submitted unchanged to POST /api/interview', async () => {
      localStorage.setItem(
        'rolesharp-auth-session',
        JSON.stringify({
          authenticated: true,
          credits: 5,
          features: { interview_prep: true },
        })
      );

      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_real_999', name: 'Real Engineer Resume' },
              ]),
              { status: 200 }
            )
          );
        }
        if (url === '/api/interview') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                questions: [
                  {
                    id: 'q_server_real',
                    category: 'System Architecture',
                    question: 'Server: How did you scale distributed queues?',
                    rationale: 'Direct from backend',
                    resumeAnchor: 'scaled queues to 100k QPS',
                    modelAnswer: 'We sharded partitions...',
                    keyTalkingPoints: ['Partitioning', 'Compaction'],
                    rehearsed: false,
                  },
                ],
                creditsRemaining: 4,
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<InterviewStudioPage />);

      await waitFor(() => {
        expect(screen.getByText('Real Engineer Resume')).toBeInTheDocument();
      });

      const select = screen.getByTestId('interview-resume-select');
      fireEvent.change(select, { target: { value: 'res_real_999' } });
      expect(select).toHaveValue('res_real_999');

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      expect(calibrateBtn).not.toBeDisabled();
      fireEvent.click(calibrateBtn);

      await waitFor(() => {
        expect(screen.getByText(/Live \/api\/interview/i)).toBeInTheDocument();
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/interview',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ resumeId: 'res_real_999', useCredit: true }),
        })
      );
      expect(screen.getAllByText(/Server: How did you scale distributed queues/i)[0]).toBeInTheDocument();
    });

    it('5. An unselected or invalid ID cannot be submitted', async () => {
      localStorage.setItem(
        'rolesharp-auth-session',
        JSON.stringify({
          authenticated: true,
          credits: 5,
        })
      );

      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_valid_1', name: 'Valid User Resume' },
              ]),
              { status: 200 }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<InterviewStudioPage />);

      await waitFor(() => {
        expect(screen.getByText('Valid User Resume')).toBeInTheDocument();
      });

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      expect(calibrateBtn).toBeDisabled();

      // Attempt to click disabled button
      fireEvent.click(calibrateBtn);
      expect(screen.queryByText(/Live \/api\/interview/i)).not.toBeInTheDocument();
    });

    it('6. An unsuccessful request consumes no credits', async () => {
      localStorage.setItem(
        'rolesharp-auth-session',
        JSON.stringify({
          authenticated: true,
          credits: 7,
          features: { interview_prep: true },
        })
      );

      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_real_100', name: 'Production Cloud Resume' },
              ]),
              { status: 200 }
            )
          );
        }
        if (url === '/api/interview') {
          return Promise.resolve(new Response(JSON.stringify({ error: 'Failed' }), { status: 500 }));
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<InterviewStudioPage />);

      await waitFor(() => {
        expect(screen.getByText('Production Cloud Resume')).toBeInTheDocument();
      });

      const select = screen.getByTestId('interview-resume-select');
      fireEvent.change(select, { target: { value: 'res_real_100' } });

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      fireEvent.click(calibrateBtn);

      await waitFor(() => {
        expect(screen.getByText(/Offline Fallback Active/i)).toBeInTheDocument();
      });

      expect(screen.getByText(/Zero credits were consumed/i)).toBeInTheDocument();

      // Check stored session in localStorage: credits must remain 7!
      const stored = JSON.parse(localStorage.getItem('rolesharp-auth-session') || '{}');
      expect(stored.credits).toBe(7);
    });

    it('7. Successful credit usage is reconciled with authoritative server response', async () => {
      localStorage.setItem(
        'rolesharp-auth-session',
        JSON.stringify({
          authenticated: true,
          credits: 10,
          features: { interview_prep: true },
        })
      );

      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/resumes') {
          return Promise.resolve(
            new Response(
              JSON.stringify([
                { id: 'res_credit_check', name: 'Credit Verification Resume' },
              ]),
              { status: 200 }
            )
          );
        }
        if (url === '/api/interview') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                questions: [
                  {
                    id: 'q1',
                    category: 'System Architecture',
                    question: 'Question 1',
                    rationale: 'Rationale',
                    resumeAnchor: 'Anchor',
                    modelAnswer: 'Answer',
                    keyTalkingPoints: ['Point'],
                    rehearsed: false,
                  },
                ],
                creditsRemaining: 9, // Authoritative server accounting
              }),
              { status: 200 }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<InterviewStudioPage />);

      await waitFor(() => {
        expect(screen.getByText('Credit Verification Resume')).toBeInTheDocument();
      });

      const select = screen.getByTestId('interview-resume-select');
      fireEvent.change(select, { target: { value: 'res_credit_check' } });

      const calibrateBtn = screen.getByTestId('calibrate-interview-btn');
      fireEvent.click(calibrateBtn);

      await waitFor(() => {
        expect(screen.getByText(/Live \/api\/interview/i)).toBeInTheDocument();
      });

      const stored = JSON.parse(localStorage.getItem('rolesharp-auth-session') || '{}');
      expect(stored.credits).toBe(9);
    });
  });
});
