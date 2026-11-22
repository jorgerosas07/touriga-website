import type { MetadataRoute } from 'next'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'
import { PAGES, SITE_URL } from '@/lib/site'

// Every page in every language, each one pointing at its translations.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return LOCALES.flatMap((lang) =>
    PAGES.map((p) => ({
      url: `${SITE_URL}/${lang}${p.path}`,
      lastModified,
      changeFrequency: p.key === 'home' ? ('monthly' as const) : ('yearly' as const),
      priority: p.key === 'home' ? 1 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${p.path}`])),
          'x-default': `${SITE_URL}/${DEFAULT_LOCALE}${p.path}`,
        },
      },
    })),
  )
}
