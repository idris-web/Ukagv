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

      {/* Fiber Cables - Around the edges, not over text */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Realistic fiber optic colors */}
          <linearGradient id="fiberCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#06b6d4" />
            <stop offset="85%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#3b82f6" />
            <stop offset="85%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#10b981" />
            <stop offset="85%" stopColor="#34d399" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fiberTeal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#14b8a6" />
            <stop offset="85%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === LEFT SIDE CABLES === */}
        <path
          d="M-50 80 Q 150 60, 280 120 Q 400 200, 320 380"
          stroke="url(#fiberCyan)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
          filter="url(#softGlow)"
        />
        <path
          d="M-30 250 Q 100 300, 140 450 Q 180 600, 80 780"
          stroke="url(#fiberBlue)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          filter="url(#softGlow)"
        />
        <path
          d="M-40 850 Q 180 820, 350 870 Q 520 920, 650 980"
          stroke="url(#fiberGreen)"
          strokeWidth="2"
          fill="none"
          opacity="0.45"
          filter="url(#softGlow)"
        />

        {/* === RIGHT SIDE CABLES === */}
        <path
          d="M1970 100 Q 1750 80, 1620 160 Q 1500 250, 1600 400"
          stroke="url(#fiberOrange)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
          filter="url(#softGlow)"
        />
        <path
          d="M1960 320 Q 1820 380, 1780 530 Q 1740 680, 1860 820"
          stroke="url(#fiberTeal)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          filter="url(#softGlow)"
        />
        <path
          d="M1980 870 Q 1750 840, 1580 890 Q 1400 940, 1280 1000"
          stroke="url(#fiberCyan)"
          strokeWidth="2"
          fill="none"
          opacity="0.45"
          filter="url(#softGlow)"
        />

        {/* === BOTTOM CABLES === */}
        <path
          d="M150 820 Q 450 780, 750 810 Q 1050 840, 1350 800 Q 1650 760, 1800 820"
          stroke="url(#fiberBlue)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.35"
          filter="url(#softGlow)"
        />
        <path
          d="M250 900 Q 550 870, 850 895 Q 1150 920, 1450 885 Q 1700 850, 1850 910"
          stroke="url(#fiberGreen)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          filter="url(#softGlow)"
        />

        {/* === LIGHT PULSES === */}
        <motion.circle
          r="4"
          fill="#22d3ee"
          filter="url(#softGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          style={{ offsetPath: "path('M-50 80 Q 150 60, 280 120 Q 400 200, 320 380')" }}
        />
        <motion.circle
          r="3"
          fill="#60a5fa"
          filter="url(#softGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M-30 250 Q 100 300, 140 450 Q 180 600, 80 780')" }}
        />
        <motion.circle
          r="4"
          fill="#fbbf24"
          filter="url(#softGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5, repeatDelay: 2 }}
          style={{ offsetPath: "path('M1970 100 Q 1750 80, 1620 160 Q 1500 250, 1600 400')" }}
        />
        <motion.circle
          r="3"
          fill="#2dd4bf"
          filter="url(#softGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M1960 320 Q 1820 380, 1780 530 Q 1740 680, 1860 820')" }}
        />
        <motion.circle
          r="4"
          fill="#60a5fa"
          filter="url(#softGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1.5 }}
          style={{ offsetPath: "path('M150 820 Q 450 780, 750 810 Q 1050 840, 1350 800 Q 1650 760, 1800 820')" }}
        />
        <motion.circle
          r="3"
          fill="#34d399"
          filter="url(#softGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 3, repeatDelay: 2 }}
          style={{ offsetPath: "path('M-40 850 Q 180 820, 350 870 Q 520 920, 650 980')" }}
        />
        <motion.circle
          r="3"
          fill="#22d3ee"
          filter="url(#softGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2.5, repeatDelay: 2 }}
          style={{ offsetPath: "path('M1980 870 Q 1750 840, 1580 890 Q 1400 940, 1280 1000')" }}
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
