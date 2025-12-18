'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Mail, MapPin, Cable, Linkedin } from 'lucide-react'
import { siteConfig } from '@/config/site'

// Navigation Links
const links = [
  { name: 'Leistungen', href: '#services' },
  { name: 'Über uns', href: '#about' },
  { name: 'Projekte', href: '#projects' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Kontakt', href: '#contact' },
]

// Rechtliche Links
const legal = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
  { name: 'AGB', href: '/agb' },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="relative bg-dark-950">
      {/* Obere Trennlinie mit Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-fiber-500/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-16">

        {/* === MAIN CONTENT === */}
        {/* 3 Spalten: Logo | Kontakt | Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between gap-10 mb-10"
        >
          {/* Logo & Beschreibung */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fiber-500 to-fiber-600 flex items-center justify-center">
                <Cable className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold font-display text-white text-xl">UKAGV</span>
            </div>
            <p className="text-base text-dark-400 max-w-sm leading-relaxed">
              Ihr Glasfaser-Spezialist in der Metropolregion Nürnberg. Professionell, zuverlässig, seit 2009.
            </p>
          </div>

          {/* Kontakt */}
          <div className="flex flex-col gap-3 text-base">
            <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3 text-dark-400 hover:text-fiber-400 transition-colors">
              <Phone className="w-5 h-5" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <a href={siteConfig.contact.emailHref} className="flex items-center gap-3 text-dark-400 hover:text-fiber-400 transition-colors">
              <Mail className="w-5 h-5" />
              {siteConfig.contact.email}
            </a>
            <span className="flex items-center gap-3 text-dark-500">
              <MapPin className="w-5 h-5" />
              {siteConfig.address.city}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 text-base">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-dark-400 hover:text-fiber-400 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* === BOTTOM BAR === */}
        <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-500">
          <span>© {new Date().getFullYear()} UKAGV GmbH</span>

          <div className="flex gap-6">
            {legal.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-white transition-colors">
                {item.name}
              </a>
            ))}
          </div>

          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fiber-400 transition-colors"
            aria-label="LinkedIn Profil"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
