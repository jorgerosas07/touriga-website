import { SITE_URL } from './site'

export const wineryId = `${SITE_URL}/#winery`

/** the estate and the website, in the language of the page */
export function organizationSchema(lang: string, description: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Winery',
      '@id': wineryId,
      name: 'Quinta da Touriga-Chã',
      alternateName: 'Quinta da Touriga',
      legalName: 'Jorge Rosas, Vinhos - Unipessoal Lda',
      url: `${SITE_URL}/${lang}`,
      logo: `${SITE_URL}/images/logo-bordeaux.png`,
      image: `${SITE_URL}/og.jpg`,
      description,
      email: 'tourigaporto@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Apartado 17, Quinta da Touriga, Chã',
        postalCode: '5150-909',
        addressLocality: 'Vila Nova de Foz Côa',
        addressRegion: 'Douro Superior',
        addressCountry: 'PT',
      },
      founder: { '@type': 'Person', name: 'José António Castro Ramos Pinto Rosas', birthDate: '1919', deathDate: '1996' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Quinta da Touriga-Chã',
      url: `${SITE_URL}/${lang}`,
      inLanguage: lang,
      publisher: { '@id': wineryId },
    },
  ]
}

/** the two wines, for the wines page */
export function winesSchema(wines: { name: string; description: string; image: string }[]) {
  return wines.map((w) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: w.name,
    description: w.description,
    image: `${SITE_URL}${w.image}`,
    category: 'Wine',
    brand: { '@type': 'Brand', name: 'Quinta da Touriga-Chã' },
    manufacturer: { '@id': wineryId },
  }))
}
