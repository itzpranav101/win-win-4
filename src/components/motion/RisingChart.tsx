import { useRef, useState } from 'react';
import { m, useInView } from 'framer-motion';
import { useLoop } from '../../hooks/useLoop';
import { usePerf } from '../../lib/perf';
import { EASE_IN_OUT } from '../../lib/ease';

const BARS = [
  { x: 52, h: 88, c: '#12a0ee', v: '24' },
  { x: 116, h: 132, c: '#0a7fd0', v: '36' },
  { x: 180, h: 176, c: '#0b4fa8', v: '48' },
  { x: 244, h: 222, c: '#0b3a86', v: '61' },
];
const BASE = 272;
const ARROW = 'M40 236 C 120 222, 210 160, 318 44';

/** Echo of the Win-Win mark: slanted bars rise, then the arrow draws upward. Hover to replay. */
export function RisingChart({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const loop = useLoop(ref);
  const { reduced } = usePerf();
  const [run, setRun] = useState(0);
  const go = inView || reduced;
  const from = (v: number) => (reduced ? v : 0);

  return (
    <svg ref={ref} viewBox="0 0 360 300" className={`text-ink dark:text-white ${className}`} onMouseEnter={() => !reduced && setRun((r) => r + 1)} aria-hidden>
      {[72, 138, 204, 272].map((y, i) => (
        <g key={y}>
          <line x1={34} x2={340} y1={y} y2={y} stroke="currentColor" strokeOpacity={i === 3 ? 0.25 : 0.08} strokeDasharray={i === 3 ? undefined : '2 5'} />
          <text x={26} y={y + 3} textAnchor="end" className="fill-current font-mono" fontSize={8} opacity={0.45}>{[75, 50, 25, 0][i]}</text>
        </g>
      ))}
      <g key={run}>
        {BARS.map((b, i) => (
          <m.g key={b.x} style={{ transformOrigin: `${b.x + 22}px ${BASE}px` }} initial={{ scaleY: from(1) }} animate={go ? { scaleY: 1 } : undefined} transition={{ type: 'spring', stiffness: 80, damping: 13, delay: 0.12 * i }}>
            <path d={`M${b.x} ${BASE} L${b.x + 18} ${BASE - b.h} L${b.x + 52} ${BASE - b.h} L${b.x + 34} ${BASE} Z`} fill={b.c} />
            <path d={`M${b.x + 18} ${BASE - b.h} L${b.x + 25} ${BASE - b.h} L${b.x + 7} ${BASE} L${b.x} ${BASE} Z`} fill="#fff" fillOpacity={0.18} />
          </m.g>
        ))}
        {BARS.map((b, i) => (
          <m.text key={`v${b.x}`} x={b.x + 35} y={BASE - b.h - 8} textAnchor="middle" fontSize={9} className="fill-current font-mono" initial={{ opacity: from(0.6), y: reduced ? 0 : 6 }} animate={go ? { opacity: 0.6, y: 0 } : undefined} transition={{ delay: 0.5 + i * 0.12 }}>
            {b.v}
          </m.text>
        ))}
        <m.path d={ARROW} fill="none" stroke="#12a0ee" strokeWidth={4} strokeLinecap="round" initial={{ pathLength: from(1) }} animate={go ? { pathLength: 1 } : undefined} transition={{ duration: 1.3, delay: 0.75, ease: EASE_IN_OUT }} />
        <m.path d="M292 44 L320 41 L315 69" fill="none" stroke="#12a0ee" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" style={{ transformOrigin: '318px 44px' }} initial={{ opacity: from(1), scale: reduced ? 1 : 0.4 }} animate={go ? { opacity: 1, scale: 1 } : undefined} transition={{ delay: 1.95, type: 'spring', stiffness: 300, damping: 14 }} />
      </g>
      {/* comet running along the arrow while visible */}
      {loop && go && (
        <circle r={4.5} fill="#fff" stroke="#12a0ee" strokeWidth={2.5}>
          <animateMotion dur="2.6s" begin="2.2s" repeatCount="indefinite" path={ARROW} calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".5 0 .3 1" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur="2.6s" begin="2.2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
