import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { JobFinderPage } from '../pages/JobFinderPage';
import { DailyMatchesPage } from '../pages/DailyMatchesPage';
import { TrackerPage } from '../pages/TrackerPage';
import { ThemeProvider } from '../context/ThemeContext';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';

describe('Opportunities & Application Tracker (Task 4)', () => {
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
});
