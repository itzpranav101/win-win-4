import { Link } from 'react-router-dom';
import { company } from '../content/site';
import { useSeo } from '../hooks/useSeo';
import { useT } from '../i18n';

type Kind = 'privacy' | 'terms' | 'data-protection';

const docs: Record<Kind, { title: string; date: string; sections: [string, string][] }> = {
  privacy: {
    title: 'Privacy Policy',
    date: 'Last updated 29 May 2026',
    sections: [
      ['Who we are', `${company.legalName} is a back-office support provider in Madurai, India, supporting ${company.parent} with accounting, bookkeeping, audit documentation, payroll, tax and regulatory work.`],
      ['What this website collects', 'This website does not collect financial records, bank data or client ledger files, and does not store form entries. The enquiry form opens a pre-filled email in your own mail app. We receive enquiry details (name, email, service interest, message) and career details (resumes, cover notes) only when you send them to us.'],
      ['How we use information', 'To respond to enquiries, discuss requirements, evaluate applications and maintain business correspondence. Service work is handled under separate client instructions.'],
      ['Confidentiality', 'Client and applicant information is never sold or shared for advertising. Access is limited to people who need it for the relevant enquiry, application or assignment.'],
      ['Updates', 'We may update this policy as our website, services or legal requirements change. The latest version will always be shown here.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    date: 'Effective 29 May 2026',
    sections: [
      ['Use of this website', `By using this website you agree to these terms. It provides general information about ${company.legalName} and our back-office support services.`],
      ['Scope of services', `We provide accounting, bookkeeping, non-attest audit support, payroll, tax and regulatory preparation from Madurai for business clients served through ${company.parent}. Final review, professional judgement, client advice, filing decisions and statutory sign-off remain with the responsible professional team.`],
      ['Website content', 'Content on this website is general information. It is not accounting, tax, legal or audit advice to any end client.'],
      ['Client files and workpapers', 'Client records, workpapers and source files remain the property of the client firm or its end client, and are used only for the agreed assignment.'],
      ['Governing law', 'These terms are governed by the laws of India. Disputes connected with an engagement are handled under the applicable agreement and jurisdiction.'],
    ],
  },
  'data-protection': {
    title: 'Data Protection',
    date: 'For Singapore-related support work (PDPA)',
    sections: [
      ['Data intermediary role', 'When we process personal data for client support work under written instructions, we act as a data intermediary for the responsible entity or client firm.'],
      ['Access controls', 'Access to client information is restricted to assigned team members, who follow confidentiality, clean-desk and information-handling procedures.'],
      ['Working channels', 'Work is handled through client-approved systems, remote access tools or agreed file-sharing methods. Financial records should never be sent via the public website.'],
      ['Retention', 'Retention and deletion of assignment files follow the responsible client’s instructions and the engagement terms.'],
      ['Incident communication', 'If we become aware of a suspected data incident connected with client work, we notify the responsible client contact so it can assess any required action.'],
    ],
  },
};

export default function Legal({ kind }: { kind: Kind }) {
  const d = docs[kind];
  const t = useT();
  const kinds = Object.keys(docs) as Kind[];
  const title = (k: Kind) => t.legal.tabs[kinds.indexOf(k)];
  useSeo(title(kind), `${title(kind)} — ${company.name}.`);
  return (
    <article className="wrap max-w-4xl pb-24 pt-32 sm:pt-40">
      <nav aria-label="Legal documents" className="flex flex-wrap gap-2">
        {(Object.keys(docs) as Kind[]).map((k) => (
          <Link key={k} to={`/${k}`} aria-current={k === kind ? 'page' : undefined} className={`rounded-full px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] transition ${k === kind ? 'bg-brand-900 text-white dark:bg-brand-300 dark:text-night' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 dark:bg-white/10 dark:text-white/70'}`}>
            {title(k)}
          </Link>
        ))}
      </nav>
      <p className="label mt-14">{d.date}</p>
      <h1 className="h-display mt-3 text-5xl sm:text-6xl">{title(kind)}</h1>
      {kind && t.legal.englishNote !== 'This document is provided in English.' && <p className="muted mt-3 text-sm">{t.legal.englishNote}</p>}
      <div className="mt-12 border-t border-ink/15 dark:border-white/15">
        {d.sections.map(([h, p], i) => (
          <section key={h} className="grid gap-3 border-b border-ink/10 py-8 sm:grid-cols-12 dark:border-white/10">
            <h2 className="flex gap-3 font-display text-2xl font-light sm:col-span-4">
              <span className="font-mono text-xs leading-8 text-brand-800 dark:text-brand-300">0{i + 1}</span>
              {h}
            </h2>
            <p className="leading-relaxed text-ink-soft sm:col-span-8 dark:text-slate-300">{p}</p>
          </section>
        ))}
      </div>
      <p className="muted mt-10 text-sm">{t.legal.questions} <a className="link" href={`mailto:${company.email}`}>{company.email}</a>.</p>
    </article>
  );
}
