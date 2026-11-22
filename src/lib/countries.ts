import { intlLocale } from './i18n'

/** every country for a form's dropdown, localised and sorted; codes that are not countries are left out */
export function getCountries(lang: string): { code: string; name: string }[] {
  const names = new Intl.DisplayNames([intlLocale(lang)], { type: 'region' })
  const skip = new Set(['AC', 'CP', 'DG', 'EA', 'EU', 'EZ', 'IC', 'TA', 'UN', 'XA', 'XB', 'ZZ', 'QO', 'AN', 'XK', 'UK'])
  const out: { code: string; name: string }[] = []
  for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) {
    const code = String.fromCharCode(a, b)
    if (skip.has(code)) continue
    let name: string | undefined
    try { name = names.of(code) } catch { continue }
    if (name && name !== code && name.length > 2) out.push({ code, name })
  }
  return out.sort((x, y) => x.name.localeCompare(y.name, intlLocale(lang)))
}
