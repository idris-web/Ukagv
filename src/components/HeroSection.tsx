'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone, Wifi, Shield, Clock, Zap, ChevronDown, Award, Users, Building2, MapPin } from 'lucide-react'

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
      {/* Dark Background Base */}
      <div className="absolute inset-0 bg-dark-950" />

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/95 to-dark-950" />

      {/* Grid Pattern - subtle */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Radial Glow - more subtle */}
      <div className="absolute inset-0 bg-radial-gradient" style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 60%)' }} />

      {/* Animated Fiber Cables */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroFiberGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="85%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroFiberGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#0ca5ea" />
            <stop offset="80%" stopColor="#0ca5ea" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroFiberGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#22d3ee" />
            <stop offset="75%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroGlowStrong">
            <feGaussianBlur stdDeviation="12" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Fiber Cable 1 - Bold, bottom */}
        <motion.path
          d="M-200 750 Q 300 550, 600 650 T 1200 580 T 1800 700 T 2200 600"
          stroke="url(#heroFiberGradient1)"
          strokeWidth="6"
          fill="none"
          filter="url(#heroGlowStrong)"
          style={{ y: fiberY1, x: fiberX }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Main Fiber Cable 2 */}
        <motion.path
          d="M-100 850 Q 400 650, 700 800 T 1300 700 T 1900 850 T 2300 750"
          stroke="url(#heroFiberGradient2)"
          strokeWidth="4"
          fill="none"
          filter="url(#heroGlow)"
          style={{ y: fiberY2 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Main Fiber Cable 3 */}
        <motion.path
          d="M-150 950 Q 350 800, 650 900 T 1250 820 T 1850 950 T 2250 880"
          stroke="url(#heroFiberGradient3)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          style={{ y: fiberY3 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Top subtle fiber lines */}
        <motion.path
          d="M-200 200 Q 400 150, 800 220 T 1400 180 T 2000 250"
          stroke="url(#heroFiberGradient2)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          opacity={0.3}
          style={{ y: fiberY1 }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M-100 300 Q 500 250, 900 320 T 1500 280 T 2100 350"
          stroke="url(#heroFiberGradient3)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          opacity={0.25}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4.5, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Animated Data Pulses */}
        <motion.circle
          r="12"
          fill="#22d3ee"
          filter="url(#heroGlowStrong)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            offsetPath: "path('M-200 750 Q 300 550, 600 650 T 1200 580 T 1800 700 T 2200 600')"
          }}
        />
        <motion.circle
          r="10"
          fill="#0ca5ea"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5 }}
          style={{
            offsetPath: "path('M-100 850 Q 400 650, 700 800 T 1300 700 T 1900 850 T 2300 750')"
          }}
        />
        <motion.circle
          r="8"
          fill="#06b6d4"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 3 }}
          style={{
            offsetPath: "path('M-150 950 Q 350 800, 650 900 T 1250 820 T 1850 950 T 2250 880')"
          }}
        />

        {/* Additional data pulses for more activity */}
        <motion.circle
          r="6"
          fill="#67e8f9"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          style={{
            offsetPath: "path('M-200 750 Q 300 550, 600 650 T 1200 580 T 1800 700 T 2200 600')"
          }}
        />
        <motion.circle
          r="5"
          fill="#a5f3fc"
          filter="url(#heroGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 2.5 }}
          style={{
            offsetPath: "path('M-100 850 Q 400 650, 700 800 T 1300 700 T 1900 850 T 2300 750')"
          }}
        />

        {/* Glow points at intersections */}
        {[
          { cx: 600, cy: 650, r: 5 },
          { cx: 1200, cy: 580, r: 4 },
          { cx: 700, cy: 800, r: 4 },
          { cx: 1300, cy: 700, r: 5 },
          { cx: 900, cy: 320, r: 3 },
          { cx: 1500, cy: 280, r: 3 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="#22d3ee"
            filter="url(#heroGlow)"
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.5, 1],
              r: [dot.r, dot.r * 1.5, dot.r]
            }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </svg>

      {/* Floating Orbs - positioned at bottom */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-fiber-500/10 blur-[100px]"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-[80px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content with backdrop for readability */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center"
      >
        {/* Content backdrop for better readability */}
        <div className="absolute inset-0 -mx-8 -my-12 bg-gradient-to-b from-dark-950/80 via-dark-900/60 to-transparent rounded-3xl blur-xl" />

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

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="text-white drop-shadow-lg">Glasfaser.</span>
            <br />
            <span className="gradient-text drop-shadow-lg">Professionell verlegt.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            UKAGV GmbH ist Ihr Partner für Glasfaserverlegung und Hausmeisterdienste.
            <span className="text-white font-medium"> Wir bringen Highspeed-Internet direkt zu Ihnen</span> –
            zuverlässig, termingerecht und zu fairen Preisen.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="#contact"
              className="btn-primary flex items-center gap-2 group text-lg px-10 py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Kostenloses Angebot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="tel:+4912345678"
              className="btn-secondary flex items-center gap-2 text-lg px-10 py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              +49 (0) 123 456 78
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Wifi, value: '10 Gbit/s', label: 'Maximale Geschwindigkeit', color: 'from-cyan-400 to-blue-500' },
              { icon: Award, value: '500+', label: 'Projekte abgeschlossen', color: 'from-blue-400 to-cyan-500' },
              { icon: Users, value: '15+ Jahre', label: 'Erfahrung im Markt', color: 'from-cyan-500 to-teal-500' },
              { icon: MapPin, value: '1000+ km', label: 'Kabel verlegt', color: 'from-teal-400 to-cyan-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
                <div className="relative p-6 rounded-2xl glass border border-fiber-500/10 group-hover:border-fiber-500/30 transition-all">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </div>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-dark-400 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-fiber-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
