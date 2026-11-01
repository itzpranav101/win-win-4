import { useEffect, useMemo, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { landDotsPath, MADURAI, MAP_H, MAP_W, SINGAPORE } from '../../lib/geo';
import { formatTime, useLiveClock } from '../../hooks/useLiveClock';
import { useLoop } from '../../hooks/useLoop';
import { usePerf } from '../../lib/perf';
import { EASE_IN_OUT } from '../../lib/ease';

const [MX, MY] = MADURAI;
const [SX, SY] = SINGAPORE;
const OUT = `M${MX} ${MY} C 210 -20, 470 30, ${SX} ${SY}`;
const BACK = `M${SX - 4} ${SY + 8} C 500 400, 150 380, ${MX - 2} ${MY + 9}`;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Dot-matrix map of South India → Singapore. Review-ready files travel out
 * along the upper arc, review notes return along the dashed lower arc.
 * Travelling items use SVG SMIL (cheap) and are paused whenever off-screen.
 * City labels are HTML so they stay readable at any size, with live clocks.
 */
export function RouteMap({ className = '' }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const seen = useInView(wrap, { once: true, margin: '-80px' });
  const loop = useLoop(wrap);
  const { reduced, lite } = usePerf();
  const dots = useMemo(() => landDotsPath(), []);
  const now = useLiveClock();
  const draw = seen || reduced;
  const packets = reduced ? 0 : lite ? 1 : 3;

  // Pause/resume SMIL timelines with visibility
  useEffect(() => {
    const el = svg.current;
    if (!el || !packets) return;
    if (loop || lite) el.unpauseAnimations();
    else el.pauseAnimations();
  }, [loop, lite, packets]);

  return (
    <figure ref={wrap} className={`relative ${className}`}>
      <svg ref={svg} viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full" role="img" aria-label="Map: files prepared in Madurai, India travel to Singapore for review; review notes travel back.">
        <defs>
          <linearGradient id="rm-arc" x1="0" x2="1">
            <stop offset="0" stopColor="#12a0ee" />
            <stop offset="1" stopColor="#0b3a86" />
          </linearGradient>
          <radialGradient id="rm-glow">
            <stop offset="0" stopColor="#12a0ee" stopOpacity=".35" />
            <stop offset="1" stopColor="#12a0ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* land as a dot matrix — one path element */}
        <m.path
          d={dots}
          stroke="currentColor"
          strokeWidth={3.4}
          strokeLinecap="round"
          className="text-ink/25 dark:text-white/25"
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={draw ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2 }}
        />

        {/* latitude guides */}
        {[100, 200, 300].map((y) => (
          <line key={y} x1={0} x2={MAP_W} y1={y} y2={y} stroke="currentColor" strokeOpacity={0.07} strokeDasharray="2 6" className="text-ink dark:text-white" />
        ))}

        <m.path d={OUT} fill="none" stroke="url(#rm-arc)" strokeWidth={2.6} strokeLinecap="round" initial={{ pathLength: reduced ? 1 : 0 }} animate={draw ? { pathLength: 1 } : undefined} transition={{ duration: 1.8, delay: 0.3, ease: EASE_IN_OUT }} />
        <m.path d={BACK} fill="none" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="3 7" className="text-ink dark:text-white" initial={{ pathLength: reduced ? 1 : 0 }} animate={draw ? { pathLength: 1 } : undefined} transition={{ duration: 1.8, delay: 0.9, ease: EASE_IN_OUT }} />

        {/* travelling documents (out) and review notes (back) */}
        {draw &&
          Array.from({ length: packets }).map((_, i) => (
            <g key={`o${i}`} opacity={0}>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.9;1" dur="4.2s" begin={`${2.1 + i * 1.4}s`} repeatCount="indefinite" />
              <animateMotion dur="4.2s" begin={`${2.1 + i * 1.4}s`} repeatCount="indefinite" path={OUT} rotate="auto" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".45 0 .35 1" />
              <rect x={-9} y={-11} width={18} height={22} rx={2.5} className="fill-white stroke-brand-800 dark:fill-night-card dark:stroke-brand-300" strokeWidth={1.6} />
              <path d="M-5 -4h10M-5 0h10M-5 4h6" className="stroke-brand-800 dark:stroke-brand-300" strokeWidth={1.2} strokeLinecap="round" />
            </g>
          ))}
        {draw &&
          packets > 1 &&
          [0, 2.1].map((b) => (
            <circle key={`b${b}`} r={4} fill="#f59e0b" opacity={0}>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.88;1" dur="4.2s" begin={`${3.2 + b}s`} repeatCount="indefinite" />
              <animateMotion dur="4.2s" begin={`${3.2 + b}s`} repeatCount="indefinite" path={BACK} calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".45 0 .35 1" />
            </circle>
          ))}

        {/* city markers */}
        {[
          { x: MX, y: MY, c: '#12a0ee', d: 0 },
          { x: SX, y: SY, c: '#0b3a86', d: 1.5 },
        ].map((p) => (
          <g key={p.x}>
            <circle cx={p.x} cy={p.y} r={22} fill="url(#rm-glow)">
              {packets > 1 && <animate attributeName="r" values="14;30;14" dur="3s" begin={`${p.d}s`} repeatCount="indefinite" />}
            </circle>
            <circle cx={p.x} cy={p.y} r={6.5} fill={p.c} stroke="#fff" strokeWidth={2.5} />
          </g>
        ))}
      </svg>

      {/* HTML overlay labels */}
      <CityLabel style={{ left: pct(MX, MAP_W), top: pct(MY, MAP_H) }} align="left" name="Madurai" country="India" role="Prepare · Check" time={`${formatTime(now, 'Asia/Kolkata')} IST`} />
      <CityLabel style={{ left: pct(SX, MAP_W), top: pct(SY, MAP_H) }} align="right" name="Singapore" country="SG" role="Review · Sign off" time={`${formatTime(now, 'Asia/Singapore')} SGT`} />
      <span className="pill absolute left-1/2 top-[3%] hidden -translate-x-1/2 !bg-white/90 sm:inline-flex dark:!bg-night-card/90">+2h 30m · same working day</span>

      <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink/60 dark:text-white/55">
        <span className="flex items-center gap-2"><span className="h-[2px] w-6 rounded bg-gradient-to-r from-brand-500 to-brand-800" />Review-ready files</span>
        <span className="flex items-center gap-2"><span className="w-6 border-t border-dashed border-current" />Review notes</span>
      </figcaption>
    </figure>
  );
}

function CityLabel({ style, align, name, country, role, time }: { style: React.CSSProperties; align: 'left' | 'right'; name: string; country: string; role: string; time: string }) {
  // Madurai sits below-right of its marker, Singapore above-left — both clear of the routes.
  const place = align === 'right' ? '-translate-x-[calc(100%+10px)] -translate-y-[calc(100%+10px)] text-right' : 'translate-x-[-12px] translate-y-[14px]';
  return (
    <div style={style} className={`pointer-events-none absolute rounded-xl bg-white/90 px-2.5 py-1.5 shadow-[0_8px_24px_-14px_rgb(10_10_10/0.3)] sm:px-3 sm:py-2 dark:bg-night-card/90 ${place}`}>
      <p className="whitespace-nowrap font-display text-[0.95rem] font-normal leading-tight sm:text-lg">
        {name} <span className="font-mono text-[0.58rem] tracking-[0.16em] text-ink/50 dark:text-white/50">{country}</span>
      </p>
      <p className="hidden whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink/60 sm:block dark:text-white/55">{role}</p>
      <p className="whitespace-nowrap font-mono text-[0.6rem] tabular-nums text-brand-800 dark:text-brand-300">{time}</p>
    </div>
  );
}
