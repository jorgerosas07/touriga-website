import Image from 'next/image'

export default function Hero({ dictionary }: { dictionary: any }) {
  const { hero } = dictionary
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#2b241e] text-[#fbf7f0]">
      <Image src="/images/hero-bg.jpg" alt="The estate's terraced vineyards above the Douro Superior" fill priority quality={90} sizes="(max-width: 767px) 330vw, 100vw" className="object-cover object-center" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(32,26,21,.72)_0,rgba(32,26,21,.25)_160px,rgba(32,26,21,0)_28%,rgba(32,26,21,.58)_58%,rgba(32,26,21,.9)_100%)]" />
      <div className="wrap relative z-10 pb-14 md:pb-20">
        <div data-enter className="max-w-3xl">
          <h1 className="text-[44px] leading-[1.04] md:text-7xl">{hero.headline}</h1>
          <p className="lead mt-6 text-[#f4ece0]">{hero.subheadline}</p>
          <p className="mt-2 text-[#f4ece0]">{hero.douro}<br />{hero.heritage}</p>
        </div>
      </div>
    </section>
  )
}
