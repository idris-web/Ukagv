'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Building2, Wrench, Network, Cable, HardHat } from 'lucide-react'

const services = [
  { icon: Home, title: 'Privatanschlüsse', color: '#22d3ee' },
  { icon: Building2, title: 'Gewerbe & Industrie', color: '#3b82f6' },
  { icon: HardHat, title: 'Tiefbauarbeiten', color: '#10b981' },
  { icon: Network, title: 'Netzwerkinstallation', color: '#a855f7' },
  { icon: Cable, title: 'Spleißarbeiten', color: '#ec4899' },
  { icon: Wrench, title: 'Hausmeisterdienste', color: '#14b8a6' },
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-32 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Alles aus einer Hand
          </h2>
          <p className="text-dark-400 text-lg">
            Vom Tiefbau bis zur Inbetriebnahme
          </p>
        </motion.div>

        {/* Services Grid - Simple */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-dark-900/50 border border-dark-800 hover:border-fiber-500/30 transition-colors"
            >
              <service.icon
                className="w-8 h-8"
                style={{ color: service.color }}
              />
              <span className="text-sm font-medium text-dark-200">
                {service.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
