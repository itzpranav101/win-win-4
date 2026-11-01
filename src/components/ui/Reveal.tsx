import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePerf } from '../../lib/perf';
import { EASE_OUT } from '../../lib/ease';

type Tag = 'div' | 'li' | 'section' | 'article';

/** Fades content up once as it enters the viewport. Plain element under reduced motion. */
export function Reveal({ children, delay = 0, className, as = 'div', id }: { children: ReactNode; delay?: number; className?: string; as?: Tag; id?: string }) {
  const { reduced } = usePerf();
  if (reduced) {
    const Plain = as;
    return <Plain id={id} className={className}>{children}</Plain>;
  }
  const Comp = m[as];
  return (
    <Comp
      id={id}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}
