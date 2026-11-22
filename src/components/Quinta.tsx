// The story of the estate, right after the opening: the title on the left, the text in two columns on the right.
export default function Quinta({ dictionary }: { dictionary: any }) {
  const q = dictionary.quinta
  return (
    <section id="quinta" className="flex min-h-[calc(100svh-var(--nav-h))] items-center py-16 md:py-20">
      <div className="wrap grid gap-8 md:grid-cols-12 md:gap-x-12">
        <h2 className="h2 md:col-span-4">{q.title}</h2>
        <div className="md:col-span-8 md:columns-2 md:gap-x-10">
          {q.paragraphs.map((p: string, i: number) => (
            <p key={i} className={`mb-5 break-inside-avoid text-[16px] leading-[1.65] ${i === 0 ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
