import '../globals.css'
import { ReactNode } from 'react'
import { Playfair_Display, Outfit } from 'next/font/google'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import CinematicAgeGate from '@/components/CinematicAgeGate'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import enDict from '@/dictionaries/en.json'
import ptDict from '@/dictionaries/pt.json'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

// Next.js static routing for i18n
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }]
}

export const metadata = {
  title: 'Quinta da Touriga Chã | Douro Superior',
  description: 'The perfect estate in the oldest appellation in the world.',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  // Use the exact dictionaries Tiago created
  const dictionary = resolvedParams.lang === 'pt' ? ptDict : enDict

  return (
    <html lang={resolvedParams.lang} className={`lenis lenis-smooth ${playfair.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          {/* Inject the strict Age Gate before any other content */}
          <CinematicAgeGate dictionary={dictionary} />
          <Navigation lang={resolvedParams.lang} />
          <main className="relative w-full min-h-screen">
            {children}
          </main>
          <Footer dictionary={dictionary} />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
