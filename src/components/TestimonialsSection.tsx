'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Thomas M.',
    role: 'Hausbesitzer',
    content: 'UKAGV hat bei uns im Neubaugebiet die Glasfaser verlegt. Die Jungs waren pünktlich, haben sauber gearbeitet und der Garten sieht wieder aus wie vorher. Top!',
    rating: 5,
    avatar: 'TM'
  },
  {
    name: 'Sandra K.',
    role: 'Projektleiterin, Bauträger',
    content: 'Wir arbeiten seit 3 Jahren mit UKAGV zusammen. Die Kommunikation stimmt, die Termine werden eingehalten und die Qualität ist immer einwandfrei.',
    rating: 5,
    avatar: 'SK'
  },
  {
    name: 'Michael B.',
    role: 'Geschäftsführer, IT-Firma',
    content: 'Endlich eine stabile Leitung fürs Büro! UKAGV hat das Kabel vom Verteiler bis zu uns ins Haus gezogen. Schnell, unkompliziert, guter Preis.',
    rating: 5,
    avatar: 'MB'
  },
  {
    name: 'Anna W.',
    role: 'Hausverwaltung',
    content: 'Auch der Hausmeisterservice von UKAGV ist klasse. Zuverlässig, freundlich und flexibel. Kann ich nur empfehlen.',
    rating: 5,
    avatar: 'AW'
  },
  {
    name: 'Frank H.',
    role: 'Privatkunde',
    content: 'Ich hatte Bedenken wegen der Tiefbauarbeiten – aber die Truppe hat alles ordentlich hinterlassen. Und das Internet ist jetzt endlich schnell!',
    rating: 5,
    avatar: 'FH'
  }
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-fiber-500/10 blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
            Kundenstimmen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Das sagen unsere
            <br />
            <span className="gradient-text">Kunden über uns</span>
          </h2>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-12"
        >
          <div className="animated-border">
            <div className="relative p-8 md:p-12 rounded-2xl bg-dark-900/80 backdrop-blur-sm">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-24 h-24 text-fiber-400" />
              </div>

              {/* Content */}
              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl md:text-2xl text-white leading-relaxed mb-8"
                >
                  &ldquo;{testimonials[activeIndex].content}&rdquo;
                </motion.p>

                {/* Author */}
                <motion.div
                  key={`author-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[activeIndex].name}</p>
                    <p className="text-dark-400">{testimonials[activeIndex].role}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full glass border border-fiber-500/20 flex items-center justify-center hover:bg-fiber-500/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-8 bg-gradient-to-r from-fiber-500 to-primary-500'
                      : 'w-2 bg-dark-600 hover:bg-dark-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass border border-fiber-500/20 flex items-center justify-center hover:bg-fiber-500/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Partner Logos Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-dark-800"
        >
          <div className="text-dark-400 text-sm">Wir arbeiten u.a. für:</div>
          {['Netzbetreiber', 'Bauträger', 'Kommunen', 'Privatkunden'].map((partner, index) => (
            <div key={index} className="text-dark-500 font-medium">
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
