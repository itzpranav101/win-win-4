import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const read = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('ww-theme', next);
      } catch {
        /* storage unavailable — theme still applies for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
