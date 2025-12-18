// Site Configuration - Zentrale Konfiguration für die gesamte Website
export const siteConfig = {
  name: 'UKA-GV',
  slogan: 'Wir machen das.',
  description: 'Ihr Spezialist für Breitbandausbau und FTTH in Süddeutschland',

  contact: {
    phone: '+49 911 477 683 20',
    phoneDisplay: '0911 477 683 20',
    phoneHref: 'tel:+499114776832',
    fax: '+49 911 477 683 29',
    faxDisplay: '0911 477 683 29',
    email: 'info@uka-gv.de',
    emailHref: 'mailto:info@uka-gv.de',
    bewerbung: 'bewerbung@uka-gv.de',
    bewerbungHref: 'mailto:bewerbung@uka-gv.de',
  },

  address: {
    street: 'Georg-Strobel-Straße 65',
    zip: '90489',
    city: 'Nürnberg',
    full: 'Georg-Strobel-Straße 65, 90489 Nürnberg',
    country: 'Deutschland',
  },

  hours: {
    weekdays: 'Mo–Fr: 09:00–13:00 & 14:00–17:00',
    weekend: 'Sa & So: Geschlossen',
  },

  social: {
    linkedin: 'https://linkedin.com/company/uka-gv',
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
