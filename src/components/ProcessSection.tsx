'use client'

import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Phone, FileSearch, HardHat, Wrench, CheckCircle, Headphones, Zap } from 'lucide-react'

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Anfrage',
    description: 'Sie rufen an oder schreiben uns. Wir besprechen Ihr Vorhaben und vereinbaren einen Termin vor Ort.',
    highlight: 'Kostenlose Beratung'
  },
  {
    icon: FileSearch,
    number: '02',
    title: 'Vor-Ort-Termin',
    description: 'Wir schauen uns die Gegebenheiten an und erstellen ein detailliertes Angebot – kostenlos und unverbindlich.',
    highlight: 'Unverbindliches Angebot'
  },
  {
    icon: HardHat,
    number: '03',
    title: 'Tiefbau',
    description: 'Unsere Tiefbau-Kolonne verlegt die Leerrohre. Ordentlich, zügig und mit sauberer Wiederherstellung.',
    highlight: 'Professioneller Tiefbau'
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Kabelzug & Montage',
    description: 'Das Glasfaserkabel wird eingezogen, gespleißt und die Technik im Haus installiert.',
    highlight: 'Zertifizierte Techniker'
  },
  {
    icon: CheckCircle,
    number: '05',
    title: 'Messung & Abnahme',
    description: 'Wir messen alle Parameter, dokumentieren alles sauber und übergeben Ihnen die Anlage.',
    highlight: 'Messprotokoll inklusive'
  },
  {
    icon: Headphones,
    number: '06',
    title: 'Fertig',
    description: 'Sie surfen los. Und falls mal was ist: Wir sind für Sie da.',
    highlight: 'Dauerhafter Support'
  }
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Smooth spring animation for the line
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const lineHeight = useTransform(smoothProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Background - Clean and simple */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Subtle static orbs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-fiber-500/3 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[350px] h-[350px] rounded-full bg-primary-500/3 blur-3xl" />

      <div
        className="relative z-10 max-w-7xl mx-auto"
        ref={ref}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-flex items-center gap-2 text-fiber-400 text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full glass border border-fiber-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            So funktioniert es
          </motion.span>
          <motion.h2
            className="text-3xl md:text-6xl font-bold mt-6 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Von der Anfrage
            <br />
            <span className="gradient-text">zum schnellen Internet</span>
          </motion.h2>
          <motion.p
            className="text-dark-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Unkompliziert und transparent – so arbeiten wir bei UKAGV GmbH in Nürnberg.
          </motion.p>

        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Simple Center Line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden lg:block">
            <div className="absolute inset-0 bg-dark-700 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-fiber-400 to-primary-500 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              const colors = [
                'from-cyan-400 to-blue-500',
                'from-blue-400 to-indigo-500',
                'from-indigo-400 to-purple-500',
                'from-purple-400 to-pink-500',
                'from-pink-400 to-rose-500',
                'from-emerald-400 to-cyan-500',
              ]
              const stepColor = colors[index % colors.length]

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -80 : 80, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 80
                  }}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 ${!isEven ? 'lg:text-right' : ''}`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`relative p-8 rounded-3xl glass border border-fiber-500/10 hover:border-fiber-500/40 transition-all duration-500 group ${!isEven ? 'lg:ml-auto' : ''} max-w-xl overflow-hidden`}>
                      {/* Animated Background Gradient */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stepColor} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                      />

                      {/* Glow on hover */}
                      <motion.div
                        className={`absolute -inset-2 bg-gradient-to-br ${stepColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500`}
                      />

                      {/* Animated Border */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: `linear-gradient(${isEven ? '90deg' : '-90deg'}, transparent, rgba(6,182,212,0.3), transparent)`,
                          backgroundSize: '200% 100%',
                        }}
                        initial={{ backgroundPosition: '100% 0%' }}
                        whileInView={{ backgroundPosition: '-100% 0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 + index * 0.1 }}
                      />

                      <div className="relative">
                        {/* Number & Title Row */}
                        <div className={`flex items-center gap-5 mb-5 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                          {/* Large Step Number with Animation */}
                          <motion.div
                            className="relative"
                            initial={{ scale: 0, rotate: -30 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 150 }}
                          >
                            <span className={`text-8xl font-black bg-gradient-to-br ${stepColor} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity`}>
                              {step.number}
                            </span>
                          </motion.div>
                          <div className="flex-1">
                            <motion.h3
                              className="text-2xl md:text-3xl font-bold text-white group-hover:text-fiber-400 transition-colors"
                              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              {step.title}
                            </motion.h3>
                            <motion.span
                              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 mt-2 rounded-full bg-gradient-to-r ${stepColor} text-white`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              {step.highlight}
                            </motion.span>
                          </div>
                        </div>

                        {/* Description with stagger animation */}
                        <motion.p
                          className="text-dark-300 text-lg leading-relaxed"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {step.description}
                        </motion.p>

                        {/* Progress indicator */}
                        <motion.div
                          className={`mt-6 h-1 rounded-full bg-dark-800 overflow-hidden ${!isEven ? 'lg:ml-auto' : ''}`}
                          style={{ width: '80%' }}
                        >
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${stepColor}`}
                            initial={{ width: '0%' }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Icon Node - Clean */}
                  <motion.div
                    className="relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 150 }}
                  >
                    {/* Icon Container */}
                    <div
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${stepColor} flex items-center justify-center shadow-xl`}
                    >
                      <step.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark-900 border-2 border-fiber-400 flex items-center justify-center text-sm font-bold text-fiber-400">
                      {index + 1}
                    </div>

                    {/* Connection Line to next step (mobile) */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-fiber-400 to-transparent" />
                    )}
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              )
            })}
          </div>

          {/* Final success indicator - Clean */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="relative max-w-2xl mx-auto p-8 md:p-10 rounded-3xl glass border border-fiber-500/20">
              <div className="text-center">
                {/* Check Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fiber-500 to-primary-500 mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  <span className="gradient-text">Willkommen in der Zukunft!</span>
                </h3>

                <p className="text-lg text-dark-300 mb-6">
                  Ihr Glasfaseranschluss ist <span className="text-fiber-400 font-semibold">einsatzbereit</span>.
                </p>

                {/* Speed Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-fiber-500/10 border border-fiber-500/20">
                  <Zap className="w-5 h-5 text-fiber-400" />
                  <span className="text-white font-medium">Bis zu 10 Gbit/s – symmetrisch</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
