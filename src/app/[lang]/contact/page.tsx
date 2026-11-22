import ContactForm from '@/components/ContactForm'
import Visit from '@/components/Visit'
import { getCountries } from '@/lib/countries'
import { getDictionary, alternates } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return { alternates: alternates(lang, '/contact') }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const c = dictionary.contact
  const w = dictionary.where

  return (
    <div className="pt-[var(--nav-h)]">
      <section className="py-12 md:py-16">
        <div className="wrap">
          <ContactForm to="tourigaporto@gmail.com" countries={getCountries(lang)}
            labels={{ title: c.eyebrow, name: c.name, email: c.email, country: w.form.country, select: w.form.select, message: c.message, send: c.send, subject: c.eyebrow }} />
        </div>
      </section>
      <Visit dictionary={dictionary} />
    </div>
  )
}
