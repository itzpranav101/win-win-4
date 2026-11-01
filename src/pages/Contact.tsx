import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Copy, Mail, MessageCircle, Phone } from 'lucide-react';
import { company, enquiryServices, waLink } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { formatTime, useLiveClock } from '../hooks/useLiveClock';
import { Reveal } from '../components/ui/Reveal';
import { MathField } from '../components/motion/MathField';
import { SentGraphic } from '../components/motion/SentGraphic';
import { EASE_OUT } from '../lib/ease';

const EMPTY = { name: '', email: '', company: '', service: enquiryServices[0] as string, message: '' };

export default function Contact() {
  useSeo('Contact', 'Contact Win-Win Business Solutions in Madurai about accounting, audit, payroll, GST, tax and compliance support.');
  const [form, setForm] = useState(EMPTY);
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const now = useLiveClock();

  const update = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const body = () =>
    [`Name: ${form.name}`, `Email: ${form.email}`, form.company ? `Company: ${form.company}` : null, `Service: ${form.service}`, '', 'Requirement and timeline:', form.message, '', '— Sent from the Win-Win website']
      .filter((l) => l !== null)
      .join('\n');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const href = `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry — ${form.service}`)}&body=${encodeURIComponent(body())}`;
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

  const reset = () => {
    setDraft(null);
    setForm(EMPTY);
  };

  return (
    <>
      <section className="sky-wash relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <MathField />
        <div className="wrap relative">
          <p className="label animate-fade-up">Contact</p>
          <h1 className="h-display mt-6 max-w-4xl animate-fade-up text-[2.6rem] leading-[1] [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]">
            Let's talk about <span className="accent">the work.</span>
          </h1>
          <p className="lead mt-6 max-w-xl animate-fade-up [animation-delay:160ms]">Tell us what you need, the timing and the volume. We usually reply within one business day with the next practical step.</p>
          <dl className="mt-10 grid max-w-xl animate-fade-up grid-cols-2 border-t border-ink/15 [animation-delay:240ms] dark:border-white/15">
            <div className="pr-4 pt-4">
              <dt className="label">Madurai · IST</dt>
              <dd className="mt-1 font-display text-3xl font-light tabular-nums">{formatTime(now, 'Asia/Kolkata')}</dd>
            </div>
            <div className="border-l border-ink/10 pl-5 pt-4 dark:border-white/10">
              <dt className="label">Singapore · SGT</dt>
              <dd className="mt-1 font-display text-3xl font-light tabular-nums text-brand-800 dark:text-brand-300">{formatTime(now, 'Asia/Singapore')}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="label">Reach us directly</p>
            <ul className="mt-4 border-t border-ink/15 dark:border-white/15">
              <ContactRow href={`mailto:${company.email}`} icon={<Mail size={18} strokeWidth={1.5} />} label="Email" value={company.email} />
              <ContactRow href={waLink('Hi Win-Win, we would like to enquire about your accounting support services.')} external icon={<MessageCircle size={18} strokeWidth={1.5} />} label="WhatsApp" value={company.phoneDisplay} />
              <ContactRow href={`tel:${company.phoneTel}`} icon={<Phone size={18} strokeWidth={1.5} />} label="Phone" value={company.phoneDisplay} />
            </ul>

            <Reveal className="card mt-10 hidden p-7 sm:block">
              <p className="label">Registered office</p>
              <p className="mt-3 font-display text-xl font-light">{company.legalName}</p>
              <address className="muted mt-2 not-italic leading-relaxed">{company.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="link mt-4 inline-flex items-center gap-1 text-sm">Open in Google Maps <ArrowUpRight size={14} /></a>
            </Reveal>
            <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="label mt-6 inline-flex items-center gap-1 sm:hidden">Madurai, Tamil Nadu · Open in Maps <ArrowUpRight size={12} /></a>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              {!draft ? (
                <m.form key="form" onSubmit={submit} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: EASE_OUT }} className="card p-6 sm:p-10" aria-describedby="form-note">
                  <p className="label"><span className="label-accent">Enquiry</span> · Takes about a minute</p>
                  <h2 className="h-display mt-3 text-3xl sm:text-4xl">Tell us what <span className="accent">you need.</span></h2>
                  <p id="form-note" className="muted mt-3 text-sm">Sending opens a pre-filled email in your own mail app — nothing is stored on this website.</p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Your name"><input id="name" name="name" required autoComplete="name" className="field" value={form.name} onChange={update('name')} placeholder="Samuel Lim" /></Field>
                    <Field id="email" label="Work email"><input id="email" name="email" type="email" required autoComplete="email" inputMode="email" className="field" value={form.email} onChange={update('email')} placeholder="samuel@firm.sg" /></Field>
                    <Field id="company" label="Company" optional><input id="company" name="company" autoComplete="organization" className="field" value={form.company} onChange={update('company')} placeholder="Lim & Partners" /></Field>
                    <Field id="service" label="Support needed">
                      <div className="relative">
                        <select id="service" name="service" className="field appearance-none pr-10" value={form.service} onChange={update('service')}>
                          {enquiryServices.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50 dark:text-white/50" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                      </div>
                    </Field>
                    <Field id="message" label="Requirement and timeline" className="sm:col-span-2">
                      <textarea id="message" name="message" required rows={5} minLength={10} className="field resize-y" value={form.message} onChange={update('message')} placeholder="e.g. Monthly bookkeeping for 8 entities, GST support, payroll schedule review, expected timeline and preferred templates." />
                    </Field>
                  </div>

                  <p className="mt-6 border-l-2 border-amber-500 pl-4 text-sm text-ink-soft dark:text-slate-300">
                    Please don't include financial records or client files here. We'll agree a secure channel once the work is scoped.
                  </p>
                  <button type="submit" className="btn-primary mt-8 w-full sm:w-auto"><Mail size={14} /> Open email draft</button>
                </m.form>
              ) : (
                <m.div key="sent" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE_OUT }} className="card flex flex-col items-center p-8 text-center sm:p-12" role="status">
                  <SentGraphic />
                  <p className="label mt-6">Draft ready</p>
                  <h2 className="h-display mt-3 text-3xl sm:text-4xl">Now press <span className="accent">send.</span></h2>
                  <p className="muted mt-3 max-w-md">Thanks, {form.name.trim().split(' ')[0] || 'there'}. Your email draft should be open in your mail app. If it didn't open, use one of the options below.</p>
                  <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <a href={draft} className="btn-primary"><Mail size={14} /> Open draft again</a>
                    <button type="button" onClick={copy} className="btn-ghost"><Copy size={14} /> {copied ? 'Copied' : 'Copy message'}</button>
                  </div>
                  <span aria-live="polite" className="sr-only">{copied ? 'Message copied to clipboard' : ''}</span>
                  <button type="button" onClick={reset} className="link mt-6 text-sm">Start a new enquiry</button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ id, label, optional, className = '', children }: { id: string; label: string; optional?: boolean; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex justify-between font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink/70 dark:text-white/60">
        {label}
        {optional && <span className="text-ink/45 dark:text-white/40">Optional</span>}
      </label>
      {children}
    </div>
  );
}

function ContactRow({ href, icon, label, value, external }: { href: string; icon: ReactNode; label: string; value: string; external?: boolean }) {
  return (
    <li className="border-b border-ink/10 dark:border-white/10">
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4 py-5">
        <span className="text-brand-800 dark:text-brand-300">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="label block">{label}</span>
          <span className="mt-0.5 block truncate font-display text-2xl font-light tracking-[-0.02em] transition group-hover:text-brand-800 dark:group-hover:text-brand-300">{value}</span>
        </span>
        <ArrowUpRight size={18} className="shrink-0 text-ink/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-800 dark:text-white/40 dark:group-hover:text-brand-300" />
      </a>
    </li>
  );
}
