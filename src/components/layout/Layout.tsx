import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileContactBar } from './MobileContactBar';
import { ScrollProgress } from './ScrollProgress';

/** New page → jump to top instantly; URL with #hash → scroll to that element once it renders. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let raf = 0;
    const find = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start' });
      else if (tries++ < 40) raf = requestAnimationFrame(find);
    };
    find();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col pb-safe md:pb-0">
      <ScrollManager />
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-[80vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}
