'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
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

// Individual Step Component with its own scroll tracking
function ProcessStep({ step, index, isEven }: { step: typeof steps[0], index: number, isEven: boolean }) {
  const stepRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ['start 0.9', 'start 0.3']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -100 : 100, 0, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1])

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
      ref={stepRef}
      style={{ opacity, x, scale }}
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
        !isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${!isEven ? 'lg:text-right' : ''}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`relative p-8 rounded-3xl glass border border-fiber-500/10 hover:border-fiber-500/40 transition-all duration-500 group ${!isEven ? 'lg:ml-auto' : ''} max-w-xl overflow-hidden`}
        >
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stepColor} opacity-0 group-hover:opacity-10 transition-all duration-500`} />

          {/* Glow on hover */}
          <div className={`absolute -inset-2 bg-gradient-to-br ${stepColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500`} />

          <div className="relative">
            {/* Number & Title Row */}
            <div className={`flex items-center gap-5 mb-5 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
              {/* Large Step Number */}
              <div className="relative">
                <span className={`text-8xl font-black bg-gradient-to-br ${stepColor} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity`}>
                  {step.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-fiber-400 transition-colors">
                  {step.title}
                </h3>
                <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 mt-2 rounded-full bg-gradient-to-r ${stepColor} text-white`}>
                  {step.highlight}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-dark-300 text-lg leading-relaxed">
              {step.description}
            </p>

            {/* Progress indicator */}
            <div className={`mt-6 h-1 rounded-full bg-dark-800 overflow-hidden ${!isEven ? 'lg:ml-auto' : ''}`} style={{ width: '80%' }}>
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${stepColor}`}
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3, duration: 1 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center Icon Node */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
      >
        {/* Icon Container */}
        <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${stepColor} flex items-center justify-center shadow-xl`}>
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
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ['start 0.9', 'start 0.5']
  })

  const headerOpacity = useTransform(headerScrollProgress, [0, 1], [0, 1])
  const headerY = useTransform(headerScrollProgress, [0, 1], [50, 0])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Smooth spring animation for the line
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const lineHeight = useTransform(smoothProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-950 to-transparent pointer-events-none z-10" />

      {/* Background - Smooth gradient transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Subtle static orbs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-fiber-500/3 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[350px] h-[350px] rounded-full bg-primary-500/3 blur-3xl" />

      {/* Smooth bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none z-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Scroll triggered */}
        <motion.div
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-fiber-400 text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full glass border border-fiber-500/20">
            <Zap className="w-4 h-4" />
            So funktioniert es
          </span>
          <h2 className="text-3xl md:text-6xl font-bold mt-6 mb-6">
            Von der Anfrage
            <br />
            <span className="gradient-text">zum schnellen Internet</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Unkompliziert und transparent – so arbeiten wir bei UKAGV GmbH in Nürnberg.
          </p>
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

          {/* Steps - Each with individual scroll tracking */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

          {/* Final success indicator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
