import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { usePerf } from '../../lib/perf';
import { EASE_IN_OUT } from '../../lib/ease';
import type { ServiceId } from '../../content/site';

/** Line-art illustration per service that draws itself on first view. */
export function ServiceGlyph({ id, className = 'h-20 w-24', weight = 1.6 }: { id: ServiceId; className?: string; weight?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { reduced } = usePerf();
  const go = inView || reduced;
  const draw = (d: string, delay = 0, extra: Record<string, unknown> = {}) => (
    <m.path d={d} vectorEffect="non-scaling-stroke" initial={{ pathLength: reduced ? 1 : 0 }} animate={go ? { pathLength: 1 } : undefined} transition={{ duration: 1.1, delay, ease: EASE_IN_OUT }} {...extra} />
  );
  const dot = (cx: number, cy: number, delay: number) => (
    <m.circle cx={cx} cy={cy} r={2.4} fill="currentColor" stroke="none" className="text-brand-600 dark:text-brand-300" initial={{ scale: reduced ? 1 : 0 }} animate={go ? { scale: 1 } : undefined} transition={{ delay, type: 'spring', stiffness: 300, damping: 14 }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
  );

  const art: Record<ServiceId, React.ReactNode> = {
    accounting: (
      <>
        {draw('M18 16h44a6 6 0 0 1 6 6v50H24a6 6 0 0 1-6-6z')}
        {draw('M28 30h28M28 40h28M28 50h28M28 60h16', 0.35)}
        {draw('M68 26l12-4v50l-12 4', 0.6)}
        {dot(58, 60, 1.3)}
      </>
    ),
    audit: (
      <>
        {draw('M16 14h40v58H16z')}
        {draw('M24 26h24M24 36h24M24 46h14', 0.3)}
        {draw('M62 48a13 13 0 1 0 0.1 0', 0.55)}
        {draw('M71 58l12 12', 0.9)}
        {draw('M57 48l4 4 7-8', 1.15)}
      </>
    ),
    payroll: (
      <>
        {draw('M28 34a8 8 0 1 0 0.1 0M14 70c0-11 6-17 14-17s14 6 14 17')}
        {draw('M58 30a8 8 0 1 0 0.1 0M46 70c0-11 6-17 12-17s14 6 14 17', 0.3)}
        {draw('M78 18a7 7 0 1 0 0.1 0', 0.7)}
        {draw('M78 14v8M75.5 16.5h5', 1)}
      </>
    ),
    tax: (
      <>
        {draw('M14 74h70')}
        {draw('M22 74l6-14h8l-6 14M38 74l8-24h8l-8 24M54 74l10-36h8l-10 36', 0.3)}
        {draw('M20 52C38 46 56 34 78 14', 0.8)}
        {draw('M70 13h9v9', 1.2)}
        {dot(78, 14, 1.4)}
      </>
    ),
  };

  return (
    <svg ref={ref} viewBox="0 0 96 88" className={`text-ink dark:text-white ${className}`} fill="none" stroke="currentColor" strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {art[id]}
    </svg>
  );
}
