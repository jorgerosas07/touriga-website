import Chapter from './Chapter'

export default function Adega({ dictionary }: { dictionary: any }) {
  const d = dictionary.adega
  return (
    <Chapter id="winery" eyebrow={d.eyebrow} title={d.title} lead={d.subtitle} text={d.text}
      src="/images/adega-side.jpg" alt="The 2004 winery, schist and concrete set into the hillside" imageLeft />
  )
}
