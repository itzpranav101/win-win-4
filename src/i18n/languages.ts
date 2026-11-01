export type LangCode = 'en' | 'ta' | 'hi' | 'te' | 'zh' | 'ms' | 'ml' | 'es' | 'fr' | 'ja';

export interface Language {
  code: LangCode;
  /** Name in its own script, as shown in the picker */
  native: string;
  /** English name, for screen readers / tooltips */
  english: string;
  /** Short code shown on the header button */
  short: string;
  /** BCP-47 tag for <html lang> */
  tag: string;
  /** 'latin' keeps the house typography; others get script-appropriate tweaks */
  script: 'latin' | 'indic' | 'cjk';
  /** Google Fonts families loaded on demand for non-Latin scripts: [sans, serif] */
  fonts?: [string, string];
}

export const LANGUAGES: Language[] = [
  { code: 'en', native: 'English', english: 'English', short: 'EN', tag: 'en', script: 'latin' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil', short: 'TA', tag: 'ta', script: 'indic', fonts: ['Noto Sans Tamil', 'Noto Serif Tamil'] },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', short: 'HI', tag: 'hi', script: 'indic', fonts: ['Noto Sans Devanagari', 'Noto Serif Devanagari'] },
  { code: 'te', native: 'తెలుగు', english: 'Telugu', short: 'TE', tag: 'te', script: 'indic', fonts: ['Noto Sans Telugu', 'Noto Serif Telugu'] },
  { code: 'zh', native: '简体中文', english: 'Chinese (Simplified)', short: '中文', tag: 'zh-Hans', script: 'cjk', fonts: ['Noto Sans SC', 'Noto Serif SC'] },
  { code: 'ms', native: 'Bahasa Melayu', english: 'Malay', short: 'MS', tag: 'ms', script: 'latin' },
  { code: 'ml', native: 'മലയാളം', english: 'Malayalam', short: 'ML', tag: 'ml', script: 'indic', fonts: ['Noto Sans Malayalam', 'Noto Serif Malayalam'] },
  { code: 'es', native: 'Español', english: 'Spanish', short: 'ES', tag: 'es', script: 'latin' },
  { code: 'fr', native: 'Français', english: 'French', short: 'FR', tag: 'fr', script: 'latin' },
  { code: 'ja', native: '日本語', english: 'Japanese', short: '日本語', tag: 'ja', script: 'cjk', fonts: ['Noto Sans JP', 'Noto Serif JP'] },
];

/** Languages with finished translations (the picker hides itself until there are two or more). */
const READY: LangCode[] = ['en', 'ta', 'hi', 'te'];
export const AVAILABLE: Language[] = LANGUAGES.filter((l) => READY.includes(l.code));

export const DEFAULT_LANG: LangCode = 'en';
export const isLang = (v: unknown): v is LangCode => AVAILABLE.some((l) => l.code === v);
export const langInfo = (code: LangCode) => LANGUAGES.find((l) => l.code === code)!;
