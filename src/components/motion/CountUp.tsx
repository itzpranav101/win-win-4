import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePerf } from '../../lib/perf';

/** Animated numeral (rAF, no library). Zero counts *down* from 9 to make the point. */
export function CountUp({ to, className, duration = 1400 }: { to: number; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { reduced } = usePerf();
  const from = to === 0 ? 9 : 0;
  const [val, setVal] = useState(reduced ? to : from);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, from, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`} aria-label={String(to)}>
      <span aria-hidden>{val}</span>
    </span>
  );
}
