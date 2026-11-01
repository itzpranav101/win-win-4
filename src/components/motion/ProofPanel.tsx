import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLoop } from '../../hooks/useLoop';
import { usePerf } from '../../lib/perf';

/* ── The proof, as data ── */
const BANK = 124_580;
const DEPOSITS = 18_250;
const CHEQUES = 9_410;
const ADJUSTED = BANK + DEPOSITS - CHEQUES; // 133,420
const LEDGER = 133_420;

/* ── Timeline (seconds) ── */
const T = {
  bank: 0.25,
  deposits: 0.6,
  cheques: 0.95,
  rule: 1.45,
  adjusted: 1.65,
  ledger: 2.25,
  doubleRule: 3.0,
  balanced: 3.25,
  chain: [3.5, 3.85, 4.2],
  end: 4.6,
};
const COUNT = 0.75; // seconds each figure takes to count
const HOLD_MS = 7000; // how long the finished proof rests before replaying

const fmt = new Intl.NumberFormat('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
const prog = (t: number, start: number, dur = COUNT) => easeOut(clamp01((t - start) / dur));

/** Seconds since `active` became true (re-keyed by `run`); Infinity when motion is reduced. */
function useTimeline(active: boolean, run: number, still: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (still || !active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const s = (now - start) / 1000;
      setT(s);
      if (s < T.end + 0.2) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, run, still]);
  return still ? Infinity : t;
}

/**
 * Hero visual: a bank reconciliation set out as a proof. Figures count in,
 * the subtotal rule and the double rule draw, and the difference Δ is
 * computed live from the figures on screen until it settles at 0.00.
 * Plays when visible; replays while visible on the full tier.
 */
