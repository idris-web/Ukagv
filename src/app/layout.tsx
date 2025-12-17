import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FiberConnect Pro | Professionelle Glasfaserverlegung',
  description: 'Ihr Partner für schnelles Internet. Professionelle Glasfaserverlegung für Privat und Gewerbe. Zukunftssichere Netzwerklösungen mit bis zu 10 Gbit/s.',
  keywords: 'Glasfaser, Glasfaserverlegung, FTTH, Breitband, Internet, Netzwerk, Glasfaserkabel',
  authors: [{ name: 'FiberConnect Pro' }],
  openGraph: {
    title: 'FiberConnect Pro | Professionelle Glasfaserverlegung',
    description: 'Ihr Partner für schnelles Internet. Professionelle Glasfaserverlegung für Privat und Gewerbe.',
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
