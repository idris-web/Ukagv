'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { siteConfig } from '@/config/site'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden pt-20"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)'
        }}
      />

      {/* Main Content - Kompakter damit Kabel nicht berührt werden */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-3xl mx-auto px-8 md:px-12 text-center flex-1 flex flex-col justify-center"
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1] tracking-tight"
        >
          <span className="gradient-text">Planung. Bau. Vernetzung.</span>
        </motion.h1>

        {/* Slogan - Klare Leistungsbeschreibung */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl text-dark-300 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          FTTH & FTTB Glasfaserausbau · Spleißen · GPON/OTDR-Messungen · APL-Montage – Ihr Partner für den kompletten Breitbandausbau.
        </motion.p>

        {/* Trust Badges - Noch kompakter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-dark-400"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            24.500+ km Glasfaser
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            21.000+ Kunden
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            3.500+ Anschlüsse/Jahr
          </span>
        </motion.div>
      </motion.div>

      {/* Anrufen Button - Positioniert wo Kabel konvergieren */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <a
          href={siteConfig.contact.phoneHref}
          className="relative group overflow-hidden rounded-full"
          aria-label="Jetzt anrufen"
        >
          {/* Lightning/Fiber SVG Animation */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 60"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fiberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0">
                  <animate attributeName="offset" values="-0.5;1" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1">
                  <animate attributeName="offset" values="0;1.5" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0">
                  <animate attributeName="offset" values="0.5;2" dur="2s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Animated fiber lines around button */}
            <motion.path
              d="M 10,30 Q 30,10 50,30 T 90,30 T 130,30 T 170,30 T 190,30"
              fill="none"
              stroke="url(#fiberGradient)"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 10,35 Q 40,55 80,35 T 150,35 T 190,35"
              fill="none"
              stroke="url(#fiberGradient)"
              strokeWidth="1.5"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.8, 0.8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />

            {/* Electric sparks */}
            <motion.circle
              cx="50"
              cy="30"
              r="2"
              fill="#22d3ee"
              filter="url(#glow)"
              animate={{
                cx: [20, 180],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="100"
              cy="30"
              r="1.5"
              fill="#3b82f6"
              filter="url(#glow)"
              animate={{
                cx: [180, 20],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            />
          </svg>

          {/* Button border glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['200% 0', '-200% 0'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Actual button content - Dezenter elektrischer Effekt */}
          <span className="relative flex items-center justify-center text-2xl md:text-3xl font-bold px-14 py-6 md:px-16 md:py-7 bg-dark-950 border border-fiber-400/50 rounded-full text-white group-hover:border-fiber-400/80 transition-all duration-300 overflow-hidden">
            {/* Sanfter innerer Glow */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 70%)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative z-10 text-white font-display tracking-wide">Uka-GV</span>
          </span>
        </a>
      </motion.div>

    </section>
  )
}