export function ProofPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const loop = useLoop(ref);
  const { reduced } = usePerf();
  const [run, setRun] = useState(0);
  const t = useTimeline(seen, run, reduced);
  const finished = t >= T.end;

  useEffect(() => {
    if (!loop || !finished) return;
    const id = window.setTimeout(() => setRun((r) => r + 1), HOLD_MS);
    return () => clearTimeout(id);
  }, [loop, finished]);

  const bank = BANK * prog(t, T.bank);
  const deposits = DEPOSITS * prog(t, T.deposits);
  const cheques = CHEQUES * prog(t, T.cheques);
  const adjusted = ADJUSTED * prog(t, T.adjusted);
  const ledger = LEDGER * prog(t, T.ledger);
  const diff = t >= T.ledger ? adjusted - ledger : null;
  const balanced = t >= T.balanced;

  const row = (start: number) => {
    const o = clamp01((t - start + 0.15) / 0.35);
    return { opacity: o, transform: `translateY(${(1 - o) * 6}px)` };
  };

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-[34rem]" aria-label={`Bank reconciliation proof: ${fmt.format(BANK)} plus ${fmt.format(DEPOSITS)} minus ${fmt.format(CHEQUES)} equals ${fmt.format(ADJUSTED)}, agreeing to the ledger balance of ${fmt.format(LEDGER)}. Difference 0.00.`}>
      <div className="relative">
      {/* stacked sheets for depth */}
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-ink/10 bg-white/50 dark:border-white/10 dark:bg-white/[0.03]" />
      <div aria-hidden className="absolute inset-0 translate-x-6 translate-y-6 rounded-2xl border border-ink/[0.06] bg-white/30 dark:border-white/[0.06] dark:bg-white/[0.02]" />

      <div aria-hidden className="relative overflow-hidden rounded-2xl border border-ink/[0.12] bg-white shadow-[0_40px_80px_-40px_rgb(11_58_134/0.45)] dark:border-white/[0.12] dark:bg-night-card">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-ink/10 bg-[#f7f8fa] px-5 py-3 dark:border-white/10 dark:bg-white/[0.03]">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink/60 dark:text-white/55">
            <span className="text-brand-800 dark:text-brand-300">Proof</span> · WP B-3
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink/60 dark:text-white/55">SGD · Period end</span>
        </div>

        <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
          <p className="font-display text-[1.6rem] font-light leading-tight tracking-[-0.02em] sm:text-[1.85rem]">Bank reconciliation</p>

          <div className="mt-4 grid grid-cols-[1.4rem_1fr_auto] items-baseline gap-x-3 font-mono text-[0.82rem] sm:text-[0.9rem]">
            <Line style={row(T.bank)} op="" label="Balance per bank statement" value={bank} />
            <Line style={row(T.deposits)} op="+" label="Deposits in transit" value={deposits} />
            <Line style={row(T.cheques)} op="−" label="Unpresented cheques" value={cheques} paren />

            {/* subtotal rule under the amounts column */}
            <span />
            <span />
            <span className="block h-px origin-right bg-ink/70 dark:bg-white/70" style={{ transform: `scaleX(${prog(t, T.rule, 0.4)})` }} />

            <Line style={row(T.adjusted)} op="=" label="Adjusted bank balance" value={adjusted} strong />
            <Line style={row(T.ledger)} op="" label="Balance per general ledger" value={ledger} />

            {/* double rule: the total is proven */}
            <span />
            <span />
            <span className="flex flex-col gap-[3px]">
              <span className="block h-px origin-right bg-ink dark:bg-white" style={{ transform: `scaleX(${prog(t, T.doubleRule, 0.35)})` }} />
              <span className="block h-px origin-right bg-ink dark:bg-white" style={{ transform: `scaleX(${prog(t, T.doubleRule + 0.12, 0.35)})` }} />
            </span>

            {/* difference, computed live from the figures above */}
            <span className="pt-2 font-display text-lg italic text-brand-800 dark:text-brand-300" style={row(T.ledger)}>Δ</span>
            <span className="pt-2 font-sans text-ink-soft dark:text-slate-300" style={row(T.ledger)}>Difference</span>
            <span className={`pt-2 text-right tabular-nums transition-colors duration-300 ${balanced ? 'font-medium text-brand-800 dark:text-brand-300' : 'text-amber-600'}`} style={row(T.ledger)}>
              {diff === null ? '' : fmt.format(Math.abs(diff) < 0.005 ? 0 : diff)}
            </span>
          </div>

          {/* result */}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4 dark:border-white/10">
            <span
              className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white transition-all duration-500 dark:bg-brand-300 dark:text-night"
              style={{ opacity: balanced ? 1 : 0, transform: `scale(${balanced ? 1 : 0.85})` }}
            >
              <Check size={12} strokeWidth={3} /> Balanced
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/50 dark:text-white/45">Adjusted − Ledger = 0</span>
          </div>

          {/* sign-off chain */}
          <div className="mt-4 grid grid-cols-3 gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] sm:text-[0.62rem]">
            {(['Prepared · AK', 'Checked · RS', 'Review-ready'] as const).map((label, i) => {
              const on = t >= T.chain[i];
              return (
                <span key={label} className="relative overflow-hidden rounded-md border border-ink/10 px-1 py-2 text-center text-ink/45 dark:border-white/10 dark:text-white/40">
                  <span className="absolute inset-0 origin-left bg-brand-900 transition-transform duration-500 ease-out dark:bg-brand-300" style={{ transform: `scaleX(${on ? 1 : 0})` }} />
                  <span className={`relative transition-colors duration-300 ${on ? 'text-white dark:text-night' : ''}`}>{label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      <figcaption className="relative mt-9 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.16em] text-ink/55 dark:text-white/50">
        <span className="text-brand-800 dark:text-brand-300">Fig. 1</span> — Every file is proven to balance before it reaches your reviewers.
      </figcaption>
    </figure>
  );
}

function Line({ op, label, value, style, strong, paren }: { op: string; label: string; value: number; style: React.CSSProperties; strong?: boolean; paren?: boolean }) {
  const v = fmt.format(value);
  return (
    <>
      <span className="py-1.5 text-center text-ink/55 dark:text-white/50" style={style}>{op}</span>
      <span className={`py-1.5 font-sans ${strong ? 'font-semibold text-ink dark:text-white' : 'text-ink-soft dark:text-slate-300'}`} style={style}>{label}</span>
      <span className={`py-1.5 text-right tabular-nums ${strong ? 'font-semibold' : ''}`} style={style}>{paren ? `(${v})` : v}</span>
    </>
  );
}
