import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { journey } from '../../content/site';
import { usePerf } from '../../lib/perf';
import { EASE_OUT } from '../../lib/ease';
import { ScrollCue } from './ScrollCue';

const ROWS: [string, string][] = [
  ['Opening balance per bank', '124,580.00'],
  ['Add: Deposits in transit', '18,250.00'],
  ['Less: Unpresented cheques', '(9,410.00)'],
  ['Adjusted bank balance', '133,420.00'],
];
const OPEN_ITEM = 2;
const SOURCES = [
  { name: 'ledger_export.xlsx', Icon: FileSpreadsheet, x: -26, r: -5 },
  { name: 'bank_statement.pdf', Icon: FileText, x: 22, r: 4 },
  { name: 'payroll_inputs.csv', Icon: FileSpreadsheet, x: -6, r: -2 },
];
const N = journey.length;

/**
 * Scroll-pinned story: one working paper travels from inbox to sign-off as the
 * visitor scrolls. Stage changes are discrete (5 renders total), the progress
 * hairline is a compositor-only transform. Reduced motion gets a static list.
 */
export function FileJourney() {
  const { reduced, lite } = usePerf();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [stage, setStage] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setStage(Math.max(0, Math.min(N - 1, Math.floor(v * (N + 0.4))))));

  if (reduced) return <StaticJourney />;
  const s = journey[stage];

  return (
    <section ref={ref} aria-label="How one file moves from inbox to sign-off" className="relative h-[320vh] lg:h-[460vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="wrap grid h-full grid-rows-[auto_minmax(0,1fr)] content-center gap-5 pb-16 pt-[calc(var(--header-h)+12px)] lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-14 lg:pb-10">
          {/* ── Narrative ── */}
          <div className="lg:order-2 lg:col-span-5">
            <p className="label"><span className="label-accent">02</span> · One file, start to finish</p>

            {/* phone/tablet progress segments */}
            <div className="mt-4 flex gap-1.5 lg:hidden" aria-hidden>
              {journey.map((j, i) => (
                <span key={j.key} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= stage ? 'bg-brand-800 dark:bg-brand-300' : 'bg-ink/10 dark:bg-white/10'}`} />
              ))}
            </div>

            <div className="relative mt-4 min-h-[7.5rem] sm:min-h-[9rem] lg:mt-8 lg:min-h-[22rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={s.key} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45, ease: EASE_OUT }}>
                  <p className="flex flex-wrap items-center gap-3">
                    <span className="label"><span className="label-accent">Stage 0{stage + 1}</span> · {s.label}</span>
                    <span className={`pill !py-1 ${s.where === 'Singapore' ? '!border-brand-800 !text-brand-800 dark:!border-brand-300 dark:!text-brand-300' : ''}`}>{s.where}</span>
                  </p>
                  <h3 className="h-display mt-3 text-[2rem] leading-[1.02] sm:text-5xl lg:text-[3.5rem]">
                    {s.title[0]} <span className="accent">{s.title[1]}</span>
                  </h3>
                  <p className="lead mt-5 hidden max-w-md sm:block max-lg:[@media(max-height:740px)]:hidden">{s.text}</p>
                  <div className="mt-6 hidden flex-wrap gap-2 sm:flex">
                    {s.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Visual panel ── */}
          <div className="relative h-full min-h-0 lg:order-1 lg:col-span-7 lg:h-auto">
            <div className="card relative mx-auto flex h-full max-h-[34rem] items-center justify-center overflow-hidden px-4 py-6 sm:px-10 lg:aspect-[6/5] lg:h-auto lg:max-h-none lg:py-10">
              <div aria-hidden className="grid-bg absolute inset-0" />
              <div className="absolute left-6 top-6 z-10 hidden sm:block">
                <AnimatePresence mode="wait" initial={false}>
                  <m.span key={s.where} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="pill !bg-white dark:!bg-night-card">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.where === 'Singapore' ? 'bg-brand-800 dark:bg-brand-300' : 'bg-brand-500'}`} />
                    {s.where === 'Singapore' ? 'In review · Singapore' : 'On desk · Madurai'}
                  </m.span>
                </AnimatePresence>
              </div>
              <span className="label absolute right-6 top-7 z-10 hidden sm:block">WP B-3</span>
              <Paper stage={stage} lite={lite} />
            </div>
          </div>
        </div>

        {/* ── Bottom HUD ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 sm:bottom-6">
          <div className="wrap flex items-center justify-center lg:justify-between">
            <span className="hidden w-48 lg:block" />
            <AnimatePresence>
              {stage < N - 1 && (
                <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <ScrollCue label={stage === 0 ? 'Scroll to move the file' : 'Keep scrolling'} />
                </m.div>
              )}
            </AnimatePresence>
            <div className="hidden w-48 items-center justify-end gap-4 whitespace-nowrap lg:flex" aria-hidden>
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

/* ───────────────────────── The working paper ───────────────────────── */

function Paper({ stage, lite }: { stage: number; lite: boolean }) {
  const signedOff = stage === N - 1;
  return (
    <div className="relative z-[1] w-full max-w-[25rem] lg:max-w-[21.5rem] xl:max-w-[23rem]">
      {/* incoming source files (stage 1) */}
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
              <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink/50 dark:text-white/40">New</span>
            </m.div>
          ))}
      </AnimatePresence>

      <m.div
        animate={{ opacity: stage === 0 ? 0.35 : 1, scale: stage === 0 ? 0.95 : 1, x: signedOff && !lite ? [0, -5, 5, -2, 0] : 0 }}
        transition={{ duration: 0.5, x: { duration: 0.45, delay: 0.18 } }}
        className={`card-plain relative !rounded-2xl p-4 shadow-[0_40px_80px_-40px_rgb(11_58_134/0.4)] transition-[border-color] duration-700 sm:p-6 ${signedOff ? '!border-brand-800 dark:!border-brand-300' : ''}`}
      >
        <Callout show={stage === 0} side="left" label="Inbox" text="3 files received" />

        <div className="flex items-start justify-between gap-3 border-b border-ink/10 pb-3 dark:border-white/10">
          <div>
            <p className="label !text-[0.62rem]">WP ref. B-3 · Period end</p>
            <p className="mt-1 font-display text-xl font-light tracking-[-0.02em] sm:text-2xl">Bank reconciliation</p>
          </div>
          <StatusPill stage={stage} />
        </div>

        <div className="mt-1">
          {ROWS.map(([label, value], i) => (
            <div key={label} className={`relative flex h-10 items-center gap-2 text-[0.8rem] sm:text-[0.88rem] ${i === 3 ? 'border-t border-ink/10 font-semibold dark:border-white/10' : ''}`}>
              {i === 0 && <Callout show={stage === 1} side="right" label="Source-referenced" text="Every line cites its document" />}
              {i === 1 && <Callout show={stage === 2} side="right" label="Tick marks" text="Agreed to evidence, 4 / 4" />}
              {i === OPEN_ITEM && <Callout show={stage === 3} side="left" label="Open item" text="Cheque #4471, 60+ days" />}

              <span className="relative min-w-0 flex-1 truncate text-ink-soft dark:text-slate-300">
                {i === OPEN_ITEM && (
                  <m.span className="absolute -inset-x-1.5 inset-y-0 origin-left rounded bg-amber-300/45 dark:bg-amber-400/20" initial={false} animate={{ scaleX: stage >= 3 ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE_OUT }} />
                )}
                <m.span className={`relative ${i === 3 ? 'text-ink dark:text-white' : ''}`} animate={{ opacity: stage >= 1 ? 1 : 0.25 }} transition={{ delay: stage >= 1 ? i * 0.12 : 0 }}>
                  {label}
                </m.span>
              </span>
              <span className="shrink-0 text-right font-mono tabular-nums">
                {stage >= 1 ? <Figure value={value} delay={i * 120} animate={!lite} /> : <span className="inline-block h-2.5 w-16 rounded bg-ink/10 align-middle dark:bg-white/10" />}
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
              <div className="mt-2 rounded-xl border border-amber-500/30 bg-amber-50 px-3 py-2.5 text-[0.75rem] leading-relaxed text-amber-950 sm:text-[0.82rem] dark:bg-amber-500/10 dark:text-amber-100">
                <b>Open item 1:</b> cheque #4471 unpresented 60+ days — please confirm status with client.
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <div className="relative mt-3 grid grid-cols-3 gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] sm:text-[0.66rem]">
          <Callout show={signedOff} side="left" label="Sign-off" text="Singapore professional" />
          {([['Prepared', 'AK'], ['Checked', 'RS'], ['Review', 'SG']] as const).map(([t, who], i) => {
            const on = (i === 0 && stage >= 1) || (i === 1 && stage >= 2) || (i === 2 && signedOff);
            return (
              <span key={t} className="relative overflow-hidden rounded-lg bg-ink/[0.04] px-1 py-2 text-center text-ink/45 dark:bg-white/5 dark:text-white/40">
                <m.span aria-hidden className="absolute inset-0 origin-left bg-brand-900 dark:bg-brand-300" initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE_OUT }} />
                <span className={`relative transition-colors duration-300 ${on ? 'text-white dark:text-night' : ''}`}>{t}<span className="hidden sm:inline"> · {who}</span></span>
              </span>
            );
          })}
        </div>

        {/* Signed-off stamp */}
        <AnimatePresence>
          {signedOff && (
            <m.div
              initial={{ opacity: 0, scale: 2.4, rotate: -24 }}
              animate={{ opacity: 1, scale: 1, rotate: -11 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 17 }}
              className="pointer-events-none absolute bottom-[3.6rem] right-3 sm:bottom-16 sm:right-5"
            >
              <span className="relative block rounded-lg border-[2.5px] border-brand-800 bg-white/90 px-3 py-1.5 dark:bg-night-card/90 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-brand-800 sm:text-sm dark:border-brand-300 dark:text-brand-300">
                Signed off
                {!lite && <m.span className="absolute -inset-1 rounded-xl border-2 border-brand-800/60 dark:border-brand-300/60" initial={{ opacity: 0.8, scale: 1 }} animate={{ opacity: 0, scale: 1.5 }} transition={{ duration: 0.8, delay: 0.15 }} />}
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}

/** Leader-line annotation outside the paper edge (desktop only). */
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
          className={`pointer-events-none absolute top-1/2 z-30 hidden -translate-y-1/2 items-center font-sans normal-case tracking-normal lg:flex ${right ? 'left-[calc(100%+0.75rem)] flex-row' : 'right-[calc(100%+0.75rem)] flex-row-reverse'}`}
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

function StatusPill({ stage }: { stage: number }) {
  const states: { t: string; c: string }[] = [
    { t: 'Inbox', c: '' },
    { t: 'Preparing', c: '!border-brand-500/40 !text-brand-700 dark:!text-brand-300' },
    { t: 'Checking', c: '!border-brand-500/40 !text-brand-700 dark:!text-brand-300' },
    { t: '1 open item', c: '!border-amber-500/40 !text-amber-700 dark:!text-amber-300' },
    { t: 'Signed off', c: '!border-brand-800 !bg-brand-900 !text-white dark:!border-brand-300 dark:!bg-brand-300 dark:!text-night' },
  ];
  const s = states[stage];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.span key={stage} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.25 }} className={`pill shrink-0 !px-2.5 !py-1 !text-[0.6rem] ${s.c}`}>
        {s.t}
      </m.span>
    </AnimatePresence>
  );
}

function StaticJourney(): ReactNode {
  return (
    <section className="section">
      <div className="wrap">
        <p className="label"><span className="label-accent">02</span> · One file, start to finish</p>
        <h2 className="h-section mt-4">Follow a reconciliation <span className="accent">to sign-off.</span></h2>
        <ol className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-5 dark:border-white/15">
          {journey.map((s, i) => (
            <li key={s.key} className="border-b border-ink/10 py-6 pr-6 dark:border-white/10 lg:border-b-0">
              <p className="label"><span className="label-accent">0{i + 1}</span> · {s.where}</p>
              <p className="mt-2 font-display text-2xl font-light">{s.label}</p>
              <p className="muted mt-2 text-[0.95rem]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
