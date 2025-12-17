'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Home, Building2, Wrench, Network, Cable, HardHat, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Privatanschlüsse',
    description: 'Wir verlegen Glasfaser direkt bis in Ihr Zuhause. Vom Hausanschluss bis zur Inbetriebnahme – alles aus einer Hand.',
    features: ['Hausanschluss-Herstellung', 'Innenhausverkabelung', 'ONT-Installation', 'Router-Konfiguration'],
    gradient: 'from-fiber-500 to-primary-500',
    stats: '500+ Haushalte'
  },
  {
    icon: Building2,
    title: 'Gewerbe & Industrie',
    description: 'Leistungsstarke Glasfaseranbindung für Ihr Unternehmen. Wir realisieren auch komplexe Projekte termingerecht.',
    features: ['Gewerbeanschlüsse', 'Bürogebäude-Verkabelung', 'Server-Anbindung', 'Redundante Leitungen'],
    gradient: 'from-primary-500 to-fiber-600',
    stats: '150+ Unternehmen'
  },
  {
    icon: HardHat,
    title: 'Tiefbauarbeiten',
    description: 'Professioneller Tiefbau für die Glasfaserinfrastruktur. Erdarbeiten, Leerrohrverlegung und fachgerechte Wiederherstellung.',
    features: ['Grabenarbeiten', 'Leerrohrverlegung', 'Oberflächenwiederherstellung', 'Asphaltarbeiten'],
    gradient: 'from-fiber-600 to-primary-600',
    stats: '1000+ km verlegt'
  },
  {
    icon: Network,
    title: 'Netzwerkinstallation',
    description: 'Komplette Netzwerkinfrastruktur für Ihr Gebäude. Von der Planung bis zur Dokumentation.',
    features: ['Strukturierte Verkabelung', 'Netzwerkschränke', 'Patchfelder', 'Dokumentation'],
    gradient: 'from-primary-600 to-fiber-500',
    stats: '200+ Installationen'
  },
  {
    icon: Cable,
    title: 'Spleißarbeiten',
    description: 'Präzise Glasfaser-Spleißungen durch zertifizierte Techniker. Messprotokoll inklusive.',
    features: ['Fusionsspleißen', 'OTDR-Messungen', 'Zertifizierte Protokolle', 'Qualitätsprüfung'],
    gradient: 'from-fiber-500 to-primary-500',
    stats: '50.000+ Spleiße'
  },
  {
    icon: Wrench,
    title: 'Hausmeisterdienste',
    description: 'Zuverlässige Hausmeisterservices für Ihre Immobilie. Wir kümmern uns um den reibungslosen Betrieb.',
    features: ['Gebäudepflege', 'Kleinreparaturen', 'Winterdienst', 'Grünflächenpflege'],
    gradient: 'from-primary-500 to-fiber-600',
    stats: '30+ Objekte'
  }
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section id="services" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating Background Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-80 h-80 rounded-full bg-fiber-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl"
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-fiber-500/50 to-transparent" />

      {/* Animated background fibers */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="servicesFiber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="servicesGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <motion.path
          d="M0 200 Q 480 100, 960 200 T 1920 200"
          stroke="url(#servicesFiber)"
          strokeWidth="2"
          fill="none"
          filter="url(#servicesGlow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 400 Q 480 300, 960 400 T 1920 400"
          stroke="url(#servicesFiber)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#servicesGlow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M0 800 Q 480 900, 960 800 T 1920 800"
          stroke="url(#servicesFiber)"
          strokeWidth="2"
          fill="none"
          filter="url(#servicesGlow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.6 }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block text-fiber-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Unsere Leistungen
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Alles aus einer Hand
            <br />
            <span className="gradient-text">für Ihre Glasfaser</span>
          </motion.h2>
          <motion.p
            className="text-dark-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Von der Planung bis zur Übergabe – UKAGV GmbH bietet Ihnen
            alle Leistungen rund um Glasfaser und Gebäudetechnik.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500`} />

              <div className="relative h-full p-8 rounded-2xl glass border border-fiber-500/10 group-hover:border-fiber-500/30 transition-all duration-300 overflow-hidden">
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Stats Badge */}
                <motion.div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-fiber-500/10 border border-fiber-500/20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-xs text-fiber-400 font-medium">{service.stats}</span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-fiber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-dark-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <motion.li
                      key={fIndex}
                      className="flex items-center gap-3 text-sm text-dark-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 + fIndex * 0.05 }}
                    >
                      <CheckCircle2 className={`w-4 h-4 text-fiber-400 flex-shrink-0`} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Link */}
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-fiber-400 font-medium group/link"
                  whileHover={{ x: 5 }}
                >
                  Jetzt anfragen
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </motion.a>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-fiber-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-dark-400 mb-4">Haben Sie spezielle Anforderungen?</p>
          <motion.a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Individuelle Anfrage stellen
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
