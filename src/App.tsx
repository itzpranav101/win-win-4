import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { PerfProvider } from './lib/perf';
import { I18nProvider } from './i18n';
import type { Dict } from './i18n/en';
import type { LangCode } from './i18n/languages';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';

// Home ships in the entry bundle; every other page is fetched on demand.
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

// The animation engine loads after first paint; `strict` forbids heavyweight `motion.*` imports.
const loadMotion = () => import('./lib/motionFeatures').then((mod) => mod.default);

export default function App({ lang, dict }: { lang: LangCode; dict: Dict }) {
  return (
    <I18nProvider initial={lang} dict={dict}>
    <PerfProvider>
      <LazyMotion features={loadMotion} strict>
        <MotionConfig reducedMotion="user">
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="about" element={<About />} />
                <Route path="team" element={<Team />} />
                <Route path="careers" element={<Careers />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<Legal kind="privacy" />} />
                <Route path="terms" element={<Legal kind="terms" />} />
                <Route path="data-protection" element={<Legal kind="data-protection" />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </PerfProvider>
    </I18nProvider>
  );
}
