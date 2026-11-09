import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { ATSCheckerPage } from '../pages/ATSCheckerPage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <RouterProvider>
        <AuthProvider>{ui}</AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
};

describe('ATSCheckerPage — Data Integrity & Real Diagnostic Pipeline', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('File Validation & Intake', () => {
    it('rejects unsupported file extensions with clear error message', () => {
      renderWithProviders(<ATSCheckerPage />);

      const fileInput = screen.getByTestId('ats-file-input') as HTMLInputElement;
      const invalidFile = new File(['image content'], 'my_resume.png', { type: 'image/png' });

      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      expect(screen.getByText(/Unsupported file type\. Please upload a PDF, DOCX, or TXT file\./i)).toBeInTheDocument();
      expect(screen.queryByText(/Uploaded and parsed/i)).not.toBeInTheDocument();
    });

    it('rejects files exceeding 5MB limit', () => {
      renderWithProviders(<ATSCheckerPage />);

      const fileInput = screen.getByTestId('ats-file-input') as HTMLInputElement;
      const oversizedFile = new File(['small content'], 'giant_resume.pdf', { type: 'application/pdf' });
      Object.defineProperty(oversizedFile, 'size', { value: 6 * 1024 * 1024 });

      fireEvent.change(fileInput, { target: { files: [oversizedFile] } });

      expect(screen.getByText(/File exceeds the 5 MB limit\. Please select a smaller document\./i)).toBeInTheDocument();
    });

    it('uploads valid file to POST /api/check-resume/upload via multipart FormData', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url, opts) => {
        if (url === '/api/check-resume/upload') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                filename: 'Candidate_Resume.docx',
                size: 24500,
                text: 'Senior Staff Platform Engineer with 10+ years experience in distributed systems and Kubernetes infrastructure migrations.',
                wordCount: 16,
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<ATSCheckerPage />);

      const fileInput = screen.getByTestId('ats-file-input') as HTMLInputElement;
      const validDoc = new File(['sample docx content'], 'Candidate_Resume.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      fireEvent.change(fileInput, { target: { files: [validDoc] } });

      await waitFor(() => {
        expect(screen.getAllByText(/Candidate_Resume\.docx/i)[0]).toBeInTheDocument();
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/check-resume/upload',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
        })
      );
    });
  });

  describe('Pasted-Text Processing & Validation', () => {
    it('rejects submission when resume text is under 80 characters', async () => {
      renderWithProviders(<ATSCheckerPage />);

      // Switch to paste tab
      fireEvent.click(screen.getByRole('button', { name: /Paste Text/i }));

      const textarea = screen.getByTestId('ats-paste-textarea');
      fireEvent.change(textarea, { target: { value: 'Too short resume text.' } });

      const analyzeBtn = screen.getByTestId('ats-analyze-btn');
      fireEvent.click(analyzeBtn);

      expect(
        await screen.findByText(/Please provide at least 80 characters of resume text/i)
      ).toBeInTheDocument();
      expect(screen.queryByText(/High Parsing Fidelity/i)).not.toBeInTheDocument();
    });
  });

  describe('Diagnostic Analysis & Backend Contract Verification', () => {
    it('renders diagnostic scores, dimensions, and gaps from POST /api/check-resume response', async () => {
      const sampleText =
        'Staff Systems Architect with extensive experience in multi-region Kubernetes deployments, Kafka clustering, and slashing P99 latency by 42%. Spearheaded automated canary gates across 45 engineering contributors.';

      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url, opts) => {
        if (url === '/api/check-resume') {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                overallScore: 94,
                dimensions: {
                  parseability: 96,
                  layoutRisk: 4,
                  keywordCoverage: 92,
                  evidenceStrength: 95,
                  roleFit: 93,
                },
                gaps: [
                  {
                    id: 'gap_backend_1',
                    category: 'keyword',
                    issue: 'Add explicit reference to Terraform multi-region modules',
                    sourceExcerpt: 'experience in multi-region Kubernetes deployments',
                    recommendedFix: 'Incorporate Terraform IaC and Helm chart management.',
                  },
                ],
                recruiterFeedback: [
                  'Strong single-column layout.',
                  'Excellent metric density (42% latency reduction).',
                ],
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
          );
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<ATSCheckerPage />);

      fireEvent.click(screen.getByRole('button', { name: /Paste Text/i }));
      const textarea = screen.getByTestId('ats-paste-textarea');
      fireEvent.change(textarea, { target: { value: sampleText } });

      const analyzeBtn = screen.getByTestId('ats-analyze-btn');
      fireEvent.click(analyzeBtn);

      await waitFor(() => {
        expect(screen.getAllByText('94')[0]).toBeInTheDocument();
        expect(screen.getByText(/High Parsing Fidelity & Single-Column Compliance/i)).toBeInTheDocument();
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/check-resume',
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
          body: expect.stringContaining('"resumeText"'),
        })
      );

      // Verify server badge
      expect(screen.getAllByText(/Live \/api\/check-resume/i)[0]).toBeInTheDocument();
      // Verify dimensions
      expect(screen.getByText('96%')).toBeInTheDocument(); // parseability
      expect(screen.getByText('95%')).toBeInTheDocument(); // evidenceStrength
      expect(screen.getByText('92%')).toBeInTheDocument(); // keywordCoverage
      expect(screen.getByText('93%')).toBeInTheDocument(); // roleFit
      // Verify returned gap
      expect(screen.getByText('Add explicit reference to Terraform multi-region modules')).toBeInTheDocument();
    });

    it('falls back to local heuristic analysis when backend fails (HTTP 500) and displays honest disclosure', async () => {
      const sampleText =
        'Staff Systems Architect with extensive experience in multi-region Kubernetes deployments, Kafka clustering, and slashing P99 latency by 42%. Spearheaded automated canary gates across 45 engineering contributors.';

      vi.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url === '/api/check-resume') {
          return Promise.resolve(new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 }));
        }
        return Promise.reject(new Error('Unknown endpoint'));
      });

      renderWithProviders(<ATSCheckerPage />);

      fireEvent.click(screen.getByRole('button', { name: /Paste Text/i }));
      const textarea = screen.getByTestId('ats-paste-textarea');
      fireEvent.change(textarea, { target: { value: sampleText } });

      const analyzeBtn = screen.getByTestId('ats-analyze-btn');
      fireEvent.click(analyzeBtn);

      await waitFor(() => {
        expect(screen.getByText(/Local Heuristic Analysis \(Zero Remote Storage\)/i)).toBeInTheDocument();
      });

      expect(screen.getByText(/Server \(\/api\/check-resume\) returned HTTP 500/i)).toBeInTheDocument();
      expect(screen.queryByText(/Live \/api\/check-resume \(Server AST\)/i)).not.toBeInTheDocument();
    });
  });
});
