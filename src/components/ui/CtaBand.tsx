import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { waLink } from '../../content/site';
import { Reveal } from './Reveal';
import { LEDGER_FORMULAS, MathField } from '../motion/MathField';

export function CtaBand({ title, text = 'Tell us the work type, timing and volume. We usually reply within one business day with the next practical step.' }: { title?: React.ReactNode; text?: string }) {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="wrap">
        <Reveal className="sky-wash relative overflow-hidden rounded-[2rem] border border-ink/[0.06] px-6 py-16 text-center sm:px-12 sm:py-24 dark:border-white/10">
          <MathField rulers={false} formulas={LEDGER_FORMULAS} />
          <div className="relative">
            <p className="label">Start a conversation</p>
            <h2 className="h-section mx-auto mt-4 max-w-3xl">{title ?? <>Have a busy period <span className="accent">coming up?</span></>}</h2>
            <p className="lead mx-auto mt-5 max-w-xl">{text}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary w-full max-w-[18rem] sm:w-auto">Start an enquiry <ArrowRight size={14} /></Link>
              <a href={waLink('Hi Win-Win, we would like to enquire about your accounting support services.')} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full max-w-[18rem] sm:w-auto">WhatsApp us</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
