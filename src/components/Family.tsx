import Image from 'next/image'

export default function Family({ dictionary }: { dictionary: any }) {
  const s = dictionary.familia
  return (
    <section id="family" className="py-24 md:py-32">
      <div className="wrap grid min-h-[calc(100svh-16rem)] items-center gap-12 md:grid-cols-12 md:gap-6">
        <div className="photo aspect-[4/5] md:col-span-5">
          <Image src="/images/familia-estate.jpg" alt="The family's vineyard and olive trees above the valley" fill quality={90} sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="label mb-5">{s.eyebrow}</p>
          <h2 className="h2">{s.title}</h2>
          <p className="lead mt-7">{s.subtitle}</p>
          <p className="muted mt-5">{s.text}</p>
        </div>
      </div>
    </section>
  )
}
