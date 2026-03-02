'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-20 sm:py-32 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Projekt besprechen?
          </h2>
          <p className="text-dark-300 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12">
            Wir beraten Sie kostenlos und unverbindlich.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10 sm:mb-14">
            <a
              href={siteConfig.contact.phoneHref}
              className="btn-primary flex items-center justify-center gap-3 text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 w-full sm:w-auto"
              aria-label="Jetzt anrufen"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              Anrufen
            </a>
            <a
              href={siteConfig.contact.emailHref}
              className="btn-secondary flex items-center justify-center gap-3 text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 w-full sm:w-auto"
              aria-label="E-Mail senden"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              E-Mail
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-base md:text-lg text-dark-400 space-y-2">
            <p>{siteConfig.contact.phoneDisplay}</p>
            <p>{siteConfig.contact.email}</p>
            <p>{siteConfig.hours.weekdays}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
