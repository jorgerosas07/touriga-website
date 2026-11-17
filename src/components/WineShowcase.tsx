import Image from 'next/image'

export default function WineShowcase({ dictionary }: { dictionary: any }) {
  const w = dictionary.wines
  const wines: any[] = [
    { ...w.puro, src: '/images/puro-shelf.jpg', w: 1000, h: 1250, alt: 'Puro, Quinta da Touriga, Douro, on a wine shelf', href: '#allocation', cover: true },
    { ...w.tinto, src: '/images/tinto_bottle.jpg', w: 170, h: 700, alt: 'Quinta da Touriga Chã Tinto bottle', href: '#allocation' },
  ]
  return (
    <section id="wines" className="bg-[var(--background)]">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-center px-6 py-20 md:px-12 xl:px-16">
        <p className="eyebrow mb-5">{dictionary.nav.wines}</p>
        <h2 className="font-heading text-4xl leading-[1.05] text-[var(--ink)] md:text-6xl">{w.title}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {wines.map((x) => (
            <a key={x.name} href={x.href} className="lift grid grid-cols-[150px_1fr] items-center gap-6 border border-[var(--line)] bg-[var(--surface)] p-6 md:grid-cols-[220px_1fr] md:p-8">
              <div className={`photo-frame flex items-center justify-center ${x.cover ? 'aspect-[4/5]' : 'aspect-[3/4] bg-white'}`}>
                <Image src={x.src} alt={x.alt} width={x.w} height={x.h} className={x.cover ? 'h-full w-full object-cover' : 'h-full w-auto object-contain'} />
              </div>
              <div>
                <h3 className="font-heading text-3xl text-[var(--ink)] md:text-4xl">{x.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-[var(--ink)]">{x.concept}</p>
                <p className="mt-3 text-base leading-relaxed text-[var(--ink-mute)]">{x.tasting}</p>
                <span className="link-draw mt-6 text-sm tracking-[0.16em] text-[var(--color-gold)] uppercase">{dictionary.allocation.cta}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
