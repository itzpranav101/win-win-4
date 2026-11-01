import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowRight, Check, FileCheck2, Lock, ShieldCheck, Users } from 'lucide-react';
import { company, quality, safeguards, services, split, steps } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { formatTime, useLiveClock } from '../hooks/useLiveClock';
import { usePerf } from '../lib/perf';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { Faq } from '../components/ui/Faq';
import { CtaBand } from '../components/ui/CtaBand';
import { MathField } from '../components/motion/MathField';
import { ProofPanel } from '../components/motion/ProofPanel';
import { CountUp } from '../components/motion/CountUp';
import { FileJourney } from '../components/motion/FileJourney';
import { RouteMap } from '../components/motion/RouteMap';
import { DoubleRule, ScrollCue, ScrollRail } from '../components/motion/ScrollCue';
import { ServiceGlyph } from '../components/motion/ServiceGlyph';

const SAFEGUARD_ICONS = [Lock, Users, ShieldCheck, FileCheck2];
// 1 col → 2 cols (md) → 4 cols (lg): dividers between neighbours only
const PROCESS_BORDERS = [
  '',
  'border-t md:border-l md:border-t-0 md:pl-7',
  'border-t lg:border-l lg:border-t-0 lg:pl-7',
  'border-t md:border-l md:pl-7 lg:border-t-0',
];

