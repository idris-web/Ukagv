'use client'

import { motion } from 'framer-motion'
import { Facebook, Linkedin, Instagram, ArrowUp, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Glasfaserverlegung', href: '#services' },
    { label: 'Tiefbau', href: '#services' },
    { label: 'Spleißarbeiten', href: '#services' },
    { label: 'Hausmeisterdienste', href: '#services' },
  ],
  company: [
    { label: 'Über uns', href: '#about' },
    { label: 'Karriere', href: '#contact' },
    { label: 'Partner werden', href: '#contact' },
    { label: 'Referenzen', href: '#testimonials' },
  ],
  support: [
    { label: 'Kontakt', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Störungsmeldung', href: '#contact' },
  ],
  legal: [
    { label: 'Impressum', href: '#contact' },
    { label: 'Datenschutz', href: '#contact' },
    { label: 'AGB', href: '#contact' },
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fiber-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <a href="#home" className="flex items-center gap-3 mb-4">
              {/* Logo Icon */}
              <svg viewBox="0 0 40 28" className="w-10 h-7">
                <defs>
                  <linearGradient id="footerFiberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0ca5ea" />
                  </linearGradient>
                </defs>
                <circle cx="5" cy="14" r="4" fill="#1e293b" stroke="#0ca5ea" strokeWidth="1" />
                <path d="M9 12 Q 16 8, 24 12 T 40 10" stroke="url(#footerFiberGrad)" strokeWidth="2" fill="none" />
                <path d="M9 14 Q 16 14, 24 14 T 40 14" stroke="url(#footerFiberGrad)" strokeWidth="2" fill="none" />
                <path d="M9 16 Q 16 20, 24 16 T 40 18" stroke="url(#footerFiberGrad)" strokeWidth="2" fill="none" />
                <circle cx="5" cy="12" r="1.5" fill="#22d3ee" />
                <circle cx="5" cy="14" r="1.5" fill="#06b6d4" />
                <circle cx="5" cy="16" r="1.5" fill="#22d3ee" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="metallic-text">UKA</span>
                  <span className="gradient-text">GV</span>
                </span>
                <span className="text-[10px] text-dark-500 tracking-widest uppercase">GmbH</span>
              </div>
            </a>
            <p className="text-dark-400 text-sm mb-6 max-w-xs">
              Glasfaserverlegung und Hausmeisterdienste.
              Zuverlässig, termingerecht, fair.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6 text-sm text-dark-400">
              <a href="tel:+4991112345678" className="flex items-center gap-2 hover:text-fiber-400 transition-colors">
                <Phone className="w-4 h-4" />
                +49 (0) 911 123 456 78
              </a>
              <a href="mailto:info@ukagv.de" className="flex items-center gap-2 hover:text-fiber-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@ukagv.de
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Glasfaserweg 42, 90403 Nürnberg
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[Facebook, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg glass border border-fiber-500/10 flex items-center justify-center hover:bg-fiber-500/10 hover:border-fiber-500/30 transition-all"
                >
                  <Icon className="w-5 h-5 text-dark-400 hover:text-fiber-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Leistungen</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-fiber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Unternehmen</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-fiber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-fiber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Rechtliches</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-fiber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm">
              © {new Date().getFullYear()} UKAGV GmbH. Alle Rechte vorbehalten.
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-dark-400 hover:text-fiber-400 text-sm transition-colors group"
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
      </div>
    </footer>
  )
}
