import { m } from 'framer-motion';
import { usePerf } from '../../lib/perf';
import { EASE_OUT } from '../../lib/ease';

/** Envelope folds shut and flies off; a check draws in its place. Plays once. */
export function SentGraphic() {
  const { reduced } = usePerf();
  const t = (delay: number, duration = 0.5) => (reduced ? { duration: 0 } : { delay, duration, ease: EASE_OUT });
  return (
    <svg viewBox="0 0 140 110" className="h-28 w-36" aria-hidden>
      <m.g initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }} animate={{ x: 90, y: -60, opacity: 0, rotate: -14 }} transition={t(1.1, 0.75)}>
        <rect x="28" y="32" width="84" height="56" rx="7" className="fill-white stroke-brand-800 dark:fill-night-card dark:stroke-brand-300" strokeWidth="2.5" />
        <m.path d="M28 38 L70 66 L112 38" fill="none" className="stroke-brand-800 dark:stroke-brand-300" strokeWidth="2.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={t(0.2, 0.6)} />
      </m.g>
      {[0, 1, 2].map((i) => (
        <m.path key={i} d={`M${20 + i * 6} ${70 + i * 8} h-14`} className="stroke-brand-500" strokeWidth="2" strokeLinecap="round" initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: [0, 1, 0], pathLength: 1 }} transition={t(1.15 + i * 0.06, 0.5)} />
      ))}
      <m.circle cx="70" cy="58" r="30" className="fill-brand-50 stroke-brand-800 dark:fill-brand-500/10 dark:stroke-brand-300" strokeWidth="2.5" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={reduced ? { duration: 0 } : { delay: 1.55, type: 'spring', stiffness: 260, damping: 16 }} style={{ transformOrigin: '70px 58px' }} />
      <m.path d="M56 59 L66 69 L85 48" fill="none" className="stroke-brand-800 dark:stroke-brand-300" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={t(1.85, 0.5)} />
    </svg>
  );
}
