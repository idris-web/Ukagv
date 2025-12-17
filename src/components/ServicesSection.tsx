'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Building2, Wrench, Network, Cable, HardHat, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Privatanschlüsse',
    description: 'Wir verlegen Glasfaser direkt bis in Ihr Zuhause. Vom Hausanschluss bis zur Inbetriebnahme – alles aus einer Hand.',
    features: ['Hausanschluss-Herstellung', 'Innenhausverkabelung', 'ONT-Installation'],
    gradient: 'from-fiber-500 to-primary-500'
  },
  {
    icon: Building2,
    title: 'Gewerbe & Industrie',
    description: 'Leistungsstarke Glasfaseranbindung für Ihr Unternehmen. Wir realisieren auch komplexe Projekte termingerecht.',
    features: ['Gewerbeanschlüsse', 'Bürogebäude-Verkabelung', 'Server-Anbindung'],
    gradient: 'from-primary-500 to-fiber-600'
  },
  {
    icon: HardHat,
    title: 'Tiefbauarbeiten',
    description: 'Professioneller Tiefbau für die Glasfaserinfrastruktur. Erdarbeiten, Leerrohrverlegung und fachgerechte Wiederherstellung.',
    features: ['Grabenarbeiten', 'Leerrohrverlegung', 'Oberflächenwiederherstellung'],
    gradient: 'from-fiber-600 to-primary-600'
  },
  {
    icon: Network,
    title: 'Netzwerkinstallation',
    description: 'Komplette Netzwerkinfrastruktur für Ihr Gebäude. Von der Planung bis zur Dokumentation.',
    features: ['Strukturierte Verkabelung', 'Netzwerkschränke', 'Patchfelder'],
    gradient: 'from-primary-600 to-fiber-500'
  },
  {
    icon: Cable,
    title: 'Spleißarbeiten',
    description: 'Präzise Glasfaser-Spleißungen durch zertifizierte Techniker. Messprotokoll inklusive.',
    features: ['Fusionsspleißen', 'OTDR-Messungen', 'Dokumentation'],
    gradient: 'from-fiber-500 to-primary-500'
  },
  {
    icon: Wrench,
    title: 'Hausmeisterdienste',
    description: 'Zuverlässige Hausmeisterservices für Ihre Immobilie. Wir kümmern uns um den reibungslosen Betrieb.',
    features: ['Gebäudepflege', 'Kleinreparaturen', 'Winterdienst'],
    gradient: 'from-primary-500 to-fiber-600'
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-fiber-500/50 to-transparent" />

      {/* Animated background fiber */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="servicesFiber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 200 Q 480 100, 960 200 T 1920 200"
          stroke="url(#servicesFiber)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
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
            Unsere Leistungen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Was wir für Sie tun
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Von der Planung bis zur Übergabe – UKAGV GmbH bietet Ihnen
            alle Leistungen rund um Glasfaser und Gebäudetechnik.
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
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-fiber-400 transition-colors">
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
                    className="inline-flex items-center gap-2 text-fiber-400 font-medium group/link"
                  >
                    Anfragen
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
