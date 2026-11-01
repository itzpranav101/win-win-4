import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { company, NAV, SERVICE_IDS } from '../../content/site';
import { useT } from '../../i18n';
import { Logo } from '../ui/Logo';

export function Footer() {
  const t = useT();
  const legal = [
    { to: '/privacy', label: t.footer.privacy },
    { to: '/terms', label: t.footer.terms },
    { to: '/data-protection', label: t.footer.dataProtection },
  ];
  return (
    <footer id="site-footer" className="cv-auto border-t border-ink/10 bg-[#f6f6f3] dark:border-white/10 dark:bg-night-card">
      <div className="wrap py-12 sm:py-24">
        <p className="h-display hidden max-w-4xl text-6xl leading-[1.02] sm:block">
          {t.footer.line1} <span className="accent">{t.footer.line2}</span>
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 sm:border-t sm:border-ink/15 sm:pt-10 lg:grid-cols-12 dark:sm:border-white/15">
          <div className="col-span-2 lg:col-span-4">
            <Logo tag={false} />
            <ul className="mt-6 space-y-2 text-[0.95rem]">
              <li><a href={`mailto:${company.email}`} className="link">{company.email}</a></li>
              <li><a href={`tel:${company.phoneTel}`} className="hover:text-brand-800 dark:hover:text-brand-300">{company.phoneDisplay}</a></li>
              <li className="muted">{t.common.location}</li>
            </ul>
          </div>
          <FooterCol className="lg:col-span-2" title={t.footer.company} links={[...NAV.slice(1).map((n) => ({ to: n.to, label: t.nav[n.key] })), { to: '/contact', label: t.nav.contact }]} />
          <FooterCol className="hidden sm:block lg:col-span-3" title={t.footer.services} links={SERVICE_IDS.map((id, i) => ({ to: `/services#${id}`, label: t.services.names[i] }))} />
          <div className="lg:col-span-3">
            <FooterCol title={t.footer.legal} links={legal} />
            <p className="label mt-8">CIN</p>
            <p className="mt-1 break-all font-mono text-xs text-ink/70 dark:text-white/60">{company.cin}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <p className="label !tracking-[0.12em]">© {new Date().getFullYear()} {company.legalName}</p>
          <p className="label hidden !tracking-[0.12em] lg:block">{t.footer.note}</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="pill self-start !py-2 hover:!border-ink/40 sm:self-auto">
            {t.footer.top} <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = '' }: { title: string; links: readonly { to: string; label: string }[]; className?: string }) {
  return (
    <div className={className}>
      <p className="label">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.to}><Link to={l.to} className="text-ink-soft transition hover:text-brand-800 dark:text-slate-300 dark:hover:text-brand-300">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
