'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone, Wifi, Award, Users, MapPin, ChevronDown } from 'lucide-react'
import { NumberCounter, GradientMesh } from './effects'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Mesh Background - Subtle */}
      <GradientMesh
        colors={['#06b6d4', '#3b82f6', '#0891b2', '#0ea5e9']}
        speed={0.3}
        className="opacity-15"
      />

      {/* Dark Background Base */}
      <div className="absolute inset-0 bg-dark-950/85" />

      {/* Grid Pattern - very subtle */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Radial Glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)' }} />

      {/* Smooth Fiber Cables - Continuous Animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroFiberGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#06b6d4" />
            <stop offset="80%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroFiberGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#0ea5e9" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroFiberGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Fiber Cable 1 - Draws fast then stays */}
        <motion.path
          d="M-200 650 Q 200 450, 500 550 T 1000 480 T 1500 580 T 2000 500 T 2400 600"
          stroke="url(#heroFiberGradient1)"
          strokeWidth="4"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Main Fiber Cable 2 */}
        <motion.path
          d="M-100 780 Q 300 580, 650 700 T 1150 620 T 1650 750 T 2150 680"
          stroke="url(#heroFiberGradient2)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />

        {/* Main Fiber Cable 3 */}
        <motion.path
          d="M-150 880 Q 350 720, 700 850 T 1250 770 T 1750 880 T 2250 800"
          stroke="url(#heroFiberGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />

        {/* Light pulse traveling along cable 1 - Continuous smooth movement */}
        <motion.circle
          r="6"
          fill="#22d3ee"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1.5 }}
          style={{
            offsetPath: "path('M-200 650 Q 200 450, 500 550 T 1000 480 T 1500 580 T 2000 500 T 2400 600')"
          }}
        />

        {/* Second pulse on cable 1 - offset timing */}
        <motion.circle
          r="5"
          fill="#06b6d4"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 5.5 }}
          style={{
            offsetPath: "path('M-200 650 Q 200 450, 500 550 T 1000 480 T 1500 580 T 2000 500 T 2400 600')"
          }}
        />

        {/* Light pulse traveling along cable 2 */}
        <motion.circle
          r="5"
          fill="#0ea5e9"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
          style={{
            offsetPath: "path('M-100 780 Q 300 580, 650 700 T 1150 620 T 1650 750 T 2150 680')"
          }}
        />

        {/* Light pulse traveling along cable 3 */}
        <motion.circle
          r="4"
          fill="#3b82f6"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2.5 }}
          style={{
            offsetPath: "path('M-150 880 Q 350 720, 700 850 T 1250 770 T 1750 880 T 2250 800')"
          }}
        />
      </svg>

      {/* Static Orbs - Subtle glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-fiber-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-primary-500/5 blur-[80px]" />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center"
      >
        <div className="relative">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-fiber-500/20 mb-8"
          >
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-green-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-white">Jetzt verfügbar in Ihrer Region</span>
          </motion.div>

          {/* Headline - Clean and Professional */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="text-white">Glasfaser.</span>
            <br />
            <span className="gradient-text">Professionell verlegt.</span>
          </motion.h1>

          {/* Subheadline - Clean and professional */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <span className="text-white font-medium">UKAGV GmbH</span> ist Ihr Partner für Glasfaserverlegung und Hausmeisterdienste.
            Wir bringen Highspeed-Internet direkt zu Ihnen – zuverlässig, termingerecht und zu fairen Preisen.
          </motion.p>

          {/* CTA Buttons - Professional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#contact"
              className="btn-primary flex items-center gap-2 group text-lg px-10 py-5"
            >
              Kostenloses Angebot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="tel:+4991112345678"
              className="btn-secondary flex items-center gap-2 text-lg px-10 py-5"
            >
              <Phone className="w-5 h-5" />
              +49 (0) 911 123 456 78
            </a>
          </motion.div>

          {/* Stats Grid - Clean professional cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Wifi, value: 10, suffix: ' Gbit/s', label: 'Maximale Geschwindigkeit', color: 'from-cyan-400 to-blue-500' },
              { icon: Award, value: 500, suffix: '+', label: 'Projekte abgeschlossen', color: 'from-blue-400 to-cyan-500' },
              { icon: Users, value: 15, suffix: '+ Jahre', label: 'Erfahrung im Markt', color: 'from-cyan-500 to-teal-500' },
              { icon: MapPin, value: 1000, suffix: '+ km', label: 'Kabel verlegt', color: 'from-teal-400 to-cyan-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="relative p-6 rounded-2xl glass border border-fiber-500/10 hover:border-fiber-500/20 transition-colors"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <NumberCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-dark-400 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-fiber-400" />
        </motion.div>
      </motion.div>

      {/* Smooth bottom transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent pointer-events-none z-10" />
    </section>
  )
}
