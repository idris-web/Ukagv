'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building, Zap, Globe, Network, Server, Cpu, Radio, Satellite } from 'lucide-react'

const partners = [
  { name: 'Deutsche Telekom', icon: Globe, category: 'Netzbetreiber' },
  { name: 'Vodafone', icon: Network, category: 'Netzbetreiber' },
  { name: 'Deutsche Glasfaser', icon: Zap, category: 'Netzbetreiber' },
  { name: 'Stadtwerke München', icon: Building, category: 'Kommune' },
  { name: 'EWE', icon: Server, category: 'Netzbetreiber' },
  { name: 'M-Net', icon: Cpu, category: 'Netzbetreiber' },
  { name: 'NetCologne', icon: Radio, category: 'Netzbetreiber' },
  { name: 'Tele Columbus', icon: Satellite, category: 'Netzbetreiber' },
]

const certifications = [
  { name: 'ISO 9001', desc: 'Qualitätsmanagement' },
  { name: 'ISO 45001', desc: 'Arbeitssicherheit' },
  { name: 'DVGW', desc: 'Zertifiziert' },
  { name: 'TÜV', desc: 'Geprüft' },
]

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Decorative Fiber Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="partnerFiber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-100 100 Q 400 50, 800 100 T 1600 50 T 2100 100"
          stroke="url(#partnerFiber)"
          strokeWidth="1"
          fill="none"
          opacity={0.2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M-100 500 Q 400 550, 800 500 T 1600 550 T 2100 500"
          stroke="url(#partnerFiber)"
          strokeWidth="1"
          fill="none"
          opacity={0.2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
            Partner & Zertifizierungen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Vertraut von
            <br />
            <span className="gradient-text">führenden Unternehmen</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Wir arbeiten mit den größten Netzbetreibern und Kommunen in Deutschland zusammen.
          </p>
        </motion.div>

        {/* Partner Grid - Infinite Scroll Effect */}
        <div className="relative mb-16 overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10" />

          {/* Scrolling Partners Row 1 */}
          <motion.div
            className="flex gap-8 mb-8"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 p-6 rounded-2xl glass border border-fiber-500/10 hover:border-fiber-500/30 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fiber-500/20 to-primary-500/20 flex items-center justify-center group-hover:from-fiber-500/30 group-hover:to-primary-500/30 transition-all">
                    <partner.icon className="w-7 h-7 text-fiber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{partner.name}</p>
                    <p className="text-sm text-dark-400">{partner.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scrolling Partners Row 2 - Reverse */}
          <motion.div
            className="flex gap-8"
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...partners.reverse(), ...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 p-6 rounded-2xl glass border border-fiber-500/10 hover:border-fiber-500/30 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-fiber-500/20 flex items-center justify-center group-hover:from-primary-500/30 group-hover:to-fiber-500/30 transition-all">
                    <partner.icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{partner.name}</p>
                    <p className="text-sm text-dark-400">{partner.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fiber-500/20 to-primary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              <div className="relative p-6 rounded-2xl glass border border-fiber-500/20 text-center">
                <div className="text-2xl font-bold gradient-text mb-1">{cert.name}</div>
                <div className="text-sm text-dark-400">{cert.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-12 border-t border-dark-800"
        >
          {[
            'Zertifizierter Fachbetrieb',
            'Meisterbetrieb',
            'Bundesweite Projekte',
            '24/7 Notdienst verfügbar',
          ].map((text, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-fiber-400" />
              <span className="text-dark-300">{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
