import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { company, nav } from '../../content/site';
import { useTheme } from '../../hooks/useTheme';
import { EASE_MENU, EASE_OUT } from '../../lib/ease';
import { Logo } from '../ui/Logo';

const pill =
  'inline-flex h-11 items-center gap-2.5 rounded-full bg-ink/[0.06] px-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition hover:bg-ink/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15';

const links = [...nav, { to: '/contact', label: 'Contact' }];

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // While the menu is open: lock scroll, make the page behind it inert, manage focus, Esc closes.
  useEffect(() => {
    const behind = [document.getElementById('main'), document.getElementById('site-footer'), document.getElementById('quick-contact')];
    behind.forEach((el) => el?.toggleAttribute('inert', open));
    if (open) {
      wasOpen.current = true;
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const raf = requestAnimationFrame(() => firstLink.current?.focus());
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = prev;
        cancelAnimationFrame(raf);
        window.removeEventListener('keydown', onKey);
      };
    }
    if (wasOpen.current) menuBtn.current?.focus();
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-white">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled && !open ? 'bg-white/85 shadow-[0_1px_0_rgb(10_10_10/0.06)] backdrop-blur-md dark:bg-night/85 dark:shadow-[0_1px_0_rgb(255_255_255/0.06)]' : ''}`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggle} className={pill} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
              <span aria-hidden className="relative h-4 w-4 overflow-hidden rounded-full border border-current">
                <span className={`absolute inset-y-0 right-0 bg-current transition-all duration-500 ${theme === 'dark' ? 'w-full' : 'w-1/2'}`} />
              </span>
              <span className="hidden sm:inline">Theme</span>
            </button>
            <Link to="/contact" className={`${pill} hidden md:inline-flex`}>Contact</Link>
            <button ref={menuBtn} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu" className={pill}>
              <span aria-hidden className="relative h-2.5 w-4">
                <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? 'top-1 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? 'top-1 -rotate-45' : 'top-2'}`} />
              </span>
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE_MENU }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white pt-[calc(var(--header-h)+env(safe-area-inset-top))] dark:bg-night"
          >
            <div className="wrap grid min-h-full gap-12 pb-12 pt-4 lg:grid-cols-12">
              <nav aria-label="Main" className="lg:col-span-8">
                <ul>
                  {links.map((n, i) => (
                    <m.li key={n.to} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.05, duration: 0.6, ease: EASE_OUT }} className="border-b border-ink/10 dark:border-white/10">
                      <NavLink ref={i === 0 ? firstLink : undefined} to={n.to} end={n.to === '/'} className="group flex items-baseline gap-5 rounded-md py-3 sm:py-4">
                        {({ isActive }) => (
                          <>
                            <span className="w-8 font-mono text-xs text-brand-800 dark:text-brand-300">0{i + 1}</span>
                            <span className={`font-display text-[2.5rem] font-light leading-none tracking-[-0.035em] transition-colors sm:text-6xl lg:text-7xl ${isActive ? 'italic text-brand-800 dark:text-brand-300' : 'text-ink group-hover:italic group-hover:text-brand-800 dark:text-white dark:group-hover:text-brand-300'}`}>
                              {n.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </m.li>
                  ))}
                </ul>
              </nav>
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col justify-end gap-6 lg:col-span-4">
                <div>
                  <p className="label">Write to us</p>
                  <a href={`mailto:${company.email}`} className="mt-2 inline-flex items-center gap-2 break-all font-display text-2xl font-light">{company.email} <ArrowUpRight size={18} className="shrink-0" /></a>
                </div>
                <div>
                  <p className="label">Call or WhatsApp</p>
                  <a href={`tel:${company.phoneTel}`} className="mt-2 inline-block font-display text-2xl font-light">{company.phoneDisplay}</a>
                </div>
                <p className="label hidden sm:block">Madurai · Tamil Nadu · India</p>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
