import ZoomPhoto from './ZoomPhoto'

// The goods composition of the kit: the h2, then equal columns on the
// 12-column grid: the capsule as a tall detail, and one hairline card per wine (photograph, name, two lines).
export default function WineShowcase({ dictionary }: { dictionary: any }) {
  const w = dictionary.wines
  const labels = { open: dictionary.nav.open, close: dictionary.nav.close }
  const wines = [
    { ...w.tinto, key: 'tinto', src: '/images/quinta-rotulos.jpg', w: 2000, h: 1333, pos: '53% center', fit: 'object-cover', frame: 'aspect-[4/3]',
      alt: dictionary.alts.tinto },
    { ...w.puro, key: 'puro', src: '/images/puro-caixa.jpg', w: 2400, h: 2117, pos: 'center', fit: 'object-contain', frame: 'aspect-[4/3] !bg-[var(--bg)]',
      alt: dictionary.alts.puro },
  ]
  return (
    <section id="wines" className="flex min-h-[calc(100svh-var(--nav-h))] items-center py-8 md:py-10">
      <div className="wrap">
        <h1 className="h2">{w.title}</h1>

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-12">
          <ZoomPhoto src="/images/capsula.jpg" alt={dictionary.alts.capsule} width={876} height={1315} labels={labels}
            className="md:col-span-4 md:h-full" frameClass="aspect-[4/3] md:aspect-auto md:h-full" position="center 32%" />

          {wines.map((x) => (
            <article key={x.key} id={`wine-${x.key}`} className="flex flex-col border border-[var(--line)] p-5 md:col-span-4">
              <ZoomPhoto src={x.src} alt={x.alt} width={x.w} height={x.h} labels={labels} className="w-full"
                frameClass={x.frame} imgClass={x.fit} position={x.pos} />
              <div className="mt-6">
                <h2 className="text-2xl md:text-[28px] md:leading-tight">{x.name}</h2>
                <p className="mt-3">{x.concept}</p>
                <p className="muted mt-1">{x.tasting}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
