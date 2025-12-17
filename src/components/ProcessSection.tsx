'use client'

import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Phone, FileSearch, HardHat, Wrench, CheckCircle, Headphones, Zap, ArrowDown } from 'lucide-react'

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

  // Parallax effects for background elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  // Scale effect for the entire section
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Animated Background Orbs */}
      <motion.div
        style={{ y: bgY1, rotate: bgRotate }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-fiber-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: bgY2 }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: bgY1 }}
        className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/3 blur-3xl"
      />

      {/* Animated Fiber Lines in Background */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1920 1200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="processFiber1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="processGlow">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <motion.path
          d="M-100 200 Q 400 100, 800 200 T 1600 150 T 2100 200"
          stroke="url(#processFiber1)"
          strokeWidth="2"
          fill="none"
          filter="url(#processGlow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M-100 1000 Q 400 1100, 800 1000 T 1600 1050 T 2100 1000"
          stroke="url(#processFiber1)"
          strokeWidth="2"
          fill="none"
          filter="url(#processGlow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      <motion.div
        style={{ scale: sectionScale, opacity: sectionOpacity }}
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

          {/* Scroll Indicator */}
          <motion.div
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <span className="text-xs text-dark-500 mb-2">Scrollen für mehr</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-fiber-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated Center Line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block">
            {/* Background line */}
            <div className="absolute inset-0 bg-dark-700 rounded-full" />
            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full overflow-hidden"
              style={{ height: lineHeight }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-fiber-400 via-cyan-400 to-primary-500" />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-fiber-400 via-cyan-400 to-primary-500 blur-sm" />
            </motion.div>
            {/* Animated pulse traveling down the line */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-fiber-500"
              style={{ top: lineHeight }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -100 : 100, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-20 ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 ${!isEven ? 'lg:text-right' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`relative p-8 rounded-3xl glass border border-fiber-500/10 hover:border-fiber-500/30 transition-all group ${!isEven ? 'lg:ml-auto' : ''} max-w-lg`}>
                      {/* Glow on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-fiber-500/20 to-primary-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500" />

                      <div className="relative">
                        {/* Number & Title Row */}
                        <div className={`flex items-center gap-4 mb-4 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                          <motion.span
                            className="text-7xl font-bold bg-gradient-to-br from-dark-700 to-dark-800 bg-clip-text text-transparent"
                            whileInView={{
                              backgroundImage: [
                                'linear-gradient(to bottom right, #374151, #1f2937)',
                                'linear-gradient(to bottom right, #06b6d4, #0ea5e9)',
                                'linear-gradient(to bottom right, #374151, #1f2937)'
                              ]
                            }}
                            transition={{ duration: 2, delay: index * 0.2 }}
                          >
                            {step.number}
                          </motion.span>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-fiber-400 transition-colors">
                              {step.title}
                            </h3>
                            <span className="text-xs text-fiber-400 font-medium uppercase tracking-wider">
                              {step.highlight}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-dark-300 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Decorative corner */}
                        <div className={`absolute ${isEven ? 'bottom-0 right-0' : 'bottom-0 left-0'} w-16 h-16 bg-gradient-to-tl from-fiber-500/10 to-transparent ${isEven ? 'rounded-tl-full' : 'rounded-tr-full'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Icon Node */}
                  <motion.div
                    className="relative z-10"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                  >
                    {/* Outer glow ring */}
                    <motion.div
                      className="absolute -inset-4 rounded-full bg-gradient-to-br from-fiber-500/30 to-primary-500/30 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    />

                    {/* Rotating border */}
                    <motion.div
                      className="absolute -inset-2 rounded-2xl"
                      style={{
                        background: 'linear-gradient(45deg, #06b6d4, #0ea5e9, #06b6d4, #0ea5e9)',
                        backgroundSize: '300% 300%',
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner container */}
                    <motion.div
                      className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center shadow-2xl"
                      whileHover={{
                        scale: 1.15,
                        rotate: 5,
                        boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)'
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <step.icon className="w-12 h-12 text-white" />
                    </motion.div>

                    {/* Connection dots for mobile */}
                    <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      {index < steps.length - 1 && (
                        <>
                          <div className="w-1 h-1 rounded-full bg-fiber-400" />
                          <div className="w-1 h-1 rounded-full bg-fiber-400/70" />
                          <div className="w-1 h-1 rounded-full bg-fiber-400/40" />
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              )
            })}
          </div>

          {/* Final success indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-fiber-500/10 to-primary-500/10 border border-fiber-500/20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <CheckCircle className="w-6 h-6 text-fiber-400" />
              </motion.div>
              <span className="text-lg font-medium gradient-text">Ihr Glasfaseranschluss ist bereit!</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
