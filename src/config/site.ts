// Site Configuration - Zentrale Konfiguration für die gesamte Website
export const siteConfig = {
  name: 'UKAGV GmbH',
  description: 'Ihr Spezialist für Glasfaserausbau in Süddeutschland',

  contact: {
    phone: '+49 911 12345678',
    phoneDisplay: '0911 12345678',
    phoneHref: 'tel:+4991112345678',
    email: 'info@ukagv.de',
    emailHref: 'mailto:info@ukagv.de',
  },

  address: {
    street: 'Musterstraße 123',
    city: '90402 Nürnberg',
    country: 'Deutschland',
  },

  social: {
    linkedin: 'https://linkedin.com/company/ukagv',
    xing: 'https://xing.com/companies/ukagv',
  },

  links: {
    privacy: '/datenschutz',
    imprint: '/impressum',
    terms: '/agb',
  },
}

// Theme Colors - Konsistente Farben für die gesamte Website
export const colors = {
  primary: {
    cyan: '#22d3ee',
    blue: '#3b82f6',
    teal: '#14b8a6',
  },
  accent: {
    emerald: '#10b981',
    amber: '#f59e0b',
    violet: '#a855f7',
    rose: '#f43f5e',
    orange: '#f97316',
  },
  service: {
    privat: '#22d3ee',
    gewerbe: '#3b82f6',
    tiefbau: '#10b981',
    beratung: '#f59e0b',
    wartung: '#ef4444',
    netzwerk: '#a855f7',
    spleissen: '#ec4899',
    montage: '#14b8a6',
  },
}

// UI Constants
export const ui = {
  navbarHeight: 80, // px
  scrollThreshold: 500, // px
  animationDuration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
  },
}
