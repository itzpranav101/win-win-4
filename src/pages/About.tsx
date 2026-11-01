import { useT } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { CtaBand } from '../components/ui/CtaBand';
import { RouteMap } from '../components/motion/RouteMap';
import { WordReveal } from '../components/motion/WordReveal';

export default function About() {
  const t = useT();
  const a = t.about;
  useSeo(t.meta.about.title, t.meta.about.description);
  return (
    <>
      <PageHero label={a.hero.label} title={<>{a.hero.title[0]} <span className="accent">{a.hero.title[1]}</span></>}>
        {a.hero.lead}
      </PageHero>

      <section className="section">
        <div className="wrap">
          <p className="label"><span className="label-accent">01</span> · {a.statementLabel}</p>
          <WordReveal className="mt-6 max-w-5xl sm:mt-8" text={a.statement} />
        </div>
      </section>

      <section className="section border-t border-ink/10 dark:border-white/10">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <SectionIntro num="02" label={a.map.label} title={<>{a.map.title[0]} <span className="accent">{a.map.title[1]}</span></>} className="lg:col-span-5" />
          <Reveal className="card relative overflow-hidden px-3 pb-6 pt-10 sm:p-10 lg:col-span-7">
            <div aria-hidden className="grid-bg absolute inset-0" />
            <RouteMap className="relative" />
          </Reveal>
        </div>
      </section>

      <section className="section cv-auto border-t border-ink/10 dark:border-white/10">
        <div className="wrap">
          <SectionIntro num="03" label={a.principlesLabel} title={<>{a.principlesTitle[0]} <span className="accent">{a.principlesTitle[1]}</span></>} />
          <div className="mt-10 grid border-t border-ink/15 sm:mt-14 md:grid-cols-3 dark:border-white/15">
            {a.principles.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.08} className={`border-ink/10 py-6 dark:border-white/10 md:py-8 md:pr-8 ${i > 0 ? 'border-t md:border-l md:border-t-0 md:pl-8' : ''}`}>
                <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                <h3 className="accent mt-2 text-4xl sm:mt-4 sm:text-5xl">{p.k}</h3>
                <p className="muted mt-2 sm:mt-4">{p.t}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:mt-16 sm:grid-cols-3 dark:border-white/10 dark:bg-white/10">
            {a.facts.map((f, i) => (
              <div key={i} className={`bg-white p-6 sm:p-8 dark:bg-night ${i === 0 ? 'hidden sm:block' : ''}`}>
                <p className="label">{f.k}</p>
                <p className="mt-2 font-display text-xl font-light">{f.v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title={a.cta.title} text={a.cta.text} />
    </>
  );
}
