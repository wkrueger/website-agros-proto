import { Page, Content, IconsRow } from '../../Page'
import contentText from './LandingPageContent.md'

export function LandingPage() {
  const content = (
    <Content
      contentMd={contentText}
      iconsRow={
        <IconsRow
          icons={[
            { text: 'Diagnóstico', icon: '/public/icon/icone-diagnostico.svg' },
            { text: 'Monitoramento', icon: '/public/icon/icone-monitoramento.svg' },
            { text: 'Socioambiental', icon: '/public/icon/icone-socioambiental.svg' }
          ]}
        />
      }
    />
  )

  return (
    <Page
      bgImage="/public/bg/bg-landing.png"
      bgImageHeight={900}
      title="Sistema de Monitoramento de Fazendas"
      titleType="h1"
      subtitle="Inovação tecnológica e inteligência geográfica a serviço do monitoramento remoto de imóveis e glebas rurais."
      content={content}
      tag="sistema"
      bgImageClass="landing-bg"
    />
  )
}
