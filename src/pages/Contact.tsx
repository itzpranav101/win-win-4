import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Copy, Mail, MessageCircle, Phone } from 'lucide-react';
import { company, waLink } from '../content/site';
import { useT } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { formatTime, useLiveClock } from '../hooks/useLiveClock';
import { Reveal } from '../components/ui/Reveal';
import { MathField } from '../components/motion/MathField';
import { SentGraphic } from '../components/motion/SentGraphic';
import { EASE_OUT } from '../lib/ease';

export default function Contact() {
  const t = useT();
  const c = t.contact;
  const f = c.form;
  useSeo(t.meta.contact.title, t.meta.contact.description);
  const empty = { name: '', email: '', company: '', service: 0, message: '' };
  const [form, setForm] = useState(empty);
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const now = useLiveClock();

  const set = (k: 'name' | 'email' | 'company' | 'message') => (e: { target: { value: string } }) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const service = f.options[form.service];

  const body = () =>
    [`${c.mail.name}: ${form.name}`, `${c.mail.email}: ${form.email}`, form.company ? `${c.mail.company}: ${form.company}` : null, `${c.mail.service}: ${service}`, '', `${c.mail.need}:`, form.message, '', `— ${c.mail.footer}`]
      .filter((l) => l !== null)
      .join('\n');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const href = `mailto:${company.email}?subject=${encodeURIComponent(`${c.mail.subject} — ${service}`)}&body=${encodeURIComponent(body())}`;
    setDraft(href);
    window.location.href = href;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${company.email}\n\n${body()}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the mail button still works */
    }
  };

  return (
    <>
      <section className="sky-wash relative overflow-hidden pb-12 pt-28 sm:pb-20 sm:pt-40">
        <MathField />
        <div className="wrap relative">
          <p className="label animate-fade-up">{c.label}</p>
          <h1 className="h-display mt-6 max-w-4xl animate-fade-up text-[2.6rem] leading-[1] [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]">
            {c.title[0]} <span className="accent">{c.title[1]}</span>
          </h1>
          <p className="lead mt-6 max-w-xl animate-fade-up [animation-delay:160ms]">{c.lead}</p>
          <dl className="mt-8 grid max-w-md animate-fade-up grid-cols-2 border-t border-ink/15 [animation-delay:240ms] sm:mt-10 dark:border-white/15">
            <div className="pr-4 pt-4">
              <dt className="label">{c.clocks[0]}</dt>
              <dd className="mt-1 font-display text-3xl font-light tabular-nums">{formatTime(now, 'Asia/Kolkata')}</dd>
            </div>
            <div className="border-l border-ink/10 pl-5 pt-4 dark:border-white/10">
              <dt className="label">{c.clocks[1]}</dt>
              <dd className="mt-1 font-display text-3xl font-light tabular-nums text-brand-800 dark:text-brand-300">{formatTime(now, 'Asia/Singapore')}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="pb-14 sm:pb-28">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="label">{c.direct}</p>
            <ul className="mt-3 border-t border-ink/15 dark:border-white/15">
              <ContactRow href={`mailto:${company.email}`} icon={<Mail size={18} strokeWidth={1.5} />} label={c.email} value={company.email} />
              <ContactRow href={waLink(t.common.waEnquiry)} external icon={<MessageCircle size={18} strokeWidth={1.5} />} label={t.common.whatsapp} value={company.phoneDisplay} />
              <ContactRow href={`tel:${company.phoneTel}`} icon={<Phone size={18} strokeWidth={1.5} />} label={c.phone} value={company.phoneDisplay} />
            </ul>

            <Reveal className="card mt-8 hidden p-7 sm:block">
              <p className="label">{c.office}</p>
              <p className="mt-3 font-display text-xl font-light">{company.legalName}</p>
              <address className="muted mt-2 not-italic leading-relaxed">{company.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-4 inline-flex items-center gap-1 text-sm">{c.maps} <ArrowUpRight size={14} /></a>
            </Reveal>
            <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="label mt-5 inline-flex items-center gap-1 sm:hidden">{c.mapsShort} <ArrowUpRight size={12} /></a>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              {!draft ? (
                <m.form key="form" onSubmit={submit} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: EASE_OUT }} className="card p-5 sm:p-10" aria-describedby="form-note">
                  <p className="label"><span className="label-accent">{f.label}</span> · {f.time}</p>
                  <h2 className="h-display mt-3 text-3xl sm:text-4xl">{f.title[0]} <span className="accent">{f.title[1]}</span></h2>
                  <p id="form-note" className="muted mt-2 text-sm">{f.note}</p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field id="name" label={f.name}><input id="name" name="name" required autoComplete="name" className="field" value={form.name} onChange={set('name')} placeholder={f.namePlaceholder} /></Field>
                    <Field id="email" label={f.emailField}><input id="email" name="email" type="email" required autoComplete="email" inputMode="email" className="field" value={form.email} onChange={set('email')} placeholder={f.emailPlaceholder} /></Field>
                    <Field id="company" label={f.company} optional={f.optional}><input id="company" name="company" autoComplete="organization" className="field" value={form.company} onChange={set('company')} placeholder={f.companyPlaceholder} /></Field>
                    <Field id="service" label={f.service}>
                      <div className="relative">
                        <select id="service" name="service" className="field appearance-none pr-10" value={form.service} onChange={(e) => setForm((s) => ({ ...s, service: Number(e.target.value) }))}>
                          {f.options.map((o, i) => <option key={i} value={i}>{o}</option>)}
                        </select>
                        <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50 dark:text-white/50" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                      </div>
                    </Field>
                    <Field id="message" label={f.message} className="sm:col-span-2">
                      <textarea id="message" name="message" required rows={5} minLength={10} className="field resize-y" value={form.message} onChange={set('message')} placeholder={f.messagePlaceholder} />
                    </Field>
                  </div>

                  <p className="mt-5 border-l-2 border-amber-500 pl-4 text-sm text-ink-soft dark:text-slate-300">{f.warning}</p>
                  <button type="submit" className="btn-primary mt-7 w-full sm:w-auto"><Mail size={14} /> {f.submit}</button>
                </m.form>
              ) : (
                <m.div key="sent" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE_OUT }} className="card flex flex-col items-center p-8 text-center sm:p-12" role="status">
                  <SentGraphic />
                  <p className="label mt-6">{c.sent.label}</p>
                  <h2 className="h-display mt-3 text-3xl sm:text-4xl">{c.sent.title[0]} <span className="accent">{c.sent.title[1]}</span></h2>
                  <p className="muted mt-3 max-w-md">{c.sent.thanks}</p>
                  <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <a href={draft} className="btn-primary"><Mail size={14} /> {c.sent.again}</a>
                    <button type="button" onClick={copy} className="btn-ghost"><Copy size={14} /> {copied ? c.sent.copied : c.sent.copy}</button>
                  </div>
                  <span aria-live="polite" className="sr-only">{copied ? c.sent.copiedAnnounce : ''}</span>
                  <button type="button" onClick={() => { setDraft(null); setForm(empty); }} className="link mt-6 text-sm">{c.sent.restart}</button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ id, label, optional, className = '', children }: { id: string; label: string; optional?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex justify-between font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink/70 dark:text-white/60">
        {label}
        {optional && <span className="text-ink/45 dark:text-white/40">{optional}</span>}
      </label>
      {children}
    </div>
  );
}

function ContactRow({ href, icon, label, value, external }: { href: string; icon: ReactNode; label: string; value: string; external?: boolean }) {
  return (
    <li className="border-b border-ink/10 dark:border-white/10">
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4 py-4 sm:py-5">
        <span className="text-brand-800 dark:text-brand-300">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="label block">{label}</span>
          <span className="mt-0.5 block truncate font-display text-xl font-light tracking-[-0.02em] transition group-hover:text-brand-800 sm:text-2xl dark:group-hover:text-brand-300">{value}</span>
        </span>
        <ArrowUpRight size={18} className="shrink-0 text-ink/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-800 dark:text-white/40 dark:group-hover:text-brand-300" />
      </a>
    </li>
  );
}
