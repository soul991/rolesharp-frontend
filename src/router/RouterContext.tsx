import React, { createContext, useContext, useEffect, useState } from 'react';

export type RoutePath =
  | '/'
  | '/tools'
  | '/pricing'
  | '/about'
  | '/help'
  | '/login'
  | '/signup'
  | '/onboarding'
  | '/dashboard'
  | '/resumes'
  | '/resume-builder'
  | '/checker'
  | '/tailor'
  | '/jobs'
  | '/daily-matches'
  | '/tracker'
  | '/cover-letter'
  | '/cover-letter-analyzer'
  | '/linkedin'
  | '/interview'
  | '/auto-apply'
  | '/billing'
  | '/settings'
  | '/privacy'
  | '/terms';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean }) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPath = (): string => {
    if (typeof window === 'undefined') return '/';
    // Support hash routing fallback or pathname
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) return hash;
    return window.location.pathname || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        setCurrentPath(hash);
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;
    
    // Normalize path
    let normalized = path;
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }

    if (options?.replace) {
      window.history.replaceState(null, '', normalized);
    } else {
      window.history.pushState(null, '', normalized);
    }
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params: {} }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
