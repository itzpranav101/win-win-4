import { Link, useLocation } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { company, waLink } from '../../content/site';
import { useT } from '../../i18n';

/** Thumb-reachable quick actions — phones only, hidden on the contact page itself. */
export function MobileContactBar() {
  const t = useT();
  const { pathname } = useLocation();
  if (pathname === '/contact') return null;
  const item = 'flex min-h-[56px] flex-1 items-center justify-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em]';
  return (
    <nav id="quick-contact" aria-label={t.common.quickContact} className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-white/95 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-night/95" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex divide-x divide-ink/10 dark:divide-white/10">
        <a href={`tel:${company.phoneTel}`} className={`${item} text-ink dark:text-white`}><Phone size={15} />{t.common.call}</a>
        <a href={waLink(t.common.waEnquiry)} target="_blank" rel="noopener noreferrer" className={`${item} text-ink dark:text-white`}><MessageCircle size={15} />{t.common.whatsapp}</a>
        <Link to="/contact" className={`${item} bg-brand-900 text-white dark:bg-brand-300 dark:text-night`}><Mail size={15} />{t.common.enquire}</Link>
      </div>
    </nav>
  );
}
