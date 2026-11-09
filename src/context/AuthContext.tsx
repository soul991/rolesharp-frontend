import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserSession } from '../api/types';

interface AuthContextType {
  session: UserSession;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, termsAccepted: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateSession: (partial: Partial<UserSession>) => void;
}

const defaultSession: UserSession = {
  authenticated: false,
  features: {
    ats_analyzer: true,
    tailoring: true,
    cover_letter: true,
    linkedin_optimizer: true,
    interview_prep: true,
    auto_apply: true,
  },
  usage: {
    tailoredResumesUsed: 0,
    coverLettersUsed: 0,
    atsChecksUsed: 0,
  },
  credits: 5,
  legalVersions: {
    terms: '2026-v2',
    privacy: '2026-v2',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const stored = localStorage.getItem('rolesharp-auth-session');
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return defaultSession;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('rolesharp-auth-session', JSON.stringify(session));
    } catch (_) {}
  }, [session]);

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      // Simulate/call /api/auth/login
      const mockUserSession: UserSession = {
        authenticated: true,
        user: {
          id: 'usr_verified_2026',
          email,
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          targetRole: 'Senior Product Manager',
          targetCountry: 'United States',
        },
        plans: {
          planId: 'pro',
          name: 'Professional Career Suite',
          interval: 'monthly',
          status: 'active',
          renewsAt: '2026-12-09',
          allowances: {
            tailoredResumes: 10,
            coverLetters: 25,
            atsChecks: 50,
          },
        },
        features: {
          ats_analyzer: true,
          tailoring: true,
          cover_letter: true,
          linkedin_optimizer: true,
          interview_prep: true,
          auto_apply: true,
        },
        usage: {
          tailoredResumesUsed: 2,
          coverLettersUsed: 4,
          atsChecksUsed: 7,
        },
        credits: 24,
        legalVersions: {
          terms: '2026-v2',
          privacy: '2026-v2',
        },
      };
      setSession(mockUserSession);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    _pass: string,
    termsAccepted: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    if (!termsAccepted) {
      return { success: false, error: 'You must accept the terms of service and privacy policy to continue.' };
    }
    setLoading(true);
    try {
      const mockNewUser: UserSession = {
        authenticated: true,
        user: {
          id: 'usr_new_' + Math.random().toString(36).substring(2, 9),
          email,
          name: email.split('@')[0],
        },
        plans: {
          planId: 'free',
          name: 'Starter Plan',
          interval: 'monthly',
          status: 'active',
          allowances: {
            tailoredResumes: 2,
            coverLetters: 3,
            atsChecks: 5,
          },
        },
        features: {
          ats_analyzer: true,
          tailoring: true,
          cover_letter: true,
          linkedin_optimizer: true,
          interview_prep: true,
          auto_apply: true,
        },
        usage: {
          tailoredResumesUsed: 0,
          coverLettersUsed: 0,
          atsChecksUsed: 0,
        },
        credits: 5,
        legalVersions: {
          terms: '2026-v2',
          privacy: '2026-v2',
        },
      };
      setSession(mockNewUser);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setSession(defaultSession);
    try {
      localStorage.removeItem('rolesharp-auth-session');
    } catch (_) {}
  };

  const updateSession = (partial: Partial<UserSession>) => {
    setSession((prev) => ({ ...prev, ...partial }));
  };

  return (
    <AuthContext.Provider value={{ session, loading, login, signup, logout, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
