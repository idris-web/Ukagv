'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  { title: 'Nürnberg-Langwasser', type: 'FTTH', units: '320 Haushalte' },
  { title: 'Gewerbepark Fürth', type: 'Gewerbe', units: '45 Betriebe' },
  { title: 'Altstadt Erlangen', type: 'FTTB', units: '180 Einheiten' },
  { title: 'Neubaugebiet Schwabach', type: 'FTTH', units: '150 Häuser' },
]

export default function ProjectGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-32 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Referenzen
          </h2>
          <p className="text-dark-400 text-lg">
            Projekte aus der Region
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-5 rounded-xl bg-dark-900/50 border border-dark-800 text-left"
            >
              <div className="text-xs text-fiber-400 mb-1">{project.type}</div>
              <div className="font-medium text-white mb-1">{project.title}</div>
              <div className="text-xs text-dark-500">{project.units}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
