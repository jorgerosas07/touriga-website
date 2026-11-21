import { WORLD } from '@/lib/world-map'
import { REGIONS } from '@/lib/markets'
import ContactForm from './ContactForm'

// "Where to find us": a line map of the world with the markets tinted, and the countries listed by region.
export default function WhereToFind({ dictionary, lang }: { dictionary: any; lang: string }) {
  const w = dictionary.where
  const names = new Intl.DisplayNames([lang === 'pt' ? 'pt-PT' : 'en'], { type: 'region' })
  const all = REGIONS.flatMap((r) => r.codes)
  // every ISO country for the form's dropdown, localised; not-a-country codes are left out
  const skip = new Set(['AC', 'CP', 'DG', 'EA', 'EU', 'EZ', 'IC', 'TA', 'UN', 'XA', 'XB', 'ZZ', 'QO', 'AN', 'XK', 'UK'])
  const countries: { code: string; name: string }[] = []
  for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) {
    const code = String.fromCharCode(a, b)
    if (skip.has(code)) continue
    let name: string | undefined
    try { name = names.of(code) } catch { continue }
    if (name && name !== code && name.length > 2) countries.push({ code, name })
  }
  countries.sort((x, y) => x.name.localeCompare(y.name, lang === 'pt' ? 'pt-PT' : 'en'))
  const c = dictionary.contact
  // long lists run in columns so the section stays compact
  const order = ['na', 'ca', 'sa', 'af', 'eu', 'as', 'oc'].map((k) => REGIONS.find((r) => r.key === k)!)
  const span: Record<string, string> = { eu: 'sm:col-span-2 lg:col-span-4', as: 'sm:col-span-2 lg:col-span-3' }
  const cols: Record<string, string> = { eu: 'sm:columns-2 lg:columns-4', as: 'sm:columns-2 lg:columns-3' }
  const shapes = WORLD.shapes as Record<string, string>
  const points = WORLD.points as Record<string, readonly [number, number]>

  return (
    <section id="where" className="py-24 md:py-28">
      <div className="wrap">
        <h2 className="h2">{w.title}</h2>

        <svg viewBox={`0 0 ${WORLD.w} ${WORLD.h}`} role="img" aria-label={w.title} className="mt-10 h-auto w-full md:mt-14">
          <path d={WORLD.base} fill="none" stroke="var(--accent)" strokeOpacity=".28" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {all.filter((c) => shapes[c]).map((c) => (
            <path key={c} d={shapes[c]} fill="var(--accent)" fillOpacity=".34" stroke="var(--accent)" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          ))}
          {all.filter((c) => points[c]).map((c) => (
            <circle key={c} cx={points[c][0]} cy={points[c][1]} r="3.4" fill="var(--accent)" />
          ))}
        </svg>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((r) => (
            <div key={r.key} className={span[r.key]}>
              <h3 className="border-b border-[var(--line)] pb-3 text-2xl">{w.regions[r.key]}</h3>
              <ul className={`mt-4 text-[16px] leading-6 ${cols[r.key]}`}>
                {r.codes.map((c) => names.of(c)).sort((a, b) => (a ?? '').localeCompare(b ?? '', lang)).map((n) => <li key={n} className="break-inside-avoid py-0.5">{n}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <ContactForm to="tourigaporto@gmail.com" countries={countries}
          labels={{ name: c.name, email: c.email, country: w.form.country, select: w.form.select, message: c.message, send: c.send, subject: w.title }} />
      </div>
    </section>
  )
}
