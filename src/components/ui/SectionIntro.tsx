import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/** Numbered mono label + display heading (+ optional lead), Meco-style. */
export function SectionIntro({ num, label, title, children, center = false, className = '' }: { num?: string; label: string; title: ReactNode; children?: ReactNode; center?: boolean; className?: string }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <p className="label">
        {num && <span className="label-accent">{num} · </span>}
        {label}
      </p>
      <h2 className="h-section mt-4">{title}</h2>
      {children && <div className={`lead mt-6 ${center ? 'mx-auto' : ''} max-w-2xl`}>{children}</div>}
    </Reveal>
  );
}
