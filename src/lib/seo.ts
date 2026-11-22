import { alternates, getDictionary, ogLocale } from './i18n'
import { PAGES, type PageKey } from './site'

/** title, description, canonical and language alternates, Open Graph and Twitter card for one page */
export function pageMetadata(lang: string, key: PageKey) {
  const d = getDictionary(lang)
  const { title, description } = d.seo[key]
  const path = PAGES.find((p) => p.key === key)!.path
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: { title, description, url: `/${lang}${path}`, siteName: d.seo.siteName, type: 'website', locale: ogLocale(lang), images: [{ url: '/og.jpg', width: 1200, height: 630, alt: d.seo.siteName }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  }
}
