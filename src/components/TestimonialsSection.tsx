'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react'

const testimonials = [
  {
    name: 'Thomas M.',
    role: 'Hausbesitzer, Nürnberg-Langwasser',
    content: 'UKAGV hat bei uns im Neubaugebiet die Glasfaser verlegt. Die Jungs waren pünktlich, haben sauber gearbeitet und der Garten sieht wieder aus wie vorher. Top!',
    rating: 5,
    avatar: 'TM',
    project: 'Hausanschluss'
  },
  {
    name: 'Sandra K.',
    role: 'Projektleiterin, Bauträger GmbH',
    content: 'Wir arbeiten seit 3 Jahren mit UKAGV zusammen. Die Kommunikation stimmt, die Termine werden eingehalten und die Qualität ist immer einwandfrei. Sehr empfehlenswert!',
    rating: 5,
    avatar: 'SK',
    project: 'Neubaugebiet'
  },
  {
    name: 'Michael B.',
    role: 'Geschäftsführer, IT-Dienstleister',
    content: 'Endlich eine stabile Leitung fürs Büro! UKAGV hat das Kabel vom Verteiler bis zu uns ins Haus gezogen. Schnell, unkompliziert, guter Preis. Jetzt haben wir symmetrische 1 Gbit/s.',
    rating: 5,
    avatar: 'MB',
    project: 'Gewerbeanschluss'
  },
  {
    name: 'Anna W.',
    role: 'Hausverwaltung, Fürth',
    content: 'Auch der Hausmeisterservice von UKAGV ist klasse. Zuverlässig, freundlich und flexibel. Betreuen jetzt 3 unserer Objekte. Kann ich nur empfehlen.',
    rating: 5,
    avatar: 'AW',
    project: 'Hausmeisterservice'
  },
  {
    name: 'Frank H.',
    role: 'Privatkunde, Erlangen',
    content: 'Ich hatte Bedenken wegen der Tiefbauarbeiten – aber die Truppe hat alles ordentlich hinterlassen. Pflaster perfekt wieder verlegt. Und das Internet ist jetzt endlich schnell!',
    rating: 5,
    avatar: 'FH',
    project: 'Tiefbau & Anschluss'
  },
  {
    name: 'Dr. Peter S.',
    role: 'Praxisinhaber, Schwabach',
    content: 'Für unsere Arztpraxis brauchten wir eine zuverlässige Verbindung für die Telematik-Infrastruktur. UKAGV hat das Projekt professionell und schnell umgesetzt.',
    rating: 5,
    avatar: 'PS',
    project: 'Praxisanbindung'
  },
  {
    name: 'Martina L.',
    role: 'Eigentümergemeinschaft',
    content: 'Glasfaser für unser Mehrfamilienhaus mit 12 Parteien. Alles aus einer Hand, von der Planung bis zur Abnahme. Sehr zufrieden mit der Abwicklung.',
    rating: 5,
    avatar: 'ML',
    project: 'Mehrfamilienhaus'
  }
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

  const nextTestimonial = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, nextTestimonial])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevTestimonial()
        setIsPaused(true)
      } else if (e.key === 'ArrowRight') {
        nextTestimonial()
        setIsPaused(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextTestimonial, prevTestimonial])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
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
          <p className="text-dark-300 max-w-xl mx-auto">
            Über 500 zufriedene Kunden in der Region Nürnberg vertrauen auf UKAGV
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="animated-border">
            <div className="relative p-8 md:p-12 rounded-2xl bg-dark-900/80 backdrop-blur-sm overflow-hidden min-h-[350px] md:min-h-[300px]">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-24 h-24 text-fiber-400" />
              </div>

              {/* Progress Bar */}
              {!isPaused && (
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-fiber-500 to-primary-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  key={activeIndex}
                />
              )}

              {/* Content */}
              <div className="relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {/* Project Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fiber-500/10 border border-fiber-500/20 mb-4">
                      <span className="text-xs text-fiber-400 font-medium">{testimonials[activeIndex].project}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                      &ldquo;{testimonials[activeIndex].content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonials[activeIndex].avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonials[activeIndex].name}</p>
                        <p className="text-dark-400">{testimonials[activeIndex].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => {
                prevTestimonial()
                setIsPaused(true)
              }}
              className="w-12 h-12 rounded-full glass border border-fiber-500/20 flex items-center justify-center hover:bg-fiber-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1)
                    setActiveIndex(index)
                    setIsPaused(true)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-8 bg-gradient-to-r from-fiber-500 to-primary-500'
                      : 'w-2 bg-dark-600 hover:bg-dark-500'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => {
                nextTestimonial()
                setIsPaused(true)
              }}
              className="w-12 h-12 rounded-full glass border border-fiber-500/20 flex items-center justify-center hover:bg-fiber-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Play/Pause Button */}
            <motion.button
              onClick={() => setIsPaused(!isPaused)}
              className="w-12 h-12 rounded-full glass border border-fiber-500/20 flex items-center justify-center hover:bg-fiber-500/10 transition-colors ml-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-dark-800"
        >
          {[
            { value: '4.9/5', label: 'Durchschnittliche Bewertung' },
            { value: '500+', label: 'Zufriedene Kunden' },
            { value: '98%', label: 'Weiterempfehlungsrate' },
            { value: '100%', label: 'Würden uns wieder wählen' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
