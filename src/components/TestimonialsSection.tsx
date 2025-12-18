'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Star, Quote, MessageSquare } from 'lucide-react'

// Kundenbewertungen aus der Metropolregion
const testimonials = [
  {
    name: 'Thomas M.',
    role: 'Hausbesitzer',
    location: 'Nürnberg-Langwasser',
    text: 'Absolut professionell! Vom ersten Kontakt bis zur Inbetriebnahme alles top. Die Baustelle wurde sauberer hinterlassen, als sie vorher war.',
  },
  {
    name: 'Sandra K.',
    role: 'Geschäftsführerin',
    location: 'Fürth',
    text: 'Wir arbeiten seit Jahren mit Uka-GV zusammen. Termine werden eingehalten, die Qualität stimmt – man merkt, dass hier Profis am Werk sind.',
  },
  {
    name: 'Michael B.',
    role: 'IT-Leiter',
    location: 'Erlangen',
    text: 'Endlich stabile 1 Gbit/s im Büro! Die Dokumentation und das Messprotokoll sind vorbildlich. So muss das sein.',
  },
  {
    name: 'Anna W.',
    role: 'Hausverwalterin',
    location: 'Schwabach',
    text: 'Die Bewohner sind begeistert! Der Umstieg auf Glasfaser hat die Zufriedenheit in unserer Wohnanlage deutlich gesteigert.',
  },
  {
    name: 'Peter L.',
    role: 'Architekt',
    location: 'Nürnberg-Mögeldorf',
    text: 'Bei unseren Neubauprojekten setzen wir nur noch auf Uka-GV. Zuverlässig, kompetent und immer erreichbar.',
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-Rotation alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <MessageSquare className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">Kundenstimmen</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Unsere Kunden </span>
            <span className="gradient-text">sagen...</span>
          </h2>

          {/* Sterne-Bewertung */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg text-dark-400">4.9/5 • 200+ Bewertungen aus Süddeutschland</span>
          </div>
        </motion.div>

        {/* === TESTIMONIAL CARD === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="fiber-quote relative p-8 md:p-10"
        >
          {/* Dekoratives Zitat-Icon */}
          <Quote className="absolute top-6 right-6 w-12 h-12 opacity-20 text-fiber-400" />

          {/* Zitat-Text */}
          <p className="text-xl md:text-2xl text-dark-200 mb-6 leading-relaxed">
            &ldquo;{testimonials[activeIndex].text}&rdquo;
          </p>

          {/* Autor und Navigation */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-lg">{testimonials[activeIndex].name}</div>
              <div className="text-base text-dark-400">{testimonials[activeIndex].role} • {testimonials[activeIndex].location}</div>
            </div>

            {/* Navigations-Punkte */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Bewertung ${index + 1} von ${testimonials.length}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'w-8 bg-fiber-400' : 'bg-dark-700 hover:bg-dark-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* === TRUST BADGES === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:text-base text-dark-500"
        >
          <span>Google: 4.9</span>
          <span className="hidden sm:inline">•</span>
          <span>ProvenExpert: 4.8</span>
          <span className="hidden sm:inline">•</span>
          <span>98% Empfehlungsrate</span>
        </motion.div>
      </div>
    </section>
  )
}
