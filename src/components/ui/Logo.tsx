import { Link } from 'react-router-dom';

export function Logo({ tag = true }: { tag?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-3 rounded-lg" aria-label="Win-Win Business Solutions — home">
      <picture>
        <source srcSet={`${import.meta.env.BASE_URL}logo-mark.webp`} type="image/webp" />
        <img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" width={28} height={24} className="h-6 w-auto dark:rounded-[4px] dark:bg-white dark:p-[2px]" />
      </picture>
      <span className="font-display text-[1.45rem] font-normal leading-none tracking-[-0.02em] text-ink dark:text-white">Win-Win</span>
      {tag && (
        <span className="hidden border-l border-ink/20 pl-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink/60 md:inline dark:border-white/20 dark:text-white/55">
          Business Solutions
        </span>
      )}
    </Link>
  );
}
