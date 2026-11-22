// The public address of the site; set NEXT_PUBLIC_SITE_URL when the real domain exists.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://touriga-website.vercel.app').replace(/\/$/, '')

/** the five pages, as paths under /<lang> ('' is the home page) */
export const PAGES = [
  { key: 'home', path: '' },
  { key: 'family', path: '/family' },
  { key: 'wines', path: '/wines' },
  { key: 'where', path: '/where' },
  { key: 'contact', path: '/contact' },
] as const
export type PageKey = (typeof PAGES)[number]['key']
