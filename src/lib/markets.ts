// The markets listed by the client, by region (ISO 3166-1 alpha-2; Canada is listed by province).
// Names are localised with Intl.DisplayNames.
export type Region = { key: 'na' | 'sa' | 'eu' | 'as'; codes: string[]; provinces?: Record<string, string[]> }

export const REGIONS: Region[] = [
  { key: 'na', codes: ['CA'], provinces: { en: ['Ontario', 'Quebec'], pt: ['Ontário', 'Quebeque'] } },
  { key: 'sa', codes: ['BR'] },
  { key: 'eu', codes: ['PT', 'SE', 'LU', 'GB'] },
  { key: 'as', codes: ['MO'] },
]

