import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { services } from '../content/site';
import type { Service } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Faq } from '../components/ui/Faq';
import { CtaBand } from '../components/ui/CtaBand';
import { RisingChart } from '../components/motion/RisingChart';
import { ScrollCue } from '../components/motion/ScrollCue';
import { ServiceGlyph } from '../components/motion/ServiceGlyph';

const CHECKLIST = [
  'Latest trial balance, ledger exports or payroll data',
  'Your templates and prior-period files',
  'Filing deadlines and review timelines',
  'A named contact for queries and approvals',
];

export default function Services() {
  useSeo('Accounting, Audit, Payroll & Tax Support Services', 'Bookkeeping, non-attest audit working papers, payroll and CPF, GST, corporate tax and XBRL support prepared in Madurai for review in Singapore.');
  const active = useActiveSection(services.map((s) => s.id));

  return (
    <>
      <PageHero
        label="Services"
        title={<>Preparation support for <span className="accent">every reporting cycle.</span></>}
        actions={<a href={`#${services[0].id}`}><ScrollCue label="Scroll through each service" /></a>}
        visual={<RisingChart className="mx-auto h-56 w-auto sm:h-64" />}
      >
        Recurring and assignment-based work, prepared in Madurai for business clients of Win-Win Management Consultants. Final review, client communication and sign-off stay with your professional team.
      </PageHero>

      {/* Sticky section bar */}
      <nav aria-label="Services on this page" className="sticky z-20 border-y border-ink/10 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-night/90" style={{ top: 'calc(var(--header-h) + env(safe-area-inset-top))' }}>
        <div className="wrap flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
          {services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined} className={`shrink-0 rounded-full px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] transition ${active === s.id ? 'bg-brand-900 text-white dark:bg-brand-300 dark:text-night' : 'text-ink/70 hover:bg-ink/5 dark:text-white/70 dark:hover:bg-white/10'}`}>
              <span className="mr-1.5 opacity-60">0{i + 1}</span>{s.short}
            </a>
          ))}
        </div>
      </nav>

      <div className="wrap space-y-24 py-20 sm:space-y-32 sm:py-28 lg:space-y-40">
        {services.map((s, i) => <ServiceBlock key={s.id} s={s} i={i} />)}
      </div>

      <section className="section cv-auto border-t border-ink/10 dark:border-white/10">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <SectionIntro label="Before we start" title={<>What we usually <span className="accent">need from you.</span></>} className="lg:col-span-5">
            Clear inputs at the start avoid review loops later. We'll tailor this to your assignment.
          </SectionIntro>
          <ol className="grid border-t border-ink/15 sm:grid-cols-2 lg:col-span-7 dark:border-white/15">
            {CHECKLIST.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.06} className={`border-ink/10 py-6 dark:border-white/10 ${i % 2 === 1 ? 'sm:border-l sm:pl-7' : 'sm:pr-6'} ${i > 0 ? 'border-t' : ''} ${i === 1 ? 'sm:border-t-0' : ''}`}>
                <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                <p className="mt-2 font-display text-xl font-light leading-snug">{c}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section cv-auto pt-0 sm:pt-0 lg:pt-0">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <SectionIntro label="FAQ" title={<>Common <span className="accent">questions.</span></>} className="lg:col-span-4" />
          <Reveal className="lg:col-span-8"><Faq /></Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function ServiceBlock({ s, i }: { s: Service; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={s.id} className="grid scroll-mt-[calc(var(--header-h)+5rem)] items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Illustration panel — tablet & desktop only */}
      <Reveal className={`card relative hidden aspect-[5/4] overflow-hidden sm:block lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 grid place-items-center">
          <ServiceGlyph id={s.id} weight={1.8} className="h-44 w-52 lg:h-56 lg:w-64" />
        </div>
        <span className="pill absolute left-6 top-6 !bg-white dark:!bg-night-card">Service 0{i + 1}</span>
        {s.scope.slice(0, 2).map((x, j) => (
          <span key={x} className={`pill absolute !bg-white/95 !normal-case !tracking-[0.04em] shadow-[0_10px_30px_-14px_rgb(10_10_10/0.25)] dark:!bg-night-card ${j === 0 ? 'bottom-[22%] left-[6%]' : 'right-[6%] top-[24%]'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{x}
          </span>
        ))}
        <span className="label absolute bottom-6 right-6">0{i + 1} / 0{services.length}</span>
      </Reveal>

      <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
        <Reveal>
          <p className="label"><span className="label-accent">0{i + 1}</span> · {s.short}</p>
          <h2 className="h-section mt-4">{s.title}</h2>
          <p className="lead mt-5">{s.overview}</p>
        </Reveal>

        <Reveal className="mt-8 grid gap-6 border-t border-ink/15 pt-6 sm:grid-cols-2 dark:border-white/15">
          <div>
            <p className="label">Who it's for</p>
            <p className="mt-2 leading-relaxed text-ink-soft dark:text-slate-300">{s.whoNeeds}</p>
          </div>
          <div className="hidden sm:block">
            <p className="label">Why it matters</p>
            <p className="mt-2 leading-relaxed text-ink-soft dark:text-slate-300">{s.whyItMatters}</p>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <p className="label">Scope of support</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.scope.map((x) => <li key={x} className="chip !font-sans !text-[0.85rem] !tracking-normal">{x}</li>)}
          </ul>
        </Reveal>

        <Reveal className="mt-8">
          <details className="group border-y border-ink/10 dark:border-white/10">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">
              How the process works
              <span aria-hidden className="relative h-3.5 w-3.5">
                <span className="absolute left-0 top-1/2 h-px w-3.5 bg-current" />
                <span className="absolute left-1/2 top-0 h-3.5 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
              </span>
            </summary>
            <ol className="grid gap-4 pb-6 pt-1 sm:grid-cols-2">
              {s.process.map((p, j) => (
                <li key={p} className="flex gap-3">
                  <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{j + 1}</span>
                  <span className="text-[0.95rem] text-ink-soft dark:text-slate-300">{p}</span>
                </li>
              ))}
            </ol>
          </details>
        </Reveal>

        {s.disclaimer && (
          <Reveal className="mt-6 flex gap-3 text-sm text-ink-soft dark:text-slate-300">
            <Info size={16} className="mt-0.5 shrink-0 text-brand-800 dark:text-brand-300" />
            {s.disclaimer}
          </Reveal>
        )}

        <Reveal className="mt-8">
          <Link to="/contact" className="btn-ghost">Discuss {s.short.toLowerCase()} <ArrowRight size={14} /></Link>
        </Reveal>
      </div>
    </article>
  );
}

/** Highlights the service currently in the middle band of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    key.split('|').forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [key]);
  return active;
}
