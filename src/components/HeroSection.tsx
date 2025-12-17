'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone, Wifi, Shield, Clock, Zap } from 'lucide-react'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const fiberY1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const fiberY2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const fiberY3 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const fiberX = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial Glow Center */}
      <div className="absolute inset-0 radial-glow" />

      {/* Animated Fiber Cables - UKAGV Blau/Cyan Theme */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Blau/Cyan Gradient */}
          <linearGradient id="heroFiberGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#0ca5ea" />
            <stop offset="80%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroFiberGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#0ca5ea" />
            <stop offset="70%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroFiberGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#22d3ee" />
            <stop offset="75%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroGlowStrong">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Fiber Cable 1 - Bold */}
        <motion.path
          d="M-200 650 Q 300 450, 600 550 T 1200 480 T 1800 600 T 2200 500"
          stroke="url(#heroFiberGradient1)"
          strokeWidth="5"
          fill="none"
          filter="url(#heroGlowStrong)"
          style={{ y: fiberY1, x: fiberX }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Main Fiber Cable 2 */}
        <motion.path
          d="M-100 750 Q 400 550, 700 700 T 1300 600 T 1900 750 T 2300 650"
          stroke="url(#heroFiberGradient2)"
          strokeWidth="4"
          fill="none"
          filter="url(#heroGlow)"
          style={{ y: fiberY2 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Main Fiber Cable 3 */}
        <motion.path
          d="M-150 850 Q 350 700, 650 800 T 1250 720 T 1850 850 T 2250 780"
          stroke="url(#heroFiberGradient3)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          style={{ y: fiberY3 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Additional subtle fiber lines */}
        <motion.path
          d="M-200 400 Q 400 350, 800 420 T 1400 380 T 2000 450"
          stroke="url(#heroFiberGradient2)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          opacity={0.3}
          style={{ y: fiberY1 }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
        />

        {/* Animated Data Pulses - Cyan/Blau */}
        <motion.circle
          r="10"
          fill="#22d3ee"
          filter="url(#heroGlowStrong)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            offsetPath: "path('M-200 650 Q 300 450, 600 550 T 1200 480 T 1800 600 T 2200 500')"
          }}
        />
        <motion.circle
          r="8"
          fill="#0ca5ea"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          style={{
            offsetPath: "path('M-100 750 Q 400 550, 700 700 T 1300 600 T 1900 750 T 2300 650')"
          }}
        />
        <motion.circle
          r="6"
          fill="#06b6d4"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
          style={{
            offsetPath: "path('M-150 850 Q 350 700, 650 800 T 1250 720 T 1850 850 T 2250 780')"
          }}
        />

        {/* Static glow points */}
        {[
          { cx: 600, cy: 550, r: 4 },
          { cx: 1200, cy: 480, r: 3 },
          { cx: 700, cy: 700, r: 3 },
          { cx: 1300, cy: 600, r: 4 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="#22d3ee"
            filter="url(#heroGlow)"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </svg>

      {/* Floating Orbs - Blau/Cyan */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-fiber-500/15 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary-500/15 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-fiber-400/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-fiber-400"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm text-dark-300">Glasfaser-Experten in Ihrer Nähe</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Glasfaser.
          <br />
          <span className="gradient-text">Professionell verlegt.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10"
        >
          UKAGV GmbH ist Ihr Partner für Glasfaserverlegung und Hausmeisterdienste.
          Wir bringen Highspeed-Internet direkt zu Ihnen – zuverlässig, termingerecht
          und zu fairen Preisen.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#contact" className="btn-primary flex items-center gap-2 group">
            Jetzt Angebot anfragen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="tel:+4912345678" className="btn-secondary flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Direkt anrufen
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Wifi, value: '10 Gbit/s', label: 'Max. Speed' },
            { icon: Shield, value: '100%', label: 'Qualität' },
            { icon: Clock, value: '24h', label: 'Erreichbar' },
            { icon: Zap, value: '15+ Jahre', label: 'Erfahrung' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-fiber-500/10 border border-fiber-500/20 mb-3">
                <stat.icon className="w-6 h-6 text-fiber-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-fiber-500/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-fiber-400"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
