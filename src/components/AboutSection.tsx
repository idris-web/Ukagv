'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, MapPin, TrendingUp, CheckCircle } from 'lucide-react'

const stats = [
  { icon: Award, value: '15+', label: 'Jahre Erfahrung' },
  { icon: Users, value: '500+', label: 'Projekte abgeschlossen' },
  { icon: MapPin, value: '1.000+', label: 'km verlegtes Kabel' },
  { icon: TrendingUp, value: '100%', label: 'Termintreue' },
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />

      {/* Decorative Fiber Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="aboutFiber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 300 Q 480 200, 960 300 T 1920 300"
          stroke="url(#aboutFiber)"
          strokeWidth="2"
          fill="none"
          style={{ y: imageY }}
        />
        <motion.path
          d="M0 600 Q 480 700, 960 600 T 1920 600"
          stroke="url(#aboutFiber)"
          strokeWidth="2"
          fill="none"
          style={{ y: contentY }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ y: imageY }}
            className="relative"
          >
            {/* Main Image Placeholder */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-fiber-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-fiber-500/10 to-primary-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center">
                    <FiberIcon className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-dark-400 text-sm">Platzhalter für Teambild</p>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 glass p-6 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Zertifiziert</p>
                  <p className="text-dark-400 text-sm">FTTH-Fachbetrieb</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ y: contentY }}
          >
            <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
              Über UKAGV GmbH
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Ihr Spezialist für
              <br />
              <span className="gradient-text">Glasfaser & Service</span>
            </h2>
            <div className="space-y-4 text-dark-300 mb-8">
              <p>
                UKAGV GmbH steht für professionelle Glasfaserverlegung und
                zuverlässige Hausmeisterdienste. Seit über 15 Jahren arbeiten
                wir für Netzbetreiber, Bauträger und Privatkunden.
              </p>
              <p>
                Unser Team aus erfahrenen Monteuren und Technikern sorgt dafür,
                dass Ihre Projekte termingerecht und in höchster Qualität
                umgesetzt werden. Sauber, schnell und fair.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Pünktlich', 'Zuverlässig', 'Sauber', 'Fair'].map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-fiber-400" />
                  <span className="font-medium">{value}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Kontakt aufnehmen
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl glass border border-fiber-500/20 mb-4">
                <stat.icon className="w-7 h-7 text-fiber-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-dark-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FiberIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="3" />
      <path d="M9 10 Q 14 6, 20 10" />
      <path d="M9 12 Q 14 12, 20 12" />
      <path d="M9 14 Q 14 18, 20 14" />
    </svg>
  )
}
