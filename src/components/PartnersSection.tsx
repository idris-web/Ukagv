'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BadgeCheck } from 'lucide-react'

const partners = [
  'Telekom Deutschland',
  'Vodafone',
  'Deutsche Glasfaser',
  'M-Net',
]

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center" ref={ref}>
        {/* Telekom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e20074]/10 border border-[#e20074]/30 mb-6">
            <BadgeCheck className="w-4 h-4 text-[#e20074]" />
            <span className="text-sm font-medium text-[#e20074]">Offizieller Telekom Partner</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Starke Partnerschaften
          </h2>
          <p className="text-dark-400 text-lg">
            Zertifizierter Partner der führenden Netzbetreiber
          </p>
        </motion.div>

        {/* Partner List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {partners.map((partner, index) => (
            <span
              key={index}
              className="px-5 py-2.5 rounded-full bg-dark-900/50 border border-dark-800 text-dark-300 text-sm"
            >
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
