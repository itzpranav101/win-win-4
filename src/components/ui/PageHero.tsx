import type { ReactNode } from 'react';
import { MathField } from '../motion/MathField';
import { ScrollRail } from '../motion/ScrollCue';

interface Props {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  /** show the visual on phones too (default: tablet & up only) */
  visualOnPhone?: boolean;
}

/** Inner-page hero: left-aligned message on graph paper; optional visual in a right-hand column. */
export function PageHero({ label, title, children, actions, visual, visualOnPhone = false }: Props) {
  return (
    <section className="sky-wash relative overflow-hidden">
      <MathField />
      <div className="wrap relative grid items-center gap-12 pb-14 pt-28 sm:pb-24 sm:pt-40 lg:grid-cols-12 lg:pb-28">
        <div className={visual ? 'lg:col-span-7' : 'lg:col-span-10 xl:col-span-9'}>
          <p className="label animate-fade-up">{label}</p>
          <h1 className="h-display mt-6 animate-fade-up text-[2.6rem] leading-[1] [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]">{title}</h1>
          {children && <p className="lead mt-7 max-w-2xl animate-fade-up [animation-delay:160ms]">{children}</p>}
          {actions && <div className="mt-9 flex animate-fade-up flex-col items-start gap-3 [animation-delay:240ms] xs:flex-row xs:items-center">{actions}</div>}
        </div>
        {visual && (
          <div className={`${visualOnPhone ? '' : 'hidden sm:block'} animate-fade-up [animation-delay:300ms] lg:col-span-5`}>{visual}</div>
        )}
      </div>
      <ScrollRail className="bottom-10" />
    </section>
  );
}