export default function Home() {
  useSeo(
    'Review-Ready Accounting Support | Win-Win Business Solutions',
    'The Madurai back office for Win-Win Management Consultants, Singapore — bookkeeping, audit working papers, payroll, GST, tax and compliance support prepared for review.',
  );

  return (
    <>
      <Hero />
      <IndexStrip />
      <Numbers />
      <Partnership />
      <div id="journey">
        <FileJourney />
      </div>
      <Services />
      <Process />
      <Quality />
      <section className="section cv-auto border-t border-ink/10 dark:border-white/10">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <SectionIntro num="07" label="Questions" title={<>Good to know <span className="accent">before you ask.</span></>} className="lg:col-span-4" />
          <Reveal className="lg:col-span-8"><Faq mobileLimit={3} /></Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ─────────────── Hero ─────────────── */

const KNOWLEDGE = ['SFRS', 'ACRA', 'IRAS', 'CPF', 'MOM', 'GST', 'XBRL'];
const SPEC = [
  { k: 'Standard', v: 'SFRS-aligned' },
  { k: 'Checks', v: 'Preparer + reviewer' },
  { k: 'Sign-off', v: 'Stays in Singapore' },
];

function Hero() {
  return (
    <section className="sky-wash relative overflow-hidden">
      <MathField />

      <div className="wrap relative grid items-center gap-10 pb-12 pt-28 sm:gap-14 sm:pb-14 sm:pt-36 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-40 xl:gap-20 lg:[@media(max-height:820px)]:pt-32">
        {/* ── Message ── */}
        <div className="lg:col-span-7">
          <HeroClock />

          <h1 className="h-display mt-7 text-[2.7rem] leading-[1] xs:text-[3.05rem] sm:mt-8 sm:text-[4.1rem] lg:text-[4.35rem] lg:leading-[0.98] xl:text-[5.1rem]">
            <Line delay={0}>The team behind</Line>
            <Line delay={120} className="accent pb-[0.3em] -mb-[0.3em]">
              your{' '}
              <span className="relative inline-block whitespace-nowrap">
                numbers.
                <DoubleRule delay={1050} className="-bottom-[0.02em] text-brand-800 dark:text-brand-300" />
              </span>
            </Line>
          </h1>

          <p className="lead mt-7 max-w-[36rem] animate-fade-up [animation-delay:380ms] sm:mt-8">
            The Madurai back office for {company.parent.replace('-', '\u2011')}, Singapore.
            <span className="hidden sm:inline"> Bookkeeping, audit working papers, payroll, GST and tax —</span>{' '}
            <span className="text-ink dark:text-white">
              <span className="sm:hidden">Accounting work prepared, checked and review&#8209;ready.</span>
              <span className="hidden sm:inline">prepared to your templates, checked line by line and delivered review&#8209;ready.</span>
            </span>
          </p>

          <div className="mt-8 flex animate-fade-up flex-col items-start gap-3 [animation-delay:480ms] sm:mt-9 sm:flex-row sm:items-center">
            <Link to="/contact" className="btn-primary w-full sm:w-auto">Discuss your work <ArrowRight size={14} /></Link>
            <a href="#journey" className="btn-ghost hidden sm:inline-flex">See how a file moves</a>
            <a href="#journey" className="link mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] sm:hidden">See how a file moves ↓</a>
          </div>

          {/* specification list */}
          <dl className="mt-12 hidden max-w-[36rem] animate-fade-up grid-cols-3 sm:grid border-t border-ink/15 [animation-delay:600ms] dark:border-white/15">
            {SPEC.map((s, i) => (
              <div key={s.k} className={`pt-4 ${i > 0 ? 'border-l border-ink/10 pl-4 sm:pl-5 dark:border-white/10' : 'pr-4'}`}>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink/55 dark:text-white/50">
                  <span className="text-brand-800 dark:text-brand-300">0{i + 1}</span> · {s.k}
                </dt>
                <dd className="mt-1.5 text-[0.88rem] leading-snug text-ink sm:text-[0.95rem] dark:text-white">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Proof ── */}
        <div className="animate-fade-up [animation-delay:250ms] lg:col-span-5">
          <ProofPanel />
        </div>
      </div>

      {/* ── Closing strip ── */}
      <div className="wrap relative hidden pb-14 sm:block sm:pb-16">
        <div className="flex flex-col items-center gap-4 border-t border-ink/10 pt-8 lg:flex-row lg:justify-between lg:gap-10 dark:border-white/10">
          <p className="label shrink-0">Working knowledge of</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-0 lg:pr-12">
            {KNOWLEDGE.map((k, i) => (
              <li key={k} className={`text-center font-display text-xl font-light tracking-[-0.01em] text-ink/80 sm:px-6 sm:text-2xl lg:last:pr-0 dark:text-white/80 ${i > 0 ? 'sm:border-l sm:border-ink/15 sm:dark:border-white/15' : ''}`}>
                {k}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ScrollRail className="top-[calc(100svh-12rem)]" />
    </section>
  );
}

/** One headline line that slides up out of a mask (pure CSS — no JS needed for the LCP text). */
function Line({ children, delay, className = '' }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className={`-mx-[0.08em] block overflow-hidden px-[0.08em] pb-[0.06em] ${className}`}>
      <span className="block animate-line-up" style={{ animationDelay: `${delay}ms` }}>{children}</span>
    </span>
  );
}

/** Live local times in both offices. */
function HeroClock() {
  const now = useLiveClock();
  return (
    <p className="pill animate-fade-up !bg-white/70 !py-2 !text-ink/75 dark:!bg-white/5 dark:!text-white/70">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60 lite-hide" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
      </span>
      Madurai <b className="font-medium tabular-nums text-brand-800 dark:text-brand-300">{formatTime(now, 'Asia/Kolkata')}</b>
      <span className="opacity-40">/</span>
      Singapore <b className="font-medium tabular-nums text-brand-800 dark:text-brand-300">{formatTime(now, 'Asia/Singapore')}</b>
    </p>
  );
}


/* ─────────────── "In the next few minutes you'll see" ─────────────── */

const cols = (i: number) =>
  `border-ink/10 dark:border-white/10 ${i % 2 === 1 ? 'border-l pl-4 sm:pl-7' : 'pr-4'} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-7' : ''}`;

function IndexStrip() {
  const items = [
    { href: '#partnership', t: 'How the partnership works', s: 'Who prepares, who signs off' },
    { href: '#journey', t: 'One file, start to finish', s: 'Scroll through a reconciliation' },
    { href: '#services', t: 'What we prepare', s: 'Four service areas' },
    { href: '#quality', t: 'How quality is protected', s: 'Checks and confidentiality' },
  ];
  return (
    <section id="overview" className="hidden pb-4 pt-14 sm:block sm:pt-20">
      <div className="wrap-narrow">
        <Reveal>
          <p className="label text-center !tracking-[0.28em] sm:!text-[0.78rem]">In the next few minutes you'll see</p>
        </Reveal>
        <nav aria-label="On this page" className="mt-8 grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4 dark:border-white/15">
          {items.map((it, i) => (
            <Reveal key={it.href} delay={i * 0.06} className={cols(i)}>
              <a href={it.href} className="group relative block h-full py-6 sm:py-8">
                <span aria-hidden className="absolute -top-px left-0 h-[2px] w-0 bg-brand-800 transition-all duration-500 group-hover:w-2/5 dark:bg-brand-300" />
                <span className="font-mono text-xs text-brand-800 dark:text-brand-300">{i + 1}</span>
                <span className="mt-2 block font-display text-[1.3rem] font-light leading-[1.1] tracking-[-0.025em] sm:text-[1.6rem]">{it.t}</span>
                <span className="muted mt-3 hidden text-[0.92rem] sm:block">{it.s}</span>
              </a>
            </Reveal>
          ))}
        </nav>
      </div>
    </section>
  );
}

/* ─────────────── Numbers ─────────────── */

function Numbers() {
  const stats = [
    { n: 4, t: 'service areas, from bookkeeping to XBRL' },
    { n: 3, t: 'stages of checking before any handover' },
    { n: 1, t: 'business day — our usual reply time' },
    { n: 0, t: 'attest opinions issued. Sign-off stays with you.', accent: true },
  ];
  return (
    <section id="numbers" className="py-12 sm:py-24">
      <div className="wrap-narrow">
        <Reveal><p className="label text-center">The workflow, in numbers</p></Reveal>
        <div className="mt-8 grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4 dark:border-white/15">
          {stats.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06} className={`py-7 ${cols(i)}`}>
              <CountUp to={s.n} className={`block font-display text-5xl font-light leading-none tracking-[-0.04em] sm:text-7xl lg:text-8xl ${s.accent ? 'text-brand-800 dark:text-brand-300' : ''}`} />
              <p className="muted mt-4 max-w-[15rem] text-[0.92rem] leading-snug">{s.t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 01 Partnership ─────────────── */

function Partnership() {
  return (
    <section id="partnership" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="card relative overflow-hidden px-3 pb-6 pt-10 sm:p-10 lg:col-span-7">
          <div aria-hidden className="grid-bg absolute inset-0" />
          <RouteMap className="relative" />
        </Reveal>
        <div className="lg:col-span-5">
          <SectionIntro num="01" label="The partnership" title={<>Prepared in Madurai, <span className="accent">signed off in Singapore.</span></>}>
            Clear boundaries are the point. We handle the preparation layer; {company.parent} keeps the client relationship and every professional judgement.
          </SectionIntro>
          <div className="mt-10 hidden grid-cols-2 gap-6 border-t border-ink/15 pt-6 sm:grid dark:border-white/15">
            {[split.us, split.them].map((side, i) => (
              <Reveal key={side.label} delay={i * 0.08}>
                <p className={`label ${i === 1 ? '!text-brand-800 dark:!text-brand-300' : ''}`}>{i === 0 ? 'We do' : 'You keep'}</p>
                <ul className="mt-3 space-y-2">
                  {side.items.map((it, j) => (
                    <li key={it} className={`${j > 2 ? 'hidden sm:flex' : 'flex'} items-start gap-2.5 text-[0.95rem] text-ink-soft dark:text-slate-300`}>
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${i === 1 ? 'bg-brand-800 dark:bg-brand-300' : 'bg-brand-500'}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 03 Services ─────────────── */

function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <SectionIntro center num="03" label="Services" title={<>Four services, <span className="accent">one standard.</span></>} />
        <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.07}>
              <Link to={`/services#${s.id}`} className={`card card-hover group flex h-full flex-col p-5 sm:p-7 ${i === services.length - 1 ? 'card-accent' : ''}`}>
                <p className="label"><span className="label-accent">0{i + 1}</span> · {s.short}</p>
                <ServiceGlyph id={s.id} className="my-7 hidden h-20 w-24 sm:block" />
                <h3 className="mt-2 font-display text-[1.5rem] font-light leading-[1.05] tracking-[-0.03em] sm:mt-0 sm:text-[1.75rem]">{s.title}</h3>
                <p className="muted mt-2 line-clamp-2 text-[0.92rem] leading-relaxed sm:mt-3 sm:line-clamp-none sm:text-[0.95rem]">{s.summary}</p>
                <ul className="mt-5 hidden space-y-2 lg:block">
                  {s.scope.slice(0, 3).map((x) => (
                    <li key={x} className="flex gap-2.5 text-sm text-ink-soft dark:text-slate-300"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />{x}</li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 font-mono sm:pt-7 text-[0.68rem] uppercase tracking-[0.16em] text-brand-800 dark:text-brand-300">
                  Read more <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 04 Process (scroll-linked rule) ─────────────── */

function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { lite, reduced } = usePerf();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const fill = lite ? scrollYProgress : spring;
  return (
    <section className="section border-t border-ink/10 dark:border-white/10">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionIntro num="04" label="Engagement rhythm" title={<>Less hand-holding. <span className="accent">More finished work.</span></>} />
          <Reveal className="hidden lg:block"><ScrollCue label="Scroll to fill the timeline" /></Reveal>
        </div>
        <ol ref={ref} className="relative mt-14 grid border-t border-ink/15 md:grid-cols-2 lg:grid-cols-4 dark:border-white/15">
          <m.span aria-hidden style={{ scaleX: reduced ? 1 : fill }} className="absolute -top-px left-0 right-0 h-[2px] origin-left bg-brand-800 dark:bg-brand-300" />
          {steps.map((s, i) => (
            <li key={s.title} className={`border-ink/10 py-5 sm:py-7 md:pr-6 dark:border-white/10 ${PROCESS_BORDERS[i]}`}>
              <StepText i={i} progress={fill} still={reduced} title={s.title} text={s.text} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepText({ i, progress, still, title, text }: { i: number; progress: MotionValue<number>; still: boolean; title: string; text: string }) {
  const at = (i + 0.5) / 4;
  const o = useTransform(progress, [at - 0.15, at], [0.3, 1]);
  const y = useTransform(progress, [at - 0.15, at], [10, 0]);
  return (
    <m.div style={still ? undefined : { opacity: o, y }}>
      <span className="font-mono text-xs text-brand-800 dark:text-brand-300">Step 0{i + 1}</span>
      <h3 className="mt-2 font-display text-[1.5rem] font-light tracking-[-0.03em] sm:mt-3 sm:text-[1.75rem]">{title}</h3>
      <p className="muted mt-2 leading-relaxed">{text}</p>
    </m.div>
  );
}

/* ─────────────── 05/06 Quality & confidentiality ─────────────── */

function Quality() {
  return (
    <section id="quality" className="pb-14 sm:pb-28 lg:pb-36">
      <div className="wrap grid gap-4 lg:grid-cols-2">
        <Reveal className="card p-6 sm:p-10">
          <p className="label"><span className="label-accent">05</span> · Quality</p>
          <h2 className="h-display mt-4 text-4xl leading-[1.04] sm:text-5xl">Checked twice <span className="accent">before it reaches you.</span></h2>
          <ul className="mt-8">
            {quality.map((q, i) => (
              <li key={q} className={`${i > 2 ? 'hidden sm:flex' : 'flex'} items-center gap-4 border-t border-ink/10 py-3.5 dark:border-white/10`}>
                <span className="font-mono text-[0.65rem] text-ink/45 dark:text-white/40">0{i + 1}</span>
                <span className="flex-1 text-ink-soft dark:text-slate-300">{q}</span>
                <Check size={16} className="shrink-0 text-brand-700 dark:text-brand-300" />
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="card card-accent p-6 sm:p-10">
          <p className="label"><span className="label-accent">06</span> · Confidentiality</p>
          <h2 className="h-display mt-4 text-4xl leading-[1.04] sm:text-5xl">Client data, <span className="accent">handled carefully.</span></h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8 dark:border-white/10">
            {safeguards.map((s, i) => {
              const Icon = SAFEGUARD_ICONS[i];
              return (
                <div key={s.title}>
                  <Icon size={22} strokeWidth={1.5} className="text-brand-800 dark:text-brand-300" />
                  <h3 className="mt-3 font-display text-xl font-light">{s.title}</h3>
                  <p className="muted mt-1 hidden text-sm leading-relaxed sm:block">{s.text}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
