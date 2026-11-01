import { useRef } from 'react';
import { m } from 'framer-motion';
import { useLoop } from '../../hooks/useLoop';

/** 404 illustration: a balance that won't settle — "this page didn't balance". */
export function BalanceScale({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const loop = useLoop(ref);
  return (
    <svg ref={ref} viewBox="0 0 220 170" className={`text-ink dark:text-white ${className}`} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M110 30v120M80 150h60" />
      <circle cx="110" cy="26" r="5" className="fill-brand-800 stroke-none dark:fill-brand-300" />
      <m.g style={{ transformOrigin: '110px 30px' }} initial={{ rotate: -9 }} animate={loop ? { rotate: [-9, 7, -5, 4, -9] } : { rotate: -9 }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M30 30h160" />
        <path d="M30 30l-18 50h36zM190 30l-18 50h36z" strokeOpacity={0.5} />
        <path d="M10 80a20 7 0 0 0 40 0M170 80a20 7 0 0 0 40 0" />
        <text x="30" y="72" textAnchor="middle" fontSize="12" className="fill-current stroke-none font-mono">404</text>
        <text x="190" y="72" textAnchor="middle" fontSize="12" className="fill-brand-800 stroke-none font-mono dark:fill-brand-300">0</text>
      </m.g>
    </svg>
  );
}
