import ZoomPhoto from './ZoomPhoto'

// The goods composition of the kit: the h2, then equal columns on the
// 12-column grid: the capsule as a tall detail, and one hairline card per wine (photograph, name, two lines).
export default function WineShowcase({ dictionary }: { dictionary: any }) {
  const w = dictionary.wines
  const labels = { open: dictionary.nav.open, close: dictionary.nav.close }
  const wines = [
    { ...w.tinto, key: 'tinto', src: '/images/quinta-rotulos.jpg', w: 2000, h: 1333, pos: '53% center', fit: 'object-cover', frame: 'aspect-[4/3] md:aspect-square',
      alt: 'Three bottles of Quinta da Touriga-Chã lying on their sides, labels facing up' },
    { ...w.puro, key: 'puro', src: '/images/puro-caixa.jpg', w: 2400, h: 2117, pos: 'center', fit: 'object-contain', frame: 'aspect-[4/3] md:aspect-square !bg-[var(--bg)]',
      alt: 'Puro, Quinta da Touriga: the bottle and its six-bottle case' },
  ]
  return (
    <section id="wines" className="flex min-h-[100svh] items-center pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="wrap">
        <h2 className="h2">{w.title}</h2>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12">
          <ZoomPhoto src="/images/capsula.jpg" alt="The gold JR seal on the burgundy capsule of a bottle" width={876} height={1315} labels={labels}
            className="md:col-span-4 md:h-full" frameClass="aspect-[4/3] md:aspect-auto md:h-full" position="center 32%" />

          {wines.map((x) => (
            <article key={x.key} className="flex flex-col border border-[var(--line)] p-5 md:col-span-4">
              <ZoomPhoto src={x.src} alt={x.alt} width={x.w} height={x.h} labels={labels} className="w-full"
                frameClass={x.frame} imgClass={x.fit} position={x.pos} />
              <div className="mt-6">
                <h3 className="text-2xl md:text-[28px] md:leading-tight">{x.name}</h3>
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
