import { useT } from '../../i18n';

/** Native <details> accordion — accessible, zero JS, no layout jank. */
export function Faq() {
  const t = useT();
  return (
    <div className="border-t border-ink/15 dark:border-white/15">
      {t.services.faqs.map((f, i) => (
        <details key={i} className="group border-b border-ink/10 dark:border-white/10">
          <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
              <span className="font-display text-[1.25rem] font-light leading-snug tracking-[-0.02em] sm:text-2xl">{f.q}</span>
            </span>
            <span aria-hidden className="relative h-4 w-4 shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="muted max-w-3xl pb-5 pl-8 pr-10 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
