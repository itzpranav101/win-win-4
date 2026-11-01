import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowRight, FileCheck2, Lock, ScanSearch, ShieldCheck, UserCheck, Users } from 'lucide-react';
import { KNOWLEDGE, SERVICE_IDS } from '../content/site';
import { useT } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { formatTime, useLiveClock } from '../hooks/useLiveClock';
import { usePerf } from '../lib/perf';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { CtaBand } from '../components/ui/CtaBand';
import { CountUp } from '../components/motion/CountUp';
import { FileJourney } from '../components/motion/FileJourney';
import { MathField } from '../components/motion/MathField';
import { ProofPanel } from '../components/motion/ProofPanel';
import { RouteMap } from '../components/motion/RouteMap';
import { DoubleRule, ScrollRail } from '../components/motion/ScrollCue';
import { ServiceGlyph } from '../components/motion/ServiceGlyph';

const TRUST_ICONS = [ScanSearch, UserCheck, FileCheck2, Lock, Users, ShieldCheck];
const NUMBERS = [4, 2, 1, 0];

export default function Home() {
  const t = useT();
  useSeo(t.meta.home.title, t.meta.home.description);
  return (
    <>
      <Hero />
      <Numbers />
      <Partnership />
      <div id="journey">
        <FileJourney />
      </div>
      <Services />
      <Process />
      <Trust />
      <CtaBand />
    </>
  );
}

/* ─────────────── Hero ─────────────── */

