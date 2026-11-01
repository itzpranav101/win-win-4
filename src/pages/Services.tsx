import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { SERVICE_IDS } from '../content/site';
import { useT } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Faq } from '../components/ui/Faq';
import { CtaBand } from '../components/ui/CtaBand';
import { RisingChart } from '../components/motion/RisingChart';
import { ScrollCue } from '../components/motion/ScrollCue';
import { ServiceGlyph } from '../components/motion/ServiceGlyph';

export default function Services() {
  const t = useT();
  const sv = t.services;
  useSeo(t.meta.services.title, t.meta.services.description);
  const active = useActiveSection(SERVICE_IDS);

  return (
    <>
      <PageHero
        label={sv.hero.label}
        title={<>{sv.hero.title[0]} <span className="accent">{sv.hero.title[1]}</span></>}
        actions={<a href={`#${SERVICE_IDS[0]}`}><ScrollCue label={sv.hero.cue} /></a>}
        visual={<RisingChart className="mx-auto h-56 w-auto sm:h-64" />}
      >
        {sv.hero.lead}
      </PageHero>

      {/* Sticky section bar */}
      <nav aria-label={sv.barLabel} className="sticky z-20 border-y border-ink/10 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-night/90" style={{ top: 'calc(var(--header-h) + env(safe-area-inset-top))' }}>
        <div className="wrap flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
          {SERVICE_IDS.map((id, i) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} className={`shrink-0 rounded-full px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] transition ${active === id ? 'bg-brand-900 text-white dark:bg-brand-300 dark:text-night' : 'text-ink/70 hover:bg-ink/5 dark:text-white/70 dark:hover:bg-white/10'}`}>
              <span className="mr-1.5 opacity-60">0{i + 1}</span>{sv.short[i]}
            </a>
          ))}
        </div>
      </nav>

      <div className="wrap space-y-20 py-14 sm:space-y-32 sm:py-28 lg:space-y-40">
        {SERVICE_IDS.map((id, i) => <ServiceBlock key={id} i={i} />)}
      </div>

      <section className="section cv-auto border-t border-ink/10 dark:border-white/10">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <SectionIntro label={sv.needs.label} title={<>{sv.needs.title[0]} <span className="accent">{sv.needs.title[1]}</span></>} className="lg:col-span-5">
            {sv.needs.text}
          </SectionIntro>
          <ol className="grid grid-cols-2 border-t border-ink/15 lg:col-span-7 dark:border-white/15">
            {sv.needs.items.map((c, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className={`border-ink/10 py-5 dark:border-white/10 ${i % 2 === 1 ? 'border-l pl-4 sm:pl-7' : 'pr-4'} ${i > 1 ? 'border-t' : ''}`}>
                <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                <p className="mt-1.5 font-display text-lg font-light leading-snug sm:text-xl">{c}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section cv-auto pt-0 sm:pt-0 lg:pt-0">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <SectionIntro label={sv.faqLabel} title={<>{sv.faqTitle[0]} <span className="accent">{sv.faqTitle[1]}</span></>} className="lg:col-span-4" />
          <Reveal className="lg:col-span-8"><Faq /></Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function ServiceBlock({ i }: { i: number }) {
  const t = useT();
  const sv = t.services;
  const item = sv.items[i];
  const id = SERVICE_IDS[i];
  const flip = i % 2 === 1;
  return (
    <article id={id} className="grid scroll-mt-[calc(var(--header-h)+5rem)] items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Illustration panel — tablet & desktop only */}
      <Reveal className={`card relative hidden aspect-[5/4] overflow-hidden sm:block lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 grid place-items-center">
          <ServiceGlyph id={id} weight={1.8} className="h-44 w-52 lg:h-56 lg:w-64" />
        </div>
        <span className="pill absolute left-6 top-6 !bg-white dark:!bg-night-card">{sv.service} 0{i + 1}</span>
        {item.scope.slice(0, 2).map((x, j) => (
          <span key={x} className={`pill absolute !bg-white/95 !normal-case !tracking-[0.04em] shadow-[0_10px_30px_-14px_rgb(10_10_10/0.25)] dark:!bg-night-card ${j === 0 ? 'bottom-[22%] left-[6%]' : 'right-[6%] top-[24%]'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{x}
          </span>
        ))}
        <span className="label absolute bottom-6 right-6">0{i + 1} / 0{SERVICE_IDS.length}</span>
      </Reveal>

      <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
        <Reveal>
          <p className="label"><span className="label-accent">0{i + 1}</span> · {sv.short[i]}</p>
          <h2 className="h-section mt-4">{sv.names[i]}</h2>
          <p className="lead mt-5">{item.overview}</p>
        </Reveal>

        <Reveal className="mt-8 grid gap-6 border-t border-ink/15 pt-6 sm:grid-cols-2 dark:border-white/15">
          <div>
            <p className="label">{sv.whoLabel}</p>
            <p className="mt-2 leading-relaxed text-ink-soft dark:text-slate-300">{item.whoNeeds}</p>
          </div>
          <div className="hidden sm:block">
            <p className="label">{sv.whyLabel}</p>
            <p className="mt-2 leading-relaxed text-ink-soft dark:text-slate-300">{item.whyItMatters}</p>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <p className="label">{sv.scopeLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.scope.map((x, j) => <li key={x} className={`chip !font-sans !text-[0.85rem] !tracking-normal ${j > 2 ? '!hidden sm:!inline-flex' : ''}`}>{x}</li>)}
          </ul>
        </Reveal>

        <Reveal className="mt-8">
          <details className="group border-y border-ink/10 dark:border-white/10">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">
              {sv.howLabel}
              <span aria-hidden className="relative h-3.5 w-3.5">
                <span className="absolute left-0 top-1/2 h-px w-3.5 bg-current" />
                <span className="absolute left-1/2 top-0 h-3.5 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
              </span>
            </summary>
            <ol className="grid gap-4 pb-6 pt-1 sm:grid-cols-2">
              {item.process.map((p, j) => (
                <li key={p} className="flex gap-3">
                  <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{j + 1}</span>
                  <span className="text-[0.95rem] text-ink-soft dark:text-slate-300">{p}</span>
                </li>
              ))}
            </ol>
          </details>
        </Reveal>

        {item.disclaimer && (
          <Reveal className="mt-6 flex gap-3 text-sm text-ink-soft dark:text-slate-300">
            <Info size={16} className="mt-0.5 shrink-0 text-brand-800 dark:text-brand-300" />
            {item.disclaimer}
          </Reveal>
        )}

        <Reveal className="mt-8 hidden sm:block">
          <Link to="/contact" className="btn-ghost">{sv.discuss} <ArrowRight size={14} /></Link>
        </Reveal>
      </div>
    </article>
  );
}

/** Highlights the service currently in the middle band of the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
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
