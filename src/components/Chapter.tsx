import Image from 'next/image'

type Props = {
  id?: string
  eyebrow: string
  title: string
  lead: string
  text: string
  src: string
  alt: string
  imageLeft?: boolean
  position?: string
  surface?: boolean
}

/** One photograph, one text column, one screen. Same edges as every section. */
export default function Chapter({ id, eyebrow, title, lead, text, src, alt, imageLeft, position = 'center', surface }: Props) {
  return (
    <section id={id} className={surface ? 'bg-[var(--surface)]' : 'bg-[var(--background)]'}>
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1440px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 xl:px-16">
        <div className={`photo-frame aspect-[4/5] max-h-[78svh] w-full md:aspect-auto md:h-[74svh] ${imageLeft ? '' : 'md:order-2'}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
        <div className="max-w-xl">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="font-heading text-4xl leading-[1.05] text-[var(--ink)] md:text-5xl xl:text-6xl">{title}</h2>
          <p className="mt-8 text-lg leading-relaxed text-[var(--ink)] md:text-xl">{lead}</p>
          <p className="mt-5 text-base leading-relaxed text-[var(--ink-mute)]">{text}</p>
        </div>
      </div>
    </section>
  )
}
