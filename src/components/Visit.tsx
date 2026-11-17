import Image from 'next/image'

const STRIP = [
  { src: '/images/adega-side.jpg', alt: 'The winery terrace among wild shrubs' },
  { src: '/images/vineyard-terrace.jpg', alt: 'Vine rows on the terraces' },
  { src: '/images/estate-dusk.jpg', alt: 'The estate at dusk' },
  { src: '/images/estate-sun.jpg', alt: 'The estate in the sun' },
]

export default function Visit({ dictionary }: { dictionary: any }) {
  const v = dictionary.contact
  return (
    <section id="visit" className="bg-[var(--surface)] py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-6">
            <p className="label mb-5">{v.eyebrow}</p>
            <h2 className="h2">{v.title}</h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="lead">{v.subtitle}</p>
            <a href="mailto:info@jrosas.pt" className="link mt-6">info@jrosas.pt <span className="arrow" aria-hidden>→</span></a>
          </div>
        </div>
        <p className="type-moment mt-12">
          <a className="link !font-normal !text-[var(--ink)]" href="https://www.google.com/maps/search/?api=1&query=Vila+Nova+de+Foz+C%C3%B4a" target="_blank" rel="noopener">Vila Nova de Foz Côa, Douro Superior</a>
        </p>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STRIP.map((p) => (
            <li key={p.src} className="photo aspect-square">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
