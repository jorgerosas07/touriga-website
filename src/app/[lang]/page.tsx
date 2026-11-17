import Hero from '@/components/Hero'
import TerroirDeepDive from '@/components/TerroirDeepDive'
import Viticulture from '@/components/Viticulture'
import Vinificacao from '@/components/Vinificacao'
import Adega from '@/components/Adega'
import Familia from '@/components/Familia'
import Founders from '@/components/Founders'
import WineShowcase from '@/components/WineShowcase'
import Allocation from '@/components/Allocation'
import Contact from '@/components/Contact'
import enDict from '@/dictionaries/en.json'
import ptDict from '@/dictionaries/pt.json'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params
  const dictionary = resolvedParams.lang === 'pt' ? ptDict : enDict

  return (
    <div className="flex w-full flex-col">
      <Hero dictionary={dictionary} />
      <TerroirDeepDive dictionary={dictionary} />
      <Viticulture dictionary={dictionary} />
      <Vinificacao dictionary={dictionary} />
      <Adega dictionary={dictionary} />
      <Familia dictionary={dictionary} />
      <Founders dictionary={dictionary} />
      <WineShowcase dictionary={dictionary} />
      <Allocation dictionary={dictionary} />
      <Contact dictionary={dictionary} />
    </div>
  )
}
