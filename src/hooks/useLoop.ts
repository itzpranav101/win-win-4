import { useInView } from 'framer-motion';
import type { RefObject } from 'react';
import { usePerf } from '../lib/perf';

/**
 * True when an idle (infinite) animation should run: element on/near screen,
 * full performance tier, and no reduced-motion preference. Loops pause the
 * moment they scroll away, so off-screen graphics cost nothing.
 */
export function useLoop(ref: RefObject<Element | null>) {
  const inView = useInView(ref, { margin: '120px 0px' });
  const { lite, reduced } = usePerf();
  return inView && !lite && !reduced;
}
