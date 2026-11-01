import { Mail, MessageCircle } from 'lucide-react';
import { careers, company, waLink } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { GrowthPath } from '../components/motion/GrowthPath';
import { ScrollCue } from '../components/motion/ScrollCue';

const MAIL = `mailto:${company.email}?subject=${encodeURIComponent('Job application — Win-Win')}`;

export default function Careers() {
  useSeo('Careers in Accounting Support, Madurai', 'Build a career in accounting, audit support, payroll, tax, GST and compliance work for Singapore business clients.');
  return (
    <>
      <PageHero
        label="Careers"
        title={<>Build a career in <span className="accent">international accounting.</span></>}
        actions={
          <>
            <a href={MAIL} className="btn-primary w-full max-w-[19rem] sm:w-auto"><Mail size={14} /> Send your resume</a>
            <a href={waLink("Hi, I'm interested in career opportunities at Win-Win.")} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full max-w-[19rem] sm:w-auto"><MessageCircle size={14} /> Ask on WhatsApp</a>
          </>
        }
      >
        Our people are the foundation of our service quality. Do real Singapore accounting, audit, payroll and tax work — with senior supervision from day one.
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIntro num="01" label="Your path" title={<>Grow one step <span className="accent">at a time.</span></>}>
              Structured progression, from fundamentals to leading reviews.
            </SectionIntro>
            <Reveal className="mt-8 hidden md:block"><ScrollCue label="Scroll to climb the path" /></Reveal>
          </div>
          <div className="pb-24 lg:col-span-8 lg:pt-10">
            <GrowthPath />
          </div>
        </div>
      </section>

      <section className="section cv-auto border-t border-ink/10 pt-20 dark:border-white/10">
        <div className="wrap grid gap-4 lg:grid-cols-2">
          <Reveal className="card p-7 sm:p-10">
            <p className="label"><span className="label-accent">02</span> · Why work with us</p>
            <ul className="mt-6">
              {careers.why.map((w, i) => (
                <li key={w} className={`${i > 2 ? 'hidden sm:flex' : 'flex'} gap-4 border-t border-ink/10 py-4 dark:border-white/10`}>
                  <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                  <span className="text-ink-soft dark:text-slate-300">{w}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="card card-accent p-7 sm:p-10">
            <p className="label"><span className="label-accent">03</span> · Who we're looking for</p>
            <ul className="mt-6">
              {careers.who.map((w, i) => (
                <li key={w} className="flex gap-4 border-t border-ink/10 py-4 dark:border-white/10">
                  <span className="font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                  <span className="text-ink-soft dark:text-slate-300">{w}</span>
                </li>
              ))}
            </ul>
            <p className="muted mt-4 text-sm">Strong analytical skills, attention to detail and a commitment to quality matter in every role.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="wrap">
          <Reveal className="sky-wash flex flex-col gap-6 rounded-[2rem] border border-ink/[0.06] p-8 sm:p-12 md:flex-row md:items-center md:justify-between dark:border-white/10">
            <div>
              <p className="label">How to apply</p>
              <h2 className="h-display mt-3 text-4xl sm:text-5xl">Send us <span className="accent">a short note.</span></h2>
              <p className="muted mt-3 max-w-xl">Email your resume with a brief cover note on your qualifications and area of interest. Shortlisted candidates will be contacted.</p>
            </div>
            <a href={MAIL} className="btn-primary shrink-0"><Mail size={14} /> Email your resume</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
