import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { BadgeCheck, CircleDot, FilePen, FileSpreadsheet, FileText, Inbox, ScanSearch } from 'lucide-react';
import { useT } from '../../i18n';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import { usePerf } from '../../lib/perf';
import { EASE_OUT } from '../../lib/ease';
import { Reveal } from '../ui/Reveal';
import { ScrollCue } from './ScrollCue';

const VALUES = ['124,580.00', '18,250.00', '(9,410.00)', '133,420.00'];
const OPEN_ITEM = 2;
const SOURCES = [
  { name: 'ledger_export.xlsx', Icon: FileSpreadsheet, x: -26, r: -5 },
  { name: 'bank_statement.pdf', Icon: FileText, x: 22, r: 4 },
  { name: 'payroll_inputs.csv', Icon: FileSpreadsheet, x: -6, r: -2 },
];
const ICONS = [Inbox, FilePen, ScanSearch, CircleDot, BadgeCheck];
const N = 5;
const inSingapore = (i: number) => i === N - 1;

/**
 * "One file, start to finish".
 * Desktop: a pinned, scroll-scrubbed story (five discrete stages).
 * Phones/tablets and reduced motion: a calm, unpinned five-step timeline.
 */
export function FileJourney() {
  const isDesktop = useIsDesktop();
  const { reduced } = usePerf();
  return isDesktop && !reduced ? <PinnedJourney /> : <StepTimeline />;
}

/* ───────────────────────── Phones / tablets ───────────────────────── */

