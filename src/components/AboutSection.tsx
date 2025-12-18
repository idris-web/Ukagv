'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Award, Clock, CheckCircle2 } from 'lucide-react'

// Unternehmens-Highlights - Fokus auf regionale Verwurzelung
const highlights = [
  { icon: Users, value: '52', label: 'Fachkräfte', detail: 'aus Nürnberg & Umgebung', color: '#22d3ee' },
  { icon: Clock, value: 'Seit 2009', label: 'In der Region', detail: '15+ Jahre Erfahrung', color: '#3b82f6' },
  { icon: Award, value: 'ISO 9001', label: 'Zertifiziert', detail: 'Geprüfte Qualität', color: '#10b981' },
  { icon: Award, value: '847+', label: 'Projekte', detail: 'erfolgreich abgeschlossen', color: '#f59e0b' },
]

// Unternehmenswerte - was uns in Franken ausmacht
const values = [
  'Fränkische Zuverlässigkeit',
  'Pünktlich wie versprochen',
  'Baustellen hinterlassen wir sauber',
  'Klare Kommunikation – keine Überraschungen',
  'Festpreisgarantie – keine versteckten Kosten',
  'Lokale Ansprechpartner vor Ort'
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
            <span className="text-white">Ihr Partner </span>
            <span className="gradient-text">vor Ort</span>
          </h2>

          <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            UKAGV wurde 2009 in Nürnberg gegründet – mit dem Ziel, die Metropolregion
            zukunftssicher zu vernetzen. Heute sind wir der führende Glasfaser-Spezialist
            für Nürnberg, Fürth, Erlangen, Schwabach und das gesamte Umland.
          </p>
        </motion.div>

        {/* === HIGHLIGHTS === */}
        {/* 4 Spalten Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
