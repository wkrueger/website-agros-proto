import { Page, Content } from '../../Page'
import contentMd from './EmpresaPageContent.md'

export function EmpresaPage() {
  const content = <Content contentMd={contentMd} />

  return (
    <Page
      title="Sobre a Agrosatélite"
      subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
      bgImage="/public/bg/bg-empresa.png"
      bgImageHeight={1080}
      content={content}
      tag="empresa"
    />
  )
}
