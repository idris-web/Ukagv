'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Shield, TrendingUp, Wifi, Lightbulb } from 'lucide-react'

// Technologie-Vorteile - erklärt für den Endkunden
const benefits = [
  { icon: Zap, title: 'Bis 10 Gbit/s', desc: 'Up- und Download gleich schnell', color: '#22d3ee' },
  { icon: Shield, title: '50+ Jahre', desc: 'Glasfaser altert nicht', color: '#3b82f6' },
  { icon: TrendingUp, title: '+3-5%', desc: 'Mehr Immobilienwert', color: '#10b981' },
  { icon: Wifi, title: '< 1ms', desc: 'Verzögerungsfrei arbeiten', color: '#a855f7' },
  { icon: Shield, title: 'Störungsfrei', desc: 'Keine elektr. Interferenzen', color: '#f59e0b' },
  { icon: Zap, title: 'Zukunftssicher', desc: 'Unbegrenzt erweiterbar', color: '#ec4899' },
]

export default function TechnologySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="technology" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <Lightbulb className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">Technologie</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Warum </span>
            <span className="gradient-text">Glasfaser?</span>
          </h2>

          <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Kupfer-Internet hat seine Grenzen erreicht. Glasfaser ist die einzige Technologie,
            die mit den Anforderungen der Zukunft mitwächst – ob Homeoffice, Streaming oder Smart Home.
          </p>
        </motion.div>

        {/* === BENEFITS GRID === */}
        {/* 3 Spalten für 6 Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="fiber-card text-center p-6"
            >
              <benefit.icon className="w-10 h-10 mx-auto mb-4 drop-shadow-[0_0_12px_currentColor]" style={{ color: benefit.color }} />
              <div className="text-xl font-bold text-white mb-1">{benefit.title}</div>
              <div className="text-base text-dark-400">{benefit.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* === FTTH vs FTTB === */}
        {/* Vergleich der Anschlussarten */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* FTTH - Cyan Akzent */}
          <div className="glass-fiber p-6 rounded-2xl border-t-4 border-t-cyan-400 hover:border-t-cyan-300 transition-all hover:-translate-y-1">
            <div className="text-2xl font-bold text-cyan-400 mb-2 neon-text">FTTH</div>
            <div className="text-lg text-dark-200 mb-3">Fiber to the Home</div>
            <div className="text-base text-dark-400 leading-relaxed">Glasfaser direkt bis in Ihre Wohnung – maximale Geschwindigkeit ohne Kompromisse.</div>
            <div className="text-sm text-dark-500 mt-4">Ideal für: Eigenheime, Reihenhäuser</div>
          </div>

          {/* FTTB - Blau Akzent */}
          <div className="glass-fiber p-6 rounded-2xl border-t-4 border-t-blue-400 hover:border-t-blue-300 transition-all hover:-translate-y-1">
            <div className="text-2xl font-bold text-blue-400 mb-2">FTTB</div>
            <div className="text-lg text-dark-200 mb-3">Fiber to the Building</div>
            <div className="text-base text-dark-400 leading-relaxed">Glasfaser bis zum Gebäude, dann per Kupfer in die Wohnungen – kosteneffizient.</div>
            <div className="text-sm text-dark-500 mt-4">Ideal für: Mehrfamilienhäuser, Gewerbe</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
