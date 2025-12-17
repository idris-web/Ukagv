'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Cable, Users, CheckCircle, Building2 } from 'lucide-react'
import { NumberCounter, CardTilt3D, StaggeredGrid, RevealOnScroll, SplitReveal } from './effects'

const stats = [
  {
    icon: Cable,
    value: 1250,
    suffix: ' km',
    label: 'Glasfaserkabel verlegt',
    description: 'Über 1.250 Kilometer hochwertige Glasfaserkabel professionell verlegt',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    icon: CheckCircle,
    value: 847,
    suffix: '',
    label: 'Projekte abgeschlossen',
    description: 'Erfolgreich abgeschlossene Projekte für zufriedene Kunden',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: Users,
    value: 52,
    suffix: '',
    label: 'Fachkräfte im Team',
    description: 'Qualifizierte Techniker und Monteure an Ihrer Seite',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    icon: Building2,
    value: 156,
    suffix: '',
    label: 'Gewerbekunden',
    description: 'Unternehmen vertrauen auf unsere Expertise',
    color: 'from-teal-400 to-cyan-500'
  },
]

const additionalStats = [
  { value: 99.8, suffix: '%', label: 'Kundenzufriedenheit', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Notdienst verfügbar', decimals: 0 },
  { value: 15, suffix: '+', label: 'Jahre Erfahrung', decimals: 0 },
  { value: 48, suffix: 'h', label: 'Durchschnittliche Reaktionszeit', decimals: 0 },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />

      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-fiber-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-500/5 blur-3xl"
      />

      {/* Decorative Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="statLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {[200, 400, 600, 800].map((yPos, i) => (
          <motion.line
            key={i}
            x1="-200"
            y1={yPos}
            x2="2200"
            y2={yPos + (i % 2 === 0 ? 50 : -50)}
            stroke="url(#statLineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header with Split Reveal */}
        <SplitReveal direction="horizontal" leftColor="#06b6d4" rightColor="#3b82f6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
              Zahlen & Fakten
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Unsere Erfolgsbilanz
              <br />
              <span className="gradient-text">spricht für sich</span>
            </h2>
            <p className="text-dark-300 max-w-2xl mx-auto text-lg">
              Qualität, die sich in Zahlen messen lässt. Vertrauen Sie auf unsere Erfahrung.
            </p>
          </motion.div>
        </SplitReveal>

        {/* Main Stats Grid with Staggered Animation */}
        <StaggeredGrid
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          staggerDelay={0.15}
          direction="up"
        >
          {stats.map((stat, index) => (
            <CardTilt3D key={index} tiltAmount={8} glareEnabled={true}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group h-full"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                <div className="relative h-full p-8 rounded-3xl glass border border-fiber-500/10 group-hover:border-fiber-500/30 transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-6`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Counter with NumberCounter effect */}
                  <div className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                    <NumberCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>

                  {/* Description */}
                  <p className="text-dark-400 text-sm leading-relaxed">{stat.description}</p>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-fiber-500/20 rounded-tr-xl group-hover:border-fiber-500/40 transition-colors" />
                </div>
              </motion.div>
            </CardTilt3D>
          ))}
        </StaggeredGrid>

        {/* Secondary Stats Bar */}
        <RevealOnScroll direction="up">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative"
          >
            <div className="animated-border">
              <div className="relative p-8 rounded-2xl bg-dark-900/80 backdrop-blur-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {additionalStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                        <NumberCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          duration={2}
                          decimals={stat.decimals}
                        />
                      </div>
                      <div className="text-dark-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </RevealOnScroll>

        {/* Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          {[
            { label: 'Termingerechte Fertigstellung', value: 98 },
            { label: 'Erstprüfung bestanden', value: 99 },
            { label: 'Weiterempfehlungsrate', value: 97 },
            { label: 'Projekte im Budget', value: 95 },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">{item.label}</span>
                <span className="text-fiber-400 font-semibold">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-fiber-500 to-primary-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.value}%` } : {}}
                  transition={{ duration: 1.5, delay: 1.4 + index * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
