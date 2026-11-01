import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { useT } from '../i18n';
import { BalanceScale } from '../components/motion/BalanceScale';
import { MathField } from '../components/motion/MathField';

export default function NotFound() {
  const t = useT();
  const n = t.notFound;
  useSeo(t.meta.notFound.title, t.meta.notFound.description);
  return (
    <section className="sky-wash relative flex min-h-[85vh] items-center overflow-hidden pb-20 pt-32">
      <MathField />
      <div className="wrap relative text-center">
        <BalanceScale className="mx-auto h-36 w-auto" />
        <p className="label mt-8"><span className="label-accent">404</span> · {n.label}</p>
        <h1 className="h-display mx-auto mt-4 max-w-3xl text-5xl sm:text-7xl">{n.title[0]} <span className="accent">{n.title[1]}</span></h1>
        <p className="lead mx-auto mt-5 max-w-lg">{n.text}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">{n.home}</Link>
          <Link to="/contact" className="btn-ghost">{n.contact}</Link>
        </div>
      </div>
    </section>
  );
}
