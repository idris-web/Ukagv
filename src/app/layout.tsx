import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UKA GV GmbH | Glasfaser & Netzwerklösungen',
  description: 'UKA GV GmbH - Ihr Spezialist für Glasfaserverlegung und Hausmeisterdienste. Professionelle Netzwerkinfrastruktur für Privat- und Gewerbekunden.',
  keywords: 'UKA GV, Glasfaser, Glasfaserverlegung, FTTH, Netzwerk, Hausmeisterdienste, Tiefbau',
  authors: [{ name: 'UKA GV GmbH' }],
  openGraph: {
    title: 'UKA GV GmbH | Fiber Optic Network Solutions',
    description: 'Professionelle Glasfaserverlegung und Hausmeisterdienste. Wir bringen schnelles Internet zu Ihnen.',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
