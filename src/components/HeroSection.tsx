'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone, Wifi, Award, Users, MapPin, ChevronDown } from 'lucide-react'
import { NumberCounter, GradientMesh } from './effects'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const cableOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Mesh Background - Subtle */}
      <GradientMesh
        colors={['#06b6d4', '#3b82f6', '#0891b2', '#0ea5e9']}
        speed={0.3}
        className="opacity-15"
      />

      {/* Dark Background Base */}
      <div className="absolute inset-0 bg-dark-950/85" />

      {/* Grid Pattern - very subtle */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Radial Glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)' }} />

      {/* ===== ANIMATED FIBER CABLE SYSTEM ===== */}
      <motion.svg
        style={{ opacity: cableOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Fiber optic color gradients */}
          <linearGradient id="heroCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#06b6d4" />
            <stop offset="90%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#3b82f6" />
            <stop offset="90%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#10b981" />
            <stop offset="90%" stopColor="#34d399" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroTeal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#14b8a6" />
            <stop offset="90%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroPurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#8b5cf6" />
            <stop offset="90%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroPink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#ec4899" />
            <stop offset="90%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#ef4444" />
            <stop offset="90%" stopColor="#f87171" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroStrongGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========== LEFT SIDE CABLES - ANIMATED & MOVING ========== */}

        {/* Cable L1 - Top Left Primary */}
        <motion.path
          stroke="url(#heroCyan)"
          strokeWidth="3.5"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.7,
            d: [
              "M-100 30 Q 150 10, 320 120 Q 490 230, 420 420 Q 350 610, 180 750",
              "M-100 60 Q 130 40, 350 150 Q 520 270, 440 450 Q 360 630, 200 780",
              "M-100 20 Q 170 0, 300 100 Q 470 210, 400 400 Q 330 590, 160 730",
              "M-100 30 Q 150 10, 320 120 Q 490 230, 420 420 Q 350 610, 180 750",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut" },
            opacity: { duration: 1 },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cable L2 - Mid Left */}
        <motion.path
          stroke="url(#heroBlue)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.6,
            d: [
              "M-80 180 Q 120 220, 200 380 Q 280 540, 150 720 Q 20 900, -100 1000",
              "M-80 210 Q 100 260, 220 410 Q 310 570, 170 750 Q 30 930, -80 1020",
              "M-80 160 Q 140 200, 180 360 Q 250 520, 130 700 Q 0 880, -100 980",
              "M-80 180 Q 120 220, 200 380 Q 280 540, 150 720 Q 20 900, -100 1000",
            ]
          }}
          transition={{
            pathLength: { duration: 2.2, ease: "easeOut", delay: 0.2 },
            opacity: { duration: 1, delay: 0.2 },
            d: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />

        {/* Cable L3 - Lower Left */}
        <motion.path
          stroke="url(#heroGreen)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.55,
            d: [
              "M-60 350 Q 80 400, 180 550 Q 280 700, 380 820 Q 480 940, 650 1020",
              "M-60 380 Q 100 430, 200 580 Q 300 730, 400 850 Q 500 970, 670 1050",
              "M-60 330 Q 60 380, 160 530 Q 260 680, 360 800 Q 460 920, 630 1000",
              "M-60 350 Q 80 400, 180 550 Q 280 700, 380 820 Q 480 940, 650 1020",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut", delay: 0.4 },
            opacity: { duration: 1, delay: 0.4 },
            d: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        />

        {/* Cable L4 - Very Top Left */}
        <motion.path
          stroke="url(#heroPurple)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.45,
            d: [
              "M-100 -20 Q 100 -30, 250 50 Q 400 130, 350 280",
              "M-100 0 Q 80 -10, 270 70 Q 420 160, 370 310",
              "M-100 -30 Q 120 -40, 230 40 Q 380 120, 330 260",
              "M-100 -20 Q 100 -30, 250 50 Q 400 130, 350 280",
            ]
          }}
          transition={{
            pathLength: { duration: 1.8, ease: "easeOut", delay: 0.6 },
            opacity: { duration: 1, delay: 0.6 },
            d: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        />

        {/* ========== RIGHT SIDE CABLES - ANIMATED & MOVING ========== */}

        {/* Cable R1 - Top Right Primary */}
        <motion.path
          stroke="url(#heroOrange)"
          strokeWidth="3.5"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.7,
            d: [
              "M2020 50 Q 1780 30, 1620 150 Q 1460 270, 1540 470 Q 1620 670, 1800 800",
              "M2020 80 Q 1760 60, 1600 180 Q 1440 300, 1520 500 Q 1600 700, 1780 830",
              "M2020 30 Q 1800 10, 1640 130 Q 1480 250, 1560 450 Q 1640 650, 1820 780",
              "M2020 50 Q 1780 30, 1620 150 Q 1460 270, 1540 470 Q 1620 670, 1800 800",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut", delay: 0.1 },
            opacity: { duration: 1, delay: 0.1 },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        />

        {/* Cable R2 - Mid Right */}
        <motion.path
          stroke="url(#heroTeal)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.6,
            d: [
              "M2050 250 Q 1850 300, 1760 480 Q 1670 660, 1780 870 Q 1890 1080, 2000 1100",
              "M2050 280 Q 1830 330, 1740 510 Q 1650 690, 1760 900 Q 1870 1100, 1980 1130",
              "M2050 230 Q 1870 280, 1780 460 Q 1690 640, 1800 850 Q 1910 1060, 2020 1080",
              "M2050 250 Q 1850 300, 1760 480 Q 1670 660, 1780 870 Q 1890 1080, 2000 1100",
            ]
          }}
          transition={{
            pathLength: { duration: 2.2, ease: "easeOut", delay: 0.3 },
            opacity: { duration: 1, delay: 0.3 },
            d: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        />

        {/* Cable R3 - Lower Right */}
        <motion.path
          stroke="url(#heroPink)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.55,
            d: [
              "M2000 480 Q 1800 530, 1680 700 Q 1560 870, 1400 960 Q 1240 1050, 1050 1100",
              "M2000 510 Q 1780 560, 1660 730 Q 1540 900, 1380 990 Q 1220 1080, 1030 1130",
              "M2000 460 Q 1820 510, 1700 680 Q 1580 850, 1420 940 Q 1260 1030, 1070 1080",
              "M2000 480 Q 1800 530, 1680 700 Q 1560 870, 1400 960 Q 1240 1050, 1050 1100",
            ]
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeOut", delay: 0.5 },
            opacity: { duration: 1, delay: 0.5 },
            d: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
          }}
        />

        {/* Cable R4 - Very Top Right */}
        <motion.path
          stroke="url(#heroRed)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.45,
            d: [
              "M2020 -10 Q 1820 -20, 1680 60 Q 1540 140, 1600 300",
              "M2020 10 Q 1800 0, 1660 80 Q 1520 160, 1580 320",
              "M2020 -20 Q 1840 -30, 1700 50 Q 1560 130, 1620 290",
              "M2020 -10 Q 1820 -20, 1680 60 Q 1540 140, 1600 300",
            ]
          }}
          transition={{
            pathLength: { duration: 1.8, ease: "easeOut", delay: 0.7 },
            opacity: { duration: 1, delay: 0.7 },
            d: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }
          }}
        />

        {/* ========== BOTTOM CABLES - FLOWING WAVES ========== */}

        {/* Cable B1 - Main bottom wave */}
        <motion.path
          stroke="url(#heroCyan)"
          strokeWidth="3"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.5,
            d: [
              "M-100 850 Q 200 800, 500 870 Q 800 940, 1100 850 Q 1400 760, 1700 840 Q 1900 900, 2050 870",
              "M-100 880 Q 200 830, 500 900 Q 800 970, 1100 880 Q 1400 790, 1700 870 Q 1900 930, 2050 900",
              "M-100 830 Q 200 780, 500 850 Q 800 920, 1100 830 Q 1400 740, 1700 820 Q 1900 880, 2050 850",
              "M-100 850 Q 200 800, 500 870 Q 800 940, 1100 850 Q 1400 760, 1700 840 Q 1900 900, 2050 870",
            ]
          }}
          transition={{
            pathLength: { duration: 3, ease: "easeOut", delay: 0.8 },
            opacity: { duration: 1.5, delay: 0.8 },
            d: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cable B2 - Secondary bottom wave */}
        <motion.path
          stroke="url(#heroBlue)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.4,
            d: [
              "M-50 950 Q 250 920, 550 970 Q 850 1020, 1150 950 Q 1450 880, 1750 930 Q 1950 970, 2100 950",
              "M-50 980 Q 250 950, 550 1000 Q 850 1050, 1150 980 Q 1450 910, 1750 960 Q 1950 1000, 2100 980",
              "M-50 930 Q 250 900, 550 950 Q 850 1000, 1150 930 Q 1450 860, 1750 910 Q 1950 950, 2100 930",
              "M-50 950 Q 250 920, 550 970 Q 850 1020, 1150 950 Q 1450 880, 1750 930 Q 1950 970, 2100 950",
            ]
          }}
          transition={{
            pathLength: { duration: 3.5, ease: "easeOut", delay: 1 },
            opacity: { duration: 1.5, delay: 1 },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        />

        {/* Cable B3 - Top crossing wave */}
        <motion.path
          stroke="url(#heroGreen)"
          strokeWidth="2"
          fill="none"
          filter="url(#heroGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.35,
            d: [
              "M-100 100 Q 300 60, 700 150 Q 1100 240, 1500 120 Q 1800 30, 2050 80",
              "M-100 130 Q 300 90, 700 180 Q 1100 270, 1500 150 Q 1800 60, 2050 110",
              "M-100 80 Q 300 40, 700 130 Q 1100 220, 1500 100 Q 1800 10, 2050 60",
              "M-100 100 Q 300 60, 700 150 Q 1100 240, 1500 120 Q 1800 30, 2050 80",
            ]
          }}
          transition={{
            pathLength: { duration: 3, ease: "easeOut", delay: 1.2 },
            opacity: { duration: 1.5, delay: 1.2 },
            d: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />

        {/* ========== LIGHT PULSES - TRAVELING ALONG CABLES ========== */}

        {/* Pulse L1 */}
        <motion.circle
          r="8"
          fill="#22d3ee"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          style={{ offsetPath: "path('M-100 30 Q 150 10, 320 120 Q 490 230, 420 420 Q 350 610, 180 750')" }}
        />

        {/* Pulse L2 */}
        <motion.circle
          r="6"
          fill="#60a5fa"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M-80 180 Q 120 220, 200 380 Q 280 540, 150 720 Q 20 900, -100 1000')" }}
        />

        {/* Pulse R1 */}
        <motion.circle
          r="8"
          fill="#fbbf24"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1, repeatDelay: 2 }}
          style={{ offsetPath: "path('M2020 50 Q 1780 30, 1620 150 Q 1460 270, 1540 470 Q 1620 670, 1800 800')" }}
        />

        {/* Pulse R2 */}
        <motion.circle
          r="6"
          fill="#2dd4bf"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 3, repeatDelay: 1 }}
          style={{ offsetPath: "path('M2050 250 Q 1850 300, 1760 480 Q 1670 660, 1780 870 Q 1890 1080, 2000 1100')" }}
        />

        {/* Pulse B1 - Bottom wave */}
        <motion.circle
          r="7"
          fill="#22d3ee"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 0.5, repeatDelay: 2 }}
          style={{ offsetPath: "path('M-100 850 Q 200 800, 500 870 Q 800 940, 1100 850 Q 1400 760, 1700 840 Q 1900 900, 2050 870')" }}
        />

        {/* Pulse L3 */}
        <motion.circle
          r="5"
          fill="#34d399"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 4, repeatDelay: 2 }}
          style={{ offsetPath: "path('M-60 350 Q 80 400, 180 550 Q 280 700, 380 820 Q 480 940, 650 1020')" }}
        />

        {/* Pulse R3 */}
        <motion.circle
          r="5"
          fill="#f472b6"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.5, repeatDelay: 2.5 }}
          style={{ offsetPath: "path('M2000 480 Q 1800 530, 1680 700 Q 1560 870, 1400 960 Q 1240 1050, 1050 1100')" }}
        />

        {/* Pulse Top crossing */}
        <motion.circle
          r="5"
          fill="#34d399"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2.5, repeatDelay: 1.5 }}
          style={{ offsetPath: "path('M-100 100 Q 300 60, 700 150 Q 1100 240, 1500 120 Q 1800 30, 2050 80')" }}
        />

        {/* Additional fast pulses for more activity */}
        <motion.circle
          r="4"
          fill="#a78bfa"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0, repeatDelay: 3 }}
          style={{ offsetPath: "path('M-100 -20 Q 100 -30, 250 50 Q 400 130, 350 280')" }}
        />

        <motion.circle
          r="4"
          fill="#f87171"
          filter="url(#heroStrongGlow)"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5, repeatDelay: 3 }}
          style={{ offsetPath: "path('M2020 -10 Q 1820 -20, 1680 60 Q 1540 140, 1600 300')" }}
        />
      </motion.svg>

      {/* Static Orbs - Subtle glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-fiber-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-primary-500/5 blur-[80px]" />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center"
      >
        <div className="relative">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-fiber-500/20 mb-8"
          >
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-green-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-white">Jetzt verfügbar in Ihrer Region</span>
          </motion.div>

          {/* Headline - Clean and Professional */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="text-white">Glasfaser.</span>
            <br />
            <span className="gradient-text">Professionell verlegt.</span>
          </motion.h1>

          {/* Subheadline - Clean and professional */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <span className="text-white font-medium">UKAGV GmbH</span> ist Ihr Partner für Glasfaserverlegung und Hausmeisterdienste.
            Wir bringen Highspeed-Internet direkt zu Ihnen – zuverlässig, termingerecht und zu fairen Preisen.
          </motion.p>

          {/* CTA Buttons - Professional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#contact"
              className="btn-primary flex items-center gap-2 group text-lg px-10 py-5"
            >
              Kostenloses Angebot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="tel:+4991112345678"
              className="btn-secondary flex items-center gap-2 text-lg px-10 py-5"
            >
              <Phone className="w-5 h-5" />
              +49 (0) 911 123 456 78
            </a>
          </motion.div>

          {/* Stats Grid - Clean professional cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Wifi, value: 10, suffix: ' Gbit/s', label: 'Maximale Geschwindigkeit', color: 'from-cyan-400 to-blue-500' },
              { icon: Award, value: 500, suffix: '+', label: 'Projekte abgeschlossen', color: 'from-blue-400 to-cyan-500' },
              { icon: Users, value: 15, suffix: '+ Jahre', label: 'Erfahrung im Markt', color: 'from-cyan-500 to-teal-500' },
              { icon: MapPin, value: 1000, suffix: '+ km', label: 'Kabel verlegt', color: 'from-teal-400 to-cyan-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="relative p-6 rounded-2xl glass border border-fiber-500/10 hover:border-fiber-500/20 transition-colors"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <NumberCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-dark-400 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-fiber-400" />
        </motion.div>
      </motion.div>

      {/* Smooth bottom transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent pointer-events-none z-10" />
    </section>
  )
}
