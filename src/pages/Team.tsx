import { Award, ClipboardCheck, GraduationCap, Repeat, SearchCheck, ShieldCheck, Zap } from 'lucide-react';
import { teamRoles } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { CtaBand } from '../components/ui/CtaBand';
import { ReviewOrbit } from '../components/motion/ReviewOrbit';

const ICONS = [Award, GraduationCap, SearchCheck, Repeat];
const ACCOUNTABILITY = [
  { t: 'Technical accuracy & consistency', I: Zap },
  { t: 'Client-specific methods & templates', I: ClipboardCheck },
  { t: 'Singapore statutory & professional standards', I: ShieldCheck },
];

export default function Team() {
  useSeo('Our Team', 'Qualified accounting, audit support, payroll and compliance professionals with senior CA/CMA oversight.');
  return (
    <>
      <PageHero label="Team" title={<>People who understand the work — <span className="accent">and check it.</span></>} visual={<ReviewOrbit className="max-w-[22rem] sm:max-w-[26rem]" />} visualOnPhone>
        Every engagement is handled by accounting and compliance professionals, with senior oversight for review and handover.
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionIntro num="01" label="Roles" title={<>Who works <span className="accent">on your files.</span></>} />
          <div className="mt-14 grid border-t border-ink/15 sm:grid-cols-2 dark:border-white/15">
            {teamRoles.map((r, i) => {
              const I = ICONS[i];
              return (
                <Reveal key={r.title} delay={i * 0.06} className={`flex gap-5 border-ink/10 py-8 dark:border-white/10 sm:pr-8 ${i > 0 ? 'border-t' : ''} ${i === 1 ? 'sm:border-l sm:border-t-0 sm:pl-8' : ''} ${i === 3 ? 'sm:border-l sm:pl-8' : ''}`}>
                  <I size={26} strokeWidth={1.4} className="mt-1 shrink-0 text-brand-800 dark:text-brand-300" />
                  <div>
                    <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                    <h3 className="mt-1 font-display text-[1.9rem] font-light leading-tight tracking-[-0.03em]">{r.title}</h3>
                    <p className="muted mt-2 leading-relaxed">{r.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section cv-auto pt-0 sm:pt-0 lg:pt-0">
        <div className="wrap grid gap-4 lg:grid-cols-2">
          <Reveal className="card p-7 sm:p-10">
            <p className="label"><span className="label-accent">02</span> · Accountability</p>
            <h2 className="h-display mt-4 text-4xl leading-[1.04] sm:text-5xl">Named responsibility <span className="accent">at every step.</span></h2>
            <p className="lead mt-5">Each engagement has a named owner for planning, preparation, checking and handover — so recurring work stays consistent.</p>
            <ul className="mt-8">
              {ACCOUNTABILITY.map(({ t, I }) => (
                <li key={t} className="flex items-center gap-4 border-t border-ink/10 py-4 dark:border-white/10"><I size={18} strokeWidth={1.5} className="text-brand-800 dark:text-brand-300" />{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="card card-accent flex flex-col justify-between p-7 sm:p-10">
            <p className="label"><span className="label-accent">03</span> · Ongoing learning</p>
            <p className="mt-10 font-display text-3xl font-light leading-snug tracking-[-0.02em] sm:text-4xl">
              Regular training keeps the team aligned with Singapore <span className="accent">accounting, payroll, tax, GST, ACRA, IRAS and CPF</span> requirements.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
