'use client'

export default function Enquiry({ dictionary }: { dictionary: any }) {
  const a = dictionary.allocation
  const f = a.form
  const wines = [a.tinto, a.puro]

  // Sends through the visitor's email app: no fake confirmation without a real send
  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const d = new FormData(ev.currentTarget)
    const body = `${f.name}: ${d.get('name')}\n${f.email}: ${d.get('email')}\n${d.getAll('wine').join(', ')}\n${f.year}: ${d.get('year') || ''}\n\n${d.get('message') || ''}`
    window.location.href = `mailto:info@jrosas.pt?subject=${encodeURIComponent(f.title)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="allocation" className="flex min-h-[100svh] items-center pt-[calc(var(--nav-h)+32px)] pb-16">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className="label mb-5">{a.title}</p>
          <h2 className="h2">{a.subtitle}</h2>
          <div className="mt-8 grid gap-5">
            {wines.map((x: any) => (
              <div key={x.name} className="border-t border-[var(--line)] pt-5">
                <h3 className="text-2xl">{x.name}</h3>
                <p className="mt-2">{x.description}</p>
                <p className="muted mt-1">{x.price}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="grid content-start gap-4 bg-[var(--surface)] p-6 md:col-span-6 md:col-start-7 md:p-8">
          <div>
            <h3 className="text-3xl">{f.title}</h3>
            <p className="muted mt-2">{f.subtitle}</p>
          </div>
          <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
            {wines.map((x: any) => (
              <label key={x.name} className="flex min-h-[44px] items-center gap-2">
                <input type="checkbox" name="wine" value={x.name} className="h-5 w-5 accent-[var(--accent)]" />
                {x.name}
              </label>
            ))}
          </fieldset>
          <div className="field"><label htmlFor="q-year">{f.year}</label><input id="q-year" name="year" inputMode="text" autoComplete="off" /></div>
          <div className="field"><label htmlFor="q-name">{f.name}</label><input id="q-name" name="name" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="q-email">{f.email}</label><input id="q-email" name="email" type="email" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="q-msg">{f.message}</label><textarea id="q-msg" name="message" rows={3} /></div>
          <div><button type="submit" className="btn">{f.submit}</button></div>
        </form>
      </div>
    </section>
  )
}
