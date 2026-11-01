import { company } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { CtaBand } from '../components/ui/CtaBand';
import { RouteMap } from '../components/motion/RouteMap';
import { WordReveal } from '../components/motion/WordReveal';
import { ScrollCue } from '../components/motion/ScrollCue';

const PRINCIPLES = [
  { k: 'Careful', t: 'Every figure is traced to source and checked by a second person before it leaves our desk.' },
  { k: 'Clear', t: 'Open items, assumptions and missing information are written down — never left for the reviewer to discover.' },
  { k: 'Bounded', t: 'We prepare. Judgement, advice and sign-off stay with the responsible Singapore professionals.' },
];

export default function About() {
  useSeo('About Us', `The Madurai back-office team supporting ${company.parent}, Singapore.`);
  return (
    <>
      <PageHero label="About Win-Win" title={<>The back office behind <span className="accent">confident reviews.</span></>} actions={<a href="#statement"><ScrollCue label="Scroll to read our story" /></a>}>
        {company.name} is the Madurai team supporting {company.parent}, Singapore — preparing accounting, payroll, GST, tax and working-paper support so the client-facing team can focus on review and judgement.
      </PageHero>

      <section id="statement" className="section">
        <div className="wrap">
          <p className="label"><span className="label-accent">01</span> · What we believe</p>
          <WordReveal className="mt-8 max-w-6xl" text="Good back-office work gives your team *time* back — without taking *control* away. We do the careful preparation, so review feels *calmer,* not heavier." />
        </div>
      </section>

      <section className="section border-t border-ink/10 dark:border-white/10">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <SectionIntro num="02" label="Two locations, one workflow" title={<>Madurai prepares. <span className="accent">Singapore decides.</span></>} className="lg:col-span-5">
            Businesses need dependable support during reporting, filing and audit periods. We take on the preparation layer while {company.parent} keeps control of review, judgement and client communication.
          </SectionIntro>
          <Reveal className="card relative overflow-hidden px-3 pb-6 pt-10 sm:p-10 lg:col-span-7">
            <div aria-hidden className="grid-bg absolute inset-0" />
            <RouteMap className="relative" />
          </Reveal>
        </div>
      </section>

      <section className="section cv-auto border-t border-ink/10 dark:border-white/10">
        <div className="wrap">
          <SectionIntro num="03" label="How we work" title={<>Three principles <span className="accent">behind every file.</span></>} />
          <div className="mt-14 grid border-t border-ink/15 md:grid-cols-3 dark:border-white/15">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.08} className={`border-ink/10 py-8 dark:border-white/10 md:pr-8 ${i > 0 ? 'border-t md:border-l md:border-t-0 md:pl-8' : ''}`}>
                <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                <h3 className="mt-4 font-display text-5xl font-light italic tracking-[-0.03em] text-brand-800 dark:text-brand-300">{p.k}</h3>
                <p className="muted mt-4 leading-relaxed">{p.t}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3 dark:border-white/10 dark:bg-white/10">
            {[
              ['Registered entity', company.legalName],
              ['Location', 'Madurai, Tamil Nadu, India'],
              ['Supports', `${company.parent}, Singapore`],
            ].map(([k, v], i) => (
              <div key={k} className={`bg-white p-6 sm:p-8 dark:bg-night ${i === 0 ? 'hidden sm:block' : ''}`}>
                <p className="label">{k}</p>
                <p className="mt-2 font-display text-xl font-light">{v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title={<>See whether we're <span className="accent">a fit.</span></>} text="Tell us about the work and the deadlines. We'll come back with a practical next step." />
    </>
  );
}
