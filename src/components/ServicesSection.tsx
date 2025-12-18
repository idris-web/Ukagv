'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Building2, HardHat, Network, Cable, Wrench, Zap, ArrowRight } from 'lucide-react'

// Leistungen mit Icons und Farben - 6 Hauptleistungen (Glasfaser komplett NE3)
const services = [
  {
    icon: HardHat,
    title: 'Tiefbau & Verlegung',
    desc: 'NE3/NE4 Infrastruktur mit modernsten Verfahren: Micro-Trenching, grabenlose Verlegung, Pflugverfahren. Kompletter Tiefbau aus einer Hand.',
    color: '#10b981'
  },
  {
    icon: Home,
    title: 'Hausanschlüsse',
    desc: 'FTTH & FTTB Komplettlösungen – von der Hauseinführung bis zur Dose. Für Einfamilienhäuser, MFH und Gewerbeobjekte.',
    color: '#22d3ee'
  },
  {
    icon: Building2,
    title: 'LWL-Montage',
    desc: 'Muffen, Verteiler, ODF und Anschlussdosen. Professionelle Montage nach Netzbetreiber-Vorgaben mit vollständiger Dokumentation.',
    color: '#3b82f6'
  },
  {
    icon: Cable,
    title: 'Spleißen & Messtechnik',
    desc: 'Präzise LWL-Spleißverbindungen mit OTDR-Messungen. Jedes Projekt mit vollständigem Messprotokoll und Abnahmedokumentation.',
    color: '#ec4899'
  },
  {
    icon: Network,
    title: 'Komplettlösungen',
    desc: 'Von der Planung über Genehmigungen bis zur Abnahme – Full-Service für Netzbetreiber, Carrier und Kommunen.',
    color: '#a855f7'
  },
  {
    icon: Wrench,
    title: 'Wartung & Service',
    desc: '24/7 Entstörungsdienst in Süddeutschland. Schnelle Reaktionszeiten und kompetente Techniker vor Ort.',
    color: '#f59e0b'
  },
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <Zap className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">Leistungen</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Alles aus </span>
            <span className="gradient-text">einer Hand</span>
          </h2>

          <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Von der Planung bis zur Inbetriebnahme – wir sind Ihr Full-Service-Partner
            für Glasfaserprojekte in Süddeutschland.
          </p>
        </motion.div>

        {/* === SERVICES GRID === */}
        {/* 2 Spalten Grid mit horizontalen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="fiber-card group p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                {/* Icon Box */}
                <div
                  className="glow-icon w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-8 h-8" style={{ color: service.color }} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-bold text-white text-xl mb-2">{service.title}</h3>
                  <p className="text-base text-dark-400 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === CTA === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a href="#contact" className="fiber-link inline-flex items-center gap-2 text-lg font-medium">
            Kostenloses Angebot anfordern
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
