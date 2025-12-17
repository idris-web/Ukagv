'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone, Wifi, Award, Users, MapPin, ChevronDown } from 'lucide-react'
import { MorphingText, MagneticButton, TextScramble, NumberCounter, CardTilt3D, GradientMesh } from './effects'

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

      {/* Simplified Fiber Cables - Subtle */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroFiberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Main Fiber Cable 1 */}
        <motion.path
          d="M-200 750 Q 300 550, 600 650 T 1200 580 T 1800 700 T 2200 600"
          stroke="url(#heroFiberGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Main Fiber Cable 2 */}
        <motion.path
          d="M-100 850 Q 400 650, 700 800 T 1300 700 T 1900 850 T 2300 750"
          stroke="url(#heroFiberGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
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

          {/* Headline with Morphing Text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="text-white drop-shadow-lg">Glasfaser.</span>
            <br />
            <span className="gradient-text drop-shadow-lg">
              <MorphingText
                words={['Professionell verlegt.', 'Schnell installiert.', 'Zuverlässig verbunden.', 'Zukunftssicher gebaut.']}
                interval={4000}
              />
            </span>
          </motion.h1>

          {/* Subheadline with Text Scramble */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <TextScramble
              text="UKAGV GmbH ist Ihr Partner für Glasfaserverlegung und Hausmeisterdienste."
              duration={1500}
              delay={800}
            />
            <span className="text-white font-medium"> Wir bringen Highspeed-Internet direkt zu Ihnen</span> –
            zuverlässig, termingerecht und zu fairen Preisen.
          </motion.div>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <MagneticButton
              href="#contact"
              className="btn-primary flex items-center gap-2 group text-lg px-10 py-5"
              strength={0.4}
            >
              Kostenloses Angebot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton
              href="tel:+4991112345678"
              className="btn-secondary flex items-center gap-2 text-lg px-10 py-5"
              strength={0.4}
            >
              <Phone className="w-5 h-5" />
              +49 (0) 911 123 456 78
            </MagneticButton>
          </motion.div>

          {/* Stats Grid with 3D Tilt Cards and Number Counter */}
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
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
              >
                <CardTilt3D tiltAmount={10} glareEnabled={true} className="h-full">
                  <div className="relative p-6 rounded-2xl glass border border-fiber-500/10 h-full">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      <NumberCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-sm text-dark-400">{stat.label}</div>
                  </div>
                </CardTilt3D>
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
