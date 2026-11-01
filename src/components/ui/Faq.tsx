import { faqs } from '../../content/site';

/** Native <details> accordion — accessible, zero JS, no layout jank. */
export function Faq({ mobileLimit }: { mobileLimit?: number }) {
  return (
    <div className="border-t border-ink/15 dark:border-white/15">
      {faqs.map((f, i) => (
        <details key={f.q} className={`group border-b border-ink/10 dark:border-white/10 ${mobileLimit !== undefined && i >= mobileLimit ? 'hidden sm:block' : ''}`}>
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
              <span className="font-display text-[1.35rem] font-light leading-snug tracking-[-0.02em] sm:text-2xl">{f.q}</span>
            </span>
            <span aria-hidden className="relative h-4 w-4 shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="muted max-w-3xl pb-6 pl-8 pr-10 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
