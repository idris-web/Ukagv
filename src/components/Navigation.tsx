'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Leistungen' },
  { href: '#about', label: 'Über uns' },
  { href: '#process', label: 'Ablauf' },
  { href: '#testimonials', label: 'Referenzen' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Kontakt' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-dark-950/90 backdrop-blur-xl border-b border-fiber-500/10 shadow-lg shadow-dark-950/50'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo - UKAGV */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative flex items-center">
              {/* Fiber Optic Icon */}
              <svg viewBox="0 0 48 32" className="w-12 h-8">
                <defs>
                  <linearGradient id="navFiberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                  <filter id="navGlow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Cable bundle */}
                <circle cx="6" cy="16" r="5" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                {/* Fiber strands */}
                <motion.path
                  d="M11 14 Q 20 10, 30 14 T 48 12"
                  stroke="url(#navFiberGrad)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#navGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.path
                  d="M11 16 Q 20 16, 30 16 T 48 16"
                  stroke="url(#navFiberGrad)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#navGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                />
                <motion.path
                  d="M11 18 Q 20 22, 30 18 T 48 20"
                  stroke="url(#navFiberGrad)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#navGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
                {/* Glowing dots */}
                <motion.circle
                  cx="6" cy="14" r="1.5" fill="#22d3ee"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="6" cy="16" r="1.5" fill="#06b6d4"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="6" cy="18" r="1.5" fill="#22d3ee"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">UKA</span>
                <span className="gradient-text">GV</span>
              </span>
              <span className="text-[10px] text-dark-400 tracking-widest uppercase">Glasfaser GmbH</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  activeSection === link.href
                    ? 'text-fiber-400 bg-fiber-500/10'
                    : 'text-dark-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-fiber-400"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+4991112345678"
              className="flex items-center gap-2 px-4 py-2 text-sm text-dark-200 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+49 (0) 911 123 456 78</span>
            </a>
            <a
              href="#contact"
              className="btn-primary text-sm px-6 py-2.5"
            >
              Kostenlose Beratung
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark-950/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-dark-900 border-l border-fiber-500/20 lg:hidden"
            >
              {/* Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-fiber-500/10">
                <span className="text-lg font-semibold text-white">Menü</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-dark-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                      activeSection === link.href
                        ? 'text-fiber-400 bg-fiber-500/10'
                        : 'text-dark-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-fiber-500/10 space-y-3">
                <a
                  href="tel:+4991112345678"
                  className="flex items-center gap-3 px-4 py-3 text-dark-200 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-fiber-400" />
                  <span>+49 (0) 911 123 456 78</span>
                </a>
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  className="btn-primary w-full text-center py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kostenlose Beratung
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
