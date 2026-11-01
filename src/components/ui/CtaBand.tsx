import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { waLink } from '../../content/site';
import { useT } from '../../i18n';
import { Reveal } from './Reveal';
import { ledgerFormulas, MathField } from '../motion/MathField';

/** Closing call to action. `title` = [plain, accent]. */
export function CtaBand({ title, text }: { title?: readonly string[]; text?: string }) {
  const t = useT();
  const [plain, accent] = title ?? t.cta.title;
  return (
    <section className="pb-14 sm:pb-28">
      <div className="wrap">
        <Reveal className="sky-wash relative overflow-hidden rounded-[2rem] border border-ink/[0.06] px-5 py-12 text-center sm:px-12 sm:py-24 dark:border-white/10">
          <MathField rulers={false} formulas={ledgerFormulas(t.cta.formulas)} />
          <div className="relative">
            <p className="label">{t.cta.label}</p>
            <h2 className="h-section mx-auto mt-4 max-w-3xl">{plain} <span className="accent">{accent}</span></h2>
            <p className="lead mx-auto mt-5 max-w-xl">{text ?? t.cta.text}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary w-full max-w-[18rem] sm:w-auto">{t.common.startEnquiry} <ArrowRight size={14} /></Link>
              <a href={waLink(t.common.waEnquiry)} target="_blank" rel="noopener noreferrer" className="btn-ghost hidden sm:inline-flex">{t.common.whatsappUs}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
