import Image from 'next/image'

export default function Hero({ dictionary }: { dictionary: any }) {
  const { hero, nav } = dictionary
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0e0e10]">
      <Image
        src="/images/hero-bg.jpg"
        alt="Terraced vineyards of the Douro Superior at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/90 via-[#0e0e10]/25 to-[#0e0e10]/40" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-12 md:pb-24 xl:px-16">
        <div data-enter className="max-w-3xl">
          <p className="eyebrow mb-5">{nav.fact}</p>
          <h1 className="font-heading text-5xl leading-[1.02] text-[var(--ink)] md:text-7xl xl:text-8xl">
            {hero.headline.charAt(0) + hero.headline.slice(1).toLowerCase()}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl">
            {hero.subheadline} {hero.douro}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#allocation" className="btn btn-solid">{nav.primary}</a>
            <a href="#wines" className="btn">{nav.secondary}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
