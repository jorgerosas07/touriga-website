'use client'

import { useState } from 'react'

export default function Enquiry({ dictionary }: { dictionary: any }) {
  const e = dictionary.enquiry
  const w = dictionary.wines
  const [error, setError] = useState('')

  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    const name = String(f.get('name') || '').trim()
    const email = String(f.get('email') || '').trim()
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) { setError(e.error); return }
    setError('')
    const body = `${e.name}: ${name}\n${e.email}: ${email}\n${e.wine}: ${f.get('wine')}\n${e.bottles}: ${f.get('bottles')}\n\n${f.get('message') || ''}`
    window.location.href = `mailto:info@jrosas.pt?subject=${encodeURIComponent(`${e.title} ${name}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="allocation" className="py-24 md:py-32">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className="label mb-5">{e.label}</p>
          <h2 className="h2">{e.title}</h2>
          <p className="lead mt-7">{e.lead}</p>
        </div>
        <form onSubmit={submit} noValidate className="grid gap-5 md:col-span-6 md:col-start-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field"><label htmlFor="q-name">{e.name}</label><input id="q-name" name="name" autoComplete="name" required /></div>
            <div className="field"><label htmlFor="q-email">{e.email}</label><input id="q-email" name="email" type="email" autoComplete="email" required /></div>
          </div>
          <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
            <div className="field"><label htmlFor="q-wine">{e.wine}</label>
              <select id="q-wine" name="wine" defaultValue={w.tinto.name}>
                <option>{w.puro.name}</option><option>{w.tinto.name}</option><option>{e.both}</option>
              </select>
            </div>
            <div className="field"><label htmlFor="q-bottles">{e.bottles}</label><input id="q-bottles" name="bottles" type="number" min={1} defaultValue={6} /></div>
          </div>
          <div className="field"><label htmlFor="q-msg">{e.message}</label><textarea id="q-msg" name="message" rows={4} /></div>
          {error && <p role="alert" className="text-[15px] text-[var(--accent)]">{error}</p>}
          <div>
            <button type="submit" className="btn">{e.submit}</button>
            <p className="muted mt-3 text-[15px]">{e.note}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
