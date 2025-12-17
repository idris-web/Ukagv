'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Building2, Factory, Network, Cable, Settings, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Privatanschlüsse',
    description: 'FTTH-Lösungen für Ihr Zuhause. Schnelles, stabiles Internet für die ganze Familie mit bis zu 1 Gbit/s.',
    features: ['Komplette Hausinstallation', 'Router-Konfiguration', '24/7 Support'],
    gradient: 'from-primary-500 to-blue-500'
  },
  {
    icon: Building2,
    title: 'Gewerbekunden',
    description: 'Maßgeschneiderte Business-Lösungen für KMUs und Großunternehmen mit garantierter Bandbreite.',
    features: ['Symmetrische Leitungen', 'SLA-Garantien', 'Redundante Anbindung'],
    gradient: 'from-accent-500 to-pink-500'
  },
  {
    icon: Factory,
    title: 'Industrievernetzung',
    description: 'Hochverfügbare Netzwerke für Produktionsanlagen und Industrie 4.0 Anwendungen.',
    features: ['Echtzeit-Kommunikation', 'IoT-Integration', 'Industriestandards'],
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Network,
    title: 'Quartierserschließung',
    description: 'Komplette Glasfasererschließung für Neubaugebiete und Bestandsquartiere.',
    features: ['Tiefbauarbeiten', 'Hausanschlüsse', 'Projektmanagement'],
    gradient: 'from-cyan-500 to-teal-500'
  },
  {
    icon: Cable,
    title: 'Inhouse-Verkabelung',
    description: 'Professionelle Glasfaserverkabelung innerhalb von Gebäuden und Rechenzentren.',
    features: ['LWL-Verteilung', 'Patchfelder', 'Dokumentation'],
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Settings,
    title: 'Wartung & Service',
    description: 'Umfassende Wartungsverträge und schneller Support im Störungsfall.',
    features: ['Regelmäßige Prüfung', 'Notfall-Hotline', 'Schnelle Entstörung'],
    gradient: 'from-emerald-500 to-green-500'
  }
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Komplettlösungen für
            <br />
            <span className="gradient-text">jeden Bedarf</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Von der Planung bis zur Inbetriebnahme - wir begleiten Sie
            durch jeden Schritt Ihrer Glasfaser-Installation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="animated-border h-full">
                <div className="relative h-full p-8 rounded-2xl bg-dark-900/80 backdrop-blur-sm overflow-hidden">
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-dark-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-dark-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-primary-400 font-medium group/link"
                  >
                    Mehr erfahren
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
