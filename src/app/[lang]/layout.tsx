import '../globals.css'
import { ReactNode } from 'react'
import { Literata, Figtree, Cormorant_SC } from 'next/font/google'
import CinematicAgeGate from '@/components/CinematicAgeGate'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import enDict from '@/dictionaries/en.json'
import ptDict from '@/dictionaries/pt.json'

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
})

const brand = Cormorant_SC({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-brand',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

// Next.js static routing for i18n
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return {
    metadataBase: new URL('https://touriga-website.vercel.app'),
    title: 'Quinta da Touriga Chã | Douro Superior',
    description: 'The perfect estate in the oldest appellation in the world.',
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', pt: '/pt', 'x-default': '/en' },
    },
    openGraph: {
      title: 'Quinta da Touriga Chã | Douro Superior',
      description: 'The perfect estate in the oldest appellation in the world.',
      images: ['/images/hero-bg.jpg'],
      locale: lang === 'pt' ? 'pt_PT' : 'en_GB',
      type: 'website',
    },
  }
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
    <html lang={resolvedParams.lang} className={`${literata.variable} ${figtree.variable} ${brand.variable}`}>
      <body id="top" className="antialiased">
                  {/* Inject the strict Age Gate before any other content */}
          <CinematicAgeGate dictionary={dictionary} />
          <a href="#main" className="skip-link">{dictionary.nav.skip}</a>
          <Navigation lang={resolvedParams.lang} dictionary={dictionary} />
          <main id="main" className="relative w-full">
            {children}
          </main>
          <Footer dictionary={dictionary} />
              </body>
    </html>
  )
}
