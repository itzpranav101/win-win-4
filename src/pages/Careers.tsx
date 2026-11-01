import { Check, Mail, MessageCircle } from 'lucide-react';
import { company, waLink } from '../content/site';
import { useT } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/ui/Reveal';
import { SectionIntro } from '../components/ui/SectionIntro';
import { GrowthPath } from '../components/motion/GrowthPath';
import { ScrollCue } from '../components/motion/ScrollCue';

export default function Careers() {
  const t = useT();
  const c = t.careers;
  useSeo(t.meta.careers.title, t.meta.careers.description);
  const mail = `mailto:${company.email}?subject=${encodeURIComponent(c.apply.subject)}`;
  return (
    <>
      <PageHero
        label={c.hero.label}
        title={<>{c.hero.title[0]} <span className="accent">{c.hero.title[1]}</span></>}
        actions={
          <>
            <a href={mail} className="btn-primary w-full sm:w-auto"><Mail size={14} /> {c.hero.resume}</a>
            <a href={waLink(c.apply.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ghost hidden sm:inline-flex"><MessageCircle size={14} /> {c.hero.ask}</a>
          </>
        }
      >
        {c.hero.lead}
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIntro num="01" label={c.path.label} title={<>{c.path.title[0]} <span className="accent">{c.path.title[1]}</span></>} />
            <Reveal className="mt-8 hidden lg:block"><ScrollCue label={c.path.cue} /></Reveal>
          </div>
          <div className="md:pb-20 lg:col-span-8 lg:pt-10">
            <GrowthPath />
          </div>
        </div>
      </section>

      <section className="section cv-auto border-t border-ink/10 dark:border-white/10">
        <div className="wrap grid gap-4 lg:grid-cols-2">
          <ListCard num="02" label={c.whyLabel} items={c.why} />
          <ListCard num="03" label={c.whoLabel} items={c.who} accent />
        </div>
      </section>

      <section className="pb-14 sm:pb-28">
        <div className="wrap">
          <Reveal className="sky-wash flex flex-col gap-6 rounded-[2rem] border border-ink/[0.06] p-7 sm:p-12 md:flex-row md:items-center md:justify-between dark:border-white/10">
            <div>
              <p className="label">{c.apply.label}</p>
              <h2 className="h-section mt-3">{c.apply.title[0]} <span className="accent">{c.apply.title[1]}</span></h2>
              <p className="muted mt-3 max-w-xl">{c.apply.text}</p>
            </div>
            <a href={mail} className="btn-primary shrink-0"><Mail size={14} /> {c.apply.button}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ListCard({ num, label, items, accent = false }: { num: string; label: string; items: readonly string[]; accent?: boolean }) {
  return (
    <Reveal className={`card p-6 sm:p-10 ${accent ? 'card-accent' : ''}`}>
      <p className="label"><span className="label-accent">{num}</span> · {label}</p>
      <ul className="mt-5">
        {items.map((w) => (
          <li key={w} className="flex items-center gap-3 border-t border-ink/10 py-3.5 dark:border-white/10">
            <Check size={16} className="shrink-0 text-brand-700 dark:text-brand-300" />
            <span className="text-ink dark:text-white">{w}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
