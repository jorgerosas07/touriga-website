import Image from 'next/image'

export default function Family({ dictionary }: { dictionary: any }) {
  const s = dictionary.familia
  return (
    <section id="family" className="flex min-h-[calc(100svh-var(--nav-h))] items-center py-8 md:py-10">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-6">
        <div className="photo aspect-[4/5] md:col-span-5">
          <Image src="/images/familia-estate.jpg" alt="The family's vineyard and olive trees above the valley" fill quality={90} sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="h2">{s.title}</h2>
          <p className="lead mt-7">{s.subtitle}</p>
          <p className="muted mt-5">{s.text}</p>
        </div>
      </div>
    </section>
  )
}
