import '../globals.css'
import { ReactNode } from 'react'
import { Literata, Figtree, Cormorant_SC } from 'next/font/google'
import CinematicAgeGate from '@/components/CinematicAgeGate'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getDictionary, LOCALES } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'
import JsonLd from '@/components/JsonLd'
import { organizationSchema } from '@/lib/schema'

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
  return LOCALES.map((lang) => ({ lang }))
}

export const metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
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
  const dictionary = getDictionary(resolvedParams.lang)

  return (
    <html lang={resolvedParams.lang} className={`${literata.variable} ${figtree.variable} ${brand.variable}`}>
      <body id="top" className="antialiased">
                  {/* Inject the strict Age Gate before any other content */}
          <CinematicAgeGate dictionary={dictionary} />
          <JsonLd data={organizationSchema(resolvedParams.lang, dictionary.seo.home.description)} />
        <a href="#main" className="skip-link">{dictionary.nav.skip}</a>
          <Navigation lang={resolvedParams.lang} dictionary={dictionary} />
          <main id="main" className="relative w-full">
            {children}
          </main>
          <Footer dictionary={dictionary} lang={resolvedParams.lang} />
              </body>
    </html>
  )
}
