import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { en } from './en';
import type { Dict } from './en';
import { DEFAULT_LANG, isLang, langInfo } from './languages';
import type { LangCode } from './languages';

const STORAGE_KEY = 'ww-lang';

// Each language is its own small chunk, downloaded only when chosen.
const loaders: Record<Exclude<LangCode, 'en'>, () => Promise<{ default: Dict }>> = {
  ta: () => import('./locales/ta'),
  hi: () => import('./locales/hi'),
  te: () => import('./locales/te'),
  zh: () => import('./locales/zh'),
  ms: () => import('./locales/ms'),
  ml: () => import('./locales/ml'),
  es: () => import('./locales/es'),
  fr: () => import('./locales/fr'),
  ja: () => import('./locales/ja'),
};

export async function loadDict(code: LangCode): Promise<Dict> {
  if (code === 'en') return en;
  return (await loaders[code]()).default;
}

/** Saved choice (or ?lang=xx), else English. */
export function initialLang(): LangCode {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_LANG;
}

/** Set <html lang>, the script hint used by CSS, and load script fonts once. */
function applyDocument(code: LangCode) {
  const info = langInfo(code);
  const root = document.documentElement;
  root.lang = info.tag;
  root.dataset.script = info.script;
  root.dataset.lang = code;
  if (info.fonts && !document.getElementById(`font-${code}`)) {
    const [sans, serif] = info.fonts.map((f) => f.replace(/ /g, '+'));
    const link = document.createElement('link');
    link.id = `font-${code}`;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${sans}:wght@400;500;600&family=${serif}:wght@300;400;500&display=swap`;
    document.head.appendChild(link);
  }
}

interface I18n {
  lang: LangCode;
  t: Dict;
  setLang: (code: LangCode) => void;
  pending: boolean;
}

const I18nContext = createContext<I18n>({ lang: 'en', t: en, setLang: () => {}, pending: false });

export function I18nProvider({ initial, dict, children }: { initial: LangCode; dict: Dict; children: ReactNode }) {
  const [state, setState] = useState({ lang: initial, t: dict });
  const [pending, setPending] = useState(false);

  useEffect(() => applyDocument(state.lang), [state.lang]);

  const setLang = useCallback((code: LangCode) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    setPending(true);
    loadDict(code)
      .then((t) => setState({ lang: code, t }))
      .finally(() => setPending(false));
  }, []);

  return <I18nContext.Provider value={{ ...state, setLang, pending }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
export const useT = () => useContext(I18nContext).t;
