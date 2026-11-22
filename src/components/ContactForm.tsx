'use client'

type Labels = { title: string; name: string; email: string; country: string; select: string; message: string; send: string; subject: string }

// Sends through the visitor's email app: nothing is confirmed unless the visitor really sends it
export default function ContactForm({ labels, countries, to }: { labels: Labels; countries: { code: string; name: string }[]; to: string }) {
  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const d = new FormData(ev.currentTarget)
    const body = `${labels.name}: ${d.get('name')}\n${labels.email}: ${d.get('email')}\n${labels.country}: ${d.get('country')}\n\n${d.get('message') || ''}`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`${labels.subject}: ${d.get('name')}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div id="contact">
    <h1 className="h2 mb-8 md:mb-10">{labels.title}</h1>
    <form onSubmit={submit} className="grid max-w-3xl gap-6">
      <div className="field"><label htmlFor="w-name">{labels.name} <span aria-hidden>*</span></label><input id="w-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="w-email">{labels.email} <span aria-hidden>*</span></label><input id="w-email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field"><label htmlFor="w-country">{labels.country} <span aria-hidden>*</span></label>
        <select id="w-country" name="country" required defaultValue="" autoComplete="country-name">
          <option value="" disabled>{labels.select}</option>
          {countries.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}
        </select>
      </div>
      <div className="field"><label htmlFor="w-message">{labels.message}</label><textarea id="w-message" name="message" rows={4} /></div>
      <div><button type="submit" className="btn">{labels.send}</button></div>
    </form>
    </div>
  )
}
