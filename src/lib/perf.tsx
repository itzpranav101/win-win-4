import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Performance tiers
 * ─────────────────
 * full — every effect: idle loops, springs, pointer tilt, blur.
 * lite — same content and the same scroll-driven stories, but no idle loops,
 *        no springs/tilt and no backdrop blur. Chosen automatically for weak
 *        devices, Save-Data, reduced-motion, or a measured low frame rate.
 *
 * Override for testing with ?perf=lite or ?perf=full.
 */
export type PerfTier = 'full' | 'lite';
interface Perf {
  tier: PerfTier;
  lite: boolean;
  reduced: boolean;
}

const KEY = 'ww-perf';
const PerfContext = createContext<Perf>({ tier: 'full', lite: false, reduced: false });

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };

function initial(): { tier: PerfTier; reduced: boolean; settled: boolean } {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const forced = new URLSearchParams(window.location.search).get('perf');
  if (forced === 'lite' || forced === 'full') return { tier: forced, reduced, settled: true };
  try {
    const cached = sessionStorage.getItem(KEY);
    if (cached === 'lite' || cached === 'full') return { tier: cached, reduced, settled: true };
  } catch {
    /* storage unavailable */
  }
  const nav = navigator as Nav;
  const weak =
    reduced ||
    !!nav.connection?.saveData ||
    /2g$/.test(nav.connection?.effectiveType ?? '') ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2);
  return { tier: weak ? 'lite' : 'full', reduced, settled: weak };
}

/**
 * Tiny deterministic CPU benchmark (median of 3 after a warm-up). ~1.7ms on a
 * modern laptop; low-end phones land around 7–14ms. Above 6ms → lite.
 */
function cpuIsSlow() {
  const run = () => {
    const t0 = performance.now();
    let x = 0;
    for (let i = 1; i < 250_000; i++) x += Math.sqrt(i) / i;
    return performance.now() - t0 + (x < 0 ? 1 : 0); // use x so the loop isn't optimised away
  };
  run();
  const times = [run(), run(), run()].sort((a, b) => a - b);
  return times[1] > 6;
}

/** Samples ~60 frames while the intro animations play; a slow median frame time means lite. */
function probeFrameRate(onSlow: () => void, onOk: () => void) {
  let raf = 0;
  let last = 0;
  const deltas: number[] = [];
  const tick = (t: number) => {
    if (document.visibilityState !== 'visible') return; // hidden tabs throttle rAF — don't judge
    if (last) deltas.push(t - last);
    last = t;
    if (deltas.length < 60) {
      raf = requestAnimationFrame(tick);
      return;
    }
    const sorted = [...deltas].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    if (median > 26) onSlow(); // below ~38fps
    else onOk();
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

export function PerfProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initial);

  useEffect(() => {
    document.documentElement.dataset.perf = state.tier;
  }, [state.tier]);

  useEffect(() => {
    if (state.settled) return;
    const save = (tier: PerfTier) => {
      try {
        sessionStorage.setItem(KEY, tier);
      } catch {
        /* ignore */
      }
      setState((s) => ({ ...s, tier, settled: true }));
    };
    // 1) CPU micro-benchmark at idle time, 2) if that passes, watch real frame times.
    const w = window as IdleWindow;
    let stopProbe: (() => void) | undefined;
    const run = () => {
      if (cpuIsSlow()) return save('lite');
      stopProbe = probeFrameRate(
        () => save('lite'),
        () => save('full'),
      );
    };
    const idle = w.requestIdleCallback ? w.requestIdleCallback(run, { timeout: 2500 }) : window.setTimeout(run, 1200);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else clearTimeout(idle);
      stopProbe?.();
    };
  }, [state.settled]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = (e: MediaQueryListEvent) => setState((s) => ({ ...s, reduced: e.matches, tier: e.matches ? 'lite' : s.tier }));
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return <PerfContext.Provider value={{ tier: state.tier, lite: state.tier === 'lite', reduced: state.reduced }}>{children}</PerfContext.Provider>;
}

export const usePerf = () => useContext(PerfContext);
