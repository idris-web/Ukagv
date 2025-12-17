'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, MapPin, TrendingUp, CheckCircle, Shield, Clock, Sparkles, ArrowRight, Briefcase, Building, Zap, Target, Rocket, Star, Cable } from 'lucide-react'

const stats = [
  { icon: Award, value: '15+', label: 'Jahre Erfahrung im Team', color: 'from-cyan-400 to-blue-500' },
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
  {
    year: '2009-2023',
    title: 'Berufserfahrung',
    event: 'Unser Team sammelt über 15 Jahre Erfahrung in der Glasfaserbranche bei führenden Netzbetreibern und Dienstleistern',
    icon: Briefcase,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    year: '2024',
    title: 'Gründung',
    event: 'UKAGV GmbH wird offiziell in Nürnberg gegründet – vereintes Know-how unter einem Dach',
    icon: Rocket,
    color: 'from-cyan-400 to-teal-500'
  },
  {
    year: '2024',
    title: 'Telekom Partner',
    event: 'Zertifizierung als offizieller Telekom Deutschland Partner für Glasfaserausbau',
    icon: Award,
    color: 'from-teal-400 to-emerald-500'
  },
  {
    year: '2025',
    title: 'Expansion',
    event: 'Ausbau des Teams auf 50+ Mitarbeiter und Start weiterer Großprojekte in ganz Bayern',
    icon: Target,
    color: 'from-emerald-400 to-cyan-500'
  },
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
      {/* Background - Clean */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Static Orbs */}
      <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-fiber-500/3 blur-3xl" />
      <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-primary-500/3 blur-3xl" />

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
                Die UKAGV GmbH mit Sitz in Nürnberg wurde <span className="text-fiber-400 font-medium">2024 gegründet</span> –
                mit einem Team, das über <span className="text-white font-medium">15 Jahre Erfahrung</span> in der
                Glasfaserbranche mitbringt. Unser Know-how stammt von führenden Netzbetreibern
                und Dienstleistern, das wir jetzt unter einem Dach vereinen.
              </p>
              <p>
                Als <span className="text-white font-medium">offizieller Telekom Deutschland Partner</span> und
                zertifizierter FTTH-Fachbetrieb betreuen wir Projekte jeder Größenordnung –
                von der Hausanschlussverlegung bis zum Großprojekt mit mehreren hundert Anschlüssen.
              </p>
              <p>
                Unser Erfolg basiert auf drei Säulen: <span className="text-white font-medium">erstklassige Qualität</span>,
                <span className="text-white font-medium"> absolute Termintreue</span> und
                <span className="text-white font-medium"> faire Preise</span>.
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

        {/* Timeline - Unsere Geschichte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-32"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              className="inline-flex items-center gap-2 text-fiber-400 text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full glass border border-fiber-500/20 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.3 }}
            >
              <Rocket className="w-4 h-4" />
              Unsere Reise
            </motion.span>
            <h3 className="text-3xl md:text-5xl font-bold">
              Erfahrung trifft <span className="gradient-text">Innovation</span>
            </h3>
            <p className="text-dark-400 mt-4 max-w-2xl mx-auto">
              Neu gegründet, aber mit jahrzehntelanger Expertise – wir vereinen das Beste aus beiden Welten.
            </p>
          </div>

          {/* Big Timeline Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 1.4 + index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow Background */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${milestone.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />

                {/* Card */}
                <div className="relative h-full p-8 rounded-3xl glass border border-fiber-500/10 group-hover:border-fiber-500/30 transition-all overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 grid-pattern opacity-10" />

                  {/* Corner Accent - Static */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${milestone.color} opacity-10 rounded-bl-full`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${milestone.color} mb-6 shadow-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <milestone.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Year */}
                    <div className="text-fiber-400 font-bold text-sm tracking-wider mb-2">
                      {milestone.year}
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-fiber-400 transition-colors">
                      {milestone.title}
                    </h4>

                    {/* Description */}
                    <p className="text-dark-400 text-sm leading-relaxed">
                      {milestone.event}
                    </p>

                    {/* Index Number */}
                    <div className="absolute bottom-4 right-4 text-8xl font-black text-dark-800/30 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Connection Line (not on last item) */}
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-fiber-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Call to Action under Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-fiber-500/10 to-primary-500/10 border border-fiber-500/20">
              <Star className="w-5 h-5 text-fiber-400" />
              <span className="text-white font-medium">Werden Sie Teil unserer Erfolgsgeschichte</span>
              <ArrowRight className="w-5 h-5 text-fiber-400" />
            </div>
          </motion.div>
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
