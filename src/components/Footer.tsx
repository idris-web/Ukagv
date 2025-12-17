'use client'

import { motion } from 'framer-motion'
import { Zap, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Privatanschlüsse', href: '#services' },
    { label: 'Gewerbekunden', href: '#services' },
    { label: 'Quartierserschließung', href: '#services' },
    { label: 'Inhouse-Verkabelung', href: '#services' },
  ],
  company: [
    { label: 'Über uns', href: '#about' },
    { label: 'Karriere', href: '#' },
    { label: 'Partner werden', href: '#' },
    { label: 'Presse', href: '#' },
  ],
  support: [
    { label: 'Kontakt', href: '#contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Support-Center', href: '#' },
    { label: 'Störungsmeldung', href: '#' },
  ],
  legal: [
    { label: 'Impressum', href: '#' },
    { label: 'Datenschutz', href: '#' },
    { label: 'AGB', href: '#' },
    { label: 'Cookie-Einstellungen', href: '#' },
  ],
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Fiber<span className="gradient-text">Connect</span>
              </span>
            </a>
            <p className="text-dark-400 text-sm mb-6 max-w-xs">
              Ihr Partner für professionelle Glasfaserverlegung. Schnelles Internet für eine vernetzte Zukunft.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-5 h-5 text-dark-300 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-b border-dark-800 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold mb-1">Newsletter abonnieren</h4>
              <p className="text-dark-400 text-sm">Erhalten Sie Updates zu Glasfaser-Verfügbarkeit in Ihrer Region.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors text-sm"
              />
              <button className="btn-primary text-sm whitespace-nowrap">
                Abonnieren
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} FiberConnect Pro. Alle Rechte vorbehalten.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-dark-400 hover:text-white text-sm transition-colors group"
          >
            Nach oben
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>
    </footer>
  )
}
