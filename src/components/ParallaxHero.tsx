'use client'

import { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { motion } from 'framer-motion'

// Floating fiber particles
const FiberParticle = ({
  color,
  size,
  top,
  left,
  delay
}: {
  color: string
  size: number
  top: string
  left: string
  delay: number
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      top,
      left,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40`,
    }}
    animate={{
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
)

// Glowing line component
const GlowLine = ({
  startX,
  startY,
  endX,
  endY,
  color,
  delay,
}: {
  startX: number
  startY: number
  endX: number
  endY: number
  color: string
  delay: number
}) => (
  <motion.line
    x1={startX}
    y1={startY}
    x2={endX}
    y2={endY}
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.6 }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
    style={{
      filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color})`
    }}
  />
)

export default function ParallaxHero() {
  const parallaxRef = useRef<IParallax>(null)

  const scrollTo = (page: number) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(page)
    }
  }

  return (
    <div className="w-full h-screen">
      <Parallax ref={parallaxRef} pages={5} className="bg-dark-950">

        {/* ===== LAYER 0: Deep Background - Slowest ===== */}
        <ParallaxLayer
          offset={0}
          speed={0.1}
          factor={5}
          style={{
            background: 'radial-gradient(ellipse at center, #0a1628 0%, #030712 100%)',
          }}
        />

        {/* ===== LAYER 1: Star field / Ambient particles ===== */}
        <ParallaxLayer offset={0} speed={0.2} factor={5}>
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
              />
            ))}
          </div>
        </ParallaxLayer>

        {/* ===== LAYER 2: Fiber glow orbs - Slow ===== */}
        <ParallaxLayer offset={0} speed={0.3} factor={3}>
          <div className="absolute inset-0 overflow-hidden">
            <FiberParticle color="#22d3ee" size={300} top="10%" left="-5%" delay={0} />
            <FiberParticle color="#a855f7" size={250} top="60%" left="85%" delay={0.5} />
            <FiberParticle color="#3b82f6" size={200} top="80%" left="10%" delay={1} />
          </div>
        </ParallaxLayer>

        {/* ===== LAYER 3: Floating fiber lines - Medium slow ===== */}
        <ParallaxLayer offset={0} speed={0.4} factor={2}>
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fiberGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fiberGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <GlowLine startX={0} startY={200} endX={400} endY={100} color="#22d3ee" delay={0.2} />
            <GlowLine startX={100} startY={300} endX={500} endY={150} color="#3b82f6" delay={0.4} />
            <GlowLine startX={800} startY={50} endX={1200} endY={200} color="#a855f7" delay={0.6} />
            <GlowLine startX={900} startY={150} endX={1400} endY={80} color="#ec4899" delay={0.8} />
          </svg>
        </ParallaxLayer>

        {/* ===== HERO SECTION - Page 0 ===== */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="text-center px-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Glasfaser
                </span>
                <br />
                <span className="text-white/90">der Zukunft</span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-300 max-w-2xl mx-auto mb-8">
                Ultraschnelle Verbindungen für Ihr Unternehmen
              </p>
              <motion.button
                onClick={() => scrollTo(1)}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold text-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Entdecken
              </motion.button>
            </motion.div>
          </div>
        </ParallaxLayer>

        {/* ===== Scroll indicator ===== */}
        <ParallaxLayer offset={0} speed={0.8} style={{ pointerEvents: 'none' }}>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </ParallaxLayer>

        {/* ===== FLOATING CABLES - Fast layer ===== */}
        <ParallaxLayer offset={0.5} speed={1.5} factor={1}>
          <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
            <motion.path
              d="M -100 300 Q 200 100 500 300 T 1100 300 T 1700 300 T 2300 300"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              style={{ filter: 'drop-shadow(0 0 10px #22d3ee)' }}
            />
            <motion.path
              d="M -100 350 Q 200 550 500 350 T 1100 350 T 1700 350 T 2300 350"
              stroke="#a855f7"
              strokeWidth={3}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.3, ease: "easeInOut" }}
              style={{ filter: 'drop-shadow(0 0 10px #a855f7)' }}
            />
          </svg>
        </ParallaxLayer>

        {/* ===== PAGE 1: Services ===== */}
        <ParallaxLayer offset={1} speed={0.3} factor={1}>
          <div className="absolute inset-0 overflow-hidden">
            <FiberParticle color="#10b981" size={350} top="20%" left="70%" delay={0.3} />
            <FiberParticle color="#f59e0b" size={200} top="70%" left="5%" delay={0.7} />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.6}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Unsere <span className="text-cyan-400">Leistungen</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '⚡', title: 'Blitzschnell', desc: 'Bis zu 10 Gbit/s Geschwindigkeit', color: '#22d3ee' },
                { icon: '🛡️', title: 'Sicher', desc: 'Verschlüsselte Datenübertragung', color: '#a855f7' },
                { icon: '🌍', title: 'Zuverlässig', desc: '99.9% Verfügbarkeit garantiert', color: '#10b981' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: item.color,
                    boxShadow: `0 0 30px ${item.color}30`
                  }}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-dark-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        {/* ===== PAGE 2: Stats ===== */}
        <ParallaxLayer offset={2} speed={0.2} factor={1}>
          <div className="absolute inset-0 overflow-hidden">
            <FiberParticle color="#ec4899" size={280} top="30%" left="-10%" delay={0} />
            <FiberParticle color="#3b82f6" size={320} top="50%" left="80%" delay={0.5} />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.7}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { num: '500+', label: 'Projekte', color: '#22d3ee' },
                { num: '10k+', label: 'km Glasfaser', color: '#a855f7' },
                { num: '99.9%', label: 'Uptime', color: '#10b981' },
                { num: '24/7', label: 'Support', color: '#f59e0b' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, type: 'spring' }}
                >
                  <div
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}50` }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-dark-300 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        {/* ===== PAGE 3: Process ===== */}
        <ParallaxLayer offset={3} speed={0.25} factor={1}>
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20" preserveAspectRatio="none">
              <motion.path
                d="M 0 400 Q 480 200 960 400 Q 1440 600 1920 400"
                stroke="#22d3ee"
                strokeWidth={4}
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            </svg>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={0.6}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
              Unser <span className="text-purple-400">Prozess</span>
            </h2>
            <div className="space-y-8">
              {[
                { step: '01', title: 'Beratung', desc: 'Individuelle Analyse Ihrer Anforderungen' },
                { step: '02', title: 'Planung', desc: 'Maßgeschneiderte Netzwerkarchitektur' },
                { step: '03', title: 'Installation', desc: 'Professionelle Verlegung durch Experten' },
                { step: '04', title: 'Support', desc: '24/7 Betreuung und Wartung' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="text-6xl font-bold text-cyan-500/30">{item.step}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-dark-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        {/* ===== PAGE 4: CTA ===== */}
        <ParallaxLayer offset={4} speed={0.2} factor={1}>
          <div className="absolute inset-0 overflow-hidden">
            <FiberParticle color="#22d3ee" size={400} top="30%" left="40%" delay={0} />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={4}
          speed={0.5}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="text-center px-4">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Bereit für die <span className="text-cyan-400">Zukunft</span>?
            </motion.h2>
            <motion.p
              className="text-xl text-dark-300 mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Kontaktieren Sie uns für eine kostenlose Beratung
            </motion.p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl text-white font-bold text-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 50px rgba(34, 211, 238, 0.5), 0 0 100px rgba(168, 85, 247, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Jetzt starten
            </motion.a>
          </div>
        </ParallaxLayer>

        {/* ===== Navigation dots ===== */}
        <ParallaxLayer sticky={{ start: 0, end: 4 }} style={{ pointerEvents: 'none' }}>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
            {[0, 1, 2, 3, 4].map((page) => (
              <motion.button
                key={page}
                onClick={() => scrollTo(page)}
                className="w-3 h-3 rounded-full bg-white/30 hover:bg-cyan-400 transition-colors"
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>
        </ParallaxLayer>

      </Parallax>
    </div>
  )
}
