'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, MapPin, TrendingUp, CheckCircle, Shield, Clock, Sparkles, ArrowRight, Briefcase, Building } from 'lucide-react'

const stats = [
  { icon: Award, value: '15+', label: 'Jahre Erfahrung', color: 'from-cyan-400 to-blue-500' },
  { icon: Users, value: '52', label: 'Fachkräfte im Team', color: 'from-blue-400 to-cyan-500' },
  { icon: MapPin, value: '1.250+', label: 'km verlegtes Kabel', color: 'from-cyan-500 to-teal-500' },
  { icon: TrendingUp, value: '99.8%', label: 'Kundenzufriedenheit', color: 'from-teal-400 to-cyan-500' },
]

const values = [
  { icon: Clock, text: 'Pünktlich', desc: 'Wir halten unsere Termine ein' },
  { icon: Shield, text: 'Zuverlässig', desc: 'Auf uns können Sie zählen' },
  { icon: Sparkles, text: 'Sauber', desc: 'Ordentliche Arbeitsweise' },
  { icon: CheckCircle, text: 'Fair', desc: 'Transparente Preisgestaltung' },
]

const milestones = [
  { year: '2008', event: 'Gründung der UKAGV GmbH' },
  { year: '2012', event: 'Erste Großprojekte für Netzbetreiber' },
  { year: '2016', event: '500 km Glasfaser verlegt' },
  { year: '2020', event: 'Ausbau auf 40+ Mitarbeiter' },
  { year: '2024', event: '1.000+ km Glasfaser Meilenstein' },
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const orbY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />

      {/* Animated Orbs */}
      <motion.div
        style={{ y: orbY }}
        className="absolute top-40 right-20 w-96 h-96 rounded-full bg-fiber-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: imageY }}
        className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-primary-500/5 blur-3xl"
      />

      {/* Decorative Fiber Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="aboutFiber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="aboutGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <motion.path
          d="M0 300 Q 480 200, 960 300 T 1920 300"
          stroke="url(#aboutFiber)"
          strokeWidth="2"
          fill="none"
          filter="url(#aboutGlow)"
          style={{ y: imageY }}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2 }}
        />
        <motion.path
          d="M0 600 Q 480 700, 960 600 T 1920 600"
          stroke="url(#aboutFiber)"
          strokeWidth="2"
          fill="none"
          filter="url(#aboutGlow)"
          style={{ y: contentY }}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.3 }}
        />
        <motion.path
          d="M0 900 Q 480 800, 960 900 T 1920 900"
          stroke="url(#aboutFiber)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#aboutGlow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 3, delay: 0.6 }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ y: imageY }}
            className="relative"
          >
            {/* Main Image Placeholder */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-fiber-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-fiber-500/10 to-primary-500/10" />
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <FiberIcon className="w-16 h-16 text-white" />
                  </motion.div>
                  <p className="text-dark-400 text-sm">Platzhalter für Teambild</p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-8 -right-8 glass p-6 rounded-2xl border border-fiber-500/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Zertifiziert</p>
                  <p className="text-dark-400 text-sm">FTTH-Fachbetrieb</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -top-6 -left-6 glass p-4 rounded-xl border border-fiber-500/20"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-fiber-400" />
                <div>
                  <p className="font-bold">847+</p>
                  <p className="text-dark-400 text-xs">Projekte</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block text-fiber-400 text-sm font-semibold tracking-wider uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Über UKAGV GmbH
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl font-bold mt-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Ihr Spezialist für
              <br />
              <span className="gradient-text">Glasfaser & Service</span>
            </motion.h2>
            <motion.div
              className="space-y-4 text-dark-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <p>
                Die UKAGV GmbH mit Sitz in Nürnberg wurde 2008 gegründet und hat sich seitdem
                zu einem der führenden Dienstleister für Glasfaserinfrastruktur in der
                Metropolregion Nürnberg und ganz Bayern entwickelt. Mit einem Team aus über
                50 qualifizierten Fachkräften betreuen wir Projekte jeder Größenordnung.
              </p>
              <p>
                Unser Erfolg basiert auf drei Säulen: <span className="text-white font-medium">erstklassige Qualität</span>,
                <span className="text-white font-medium"> absolute Termintreue</span> und
                <span className="text-white font-medium"> faire Preise</span>. Wir arbeiten eng mit den
                großen Netzbetreibern zusammen und setzen auch komplexe Projekte zuverlässig um.
              </p>
            </motion.div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-fiber-500/5 transition-all cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-fiber-500/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-fiber-400" />
                  </div>
                  <div>
                    <span className="font-medium text-white">{value.text}</span>
                    <p className="text-xs text-dark-400">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Kontakt aufnehmen
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
              whileHover={{ y: -5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`} />
              <div className="relative p-6 rounded-2xl glass border border-fiber-500/10 group-hover:border-fiber-500/30 transition-all text-center">
                <motion.div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-dark-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            Unsere <span className="gradient-text">Geschichte</span>
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fiber-500/50 via-fiber-500/20 to-transparent hidden md:block" />

            <div className="space-y-8 md:space-y-0">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className={`flex items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:justify-center`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-block p-4 rounded-xl glass border border-fiber-500/10 hover:border-fiber-500/30 transition-all">
                      <span className="text-fiber-400 font-bold text-lg">{milestone.year}</span>
                      <p className="text-dark-300 text-sm">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-fiber-500 to-primary-500 flex-shrink-0 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FiberIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="3" />
      <path d="M9 10 Q 14 6, 20 10" />
      <path d="M9 12 Q 14 12, 20 12" />
      <path d="M9 14 Q 14 18, 20 14" />
    </svg>
  )
}
