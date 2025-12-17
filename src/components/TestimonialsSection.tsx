'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Thomas M.',
    role: 'Hausbesitzer',
    text: 'Top Arbeit! Pünktlich, sauber, professionell.',
  },
  {
    name: 'Sandra K.',
    role: 'Bauträger GmbH',
    text: 'Zuverlässiger Partner für unsere Projekte.',
  },
  {
    name: 'Michael B.',
    role: 'IT-Dienstleister',
    text: 'Endlich stabiles Internet. Sehr empfehlenswert!',
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="py-32 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kundenstimmen
          </h2>
          <div className="flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-dark-900/50 border border-dark-800 text-left"
            >
              <Quote className="w-6 h-6 text-fiber-500/30 mb-3" />
              <p className="text-dark-300 text-sm mb-4">{t.text}</p>
              <div>
                <div className="font-medium text-white text-sm">{t.name}</div>
                <div className="text-xs text-dark-500">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
