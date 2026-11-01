import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { usePerf } from '../../lib/perf';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Large statement whose words brighten one by one as the visitor scrolls.
 * Wrap words in *asterisks* for the italic brand accent.
 */
export function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { reduced } = usePerf();
  // Scroll-scrubbed words only on tablet/desktop; phones get calm static text.
  const still = reduced || !useMediaQuery('(min-width: 768px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={`h-display flex flex-wrap text-[2rem] leading-[1.12] sm:text-5xl sm:leading-[1.08] lg:text-[4.2rem] ${className}`} aria-label={text.replace(/\*/g, '')}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={w.startsWith('*')} still={still}>
          {w.replace(/\*/g, '')}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, accent, still }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean; still: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blurY = useTransform(progress, range, [8, 0]);
  return (
    <span aria-hidden className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em]">
      <m.span style={still ? undefined : { opacity, y: blurY }} className={`inline-block ${accent ? 'accent' : ''}`}>
        {children}
      </m.span>
    </span>
  );
}
