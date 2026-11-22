// What sets the estate apart: three short points, each on its own card.
export default function Different({ dictionary }: { dictionary: any }) {
  const d = dictionary.different
  return (
    <section id="different" className="border-t border-[var(--line)] py-16 md:py-24">
      <div className="wrap">
        <h2 className="h2 max-w-4xl">{d.title}</h2>
        <ul className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {d.items.map((it: { title: string; text: string }) => (
            <li key={it.title} className="border border-[var(--line)] p-6 md:p-8">
              <h3 className="text-2xl leading-tight md:text-[28px]">{it.title}</h3>
              {it.text && <p className="muted mt-4 text-[17px] leading-relaxed">{it.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
