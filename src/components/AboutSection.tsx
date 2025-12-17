'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Award, Users, MapPin, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Award, value: '15+', label: 'Jahre Erfahrung' },
  { icon: Users, value: '10.000+', label: 'Zufriedene Kunden' },
  { icon: MapPin, value: '500+', label: 'km verlegtes Kabel' },
  { icon: TrendingUp, value: '98%', label: 'Weiterempfehlung' },
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
            <stop offset="50%" stopColor="#0ea5e9" />
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Cable className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-dark-400 text-sm">Platzhalter für Teambild</p>
                </div>
              </div>
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 glass p-6 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">ISO 9001</p>
                  <p className="text-dark-400 text-sm">Zertifiziert</p>
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
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
              Über FiberConnect
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Ihr Partner für
              <br />
              <span className="gradient-text">digitale Infrastruktur</span>
            </h2>
            <div className="space-y-4 text-dark-300 mb-8">
              <p>
                Seit über 15 Jahren sind wir Ihr verlässlicher Partner für
                professionelle Glasfaserverlegung. Unser erfahrenes Team aus
                zertifizierten Technikern sorgt für eine fachgerechte Installation
                nach höchsten Qualitätsstandards.
              </p>
              <p>
                Wir verstehen, dass schnelles Internet heute kein Luxus mehr ist,
                sondern eine Notwendigkeit. Deshalb setzen wir auf modernste
                Technologie und nachhaltige Lösungen, die auch in Zukunft
                Bestand haben.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Qualität', 'Zuverlässigkeit', 'Innovation', 'Nachhaltigkeit'].map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
                  <span className="font-medium">{value}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Lernen Sie uns kennen
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
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl glass mb-4">
                <stat.icon className="w-7 h-7 text-primary-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-dark-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Cable({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4z" />
      <path d="M14 21a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2z" />
      <path d="M8 9v3a4 4 0 0 0 4 4h2" />
      <path d="M16 9v3a4 4 0 0 1-4 4h-2" />
    </svg>
  )
}
