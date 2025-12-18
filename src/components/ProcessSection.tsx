'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, MapPin, FileText, HardHat, Rocket, CheckCircle, ArrowRight } from 'lucide-react'

// Prozessschritte - Klarheit für den Kunden
const steps = [
  { num: '01', icon: MessageSquare, title: 'Anfrage', desc: 'Antwort < 24h', color: '#22d3ee' },
  { num: '02', icon: MapPin, title: 'Vor-Ort', desc: 'Kostenlos', color: '#3b82f6' },
  { num: '03', icon: FileText, title: 'Angebot', desc: 'Festpreis', color: '#a855f7' },
  { num: '04', icon: HardHat, title: 'Bau', desc: '1-5 Tage', color: '#f59e0b' },
  { num: '05', icon: Rocket, title: 'Online!', desc: 'Fertig', color: '#10b981' },
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="process" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">Prozess</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">So einfach </span>
            <span className="gradient-text">geht&apos;s</span>
          </h2>

          <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            In 5 einfachen Schritten zum Glasfaseranschluss – ohne versteckte Kosten oder Überraschungen.
          </p>
        </motion.div>

        {/* === STEPS TIMELINE === */}
        {/* Mobile: Vertikal, Desktop: Horizontal */}

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-start relative">
          {/* Verbindungslinie mit Animation */}
          <div className="connection-line absolute top-8 left-[10%] right-[10%]" />

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center relative z-10 w-28"
            >
              {/* Kreis mit Icon und Pulse */}
              <div
                className="timeline-dot w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 transition-transform hover:scale-110"
                style={{ backgroundColor: `${step.color}20`, borderColor: step.color, color: step.color }}
              >
                <step.icon className="w-7 h-7 drop-shadow-[0_0_8px_currentColor]" style={{ color: step.color }} />
              </div>

              <div className="text-lg font-bold text-white">{step.title}</div>
              <div className="text-sm text-dark-500 mt-1">{step.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Vertikal */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 relative"
            >
              {/* Vertikale Verbindungslinie */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-7 top-16 w-0.5 h-6 bg-gradient-to-b"
                  style={{ background: `linear-gradient(to bottom, ${step.color}40, ${steps[index + 1].color}40)` }}
                />
              )}

              {/* Kreis mit Icon */}
              <div
                className="timeline-dot w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0"
                style={{ backgroundColor: `${step.color}20`, borderColor: step.color, color: step.color }}
              >
                <step.icon className="w-6 h-6" style={{ color: step.color }} />
              </div>

              <div>
                <div className="text-base font-bold text-white">{step.title}</div>
                <div className="text-sm text-dark-500">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === CTA === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a href="#contact" className="fiber-link inline-flex items-center gap-2 text-lg font-medium">
            Jetzt Anfrage starten
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
