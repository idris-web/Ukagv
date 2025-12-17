'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin } from 'lucide-react'

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-dark-400 text-sm mb-6">
            <MapPin className="w-4 h-4" />
            Nürnberg, Bayern
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Über UKAGV
          </h2>

          <p className="text-dark-300 text-lg leading-relaxed mb-8">
            Wir sind ein Team aus erfahrenen Glasfaser-Spezialisten mit über 15 Jahren
            Branchenerfahrung. Als zertifizierter Telekom Partner setzen wir Projekte
            in höchster Qualität um – pünktlich, sauber und zuverlässig.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {['Zertifiziert', 'Meisterbetrieb', '24/7 Notdienst'].map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-fiber-500/10 border border-fiber-500/20 text-fiber-400 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
