'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Thomas Müller',
    role: 'Hausbesitzer, München',
    content: 'Die Zusammenarbeit mit FiberConnect war hervorragend. Von der ersten Beratung bis zur Fertigstellung verlief alles reibungslos. Jetzt haben wir endlich schnelles Internet!',
    rating: 5,
    avatar: 'TM'
  },
  {
    name: 'Dr. Sarah Weber',
    role: 'IT-Leiterin, MedTech GmbH',
    content: 'Für unser Unternehmen war eine zuverlässige Glasfaseranbindung geschäftskritisch. FiberConnect hat unsere Erwartungen übertroffen. Professionelle Arbeit mit erstklassigem Service.',
    rating: 5,
    avatar: 'SW'
  },
  {
    name: 'Michael Schmidt',
    role: 'Bauträger, Projekt "Sonnenhöfe"',
    content: 'Bei der Erschließung unseres Neubaugebiets hat FiberConnect von Anfang an mitgedacht. Die Koordination mit anderen Gewerken war perfekt. Absolute Empfehlung!',
    rating: 5,
    avatar: 'MS'
  },
  {
    name: 'Anna Becker',
    role: 'Geschäftsführerin, Becker & Partner',
    content: 'Endlich stabile Videokonferenzen ohne Aussetzer! Das Team war super freundlich und hat alles sauber hinterlassen. Preis-Leistung stimmt hier definitiv.',
    rating: 5,
    avatar: 'AB'
  },
  {
    name: 'Frank Hoffmann',
    role: 'Privatkunde, Hamburg',
    content: 'Ich war skeptisch wegen der Bauarbeiten, aber die wurden so ordentlich durchgeführt, dass man davon nichts mehr sieht. Der Speed ist einfach unglaublich!',
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
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
            Referenzen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Was unsere Kunden
            <br />
            <span className="gradient-text">über uns sagen</span>
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
                <Quote className="w-24 h-24 text-primary-400" />
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
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
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
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-8 bg-gradient-to-r from-primary-500 to-accent-500'
                      : 'bg-dark-600 hover:bg-dark-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-dark-800"
        >
          <div className="text-dark-400 text-sm">Bekannt aus:</div>
          {['TechNews', 'Digital Weekly', 'Fiber Magazin', 'Connect Pro'].map((brand, index) => (
            <div key={index} className="text-dark-500 font-semibold text-lg">
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
