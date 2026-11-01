import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { useLoop } from '../../hooks/useLoop';
import { EASE_IN_OUT } from '../../lib/ease';
import { useT } from '../../i18n';

/** Mono pill — "KEEP SCROLLING ⌄" — telling visitors a section animates as they scroll. */
export function ScrollCue({ label, className = '' }: { label?: string; className?: string }) {
  const t = useT();
  const ref = useRef<HTMLSpanElement>(null);
  const loop = useLoop(ref);
  return (
    <span ref={ref} className={`pill !bg-white !py-2.5 !text-ink shadow-[0_8px_24px_-12px_rgb(10_10_10/0.2)] dark:!bg-night-card dark:!text-white ${className}`}>
      {label ?? t.common.keepScrolling}
      <m.svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} animate={loop ? { y: [0, 3, 0] } : undefined} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} aria-hidden>
        <path d="M6 9l6 6 6-6" />
      </m.svg>
    </span>
  );
}

/** Vertical "SCROLL TO LEARN MORE" rail on the right edge of heroes (desktop). */
export function ScrollRail({ label, className = 'bottom-10' }: { label?: string; className?: string }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const loop = useLoop(ref);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 220], [1, 0]); // fades away once the visitor starts scrolling
  return (
    <m.div ref={ref} style={{ opacity }} aria-hidden className={`pointer-events-none absolute right-6 hidden flex-col ${className} items-center gap-4 lg:flex xl:right-10`}>
      <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-ink/60 [writing-mode:vertical-rl] dark:text-white/50">{label ?? t.common.scrollToLearn}</span>
      <span className="relative h-16 w-px overflow-hidden bg-ink/15 dark:bg-white/15">
        <m.span className="absolute inset-x-0 top-0 h-6 bg-ink dark:bg-white" initial={{ y: '-100%' }} animate={loop ? { y: ['-100%', '280%'] } : undefined} transition={{ duration: 1.8, repeat: Infinity, ease: EASE_IN_OUT }} />
      </span>
    </m.div>
  );
}

/**
 * Accounting double rule — the way totals are underlined in a set of accounts.
 * Two hairlines draw in from the left (pure CSS, so it never waits on JS).
 */
export function DoubleRule({ className = '', delay = 900 }: { className?: string; delay?: number }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-x-0 flex flex-col gap-[0.06em] ${className}`}>
      <span className="block h-[0.035em] min-h-[2px] origin-left animate-rule-x bg-current" style={{ animationDelay: `${delay}ms` }} />
      <span className="block h-[0.035em] min-h-[2px] origin-left animate-rule-x bg-current" style={{ animationDelay: `${delay + 160}ms` }} />
    </span>
  );
}
