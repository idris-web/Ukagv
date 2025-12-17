'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Play, Wifi, Shield, Clock } from 'lucide-react'

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

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Animated Fiber Cables */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroFiberGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#0ea5e9" />
            <stop offset="70%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroFiberGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#d946ef" />
            <stop offset="60%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Fiber Cable 1 */}
        <motion.path
          d="M-200 650 Q 300 450, 600 550 T 1200 480 T 1800 600 T 2200 500"
          stroke="url(#heroFiberGradient1)"
          strokeWidth="4"
          fill="none"
          filter="url(#heroGlow)"
          style={{ y: fiberY1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Main Fiber Cable 2 */}
        <motion.path
          d="M-100 750 Q 400 550, 700 700 T 1300 600 T 1900 750 T 2300 650"
          stroke="url(#heroFiberGradient2)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          style={{ y: fiberY2 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Main Fiber Cable 3 */}
        <motion.path
          d="M-150 850 Q 350 700, 650 800 T 1250 720 T 1850 850 T 2250 780"
          stroke="url(#heroFiberGradient1)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          style={{ y: fiberY3 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Animated Data Pulses */}
        <motion.circle
          r="8"
          fill="#0ea5e9"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            offsetPath: "path('M-200 650 Q 300 450, 600 550 T 1200 480 T 1800 600 T 2200 500')"
          }}
        />
        <motion.circle
          r="6"
          fill="#d946ef"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          style={{
            offsetPath: "path('M-100 750 Q 400 550, 700 700 T 1300 600 T 1900 750 T 2300 650')"
          }}
        />
      </svg>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-500/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-dark-300">Jetzt verfügbar in Ihrer Region</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Die Zukunft der
          <br />
          <span className="gradient-text">Konnektivität</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10"
        >
          Professionelle Glasfaserverlegung für Privat und Gewerbe.
          Erleben Sie Highspeed-Internet mit bis zu 10 Gbit/s und
          eine zukunftssichere Infrastruktur.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#contact" className="btn-primary flex items-center gap-2 group">
            Kostenloses Angebot
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="btn-secondary flex items-center gap-2">
            <Play className="w-5 h-5" />
            Video ansehen
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Wifi, value: '10 Gbit/s', label: 'Max. Geschwindigkeit' },
            { icon: Shield, value: '99.9%', label: 'Verfügbarkeit' },
            { icon: Clock, value: '< 1ms', label: 'Latenz' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-3">
                <stat.icon className="w-6 h-6 text-primary-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </div>
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
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary-400"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
