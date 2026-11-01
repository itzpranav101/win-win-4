import { useRef } from 'react';
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { usePerf } from '../../lib/perf';

const MILESTONES = [
  { t: 'Learn the fundamentals', s: 'Structured training on SFRS, CPF, GST and IRAS work' },
  { t: 'Own recurring files', s: 'Prepare bookkeeping, payroll and schedules end to end' },
  { t: "Check others' work", s: 'Become the second pair of eyes on every file' },
  { t: 'Lead reviews', s: 'Senior review and mentoring under CA oversight' },
];
const PATH = 'M20 300 H130 V230 H240 V160 H350 V90 H460 V24';
const NODES: [number, number][] = [[130, 300], [240, 230], [350, 160], [460, 90]];
const at = (i: number) => 0.12 + i * 0.25;

/**
 * Career staircase drawn by scroll. A traveller dot rides the exact tip of the
 * line (via getPointAtLength), milestones light up as it reaches them, and a
 * flag unfurls at the top.
 */
export function GrowthPath() {
  const box = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const rider = useRef<SVGGElement>(null);
  const { reduced, lite } = usePerf();
  const { scrollYProgress } = useScroll({ target: box, offset: ['start 80%', 'end 50%'] });
  const spring = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const p = lite ? scrollYProgress : spring;

  useMotionValueEvent(p, 'change', (v) => {
    const el = path.current;
    if (!el || !rider.current) return;
    const pt = el.getPointAtLength(el.getTotalLength() * Math.min(1, Math.max(0, v)));
    rider.current.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
  });

  const flag = useTransform(p, [0.92, 1], [0, 1]);

  return (
    <div ref={box}>
      {/* Tablet & desktop: drawn staircase */}
      <div className="relative hidden md:block">
        <svg viewBox="0 0 500 330" className="w-full overflow-visible text-ink dark:text-white" aria-hidden>
          <path d={PATH} fill="none" stroke="currentColor" strokeOpacity={0.1} strokeWidth={2} />
          <m.path ref={path} d={PATH} fill="none" className="stroke-brand-800 dark:stroke-brand-300" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: reduced ? 1 : p }} />
          {NODES.map(([x, y], i) => <Node key={i} x={x} y={y} progress={p} start={at(i)} still={reduced} />)}
          <m.g style={{ scaleY: reduced ? 1 : flag, transformOrigin: '460px 24px' }}>
            <path d="M460 24 V-14" className="stroke-brand-800 dark:stroke-brand-300" strokeWidth={1.5} />
            <path d="M460 -14 h22 l-6 7 l6 7 h-22z" className="fill-brand-500" />
          </m.g>
          {!reduced && (
            <g ref={rider} transform="translate(20 300)">
              <circle r={9} className="fill-brand-500/20" />
              <circle r={4.5} className="fill-white stroke-brand-800 dark:fill-night dark:stroke-brand-300" strokeWidth={2} />
            </g>
          )}
        </svg>
        <ol className="absolute inset-0">
          {MILESTONES.map((ms, i) => (
            <Label key={ms.t} i={i} progress={p} still={reduced} {...ms} />
          ))}
        </ol>
      </div>

      {/* Phones: compact vertical list */}
      <ol className="border-l border-ink/15 md:hidden dark:border-white/15">
        {MILESTONES.map((ms, i) => (
          <li key={ms.t} className="relative pb-7 pl-6 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-800 dark:bg-brand-300" />
            <p className="label"><span className="label-accent">Step 0{i + 1}</span></p>
            <p className="mt-1 font-display text-2xl font-light">{ms.t}</p>
            <p className="muted mt-1 text-[0.95rem]">{ms.s}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Node({ x, y, progress, start, still }: { x: number; y: number; progress: MotionValue<number>; start: number; still: boolean }) {
  const s = useTransform(progress, [start - 0.05, start], [0, 1]);
  return (
    <m.g style={{ scale: still ? 1 : s, transformOrigin: `${x}px ${y}px` }}>
      <circle cx={x} cy={y} r={14} className="fill-brand-500/15" />
      <circle cx={x} cy={y} r={6.5} className="fill-brand-800 dark:fill-brand-300" stroke="#fff" strokeWidth={2.5} />
    </m.g>
  );
}

function Label({ i, t, s, progress, still }: { i: number; t: string; s: string; progress: MotionValue<number>; still: boolean }) {
  const [x, y] = NODES[i];
  const o = useTransform(progress, [at(i) - 0.08, at(i)], [0.25, 1]);
  const yy = useTransform(progress, [at(i) - 0.08, at(i)], [8, 0]);
  return (
    <m.li style={{ left: `${((x - 100) / 500) * 100}%`, top: `${((y + 26) / 330) * 100}%`, opacity: still ? 1 : o, y: still ? 0 : yy }} className="absolute w-[22%] min-w-[9rem]">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-800 dark:text-brand-300">Step 0{i + 1}</p>
      <p className="mt-1 font-display text-lg font-light leading-tight lg:text-xl">{t}</p>
      <p className="muted mt-1 hidden text-[0.82rem] leading-snug lg:block">{s}</p>
    </m.li>
  );
}
