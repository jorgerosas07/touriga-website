import Chapter from './Chapter'

export default function Viticulture({ dictionary }: { dictionary: any }) {
  const d = dictionary.viticulture
  return (
    <Chapter id="viticulture" eyebrow={d.eyebrow} title={d.title} lead={d.subtitle} text={d.text}
      src="/images/viticulture-vines.jpg" alt="Touriga Nacional vines on the Douro Superior estate" imageLeft />
  )
}
