import { Page, Content, ButtonsRow } from '../../Page'
import contentMd from './SimfazPageContent.md'

export function SimfazPage() {
  const content = <Content contentMd={contentMd} />

  return (
    <Page
      title="Socioambiental"
      subtitle="Minimize os riscos reputacionais e financeiros avaliando conformidade socioambiental de proprietários e de imóveis rurais."
      bgImage="/public/bg/bg-simfaz.png"
      bgImageHeight={1080}
      content={content}
      tag="socioambiental"
      buttonsRow={<ButtonsRow buttons={[{ text: 'Mais informações', link: '#' }]} />}
    />
  )
}
