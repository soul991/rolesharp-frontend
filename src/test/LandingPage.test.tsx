import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LandingPage } from '../pages/LandingPage';
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
});
