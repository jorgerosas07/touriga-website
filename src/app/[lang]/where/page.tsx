import WhereToFind from '@/components/WhereToFind'
import { getDictionary, alternates } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return { alternates: alternates(lang, '/where') }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  return (
    <div className="pt-[var(--nav-h)]">
      <WhereToFind dictionary={dictionary} lang={lang} />
    </div>
  )
}
