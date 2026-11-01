import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { BalanceScale } from '../components/motion/BalanceScale';
import { MathField } from '../components/motion/MathField';

export default function NotFound() {
  useSeo('Page not found', 'The page you were looking for does not exist.');
  return (
    <section className="sky-wash relative flex min-h-[85vh] items-center overflow-hidden pb-20 pt-32">
      <MathField />
      <div className="wrap relative text-center">
        <BalanceScale className="mx-auto h-36 w-auto" />
        <p className="label mt-8"><span className="label-accent">404</span> · Unreconciled item</p>
        <h1 className="h-display mx-auto mt-4 max-w-3xl text-5xl sm:text-7xl">This page <span className="accent">didn't balance.</span></h1>
        <p className="lead mx-auto mt-5 max-w-lg">The link may be old or mistyped. Let's get you back to something useful.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">Go to home</Link>
          <Link to="/contact" className="btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
