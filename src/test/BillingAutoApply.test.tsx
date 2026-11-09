import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { PricingPage } from '../pages/PricingPage';
import { BillingPage } from '../pages/BillingPage';
import { AutoApplyPage } from '../pages/AutoApplyPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ToolsCataloguePage } from '../pages/ToolsCataloguePage';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <RouterProvider>
        <AuthProvider>{ui}</AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
};

describe('Task 6 — Billing, Superdesign Pricing, Settings & Controlled Auto Apply', () => {
  describe('PricingSection & PricingPage', () => {
    it('renders 3 tiered plans and allows switching between monthly and annual billing', () => {
      renderWithProviders(<PricingPage />);

      expect(screen.getByText('Starter Career')).toBeInTheDocument();
      expect(screen.getByText('Professional Suite')).toBeInTheDocument();
      expect(screen.getByText('Executive All-Access')).toBeInTheDocument();
      expect(screen.getByText(/50% OFF PRO/i)).toBeInTheDocument();

      // Default is annual: $19/month
      expect(screen.getByText('$19')).toBeInTheDocument();

      // Switch to monthly
      const monthlyBtn = screen.getByRole('button', { name: /Monthly Billing/i });
      fireEvent.click(monthlyBtn);
      expect(screen.getByText('$24')).toBeInTheDocument();
    });

    it('expands FAQ accordion items', () => {
      renderWithProviders(<PricingPage />);

      const faqBtn = screen.getByRole('button', { name: /How does the student discount verification work/i });
      fireEvent.click(faqBtn);
      expect(screen.getByText(/active university or accredited educational domain email/i)).toBeInTheDocument();
    });
  });

  describe('BillingPage', () => {
    it('renders active plan, usage progress, payment card, and invoice history', () => {
      renderWithProviders(<BillingPage />);

      expect(screen.getByText('Professional Suite')).toBeInTheDocument();
      expect(screen.getByText('$19/month · Billed annually (renews Oct 31, 2027)')).toBeInTheDocument();
      expect(screen.getByText(/6 of 20 generated/i)).toBeInTheDocument();
      expect(screen.getByText(/2 of 5 packages dispatched/i)).toBeInTheDocument();
      expect(screen.getByText('15 Credits')).toBeInTheDocument();
      expect(screen.getByText(/•••• •••• •••• 4242/i)).toBeInTheDocument();
      expect(screen.getByText(/Nov 01, 2026/i)).toBeInTheDocument();
    });

    it('handles adding credits with notification feedback', () => {
      renderWithProviders(<BillingPage />);

      const addCreditsBtn = screen.getByRole('button', { name: /Add Credits/i });
      fireEvent.click(addCreditsBtn);
      expect(screen.getByText(/Added 5 additional credits/i)).toBeInTheDocument();
    });
  });

  describe('AutoApplyPage (Controlled Outbound Queue)', () => {
    it('renders packages with verified recipient evidence and send-only mailbox status', () => {
      renderWithProviders(<AutoApplyPage />);

      expect(screen.getAllByText('Controlled Auto Apply Review Queue')[0]).toBeInTheDocument();
      expect(screen.getByText('Send-Only Mailbox Connected')).toBeInTheDocument();
      expect(screen.getByText('Immutable Package Contract')).toBeInTheDocument();
      expect(screen.getByText('Terminal Unknown Policy')).toBeInTheDocument();

      // Inspection card
      expect(screen.getByText(/Apply via email to infrastructure-hiring@stripe.com/i)).toBeInTheDocument();
      expect(screen.getByText('Alex_Morgan_Stripe_Infrastructure_v1.4.pdf')).toBeInTheDocument();
    });

    it('opens approval modal and dispatches package upon explicit human confirmation', async () => {
      vi.useFakeTimers();
      renderWithProviders(<AutoApplyPage />);

      const reviewBtn = screen.getByRole('button', { name: /Review & One-Time Approve Dispatch/i });
      fireEvent.click(reviewBtn);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Non-Reversible Action:/i)).toBeInTheDocument();

      const confirmBtn = screen.getByRole('button', { name: /Approve & Dispatch Now/i });
      fireEvent.click(confirmBtn);

      await act(async () => {
        vi.advanceTimersByTime(800);
      });

      expect(screen.getByText(/Package for Stripe approved and dispatched/i)).toBeInTheDocument();
      vi.useRealTimers();
    });
  });

  describe('SettingsPage', () => {
    it('renders profile inputs, country override, and saves preferences', () => {
      renderWithProviders(<SettingsPage />);

      expect(screen.getAllByText('Account & Preference Settings')[0]).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Alex Morgan');
      expect(screen.getByLabelText(/Primary Hiring Market/i)).toHaveValue('US');

      const submitBtn = screen.getByRole('button', { name: /Save Preferences/i });
      fireEvent.click(submitBtn);
      expect(screen.getByText(/Settings saved successfully/i)).toBeInTheDocument();
    });
  });

  describe('ToolsCataloguePage', () => {
    it('renders tool cards and filters by category and search text', () => {
      renderWithProviders(<ToolsCataloguePage />);

      expect(screen.getAllByText('RoleSharp Career Tools Directory')[0]).toBeInTheDocument();
      expect(screen.getByText('In-Memory ATS Analyzer')).toBeInTheDocument();
      expect(screen.getByText('Job-Calibrated Tailoring Studio')).toBeInTheDocument();

      // Filter by category: Check
      const checkFilterBtn = screen.getByRole('button', { name: /^Check$/i });
      fireEvent.click(checkFilterBtn);
      expect(screen.getByText('In-Memory ATS Analyzer')).toBeInTheDocument();
      expect(screen.queryByText('5-Column Application Tracker')).not.toBeInTheDocument();

      // Search box
      const searchInput = screen.getByPlaceholderText(/Search tools & workflows/i);
      fireEvent.change(searchInput, { target: { value: 'Cover Letter' } });
      expect(screen.getByText('Cover Letter Diagnostic')).toBeInTheDocument();
    });
  });
});