import Image from 'next/image'

export default function Hero({ dictionary }: { dictionary: any }) {
  const { hero, nav } = dictionary
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#2b241e] text-[#fbf7f0]">
      <Image src="/images/hero-bg.jpg" alt="The estate's terraced vineyards above the Douro Superior" fill priority sizes="100vw" className="object-cover object-center" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(32,26,21,.55),rgba(32,26,21,0))]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-[linear-gradient(to_top,rgba(32,26,21,.78),rgba(32,26,21,0))]" />
      <div className="wrap relative z-10 pb-14 md:pb-20">
        <div data-enter className="max-w-3xl">
          <p className="mb-5 text-[15px] font-medium tracking-wide text-[#f3e6cf]">{hero.fact}</p>
          <h1 className="text-[44px] leading-[1.04] md:text-7xl">{hero.title}</h1>
          <p className="lead mt-6 max-w-2xl text-[#f4ece0]">{hero.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#allocation" className="btn">{nav.primary}</a>
            <a href="#wines" className="btn btn-quiet">{nav.secondary}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
