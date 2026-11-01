import { Award, ClipboardCheck, GraduationCap, Repeat, SearchCheck, ShieldCheck, Zap } from 'lucide-react';
import { useT } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { CtaBand } from '../components/ui/CtaBand';
import { ReviewOrbit } from '../components/motion/ReviewOrbit';

const ROLE_ICONS = [Award, GraduationCap, SearchCheck, Repeat];
const DUTY_ICONS = [Zap, ClipboardCheck, ShieldCheck];

export default function Team() {
  const t = useT();
  const tm = t.team;
  useSeo(t.meta.team.title, t.meta.team.description);
  return (
    <>
      <PageHero label={tm.hero.label} title={<>{tm.hero.title[0]} <span className="accent">{tm.hero.title[1]}</span></>} visual={<ReviewOrbit className="max-w-[20rem] sm:max-w-[26rem]" />} visualOnPhone>
        {tm.hero.lead}
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionIntro num="01" label={tm.rolesLabel} title={<>{tm.rolesTitle[0]} <span className="accent">{tm.rolesTitle[1]}</span></>} />
          <div className="mt-10 grid grid-cols-2 border-t border-ink/15 sm:mt-14 lg:grid-cols-4 dark:border-white/15">
            {tm.roles.map((r, i) => {
              const Icon = ROLE_ICONS[i];
              return (
                <Reveal key={i} delay={i * 0.06} className={`border-ink/10 py-6 dark:border-white/10 ${i % 2 === 1 ? 'border-l pl-4 sm:pl-7' : 'pr-4'} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-7' : ''}`}>
                  <Icon size={24} strokeWidth={1.4} className="text-brand-800 dark:text-brand-300" />
                  <h3 className="mt-3 font-display text-[1.3rem] font-light leading-tight tracking-[-0.02em] sm:text-[1.6rem]">{r.title}</h3>
                  <p className="muted mt-1.5 text-[0.92rem] leading-snug">{r.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section cv-auto pt-0 sm:pt-0 lg:pt-0">
        <div className="wrap grid gap-4 lg:grid-cols-2">
          <Reveal className="card p-6 sm:p-10">
            <p className="label"><span className="label-accent">02</span> · {tm.accountability.label}</p>
            <h2 className="h-section mt-4">{tm.accountability.title[0]} <span className="accent">{tm.accountability.title[1]}</span></h2>
            <ul className="mt-6">
              {tm.accountability.items.map((item, i) => {
                const Icon = DUTY_ICONS[i];
                return (
                  <li key={i} className="flex items-center gap-4 border-t border-ink/10 py-3.5 dark:border-white/10">
                    <Icon size={18} strokeWidth={1.5} className="text-brand-800 dark:text-brand-300" />
                    {item}
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="card card-accent flex flex-col justify-between p-6 sm:p-10">
            <p className="label"><span className="label-accent">03</span> · {tm.learning.label}</p>
            <p className="h-display mt-8 text-[1.7rem] leading-snug sm:text-4xl">{tm.learning.text}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
