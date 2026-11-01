import { m, useScroll, useSpring } from 'framer-motion';
import { usePerf } from '../../lib/perf';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { lite } = usePerf();
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  return <m.div aria-hidden style={{ scaleX: lite ? scrollYProgress : smooth }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand-800 dark:bg-brand-300" />;
}
