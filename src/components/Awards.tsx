import data from '@/data/awards.json'

const IDX: Record<string, 0 | 1 | 2> = { en: 0, pt: 1, fr: 2 }

type Item = { source: string; kind: string[]; result: string[]; date: string[] | null; top10: boolean }

// The awards of Quinta da Touriga-Chã: the highlights as cards, then every distinction by vintage (native <details>,
// so the whole list stays in the page for search engines and screen readers).
export default function Awards({ dictionary, lang }: { dictionary: any; lang: string }) {
  const a = dictionary.awards
  const i = IDX[lang] ?? 0
  return (
    <section id="awards" className="bg-[var(--surface)] py-16 md:py-24">
      <div className="wrap">
        <h2 className="h2">{a.title}</h2>
        <p className="muted mt-3 text-lg">{a.sub}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {data.highlights.map((h) => (
            <li key={h.line[0]} className="border border-[var(--line)] bg-[var(--bg)] p-6">
              <p className="font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--accent)]">{h.big[i]}</p>
              <p className="mt-4 text-lg font-medium leading-snug">{h.line[i]}</p>
              <p className="muted mt-2 text-[15px] leading-snug">{h.sub[i]}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-16 text-2xl leading-tight md:text-3xl">{a.all}</h3>
        <div className="mt-6 border-t border-[var(--line)]">
          {data.vintages.map((v, k) => (
            <details key={v.year} open={k === 0} className="group border-b border-[var(--line)]">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="font-[family-name:var(--font-display)] text-2xl">{a.vintage} {v.year}</span>
                <span className="muted flex items-center gap-3 text-[15px]">
                  {v.items.length} {v.items.length === 1 ? a.n1 : a.nn}
                  <span aria-hidden className="text-xl transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <ul className="grid gap-5 pb-6 pt-1">
                {(v.items as Item[]).map((it, n) => (
                  <li key={n} className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-8">
                    <div>
                      <p className="font-medium leading-snug">{it.source}{it.date ? <span className="muted font-normal"> · {it.date[i]}</span> : null}</p>
                      <p className="muted text-[14px] leading-snug">{it.kind[i]}</p>
                    </div>
                    <p className="leading-snug">{it.result[i]}</p>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
