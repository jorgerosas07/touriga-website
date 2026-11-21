import en from '@/dictionaries/en.json'
import pt from '@/dictionaries/pt.json'
import fr from '@/dictionaries/fr.json'

export const LOCALES = ['en', 'pt', 'fr'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

const DICTIONARIES = { en, pt, fr }

export const isLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l)
export const getDictionary = (l: string) => DICTIONARIES[isLocale(l) ? l : DEFAULT_LOCALE]

/** BCP 47 tag for Intl (region names, sorting) */
export const intlLocale = (l: string) => ({ en: 'en', pt: 'pt-PT', fr: 'fr-FR' })[isLocale(l) ? l : DEFAULT_LOCALE]
/** Open Graph locale */
export const ogLocale = (l: string) => ({ en: 'en_GB', pt: 'pt_PT', fr: 'fr_FR' })[isLocale(l) ? l : DEFAULT_LOCALE]
