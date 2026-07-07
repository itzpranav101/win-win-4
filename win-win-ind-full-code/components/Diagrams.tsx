/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  FileText, X, SearchCheck, Users, Scale, ExternalLink
} from 'lucide-react';

// FONT CONSTANTS
const FONT_TITLE = "font-serif font-bold";
const FONT_BODY = "font-sans";
const FONT_ACCENT = "font-sans font-bold uppercase tracking-[0.22em]";

// SIZE CONSTANTS - Refined
const SIZE_TITLE = "text-xl md:text-2xl";
const SIZE_STANDARD = "text-sm md:text-base";

interface RichDetail {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  overview: string;
  whoNeeds: string;
  whyItMatters: string;
  process: string[];
  scope?: string[];
  disclaimer?: string;
}

const services: RichDetail[] = [
  {
    id: 'accounting-support',
    title: 'Accounting & Bookkeeping Support',
    icon: <FileText className="w-5 h-5" />,
    summary: 'Day-to-day bookkeeping, ledger maintenance, and financial reporting aligned with SFRS.',
    overview: 'We help keep routine accounting work moving for businesses, from ledger updates to management accounts and year-end support.',
    whoNeeds: 'Businesses that need recurring bookkeeping support, month-end preparation help, or extra capacity before review and reporting deadlines.',
    whyItMatters: 'Clean books reduce review time and make audit, tax, and management reporting work easier to complete.',
    process: [
      'Receive ledger exports, templates and prior-period references through the agreed workflow',
      'Prepare bookkeeping entries, reconciliations, and schedules',
      'Flag missing items, unusual balances, and review points clearly',
      'Return files in the agreed format for review'
    ],
    scope: [
        'Day-to-day bookkeeping and ledger maintenance',
        'Bank, creditor, and debtor reconciliations',
        'Preparation of monthly, quarterly, and annual management accounts',
        'Trial balance review and mapping',
        'Year-end financial statement preparation in accordance with SFRS'
    ]
  },
  {
    id: 'audit-support',
    title: 'Audit Support Services',
    icon: <SearchCheck className="w-5 h-5" />,
    summary: 'Non-attest working paper preparation and indexed audit file documentation.',
    overview: 'We prepare schedules, supporting working papers, and audit file documentation for review.',
    whoNeeds: 'Audit practices that need help preparing schedules, indexing files, and organizing working papers during busy audit periods.',
    whyItMatters: 'Well-organized working papers help reviewers trace figures faster and keep audit files easier to follow.',
    process: [
      'Confirm the audit file structure, template and requested support areas',
      'Prepare schedules, lead sheets, references, and support extracts',
      'Note exceptions, missing records, and open queries for review',
      'Deliver organized files for the reviewer’s final judgment'
    ],
    scope: [
        'Audit planning support and documentation',
        'Preparation of audit working papers and schedules',
        'Substantive testing, analytical procedures, and sampling support',
        'Lead schedules and cross-referencing',
        'Audit file collation and indexing'
    ],
    disclaimer: 'Audit support is non-attest preparation work. Final judgment and sign-off remain with the responsible professional.'
  },
  {
    id: 'payroll-compliance',
    title: 'Payroll & Statutory Compliance Support',
    icon: <Users className="w-5 h-5" />,
    summary: 'CPF computation, MOM documentation assistance, and statutory deduction workings.',
    overview: 'We support payroll calculations and related statutory workings based on information provided through the agreed workflow.',
    whoNeeds: 'Businesses managing recurring payroll support, statutory workings, leave calculations or deduction schedules.',
    whyItMatters: 'Payroll support needs careful handling because small errors can affect employees, CPF records and client confidence.',
    process: [
      'Receive payroll inputs, employee changes, and cut-off dates',
      'Prepare salary, CPF, leave, overtime, and deduction workings',
      'Check totals against prior periods and client-provided data',
      'Return payroll support files for review before processing or filing'
    ],
    scope: [
        'Payroll processing support based on client-provided data',
        'CPF computation, schedules, and reconciliation support',
        'Leave, overtime, and statutory deduction workings',
        'Assistance with MOM-related payroll documentation'
      ]
  },
  {
    id: 'tax-regulatory',
    title: 'Tax & Regulatory Support',
    icon: <Scale className="w-5 h-5" />,
    summary: 'IRAS corporate income tax support, GST preparation, and filing-ready XBRL.',
    overview: 'We prepare tax, GST, XBRL, and regulatory support files for review and filing processes.',
    whoNeeds: 'Businesses that need preparation support for GST, corporate tax schedules, XBRL files, and regulatory reporting documentation.',
    whyItMatters: 'Clear tax and regulatory working files help the reviewing accountant check assumptions, source figures, and filing positions.',
    process: [
      'Confirm the filing requirement, source records, and template format',
      'Prepare tax, GST, XBRL or regulatory support schedules',
      'Identify missing information and review points',
      'Return support files for approval and filing process'
    ],
    scope: [
        'Corporate income tax computation support',
        'Tax schedules and supporting workings',
        'GST computation and return preparation support',
        'XBRL preparation, validation, and filing-ready documents',
        'Regulatory reporting and compliance documentation support'
    ],
    disclaimer: 'All support is based on information and instructions provided through the responsible workflow.'
  }
];

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ServiceCard: React.FC<{ service: RichDetail; onClick: (s: RichDetail) => void }> = ({ service, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onClick(service)}
      className="glow-card-container p-6 md:p-7 rounded-2xl transition-shadow group overflow-hidden text-left"
    >
      <div className="glow-card-bg" />
      <div className="glow-element" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 glass-pill text-corporate-gold rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-corporate-gold/15 group-hover:text-corporate-gold">
          {service.icon}
        </div>
        <h4 className={`${FONT_TITLE} text-xl mb-3 text-corporate-blue dark:text-white leading-tight transition-colors group-hover:text-corporate-gold`}>{service.title}</h4>
        <p className={`${FONT_BODY} text-sm mb-7 opacity-70 leading-relaxed transition-colors dark:text-slate-300`}>
          {service.summary}
        </p>
        <div className={`${FONT_ACCENT} text-[9px] text-corporate-gold dark:text-corporate-gold/80 flex items-center gap-3 transition-all group-hover:translate-x-2`}>
          View details <ExternalLink size={12} />
        </div>
      </div>
    </motion.div>
  );
};