function Hero() {
  const t = useT();
  const h = t.home.hero;
  return (
    <section className="sky-wash relative overflow-hidden">
      <MathField />

      <div className="wrap relative grid items-center gap-10 pb-12 pt-28 sm:gap-14 sm:pb-14 sm:pt-36 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-40 xl:gap-20 lg:[@media(max-height:820px)]:pt-32">
        <div className="lg:col-span-7">
          <HeroClock />

          <h1 className="h-display mt-7 text-[2.7rem] leading-[1] xs:text-[3.05rem] sm:mt-8 sm:text-[4.1rem] lg:text-[4.35rem] lg:leading-[0.98] xl:text-[5.1rem]">
            <Line delay={0}>{h.title}</Line>
            <Line delay={120} className="accent pb-[0.3em] -mb-[0.3em]">
              <span className="relative inline-block">
                {h.accent}
                <DoubleRule delay={1050} className="-bottom-[0.02em] text-brand-800 dark:text-brand-300" />
              </span>
            </Line>
          </h1>

          <p className="lead mt-7 max-w-[34rem] animate-fade-up [animation-delay:380ms] sm:mt-8">
            {h.lead} <span className="text-ink dark:text-white">{h.leadMore}</span>
          </p>

          <div className="mt-8 flex animate-fade-up flex-col items-start gap-3 [animation-delay:480ms] sm:mt-9 sm:flex-row sm:items-center">
            <Link to="/contact" className="btn-primary w-full sm:w-auto">{t.common.discuss} <ArrowRight size={14} /></Link>
            <a href="#journey" className="btn-ghost hidden sm:inline-flex">{h.how}</a>
            <a href="#journey" className="link mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] sm:hidden">{h.how} ↓</a>
          </div>

          <dl className="mt-12 hidden max-w-[36rem] animate-fade-up grid-cols-3 border-t border-ink/15 [animation-delay:600ms] sm:grid dark:border-white/15">
            {h.spec.map((s, i) => (
              <div key={i} className={`pt-4 ${i > 0 ? 'border-l border-ink/10 pl-5 dark:border-white/10' : 'pr-4'}`}>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink/55 dark:text-white/50">
                  <span className="text-brand-800 dark:text-brand-300">0{i + 1}</span> · {s.k}
                </dt>
                <dd className="mt-1.5 text-[0.95rem] leading-snug text-ink dark:text-white">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up [animation-delay:250ms] lg:col-span-5">
          <ProofPanel />
        </div>
      </div>

      <div className="wrap relative hidden pb-14 sm:block sm:pb-16">
        <div className="flex flex-col items-center gap-4 border-t border-ink/10 pt-8 lg:flex-row lg:justify-between lg:gap-10 dark:border-white/10">
          <p className="label shrink-0">{h.knowledge}</p>
          <ul className="flex flex-wrap justify-center lg:pr-12">
            {KNOWLEDGE.map((k, i) => (
              <li key={k} className={`px-6 text-center font-display text-2xl font-light text-ink/80 lg:last:pr-0 dark:text-white/80 ${i > 0 ? 'border-l border-ink/15 dark:border-white/15' : ''}`}>{k}</li>
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
  const t = useT();
  const now = useLiveClock();
  return (
    <p className="pill animate-fade-up !bg-white/70 !py-2 !text-ink/75 dark:!bg-white/5 dark:!text-white/70">
      <span className="relative flex h-2 w-2">
        <span className="lite-hide absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
      </span>
      {t.common.madurai} <b className="font-medium tabular-nums text-brand-800 dark:text-brand-300">{formatTime(now, 'Asia/Kolkata')}</b>
      <span className="opacity-40">/</span>
      {t.common.singapore} <b className="font-medium tabular-nums text-brand-800 dark:text-brand-300">{formatTime(now, 'Asia/Singapore')}</b>
    </p>
  );
}

/* ─────────────── Numbers ─────────────── */

const cols = (i: number) =>
  `border-ink/10 dark:border-white/10 ${i % 2 === 1 ? 'border-l pl-4 sm:pl-7' : 'pr-4'} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-7' : ''}`;

function Numbers() {
  const n = useT().home.numbers;
  return (
    <section className="py-12 sm:py-24">
      <div className="wrap-narrow">
        <Reveal><p className="label text-center">{n.label}</p></Reveal>
        <div className="mt-8 grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4 dark:border-white/15">
          {NUMBERS.map((num, i) => (
            <Reveal key={i} delay={i * 0.06} className={`py-6 sm:py-7 ${cols(i)}`}>
              <CountUp to={num} className={`block font-display text-5xl font-light leading-none tracking-[-0.04em] sm:text-7xl lg:text-8xl ${num === 0 ? 'text-brand-800 dark:text-brand-300' : ''}`} />
              <p className="muted mt-3 max-w-[14rem] text-[0.9rem] leading-snug sm:mt-4">{n.items[i]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 01 Partnership ─────────────── */

function Partnership() {
  const p = useT().home.partnership;
  return (
    <section id="partnership" className="section">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <SectionIntro num="01" label={p.label} title={<>{p.title[0]} <span className="accent">{p.title[1]}</span></>} className="lg:order-2 lg:col-span-5">
          {p.text}
        </SectionIntro>
        <Reveal className="card relative overflow-hidden px-3 pb-6 pt-10 sm:p-10 lg:order-1 lg:col-span-7">
          <div aria-hidden className="grid-bg absolute inset-0" />
          <RouteMap className="relative" />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── 03 Services ─────────────── */

function Services() {
  const t = useT();
  const s = t.home.services;
  return (
    <section id="services" className="section">
      <div className="wrap">
        <SectionIntro center num="03" label={s.label} title={<>{s.title[0]} <span className="accent">{s.title[1]}</span></>} />
        <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {SERVICE_IDS.map((id, i) => (
            <Reveal key={id} delay={i * 0.07}>
              <Link to={`/services#${id}`} className={`card card-hover group flex h-full items-center gap-4 p-5 sm:flex-col sm:items-start sm:gap-0 sm:p-7 ${i === SERVICE_IDS.length - 1 ? 'card-accent' : ''}`}>
                <ServiceGlyph id={id} className="h-12 w-14 shrink-0 sm:my-6 sm:h-20 sm:w-24" />
                <span className="min-w-0 flex-1 sm:flex sm:w-full sm:flex-col">
                  <span className="block font-display text-[1.35rem] font-light leading-[1.1] tracking-[-0.02em] sm:text-[1.7rem]">{t.services.names[i]}</span>
                  <span className="muted mt-1.5 hidden text-[0.95rem] leading-relaxed sm:block">{s.items[i]}</span>
                  <span className="mt-auto hidden items-center gap-2 pt-7 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-800 sm:inline-flex dark:text-brand-300">
                    {t.common.readMore} <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-brand-800 sm:hidden dark:text-brand-300" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── 04 Process ─────────────── */

// 2 columns on phones, 4 on desktop; dividers only between neighbours
const PROCESS_BORDERS = ['pr-4', 'border-l pl-4 sm:pl-7', 'border-t pr-4 lg:border-l lg:border-t-0 lg:pl-7', 'border-l border-t pl-4 sm:pl-7 lg:border-t-0'];

function Process() {
  const p = useT().home.process;
  const isDesktop = useIsDesktop();
  const { lite, reduced } = usePerf();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const fill = lite ? scrollYProgress : spring;
  const still = reduced || !isDesktop; // scroll-scrubbed only on desktop
  return (
    <section className="section border-t border-ink/10 dark:border-white/10">
      <div className="wrap">
        <SectionIntro num="04" label={p.label} title={<>{p.title[0]} <span className="accent">{p.title[1]}</span></>} />
        <ol ref={ref} className="relative mt-10 grid grid-cols-2 border-t border-ink/15 sm:mt-14 lg:grid-cols-4 dark:border-white/15">
          {!still && <m.span aria-hidden style={{ scaleX: fill }} className="absolute -top-px left-0 right-0 h-[2px] origin-left bg-brand-800 dark:bg-brand-300" />}
          {p.steps.map((s, i) => (
            <li key={i} className={`border-ink/10 py-5 sm:py-7 dark:border-white/10 ${PROCESS_BORDERS[i]}`}>
              <StepText i={i} progress={fill} still={still} step={p.step} title={s.title} text={s.text} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepText({ i, progress, still, step, title, text }: { i: number; progress: MotionValue<number>; still: boolean; step: string; title: string; text: string }) {
  const at = (i + 0.5) / 4;
  const o = useTransform(progress, [at - 0.15, at], [0.3, 1]);
  const y = useTransform(progress, [at - 0.15, at], [10, 0]);
  return (
    <m.div style={still ? undefined : { opacity: o, y }}>
      <span className="font-mono text-xs text-brand-800 dark:text-brand-300">{step} 0{i + 1}</span>
      <h3 className="mt-2 font-display text-[1.3rem] font-light leading-tight tracking-[-0.02em] sm:mt-3 sm:text-[1.75rem]">{title}</h3>
      <p className="muted mt-1.5 text-[0.92rem] leading-snug sm:text-base">{text}</p>
    </m.div>
  );
}

/* ─────────────── 05 Quality & confidentiality ─────────────── */

function Trust() {
  const tr = useT().home.trust;
  return (
    <section id="quality" className="pb-14 sm:pb-28 lg:pb-36">
      <div className="wrap">
        <Reveal className="card p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="label"><span className="label-accent">05</span> · {tr.label}</p>
              <h2 className="h-section mt-4">{tr.title[0]} <span className="accent">{tr.title[1]}</span></h2>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:col-span-8">
              {tr.items.map((item, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <li key={i} className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand-800 dark:bg-white/5 dark:text-brand-300">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span className="text-[0.95rem] leading-snug text-ink dark:text-white">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
