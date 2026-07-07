import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Scale, Lock, Globe, Building } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms' | 'pdpa';
}

type TabType = 'privacy' | 'terms' | 'pdpa';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={16} /> },
  { id: 'terms', label: 'Terms of Service', icon: <Scale size={16} /> },
  { id: 'pdpa', label: 'Data Protection (PDPA)', icon: <ShieldCheck size={16} /> },
];

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, defaultTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = React.useState<TabType>(defaultTab);

  useEffect(() => {
    if (isOpen) setActiveTab(defaultTab);
  }, [isOpen, defaultTab]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[85vh] md:h-[75vh] bg-white dark:bg-[#0d1625] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-300 dark:border-slate-800 ring-1 ring-stone-950/10 dark:ring-white/10"
        >
          <div className="w-full md:w-80 bg-stone-50 dark:bg-[#060a13]/80 border-b md:border-b-0 md:border-r border-stone-100 dark:border-slate-800 flex flex-col p-6 shrink-0 justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-lg md:text-xl text-corporate-blue dark:text-white uppercase tracking-wider mb-1">Legal and Data Policies</h3>
                <p className="font-sans text-xs text-corporate-gold opacity-80">Plain-language website terms</p>
              </div>

              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 w-auto md:w-full ${
                        isActive
                          ? 'bg-corporate-blue text-white shadow-md'
                          : 'text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-3 pt-6 border-t border-stone-200/55 dark:border-slate-800">
              <div className="flex items-center gap-2 text-[10px] text-stone-400 font-sans tracking-wide">
                <Globe size={12} className="text-corporate-gold" />
                Singapore support
              </div>
              <div className="flex items-center gap-2 text-[10px] text-stone-400 font-sans tracking-wide">
                <Building size={12} className="text-corporate-gold" />
                Madurai back office
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#0d1625]">
            <div className="flex justify-between items-center px-8 py-6 border-b border-stone-100 dark:border-slate-800 shrink-0">
              <h4 className="font-serif font-bold text-xl md:text-2xl text-corporate-blue dark:text-white">
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'pdpa' && 'Data Protection (PDPA)'}
              </h4>
              <button
                onClick={onClose}
                className="p-2 bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-white rounded-full transition-transform hover:rotate-90"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 font-sans text-sm leading-relaxed text-stone-700 dark:text-slate-300">
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <p className="font-bold text-corporate-gold">Last updated: May 29, 2026</p>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">1. Who we are</h5>
                    <p>
                      WIN-WIN Business Solutions Pvt Ltd is a back office support provider based in Madurai, India. We support Win-Win Management Consultants with accounting, bookkeeping, audit documentation, payroll, tax and regulatory support work for business clients.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">2. Information we collect through this website</h5>
                    <p>
                      This website does not collect financial records, bank data or client ledger files. Visitors may contact us by email, WhatsApp or the enquiry form, which opens a pre-filled email draft.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Enquiry details, such as name, email address, service interest and message.</li>
                      <li>Career details, such as resumes and cover notes sent by applicants.</li>
                      <li>Basic correspondence needed to respond to enquiries or applications.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">3. How we use information</h5>
                    <p>
                      We use enquiry and career information to respond, discuss requirements, evaluate applications and maintain business correspondence. Service work is handled under separate client instructions and agreed working procedures.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">4. Confidentiality</h5>
                    <p>
                      Client and applicant information is not sold or shared for advertising. Access is limited to people who need it for the relevant enquiry, application or assignment.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">5. Updates</h5>
                    <p>
                      We may update this policy when our website, services or legal requirements change. The latest version will be shown here with an updated date.
                    </p>
                  </section>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-6">
                  <p className="font-bold text-corporate-gold">Effective date: May 29, 2026</p>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">1. Use of this website</h5>
                    <p>
                      By using this website, you agree to these terms. The website provides general information about WIN-WIN Business Solutions Pvt Ltd and our back office support services.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">2. Scope of services</h5>
                    <p>
                      We provide accounting, bookkeeping, non-attest audit support, payroll, tax and regulatory preparation support from Madurai for business clients served through Win-Win Management Consultants.
                    </p>
                    <p>
                      Our work supports Win-Win Management Consultants and its client firms. Final review, professional judgement, client advice, filing decisions and statutory sign-off remain with the responsible professional team.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">3. Website content</h5>
                    <p>
                      The content on this website is for general information. It is not accounting, tax, legal or audit advice to any end client.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">4. Client files and workpapers</h5>
                    <p>
                      Client records, workpapers and source files remain the property of the client firm or its end client. We use them only for the assignment agreed through the responsible client relationship.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">5. Governing law</h5>
                    <p>
                      These terms are governed by the laws of India. Any dispute connected with this website or our engagement terms will be handled under the applicable agreement and jurisdiction.
                    </p>
                  </section>
                </div>
              )}

              {activeTab === 'pdpa' && (
                <div className="space-y-6">
                  <p className="font-bold text-corporate-gold flex items-center gap-2">
                    <ShieldCheck size={18} className="text-corporate-gold" />
                    Data protection for Singapore-related support work
                  </p>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">1. Data intermediary role</h5>
                    <p>
                      When we process personal data for client support work under written instructions, we act as a data intermediary for the responsible entity or client firm.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">2. Access controls</h5>
                    <p>
                      Access to client information is restricted to assigned team members. Staff are expected to follow confidentiality, clean desk and information-handling procedures.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">3. Working channels</h5>
                    <p>
                      Service work is handled through client-approved systems, remote access tools or agreed file-sharing methods. Financial records should not be sent through the public website form.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">4. Retention</h5>
                    <p>
                      Retention and deletion of assignment files are handled according to the responsible client instructions and the terms agreed for the engagement.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h5 className="font-bold text-base text-corporate-blue dark:text-white uppercase tracking-wider">5. Incident communication</h5>
                    <p>
                      If we become aware of a suspected data incident connected with client work, we will notify the responsible client contact so it can assess any required action.
                    </p>
                  </section>
                </div>
              )}
            </div>

            <div className="p-6 bg-stone-50 dark:bg-[#060a13] border-t border-stone-100 dark:border-slate-800/80 flex justify-end shrink-0">
              <button
                onClick={onClose}
                className="font-sans font-bold uppercase tracking-widest text-[9px] px-8 py-3 bg-corporate-blue text-white rounded-xl shadow-lg hover:bg-corporate-gold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
