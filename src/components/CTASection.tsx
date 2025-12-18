'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-32 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Projekt besprechen?
          </h2>
          <p className="text-dark-300 text-xl md:text-2xl mb-12">
            Wir beraten Sie kostenlos und unverbindlich.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
            <a
              href={siteConfig.contact.phoneHref}
              className="btn-primary flex items-center gap-3 text-xl px-10 py-5"
              aria-label="Jetzt anrufen"
            >
              <Phone className="w-6 h-6" />
              Anrufen
            </a>
            <a
              href={siteConfig.contact.emailHref}
              className="btn-secondary flex items-center gap-3 text-xl px-10 py-5"
              aria-label="E-Mail senden"
            >
              <Mail className="w-6 h-6" />
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
