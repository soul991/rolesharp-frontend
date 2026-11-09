import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent<HTMLElement>) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setCurrentTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('rolesharp-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch (_) {}
    return 'dark';
  });

  const applyThemeToDOM = (next: Theme) => {
    const root = document.documentElement;
    root.dataset.theme = next;
    try {
      localStorage.setItem('rolesharp-theme', next);
    } catch (_) {}
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', next === 'light' ? '#F3F2EE' : '#061426');
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = (event?: React.MouseEvent<HTMLElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    // Check if View Transitions API is supported and user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransition = typeof (document as any).startViewTransition === 'function';

    if (!supportsViewTransition || prefersReducedMotion || !event) {
      setCurrentTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 1;

    root.style.setProperty('--theme-reveal-x', `${x}px`);
    root.style.setProperty('--theme-reveal-y', `${y}px`);
    root.style.setProperty('--theme-reveal-radius', `${radius}px`);
    root.dataset.themeReveal = next;

    const transition = (document as any).startViewTransition(() => {
      setCurrentTheme(next);
    });

    const cleanup = () => {
      delete root.dataset.themeReveal;
      root.style.removeProperty('--theme-reveal-x');
      root.style.removeProperty('--theme-reveal-y');
      root.style.removeProperty('--theme-reveal-radius');
    };

    transition.finished.then(cleanup, cleanup);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
