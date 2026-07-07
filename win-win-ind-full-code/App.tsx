/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ServiceGrid } from './components/Diagrams';
import { PolicyModal } from './components/PolicyModal';
import { 
  Mail, MapPin, Sun, Moon, CheckCircle2,
  Shield, Globe, Award, 
  SearchCheck, Lock, Repeat, GraduationCap,
  MessageCircle, ExternalLink, Menu, X, 
  ChevronUp, Scale, Clock, Briefcase, FileText,
  ShieldCheck, Zap, Users, Target, BookOpen,
  TrendingUp, Fingerprint, ClipboardCheck
} from 'lucide-react';

type Page = 'home' | 'about' | 'team' | 'services' | 'careers' | 'contact';

// FONT CONSTANTS
const FONT_TITLE = "font-serif font-bold";
const FONT_BODY = "font-sans";
const FONT_ACCENT = "font-sans font-bold uppercase tracking-[0.22em]";

// SIZE CONSTANTS
const SIZE_TITLE = "text-2xl md:text-4xl";
const SIZE_STANDARD = "text-sm md:text-base";

const seoByPage: Record<Page, { title: string; description: string; slug: string }> = {
  home: {
    title: 'Review-Ready Accounting Support for Businesses | Win-Win Business Solutions',
    description: 'Win-Win Business Solutions is the Madurai back office supporting Win-Win Management Consultants with bookkeeping, audit documentation, payroll, GST, tax, and compliance work for growing businesses.',
    slug: '/'
  },
  about: {
    title: 'About Win-Win Business Solutions | Accounting Support Team in Madurai',
    description: 'Learn about Win-Win Business Solutions, the Madurai back-office team supporting Win-Win Management Consultants, Singapore.',
    slug: '/about'
  },
  team: {
    title: 'Accounting Support Team | Win-Win Business Solutions',
    description: 'Meet the qualified accounting, audit support, payroll and compliance professionals behind Win-Win Business Solutions.',
    slug: '/team'
  },
  services: {
    title: 'Accounting, Audit, Payroll & Tax Support Services | Win-Win',
    description: 'Explore bookkeeping, audit support, payroll, GST, tax, and regulatory support prepared in Madurai for businesses and professional teams.',
    slug: '/services'
  },
  careers: {
    title: 'Accounting Careers in Madurai | Win-Win Business Solutions',
    description: 'Build a career in accounting, audit support, payroll, tax, GST, and compliance work for business clients.',
    slug: '/careers'
  },
  contact: {
    title: 'Contact Win-Win Business Solutions | Accounting Support Enquiries',
    description: 'Contact Win-Win Business Solutions in Madurai for back-office support enquiries connected to Win-Win Management Consultants, Singapore.',
    slug: '/contact'
  }
};

const serviceFaqs = [
  {
    question: 'Do you provide attest or assurance opinions?',
    answer: 'No. We provide non-attest preparation support only. Your firm retains full responsibility for review, sign-off, and any attest or assurance opinion.'
  },
  {
    question: 'Can you work within our firm’s existing templates and software?',
    answer: 'Yes. We adapt to the client’s templates, working paper formats, and software wherever practical.'
  },
  {
    question: 'Do you support recurring bookkeeping and payroll work?',
    answer: 'Yes. We can support recurring bookkeeping, reconciliations, management accounts, payroll workings, CPF schedules, and related compliance support.'
  },
  {
    question: 'How is client confidentiality handled?',
    answer: 'All work is handled under confidentiality protocols appropriate for cross-border accounting support. Client-identifying financial records should never be sent through public channels such as our contact form.'
  }
];

const supportSignals = [
  {
    label: 'Preparation layer',
    text: 'Schedules, reconciliations, working papers, and support files prepared before your review.',
    icon: <FileText size={18} />
  },
  {
    label: 'Review trail',
    text: 'Open items, assumptions, and missing information are marked clearly for the review team.',
    icon: <SearchCheck size={18} />
  },
  {
    label: 'Defined responsibility',
    text: 'Win-Win Management Consultants keeps the client relationship, final review, and statutory sign-off in Singapore.',
    icon: <ShieldCheck size={18} />
  }
];

const engagementSteps = [
  {
    title: 'Scope the work',
    text: 'We agree the service area, file format, timing, review owner and communication channel before work starts.',
    icon: <Target size={20} />
  },
  {
    title: 'Set up templates',
    text: 'Your firm’s templates, checklists and prior review notes become the working base for the assignment.',
    icon: <ClipboardCheck size={20} />
  },
  {
    title: 'Prepare and check',
    text: 'The work is prepared, checked, and returned with clear notes for assumptions, missing items and open questions.',
    icon: <SearchCheck size={20} />
  },
  {
    title: 'Improve the next cycle',
    text: 'Recurring work becomes smoother as instructions, review points and filing-period patterns are captured.',
    icon: <Repeat size={20} />
  }
];

const supportScenarios = [
  {
    title: 'Month-end support',
    text: 'Bookkeeping, reconciliations, management accounts and schedules prepared for review.',
    points: ['Ledger updates', 'Bank reconciliations', 'Management reports']
  },
  {
    title: 'Audit season support',
    text: 'Non-attest schedules, lead sheets, sampling support, and audit file indexing for review.',
    points: ['Working papers', 'Cross-references', 'Open-item notes']
  },
  {
    title: 'Filing and compliance support',
    text: 'GST, tax, XBRL, payroll and statutory workings prepared from client-provided information.',
    points: ['IRAS support', 'CPF workings', 'XBRL preparation']
  }
];

const startChecklist = [
  'Latest trial balance, ledger exports, or payroll data',
  'Client-approved templates and prior-period files',
  'Clear filing deadlines and review timelines',
  'Named contact person for queries and approvals'
];

const reflectionQuotes = [
  {
    quote: 'The right support should make review calmer, not heavier.',
    text: 'Win-Win focuses on clean preparation, clear notes, and files that are easier for the review team to trust.'
  },
  {
    quote: 'Good back-office work gives you time back without taking control away.',
    text: 'Your client-facing team keeps the relationship and final judgement while our Madurai team keeps the preparation layer moving.'
  },
  {
    quote: 'A dependable partner is felt most during deadline weeks.',
    text: 'Month-end, payroll, GST, tax and audit support become easier when the working papers arrive organised and review-ready.'
  }
];

const updateMetaTag = (selector: string, attribute: string, value: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) tag.setAttribute(match[1], match[2]);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attribute, value);
};

