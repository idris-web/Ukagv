'use client'

export default function Footer() {
  return (
    <footer className="py-12 relative">
      <div className="relative z-10 max-w-3xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand */}
          <div>
            <div className="font-bold text-lg text-white mb-1">UKAGV GmbH</div>
            <div className="text-sm text-dark-500">Glasfaser & Gebäudetechnik</div>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-dark-400">
            <a href="#services" className="hover:text-white transition-colors">Leistungen</a>
            <a href="#about" className="hover:text-white transition-colors">Über uns</a>
            <a href="#contact" className="hover:text-white transition-colors">Kontakt</a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-dark-500">
          <span>© 2024 UKAGV GmbH. Alle Rechte vorbehalten.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
