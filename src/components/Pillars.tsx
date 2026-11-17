import Image from 'next/image'

export default function Pillars({ dictionary }: { dictionary: any }) {
  const items = [
    { ...dictionary.viticulture, id: 'viticulture', src: '/images/viticulture-vines.jpg', alt: 'The vineyard and winery from above at sunset' },
    { ...dictionary.vinificacao, id: 'winemaking', src: '/images/winery-interior.jpg', alt: 'Stainless steel tanks in the fermentation hall' },
    { ...dictionary.adega, id: 'winery', src: '/images/adega.jpg', alt: 'The winery, schist walls set into the slope' },
  ]
  return (
    <section id="pillars" className="py-24 md:py-32">
      <div className="wrap grid gap-14 md:grid-cols-3 md:gap-6">
        {items.map((it) => (
          <article key={it.id} id={it.id}>
            <div className="photo mb-7 aspect-[4/5]">
              <Image src={it.src} alt={it.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
            <p className="label mb-3">{it.eyebrow}</p>
            <h2 className="text-4xl leading-tight">{it.title}</h2>
            <p className="mt-5">{it.subtitle}</p>
            <p className="muted mt-4">{it.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
