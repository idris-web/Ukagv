'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { MapPin, Calendar, Users, ArrowRight, X, ChevronLeft, ChevronRight, Ruler, Clock } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Wohngebiet Nürnberg-Langwasser',
    category: 'FTTH Ausbau',
    location: 'Nürnberg',
    date: '2024',
    description: '320 Haushalte mit Glasfaser versorgt. Kompletter Tiefbau, Hausanschlüsse und Inhaus-Verkabelung.',
    stats: {
      households: 320,
      cable: '8.5 km',
      duration: '4 Monate'
    },
    color: 'from-fiber-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Gewerbepark Fürth-Süd',
    category: 'Gewerbe',
    location: 'Fürth',
    date: '2024',
    description: 'Anbindung von 45 Gewerbebetrieben mit redundanter Glasfaserleitung für maximale Ausfallsicherheit.',
    stats: {
      households: 45,
      cable: '3.2 km',
      duration: '2 Monate'
    },
    color: 'from-primary-500 to-fiber-500'
  },
  {
    id: 3,
    title: 'Altstadt Erlangen',
    category: 'FTTB',
    location: 'Erlangen',
    date: '2023',
    description: 'Herausforderndes Projekt in denkmalgeschützter Altstadt. Schonende Verlegung ohne Grabarbeiten.',
    stats: {
      households: 180,
      cable: '4.8 km',
      duration: '6 Monate'
    },
    color: 'from-cyan-500 to-primary-500'
  },
  {
    id: 4,
    title: 'Neubaugebiet Schwabach',
    category: 'FTTH Neubau',
    location: 'Schwabach',
    date: '2023',
    description: 'Glasfaser-Infrastruktur für Neubaugebiet mit 150 Einfamilienhäusern. Verlegung vor Straßenbau.',
    stats: {
      households: 150,
      cable: '5.1 km',
      duration: '3 Monate'
    },
    color: 'from-fiber-600 to-cyan-600'
  },
  {
    id: 5,
    title: 'Krankenhaus St. Elisabeth',
    category: 'Sonderprojekt',
    location: 'Nürnberg',
    date: '2023',
    description: 'Hochverfügbare Glasfaseranbindung für Krankenhaus. Redundante Leitungsführung, 24/7 Bereitschaft.',
    stats: {
      households: 1,
      cable: '1.2 km',
      duration: '1 Monat'
    },
    color: 'from-primary-600 to-fiber-600'
  },
  {
    id: 6,
    title: 'Gemeinde Stein',
    category: 'FTTH Ausbau',
    location: 'Stein bei Nürnberg',
    date: '2022',
    description: 'Flächendeckender Glasfaser-Ausbau für die Gemeinde. Enge Zusammenarbeit mit Telekom Deutschland.',
    stats: {
      households: 480,
      cable: '12 km',
      duration: '8 Monate'
    },
    color: 'from-cyan-600 to-primary-600'
  },
]

const categories = ['Alle', 'FTTH Ausbau', 'Gewerbe', 'FTTB', 'FTTH Neubau', 'Sonderprojekt']

export default function ProjectGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState('Alle')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeCategory === 'Alle'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
            Unsere Projekte
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Referenzen aus
            <br />
            <span className="gradient-text">der Region</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Werfen Sie einen Blick auf unsere erfolgreich abgeschlossenen Glasfaser-Projekte
            in Nürnberg und Umgebung.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-fiber-500 to-primary-500 text-white shadow-lg shadow-fiber-500/30'
                  : 'glass border border-fiber-500/10 hover:border-fiber-500/30 text-dark-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="relative h-full rounded-2xl overflow-hidden border border-fiber-500/10 hover:border-fiber-500/30 transition-all">
                  {/* Project Image Placeholder */}
                  <div className={`aspect-video bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    {/* Simulated image pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm text-xs font-medium text-white">
                      {project.category}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white text-dark-900 text-sm font-medium flex items-center gap-2">
                        Details ansehen
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-dark-900/80">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-fiber-400 transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-dark-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                    </div>

                    <p className="text-dark-400 text-sm line-clamp-2">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-dark-700">
                      <div className="text-center">
                        <div className="text-fiber-400 font-bold">{project.stats.households}</div>
                        <div className="text-xs text-dark-500">Anschlüsse</div>
                      </div>
                      <div className="text-center">
                        <div className="text-fiber-400 font-bold">{project.stats.cable}</div>
                        <div className="text-xs text-dark-500">Kabel</div>
                      </div>
                      <div className="text-center">
                        <div className="text-fiber-400 font-bold">{project.stats.duration}</div>
                        <div className="text-xs text-dark-500">Dauer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-dark-400 mb-4">Ihr Projekt könnte das nächste sein</p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Projekt besprechen
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-dark-900 rounded-3xl overflow-hidden border border-fiber-500/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-800/80 hover:bg-dark-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className={`aspect-video bg-gradient-to-br ${selectedProject.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/50 text-sm">Projektbild Platzhalter</span>
                </div>
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-dark-900/90 backdrop-blur-sm text-sm font-medium">
                  {selectedProject.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>

                <div className="flex items-center gap-4 text-dark-400 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedProject.date}
                  </span>
                </div>

                <p className="text-dark-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-dark-800 text-center">
                    <Users className="w-6 h-6 text-fiber-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{selectedProject.stats.households}</div>
                    <div className="text-xs text-dark-400">Anschlüsse</div>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-800 text-center">
                    <Ruler className="w-6 h-6 text-fiber-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{selectedProject.stats.cable}</div>
                    <div className="text-xs text-dark-400">Glasfaser</div>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-800 text-center">
                    <Clock className="w-6 h-6 text-fiber-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{selectedProject.stats.duration}</div>
                    <div className="text-xs text-dark-400">Projektdauer</div>
                  </div>
                </div>

                <motion.a
                  href="#contact"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(null)}
                >
                  Ähnliches Projekt anfragen
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
