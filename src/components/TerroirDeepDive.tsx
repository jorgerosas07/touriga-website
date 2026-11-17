import Image from 'next/image'

export default function TerroirDeepDive({ dictionary }: { dictionary: any }) {
  const t = dictionary.terroir
  const items = [
    { ...t.soil, src: '/images/vineyard-soil.jpg', alt: 'Fractured schist soil between the vines' },
    { ...t.climate, src: '/images/winery-summer.jpg', alt: 'Dry stone wall in summer light' },
    { ...t.expression, src: '/images/adega-floor.jpg', alt: 'Raw schist and concrete inside the winery' },
  ]
  return (
    <section id="terroir" className="bg-[var(--background)]">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-center px-6 py-20 md:px-12 xl:px-16">
        <p className="eyebrow mb-5">{t.title}</p>
        <h2 className="max-w-3xl font-heading text-4xl leading-[1.05] text-[var(--ink)] md:text-6xl">{t.subtitle}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((it) => (
            <article key={it.title} className="lift border border-[var(--line)]">
              <div className="photo-frame aspect-[16/10]">
                <Image src={it.src} alt={it.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-2xl text-[var(--ink)]">{it.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-mute)]">{it.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
