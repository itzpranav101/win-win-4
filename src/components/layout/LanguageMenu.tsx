import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import { useI18n } from '../../i18n';
import { AVAILABLE as LANGUAGES, langInfo } from '../../i18n/languages';
import { EASE_OUT } from '../../lib/ease';

/** Header globe button + language list (menu of radio items, fully keyboard operable). */
export function LanguageMenu({ className = '' }: { className?: string }) {
  const { lang, setLang, t, pending } = useI18n();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const current = langInfo(lang);
  const hidden = LANGUAGES.length < 2;

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    const i = LANGUAGES.findIndex((l) => l.code === lang);
    requestAnimationFrame(() => items.current[i]?.focus());
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, lang]);

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = items.current.findIndex((el) => el === document.activeElement);
    const go = (n: number) => {
      e.preventDefault();
      items.current[(n + LANGUAGES.length) % LANGUAGES.length]?.focus();
    };
    if (e.key === 'ArrowDown') go(i + 1);
    else if (e.key === 'ArrowUp') go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(LANGUAGES.length - 1);
    else if (e.key === 'Tab') setOpen(false);
  };

  if (hidden) return null;
  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t.common.language}: ${current.native}`}
        className="inline-flex h-11 items-center gap-1.5 rounded-full bg-ink/[0.06] px-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink transition hover:bg-ink/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      >
        <Globe size={15} strokeWidth={1.6} className={pending ? 'animate-spin' : ''} />
        <span>{current.short}</span>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={menuId}
            role="menu"
            aria-label={t.common.language}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] max-h-[min(70vh,30rem)] w-56 origin-top-right overflow-y-auto rounded-2xl border border-ink/10 bg-white p-1.5 shadow-[0_24px_60px_-20px_rgb(10_10_10/0.35)] dark:border-white/10 dark:bg-night-card"
          >
            <p className="px-3 pb-1.5 pt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink/50 dark:text-white/45">{t.common.language}</p>
            {LANGUAGES.map((l, i) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  lang={l.tag}
                  title={l.english}
                  onClick={() => {
                    setOpen(false);
                    button.current?.focus();
                    if (!active) setLang(l.code);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[0.95rem] transition ${active ? 'bg-brand-50 text-brand-900 dark:bg-brand-500/15 dark:text-brand-200' : 'text-ink hover:bg-ink/[0.05] focus:bg-ink/[0.05] dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'}`}
                >
                  <span className="flex flex-col leading-tight">
                    <span>{l.native}</span>
                    {l.native !== l.english && <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink/45 dark:text-white/40">{l.english}</span>}
                  </span>
                  {active && <Check size={15} className="shrink-0" />}
                </button>
              );
            })}
            <p className="px-3 pb-1 pt-2 text-[0.72rem] leading-snug text-ink/50 dark:text-white/45">{t.common.legalEnglish}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
