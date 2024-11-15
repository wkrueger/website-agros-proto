import { Page, Content, ButtonsRow, IconsRow } from '../../Page'
import contentTextMd from './DiagnosticoPageContent.md'

export function DiagnosticoPage() {
  const content = (
    <Content
      contentMd={contentTextMd}
      iconsRow={
        <IconsRow
          icons={[
            { text: 'Aspectos<br/>Regionais', icon: '/public/icon/icone-socioambiental.svg' },
            {
              text: 'Características Físicas do Imóvel',
              icon: '/public/icon/icone-caracteristicas-imovel.svg'
            },
            { text: 'Informações do Mercado', icon: '/public/icon/icone-informacoes-mercado.svg' }
          ]}
        />
      }
    />
  )

  return (
    <Page
      bgImage="/public/bg/bg-diagnostico.png"
      bgImageHeight={1080}
      title="Diagnóstico"
      subtitle="Conheça melhor o potencial do seu cliente. Minimize os riscos ao tomar imóveis em garantia. Crie mais oportunidades de baixo risco!"
      content={content}
      tag="diagnostico"
      buttonsRow={<ButtonsRow buttons={[{ text: 'Mais informações', link: '#' }]} />}
    />
  )
}
