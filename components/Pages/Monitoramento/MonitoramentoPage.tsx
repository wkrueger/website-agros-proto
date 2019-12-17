import { Page, Content, IconsRow, ButtonsRow } from '../../Page'
import mdcontent from './MonitoramentoPageContent.md'

export function MonitoramentoPage() {
  const content = (
    <Content
      contentMd={mdcontent}
      iconsRow={
        <IconsRow
          icons={[
            { text: 'De Plantio<br/>&nbsp;', icon: '/public/icon/icone-de-plantio.svg' },
            {
              text: 'Desenvolvimento da Lavoura',
              icon: '/public/icon/icone-desenvolvimento-da-lavoura.svg'
            },
            { text: 'Colheita<br/>&nbsp;', icon: '/public/icon/icone-colheita.svg' }
          ]}
        />
      }
    />
  )

  return (
    <Page
      title="Monitoramento"
      subtitle="Usufrua de informações chaves sobre a conformidade e o desempenho produtivo das lavouras penhoradas
    compatível com resolução BACEN 4427"
      content={content}
      bgImage="/public/bg/bg-monitoramento.png"
      bgImageHeight={1080}
      tag="monitoramento"
      buttonsRow={<ButtonsRow buttons={[{ text: 'Mais informações', link: '#' }]} />}
    />
  )
}
