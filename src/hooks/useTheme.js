import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'tds-theme';

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light';
  // Bootstrap script in index.html already set data-theme before React mounted.
  return document.documentElement.getAttribute('data-theme') || 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable — toggle still works for the session
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle, setTheme };
}