function StepTimeline() {
  const t = useT();
  const j = t.home.journey;
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <p className="label"><span className="label-accent">02</span> · {j.label}</p>
        </Reveal>
        <ol className="relative mt-8 max-w-xl">
          <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px bg-ink/15 dark:bg-white/15" />
          {j.stages.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal as="li" key={i} delay={i * 0.04} className="relative flex gap-4 pb-7 last:pb-0">
                <span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${inSingapore(i) ? 'bg-brand-900 text-white dark:bg-brand-300 dark:text-night' : 'border border-ink/15 bg-white text-brand-800 dark:border-white/15 dark:bg-night dark:text-brand-300'}`}>
                  <Icon size={17} strokeWidth={1.6} />
                </span>
                <div className="pt-1">
                  <p className="label">
                    <span className="label-accent">0{i + 1}</span> · {s.label} · {inSingapore(i) ? t.common.singapore : t.common.madurai}
                  </p>
                  <h3 className="h-display mt-1.5 text-[1.45rem] leading-tight">
                    {s.title[0]} <span className="accent">{s.title[1]}</span>
                  </h3>
                  <p className="muted mt-1 text-[0.95rem]">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── Desktop: pinned story ───────────────────────── */

function PinnedJourney() {
  const t = useT();
  const j = t.home.journey;
  const { lite } = usePerf();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [stage, setStage] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setStage(Math.max(0, Math.min(N - 1, Math.floor(v * (N + 0.4))))));

  const s = j.stages[stage];
  const sg = inSingapore(stage);

  return (
    <section ref={ref} aria-label={j.label} className="relative h-[460vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="wrap grid h-full grid-cols-12 items-center gap-14 pb-10 pt-[var(--header-h)]">
          <div className="order-2 col-span-5">
            <p className="label"><span className="label-accent">02</span> · {j.label}</p>
            <div className="relative mt-8 min-h-[20rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={stage} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45, ease: EASE_OUT }}>
                  <p className="flex flex-wrap items-center gap-3">
                    <span className="label"><span className="label-accent">{j.stage} 0{stage + 1}</span> · {s.label}</span>
                    <span className={`pill !py-1 ${sg ? '!border-brand-800 !text-brand-800 dark:!border-brand-300 dark:!text-brand-300' : ''}`}>{sg ? t.common.singapore : t.common.madurai}</span>
                  </p>
                  <h3 className="h-display mt-3 text-[3.4rem] leading-[1.02]">
                    {s.title[0]} <span className="accent">{s.title[1]}</span>
                  </h3>
                  <p className="lead mt-5 max-w-md">{s.text}</p>
                </m.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative order-1 col-span-7">
            <div className="card relative flex aspect-[6/5] items-center justify-center overflow-hidden px-10 py-10">
              <div aria-hidden className="grid-bg absolute inset-0" />
              <div className="absolute left-6 top-6 z-10">
                <AnimatePresence mode="wait" initial={false}>
                  <m.span key={String(sg)} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="pill !bg-white dark:!bg-night-card">
                    <span className={`h-1.5 w-1.5 rounded-full ${sg ? 'bg-brand-800 dark:bg-brand-300' : 'bg-brand-500'}`} />
                    {sg ? j.inReview : j.onDesk}
                  </m.span>
                </AnimatePresence>
              </div>
              <span className="label absolute right-6 top-7 z-10">WP B-3</span>
              <Paper stage={stage} lite={lite} />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6">
          <div className="wrap flex items-center justify-between">
            <span className="w-48" />
            <AnimatePresence>
              {stage < N - 1 && (
                <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <ScrollCue label={stage === 0 ? j.scrollStart : t.common.keepScrolling} />
                </m.div>
              )}
            </AnimatePresence>
            <div className="flex w-48 items-center justify-end gap-4 whitespace-nowrap" aria-hidden>
              <span className="font-mono text-xs tabular-nums text-ink/70 dark:text-white/60">0{stage + 1} / 0{N}</span>
              <span className="relative h-px w-24 bg-ink/15 dark:bg-white/15">
                <m.span style={{ scaleX: lite ? scrollYProgress : smooth }} className="absolute inset-0 origin-left bg-ink dark:bg-white" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Paper({ stage, lite }: { stage: number; lite: boolean }) {
  const t = useT();
  const p = t.home.journey.paper;
  const c = t.home.journey.callouts;
  const signedOff = stage === N - 1;
  return (
    <div className="relative z-[1] w-full max-w-[21.5rem] xl:max-w-[23rem]">
      <AnimatePresence>
        {stage === 0 &&
          SOURCES.map((f, i) => (
            <m.div
              key={f.name}
              initial={{ opacity: 0, x: f.x * 4, y: -160 - i * 40, rotate: f.r * 4 }}
              animate={{ opacity: 1, x: f.x, y: 26 + i * 52, rotate: f.r }}
              exit={{ opacity: 0, y: 130, scale: 0.7, rotate: 0, transition: { duration: 0.45, delay: i * 0.05, ease: EASE_OUT } }}
              transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.1 + i * 0.12 }}
              className="card-plain absolute inset-x-3 z-20 flex items-center gap-3 !rounded-2xl px-4 py-3 shadow-[0_18px_40px_-18px_rgb(10_10_10/0.3)]"
            >
              <f.Icon size={18} strokeWidth={1.6} className="text-brand-700 dark:text-brand-300" />
              <span className="font-mono text-[0.78rem]">{f.name}</span>
              <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink/50 dark:text-white/40">{t.home.journey.fresh}</span>
            </m.div>
          ))}
      </AnimatePresence>

      <m.div
        animate={{ opacity: stage === 0 ? 0.35 : 1, scale: stage === 0 ? 0.95 : 1, x: signedOff && !lite ? [0, -5, 5, -2, 0] : 0 }}
        transition={{ duration: 0.5, x: { duration: 0.45, delay: 0.18 } }}
        className={`card-plain relative !rounded-2xl p-6 shadow-[0_40px_80px_-40px_rgb(11_58_134/0.4)] transition-[border-color] duration-700 ${signedOff ? '!border-brand-800 dark:!border-brand-300' : ''}`}
      >
        <Callout show={stage === 0} side="left" label={c[0].label} text={c[0].text} />

        <div className="flex items-start justify-between gap-3 border-b border-ink/10 pb-3 dark:border-white/10">
          <div>
            <p className="label !text-[0.62rem]">{p.ref}</p>
            <p className="mt-1 font-display text-2xl font-light tracking-[-0.02em]">{p.title}</p>
          </div>
          <StatusPill stage={stage} label={p.status[stage]} />
        </div>

        <div className="mt-1">
          {p.rows.map((label, i) => (
            <div key={i} className={`relative flex h-10 items-center gap-2 text-[0.88rem] ${i === 3 ? 'border-t border-ink/10 font-semibold dark:border-white/10' : ''}`}>
              {i === 0 && <Callout show={stage === 1} side="right" label={c[1].label} text={c[1].text} />}
              {i === 1 && <Callout show={stage === 2} side="right" label={c[2].label} text={c[2].text} />}
              {i === OPEN_ITEM && <Callout show={stage === 3} side="left" label={c[3].label} text={c[3].text} />}
              <span className="relative min-w-0 flex-1 truncate text-ink-soft dark:text-slate-300">
                {i === OPEN_ITEM && (
                  <m.span className="absolute -inset-x-1.5 inset-y-0 origin-left rounded bg-amber-300/45 dark:bg-amber-400/20" initial={false} animate={{ scaleX: stage >= 3 ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE_OUT }} />
                )}
                <m.span className={`relative ${i === 3 ? 'text-ink dark:text-white' : ''}`} animate={{ opacity: stage >= 1 ? 1 : 0.25 }} transition={{ delay: stage >= 1 ? i * 0.12 : 0 }}>
                  {label}
                </m.span>
              </span>
              <span className="shrink-0 text-right font-mono tabular-nums">
                {stage >= 1 ? <Figure value={VALUES[i]} delay={i * 120} animate={!lite} /> : <span className="inline-block h-2.5 w-16 rounded bg-ink/10 align-middle dark:bg-white/10" />}
              </span>
              <span className="flex w-6 shrink-0 justify-end">
                {stage >= 2 && i !== OPEN_ITEM && <DrawCheck delay={0.12 + i * 0.16} />}
                {stage >= 3 && i === OPEN_ITEM && <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 12 }} className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {stage >= 3 && (
            <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: EASE_OUT }} className="overflow-hidden">
              <div className="mt-2 rounded-xl border border-amber-500/30 bg-amber-50 px-3 py-2.5 text-[0.82rem] leading-relaxed text-amber-950 dark:bg-amber-500/10 dark:text-amber-100">
                <b>{p.noteLabel}</b> {p.note}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <div className="relative mt-3 grid grid-cols-3 gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.08em]">
          <Callout show={signedOff} side="left" label={c[4].label} text={c[4].text} />
          {p.sign.map((label, i) => {
            const on = (i === 0 && stage >= 1) || (i === 1 && stage >= 2) || (i === 2 && signedOff);
            return (
              <span key={i} className="relative overflow-hidden rounded-lg bg-ink/[0.04] px-1 py-2 text-center text-ink/45 dark:bg-white/5 dark:text-white/40">
                <m.span aria-hidden className="absolute inset-0 origin-left bg-brand-900 dark:bg-brand-300" initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE_OUT }} />
                <span className={`relative transition-colors duration-300 ${on ? 'text-white dark:text-night' : ''}`}>{label}</span>
              </span>
            );
          })}
        </div>

        <AnimatePresence>
          {signedOff && (
            <m.div
              initial={{ opacity: 0, scale: 2.4, rotate: -24 }}
              animate={{ opacity: 1, scale: 1, rotate: -11 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 17 }}
              className="pointer-events-none absolute bottom-16 right-5"
            >
              <span className="relative block rounded-lg border-[2.5px] border-brand-800 bg-white/90 px-3 py-1.5 font-mono text-sm uppercase tracking-[0.18em] text-brand-800 dark:border-brand-300 dark:bg-night-card/90 dark:text-brand-300">
                {p.stamp}
                {!lite && <m.span className="absolute -inset-1 rounded-xl border-2 border-brand-800/60 dark:border-brand-300/60" initial={{ opacity: 0.8, scale: 1 }} animate={{ opacity: 0, scale: 1.5 }} transition={{ duration: 0.8, delay: 0.15 }} />}
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}

/** Leader-line annotation outside the paper edge. */
function Callout({ show, side, label, text }: { show: boolean; side: 'left' | 'right'; label: string; text: string }) {
  const right = side === 'right';
  return (
    <AnimatePresence>
      {show && (
        <m.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`pointer-events-none absolute top-1/2 z-30 flex -translate-y-1/2 items-center font-sans normal-case tracking-normal ${right ? 'left-[calc(100%+0.75rem)] flex-row' : 'right-[calc(100%+0.75rem)] flex-row-reverse'}`}
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-brand-800 dark:bg-brand-300" />
          <m.span className={`h-px w-5 bg-brand-800/60 dark:bg-brand-300/60 ${right ? 'origin-left' : 'origin-right'}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
          <m.span initial={{ opacity: 0, x: right ? -6 : 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.4 }} className={`w-[8.5rem] rounded-xl bg-white/95 px-3 py-2 shadow-[0_10px_30px_-14px_rgb(10_10_10/0.25)] dark:bg-night-card/90 ${right ? 'text-left' : 'text-right'}`}>
            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand-800 dark:text-brand-300">{label}</span>
            <span className="mt-0.5 block font-display text-[0.92rem] font-light leading-snug">{text}</span>
          </m.span>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** Figure that "types in" with scrambling digits before settling. */
function Figure({ value, delay, animate }: { value: string; delay: number; animate: boolean }) {
  const [text, setText] = useState(animate ? value.replace(/\d/g, '0') : value);
  useEffect(() => {
    if (!animate) return;
    let ticks = 0;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        ticks += 1;
        if (ticks > 12) {
          setText(value);
          clearInterval(id);
          return;
        }
        setText(value.replace(/\d/g, () => String(Math.floor(Math.random() * 10))));
      }, 45);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [value, delay, animate]);
  return <span>{text}</span>;
}

function DrawCheck({ delay = 0 }: { delay?: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-700 dark:text-brand-300" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <m.path d="M5 12.5l4.5 4.5L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay, ease: 'easeOut' }} />
    </svg>
  );
}

const STATUS_STYLE = [
  '',
  '!border-brand-500/40 !text-brand-700 dark:!text-brand-300',
  '!border-brand-500/40 !text-brand-700 dark:!text-brand-300',
  '!border-amber-500/40 !text-amber-700 dark:!text-amber-300',
  '!border-brand-800 !bg-brand-900 !text-white dark:!border-brand-300 dark:!bg-brand-300 dark:!text-night',
];

function StatusPill({ stage, label }: { stage: number; label: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.span key={stage} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.25 }} className={`pill shrink-0 !px-2.5 !py-1 !text-[0.6rem] ${STATUS_STYLE[stage]}`}>
        {label}
      </m.span>
    </AnimatePresence>
  );
}