const WinWinLogo = ({ className }: { className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.012 }}
    whileTap={{ scale: 0.985 }}
    transition={{ type: "tween", duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    className={`${className} winwin-logo-frame liquid-button flex items-center justify-center cursor-pointer transform-gpu overflow-hidden rounded-lg shadow-sm`}
    aria-label="Win-Win Business Solutions"
  >
    <img src="/winwin-logo.png" alt="" className="h-full w-full object-contain" draggable={false} />
  </motion.div>
);

const MagneticButton = ({ children, onClick, className = "", primary = false, type = "button" }: { children: React.ReactNode, onClick?: () => void, className?: string, primary?: boolean, type?: "button" | "submit" | "reset" }) => (
  <motion.button
    type={type}
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "tween", duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    className={`${className} liquid-button ${primary ? 'bg-corporate-blue/95 text-white hover:bg-[#b59e6d] border border-corporate-gold/25 hover:border-corporate-gold/55' : 'glass-pill text-corporate-blue dark:text-stone-100 hover:text-corporate-gold'} rounded-lg transition-colors duration-300 shadow-md transform-gpu`}
  >
    {children}
  </motion.button>
);

const PageQuote = ({ text, subtext }: { text: string, subtext?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-16 md:py-20 px-6 text-center glass-section relative overflow-hidden"
  >
    <h3 className={`${FONT_TITLE} ${SIZE_TITLE} text-corporate-blue dark:text-stone-300 max-w-4xl mx-auto leading-tight relative z-10 px-4`}>
      "{text}"
    </h3>
    {subtext && <p className={`mt-7 ${FONT_ACCENT} text-[9px] text-corporate-gold relative z-10`}>{subtext}</p>}
  </motion.div>
);

const LiquidGlassFilters = () => (
  <svg className="liquid-glass-filter-defs" aria-hidden="true" focusable="false">
    <defs>
      <filter id="ww-liquid-surface" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.018 0.044" numOctaves="2" seed="11" result="surfaceNoise" />
        <feGaussianBlur in="surfaceNoise" stdDeviation="0.32" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="12" xChannelSelector="R" yChannelSelector="G" result="refracted" />
        <feColorMatrix
          in="refracted"
          type="matrix"
          values="1.035 0 0 0 0.006  0 1.015 0 0 0.004  0 0 0.965 0 0.012  0 0 0 1 0"
        />
      </filter>

      <filter id="ww-liquid-edge" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.032 0.075" numOctaves="1" seed="21" result="edgeNoise" />
        <feDisplacementMap in="SourceGraphic" in2="edgeNoise" scale="6" xChannelSelector="R" yChannelSelector="B" result="edgeRefract" />
        <feGaussianBlur in="edgeRefract" stdDeviation="0.22" result="softEdge" />
        <feColorMatrix
          in="softEdge"
          type="matrix"
          values="1.08 0 0 0 0.012  0 1.02 0 0 0.006  0 0 0.92 0 0.018  0 0 0 0.95 0"
        />
      </filter>

      <filter id="ww-liquid-button" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.045 0.095" numOctaves="2" seed="7" result="buttonNoise" />
        <feGaussianBlur in="buttonNoise" stdDeviation="0.18" result="buttonSoftNoise" />
        <feDisplacementMap in="SourceGraphic" in2="buttonSoftNoise" scale="8" xChannelSelector="R" yChannelSelector="G" result="buttonRefract" />
        <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#d4b483" floodOpacity="0.28" />
        <feComposite in="buttonRefract" operator="over" />
      </filter>
    </defs>
  </svg>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<'privacy' | 'terms' | 'pdpa'>('privacy');
  
  // State for the contact and inquiry form.
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryService, setInquiryService] = useState('Accounting & Bookkeeping Support');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [lastInquiryMailto, setLastInquiryMailto] = useState('');
  const [dashboardTab, setDashboardTab] = useState<'realtime' | 'maker_checker' | 'compliance'>('realtime');

  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const scrolledRef = useRef(false);
  const showBackToTopRef = useRef(false);

  useEffect(() => {
    const seo = seoByPage[currentPage];
    document.title = seo.title;
    updateMetaTag('meta[name="description"]', 'content', seo.description);
    updateMetaTag('meta[property="og:title"]', 'content', seo.title);
    updateMetaTag('meta[property="og:description"]', 'content', seo.description);
    updateMetaTag('meta[property="og:type"]', 'content', 'website');
  }, [currentPage]);

  const openPolicy = useCallback((tab: 'privacy' | 'terms' | 'pdpa') => {
    setActivePolicyTab(tab);
    setIsPolicyOpen(true);
  }, []);

  const buildInquiryMailto = useCallback(() => {
    const subject = encodeURIComponent(`Accounting support enquiry - ${inquiryService}`);
    const body = encodeURIComponent([
      `Name: ${inquiryName}`,
      `Email: ${inquiryEmail}`,
      `Service: ${inquiryService}`,
      '',
      'Requirement and timeline:',
      inquiryMessage,
      '',
      'Sent from the Win-Win Business Solutions website enquiry form.'
    ].join('\n'));

    return `mailto:admin@win-win.com.in?subject=${subject}&body=${body}`;
  }, [inquiryEmail, inquiryMessage, inquiryName, inquiryService]);

  const handleInquirySubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    const mailtoUrl = buildInquiryMailto();
    setLastInquiryMailto(mailtoUrl);
    setInquirySubmitted(true);
    window.location.href = mailtoUrl;
  }, [buildInquiryMailto]);

  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const updateScrollState = () => {
      ticking = false;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrolledNext = scrollY > 50;
      const showBackToTopNext = scrollY > 400;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrollY / docHeight, 1);

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (scrolledRef.current !== scrolledNext) {
        scrolledRef.current = scrolledNext;
        setScrolled(scrolledNext);
      }

      if (showBackToTopRef.current !== showBackToTopNext) {
        showBackToTopRef.current = showBackToTopNext;
        setShowBackToTop(showBackToTopNext);
      }
    };

    const requestScrollUpdate = () => {
      if (!ticking) {
        ticking = true;
        frameId = requestAnimationFrame(updateScrollState);
      }
    };

    requestScrollUpdate();
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);

    return () => {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  // Subtle page transitions that keep the site feeling steady and professional.
  const pageVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 16
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.36, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.04
      } 
    },
    exit: { 
      opacity: 0, 
      y: -12,
      transition: { 
        duration: 0.22, 
        ease: "easeInOut" 
      } 
    }
  };

  // Reusable high-fidelity scroll triggered variants
  const scrollContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const scrollItemFadeUp: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  const scrollItemFadeRight: Variants = {
    hidden: { opacity: 0, x: -28 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  const scrollItemFadeLeft: Variants = {
    hidden: { opacity: 0, x: 28 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  const menuLinks = ['HOME', 'ABOUT', 'TEAM', 'SERVICES', 'CAREERS', 'CONTACT'];

  return (
    <div 
      className={`relative min-h-screen transition-all duration-700 blender-viewport ${isDarkMode ? 'dark text-stone-100' : 'text-corporate-blue'}`}
    >
      <LiquidGlassFilters />
      
      {/* Top Floating Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-corporate-blue/10 dark:bg-white/5 z-[1000] pointer-events-none">
        <div 
          ref={progressBarRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#D4B483] via-[#eddcc2] to-[#B59E6D] shadow-[0_1px_8px_rgba(212,180,131,0.5)] will-change-transform"
        />
      </div>
      
      <nav className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 flex justify-between items-center transition-all duration-700 glass-shell border-x-0 border-t-0 rounded-none ${scrolled ? 'py-2.5' : 'py-3'}`}>
        <motion.div className="flex items-center gap-2.5 cursor-pointer min-w-0" onClick={() => navigateTo('home')}>
          <WinWinLogo className="w-[44px] h-[34px] md:w-[54px] md:h-[40px] shrink-0" />
          <div className="flex flex-col">
            <span className={`${FONT_TITLE} text-sm md:text-lg leading-none uppercase tracking-[0.18em] md:tracking-widest text-corporate-blue dark:text-stone-100`}>Win-Win</span>
            <span className={`${FONT_ACCENT} text-[6px] md:text-[7px] mt-1 opacity-75 text-corporate-blue dark:text-stone-300 font-bold tracking-[0.18em] md:tracking-widest max-[360px]:hidden`}>Business Solutions</span>
          </div>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-7">
          {menuLinks.map(item => (
            <motion.button 
              key={item} 
              onClick={() => navigateTo(item.toLowerCase() as Page)} 
              whileHover={{ y: -1, color: '#D4B483' }}
              className={`${FONT_BODY} text-xs transition-all transform-gpu relative py-1 text-corporate-blue dark:text-stone-100 ${currentPage === item.toLowerCase() ? 'opacity-100 font-bold' : 'opacity-70 hover:opacity-100'}`}
            >
              {item}
              {currentPage === item.toLowerCase() && (
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0.55 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.55 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-corporate-gold rounded-full shadow-[0_0_10px_rgba(212,180,131,0.45)]"
                  transition={{ duration: 0.16, ease: "easeOut" }}
                />
              )}
            </motion.button>
          ))}
          <motion.button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            whileTap={{ scale: 0.9, rotate: 180 }}
            className="text-corporate-blue dark:text-stone-100 hover:text-corporate-gold p-2 glass-pill rounded-full transition-all transform-gpu"
          >
            {isDarkMode ? <Sun size={14}/> : <Moon size={14}/>}
          </motion.button>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <motion.button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            whileTap={{ scale: 0.9, rotate: 180 }}
            className="text-corporate-blue dark:text-stone-100 hover:text-corporate-gold p-1.5 glass-pill rounded-full transition-all transform-gpu"
          >
            {isDarkMode ? <Sun size={14}/> : <Moon size={14}/>}
          </motion.button>
          <button onClick={() => setIsMenuOpen(true)} className="text-corporate-blue dark:text-stone-100 p-1.5 glass-pill rounded-full">
            <Menu size={21} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 w-full md:w-[340px] h-full glass-shell z-[120] p-8 flex flex-col shadow-2xl border-l border-white/50 dark:border-white/10">
            <div className="flex justify-between items-center mb-12">
              <WinWinLogo className="w-[56px] h-[42px]" />
              <button onClick={() => setIsMenuOpen(false)} className="text-corporate-blue dark:text-stone-100 p-2 glass-pill rounded-full"><X size={22} /></button>
            </div>
            <div className="flex flex-col gap-6">
              {menuLinks.map((item) => (
                <button key={item} onClick={() => navigateTo(item.toLowerCase() as Page)} className={`${FONT_TITLE} text-xl uppercase text-left text-corporate-blue dark:text-stone-100 hover:text-corporate-gold transition-colors`}>
                  {item}
                </button>
              ))}
              <div className="border-t border-white/50 dark:border-white/10 pt-7 mt-3 flex items-center justify-between">
                <span className={`${FONT_ACCENT} text-[9px] text-corporate-blue dark:text-stone-300`}>Appearance</span>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center gap-2 px-4 py-2 glass-pill rounded-full text-corporate-gold"
                >
                  {isDarkMode ? <Sun size={14}/> : <Moon size={14}/>}
                  <span className={`${FONT_BODY} text-xs`}>{isDarkMode ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative block page-3d-wrapper">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage} 
            variants={pageVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            className="w-full origin-center transform-gpu"
          >
            
            {/* HOME PAGE */}
            {currentPage === 'home' && (
              <div className="w-full">
                <section className="relative min-h-[92vh] flex flex-col justify-center px-5 md:px-10 xl:px-20 pt-28 pb-12 overflow-hidden">
                  {/* Subtle grid and warm ambient glow */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4b48305_1px,transparent_1px),linear-gradient(to_bottom,#d4b48305_1px,transparent_1px)] bg-[size:48px_48px] opacity-80" />
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(212,180,131,0.1)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"
                  />
                  
                  <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                      
                      <div className="lg:col-span-7 flex flex-col items-center text-center">
                        
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          whileHover={{ y: -2, scale: 1.02 }}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full glass-pill mb-5 mx-auto"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-corporate-gold animate-pulse" />
                          <span className={`${FONT_ACCENT} text-[8px] text-corporate-blue dark:text-stone-300 font-bold tracking-[0.25em]`}>
                            Madurai back office for review-ready work
                          </span>
                        </motion.div>
                        
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.8 }}
                          className={`${FONT_TITLE} text-3xl sm:text-4xl lg:text-5xl text-corporate-blue dark:text-stone-100 leading-[1.08] tracking-tight mb-6 max-w-3xl mx-auto`}
                        >
                          Review-ready accounting support <br />
                          for growing businesses.
                        </motion.h1>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className={`${FONT_BODY} text-sm sm:text-base lg:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light`}
                        >
                          Based in Madurai, Win-Win Business Solutions works as the back office for Win-Win Management Consultants, preparing clear bookkeeping, payroll, GST, tax, and working-paper support for business clients.
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="flex flex-wrap items-center justify-center gap-4"
                        >
                          <MagneticButton 
                            primary 
                            onClick={() => navigateTo('contact')} 
                            className="px-8 py-3 text-[11px] font-semibold uppercase tracking-wider rounded-lg bg-corporate-blue text-white shadow-lg hover:bg-[#b59e6d] transition-colors"
                          >
                            Discuss your requirements
                          </MagneticButton>
                          <button
                            onClick={() => navigateTo('services')}
                            className="px-7 py-3 text-[11px] font-semibold uppercase tracking-wider rounded-lg glass-pill hover:text-corporate-gold transition-all font-sans font-bold"
                          >
                            View services
                          </button>
                        </motion.div>
                        
                      </div>
                      
                      {/* Right Side: Service and review snapshot */}
                      <div className="lg:col-span-5 w-full">
                        <motion.div
                          initial={{ opacity: 0, x: 30, scale: 0.98 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          whileHover={{ y: -6 }}
                          className="p-6 glass-card rounded-2xl text-left flex flex-col min-h-[430px] justify-between"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <WinWinLogo className="w-52 h-44" />
                          </div>
                          
                          <div>
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/50 dark:border-white/10 mb-5 gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                                  Work review snapshot
                                </span>
                              </div>
                              <span className="font-mono text-[9px] w-fit px-2.5 py-1 glass-pill text-stone-600 dark:text-stone-300 rounded-lg">
                                Madurai back office
                              </span>
                            </div>

                            {/* SaaS Interactive Custom Glass Tabs */}
                            <div className="grid grid-cols-3 gap-1 p-1 glass-pill rounded-xl mb-5">
                              {[
                                { id: 'realtime', label: 'Services' },
                                { id: 'maker_checker', label: 'Review' },
                                { id: 'compliance', label: 'Controls' }
                              ].map((tab) => (
                                <motion.button
                                  key={tab.id}
                                  onClick={() => setDashboardTab(tab.id as any)}
                                  whileHover={{ y: -1 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`py-2 text-[10px] font-sans font-bold uppercase tracking-wider rounded-lg transition-all relative ${
                                    dashboardTab === tab.id
                                      ? 'bg-white/70 dark:bg-white/10 text-corporate-gold shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10'
                                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                                  }`}
                                >
                                  {tab.label}
                                </motion.button>
                              ))}
                            </div>

                            {/* Tab Content 1: METRICS PANEL (High-End SaaS Grid Layout) */}
                            <AnimatePresence mode="wait">
                              {dashboardTab === 'realtime' && (
                                <motion.div
                                  key="metrics"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="grid grid-cols-2 gap-3"
                                >
                                  {[
                                    {
                                      label: "BOOKKEEPING",
                                      value: "Books",
                                      desc: "Ledger posting and reconciliations",
                                      icon: () => <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    },
                                    {
                                      label: "AUDIT SUPPORT",
                                      value: "Working papers",
                                      desc: "Schedules and working paper files",
                                      icon: () => <Clock className="w-4 h-4 text-corporate-gold" />
                                    },
                                    {
                                      label: "TAX AND GST",
                                      value: "Workings",
                                      desc: "IRAS and GST preparation support",
                                      icon: () => <FileText className="w-4 h-4 text-blue-500" />
                                    },
                                    {
                                      label: "PAYROLL",
                                      value: "CPF",
                                      desc: "Payroll and statutory workings",
                                      icon: () => <CheckCircle2 className="w-4 h-4 text-teal-500" />
                                    }
                                  ].map((metric, i) => (
                                    <motion.div
                                      key={i}
                                      whileHover={{ y: -2 }}
                                      className="p-4 glass-card rounded-xl flex flex-col justify-between h-24"
                                    >
                                      <div className="flex justify-between items-start">
                                        <span className="font-sans text-[10px] font-black uppercase text-corporate-blue dark:text-stone-200 tracking-wider">
                                          {metric.label}
                                        </span>
                                        {metric.icon()}
                                      </div>
                                      <div>
                                        <span className="font-serif italic font-bold text-sm text-corporate-gold leading-none">
                                          {metric.value}
                                        </span>
                                        <p className="font-sans text-[9px] text-stone-500 dark:text-stone-400 mt-1">
                                          {metric.desc}
                                        </p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}

                              {/* Tab Content 2: MAKER-CHECKER WORKFLOW DEEP-DIVE */}
                              {dashboardTab === 'maker_checker' && (
                                <motion.div
                                  key="maker_checker"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-3"
                                >
                                  {[
                                    {
                                      step: "01",
                                      title: "PREPARE",
                                      desc: "Work is prepared against the agreed client instructions and templates.",
                                      status: "Client template",
                                      dot: "bg-amber-400"
                                    },
                                    {
                                      step: "02",
                                      title: "CHECK",
                                      desc: "Figures, references and schedules are checked before handover.",
                                      status: "Internal review",
                                      dot: "bg-blue-400"
                                    },
                                    {
                                      step: "03",
                                      title: "DELIVER",
                                      desc: "The responsible Singapore entity keeps final review, judgment, and sign-off.",
                                      status: "Client approval",
                                      dot: "bg-emerald-400"
                                    }
                                  ].map((node, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.08 }}
                                      whileHover={{ x: 4 }}
                                      className="p-3 glass-card rounded-xl flex items-center gap-4"
                                    >
                                      <div className="h-9 w-9 rounded-xl glass-pill flex items-center justify-center font-serif italic text-sm text-corporate-gold font-bold">
                                        {node.step}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                          <h4 className="font-sans text-[10px] font-bold text-corporate-blue dark:text-stone-300 uppercase tracking-wider truncate">{node.title}</h4>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <span className={`w-1.5 h-1.5 rounded-full ${node.dot}`} />
                                            <span className="font-mono text-[8px] text-stone-400">{node.status}</span>
                                          </div>
                                        </div>
                                        <p className="font-sans text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed truncate">
                                          {node.desc}
                                        </p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}

                              {/* Tab Content 3: SYSTEM INTEGRITY/COMPLIANCE METADATA */}
                              {dashboardTab === 'compliance' && (
                                <motion.div
                                  key="compliance"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-4 font-sans"
                                >
                                  <div className="p-4 glass-card rounded-2xl">
                                    <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">Working controls</h4>
                                    <div className="space-y-3 font-medium">
                                      <div className="flex items-center justify-between text-xs border-b border-stone-100 dark:border-slate-800 pb-2">
                                        <span className="text-stone-600 dark:text-stone-300">ACRA and IRAS references</span>
                                        <span className="text-emerald-500 font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Reviewed</span>
                                      </div>
                                      <div className="flex items-center justify-between text-xs border-b border-stone-100 dark:border-slate-800 pb-2">
                                        <span className="text-stone-600 dark:text-stone-300">Data access</span>
                                        <span className="text-emerald-500 font-bold flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Restricted</span>
                                      </div>
                                      <div className="flex items-center justify-between text-xs pb-1">
                                        <span className="text-stone-600 dark:text-stone-300">Turnaround</span>
                                        <span className="text-corporate-gold font-bold">Agreed upfront</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="p-4 glass-pill rounded-xl text-[10px] text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                                    <strong className="text-stone-700 dark:text-stone-300 font-semibold uppercase block mb-1">Confidentiality</strong>
                                    Client information is handled through controlled access, staff confidentiality obligations and agreed working procedures.
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Dashboard Footer / Status Ticker */}
                          <div className="mt-6 pt-4 border-t border-stone-200/60 dark:border-slate-800 flex items-center justify-between text-[9px] font-mono text-stone-400">
                            <span className="flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                              Confidential handling
                            </span>
                            <span>Madurai, India</span>
                          </div>
                        </motion.div>
                      </div>
                      
                    </div>
                    
                    <div className="mt-14 pt-10 border-t border-white/50 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-5 text-center md:text-left">
                      {[
                        { label: "MADURAI BACK OFFICE", value: "Focused support", desc: "Accounting and compliance work prepared in Madurai for business clients served through Win-Win Management Consultants." },
                        { label: "REVIEW BEFORE DELIVERY", value: "Clear checks", desc: "Every file moves through preparation, checking, and senior review before it is returned to you." },
                        { label: "SINGAPORE-LED SIGN-OFF", value: "Proper boundaries", desc: "Win-Win Management Consultants keeps the client relationship, final review, and statutory responsibility in Singapore." }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + idx * 0.15, duration: 0.6 }}
                          whileHover={{ y: -4 }}
                          className="p-5 glass-card rounded-2xl transition-all"
                        >
                          <span className="text-[8px] font-black text-corporate-gold uppercase tracking-[0.2em] block mb-2">{item.label}</span>
                          <span className={`${FONT_TITLE} text-lg text-corporate-blue dark:text-stone-100 block mb-1`}>{item.value}</span>
                          <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-2">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      variants={scrollContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {supportSignals.map((item) => (
                        <motion.div
                          key={item.label}
                          variants={scrollItemFadeUp}
                          whileHover={{ y: -4 }}
                          className="glass-pill rounded-2xl px-5 py-4 flex items-start gap-4 text-left"
                        >
                          <span className="mt-0.5 text-corporate-gold shrink-0">{item.icon}</span>
                          <span>
                            <span className={`${FONT_ACCENT} text-[8px] text-corporate-gold block mb-1`}>{item.label}</span>
                            <span className={`${FONT_BODY} text-xs text-stone-600 dark:text-stone-300 leading-relaxed block`}>{item.text}</span>
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                  </div>
                </section>

                <section className="py-16 md:py-20 glass-section">
                  <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="max-w-3xl mx-auto text-center mb-10"
                    >
                      <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-4 block`}>How the engagement starts</span>
                      <h2 className={`${FONT_TITLE} ${SIZE_TITLE} text-corporate-blue dark:text-stone-100 mb-4`}>A simple working rhythm for Singapore support.</h2>
                      <p className={`${FONT_BODY} text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed`}>
                        The process is designed to reduce hand-holding. The client-facing team gives the working instructions, and we keep preparation, checking, and open-item communication clear.
                      </p>
                    </motion.div>

                    <motion.div
                      variants={scrollContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
                    >
                      {engagementSteps.map((step, idx) => (
                        <motion.div
                          key={step.title}
                          variants={scrollItemFadeUp}
                          whileHover={{ y: -6 }}
                          className="p-5 glass-card rounded-2xl text-left relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ opacity: [0.2, 0.45, 0.2] }}
                            transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-corporate-gold/[0.08] blur-2xl"
                          />
                          <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl glass-pill text-corporate-gold flex items-center justify-center mb-5">
                              {step.icon}
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.22em] text-stone-400">0{idx + 1}</span>
                            <h3 className={`${FONT_TITLE} text-lg text-corporate-blue dark:text-stone-100 mt-2 mb-2`}>{step.title}</h3>
                            <p className={`${FONT_BODY} text-sm text-stone-600 dark:text-stone-300 leading-relaxed`}>{step.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>

                <section className="py-16 md:py-20">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
                      <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-4 text-center lg:text-left"
                      >
                        <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-4 block`}>Where we fit</span>
                        <h2 className={`${FONT_TITLE} ${SIZE_TITLE} text-corporate-blue dark:text-stone-100 mb-4`}>Support for busy reporting periods.</h2>
                        <p className={`${FONT_BODY} text-base text-stone-600 dark:text-stone-300 leading-relaxed`}>
                          Use Win-Win as a preparation layer when the review team needs clean schedules, organized files, and clear query notes.
                        </p>
                      </motion.div>

                      <motion.div
                        variants={scrollContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5"
                      >
                        {supportScenarios.map((item) => (
                          <motion.div
                            key={item.title}
                            variants={scrollItemFadeUp}
                            whileHover={{ y: -6 }}
                            className="p-5 glass-card rounded-2xl text-left"
                          >
                            <h3 className={`${FONT_TITLE} text-xl text-corporate-blue dark:text-stone-100 mb-3`}>{item.title}</h3>
                            <p className={`${FONT_BODY} text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6`}>{item.text}</p>
                            <div className="space-y-3">
                              {item.points.map((point) => (
                                <motion.div
                                  key={point}
                                  whileHover={{ x: 4 }}
                                  className="flex items-center gap-3 text-xs font-semibold text-stone-600 dark:text-stone-300"
                                >
                                  <CheckCircle2 size={14} className="text-corporate-gold shrink-0" />
                                  {point}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </section>

                <section className="py-16 md:py-20 glass-section">
                   <div className="container mx-auto px-6 md:px-12">
                      <div className="max-w-6xl mx-auto">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                        >
                          <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-5 block`}>Work review</span>
                          <h2 className={`${FONT_TITLE} ${SIZE_TITLE} mb-8`}>How we review work before handover.</h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                           <motion.div 
                             variants={scrollContainerVariants}
                             initial="hidden"
                             whileInView="visible"
                             viewport={{ once: true, margin: "-100px" }}
                             className="space-y-6"
                           >
                              <motion.p variants={scrollItemFadeRight} className={`${FONT_BODY} text-lg md:text-xl leading-snug text-corporate-blue dark:text-stone-100 max-w-md`}>
                                Every assignment is handled with a clear review process:
                              </motion.p>
                              <ul className="space-y-3">
                                 {['Client-specific working instructions', 'Preparation and checking by separate team members', 'Senior review before handover', 'Clear notes for open items', 'Feedback captured for future assignments'].map((item, idx) => (
                                   <motion.li 
                                     key={idx} 
                                     variants={scrollItemFadeRight}
                                     whileHover={{ x: 6, color: '#D4B483' }}
                                     className={`${FONT_BODY} text-sm md:text-base flex items-start gap-3 opacity-80 cursor-default transform-gpu glass-pill rounded-xl px-4 py-3`}
                                   >
                                      <span className="text-corporate-gold mt-0.5"><CheckCircle2 size={16}/></span>
                                      {item}
                                   </motion.li>
                                 ))}
                              </ul>
                           </motion.div>
                           <motion.div 
                             initial="hidden"
                             whileInView="visible"
                             viewport={{ once: true, margin: "-100px" }}
                             variants={scrollItemFadeLeft}
                             whileHover={{ y: -4 }}
                             className="p-7 md:p-9 glass-card rounded-2xl flex flex-col justify-center transition-all transform-gpu"
                           >
                              <p className={`${FONT_BODY} ${SIZE_STANDARD} leading-relaxed text-corporate-blue dark:text-stone-300`}>
                                The aim is simple: give the review team working papers, schedules, and support files that are easy to review and ready for final judgment.
                              </p>
                           </motion.div>
                        </div>
                      </div>
                   </div>
                </section>

                <section className="py-16 md:py-20">
                   <div className="container mx-auto px-6 md:px-12">
                      <div className="max-w-6xl mx-auto">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="text-center"
                        >
                          <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-5 block`}>Confidentiality</span>
                          <h2 className={`${FONT_TITLE} ${SIZE_TITLE} mb-9`}>Confidentiality and data handling.</h2>
                        </motion.div>
                        <div className="max-w-4xl mx-auto">
                           <motion.div 
                             variants={scrollContainerVariants}
                             initial="hidden"
                             whileInView="visible"
                             viewport={{ once: true, margin: "-100px" }}
                             className="space-y-8"
                           >
                              <motion.p variants={scrollItemFadeUp} className={`${FONT_BODY} ${SIZE_STANDARD} opacity-85 leading-relaxed text-center max-w-2xl mx-auto`}>
                                We work with client information carefully and only for the assignment agreed through the approved workflow. Our safeguards include:
                              </motion.p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                 {[
                                   { title: 'Non-disclosure obligations', desc: 'Confidentiality requirements for staff', icon: <Lock size={20}/> },
                                   { title: 'Role-based access', desc: 'Access limited to assigned work', icon: <ShieldCheck size={20}/> },
                                   { title: 'Agreed file channels', desc: 'Work shared through client-approved methods', icon: <Repeat size={20}/> },
                                   { title: 'Professional conduct', desc: 'Clear expectations for handling client data', icon: <Fingerprint size={20}/> }
                                 ].map((item, idx) => (
                                   <motion.div 
                                      key={idx} 
                                      variants={scrollItemFadeUp}
                                      whileHover={{ y: -4 }}
                                      className="p-5 glass-card rounded-2xl flex items-center gap-4 hover:border-corporate-gold hover:ring-corporate-gold/25 transition-all transform-gpu"
                                   >
                                      <div className="text-corporate-gold p-3 glass-pill rounded-xl">{item.icon}</div>
                                      <div>
                                         <h4 className={`${FONT_TITLE} text-lg mb-1`}>{item.title}</h4>
                                         <p className={`${FONT_BODY} text-sm opacity-60`}>{item.desc}</p>
                                      </div>
                                   </motion.div>
                                 ))}
                              </div>
                              
                              <motion.p variants={scrollItemFadeUp} className={`${FONT_BODY} ${SIZE_STANDARD} italic text-corporate-gold text-center`}>
                                Protecting client and end-customer information is part of how every assignment is managed.
                              </motion.p>
                           </motion.div>
                        </div>
                      </div>
                   </div>
                </section>

                <section className="py-16 md:py-20 glass-section">
                   <div className="container mx-auto px-6 md:px-12">
                      <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className={`${FONT_TITLE} ${SIZE_TITLE} italic mb-10 text-center`}
                      >
                        Why firms work with <span className="text-corporate-gold">Win-Win.</span>
                      </motion.h2>
                      <motion.div 
                        variants={scrollContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto text-left"
                      >
                         {[
                           { title: 'Focused support', text: 'Built for businesses that need dependable accounting and compliance preparation.' },
                           { title: 'Relevant knowledge', text: 'Familiarity with SFRS, ACRA, IRAS, CPF and MOM support requirements.' },
                           { title: 'Qualified review', text: 'Work prepared and reviewed by accounting and compliance professionals.' },
                           { title: 'Capacity support', text: 'Extra hands during month-end, audit and filing periods.' },
                           { title: 'Clear communication', text: 'Open items, assumptions and timelines are kept visible.' },
                           { title: 'Defined responsibility', text: 'Client relationship, review, and sign-off stay with the responsible professional team.' }
                         ].map((item, idx) => (
                           <motion.div 
                             key={idx} 
                             variants={scrollItemFadeUp}
                             whileHover={{ y: -6 }}
                             className="p-6 glass-card rounded-2xl transition-all hover:border-corporate-gold/40 group transform-gpu"
                           >
                              <h4 className={`${FONT_TITLE} text-xl mb-3 group-hover:text-corporate-gold transition-colors`}>{item.title}</h4>
                              <p className={`${FONT_BODY} text-sm opacity-70 leading-relaxed`}>{item.text}</p>
                           </motion.div>
                         ))}
                      </motion.div>
                      <motion.div 
                        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                        className="mt-10 p-8 glass-card glass-navy text-white rounded-2xl text-center max-w-4xl mx-auto"
                      >
                         <p className={`${FONT_BODY} ${SIZE_STANDARD} leading-relaxed`}>
                           We work best with firms that want reliable support, clear communication and a long-term working relationship.
                         </p>
                      </motion.div>
                   </div>
                </section>

                <section className="py-16 md:py-20">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-10"
                      >
                        <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-4 block`}>A thoughtful choice</span>
                        <h2 className={`${FONT_TITLE} ${SIZE_TITLE} text-corporate-blue dark:text-stone-100 mb-4`}>
                          Support that helps you review with confidence.
                        </h2>
                        <p className={`${FONT_BODY} text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed`}>
                          The value of a back-office partner is not only speed. It is the confidence that routine work is prepared carefully, communicated clearly, and ready for responsible review.
                        </p>
                      </motion.div>

                      <motion.div
                        variants={scrollContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5"
                      >
                        {reflectionQuotes.map((item) => (
                          <motion.div
                            key={item.quote}
                            variants={scrollItemFadeUp}
                            whileHover={{ y: -4 }}
                            className="p-6 md:p-7 glass-card rounded-2xl text-left"
                          >
                            <p className={`${FONT_TITLE} text-xl md:text-2xl text-corporate-blue dark:text-stone-100 leading-snug mb-5`}>
                              "{item.quote}"
                            </p>
                            <p className={`${FONT_BODY} text-sm text-stone-600 dark:text-stone-300 leading-relaxed`}>
                              {item.text}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </section>

                <PageQuote text="A good choice is the one that gives your team clarity, capacity, and confidence when deadlines are close." subtext="Win-Win Business Solutions" />
              </div>
            )}

            {/* ABOUT US PAGE */}
            {currentPage === 'about' && (
              <div className="w-full">
                <section className="pt-32 md:pt-36 pb-20 glass-section">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto">
                      
                      {/* Sub-header with elegant layout */}
                      <div className="border-b border-stone-200/40 dark:border-slate-800/60 pb-8 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-center md:text-left">
                        <div className="mx-auto md:mx-0">
                          <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-3 block`}>Corporate Profile</span>
                          <h1 className={`${FONT_TITLE} text-2xl md:text-4xl leading-tight text-corporate-blue dark:text-stone-100`}>
                            About <span className="text-corporate-gold">Win-Win.</span>
                          </h1>
                        </div>
                        <p className={`${FONT_BODY} text-sm md:text-base text-stone-600 dark:text-stone-300 max-w-sm leading-relaxed mx-auto md:mx-0`}>
                          The Madurai back-office team supporting Win-Win Management Consultants, Singapore.
                        </p>
                      </div>
                      
                      {/* Responsive Grid Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-stretch">
                        
                        {/* Box 1: Core Mission (Large block but tidy font) */}
                        <motion.div 
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                          className="lg:col-span-7 glass-card p-7 md:p-8 rounded-2xl flex flex-col justify-between"
                        >
                          <div>
                            <span className={`${FONT_ACCENT} text-[8px] text-corporate-gold mb-6 block`}>Who we are</span>
                            <p className={`${FONT_BODY} text-sm md:text-base leading-relaxed text-corporate-blue dark:text-stone-100 mb-6`}>
                              Win-Win Business Solutions is the Madurai back office for Win-Win Management Consultants. Our role is to prepare accurate, review-ready accounting, payroll, GST, tax, and working-paper support so the client-facing team can focus on communication, final review, and professional judgement.
                            </p>
                          </div>
                          <div className="border-t border-stone-100 dark:border-slate-800/80 pt-6">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-corporate-blue/60 dark:text-stone-300/80">Operational headquarters • Madurai, Tamil Nadu</span>
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                          className="lg:col-span-5 glass-card glass-navy rounded-2xl overflow-hidden min-h-[260px] text-white p-7 flex flex-col justify-between text-left"
                        >
                          <div>
                            <p className={`${FONT_ACCENT} text-[8px] text-corporate-gold mb-4`}>Support focus</p>
                            <h2 className={`${FONT_TITLE} text-2xl leading-tight mb-5`}>Prepared work your review team can use.</h2>
                            <p className={`${FONT_BODY} text-sm leading-relaxed text-stone-200`}>
                              We handle the preparation layer: schedules, reconciliations, working papers, payroll workings, tax support, and compliance documents, so your reviewers can move straight to sign-off.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-8">
                            {['Bookkeeping', 'Audit support', 'Payroll', 'Tax support'].map((item) => (
                              <div key={item} className="rounded-xl border border-corporate-gold/30 bg-white/10 px-4 py-3 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Box 3: Technical Integrity */}
                        <motion.div 
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          viewport={{ once: true }}
                          className="lg:col-span-6 glass-card p-7 md:p-8 rounded-2xl text-left"
                        >
                          <h3 className={`${FONT_TITLE} text-xl mb-6 text-corporate-gold`}>Why we exist</h3>
                          <p className={`${FONT_BODY} text-sm md:text-base opacity-80 leading-relaxed`}>
                            Businesses often need dependable back-office support during reporting, filing, and audit periods. We help with the preparation work while Win-Win Management Consultants keeps control of review, judgment, and client communication.
                          </p>
                        </motion.div>

                        {/* Box 4: Strategic Benefits */}
                        <motion.div 
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="lg:col-span-6 glass-card p-7 md:p-8 rounded-2xl text-left"
                        >
                          <h3 className={`${FONT_TITLE} text-xl mb-6 text-corporate-gold`}>How we work</h3>
                          <p className={`${FONT_BODY} text-sm md:text-base opacity-80 leading-relaxed`}>
                            We follow the agreed templates, instructions, and review notes. Work is prepared, checked, and returned with clear open points so the responsible team can complete its final review without unnecessary back-and-forth.
                          </p>
                        </motion.div>

                      </div>
                    </div>
                  </div>
                </section>
                <PageQuote text="The best back-office support is careful, clear, and easy for the reviewing accountant to rely on." subtext="About Win-Win" />
              </div>
            )}

            {/* TEAM PAGE */}
            {currentPage === 'team' && (
              <div className="w-full">
                <section className="pt-32 md:pt-36 pb-20 glass-section">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-5xl mx-auto text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                      >
                        <h1 className={`${FONT_TITLE} ${SIZE_TITLE} mb-6`}>Our accounting support team.</h1>
                        <p className={`${FONT_BODY} text-base md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-85`}>
                          Our work is handled by accounting and compliance professionals, with senior oversight for review and handover across every engagement.
                        </p>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-2 mb-8"
                        >
                          <Users size={14} className="text-corporate-gold" />
                          <span className={`${FONT_ACCENT} text-[8px] text-corporate-blue dark:text-stone-200`}>Roles across our back-office team</span>
                        </motion.div>
                      </motion.div>
 
                      <motion.div 
                        variants={scrollContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20"
                      >
                        {[
                          { title: "Senior review", desc: "Chartered Accountants and Cost and Management Accountants with strong technical accounting backgrounds oversee files before handover.", icon: <Award size={24}/> },
                          { title: "Accounting graduates", desc: "Accounting and finance graduates trained in SFRS-related support work, building practical experience under senior guidance.", icon: <GraduationCap size={24}/> },
                          { title: "Audit support executives", desc: "Team members experienced in schedules, working papers, and audit file documentation, indexed and review-ready.", icon: <SearchCheck size={24}/> },
                          { title: "Payroll and compliance support", desc: "Professionals familiar with CPF, MOM, and IRAS requirements, and the working papers that support them.", icon: <Repeat size={24}/> }
                        ].map((item, i) => (
                          <motion.div 
                            key={i} 
                            variants={scrollItemFadeUp}
                            whileHover={{ y: -6 }}
                            className="p-6 glass-card rounded-2xl flex flex-col items-start text-left group transition-all duration-500 transform-gpu"
                          >
                            <div className="w-12 h-12 glass-pill text-corporate-gold rounded-xl flex items-center justify-center mb-5 group-hover:bg-corporate-gold/15 group-hover:text-corporate-gold transition-colors">{item.icon}</div>
                            <h4 className={`${FONT_TITLE} text-xl mb-3 leading-tight group-hover:text-corporate-gold transition-colors`}>{item.title}</h4>
                            <p className={`${FONT_BODY} text-sm opacity-70 leading-relaxed`}>{item.desc}</p>
                          </motion.div>
                        ))}
                      </motion.div>
 
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
                         <div className="space-y-8 md:space-y-12">
                            <motion.h2 
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8 }}
                              className={`${FONT_TITLE} text-2xl md:text-3xl italic leading-tight`}
                            >
                              Clear accountability.
                            </motion.h2>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 0.8 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className={`${FONT_BODY} text-sm md:text-base leading-relaxed`}
                            >
                              Each engagement has named responsibility for planning, preparation, checking, and handover. This helps keep the work consistent across recurring assignments.
                            </motion.p>
                            <motion.ul 
                              variants={scrollContainerVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              className="space-y-4 md:space-y-6"
                            >
                               {[
                                 { title: "Technical accuracy & consistency", icon: <Zap size={18}/> },
                                 { title: "Client-specific methodology & templates", icon: <ClipboardCheck size={18}/> },
                                 { title: "Singapore statutory & professional standards", icon: <ShieldCheck size={18}/> }
                               ].map((u, idx) => (
                                 <motion.li 
                                    key={idx} 
                                    variants={scrollItemFadeRight}
                                    whileHover={{ x: 6, color: '#D4B483' }}
                                    className={`${FONT_BODY} text-sm md:text-base flex items-center gap-4 p-4 glass-card rounded-2xl cursor-default transition-all transform-gpu text-left`}
                                 >
                                    <span className="text-corporate-gold shrink-0">{u.icon}</span>
                                    <span>{u.title}</span>
                                 </motion.li>
                               ))}
                            </motion.ul>
                         </div>
                         <motion.div 
                           initial="hidden"
                           whileInView="visible"
                           viewport={{ once: true }}
                           variants={scrollItemFadeLeft}
                           whileHover={{ y: -4 }}
                           className="p-7 md:p-9 glass-card glass-navy text-white dark:text-stone-100 rounded-2xl flex flex-col justify-center transform-gpu transition-all text-left"
                         >
                            <h4 className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-4 md:mb-6`}>Ongoing learning</h4>
                            <p className={`${FONT_BODY} text-sm md:text-base leading-relaxed`}>
                               Training and knowledge updates help our team stay aligned with Singapore accounting, payroll, tax, GST, ACRA, IRAS, CPF, and regulatory support requirements.
                            </p>
                         </motion.div>
                      </div>
                     </div>
                   </div>
                 </section>
                <PageQuote text="Reliable support depends on people who understand the work and check it carefully." subtext="Win-Win Team" />
              </div>
            )}

            {/* SERVICES PAGE */}
            {currentPage === 'services' && (
              <div className="w-full">
                <section className="pt-32 md:pt-36 pb-20">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-5xl mx-auto text-center">
                      <h1 className={`${FONT_TITLE} ${SIZE_TITLE} mb-6`}>Accounting, audit, payroll, and tax support services.</h1>
                      <p className={`${FONT_BODY} text-sm md:text-lg mb-12 opacity-85 leading-relaxed max-w-3xl mx-auto`}>
                        We prepare recurring back-office work and assignment-based support from Madurai for business clients served through Win-Win Management Consultants. Final review, client communication, and sign-off remain with the responsible professional team.
                      </p>

                      <div className="space-y-12">
                         <ServiceGrid onInquire={() => navigateTo('contact')} />
                      </div>

                      <motion.section
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left"
                      >
                        <div className="lg:col-span-5 p-7 md:p-8 rounded-2xl glass-card glass-navy text-white">
                          <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-4 block`}>Before work starts</span>
                          <h2 className={`${FONT_TITLE} text-2xl md:text-3xl mb-4`}>What we usually need before work starts.</h2>
                          <p className={`${FONT_BODY} text-sm md:text-base text-stone-200 leading-relaxed`}>
                            Clear inputs at the start help avoid unnecessary review loops. These items can be adjusted depending on the assignment.
                          </p>
                        </div>
                        <motion.div
                          variants={scrollContainerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-100px" }}
                          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          {startChecklist.map((item, idx) => (
                            <motion.div
                              key={item}
                              variants={scrollItemFadeUp}
                              whileHover={{ y: -5 }}
                              className="p-5 rounded-2xl glass-card"
                            >
                              <span className="text-[10px] font-bold tracking-[0.22em] text-corporate-gold">0{idx + 1}</span>
                              <p className={`${FONT_BODY} text-sm md:text-base text-stone-700 dark:text-stone-200 leading-relaxed mt-3`}>{item}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.section>

                      <motion.section
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="mt-16 text-left"
                      >
                        <div className="text-center mb-8">
                          <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-3 block`}>Common questions</span>
                          <h2 className={`${FONT_TITLE} text-2xl md:text-3xl text-corporate-blue dark:text-stone-100`}>Questions clients usually ask.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {serviceFaqs.map((faq) => (
                            <motion.div
                              key={faq.question}
                              whileHover={{ y: -4 }}
                              className="p-5 glass-card rounded-2xl"
                            >
                              <h3 className={`${FONT_TITLE} text-xl text-corporate-blue dark:text-stone-100 mb-3`}>{faq.question}</h3>
                              <p className={`${FONT_BODY} text-sm text-stone-600 dark:text-stone-300 leading-relaxed`}>{faq.answer}</p>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-9 text-center">
                          <MagneticButton primary onClick={() => navigateTo('contact')} className="px-8 py-3 text-[11px] font-semibold uppercase tracking-wider rounded-lg">
                            Discuss your support requirements
                          </MagneticButton>
                        </div>
                      </motion.section>
                    </div>
                  </div>
                </section>
                <PageQuote text="Clear working papers, clean schedules, and timely communication make compliance work easier to review." subtext="Win-Win Services" />
              </div>
            )}

            {/* CAREERS PAGE */}
            {currentPage === 'careers' && (
              <div className="w-full">
                <section className="pt-32 md:pt-36 pb-20 glass-section">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-5xl mx-auto text-center">
                      <h1 className={`${FONT_TITLE} ${SIZE_TITLE} mb-8`}>Build a career in accounting support.</h1>
                      
                      <div className="space-y-14">
                        <div className="max-w-4xl mx-auto">
                           <p className={`${FONT_BODY} text-lg md:text-2xl leading-snug mb-6`}>
                             We believe that our people are the foundation of our service quality and professional credibility.
                           </p>
                           <p className={`${FONT_BODY} ${SIZE_STANDARD} opacity-80 leading-relaxed max-w-3xl mx-auto`}>
                             We offer a work environment for people who want to build practical experience in accounting, audit support, payroll, tax, GST, and compliance work for business clients.
                           </p>
                        </div>

                        <motion.div variants={scrollContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                           <motion.div 
                              whileHover={{ y: -4 }}
                              className="p-7 md:p-8 glass-card rounded-2xl transform-gpu text-left"
                           >
                              <h3 className={`${FONT_TITLE} text-2xl mb-5`}>Why work with us</h3>
                              <ul className="space-y-4 mb-7">
                                 {['Exposure to accounting, audit support, tax, payroll, GST, and regulatory work', 'Work connected to Win-Win Management Consultants and business clients', 'Structured processes with senior supervision', 'Ongoing learning and skill development', 'A stable team environment with long-term growth'].map((s, idx) => (
                                   <li key={idx} className={`${FONT_BODY} text-sm md:text-base flex gap-3 opacity-75`}><span className="text-corporate-gold">•</span>{s}</li>
                                 ))}
                              </ul>
                              <p className={`${FONT_BODY} text-base opacity-90`}>
                                Our professionals gain hands-on exposure to SFRS-related support work, ACRA and IRAS compliance support, audit documentation and international accounting workflows.
                              </p>
                           </motion.div>
                           <motion.div 
                              whileHover={{ y: -4 }}
                              className="p-7 md:p-8 glass-card glass-navy text-white dark:text-stone-100 rounded-2xl transform-gpu text-left"
                           >
                              <h3 className={`${FONT_TITLE} text-2xl mb-5`}>Who we are looking for</h3>
                              <p className={`${FONT_BODY} text-sm md:text-base mb-5 opacity-80`}>
                                We welcome detail-oriented individuals interested in international accounting support work, including:
                              </p>
                              <ul className="space-y-3 mb-7 text-sm md:text-base">
                                 {['Chartered Accountants and Cost and Management Accountants', 'CA/CMA inter-qualified candidates', 'Commerce, accounting, and finance graduates', 'Professionals with experience in bookkeeping, audit support, payroll, tax, or compliance', 'Fresh graduates with strong accounting fundamentals and a willingness to learn'].map((s, idx) => (
                                   <li key={idx} className={`${FONT_BODY} flex gap-4`}><span className="text-corporate-gold">•</span>{s}</li>
                                 ))}
                              </ul>
                              <p className={`${FONT_BODY} text-sm md:text-base opacity-85 leading-relaxed border-t border-white/20 pt-5`}>
                                Strong analytical skills, attention to detail, and a commitment to quality are essential for every role on our team.
                              </p>
                           </motion.div>
                        </motion.div>

                        <div className="p-8 md:p-10 glass-card glass-navy text-white dark:text-stone-100 rounded-2xl text-center overflow-hidden relative group">
                           <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
                           <h3 className={`${FONT_TITLE} text-2xl md:text-3xl mb-5 relative z-10`}>How to Apply</h3>
                           <p className={`${FONT_BODY} ${SIZE_STANDARD} mb-8 opacity-80 max-w-3xl mx-auto relative z-10`}>
                             Interested candidates may submit their resume and a brief cover note outlining their qualifications and area of interest. Shortlisted candidates will be contacted for further discussion.
                           </p>
                           <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                              <MagneticButton primary onClick={() => window.open('mailto:admin@win-win.com.in?subject=Job%20Application%20-%20Win-Win')} className="px-8 py-3 rounded-lg text-[11px] uppercase tracking-widest font-black">
                                Submit Resume
                              </MagneticButton>
                              <MagneticButton onClick={() => window.open('https://wa.me/919443705623?text=Hi,%20I\'m%20interested%20in%20career%20opportunities%20at%20Win-Win', '_blank')} className="px-8 py-3 rounded-lg text-[11px] uppercase tracking-widest font-black border-white text-white hover:text-corporate-gold">
                                Inquire via WhatsApp
                              </MagneticButton>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* CONTACT PAGE */}
            {currentPage === 'contact' && (
              <div className="w-full">
                <section className="pt-32 md:pt-36 pb-20">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-center lg:text-left">
                      
                      {/* Left Column: Direct Inbound Gates & Address */}
                      <div className="lg:col-span-5 space-y-6">
                        <div>
                          <span className={`${FONT_ACCENT} text-[9px] text-corporate-gold mb-3 block`}>Contact</span>
                          <h1 className={`${FONT_TITLE} text-2xl md:text-3xl leading-snug text-corporate-blue dark:text-stone-100 mb-4`}>
                            Contact <br/><span className="text-corporate-gold">Win-Win.</span>
                          </h1>
                          <p className={`${FONT_BODY} text-sm text-stone-600 dark:text-stone-300 leading-relaxed`}>
                            Tell us what accounting, audit, payroll, GST, tax, or compliance support is needed. We will review the details and respond with the next practical step, typically within one business day.
                          </p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="glass-pill rounded-2xl p-4 flex items-start gap-4 text-left"
                        >
                          <Clock size={18} className="text-corporate-gold mt-0.5 shrink-0" />
                          <div>
                            <p className={`${FONT_ACCENT} text-[8px] text-corporate-gold mb-1`}>Expected response</p>
                            <p className={`${FONT_BODY} text-xs text-stone-600 dark:text-stone-300 leading-relaxed`}>
                              We normally reply within one business day with the next practical step and any information needed to scope the work.
                            </p>
                          </div>
                        </motion.div>

                        <div className="space-y-4">
                          
                          {/* Email Gate */}
                          <a href="mailto:admin@win-win.com.in" className="block group">
                            <motion.div 
                              whileHover={{ x: 6, translateZ: 5 }}
                              className="p-4 glass-card rounded-2xl flex gap-4 items-center cursor-pointer transition-all transform-gpu text-left"
                            >
                              <div className="w-10 h-10 glass-pill rounded-xl flex items-center justify-center text-corporate-gold group-hover:bg-corporate-gold/15 group-hover:text-corporate-gold transition-colors duration-300">
                                <Mail size={18} />
                              </div>
                              <div>
                                <p className={`${FONT_ACCENT} text-[7px] mb-0.5 opacity-60 text-corporate-gold dark:text-sky-400 font-bold`}>Email</p>
                                <p className={`${FONT_BODY} text-base text-corporate-blue dark:text-stone-100 font-medium group-hover:text-corporate-gold transition-colors duration-300`}>admin@win-win.com.in</p>
                              </div>
                            </motion.div>
                          </a>

                          {/* WhatsApp Gate */}
                          <a href="https://wa.me/919443705623?text=Hi%20Win-Win,%20we%20would%20like%20to%20inquire%20about%20your%20accounting%20support%20services" target="_blank" rel="noopener noreferrer" className="block group">
                            <motion.div 
                              whileHover={{ x: 6, translateZ: 5 }}
                              className="p-4 glass-card rounded-2xl flex gap-4 items-center cursor-pointer transition-all transform-gpu text-left"
                            >
                              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                <MessageCircle size={18} />
                              </div>
                              <div>
                                <p className={`${FONT_ACCENT} text-[7px] mb-0.5 text-green-500 tracking-wider font-bold`}>WhatsApp Number</p>
                                <p className={`${FONT_BODY} text-base text-corporate-blue dark:text-stone-100 font-medium group-hover:text-green-500 transition-colors duration-300`}>+91 94437 05623</p>
                              </div>
                            </motion.div>
                          </a>

                        </div>

                        {/* Location / Note - Madurai Address Card */}
                        <div className="p-5 glass-card rounded-2xl leading-relaxed text-left space-y-4">
                          <div>
                            <p className={`${FONT_ACCENT} text-[7px] text-corporate-gold mb-2`}>Registered Office</p>
                            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-corporate-blue dark:text-stone-100">
                              WIN-WIN BUSINESS SOLUTIONS PVT. LTD.
                            </p>
                            <p className={`${FONT_BODY} text-xs text-stone-600 dark:text-stone-400 mt-1 leading-snug italic`}>
                              No. 7B, Ground Floor, Royal City, Valar Nagar,<br />
                              Ilanthaikulam, Uthangudi,<br />
                              Madurai 625107, Tamil Nadu, India.
                            </p>
                          </div>
                          
                          <div className="pt-3 border-t border-stone-200/50 dark:border-slate-800/50 text-[10px] text-stone-400">
                            Madurai back office supporting Win-Win Management Consultants, Singapore.
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Inquiry form */}
                      <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                          {!inquirySubmitted ? (
                            <motion.form
                              key="inquiry-form"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.97 }}
                              transition={{ duration: 0.4 }}
                              onSubmit={handleInquirySubmit}
                              className="p-5 md:p-7 glass-card rounded-2xl flex flex-col gap-4 text-left max-w-2xl mx-auto lg:mx-0"
                            >
                              <div className="border-b border-stone-200/60 dark:border-slate-800/70 pb-5">
                                <p className={`${FONT_ACCENT} text-[8px] text-corporate-gold mb-2`}>Enquiry details</p>
                                <h3 className={`${FONT_TITLE} text-xl md:text-2xl text-corporate-blue dark:text-stone-100 mb-2`}>Tell us what support you need</h3>
                                <p className={`${FONT_BODY} text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl`}>
                                  Share the work type, timing, and expected volume. The form opens a prepared email draft for you to review and send.
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 text-left">
                                  <label className={`${FONT_ACCENT} text-[8px] text-corporate-blue/65 dark:text-stone-300`}>Your name</label>
                                  <input 
                                    type="text" 
                                    required 
                                    value={inquiryName}
                                    onChange={(e) => setInquiryName(e.target.value)}
                                    placeholder="e.g. Samuel Lim" 
                                    className="w-full px-4 py-3 rounded-xl glass-input focus:outline-none focus:border-corporate-gold focus:ring-2 focus:ring-corporate-gold/25 text-sm text-stone-800 dark:text-stone-100 transition-all"
                                  />
                                </div>
                                <div className="space-y-2 text-left">
                                  <label className={`${FONT_ACCENT} text-[8px] text-corporate-blue/65 dark:text-stone-300`}>Work email</label>
                                  <input 
                                    type="email" 
                                    required 
                                    value={inquiryEmail}
                                    onChange={(e) => setInquiryEmail(e.target.value)}
                                    placeholder="samuel@limpartners.sg" 
                                    className="w-full px-4 py-3 rounded-xl glass-input focus:outline-none focus:border-corporate-gold focus:ring-2 focus:ring-corporate-gold/25 text-sm text-stone-800 dark:text-stone-100 transition-all"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2 text-left">
                                <label className={`${FONT_ACCENT} text-[8px] text-corporate-blue/65 dark:text-stone-300`}>Support needed</label>
                                <select 
                                  value={inquiryService}
                                  onChange={(e) => setInquiryService(e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl glass-input focus:outline-none focus:border-corporate-gold focus:ring-2 focus:ring-corporate-gold/25 text-sm text-stone-800 dark:text-stone-100 transition-all"
                                >
                                  <option value="Accounting & Bookkeeping Support">Accounting & Bookkeeping Support</option>
                                  <option value="Audit Working Paper Support">Audit Working Paper Support</option>
                                  <option value="Payroll & Statutory Compliance Support">Payroll & Statutory Compliance Support</option>
                                  <option value="IRAS Tax & GST Support">IRAS Tax & GST Support</option>
                                  <option value="Ongoing Back-Office Support">Ongoing Back-Office Support</option>
                                </select>
                              </div>

                              <div className="space-y-2 text-left">
                                <label className={`${FONT_ACCENT} text-[8px] text-corporate-blue/65 dark:text-stone-300`}>Requirement and timeline</label>
                                <textarea 
                                  required
                                  rows={4}
                                  value={inquiryMessage}
                                  onChange={(e) => setInquiryMessage(e.target.value)}
                                  placeholder="Example: monthly bookkeeping for 8 entities, GST support, payroll schedule review, expected timeline, and preferred templates."
                                  className="w-full px-4 py-3 rounded-xl glass-input focus:outline-none focus:border-corporate-gold focus:ring-2 focus:ring-corporate-gold/25 text-sm text-stone-800 dark:text-stone-100 transition-all resize-y min-h-[120px]"
                                />
                              </div>

                              <MagneticButton primary type="submit" className={`w-full py-4 text-xs tracking-wider ${FONT_BODY}`}>
                                Open email draft
                              </MagneticButton>

                              <div className="border-t border-stone-200/70 dark:border-slate-800/80 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                                {['Review details', 'Open email draft', 'Send from mail app'].map((step, idx) => (
                                  <div key={step} className="glass-pill rounded-xl px-3 py-2">
                                    <span className="block text-[8px] font-mono text-corporate-gold mb-1">0{idx + 1}</span>
                                    <span className={`${FONT_BODY} text-[10px] text-stone-500 dark:text-stone-300`}>{step}</span>
                                  </div>
                                ))}
                                <p className={`${FONT_BODY} sm:col-span-3 text-[10px] text-stone-500 dark:text-stone-400 leading-relaxed`}>
                                  Please do not attach financial records or client files through this public form.
                                </p>
                              </div>
                            </motion.form>
                          ) : (
                            <motion.div
                              key="success-screen"
                              initial={{ opacity: 0, scale: 0.98, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ type: "spring", stiffness: 100, damping: 15 }}
                              className="p-8 md:p-10 glass-card rounded-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-gold/[0.04] rounded-full blur-3xl pointer-events-none" />
                              
                              {/* Glowing success seal */}
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                                className="w-16 h-16 bg-corporate-gold/10 text-corporate-gold rounded-full flex items-center justify-center shadow-lg border border-corporate-gold/20"
                              >
                                <CheckCircle2 size={30} className="text-corporate-gold animate-pulse" />
                              </motion.div>

                              <div className="space-y-2">
                                <span className={`${FONT_ACCENT} text-[8px] text-corporate-gold tracking-[0.25em]`}>Email draft opened</span>
                                <h3 className={`${FONT_TITLE} text-xl text-corporate-blue dark:text-stone-100`}>Please send the email from your mail app.</h3>
                                <p className={`${FONT_BODY} text-xs opacity-80 max-w-lg leading-relaxed mx-auto`}>
                                  Thank you, <strong>{inquiryName}</strong>. Your enquiry for <em>{inquiryService}</em> has been prepared as an email draft to admin@win-win.com.in. If your mail app did not open, use the button below to try again.
                                </p>
                              </div>

                              <div className="w-full max-w-md p-5 glass-card rounded-xl flex flex-col gap-3 text-left">
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="opacity-50 font-mono">Recipient:</span>
                                  <span className="text-corporate-gold font-mono">admin@win-win.com.in</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="opacity-50 font-mono">Reply email:</span>
                                  <span className="font-mono">{inquiryEmail}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="opacity-50 font-mono">Expected response:</span>
                                  <span className="text-green-500 font-bold font-mono">Within one business day</span>
                                </div>
                              </div>

                              <motion.button 
                                whileHover={{ scale: 1.012 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  if (lastInquiryMailto) {
                                    window.location.href = lastInquiryMailto;
                                  }
                                }}
                                className="px-8 py-3 bg-corporate-blue text-white rounded-xl text-xs uppercase tracking-widest font-black hover:bg-[#b59e6d] transition-colors"
                              >
                                Open email draft again
                              </motion.button>

                              <motion.button 
                                whileHover={{ scale: 1.012 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  setInquirySubmitted(false);
                                  setInquiryName('');
                                  setInquiryEmail('');
                                  setInquiryMessage('');
                                  setLastInquiryMailto('');
                                }}
                                className="px-8 py-3 glass-pill rounded-xl text-xs uppercase tracking-widest font-black text-corporate-blue dark:text-stone-200 hover:bg-corporate-gold/15 hover:text-corporate-gold transition-colors"
                              >
                                Prepare another enquiry
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </div>
                </section>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <PolicyModal 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)} 
        defaultTab={activePolicyTab} 
      />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            key="back-to-top" 
            initial={{ opacity: 0, scale: 0.5, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.5, y: 20 }} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="fixed bottom-8 right-5 w-11 h-11 glass-card rounded-full flex items-center justify-center text-corporate-gold z-[100] transition-transform hover:-translate-y-2 active:scale-90 transform-gpu"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="bg-[#050a17] text-slate-400 py-20 border-t border-slate-900 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-5 gap-10 mb-14 text-left max-w-6xl mx-auto">
            <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <WinWinLogo className="w-[64px] h-[50px]" />
                <div className="flex flex-col">
                   <div className={`${FONT_TITLE} text-2xl uppercase tracking-widest text-white leading-none`}>Win-Win</div>
                   <span className={`${FONT_ACCENT} text-[10px] mt-1 text-corporate-gold dark:text-sky-400`}>Business Solutions</span>
                </div>
              </div>
              <p className={`${FONT_BODY} text-sm md:text-base opacity-60 max-w-xl leading-relaxed`}>
                The Madurai back office supporting Win-Win Management Consultants, Singapore.
              </p>
            </div>
            <div>
               <h5 className={`${FONT_ACCENT} text-[10px] text-white mb-8`}>Navigation</h5>
               <div className="space-y-4">
                 {menuLinks.map(l => (
                   <motion.button 
                    key={l} 
                    onClick={() => navigateTo(l.toLowerCase() as Page)} 
                    whileHover={{ x: 5, color: '#D4B483' }}
                    className={`${FONT_BODY} text-base block opacity-50 transition-all text-left transform-gpu`}
                   >
                     {l}
                   </motion.button>
                 ))}
               </div>
            </div>
            <div>
               <h5 className={`${FONT_ACCENT} text-[10px] text-white mb-8`}>Governance</h5>
               <div className="space-y-4">
                 <motion.button 
                   onClick={() => openPolicy('privacy')} 
                   whileHover={{ x: 5, color: '#D4B483' }}
                   className={`${FONT_BODY} text-base block opacity-50 transition-all text-left transform-gpu`}
                 >
                   Privacy Policy
                 </motion.button>
                 <motion.button 
                   onClick={() => openPolicy('terms')} 
                   whileHover={{ x: 5, color: '#D4B483' }}
                   className={`${FONT_BODY} text-base block opacity-50 transition-all text-left transform-gpu`}
                 >
                   Terms of Service
                 </motion.button>
                 <motion.button 
                   onClick={() => openPolicy('pdpa')} 
                   whileHover={{ x: 5, color: '#D4B483' }}
                   className={`${FONT_BODY} text-base block opacity-50 transition-all text-left transform-gpu`}
                 >
                   Data Protection
                 </motion.button>
               </div>
            </div>
            <div>
               <h5 className={`${FONT_ACCENT} text-[10px] text-white mb-8`}>Registry</h5>
               <div className="space-y-6">
                 <div>
                    <p className={`${FONT_ACCENT} text-[8px] opacity-40 mb-1`}>CIN</p>
                    <p className={`${FONT_BODY} text-base text-stone-300`}>U7499TN2022PTC152948</p>
                 </div>
                 <div>
                    <p className={`${FONT_ACCENT} text-[8px] opacity-40 mb-1`}>Headquarters</p>
                    <p className={`${FONT_BODY} text-base text-stone-300 leading-snug`}>Madurai, Tamil Nadu, <br/>India</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-900 flex justify-center items-center opacity-40 max-w-6xl mx-auto">
             <span className={`${FONT_ACCENT} text-[10px]`}>© 2026 WIN-WIN Business Solutions Pvt Ltd. Madurai back-office support for Win-Win Management Consultants, Singapore.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
