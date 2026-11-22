import { REGIONS } from '@/lib/markets'
import { intlLocale } from '@/lib/i18n'
import ImportersPopover from './ImportersPopover'
import { IMPORTERS } from '@/lib/importers'

// "Where to find us": the markets listed by region; each opens its importers.
export default function WhereToFind({ dictionary, lang }: { dictionary: any; lang: string }) {
  const w = dictionary.where
  const names = new Intl.DisplayNames([intlLocale(lang)], { type: 'region' })
  const order = REGIONS
  return (
    <section id="where" className="min-h-[calc(100svh-var(--nav-h))] py-12 md:py-16">
      <div className="wrap">
        <h1 className="h2">{w.title}</h1>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((r) => (
            <div key={r.key}>
              <h2 className="border-b border-[var(--line)] pb-3 text-2xl">{w.regions[r.key]}</h2>
              <ul className="mt-4 text-[16px] leading-6">
                {r.codes.map((c) => ({ c, n: names.of(c) ?? c })).sort((a, b) => a.n.localeCompare(b.n, lang)).map(({ c, n }) => (
                  <li key={c} className="relative py-0.5">
                    {r.provinces && c === 'CA' ? (
                      <>
                        {n}: {r.provinces[lang as 'en' | 'pt' | 'fr'].map((prov, k) => (
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

      </div>
    </section>
  )
}
