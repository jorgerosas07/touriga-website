import { REGIONS } from '@/lib/markets'
import ContactForm from './ContactForm'
import ImportersPopover from './ImportersPopover'
import { IMPORTERS } from '@/lib/importers'

// "Where to find us": the markets listed by region, then a contact form.
export default function WhereToFind({ dictionary, lang }: { dictionary: any; lang: string }) {
  const w = dictionary.where
  const names = new Intl.DisplayNames([lang === 'pt' ? 'pt-PT' : 'en'], { type: 'region' })
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
  const order = REGIONS
  return (
    <section id="where" className="py-24 md:py-28">
      <div className="wrap">
        <h2 className="h2">{w.title}</h2>


        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((r) => (
            <div key={r.key}>
              <h3 className="border-b border-[var(--line)] pb-3 text-2xl">{w.regions[r.key]}</h3>
              <ul className="mt-4 text-[16px] leading-6">
                {r.codes.map((c) => ({ c, n: names.of(c) ?? c })).sort((a, b) => a.n.localeCompare(b.n, lang)).map(({ c, n }) => (
                  <li key={c} className="relative py-0.5">
                    {r.provinces && c === 'CA' ? (
                      <>
                        {n}: {r.provinces[lang === 'pt' ? 'pt' : 'en'].map((prov, k) => (
                          <span key={prov}>{k > 0 && ', '}<ImportersPopover label={prov} importers={IMPORTERS[k === 0 ? 'CA-ON' : 'CA-QC']} title={w.importers.title} example={w.importers.example} /></span>
                        ))}
                      </>
                    ) : (
                      <ImportersPopover label={n} importers={IMPORTERS[c] ?? []} title={w.importers.title} example={w.importers.example} />
                    )}
                  </li>
                ))}
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
