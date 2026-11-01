/**
 * Drafting-sheet background: graph paper (minor + major grid), measuring
 * rulers along the edges and optional faint formula annotations. Static CSS
 * and HTML only — zero runtime cost, identical on every performance tier.
 */
export interface Formula {
  f: string;
  caption: string;
  className: string; // absolute position utilities
}

export function MathField({ formulas = [], rulers = true }: { formulas?: Formula[]; rulers?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="graph-paper absolute inset-0" />
      {rulers && (
        <>
          <div className="ruler-x absolute inset-x-0 hidden sm:block top-[calc(var(--header-h)+env(safe-area-inset-top))] h-2.5 text-ink/25 dark:text-white/20" />
          <div className="ruler-y absolute bottom-0 left-0 top-[calc(var(--header-h)+env(safe-area-inset-top))] hidden w-2.5 text-ink/25 lg:block dark:text-white/20" />
        </>
      )}
      {formulas.map((x, i) => (
        <div key={x.f} className={`absolute hidden animate-fade-up xl:block ${x.className}`} style={{ animationDelay: `${900 + i * 180}ms` }}>
          <p className="font-display text-[1.65rem] font-light italic leading-none tracking-[-0.01em] text-ink/[0.22] dark:text-white/[0.18]">{x.f}</p>
          <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink/30 dark:text-white/25">{x.caption}</p>
        </div>
      ))}
    </div>
  );
}

/** Formula annotations for the call-to-action band; captions come from the dictionary. */
export const ledgerFormulas = (captions: readonly string[]): Formula[] => [
  { f: 'Σ Dr = Σ Cr', caption: captions[0], className: 'left-[3%] top-[30%]' },
  { f: 'A = L + E', caption: captions[1], className: 'right-[4%] top-[26%]' },
  { f: 'Δ = 0.00', caption: captions[2], className: 'bottom-[18%] left-[5%]' },
  { f: 'GST = 9% × v', caption: captions[3], className: 'bottom-[16%] right-[5%]' },
];
