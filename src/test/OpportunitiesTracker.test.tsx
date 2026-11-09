import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { JobFinderPage } from '../pages/JobFinderPage';
import { DailyMatchesPage } from '../pages/DailyMatchesPage';
import {
  TrackerPage,
  isValidApplicationStatus,
  sanitizeApplicationStatus,
  VALID_APPLICATION_STATUSES,
} from '../pages/TrackerPage';
import { ThemeProvider } from '../context/ThemeContext';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';

describe('Opportunities & Application Tracker (Task 4)', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('renders JobFinderPage with filters, search, and save actions', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <JobFinderPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Verified Job Matches & Source Postings/i)).toBeInTheDocument();
    expect(screen.getByText(/Staff Infrastructure & Platform Lead/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior Distributed Systems Architect/i)).toBeInTheDocument();

    // Search filter
    const searchInput = screen.getByPlaceholderText(/Search by role title, company, or technical competency/i);
    fireEvent.change(searchInput, { target: { value: 'Linear' } });

    expect(screen.getByText(/Product Systems & Experience Lead/i)).toBeInTheDocument();
    expect(screen.queryByText(/Staff Infrastructure & Platform Lead/i)).not.toBeInTheDocument();
  });

  it('renders DailyMatchesPage with two independent fit and confidence labels and campaign toggle', () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <DailyMatchesPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Curated Opportunities for Master Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Evidence Scoring Standard:/i)).toBeInTheDocument();

    // Check independent badges
    expect(screen.getAllByText(/Role Fit/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Evidence/i)[0]).toBeInTheDocument();

    // Toggle campaign status
    const pauseBtn = screen.getByRole('button', { name: /Pause Campaign/i });
    fireEvent.click(pauseBtn);

    expect(screen.getByText(/Daily match campaign paused/i)).toBeInTheDocument();
  });

  it('renders TrackerPage with 5 columns and supports adding and moving applications', async () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <TrackerPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/5-Stage Opportunity Pipeline/i)).toBeInTheDocument();
    expect(screen.getAllByText('Saved')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Applied')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Interviewing')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Offer Received')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Archived / Rejected')[0]).toBeInTheDocument();

    // Open Add Application Form
    const addBtn = screen.getByRole('button', { name: /Add Application/i });
    fireEvent.click(addBtn);

    expect(screen.getByText(/Add New Opportunity to Tracker/i)).toBeInTheDocument();

    // Fill form
    const companyInput = screen.getByLabelText(/COMPANY NAME \*/i);
    const roleInput = screen.getByLabelText(/ROLE TITLE \*/i);
    fireEvent.change(companyInput, { target: { value: 'Anthropic' } });
    fireEvent.change(roleInput, { target: { value: 'Systems Engineer' } });

    const saveBtn = screen.getByRole('button', { name: /Save to Pipeline/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText('Anthropic')).toBeInTheDocument();
      expect(screen.getByText('Systems Engineer')).toBeInTheDocument();
    });
  });

  it('validates and sanitizes application status enums strictly matching backend contract', () => {
    // 5 supported backend statuses
    expect(VALID_APPLICATION_STATUSES).toEqual(['saved', 'applied', 'interview', 'offer', 'rejected']);

    // Valid checks
    expect(isValidApplicationStatus('saved')).toBe(true);
    expect(isValidApplicationStatus('applied')).toBe(true);
    expect(isValidApplicationStatus('interview')).toBe(true);
    expect(isValidApplicationStatus('offer')).toBe(true);
    expect(isValidApplicationStatus('rejected')).toBe(true);

    // Unsupported values are strictly rejected
    expect(isValidApplicationStatus('archived')).toBe(false);
    expect(isValidApplicationStatus('interviewing')).toBe(false);
    expect(isValidApplicationStatus('withdrawn')).toBe(false);
    expect(isValidApplicationStatus('')).toBe(false);
    expect(isValidApplicationStatus(null)).toBe(false);
    expect(isValidApplicationStatus(undefined)).toBe(false);

    // Sanitization maps safely
    expect(sanitizeApplicationStatus('archived')).toBe('rejected');
    expect(sanitizeApplicationStatus('interviewing')).toBe('interview');
    expect(sanitizeApplicationStatus('unknown_status')).toBe('saved');
  });

  it('persists applications in localStorage and loads sanitized data across reloads', async () => {
    // Inject a stored application with an unnormalized legacy status
    const testStoredApps = [
      {
        id: 'stored_test_1',
        company: 'Stripe',
        role: 'Infra Lead',
        status: 'archived', // should be sanitized to 'rejected'
        date: 'Nov 2026',
      },
    ];
    localStorage.setItem('rolesharp_tracker_applications', JSON.stringify(testStoredApps));

    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <TrackerPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    // Should find the company under the Archived / Rejected column
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getByText('Infra Lead')).toBeInTheDocument();

    // Verify localStorage has sanitized status
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem('rolesharp_tracker_applications') || '[]');
      expect(saved[0].status).toBe('rejected');
    });
  });
});