export const DetailModal: React.FC<{ item: RichDetail | null; onClose: () => void; onInquire?: () => void }> = ({ item, onClose, onInquire }) => {
  if (!item) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-stone-950/80 backdrop-blur-xl" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }} className="relative w-full max-w-3xl glass-card rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-white/50 dark:border-white/10">
          <h3 className={`${FONT_TITLE} text-xl md:text-2xl text-corporate-blue dark:text-white leading-tight`}>{item.title}</h3>
          <button onClick={onClose} className="p-2.5 glass-pill rounded-full transition-transform hover:rotate-90 dark:text-slate-100"><X size={18} /></button>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-left">
          <div className="space-y-4">
            <h4 className={`${FONT_ACCENT} text-[9px] text-corporate-gold dark:text-corporate-gold`}>What this service covers</h4>
            <p className={`${FONT_BODY} ${SIZE_STANDARD} text-stone-800 dark:text-slate-200 leading-relaxed`}>{item.overview}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-5 rounded-2xl glass-pill"
            >
              <h4 className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-3`}>Who needs this</h4>
              <p className={`${FONT_BODY} text-sm text-stone-700 dark:text-slate-300 leading-relaxed`}>{item.whoNeeds}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl glass-pill"
            >
              <h4 className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-3`}>Why it matters</h4>
              <p className={`${FONT_BODY} text-sm text-stone-700 dark:text-slate-300 leading-relaxed`}>{item.whyItMatters}</p>
            </motion.div>
          </div>
          
          {item.scope && (
            <div className="space-y-8">
              <h4 className={`${FONT_ACCENT} text-[9px] text-corporate-gold dark:text-corporate-gold`}>Scope of support</h4>
              <ul className="space-y-4">
                {item.scope.map((s, idx) => (
                  <li key={idx} className={`${FONT_BODY} text-sm md:text-base text-stone-900 dark:text-slate-100 leading-relaxed`}>
                     <span className="text-corporate-gold">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-8">
            <h4 className={`${FONT_ACCENT} text-[9px] text-corporate-gold dark:text-corporate-gold`}>How the process works</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.process.map((step, idx) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="p-5 rounded-2xl glass-pill"
                >
                  <span className="text-[10px] font-bold tracking-[0.22em] text-corporate-gold">0{idx + 1}</span>
                  <p className={`${FONT_BODY} text-sm text-stone-800 dark:text-slate-200 leading-relaxed mt-2`}>{step}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {item.disclaimer && (
            <div className="p-5 glass-pill rounded-2xl">
               <p className={`${FONT_BODY} text-sm opacity-70 leading-relaxed dark:text-slate-300`}>
                  {item.disclaimer}
               </p>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-white/50 dark:border-white/10 flex justify-end gap-3">
           <button onClick={() => { onInquire?.(); onClose(); }} className={`${FONT_BODY} text-xs px-6 py-3 bg-corporate-blue text-white rounded-xl shadow-lg hover:bg-[#b59e6d] transition-all`}>
             Discuss this service
           </button>
           <button onClick={onClose} className={`${FONT_BODY} text-xs px-6 py-3 bg-corporate-blue text-white rounded-xl shadow-lg hover:bg-[#b59e6d] transition-all`}>
             Close
           </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export const ServiceGrid: React.FC<{ onInquire?: () => void }> = ({ onInquire }) => {
  const [selected, setSelected] = useState<RichDetail | null>(null);

  return (
    <>
      <motion.div variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} onClick={setSelected} />
        ))}
      </motion.div>
      <AnimatePresence>
        {selected && <DetailModal item={selected} onInquire={onInquire} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
};
