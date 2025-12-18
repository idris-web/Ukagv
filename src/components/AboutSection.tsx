'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Award, Clock, CheckCircle2 } from 'lucide-react'

// Unternehmens-Highlights
const highlights = [
  { icon: Users, value: '21.000+', label: 'Zufriedene Kunden', detail: 'landesweit', color: '#22d3ee' },
  { icon: Clock, value: '3.500+', label: 'Hausanschlüsse', detail: 'pro Jahr', color: '#3b82f6' },
  { icon: Award, value: '24.500+ km', label: 'Glasfaser', detail: 'eingeblasen', color: '#f59e0b' },
]

// Unternehmenswerte - UKA-GV
const values = [
  'Höchste Perfektion in jedem Projekt',
  'Landesweit im Einsatz',
  'GBGS-Erfahrung (DTAG)',
  'Ihr Ziel ist unser Ziel',
  'Professionelle Abwicklung',
  'Vertrauenswürdige Partner'
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <Users className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">Über uns</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Uka-GV – </span>
            <span className="gradient-text">Wir machen das.</span>
          </h2>

          <p className="text-dark-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Wir sind ein engagiertes und erfahrenes Team, das sich auf den Breitbandausbau
            spezialisiert hat. Unser Leistungsspektrum umfasst alle Aspekte der FTTH-Ausbautechnik –
            von der Mikro- und Minikabel-Einblasung über APL-Montage bis hin zum Spleißen
            und GPON/OTDR-Messungen.
          </p>
        </motion.div>

        {/* === HIGHLIGHTS === */}
        {/* 3 Spalten Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="fiber-card text-center p-6"
            >
              <item.icon className="w-10 h-10 mx-auto mb-4 drop-shadow-[0_0_12px_currentColor]" style={{ color: item.color }} />
              <div className="text-2xl font-bold font-display text-white mb-1">{item.value}</div>
              <div className="text-base text-dark-300 font-medium">{item.label}</div>
              <div className="text-sm text-dark-500">{item.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* === WERTE CARD === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-fiber p-8 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6">Darauf können Sie sich verlassen</h3>

          {/* 2 Spalten Checkliste */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value) => (
              <div key={value} className="flex items-center gap-3 text-lg text-dark-300">
                <CheckCircle2 className="w-6 h-6 text-fiber-400 shrink-0" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
