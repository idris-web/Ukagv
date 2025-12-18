'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
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
  const [badgeRevealed, setBadgeRevealed] = useState(false)

  // Auto-reveal badge immediately when section comes into view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setBadgeRevealed(true)
      }, 800) // Quick reveal after section appears
      return () => clearTimeout(timer)
    }
  }, [isInView])

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
          <div
            className={`inline-flex items-center gap-2 pl-3 py-2 rounded-full transition-all duration-700 ease-out cursor-default group ${
              badgeRevealed
                ? 'bg-[#e20074]/15 border border-[#e20074]/40 pr-4'
                : 'bg-blue-500/10 border border-blue-500/30 pr-3 hover:bg-[#e20074]/15 hover:border-[#e20074]/40 hover:pr-4'
            } mb-6`}
          >
            <div className="relative">
              <BadgeCheck className={`w-5 h-5 transition-colors duration-300 ${badgeRevealed ? 'text-blue-400' : 'text-blue-500 group-hover:text-blue-400'}`} />
              {/* Animated pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-500/50"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-blue-400/30"
                animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <span className={`overflow-hidden whitespace-nowrap text-sm font-medium text-[#e20074] transition-all duration-700 ease-out ${
              badgeRevealed ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100'
            }`}>
              Offizieller Telekom Partner
            </span>
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
