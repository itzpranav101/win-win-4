import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useLoop } from '../../hooks/useLoop';
import { usePerf } from '../../lib/perf';
import { useT } from '../../i18n';

const NODE_INDEXES = [0, 1, 2];
const R = 38; // ring radius as % of the box
const C = 2 * Math.PI * R;
const LAP_MS = 9000;
const wrap01 = (v: number) => ((v % 1) + 1) % 1;
const pos = (t: number) => {
  const a = (t * 360 - 90) * (Math.PI / 180);
  return [50 + R * Math.cos(a), 50 + R * Math.sin(a)];
};

/**
 * One file orbiting three roles. A single clock (t: 0→1) drives the file
 * position, the trailing arc, which node is lit and the centre caption — so
 * everything stays in sync. Runs only while visible; lite tier steps instead.
 */
export function ReviewOrbit({ className = '' }: { className?: string }) {
  const orbit = useT().team.orbit;
  const box = useRef<HTMLDivElement>(null);
  const loop = useLoop(box);
  const { lite, reduced } = usePerf();
  const t = useMotionValue(0);
  const [phase, setPhase] = useState(0);
  const [hit, setHit] = useState<number | null>(0);

  // continuous clock (full tier)
  useEffect(() => {
    if (!loop) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.max(0, now - last); // rAF timestamps can precede `last`
      last = Math.max(last, now);
      t.set(wrap01(t.get() + dt / LAP_MS));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loop, t]);

  // stepped clock (lite tier, still animated but cheap)
  useEffect(() => {
    if (!lite || reduced) return;
    const id = window.setInterval(() => t.set(((Math.round(t.get() * 3) + 1) % 3) / 3), 2400);
    return () => clearInterval(id);
  }, [lite, reduced, t]);

  useMotionValueEvent(t, 'change', (v) => {
    setPhase(Math.min(2, Math.floor(wrap01(v) * 3)));
    const near = NODE_INDEXES.findIndex((i) => Math.abs(((v - i / 3 + 1.5) % 1) - 0.5) < 0.06);
    setHit(near === -1 ? null : near);
  });

  const left = useTransform(t, (v) => `${pos(v)[0]}%`);
  const top = useTransform(t, (v) => `${pos(v)[1]}%`);
  const dash = useTransform(t, (v) => -(v * C - C * 0.22));

  return (
    <div ref={box} className={`relative mx-auto aspect-square w-full max-w-[24rem] ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <circle cx="50" cy="50" r={R} fill="none" className="stroke-ink/15 dark:stroke-white/15" strokeWidth="0.35" strokeDasharray="0.6 1.6" />
        <circle cx="50" cy="50" r={R + 7} fill="none" className="stroke-ink/[0.06] dark:stroke-white/[0.06]" strokeWidth="0.3" />
        <m.circle cx="50" cy="50" r={R} fill="none" className="stroke-brand-600 dark:stroke-brand-300" strokeWidth="0.9" strokeLinecap="round" strokeDasharray={`${C * 0.22} ${C}`} style={{ strokeDashoffset: dash }} />
      </svg>
      {/* slow counter-rotating tick ring */}
      <div className="absolute inset-[4%] animate-spin-slow rounded-full border border-dashed border-ink/[0.07] [animation-direction:reverse] dark:border-white/[0.07]" />

      {/* centre caption */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="card grid h-[34%] w-[34%] place-items-center rounded-full text-center">
          <div>
            <AnimatePresence mode="wait" initial={false}>
              <m.p key={phase} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="font-display text-lg font-light italic text-brand-800 sm:text-xl dark:text-brand-300">
                {orbit.nodes[phase].verb}
              </m.p>
            </AnimatePresence>
            <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/55 dark:text-white/50">{orbit.centre}</p>
          </div>
        </div>
      </div>

      {/* nodes */}
      {orbit.nodes.map((n, i) => {
        const [x, y] = pos(i / 3);
        const lit = hit === i;
        return (
          <div key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className={`relative mx-auto grid h-12 w-12 place-items-center rounded-2xl font-mono text-sm transition-all duration-300 sm:h-14 sm:w-14 ${lit ? 'scale-110 bg-brand-900 text-white shadow-[0_14px_30px_-10px_rgb(11_58_134/0.6)] dark:bg-brand-300 dark:text-night' : 'border border-ink/15 bg-white text-ink dark:border-white/15 dark:bg-night-card dark:text-white'}`}>
              0{i + 1}
              {lit && loop && <m.span className="absolute inset-0 rounded-2xl border-2 border-brand-700 dark:border-brand-300" initial={{ opacity: 0.7, scale: 1 }} animate={{ opacity: 0, scale: 1.6 }} transition={{ duration: 0.9 }} />}
            </span>
            <p className="mt-2 whitespace-nowrap font-display text-lg font-light leading-none">{n.label}</p>
            <p className="mt-1 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink/55 dark:text-white/50">{n.sub}</p>
          </div>
        );
      })}

      {/* the travelling file */}
      <m.div className="absolute z-10 -ml-3 -mt-3.5" style={{ left, top }}>
        <div className="h-7 w-6 rounded-[4px] border-[1.5px] border-brand-800 bg-white p-1 shadow-[0_6px_16px_-6px_rgb(11_58_134/0.6)] dark:border-brand-300 dark:bg-night">
          <div className="h-[1.5px] w-full bg-brand-800/60 dark:bg-brand-300/60" />
          <div className="mt-[3px] h-[1.5px] w-full bg-brand-800/60 dark:bg-brand-300/60" />
          <div className="mt-[3px] h-[1.5px] w-2/3 bg-brand-800/60 dark:bg-brand-300/60" />
        </div>
      </m.div>
    </div>
  );
}
