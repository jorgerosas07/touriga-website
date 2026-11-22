import Image from 'next/image'

// The story of the estate, right after the opening: the title and the estate photograph in the left column, the text
// in two columns beside them. The photograph fills the column down to the last line of the text, whatever the screen.
// On a phone: title, text, photograph.
export default function Quinta({ dictionary }: { dictionary: any }) {
  const q = dictionary.quinta
  return (
    <section id="quinta" className="py-16 md:py-20">
      <div className="wrap grid gap-8 md:grid-cols-12 md:gap-x-12">
        <div className="contents md:col-span-4 md:row-start-1 md:flex md:flex-col md:gap-8">
          <h2 className="h2">{q.title}</h2>
          <div className="photo order-3 aspect-[4/5] md:relative md:order-none md:aspect-auto md:min-h-[320px] md:flex-1">
            <Image src="/images/familia-estate.jpg" alt={dictionary.alts.quinta} fill quality={90} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" style={{ objectPosition: 'center 40%' }} />
          </div>
        </div>
        <div className="order-2 md:order-none md:col-span-8 md:col-start-5 md:row-start-1 md:columns-2 md:gap-x-10">
          {q.paragraphs.map((p: string, i: number) => (
            <p key={i} className={`mb-5 break-inside-avoid text-[16px] leading-[1.65] ${i === 0 ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
