import Image from 'next/image'

export default function Founders({ dictionary }: { dictionary: any }) {
  const f = dictionary.founders
  const people = [
    { ...f.jarpr, src: '/images/founder-jarpr.png', alt: 'José António Castro Ramos Pinto Rosas', pos: 'center', gray: true },
    { ...f.jorge, src: '/images/founder-jorge.jpg', alt: 'Jorge Rosas', pos: 'center 20%', gray: false },
  ]
  return (
    <section id="founders" className="bg-[var(--surface)]">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-center px-6 py-20 md:px-12 xl:px-16">
        <p className="eyebrow mb-5">{f.eyebrow}</p>
        <h2 className="font-heading text-4xl leading-[1.05] text-[var(--ink)] md:text-6xl">{f.title}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          {people.map((p) => (
            <article key={p.name} className="grid grid-cols-[120px_1fr] items-start gap-6 md:grid-cols-[180px_1fr]">
              <div className="photo-frame aspect-[3/4]">
                <Image src={p.src} alt={p.alt} fill sizes="180px"
                  className={`object-cover ${p.gray ? 'grayscale' : ''}`} style={{ objectPosition: p.pos }} />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-[var(--ink)] md:text-3xl">{p.name}</h3>
                <p className="eyebrow mt-2 mb-4">{p.years}</p>
                <p className="text-[15px] leading-relaxed text-[var(--ink-mute)]">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
