import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { AnimatedStepper } from '../components/common/AnimatedStepper';
import { ThemeProvider } from '../context/ThemeContext';
import { RouterProvider } from '../router/RouterContext';
import { AuthProvider } from '../context/AuthContext';

describe('Auth & Onboarding Flow (Task 2)', () => {
  it('renders LoginPage with demo credentials autofill and validation', async () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Sign in to RoleSharp/i)).toBeInTheDocument();
    expect(screen.getByText(/AUTHENTICATED WORKSPACE/i)).toBeInTheDocument();

    // Test demo autofill
    const demoButton = screen.getByText(/Autofill Alex Morgan/i);
    fireEvent.click(demoButton);

    const emailInput = screen.getByPlaceholderText(/name@company.com/i) as HTMLInputElement;
    expect(emailInput.value).toBe('alex.morgan@lattice.io');
  });

  it('validates legal terms and privacy policy checkboxes on SignupPage', async () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <SignupPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Start Your Free Workspace/i)).toBeInTheDocument();
    expect(screen.getByText(/RoleSharp Terms of Service/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Create Account & Start Onboarding/i });
    fireEvent.click(submitBtn);

    // Should display validation error
    await waitFor(() => {
      expect(
        screen.getByText(/Please provide an email address and password\./i)
      ).toBeInTheDocument();
    });
  });

  it('renders AnimatedStepper and computes progression accurately', () => {
    const steps = [
      { id: '1', title: 'Step 1' },
      { id: '2', title: 'Step 2' },
      { id: '3', title: 'Step 3' },
    ];

    const { rerender } = render(
      <AnimatedStepper steps={steps} currentStepIndex={0} />
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();

    rerender(<AnimatedStepper steps={steps} currentStepIndex={1} />);
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('steps through OnboardingPage wizard and activates checklist credit', async () => {
    render(
      <ThemeProvider>
        <RouterProvider>
          <AuthProvider>
            <OnboardingPage />
          </AuthProvider>
        </RouterProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Configure Your Career Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal & Professional Identity/i)).toBeInTheDocument();

    // Fill identity
    const nameInput = screen.getByPlaceholderText(/e\.g\. Alex Morgan, PMP/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    // Click Continue
    const continueBtn = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueBtn);

    // Step 1: Target Role
    await waitFor(() => {
      expect(screen.getByText(/Target Role & Seniority Tier/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // Step 2: Country
    await waitFor(() => {
      expect(screen.getByText(/Regional Hiring Conventions/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // Step 3: Preferences
    await waitFor(() => {
      expect(screen.getByText(/Work Environment & Logistics/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // Step 4: Resume
    await waitFor(() => {
      expect(screen.getByText(/Establish Your Master Evidence Base/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // Step 5: Activation
    await waitFor(() => {
      expect(screen.getByText(/Review & Activate Studio/i)).toBeInTheDocument();
      expect(screen.getByText(/One-Time Onboarding Bonus: \+5 Credits/i)).toBeInTheDocument();
    });

    const activateBtn = screen.getByRole('button', { name: /Activate Studio & Claim Credits/i });
    expect(activateBtn).toBeInTheDocument();
  });
});
