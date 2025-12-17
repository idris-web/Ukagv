'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Phone, FileSearch, HardHat, Wrench, CheckCircle, Headphones } from 'lucide-react'

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Erstberatung',
    description: 'Kostenlose Beratung zu Ihren Anforderungen und Möglichkeiten. Wir analysieren Ihre Situation vor Ort.'
  },
  {
    icon: FileSearch,
    number: '02',
    title: 'Planung',
    description: 'Detaillierte Projektplanung inkl. Trassenführung, Genehmigungen und transparenter Kostenaufstellung.'
  },
  {
    icon: HardHat,
    number: '03',
    title: 'Tiefbau',
    description: 'Professionelle Erdarbeiten mit minimalinvasiven Verfahren. Wiederherstellung aller Oberflächen.'
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Installation',
    description: 'Fachgerechte Verlegung und Spleißung der Glasfaserkabel. Installation aller Endgeräte.'
  },
  {
    icon: CheckCircle,
    number: '05',
    title: 'Abnahme',
    description: 'Umfangreiche Messungen und Tests. Übergabe der kompletten Dokumentation an Sie.'
  },
  {
    icon: Headphones,
    number: '06',
    title: 'Support',
    description: 'Dauerhafter Service und Support. Bei Fragen oder Störungen sind wir für Sie da.'
  }
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
            Unser Prozess
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            In 6 Schritten zu
            <br />
            <span className="gradient-text">Ihrem Glasfaseranschluss</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Von der ersten Beratung bis zum laufenden Support -
            wir begleiten Sie durch den gesamten Prozess.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-dark-700 -translate-x-1/2 hidden lg:block">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                  <div className={`inline-flex items-center gap-4 mb-4 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <span className="text-6xl font-bold text-dark-800">{step.number}</span>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-dark-400 max-w-md leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Icon Node */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 blur-xl opacity-30" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
