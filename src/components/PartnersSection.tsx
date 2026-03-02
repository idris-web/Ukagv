'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { BadgeCheck } from 'lucide-react'
import Image from 'next/image'

import logoAz from '@/app/partners/az.webp'
import logoBb from '@/app/partners/bb.webp'
import logoBergert from '@/app/partners/bergert.webp'
import logoCircet from '@/app/partners/circet.webp'
import logoDiroba from '@/app/partners/diroba.webp'
import logoGreenovative from '@/app/partners/greenovative.webp'
import logoKbf from '@/app/partners/kbf.webp'
import logoLangguth from '@/app/partners/langguth.webp'
import logoNibler from '@/app/partners/nibler.webp'
import logoRhon from '@/app/partners/rhon.webp'
import logoSeibold from '@/app/partners/seibold.webp'
import logoStadtwerke from '@/app/partners/stadtwerke.webp'
import logoTmobile from '@/app/partners/tmobile.webp'

const partners = [
  { name: 'AZ', logo: logoAz },
  { name: 'B&B', logo: logoBb },
  { name: 'Bergert', logo: logoBergert },
  { name: 'Circet', logo: logoCircet },
  { name: 'Diroba', logo: logoDiroba },
  { name: 'Greenovative', logo: logoGreenovative },
  { name: 'KBF', logo: logoKbf },
  { name: 'Langguth', logo: logoLangguth },
  { name: 'Nibler', logo: logoNibler },
  { name: 'Rhön Energie', logo: logoRhon },
  { name: 'Seibold', logo: logoSeibold },
  { name: 'Stadtwerke', logo: logoStadtwerke },
  { name: 'T-Mobile', logo: logoTmobile },
]

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [badgeRevealed, setBadgeRevealed] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setBadgeRevealed(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <section className="py-24 relative">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center" ref={ref}>
        {/* Telekom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div
            className={`inline-flex items-center gap-3 pl-4 py-3 rounded-full transition-all duration-700 ease-out cursor-default group ${
              badgeRevealed
                ? 'bg-[#e20074]/15 border border-[#e20074]/40 pr-5'
                : 'bg-blue-500/10 border border-blue-500/30 pr-4 hover:bg-[#e20074]/15 hover:border-[#e20074]/40 hover:pr-5'
            } mb-8`}
          >
            <div className="relative">
              <BadgeCheck className={`w-6 h-6 transition-colors duration-300 ${badgeRevealed ? 'text-blue-400' : 'text-blue-500 group-hover:text-blue-400'}`} />
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
            <span className={`overflow-hidden whitespace-nowrap text-base font-semibold text-[#e20074] transition-all duration-700 ease-out ${
              badgeRevealed ? 'max-w-[250px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[250px] group-hover:opacity-100'
            }`}>
              Offizieller Telekom Partner
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Unsere Partner
          </h2>
          <p className="text-dark-300 text-lg md:text-xl">
            Starke Partnerschaften entstehen durch Vertrauen, Verlässlichkeit und gemeinsame Ziele.
          </p>
        </motion.div>

      </div>

      {/* Partner Logos - Full width marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden w-full"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

        {/* Scrolling row */}
        <div className="flex animate-marquee gap-12 items-center py-6">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-20 w-40 sm:h-24 sm:w-48 md:h-28 md:w-56 relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:bg-white/90 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
