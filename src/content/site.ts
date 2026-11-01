// All site copy lives here so it can be edited without touching layout code.

export const company = {
  name: 'Win-Win Business Solutions',
  legalName: 'WIN-WIN Business Solutions Pvt Ltd',
  parent: 'Win-Win Management Consultants',
  email: 'admin@win-win.com.in',
  phoneDisplay: '+91 94437 05623',
  phoneTel: '+919443705623',
  whatsapp: 'https://wa.me/919443705623',
  cin: 'U7499TN2022PTC152948',
  address: [
    'No. 7B, Ground Floor, Royal City, Valar Nagar,',
    'Ilanthaikulam, Uthangudi,',
    'Madurai 625107, Tamil Nadu, India',
  ],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Royal+City+Valar+Nagar+Ilanthaikulam+Uthangudi+Madurai+625107',
};

export const waLink = (text: string) => `${company.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/careers', label: 'Careers' },
] as const;

export type ServiceId = 'accounting' | 'audit' | 'payroll' | 'tax';

export interface Service {
  id: ServiceId;
  short: string;
  title: string;
  summary: string;
  overview: string;
  whoNeeds: string;
  whyItMatters: string;
  scope: string[];
  process: string[];
  disclaimer?: string;
}

export const services: Service[] = [
  {
    id: 'accounting',
    short: 'Bookkeeping',
    title: 'Accounting & Bookkeeping',
    summary: 'Ledger maintenance, reconciliations and management accounts, prepared to SFRS and ready for review.',
    overview:
      'We keep routine accounting moving — from ledger updates and reconciliations to management accounts and year-end support.',
    whoNeeds:
      'Businesses that need recurring bookkeeping, month-end help, or extra capacity before review and reporting deadlines.',
    whyItMatters: 'Clean books shorten review time and make audit, tax and management reporting easier to complete.',
    scope: [
      'Day-to-day bookkeeping and ledger maintenance',
      'Bank, creditor and debtor reconciliations',
      'Monthly, quarterly and annual management accounts',
      'Trial balance review and mapping',
      'Year-end financial statement preparation (SFRS)',
    ],
    process: [
      'Receive ledger exports, templates and prior-period files',
      'Prepare entries, reconciliations and schedules',
      'Flag missing items and unusual balances',
      'Return files in your format for review',
    ],
  },
  {
    id: 'audit',
    short: 'Audit support',
    title: 'Audit Working Papers',
    summary: 'Non-attest schedules, lead sheets, sampling support and indexed audit files for your reviewers.',
    overview: 'We prepare schedules, supporting working papers and audit file documentation, organised for review.',
    whoNeeds: 'Audit practices that need help preparing schedules, indexing files and organising papers in busy season.',
    whyItMatters: 'Well-organised working papers let reviewers trace figures faster and keep files easy to follow.',
    scope: [
      'Audit planning support and documentation',
      'Working papers and supporting schedules',
      'Substantive testing, analytics and sampling support',
      'Lead schedules and cross-referencing',
      'Audit file collation and indexing',
    ],
    process: [
      'Confirm file structure, template and support areas',
      'Prepare schedules, lead sheets and references',
      'Note exceptions and open queries',
      "Deliver organised files for the reviewer's judgement",
    ],
    disclaimer: 'Audit support is non-attest preparation work. Final judgement and sign-off remain with the responsible professional.',
  },
  {
    id: 'payroll',
    short: 'Payroll & CPF',
    title: 'Payroll & Statutory Compliance',
    summary: 'Salary, CPF, leave and deduction workings — checked against prior periods before they reach you.',
    overview: 'We support payroll calculations and statutory workings based on the information you provide.',
    whoNeeds: 'Businesses managing recurring payroll, statutory workings, leave calculations or deduction schedules.',
    whyItMatters: 'Small payroll errors affect employees, CPF records and client confidence — so every run is checked.',
    scope: [
      'Payroll processing support from client data',
      'CPF computation, schedules and reconciliation',
      'Leave, overtime and statutory deduction workings',
      'MOM-related payroll documentation',
    ],
    process: [
      'Receive payroll inputs, staff changes and cut-offs',
      'Prepare salary, CPF, leave and deduction workings',
      'Check totals against prior periods',
      'Return files for approval before processing',
    ],
  },
  {
    id: 'tax',
    short: 'Tax & GST',
    title: 'Tax, GST & Regulatory',
    summary: 'Corporate tax schedules, GST returns and filing-ready XBRL, with assumptions clearly noted.',
    overview: 'We prepare tax, GST, XBRL and regulatory support files for review and filing.',
    whoNeeds: 'Businesses that need preparation support for GST, corporate tax schedules, XBRL and regulatory reporting.',
    whyItMatters: 'Clear working files help the reviewing accountant check assumptions, source figures and filing positions.',
    scope: [
      'Corporate income tax computation support',
      'Tax schedules and supporting workings',
      'GST computation and return preparation',
      'XBRL preparation, validation and filing-ready files',
      'Regulatory reporting documentation',
    ],
    process: [
      'Confirm filing requirement, records and template',
      'Prepare tax, GST, XBRL or regulatory schedules',
      'Identify missing information and review points',
      'Return files for approval and filing',
    ],
    disclaimer: 'All support is based on information and instructions provided through the responsible workflow.',
  },
];

export const steps = [
  { title: 'Scope', text: 'Agree the service, file format, timing, review owner and communication channel up front.' },
  { title: 'Set up', text: "Your templates, checklists and prior review notes become the working base." },
  { title: 'Prepare & check', text: 'Work is prepared by one person and checked by another, with open items clearly noted.' },
  { title: 'Hand over', text: 'Files return review-ready. Feedback is captured so the next cycle runs smoother.' },
];

export const split = {
  us: {
    label: 'Prepared in Madurai',
    who: company.name,
    items: ['Bookkeeping & reconciliations', 'Working papers & schedules', 'Payroll & CPF workings', 'Tax, GST & XBRL preparation', 'Open-item & query notes'],
  },
  them: {
    label: 'Reviewed in Singapore',
    who: company.parent,
    items: ['Client relationship', 'Professional judgement', 'Final review', 'Filing decisions', 'Statutory sign-off'],
  },
};

export const quality = [
  'Client-specific working instructions',
  'Preparer and checker are different people',
  'Senior review before every handover',
  'Open items and assumptions clearly noted',
  'Feedback captured for the next cycle',
];

export const safeguards = [
  { title: 'Non-disclosure', text: 'Every team member is bound by confidentiality obligations.' },
  { title: 'Role-based access', text: 'Access is limited to the people assigned to the work.' },
  { title: 'Agreed channels', text: 'Files move only through client-approved systems.' },
  { title: 'Clear conduct', text: 'Defined expectations for handling client data.' },
];

export const faqs = [
  {
    q: 'Do you provide attest or assurance opinions?',
    a: 'No. We provide non-attest preparation support only. Your firm keeps full responsibility for review, sign-off and any attest or assurance opinion.',
  },
  {
    q: "Can you work within our templates and software?",
    a: "Yes. We adapt to your templates, working-paper formats and software wherever practical.",
  },
  {
    q: 'Do you support recurring bookkeeping and payroll?',
    a: 'Yes — recurring bookkeeping, reconciliations, management accounts, payroll workings, CPF schedules and related compliance support.',
  },
  {
    q: 'How is confidentiality handled?',
    a: 'All work follows confidentiality protocols suited to cross-border accounting support. Please never send client financial records through the website form.',
  },
  {
    q: 'How quickly do you respond?',
    a: 'We normally reply within one business day with the next practical step and anything we need to scope the work.',
  },
];

export const teamRoles = [
  { title: 'Senior review', text: 'Chartered Accountants and Cost & Management Accountants oversee files before handover.' },
  { title: 'Accounting graduates', text: 'Trained in SFRS-related support work and building experience under senior guidance.' },
  { title: 'Audit support executives', text: 'Experienced in schedules, working papers and indexed, review-ready audit files.' },
  { title: 'Payroll & compliance', text: 'Familiar with CPF, MOM and IRAS requirements and the papers that support them.' },
];

export const careers = {
  why: [
    'Exposure to accounting, audit support, tax, payroll, GST and regulatory work',
    'Work connected to Win-Win Management Consultants and their clients',
    'Structured processes with senior supervision',
    'Ongoing learning and skill development',
    'A stable team with long-term growth',
  ],
  who: [
    'Chartered Accountants and Cost & Management Accountants',
    'CA / CMA inter-qualified candidates',
    'Commerce, accounting and finance graduates',
    'Professionals with bookkeeping, audit, payroll, tax or compliance experience',
    'Fresh graduates with strong fundamentals and a willingness to learn',
  ],
};

export const enquiryServices = [
  'Accounting & Bookkeeping',
  'Audit Working Papers',
  'Payroll & Statutory Compliance',
  'Tax, GST & Regulatory',
  'Ongoing Back-Office Support',
  'Something else',
];

/** The pinned scroll story on the home page. `title` = [plain, accent]. */
export const journey = [
  {
    key: 'received',
    label: 'Received',
    where: 'Madurai',
    title: ['Files arrive through', 'your channel.'],
    text: 'Ledger exports, bank statements and payroll inputs come in through the client-approved workflow — never through the website.',
    chips: ['XLSX · PDF · CSV', 'Approved channel'],
  },
  {
    key: 'prepared',
    label: 'Prepared',
    where: 'Madurai',
    title: ['Built line by line on', 'your template.'],
    text: 'A preparer assembles the schedule in your format and references every figure to its source document.',
    chips: ['Your template', 'Source-referenced'],
  },
  {
    key: 'checked',
    label: 'Checked',
    where: 'Madurai',
    title: ['Ticked back', 'to source.'],
    text: 'A second team member re-performs the work and ticks each figure against its evidence. Nothing is self-reviewed.',
    chips: ['Second reviewer', '4 / 4 agreed'],
  },
  {
    key: 'noted',
    label: 'Open items',
    where: 'Madurai',
    title: ['Flagged,', 'never buried.'],
    text: 'Anything missing or unusual becomes a clear, plain-English open item — so your reviewer knows exactly what to ask.',
    chips: ['1 open item', 'Plain-English note'],
  },
  {
    key: 'signed',
    label: 'Signed off',
    where: 'Singapore',
    title: ['Judgement stays', 'in Singapore.'],
    text: 'Your professionals review, apply judgement and sign off. Their notes flow back to make the next cycle smoother.',
    chips: ['Final review', 'Statutory sign-off'],
  },
] as const;
