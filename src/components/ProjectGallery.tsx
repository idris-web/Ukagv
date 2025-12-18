'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

// Referenzprojekte aus Süddeutschland
const projects = [
  {
    title: 'Nürnberg-Langwasser',
    type: 'FTTH',
    units: '320 Haushalte',
    detail: 'Kompletterschließung im Wohngebiet',
    color: '#22d3ee'
  },
  {
    title: 'Gewerbepark Fürth',
    type: 'FTTB',
    units: '45 Betriebe',
    detail: 'Highspeed für den Mittelstand',
    color: '#3b82f6'
  },
  {
    title: 'Altstadt Erlangen',
    type: 'FTTB',
    units: '180 Einheiten',
    detail: 'Denkmalschutz-konform verlegt',
    color: '#a855f7'
  },
  {
    title: 'Neubaugebiet Schwabach',
    type: 'FTTH',
    units: '150 Häuser',
    detail: 'Von Anfang an zukunftssicher',
    color: '#10b981'
  },
  {
    title: 'Businesscenter Nürnberg',
    type: 'FTTB',
    units: '28 Firmen',
    detail: '10 Gbit/s für alle Mieter',
    color: '#f59e0b'
  },
  {
    title: 'Wohnanlage Roth',
    type: 'FTTH',
    units: '96 Wohnungen',
    detail: 'Modernisierung Bestandsgebäude',
    color: '#ec4899'
  },
]

export default function ProjectGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">Referenzen</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Projekte in </span>
            <span className="gradient-text">Ihrer Nähe</span>
          </h2>

          <p className="text-dark-300 text-lg md:text-xl">
            Erfolgreich umgesetzte Glasfaserprojekte in Süddeutschland.
          </p>
        </motion.div>

        {/* === QUICK STATS === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-8 sm:gap-12 md:gap-16 mb-12"
        >
          {[
            { value: '847+', label: 'Projekte' },
            { value: '1.250+', label: 'km Glasfaser' },
            { value: '15.000+', label: 'Anschlüsse' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-fiber-400">{stat.value}</div>
              <div className="text-base text-dark-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* === PROJECTS GRID === */}
        {/* 3x2 Grid für 6 Projekte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="fiber-card-trail p-6"
            >
              {/* Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: `${project.color}20`, color: project.color }}
                >
                  {project.type}
                </span>
              </div>

              <h3 className="font-bold text-white text-xl mb-2">{project.title}</h3>
              <p className="text-base text-dark-300 mb-1">{project.units}</p>
              <p className="text-sm text-dark-500">{project.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* === CTA === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a href="#contact" className="fiber-link inline-flex items-center gap-2 text-lg font-medium">
            Ihr Projekt besprechen
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
