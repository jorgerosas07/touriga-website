import Image from 'next/image'

export default function Founders({ dictionary }: { dictionary: any }) {
  const f = dictionary.founders
  const people = [
    { ...f.jarpr, src: '/images/founder-jarpr.png', alt: 'José António Rosas in his winery', pos: 'center', gray: true },
    { ...f.jorge, src: '/images/founder-jorge.jpg', alt: 'Jorge Rosas among the barrels', pos: 'center 20%', gray: false },
  ]
  return (
    <section id="founders" className="flex min-h-[100svh] items-center bg-[var(--surface)] py-20">
      <div className="wrap">
        <h2 className="h2">{f.title}</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-6">
          {people.map((p) => (
            <article key={p.name} className="grid gap-6 sm:grid-cols-[200px_1fr] md:pr-10">
              <div className="photo aspect-[3/4] w-[200px]">
                <Image src={p.src} alt={p.alt} fill sizes="200px" className={`object-cover ${p.gray ? 'grayscale' : ''}`} style={{ objectPosition: p.pos }} />
              </div>
              <div>
                <h3 className="text-2xl leading-tight md:text-3xl">{p.name}</h3>
                <p className="label mt-2 mb-4">{p.years}</p>
                <p className="muted">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
