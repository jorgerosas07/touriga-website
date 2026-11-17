import Image from 'next/image'

export default function WineShowcase({ dictionary }: { dictionary: any }) {
  const w = dictionary.wines
  const a = dictionary.allocation
  const wines = [
    { ...w.puro, vintage: a.puro.vintage },
    { ...w.tinto, vintage: a.tinto.vintage },
  ]
  return (
    <section id="wines" className="py-24 md:py-32">
      {/* tall-small: the tall photograph on the left line, the text and a square detail on the right */}
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-6">
        <a href="#allocation" aria-label={`${w.puro.name}: ${a.cta}`} className="lift md:col-span-6">
          <div className="photo aspect-[4/5]">
            <Image src="/images/puro-shelf.jpg" alt="A bottle of Puro, Quinta da Touriga, on a wine shop shelf" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </a>
        <div className="flex flex-col md:col-span-5 md:col-start-8">
          <h2 className="h2">{w.title}</h2>
          <div className="mt-8 grid gap-7">
            {wines.map((x) => (
              <div key={x.name} className="border-t border-[var(--line)] pt-5">
                <h3 className="text-2xl md:text-3xl">{x.name} <span className="muted text-lg">{x.vintage}</span></h3>
                <p className="mt-2">{x.concept}</p>
                <p className="muted mt-1">{x.tasting}</p>
              </div>
            ))}
          </div>
          <a href="#allocation" className="link mt-7">{a.cta} <span className="arrow" aria-hidden>→</span></a>
          <a href="#allocation" aria-label={`${w.tinto.name}: ${a.cta}`} className="lift mt-auto hidden pt-10 md:block">
            <div className="photo flex aspect-square w-[60%] items-center justify-center bg-white">
              <Image src="/images/tinto_bottle.jpg" alt="A bottle of Quinta da Touriga Chã red" width={170} height={700} className="h-[88%] w-auto object-contain" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
