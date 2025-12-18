'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)'
        }}
      />

      {/* Main Content - Clean & Minimal */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center"
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
        >
          <span className="text-white">Glasfaser</span>
          <br />
          <span className="gradient-text">vom Profi</span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl lg:text-3xl text-dark-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Ihr Spezialist für Glasfaserausbau in Süddeutschland.
          Seit 2009 verbinden wir Bayern, Baden-Württemberg und darüber hinaus mit der Zukunft.
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-12 text-base md:text-lg text-dark-400"
        >
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400" />
            1.250+ km verlegt
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400" />
            52 Fachkräfte
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="btn-primary flex items-center gap-2 group text-lg px-10 py-5"
          >
            Kostenloses Angebot
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Anrufen Button mit Glasfaser/Lightning Effekt */}
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

            {/* Actual button content */}
            <span className="relative flex items-center gap-2 text-lg px-8 py-5 bg-dark-900/80 border border-fiber-400/30 rounded-full text-white group-hover:border-fiber-400/60 group-hover:bg-dark-900 transition-all duration-300">
              <Phone className="w-5 h-5 text-fiber-400" />
              <span className="relative">
                Anrufen
                {/* Text glow on hover */}
                <motion.span
                  className="absolute inset-0 text-fiber-400 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  Anrufen
                </motion.span>
              </span>
            </span>
          </a>
        </motion.div>
      </motion.div>

    </section>
  )
}
