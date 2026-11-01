// Facts that never change between languages. All wording lives in src/i18n.

export const company = {
  name: 'Win-Win Business Solutions',
  legalName: 'WIN-WIN Business Solutions Pvt Ltd',
  parent: 'Win-Win Management Consultants',
  email: 'admin@win-win.com.in',
  phoneDisplay: '+91 94437 05623',
  phoneTel: '+919443705623',
  whatsapp: 'https://wa.me/919443705623',
  cin: 'U7499TN2022PTC152948',
  address: ['No. 7B, Ground Floor, Royal City, Valar Nagar,', 'Ilanthaikulam, Uthangudi,', 'Madurai 625107, Tamil Nadu, India'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Royal+City+Valar+Nagar+Ilanthaikulam+Uthangudi+Madurai+625107',
};

export const waLink = (text: string) => `${company.whatsapp}?text=${encodeURIComponent(text)}`;

/** Route paths, keyed to the `nav` labels in the dictionary. */
export const NAV = [
  { to: '/', key: 'home' },
  { to: '/services', key: 'services' },
  { to: '/about', key: 'about' },
  { to: '/team', key: 'team' },
  { to: '/careers', key: 'careers' },
] as const;

export const SERVICE_IDS = ['accounting', 'audit', 'payroll', 'tax'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const KNOWLEDGE = ['SFRS', 'ACRA', 'IRAS', 'CPF', 'MOM', 'GST', 'XBRL'];
