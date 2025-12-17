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

                  {/* Center Icon Node - Enhanced */}
                  <motion.div
                    className="relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                  >
                    {/* Multiple pulsing rings */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute rounded-full border-2 border-fiber-400`}
                        style={{
                          inset: -8 - i * 12,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3 - i * 0.1, 0.6 - i * 0.1, 0.3 - i * 0.1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 + index * 0.2 }}
                      />
                    ))}

                    {/* Rotating outer glow */}
                    <motion.div
                      className={`absolute -inset-4 rounded-2xl bg-gradient-to-br ${stepColor} blur-xl opacity-40`}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Icon Container */}
                    <motion.div
                      className={`relative w-28 h-28 rounded-2xl bg-gradient-to-br ${stepColor} flex items-center justify-center shadow-2xl`}
                      whileHover={{
                        scale: 1.15,
                        rotate: 10,
                        boxShadow: '0 0 50px rgba(6, 182, 212, 0.6)'
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Inner glow */}
                      <div className="absolute inset-2 rounded-xl bg-white/10" />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        <step.icon className="w-14 h-14 text-white relative z-10" />
                      </motion.div>
                    </motion.div>

                    {/* Step Number Badge */}
                    <motion.div
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-dark-900 border-2 border-fiber-400 flex items-center justify-center font-bold text-fiber-400 shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      {index + 1}
                    </motion.div>

                    {/* Connection Line to next step (mobile) */}
                    <div className="lg:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      {index < steps.length - 1 && (
                        <motion.div
                          className="w-0.5 h-8 bg-gradient-to-b from-fiber-400 to-transparent"
                          initial={{ height: 0 }}
                          whileInView={{ height: 32 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              )
            })}
          </div>

          {/* Final success indicator - Großes, beeindruckendes Finale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 80 }}
            className="mt-24 relative"
          >
            {/* Glow Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-fiber-500/20 via-cyan-500/30 to-primary-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative">
              {/* Success Card */}
              <div className="relative max-w-2xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-dark-900/90 to-dark-950/90 backdrop-blur-xl border border-fiber-500/30 overflow-hidden">
                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0%', '-200% 0%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Animated Check Icon */}
                  <motion.div
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-fiber-500 to-primary-500 mb-6 shadow-2xl shadow-fiber-500/30"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="gradient-text">Willkommen in der Zukunft!</span>
                  </motion.h3>

                  <motion.p
                    className="text-xl text-dark-300 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    Ihr Glasfaseranschluss ist <span className="text-fiber-400 font-semibold">einsatzbereit</span>.
                  </motion.p>

                  {/* Speed Badge */}
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-fiber-500/10 border border-fiber-500/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                  >
                    <Zap className="w-5 h-5 text-fiber-400" />
                    <span className="text-white font-medium">Bis zu 10 Gbit/s – symmetrisch</span>
                  </motion.div>

                  {/* Animated Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-fiber-400"
                        style={{
                          left: `${10 + Math.random() * 80}%`,
                          top: `${10 + Math.random() * 80}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
