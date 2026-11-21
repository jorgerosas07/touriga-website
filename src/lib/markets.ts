// The markets listed by the client, by region (ISO 3166-1 alpha-2; Canada is listed by province).
// Names are localised with Intl.DisplayNames; `shapes` / `points` name what is drawn on the map.
export type Region = { key: 'na' | 'sa' | 'eu' | 'as'; codes: string[]; provinces?: Record<string, string[]> }

export const REGIONS: Region[] = [
  { key: 'na', codes: ['CA'], provinces: { en: ['Ontario', 'Quebec'], pt: ['Ontário', 'Quebeque'] } },
  { key: 'sa', codes: ['BR'] },
  { key: 'eu', codes: ['PT', 'SE', 'LU', 'GB'] },
  { key: 'as', codes: ['MO'] },
]

/** map keys to tint: whole countries, and the two Canadian provinces */
export const MAP_SHAPES = ['BR', 'PT', 'SE', 'GB', 'LU', 'CA-ON', 'CA-QC']
export const MAP_POINTS = ['PT', 'LU', 'MO']
