import Image from 'next/image'

export default function Family({ dictionary }: { dictionary: any }) {
  const s = dictionary.story
  const f = dictionary.founders
  const people = [
    { ...f.jarpr, src: '/images/founder-jarpr.png', alt: 'José António Rosas in his winery', pos: 'center', gray: true },
    { ...f.jorge, src: '/images/founder-jorge.jpg', alt: 'Jorge Rosas among the barrels', pos: 'center 20%', gray: false },
  ]
  return (
    <section id="family" className="py-24 md:py-32">
      <div className="wrap grid min-h-[calc(100svh-16rem)] items-center gap-12 md:grid-cols-12 md:gap-6">
        <div className="photo aspect-[4/5] md:col-span-5">
          <Image src="/images/familia-estate.jpg" alt="The family's vineyard and olive trees above the valley" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="label mb-5">{s.label}</p>
          <h2 className="h2">{s.title}</h2>
          <p className="lead mt-7">{s.lead}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {people.map((p) => (
              <div key={p.name} className="grid grid-cols-[88px_1fr] items-start gap-4">
                <div className="photo aspect-[3/4]">
                  <Image src={p.src} alt={p.alt} fill sizes="88px" className={`object-cover ${p.gray ? 'grayscale' : ''}`} style={{ objectPosition: p.pos }} />
                </div>
                <div>
                  <h3 className="text-xl leading-tight">{p.name}</h3>
                  <p className="muted mt-1 text-[15px]">{p.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
