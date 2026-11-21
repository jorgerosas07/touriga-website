// The markets listed by the client, by region (ISO 3166-1 alpha-2). Names are localised with Intl.DisplayNames.
export const REGIONS: { key: 'na' | 'ca' | 'sa' | 'eu' | 'af' | 'as' | 'oc'; codes: string[] }[] = [
  { key: 'na', codes: ['CA', 'US', 'BM'] },
  { key: 'ca', codes: ['BS', 'BB', 'CR', 'DO', 'GP', 'BL', 'MF', 'TC', 'TT', 'VC'] },
  { key: 'sa', codes: ['AR', 'BR', 'CL', 'UY'] },
  { key: 'eu', codes: ['AL', 'AD', 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FR', 'DE', 'GR', 'IS', 'IE', 'IT', 'JE', 'LV', 'LT', 'LU', 'MT', 'ME', 'NL', 'NO', 'PL', 'PT', 'RO', 'RS', 'SI', 'ES', 'SE', 'CH', 'UA', 'GB'] },
  { key: 'af', codes: ['AO', 'CV', 'MZ', 'MU', 'NG', 'RE', 'SC', 'ZA'] },
  { key: 'as', codes: ['AM', 'BH', 'KH', 'KZ', 'CN', 'HK', 'IN', 'ID', 'IL', 'JP', 'JO', 'LB', 'MO', 'MV', 'OM', 'SG', 'KR', 'TW', 'AE', 'VN'] },
  { key: 'oc', codes: ['AU', 'NC', 'NZ', 'PF'] },
]
