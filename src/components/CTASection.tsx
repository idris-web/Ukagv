'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Mail, ArrowRight } from 'lucide-react'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-32 relative">
      <div className="relative z-10 max-w-2xl mx-auto px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projekt besprechen?
          </h2>
          <p className="text-dark-400 text-lg mb-10">
            Wir beraten Sie kostenlos und unverbindlich.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="tel:+4991112345678"
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Phone className="w-5 h-5" />
              Anrufen
            </a>
            <a
              href="mailto:info@ukagv.de"
              className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Mail className="w-5 h-5" />
              E-Mail
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-sm text-dark-500 space-y-1">
            <p>+49 (0) 911 123 456 78</p>
            <p>info@ukagv.de</p>
            <p>Mo-Fr: 7:00 - 17:00 Uhr</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
